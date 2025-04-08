Tabzy.prototype.destroy = function () {
    this.container.innerHTML = this.original;
    this.container = null;
    this.panels.forEach((panel) => (panel.hidden = false));
    this.panels = null;
    this.tabs = null;
    this.original = null;
};

Tabzy.prototype.switchTab = function (target) {
    let tabActive = null;
    if (typeof target === "string") {
        tabActive = this.tabs.find((tab) => tab.getAttribute("href") === target);
    } else if (this.tabs.includes(target)) tabActive = target;

    if (!tabActive) {
        console.error("Element not found");
        return;
    }

    this._setActiveTab(tabActive);
};

Tabzy.prototype._setActiveTab = function (tabActive) {
    // Xoá bỏ style của các class li
    this.tabs.forEach((tab) => tab.closest("li").classList.remove("tabzy--active"));
    // Thêm class active cho tab hiện tại
    tabActive.closest("li").classList.add("tabzy--active");
    // Ẩn các panel đi
    this.panels.forEach((panel) => (panel.hidden = true));
    const panelActive = document.querySelector(tabActive.getAttribute("href"));
    // Hiển thị panel tương ứng
    panelActive.hidden = false;
    if (this.options.remberTab) {
        const params = new URLSearchParams(window.location.search);
        params.set(this.selector, tabActive.getAttribute("href").split("#")[1]);
        window.history.pushState({}, "", "?" + params.toString());
    }
};

Tabzy.prototype._init = function () {
    let tabActive = this.tabs[0];

    if (this.options.remberTab) {
        const params = new URLSearchParams(window.location.search);
        const activeTabName = params.get(this.selector);
        const tabActiveFound = this.tabs.find(
            (tab) => tab.getAttribute("href") === `#${activeTabName}`
        );
        if (tabActiveFound) tabActive = tabActiveFound;
    }

    this._setActiveTab(tabActive);
    // Add events
    this.tabs.forEach((tab) => {
        tab.onclick = (event) => this._handleTabClick(event, tab);
    });
};

Tabzy.prototype._handleTabClick = function (event, tabActive) {
    event.preventDefault();
    this._setActiveTab(tabActive);
};

function Tabzy(selector, options) {
    this.selector = selector;
    this.options = options ?? {};
    this.container = document.getElementById(this.selector);
    if (!this.container) {
        console.error(`Element with selector ${this.selector} not found`);
        return;
    }

    this.original = this.container.innerHTML;

    this.tabs = Array.from(this.container.querySelectorAll("li a"));

    if (!this.tabs.length) {
        console.error(`No tabs found in ${this.selector}`);
        return;
    }

    this.panels = this.tabs
        .map((tab) => {
            const panel = document.querySelector(tab.getAttribute("href"));
            if (!panel) {
                console.error(`Panel with selector ${tab.getAttribute("href")} not found`);
                return;
            }

            return panel;
        })
        .filter(Boolean);

    if (this.panels.length !== this.tabs.length) {
        console.error("Number of tabs and panels do not match");
        return;
    }

    this._init();
}

const tabzy = new Tabzy("tabs", {
    remberTab: true,
});

const tabzy2 = new Tabzy("tabs2", {
    remberTab: true,
});
