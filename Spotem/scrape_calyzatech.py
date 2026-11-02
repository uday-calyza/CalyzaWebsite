"""
Scrape CalyzaTech (React SPA) using Playwright headless browser
Then build FAISS knowledge base
"""
import os
import time
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_aws import BedrockEmbeddings

load_dotenv()
if not os.environ.get('AWS_DEFAULT_REGION'):
    os.environ['AWS_DEFAULT_REGION'] = "us-east-1"

BASE_URL = "http://13.126.198.104"


def scrape_with_browser():
    """Use headless Chrome to render the React app and extract content"""
    all_texts = []
    visited = set()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        def scrape_page(url):
            if url in visited:
                return
            visited.add(url)

            print(f"  🌐 Loading: {url}")
            try:
                page.goto(url, wait_until="networkidle", timeout=30000)
                # Wait for React to render
                page.wait_for_timeout(3000)

                # Get all visible text content
                text = page.inner_text("body")

                if len(text.strip()) < 50:
                    print(f"    ⚠️ Too short ({len(text.strip())} chars), skipping")
                    return

                print(f"    ✅ Got {len(text.strip())} chars")
                all_texts.append(text.strip())

                # Find internal links
                links = page.eval_on_selector_all(
                    "a[href]",
                    "elements => elements.map(el => el.href)"
                )

                for link in links:
                    if link.startswith(BASE_URL) and link not in visited:
                        # Skip non-page resources
                        skip = ['.pdf', '.jpg', '.png', '.svg', '.css', '.js', '#']
                        if not any(s in link.lower() for s in skip):
                            scrape_page(link)

            except Exception as e:
                print(f"    ❌ Error: {e}")

        # Start scraping
        scrape_page(BASE_URL + "/")

        # Try common routes for SPAs
        common_routes = [
            "/about", "/about-us",
            "/services", "/our-services",
            "/contact", "/contact-us",
            "/products", "/solutions",
            "/team", "/careers",
            "/blog", "/portfolio",
            "/pricing", "/faq",
        ]

        for route in common_routes:
            url = BASE_URL + route
            if url not in visited:
                scrape_page(url)

        browser.close()

    print(f"\n📊 Total pages scraped: {len(visited)}")
    print(f"📝 Pages with content: {len(all_texts)}")
    return all_texts


def build_knowledge_base(texts):
    """Split texts and create FAISS vectorstore"""
    print("\n🧠 Building knowledge base...")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )

    all_chunks = []
    for text in texts:
        chunks = splitter.split_text(text)
        all_chunks.extend(chunks)

    print(f"   Total chunks: {len(all_chunks)}")

    if not all_chunks:
        print("❌ No content to index!")
        return

    embedding_model = BedrockEmbeddings(
        model_id="amazon.titan-embed-text-v2:0",
        region_name="us-east-1"
    )

    vectorstore_path = os.path.join(os.path.dirname(__file__), "faiss_index_new")

    print("   Creating embeddings and FAISS index...")
    vectorstore = FAISS.from_texts(all_chunks, embedding_model)
    vectorstore.save_local(vectorstore_path)

    print(f"\n💾 Vectorstore saved to: {vectorstore_path}")
    print(f"   Total vectors: {vectorstore.index.ntotal}")


if __name__ == "__main__":
    print("=" * 60)
    print("  CALYZATECH KNOWLEDGE BASE BUILDER")
    print("  Source: " + BASE_URL)
    print("=" * 60)

    texts = scrape_with_browser()

    if texts:
        build_knowledge_base(texts)
        print("\n✅ CalyzaTech knowledge base created successfully!")
    else:
        print("\n❌ No content scraped. Check if the website is accessible.")
