(function () {
    var message = "正在搭建中，再多等几天吧～";
    var bubbleClass = "coming-soon-bubble";

    function shouldBlockLink(href) {
        if (!href || href === "#") {
            return false;
        }

        var normalizedHref = href.trim().toLowerCase();
        return normalizedHref.indexOf("#about") !== -1 ||
            normalizedHref.indexOf("#contact") !== -1;
    }

    function createBubble(anchor) {
        var existing = document.querySelector("." + bubbleClass);
        if (existing) {
            existing.remove();
        }

        var bubble = document.createElement("div");
        bubble.className = bubbleClass;
        bubble.textContent = message;
        document.body.appendChild(bubble);

        var rect = anchor.getBoundingClientRect();
        var bubbleRect = bubble.getBoundingClientRect();
        var top = rect.top + window.scrollY - bubbleRect.height - 10;
        var left = rect.left + window.scrollX + rect.width / 2 - bubbleRect.width / 2;

        if (left < 8) {
            left = 8;
        }

        var maxLeft = window.scrollX + window.innerWidth - bubbleRect.width - 8;
        if (left > maxLeft) {
            left = maxLeft;
        }

        if (top < window.scrollY + 8) {
            top = rect.bottom + window.scrollY + 10;
            bubble.classList.add("below");
        }

        bubble.style.top = top + "px";
        bubble.style.left = left + "px";

        window.setTimeout(function () {
            bubble.classList.add("show");
        }, 10);

        window.setTimeout(function () {
            bubble.classList.remove("show");
            window.setTimeout(function () {
                bubble.remove();
            }, 220);
        }, 1800);
    }

    function injectStyle() {
        if (document.getElementById("coming-soon-style")) {
            return;
        }

        var style = document.createElement("style");
        style.id = "coming-soon-style";
        style.textContent = "\n            ." + bubbleClass + " {\n                position: absolute;\n                z-index: 99999;\n                background: rgba(15, 23, 42, 0.95);\n                color: #fff;\n                font-size: 13px;\n                line-height: 1.4;\n                padding: 8px 12px;\n                border-radius: 999px;\n                box-shadow: 0 8px 20px rgba(15, 23, 42, 0.24);\n                pointer-events: none;\n                opacity: 0;\n                transform: translateY(6px) scale(0.96);\n                transition: opacity 0.22s ease, transform 0.22s ease;\n                white-space: nowrap;\n            }\n\n            ." + bubbleClass + ".show {\n                opacity: 1;\n                transform: translateY(0) scale(1);\n            }\n\n            ." + bubbleClass + "::after {\n                content: \"\";\n                position: absolute;\n                left: 50%;\n                bottom: -6px;\n                width: 10px;\n                height: 10px;\n                background: rgba(15, 23, 42, 0.95);\n                transform: translateX(-50%) rotate(45deg);\n            }\n\n            ." + bubbleClass + ".below::after {\n                top: -5px;\n                bottom: auto;\n            }\n\n            @media (max-width: 768px) {\n                ." + bubbleClass + " {\n                    font-size: 12px;\n                    max-width: calc(100vw - 24px);\n                    white-space: normal;\n                    text-align: center;\n                }\n            }\n        ";

        document.head.appendChild(style);
    }

    function bindBlockingLinks() {
        var navLinkSelector = ".nav-links a, .header-nav a, .top-nav a, .dock a";
        var links = document.querySelectorAll(navLinkSelector);

        links.forEach(function (link) {
            var href = link.getAttribute("href") || "";
            if (!shouldBlockLink(href)) {
                return;
            }

            link.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                createBubble(link);
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            injectStyle();
            bindBlockingLinks();
        });
    } else {
        injectStyle();
        bindBlockingLinks();
    }
})();
