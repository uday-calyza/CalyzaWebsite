(function () {
    // Configuration
    var VOICEBOT_URL = "http://13.126.198.104:8000/voicepage";

    // Inject CSS
    var style = document.createElement("style");
    style.textContent = `
        .calyza-voice-btn {
            position: fixed;
            bottom: 24px;
            left: 24px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
            transition: transform 0.2s, box-shadow 0.2s;
            z-index: 99997;
        }
        .calyza-voice-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 8px 28px rgba(16, 185, 129, 0.45);
        }
        .calyza-voice-btn svg { width: 26px; height: 26px; }
        .calyza-voice-frame {
            position: fixed;
            bottom: 92px;
            left: 24px;
            width: 340px;
            height: calc(100vh - 140px);
            max-height: 500px;
            border: 1px solid #e0e0e0;
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(16, 185, 129, 0.2);
            z-index: 99996;
            display: none;
            background: #fff;
            overflow: hidden;
        }
        .calyza-voice-frame.open { display: block; }
        @media (max-width: 480px) {
            .calyza-voice-frame {
                width: 100vw;
                height: 100vh;
                max-height: none;
                bottom: 0;
                left: 0;
                border-radius: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create voice button
    var btn = document.createElement("button");
    btn.className = "calyza-voice-btn";
    btn.setAttribute("aria-label", "Open Calyza AI Voice");
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
    document.body.appendChild(btn);

    var iframe = null;
    var isOpen = false;

    btn.addEventListener("click", function () {
        isOpen = !isOpen;

        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.className = "calyza-voice-frame";
            iframe.src = VOICEBOT_URL;
            iframe.title = "Calyza AI Voice";
            iframe.allow = "microphone";
            document.body.appendChild(iframe);
        }

        if (isOpen) {
            iframe.classList.add("open");
            btn.style.background = "linear-gradient(135deg, #ef4444, #f87171)";
            btn.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.35)";
            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        } else {
            iframe.classList.remove("open");
            btn.style.background = "linear-gradient(135deg, #10b981, #34d399)";
            btn.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.35)";
            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
        }
    });
})();
