(function () {
    // Configuration - change this to your server URL
    var CHATBOT_URL = "http://13.126.198.104:8000/chatpage";

    // Inject minimal CSS
    var style = document.createElement("style");
    style.textContent = `
        .spotem-chat-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(124, 58, 237, 0.3);
            transition: transform 0.2s, box-shadow 0.2s;
            z-index: 99999;
        }
        .spotem-chat-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 12px 32px rgba(124, 58, 237, 0.4);
        }
        .spotem-chat-btn svg { width: 28px; height: 28px; fill: #fff; }
        .spotem-chat-frame {
            position: fixed;
            bottom: 96px;
            right: 24px;
            width: 370px;
            height: calc(100vh - 140px);
            max-height: 550px;
            border: 1px solid #e0e0e0;
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(124, 58, 237, 0.22);
            z-index: 99998;
            display: none;
            background: #fff;
            overflow: hidden;
        }
        .spotem-chat-frame.open { display: block; }
        @media (max-width: 480px) {
            .spotem-chat-frame {
                width: 100vw;
                height: 100vh;
                bottom: 0;
                right: 0;
                border-radius: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create chat button
    var btn = document.createElement("button");
    btn.className = "spotem-chat-btn";
    btn.setAttribute("aria-label", "Open Spotem AI Chat");
    btn.innerHTML =
        '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    document.body.appendChild(btn);

    var iframe = null;
    var isOpen = false;

    btn.addEventListener("click", function () {
        isOpen = !isOpen;

        if (!iframe) {
            // LAZY LOAD: iframe only created on first click
            iframe = document.createElement("iframe");
            iframe.className = "spotem-chat-frame";
            iframe.src = CHATBOT_URL;
            iframe.title = "Spotem AI Chat";
            iframe.setAttribute("loading", "lazy");
            iframe.allow = "clipboard-write; microphone";
            document.body.appendChild(iframe);
        }

        if (isOpen) {
            iframe.classList.add("open");
            btn.innerHTML =
                '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        } else {
            iframe.classList.remove("open");
            btn.innerHTML =
                '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
        }
    });
})();
