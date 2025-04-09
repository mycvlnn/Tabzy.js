# Tabzy.js

Tabzy.js is a lightweight JavaScript library for creating tabbed interfaces. It provides an easy way to manage tabs and their corresponding content panels with customizable options.

## Features

-   Simple and lightweight
-   Customizable active tab styles
-   Supports URL query parameters for remembering active tabs
-   Callback support for tab change events

## Installation

Tabzy provides a small Js file that you can include directly via a CDN link. This makes it easy to integrate into your project and customize as needed.

Include the Tabzy JavaScript file in your project:

```html
<script src="https://cdn.jsdelivr.net/gh/mycvlnn/Tabzy.js@v1.0.1/tabzy.min.js"></script>
```

## Usage

### HTML Structure

```html
<div id="myTabs">
    <ul>
        <li><a href="#panel1">Tab 1</a></li>
        <li><a href="#panel2">Tab 2</a></li>
    </ul>
    <div id="panel1">Content for Tab 1</div>
    <div id="panel2">Content for Tab 2</div>
</div>
```

### JavaScript Initialization

```javascript
const tabs = new Tabzy("myTabs", {
    remberTab: true, // Remember the active tab using URL query parameters
    onChange: ({ tab, panel }) => {
        console.log("Tab changed:", tab, panel);
    },
    activeClassName: "custom-active-class", // Custom class for active tabs
});
```

## Options

-   `remberTab` (boolean): Whether to remember the active tab using URL query parameters. Default is `false`.
-   `onChange` (function): Callback function triggered when the active tab changes. Receives an object with `tab` and `panel` properties.
-   `activeClassName` (string): Custom class name for the active tab. Default is `"tabzy--active"`.

## Methods

### `switchTab(target)`

Switch to a specific tab. The `target` can be a string (e.g., `"#panel1"`) or a tab element.

### `destroy()`

Destroy the Tabzy instance and restore the original HTML structure.

## Example

```javascript
// Switch to a specific tab
tabs.switchTab("#panel2");

// Destroy the Tabzy instance
tabs.destroy();
```

## License

This project is licensed under the MIT License.
