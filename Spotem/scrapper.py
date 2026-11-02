import requests
from bs4 import BeautifulSoup
from langchain_text_splitters import RecursiveCharacterTextSplitter
from urllib.parse import urljoin, urlparse
from langchain_community.vectorstores import FAISS
from langchain_aws import BedrockEmbeddings
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if not os.environ.get('AWS_DEFAULT_REGION'):
    os.environ['AWS_DEFAULT_REGION'] = "us-east-1"


class Scraper:
    def __init__(self, embedding_model, vectorstore_path):
        self.embedding_model = embedding_model
        self.vectorstore_path = vectorstore_path
        self.visited_links = set()
        self.vectorstore = None
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/112.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
        })

    def fetch_website_content(self, url, base_domain=None, max_depth=3, current_depth=0):
        if url in self.visited_links:
            return
        if current_depth > max_depth:
            return

        self.visited_links.add(url)
        print(f"  [{current_depth}] Scraping: {url}")

        if base_domain is None:
            base_domain = urlparse(url).netloc

        try:
            response = self.session.get(url, timeout=15)
            if response.status_code != 200:
                print(f"    ❌ Failed: {response.status_code}")
                return
        except Exception as e:
            print(f"    ❌ Error: {e}")
            return

        soup = BeautifulSoup(response.text, 'html.parser')

        # Remove script, style, nav, footer noise
        for tag in soup(['script', 'style', 'noscript']):
            tag.decompose()

        full_text = soup.get_text(separator=' ', strip=True)

        # Skip pages with very little content
        if len(full_text) < 100:
            print(f"    ⚠️ Skipped (too short: {len(full_text)} chars)")
            return

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100
        )
        texts = splitter.split_text(full_text)
        print(f"    ✅ Got {len(texts)} chunks ({len(full_text)} chars)")

        if self.vectorstore is None:
            self.vectorstore = FAISS.from_texts(texts, self.embedding_model)
        else:
            self.vectorstore.add_texts(texts)

        # Follow internal links
        for link_tag in soup.find_all('a', href=True):
            href = link_tag['href']
            next_url = urljoin(url, href)
            parsed_url = urlparse(next_url)

            # Only follow links on the same domain
            if parsed_url.netloc == base_domain:
                # Skip anchors, files, and query params
                clean_url = f"{parsed_url.scheme}://{parsed_url.netloc}{parsed_url.path}"
                if clean_url not in self.visited_links:
                    # Skip non-page files
                    skip_extensions = ['.pdf', '.jpg', '.png', '.gif', '.svg', '.css', '.js', '.zip', '.mp4', '.mp3']
                    if not any(clean_url.lower().endswith(ext) for ext in skip_extensions):
                        self.fetch_website_content(clean_url, base_domain, max_depth, current_depth + 1)

    def save_vectorstore(self):
        if self.vectorstore:
            self.vectorstore.save_local(self.vectorstore_path)
            print(f"\n💾 Vectorstore saved to {self.vectorstore_path}")
            print(f"   Total vectors: {self.vectorstore.index.ntotal}")
        else:
            print("❌ No content was scraped. Vectorstore not created.")


if __name__ == "__main__":
    embedding_model = BedrockEmbeddings(
        model_id="amazon.titan-embed-text-v2:0",
        region_name="us-east-1"
    )
    vectorstore_path = os.path.join(os.path.dirname(__file__), "faiss_index_new")
    print("Vector Store Path:", vectorstore_path)

    scraper = Scraper(embedding_model, vectorstore_path)

    # Scrape Calyza Tech website
    print("\n🔍 Starting to scrape CalyzaTech website...")
    print("=" * 50)
    scraper.fetch_website_content("http://13.126.198.104/")

    # Also try common pages
    common_pages = [
        "http://13.126.198.104/about",
        "http://13.126.198.104/services",
        "http://13.126.198.104/contact",
        "http://13.126.198.104/about-us",
        "http://13.126.198.104/our-services",
        "http://13.126.198.104/contact-us",
    ]

    for page in common_pages:
        try:
            scraper.fetch_website_content(page)
        except Exception as e:
            print(f"  Could not fetch {page}: {e}")

    print("\n" + "=" * 50)
    print(f"📊 Total pages scraped: {len(scraper.visited_links)}")
    scraper.save_vectorstore()
    print("✅ CalyzaTech knowledge base created successfully!")
