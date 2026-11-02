(function () {
    // Widget URL uses HTTPS for microphone access (browser will prompt to trust cert on first use)
    var WIDGET_URL = "https://13.126.198.104:8443/unified";
    // Note: For production, use a proper SSL certificate on your domain

    var AVATAR_URL = "http://13.126.198.104:8000/static/avatar.png";

    var style = document.createElement("style");
    style.textContent = `
        .calyza-avatar-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 72px;
            height: 72px;
            border-radius: 50%;
            border: 3px solid #fff;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(124, 58, 237, 0.35);
            transition: transform 0.2s;
            z-index: 99999;
            background: linear-gradient(135deg, #7c3aed, #a78bfa);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 0;
        }
        .calyza-avatar-btn:hover { transform: scale(1.08); }
        .calyza-avatar-btn img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
        .calyza-avatar-btn svg { width: 40px; height: 40px; color: #fff; }
        .calyza-avatar-btn.open {
            background: linear-gradient(135deg, #ef4444, #f87171);
        }
        .calyza-avatar-btn.open img { display: none; }
        .calyza-avatar-btn.open .close-icon { display: block !important; }

        .calyza-widget-frame {
            position: fixed;
            bottom: 110px;
            right: 24px;
            width: 400px;
            height: calc(100vh - 150px);
            max-height: 620px;
            border: 1px solid #e0e0e0;
            border-radius: 20px;
            box-shadow: 0 12px 40px rgba(124, 58, 237, 0.22);
            z-index: 99998;
            display: none;
            background: #fff;
            overflow: hidden;
        }
        .calyza-widget-frame.open { display: block; }

        @media (max-width: 480px) {
            .calyza-widget-frame {
                width: 100vw;
                height: 100vh;
                max-height: none;
                bottom: 0;
                right: 0;
                border-radius: 0;
                border: none;
            }
        }
    `;
    document.head.appendChild(style);

    var btn = document.createElement("button");
    btn.className = "calyza-avatar-btn";
    btn.setAttribute("aria-label", "Open Calyza AI");
    btn.innerHTML = '<img src="' + AVATAR_URL + '" alt="Calyza AI" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';" /><svg class="fallback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="display:none;"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/></svg><svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="display:none;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    document.body.appendChild(btn);

    var iframe = null;
    var isOpen = false;

    function openWidget() {
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.className = "calyza-widget-frame";
            iframe.src = WIDGET_URL;
            iframe.title = "Calyza AI";
            iframe.allow = "microphone";
            document.body.appendChild(iframe);
        }
        iframe.classList.add("open");
        btn.classList.add("open");
        isOpen = true;
    }

    function closeWidget() {
        if (iframe) iframe.classList.remove("open");
        btn.classList.remove("open");
        isOpen = false;
    }

    btn.addEventListener("click", function () {
        if (isOpen) closeWidget(); else openWidget();
    });

    // Listen for close message from iframe
    window.addEventListener("message", function (e) {
        if (e.data && e.data.type === "close-widget") {
            closeWidget();
        }
    });
})();
