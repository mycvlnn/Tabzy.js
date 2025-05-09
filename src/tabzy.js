Tabzy.prototype.destroy = function () {
    this.container.innerHTML = this.original;
    this.container = null;
    this.panels.forEach((panel) => (panel.hidden = false));
    this.panels = null;
    this.tabs = null;
    this.currentTab = null;
};

Tabzy.prototype._tryActiveTab = function (tabActive) {
    if (this.currentTab !== tabActive) {
        this.currentTab = tabActive;
        this._setActiveTab(tabActive);
    }
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

    this._tryActiveTab(tabActive);
};

Tabzy.prototype._handleChangeQueryParam = function (tabActive) {
    const params = new URLSearchParams(window.location.search);
    const value = tabActive.getAttribute("href").split("#")[1];
    params.set(this.selector, value);
    window.history.pushState({}, "", "?" + params.toString());
};

Tabzy.prototype._setActiveTab = function (
    tabActive,
    triggerOnChange = true,
    triggerQueryParam = true
) {
    // Xoá bỏ style của các class li
    this.tabs.forEach((tab) => tab.closest("li").classList.remove(this.options.activeClassName));
    // Thêm class active cho tab hiện tại
    tabActive.closest("li").classList.add(this.options.activeClassName);
    // Ẩn các panel đi
    this.panels.forEach((panel) => (panel.hidden = true));
    const panelActive = document.querySelector(tabActive.getAttribute("href"));
    // Hiển thị panel tương ứng
    panelActive.hidden = false;

    if (this.options.remberTab && triggerQueryParam) {
        this._handleChangeQueryParam(tabActive);
    }

    if (this.options.onChange && triggerOnChange) {
        this.options.onChange({
            tab: tabActive,
            panel: panelActive,
        });
    }
};

Tabzy.prototype._getTabActiveFromURL = function () {
    const params = new URLSearchParams(window.location.search);
    const activeTabName = params.get(this.selector);
    const tabActiveFound = this.tabs.find(
        (tab) => tab.getAttribute("href") === `#${activeTabName}`
    );
    return tabActiveFound;
};

Tabzy.prototype._init = function () {
    const tabActive = (this.options.remberTab && this._getTabActiveFromURL()) || this.tabs[0];
    this.currentTab = tabActive;
    this._setActiveTab(tabActive, false, false);

    // Add events
    this.tabs.forEach((tab) => {
        tab.onclick = (event) => {
            event.preventDefault();
            this._tryActiveTab(tab);
        };
    });
};

Tabzy.prototype._getPanels = function () {
    return this.tabs
        .map((tab) => {
            const panel = document.querySelector(tab.getAttribute("href"));
            if (!panel) {
                console.error(`Panel with selector ${tab.getAttribute("href")} not found`);
                return;
            }

            return panel;
        })
        .filter(Boolean);
};

function Tabzy(selector, options) {
    this.selector = selector;
    this.options = Object.assign(
        {
            remberTab: false,
            onChange: null,
            activeClassName: "tabzy--active",
        },
        options
    );

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

    this.panels = this._getPanels();

    if (this.panels.length !== this.tabs.length) {
        console.error("Number of tabs and panels do not match");
        return;
    }

    this._init();
}
