// Tab samples

// Basic tabs
new Tabzy("fancy-tabs");

// Persist tabs
new Tabzy("persistent-tabs", {
    remberTab: true,
});

// Sliding tabs
const tabs3 = new Tabzy("sliding-tabs", {
    onChange: updateActiveLine,
    remberTab: true,
});

function updateActiveLine() {
    const activeTab = tabs3.currentTab;
    const tabLi = activeTab.closest("li");
    const activeLine = tabs3.container.nextElementSibling;

    activeLine.style.width = `${tabLi.offsetWidth}px`;
    activeLine.style.transform = `translateX(${tabLi.offsetLeft}px)`;
}

updateActiveLine();
