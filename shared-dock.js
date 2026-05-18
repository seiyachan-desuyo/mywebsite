(function () {
    function getDockHtml(activeKey, inPagesDir) {
        var iconPrefix = inPagesDir ? "../icon/" : "icon/";
        var homeHref = inPagesDir ? "../index.html#home" : "index.html#home";
        var projectsHref = inPagesDir ? "projects.html" : "pages/projects.html";
        var aboutHref = inPagesDir ? "../index.html#about" : "index.html#about";
        var contactHref = inPagesDir ? "../index.html#contact" : "index.html#contact";
        var exploreHref = inPagesDir ? "explore.html" : "pages/explore.html";

        var isHome = activeKey === "home";
        var isProjects = activeKey === "projects";
        var isExplore = activeKey === "explore";

        return '' +
            '<div class="dock">' +
            '    <a href="' + homeHref + '" title="Home"' + (isHome ? ' class="active"' : '') + '>' +
            '        <img src="' + iconPrefix + 'Home.png" alt="Home">' +
            '        <span class="dock-label"><span data-lang="zh">首页</span><span data-lang="en">Home</span><span data-lang="ja">ホーム</span></span>' +
            '    </a>' +
            '    <a href="' + projectsHref + '" title="Projects"' + (isProjects ? ' class="active"' : '') + '>' +
            '        <img src="' + iconPrefix + 'Projects.png" alt="Projects">' +
            '        <span class="dock-label"><span data-lang="zh">项目</span><span data-lang="en">Projects</span><span data-lang="ja">作 品</span></span>' +
            '    </a>' +
            '    <a href="' + aboutHref + '" title="About">' +
            '        <img src="' + iconPrefix + 'About.png" alt="About">' +
            '        <span class="dock-label"><span data-lang="zh">关于</span><span data-lang="en">About</span><span data-lang="ja">私について</span></span>' +
            '    </a>' +
            '    <a href="' + contactHref + '" title="Contact">' +
            '        <img src="' + iconPrefix + 'Contact.png" alt="Contact">' +
            '        <span class="dock-label"><span data-lang="zh">联系</span><span data-lang="en">Contact</span><span data-lang="ja">連絡先</span></span>' +
            '    </a>' +
            '    <a href="' + exploreHref + '" title="Explore"' + (isExplore ? ' class="active"' : '') + '>' +
            '        <img src="' + iconPrefix + 'Explore.png" alt="Explore">' +
            '        <span class="dock-label"><span data-lang="zh">探索</span><span data-lang="en">Explore</span><span data-lang="ja">探 索</span></span>' +
            '    </a>' +
            '    <div class="dock-divider"></div>' +
            '    <a href="#" title="More">' +
            '        <img src="' + iconPrefix + 'More.png" alt="More">' +
            '        <span class="dock-label"><span data-lang="zh">更多</span><span data-lang="en">More</span><span data-lang="ja">もっと</span></span>' +
            '    </a>' +
            '</div>';
    }

    function renderSharedDock() {
        var roots = document.querySelectorAll('.shared-dock-root');
        var inPagesDir = /\/pages\//.test(window.location.pathname);

        roots.forEach(function (root) {
            var active = (root.getAttribute('data-active') || '').toLowerCase();
            root.innerHTML = getDockHtml(active, inPagesDir);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderSharedDock);
    } else {
        renderSharedDock();
    }
})();
