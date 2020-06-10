// const StaticLayouts = {
//     // static layouts for the editor DO NOT REMOVE
//     'mainLayoutForm': { "layoutId": "mainLayoutForm", "lastEdit": 0, "title": "Layout Form", "width": "260px", "height": "520px", "backgroundColor": "rgb(53,53,53)", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "h3", "id": "ee19a133", "content": "Layout Info", "styleAttributes": { "margin": "0 0 18px 0", "padding": "12px 0px 4px 8px", "background-color": "rgb(42,42,42)", "border-top": "solid 1px rgb(42,42,42)", "border-bottom": "solid 1px rgba(255,255,255,0.4)", "font-size": "22px" }, "children": [] }, { "type": "form", "swimAttributes": {}, "id": "1090afd2", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "content": "Layout Title", "styleAttributes": { "font-size": "18px" }, "id": "0ac74869" }, { "type": "input", "swimAttributes": { "bind": "{{blockTitleValue}}", "slot": "value" }, "htmlAttributes": { "type": "text" }, "styleAttributes": { "margin": "3px 0 10px 0", "background-color": "rgba(255,255,255,0.1)", "background": "rgba(255,255,255,0.1)", "border": "solid 1px rgba(255,255,255,0.8)", "color": "white", "font-size": "20px", "padding": "3px", "border-radius": "3px", "margin-bottom": "10px", "width": "95%" }, "id": "258f66d4" }, { "type": "div", "swimAttributes": {}, "content": "Layout Width", "styleAttributes": { "font-size": "18px" }, "id": "83fea821" }, { "type": "input", "swimAttributes": { "bind": "{{blockWidthValue}}", "slot": "value" }, "htmlAttributes": { "type": "text" }, "styleAttributes": { "margin": "3px 0 10px 0", "background-color": "rgba(255,255,255,0.1)", "background": "rgba(255,255,255,0.1)", "border": "solid 1px rgba(255,255,255,0.8)", "color": "white", "font-size": "20px", "padding": "3px", "border-radius": "3px", "margin-bottom": "10px", "width": "95%" }, "id": "1056f91e" }, { "type": "div", "swimAttributes": {}, "content": "Layout Height", "styleAttributes": { "font-size": "18px" }, "id": "1707e5cf" }, { "type": "input", "swimAttributes": { "bind": "{{blockHeightValue}}", "slot": "value" }, "htmlAttributes": { "type": "text" }, "styleAttributes": { "margin": "3px 0 10px 0", "background-color": "rgba(255,255,255,0.1)", "background": "rgba(255,255,255,0.1)", "border": "solid 1px rgba(255,255,255,0.8)", "color": "white", "font-size": "20px", "padding": "3px", "border-radius": "3px", "margin-bottom": "10px", "width": "95%" }, "id": "e9a054b0" }, { "type": "div", "swimAttributes": {}, "content": "Background Color", "styleAttributes": { "font-size": "18px" }, "id": "63568108" }, { "type": "input", "swimAttributes": { "bind": "{{blockBgColorValue}}", "slot": "value" }, "htmlAttributes": { "type": "text" }, "styleAttributes": { "margin": "3px 0 10px 0", "background-color": "rgba(255,255,255,0.1)", "background": "rgba(255,255,255,0.1)", "border": "solid 1px rgba(255,255,255,0.8)", "color": "white", "font-size": "20px", "padding": "3px", "border-radius": "3px", "margin-bottom": "10px", "width": "95%" }, "id": "bf26f39e" }, { "type": "div", "swimAttributes": {}, "content": "Layout Display Type", "styleAttributes": { "font-size": "18px" }, "id": "a32edb7c" }, { "type": "input", "swimAttributes": { "bind": "{{blockDisplayValue}}", "slot": "value" }, "htmlAttributes": { "type": "text" }, "styleAttributes": { "margin": "3px 0 10px 0", "background-color": "rgba(255,255,255,0.1)", "background": "rgba(255,255,255,0.1)", "border": "solid 1px rgba(255,255,255,0.8)", "color": "white", "font-size": "20px", "padding": "3px", "border-radius": "3px", "margin-bottom": "10px", "width": "95%" }, "id": "ea01c64a" }, { "type": "div", "swimAttributes": {}, "content": "Layout Flex Type", "styleAttributes": { "font-size": "18px" }, "id": "8bf2625c" }, { "type": "input", "swimAttributes": { "bind": "{{blockFlexType}}", "slot": "value" }, "htmlAttributes": { "type": "text" }, "styleAttributes": { "margin": "3px 0 10px 0", "background-color": "rgba(255,255,255,0.1)", "background": "rgba(255,255,255,0.1)", "border": "solid 1px rgba(255,255,255,0.8)", "color": "white", "font-size": "20px", "padding": "3px", "border-radius": "3px", "margin-bottom": "10px", "width": "95%" }, "id": "9e5c85a6" }], "styleAttributes": { "padding": "10px" } }, { "type": "h3", "swimAttributes": {}, "id": "7aada818", "content": "Layout Elements", "styleAttributes": { "margin": "0 0 18px 0", "padding": "12px 0 4px 8px", "background-color": "rgb(42,42,42)", "border-top": "solid 1px rgba(0,0,0,0.8)", "border-bottom": "solid 1px rgba(255,255,255,0.4)", "position": "relative", "font-size": "22px" }, "children": [{ "type": "div", "swimAttributes": { "width": "100%", "height": "100px" }, "id": "27e250a2", "content": "+", "styleAttributes": { "width": "28px", "height": "28px", "position": "absolute", "right": "3px", "top": "5px", "border-radius": "50%", "cursor": "pointer", "background-color": "rgba(255,255,255,0.3)", "text-align": "center", "line-height": "28px", "border": "solid 1px rgba(255,255,255,0.8)" }, "htmlAttributes": {} }] }], "keepSynced": false, "renderType": "json" },
//     'mainHeaderMenus': { "layoutId": "mainHeaderMenu", "lastEdit": 0, "title": "Editor Header Menus", "width": "100%", "height": "45px", "backgroundColor": "rgba(53,53,53,1)", "display": "flex", "flexDirection": "row", "layoutElements": [{ "type": "div", "swimAttributes": {}, "styleAttributes": {}, "id": "FileMenuContainer", "content": "", "children": [{ "type": "button", "swimAttributes": {}, "styleAttributes": {}, "id": "e2e1d9a7", "content": "File", "children": {}, "htmlAttributes": { "class": "dropbtn" } }, { "type": "div", "swimAttributes": {}, "styleAttributes": {}, "id": "26bd9978", "htmlAttributes": { "class": "dropdown-content" }, "children": [{ "type": "a", "swimAttributes": {}, "styleAttributes": {}, "id": "e5bae29c", "content": "New  Layout", "htmlAttributes": { "href": "javascript:pageController.newLayout()" } }, { "type": "a", "swimAttributes": {}, "styleAttributes": {}, "id": "933364fc", "content": "Load Layout", "htmlAttributes": { "href": "javascript:pageController.loadLayoutFromService()" } }, { "type": "a", "swimAttributes": {}, "styleAttributes": {}, "id": "d451499b", "content": "Save Layout", "htmlAttributes": { "href": "javascript:pageController.saveLayout()" } }, { "type": "a", "swimAttributes": {}, "styleAttributes": {}, "id": "adf15cb1", "content": "Load Template", "htmlAttributes": { "href": "javascript:pageController.loadLayoutFromList()" } }, { "type": "a", "swimAttributes": {}, "styleAttributes": {}, "id": "e328a3d2", "content": "Load from JSON", "htmlAttributes": { "href": "javascript:pageController.loadLayoutFromJson()" } }, { "type": "a", "swimAttributes": {}, "styleAttributes": {}, "id": "ba942fc2", "content": "Output JSON", "htmlAttributes": { "href": "javascript:pageController.debugLayout()" } }] }], "htmlAttributes": { "class": "dropdown" } }, { "type": "div", "swimAttributes": {}, "styleAttributes": {}, "id": "a997a04b", "children": [{ "type": "button", "swimAttributes": {}, "styleAttributes": {}, "id": "b4b0adbd", "content": "Config", "htmlAttributes": { "class": "dropbtn" } }, { "type": "div", "swimAttributes": {}, "styleAttributes": {}, "id": "a8ca9f23", "htmlAttributes": { "class": "dropdown-content" }, "children": [{ "type": "a", "swimAttributes": {}, "styleAttributes": {}, "id": "36a36814", "content": "Quilt Link Config", "htmlAttributes": { "href": "javascript:pageController.showQuiltConfigDialog()" } }, { "type": "a", "swimAttributes": {}, "styleAttributes": {}, "id": "c49ea016", "content": "Swim Link Config", "htmlAttributes": { "href": "javascript:pageController.showLinkConfigDialog()" } }, { "type": "a", "swimAttributes": {}, "styleAttributes": {}, "id": "faf0659b", "content": "Flush Saved Templates", "htmlAttributes": { "href": "javascript:pageController.flushSavedTemplates()" } }] }], "htmlAttributes": { "class": "dropdown" } }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "color": "white", "line-height": "42px", "text-align": "right" }, "id": "swimHostUrlLabel", "content": "" }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "color": "white", "line-height": "42px" }, "id": "452d2af0" }], "keepSynced": false },
//     'loadListDialog': { "layoutId": "loadListDialog", "lastEdit": 0, "title": "Load Layout Dialog", "style": null, "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": { "width": "100%" }, "id": "a199175b", "styleAttributes": { "display": "flex", "flex-direction": "column", "margin": "15px" }, "children": [{ "type": "h2", "swimAttributes": { "width": "100%" }, "id": "fc14565c", "content": "Load Card Layout", "styleAttributes": { "color": "black", "margin": "10px 0 0 0" } }, { "type": "h3", "swimAttributes": {}, "id": "353ec5b7", "content": "error message", "htmlAttributes": {}, "styleAttributes": { "color": "red" } }, { "type": "div", "swimAttributes": {}, "id": "ddb022da", "content": "<list goes here>", "htmlAttributes": {}, "styleAttributes": { "border": "solid 3px rgba(100,100,100, 0.3)", "border-radius": "10px", "height": "270px", "overflow": "auto" } }, { "type": "div", "swimAttributes": { "width": "100%", "height": "100px" }, "id": "b6fb0f93", "children": [{ "type": "button", "swimAttributes": {}, "id": "0e315fca", "content": "Cancel", "styleAttributes": { "font-size": "27px", "flex-grow": "1", "margin": "20px", "padding": "20px 0", "background-color": "rgb(43,43,53)", "color": "white", "border": "0px", "border-radius": "5px" } }], "styleAttributes": { "display": "flex", "flex-direction": "row" } }] }] },

//     'addAttributeForm': { "title": "New Add Attr Form", "style": null, "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": { "width": "100%" }, "id": "a199175b", "styleAttributes": { "display": "flex", "flex-direction": "column", "margin": "15px" }, "children": [{ "type": "h2", "swimAttributes": { "width": "100%" }, "id": "fc14565c", "content": "Add Attribute to Element", "styleAttributes": { "color": "black", "margin": "10px 0 0 0" } }, { "type": "h3", "swimAttributes": {}, "id": "353ec5b7", "content": "error message", "htmlAttributes": {}, "styleAttributes": { "color": "red" } }, { "type": "div", "swimAttributes": {}, "id": "ddb022da", "content": "", "htmlAttributes": {}, "styleAttributes": { "display": "flex", "flex-direction": "row", "width": "95%", "padding-bottom": "10px", "margin": "0px auto" }, "children": [{ "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "right", "width": "25%", "padding-right": "5px", "color": "black" }, "id": "2c102917", "content": "Attribute Name" }, { "type": "input", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "width": "75%", "font-size": "27px", "background-color": "rgba(155,155,155,0.4)", "border": "solid 1px rgba(45,45,45,0.4)", "padding-left": "5px" }, "id": "e299d99c", "htmlAttributes": { "type": "text" } }] }, { "type": "div", "swimAttributes": {}, "id": "ddb022db", "content": "", "htmlAttributes": {}, "styleAttributes": { "display": "flex", "flex-direction": "row", "width": "95%", "margin": "0px auto" }, "children": [{ "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "right", "width": "25%", "padding-right": "5px", "color": "black" }, "id": "88cc7f14", "content": "Attribute Value" }, { "type": "input", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "width": "75%", "font-size": "27px", "background-color": "rgba(155,155,155,0.4)", "border": "solid 1px rgba(45,45,45,0.4)", "padding-left": "5px" }, "id": "01fa2cb7", "htmlAttributes": { "type": "text" } }] }, { "type": "div", "swimAttributes": { "width": "100%", "height": "100px" }, "id": "b6fb0f93", "children": [{ "type": "input", "swimAttributes": {}, "id": "917495b7", "content": "Add", "styleAttributes": { "flex-grow": "1", "font-size": "27px", "margin": "20px", "padding": "20px 0", "background-color": "rgb(43,43,53)", "border": "0", "color": "white", "border-radius": "5px" }, "htmlAttributes": { "type": "button", "value": "Add" } }, { "type": "input", "swimAttributes": {}, "id": "0e315fca", "content": "Cancel", "styleAttributes": { "font-size": "27px", "flex-grow": "1", "margin": "20px", "padding": "20px 0", "background-color": "rgb(43,43,53)", "color": "white", "border": "0px", "border-radius": "5px" }, "htmlAttributes": { "type": "button", "value": "Cancel" } }], "styleAttributes": { "display": "flex", "flex-direction": "row" } }] }], "id": "6693a2c9" },
//     'loadJsonDialog': { "title": "Load Layout", "style": null, "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": { "width": "100%" }, "id": "a199175b", "styleAttributes": { "display": "flex", "flex-direction": "column", "margin": "15px" }, "children": [{ "type": "h2", "swimAttributes": { "width": "100%" }, "id": "fc14565c", "content": "Load Card Layout", "styleAttributes": { "color": "black", "margin": "10px 0 0 0" } }, { "type": "h3", "swimAttributes": {}, "id": "353ec5b7", "content": "error message", "htmlAttributes": {}, "styleAttributes": { "color": "red" } }, { "type": "textarea", "swimAttributes": {}, "id": "ddb022da", "content": "Enter Layout JSON", "htmlAttributes": { "cols": "60", "rows": "15" }, "styleAttributes": { "border": "solid 3px rgba(100,100,100, 0.3)", "border-radius": "10px" } }, { "type": "div", "swimAttributes": { "width": "100%", "height": "100px" }, "id": "b6fb0f93", "children": [{ "type": "button", "swimAttributes": {}, "id": "3fcd7fab", "content": "Load", "styleAttributes": { "flex-grow": "1", "font-size": "27px", "margin": "20px", "padding": "20px 0", "background-color": "rgb(43,43,53)", "border": "0", "color": "white", "border-radius": "5px" } }, { "type": "button", "swimAttributes": {}, "id": "0e315fca", "content": "Cancel", "styleAttributes": { "font-size": "27px", "flex-grow": "1", "margin": "20px", "padding": "20px 0", "background-color": "rgb(43,43,53)", "color": "white", "border": "0px", "border-radius": "5px" } }], "styleAttributes": { "display": "flex", "flex-direction": "row" } }] }] },
//     'dataLinkConfigForm': { "title": "Data Link Config Form", "width": "640px", "height": "480px", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": { "width": "100%" }, "id": "a199175b", "styleAttributes": { "display": "flex", "flex-direction": "column", "margin": "0 15px", "height": "75%", "flex-grow": "1" }, "children": [{ "type": "h2", "swimAttributes": { "width": "100%" }, "id": "fc14565c", "content": "link config", "styleAttributes": { "color": "black", "margin": "10px 0 0 0" } }, { "type": "h3", "swimAttributes": {}, "id": "353ec5b7", "content": "error message", "htmlAttributes": {}, "styleAttributes": { "color": "red" } }, { "type": "div", "swimAttributes": {}, "id": "ddb022da", "content": "", "htmlAttributes": {}, "styleAttributes": { "display": "flex", "flex-direction": "row", "width": "95%", "padding-bottom": "10px", "margin": "0px auto" }, "children": [{ "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "right", "width": "25%", "padding-right": "5px", "color": "black" }, "content": "Host", "id": "140f3854" }, { "type": "input", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "width": "75%", "font-size": "27px", "background-color": "rgba(155,155,155,0.4)", "border": "solid 1px rgba(45,45,45,0.4)", "padding-left": "5px" }, "htmlAttributes": { "type": "text" }, "id": "96af4f65" }] }, { "type": "div", "swimAttributes": {}, "id": "ddb022da", "content": "", "htmlAttributes": {}, "styleAttributes": { "display": "flex", "flex-direction": "row", "width": "95%", "padding-bottom": "10px", "margin": "0px auto" }, "children": [{ "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "right", "width": "25%", "padding-right": "5px", "color": "black" }, "id": "2c102917", "content": "Node" }, { "type": "input", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "width": "75%", "font-size": "27px", "background-color": "rgba(155,155,155,0.4)", "border": "solid 1px rgba(45,45,45,0.4)", "padding-left": "5px" }, "id": "e299d99c", "htmlAttributes": { "type": "text" } }] }, { "type": "div", "swimAttributes": {}, "id": "ddb022db", "content": "", "htmlAttributes": {}, "styleAttributes": { "display": "flex", "flex-direction": "row", "width": "95%", "margin": "0px auto", "padding-bottom": "10px" }, "children": [{ "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "right", "width": "25%", "padding-right": "5px", "color": "black" }, "id": "88cc7f14", "content": "Lane" }, { "type": "input", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "width": "75%", "font-size": "27px", "background-color": "rgba(155,155,155,0.4)", "border": "solid 1px rgba(45,45,45,0.4)", "padding-left": "5px" }, "id": "01fa2cb7", "htmlAttributes": { "type": "text" } }] }, { "type": "div", "swimAttributes": {}, "content": "", "htmlAttributes": {}, "styleAttributes": { "display": "flex", "flex-direction": "row", "width": "95%", "margin": "0px auto" }, "children": [{ "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "right", "width": "25%", "padding-right": "5px", "color": "black" }, "content": "Keep Synced", "id": "22c76974" }, { "type": "input", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "width": "75%", "font-size": "27px", "background-color": "rgba(155,155,155,0.4)", "border": "solid 1px rgba(45,45,45,0.4)", "padding-left": "5px" }, "htmlAttributes": { "type": "text" }, "id": "faf17c1c" }], "id": "a7000b31" }, { "type": "div", "swimAttributes": { "width": "100%", "height": "110px" }, "id": "b6fb0f93", "children": [{ "type": "input", "swimAttributes": {}, "id": "917495b7", "content": "", "styleAttributes": { "flex-grow": "1", "font-size": "27px", "margin": "20px", "padding": "20px 0", "background-color": "rgb(43,43,53)", "border": "0", "color": "white", "border-radius": "5px" }, "htmlAttributes": { "type": "button", "value": "Connect" } }, { "type": "input", "swimAttributes": {}, "id": "0e315fca", "content": "Cancel", "styleAttributes": { "font-size": "27px", "flex-grow": "1", "margin": "20px", "padding": "20px 0", "background-color": "rgb(43,43,53)", "color": "white", "border": "0px", "border-radius": "5px" }, "htmlAttributes": { "type": "button", "value": "Done" } }], "styleAttributes": { "display": "flex", "flex-direction": "row" } }] }], "hostUrl": null, "hostPort": null, "node": null, "lane": null },
//     'quiltConfigForm': { "title": "Quilt Config Form", "width": "640px", "height": "480px", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": { "width": "100%" }, "id": "a199175b", "styleAttributes": { "display": "flex", "flex-direction": "column", "margin": "0 15px", "height": "75%", "flex-grow": "1" }, "children": [{ "type": "h2", "swimAttributes": { "width": "100%" }, "id": "fc14565c", "content": "link config", "styleAttributes": { "color": "black", "margin": "10px 0 0 0" } }, { "type": "h3", "swimAttributes": {}, "id": "353ec5b7", "content": "error message", "htmlAttributes": {}, "styleAttributes": { "color": "red" } }, { "type": "div", "swimAttributes": {}, "id": "ddb022da", "content": "", "htmlAttributes": {}, "styleAttributes": { "display": "flex", "flex-direction": "row", "width": "95%", "padding-bottom": "10px", "margin": "0px auto" }, "children": [{ "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "right", "width": "25%", "padding-right": "5px", "color": "black" }, "content": "Host", "id": "140f3854" }, { "type": "input", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "width": "75%", "font-size": "27px", "background-color": "rgba(155,155,155,0.4)", "border": "solid 1px rgba(45,45,45,0.4)", "padding-left": "5px" }, "htmlAttributes": { "type": "text" }, "id": "96af4f65" }] }, { "type": "div", "swimAttributes": {}, "id": "ddb022da", "content": "", "htmlAttributes": {}, "styleAttributes": { "display": "none", "flex-direction": "row", "width": "95%", "padding-bottom": "10px", "margin": "0px auto" }, "children": [{ "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "right", "width": "25%", "padding-right": "5px", "color": "black" }, "id": "2c102917", "content": "Node" }, { "type": "input", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "width": "75%", "font-size": "27px", "background-color": "rgba(155,155,155,0.4)", "border": "solid 1px rgba(45,45,45,0.4)", "padding-left": "5px" }, "id": "e299d99c", "htmlAttributes": { "type": "text" } }] }, { "type": "div", "swimAttributes": {}, "id": "ddb022db", "content": "", "htmlAttributes": {}, "styleAttributes": { "display": "flex", "flex-direction": "row", "width": "95%", "margin": "0px auto", "padding-bottom": "10px" }, "children": [{ "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "right", "width": "25%", "padding-right": "5px", "color": "black" }, "id": "88cc7f14", "content": "Quilt ID" }, { "type": "input", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "width": "75%", "font-size": "27px", "background-color": "rgba(155,155,155,0.4)", "border": "solid 1px rgba(45,45,45,0.4)", "padding-left": "5px" }, "id": "01fa2cb7", "htmlAttributes": { "type": "text" } }] }, { "type": "div", "swimAttributes": { "width": "100%", "height": "110px" }, "id": "b6fb0f93", "children": [{ "type": "input", "swimAttributes": {}, "id": "917495b7", "content": "", "styleAttributes": { "flex-grow": "1", "font-size": "27px", "margin": "20px", "padding": "20px 0", "background-color": "rgb(43,43,53)", "border": "0", "color": "white", "border-radius": "5px" }, "htmlAttributes": { "type": "button", "value": "Update" } }, { "type": "input", "swimAttributes": {}, "id": "0e315fca", "content": "Cancel", "styleAttributes": { "font-size": "27px", "flex-grow": "1", "margin": "20px", "padding": "20px 0", "background-color": "rgb(43,43,53)", "color": "white", "border": "0px", "border-radius": "5px" }, "htmlAttributes": { "type": "button", "value": "Cancel" } }], "styleAttributes": { "display": "flex", "flex-direction": "row" } }] }], "hostUrl": null, "hostPort": null, "node": null, "lane": null, "keepSynced": false },
//     'flexTestLayout': { "title": "flex test layout", "style": null, "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": {}, "id": "9d2fe39b", "styleAttributes": { "background-color": "red", "width": "200px", "height": "200px", "margin": "5px" } }, { "type": "div", "swimAttributes": { "width": "100%", "height": "100px" }, "id": "08734296", "styleAttributes": { "width": "200px", "height": "200px", "background-color": "blue", "margin": "5px" } }] },

//     // static layout templates for ESP. 
//     '@canary': { "title": "@Canary Card Layout", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "row", "layoutElements": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1 }, "id": "88181e51", "children": [{ "type": "swim-canary-card", "swimAttributes": { "width": "100%", "header": false }, "styleAttributes": { "flex-grow": 1, "width": "100%", "height": "100%" }, "id": "37a2b719", "content": "" }] }], "hostUrl": null, "hostPort": null, "node": null, "lane": null, "keepSynced": false },
//     '@chart': { "title": "@Chart Layout", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "display": "flex", "height": "90%" }, "id": "52716243", "children": [{ "type": "swim-time-series", "swimAttributes": { "width": "100%", "height": "100%", "gutter-left": "60px", "gutter-bottom": "20px", "header": false }, "styleAttributes": { "flex-grow": 1 }, "id": "584d0bee" }] }], "hostUrl": null, "hostPort": null, "node": null, "lane": null, "keepSynced": false },
//     '@gauge': { "title": "@Gauge Card", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": "1", "display": "flex", "padding": "0px", "margin-left": "5%", "margin-right": "5%", "margin-top": "5%", "margin-bottom": "5%" }, "id": "78bcaa56", "content": "", "children": [{ "type": "swim-gauge", "swimAttributes": { "width": "100%", "meter": "{{powerBattery}}", "height": "100%", "dial-corner": "10", "header": false }, "styleAttributes": { "flex-grow": 1 }, "id": "cd9db6a1", "content": "" }] }], "hostUrl": "", "hostPort": "", "node": "", "lane": "", "keepSynced": false },
//     '@pie': { "title": "@Pie chart ", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": "1", "display": "flex", "padding": "0px", "margin-left": "0%", "margin-right": "0%", "margin-top": "0%", "margin-bottom": "0%" }, "id": "78bcaa56", "content": "", "children": [{ "type": "swim-pie", "swimAttributes": { "inner-radius": "40", "outer-radius": "160", "tick-radius": "180", "tick-length": "240", "tick-color": "#667095", "label-radius": "135", "pad-angle": "0", "label-size": "10", "label-color": "#ffffff", "title-size": "14", "title-color": "#7883AA", "header": false }, "styleAttributes": { "flex-grow": "1" }, "id": "ab79f9fc", "content": "" }] }], "hostUrl": null, "hostPort": null, "node": null, "lane": null, "keepSynced": false },
//     '@donut': { "title": "@Donut pie chart ", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": "1", "display": "flex", "padding": "0px", "margin-left": "0%", "margin-right": "0%", "margin-top": "0%", "margin-bottom": "0%" }, "id": "78bcaa56", "content": "", "children": [{ "type": "swim-pie", "swimAttributes": { "inner-radius": "40", "outer-radius": "160", "tick-radius": "180", "tick-length": "240", "tick-color": "#667095", "label-radius": "135", "pad-angle": "0", "label-size": "10", "label-color": "#ffffff", "title-size": "14", "title-color": "#7883AA", "header": false }, "styleAttributes": { "flex-grow": "1" }, "id": "ab79f9fc", "content": "" }] }], "hostUrl": null, "hostPort": null, "node": null, "lane": null, "keepSynced": false },
//     '@treemap': { "title": "@Treemap chart", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "display": "flex", "padding": "0px", "margin-left": "2%", "margin-right": "2%", "margin-top": "2%", "margin-bottom": "2%" }, "id": "fead5c64", "content": "", "children": [{ "type": "swim-treemap", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1 }, "id": "31ed4f1c", "content": "" }] }], "hostUrl": "", "hostPort": "", "node": "", "lane": "", "keepSynced": false },
//     'loginForm': { "title": "Login Form", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "row", "layoutElements": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "width": "420px", "margin": "40px auto", "height": "400px", "background-color": "rgba(155,155,155,0.2)", "display": "flex", "flex-direction": "column", "border-radius": "5px" }, "id": "7b8c3d21", "children": [{ "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "padding": "0px 10px" }, "id": "2cecd57e", "content": "UserName" }, { "type": "input", "swimAttributes": {}, "styleAttributes": { "padding": "10px", "margin": "0px 10px" }, "id": "709b0b18", "htmlAttributes": { "type": "text" } }, { "type": "h3", "swimAttributes": { "width": "100%" }, "styleAttributes": { "padding": "0px 10px" }, "id": "32e98c6a", "content": "Password" }, { "type": "input", "swimAttributes": {}, "styleAttributes": { "margin": "0px 10px", "padding": "10px" }, "id": "3586e072", "content": "", "htmlAttributes": { "type": "text" } }, { "type": "input", "swimAttributes": {}, "styleAttributes": { "margin": "20px", "font-size": "27px" }, "id": "f0bdc8ae", "htmlAttributes": { "type": "button", "value": "Login" } }] }], "hostUrl": "", "hostPort": "", "node": "", "lane": "", "keepSynced": false },
//     'cardMainLayout': { "title": "Card Base Layout", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "row", "layoutElements": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "width": "100%", "height": "100%", "flex-shrink": "0" }, "id": "85b73a7b", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "flex-direction": "column" }, "id": "b6933185", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "height": "5%", "flex-direction": "row" }, "id": "aca40a2a", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "width": "60%", "display": "flex" }, "id": "5cfbae2e", "content": "", "children": [{ "type": "swim-text", "swimAttributes": { "slot": "title" }, "styleAttributes": { "color": "rgb(78,84,108)", "padding-top": "0.5%", "padding-left": "1.5%" }, "id": "31fb9ec5", "content": "-title-" }], "name": "Title" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "flex-direction": "row-reverse" }, "id": "fbb5cd76", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "color": "rgb(78, 84, 108)", "opacity": "0.5", "padding-top": "0.5%", "padding-right": "2.5%" }, "id": "c41341e7", "content": "ALL SYSTEMS" }], "name": "System Name" }], "name": "Header Row" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "height": "95%", "position": "relative" }, "id": "3baa2621", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "display": "flex", "position": "absolute", "top": "0%", "bottom": "0%", "right": "1.8%", "left": "1.8%" }, "id": "cardChartContainer", "name": "chart target" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "position": "absolute", "top": "0px", "left": "3.8%", "right": "3.8%", "border-top": "solid 1px #529fc1", "display": "none" }, "id": "8e021f2b", "name": "blue top line" }, { "type": "swim-text", "swimAttributes": { "slot": "subtitle" }, "styleAttributes": { "position": "absolute", "left": "3.8%", "top": "1.6%", "opacity": "0" }, "id": "39be1de1", "content": "-subtitle-", "name": "subtitle" }], "name": "Center Row" }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "height": "1%" }, "id": "45ab68bf", "content": "", "name": "footer" }], "name": "Padding" }], "name": "Main" }], "hostUrl": "", "hostPort": "", "node": "", "lane": "", "keepSynced": false },
//     'modalMainLayout': { "title": "Modal Base Layout", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "row", "layoutElements": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "width": "100%", "height": "100%", "flex-shrink": "0" }, "id": "db97694a", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "flex-direction": "column" }, "id": "d37b387d", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "height": "10%", "flex-direction": "row" }, "id": "aca40a2a", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "width": "60%", "display": "flex", "align-items": "center", "margin-left": "3.8%" }, "id": "afd6c1db", "content": "", "children": [{ "type": "swim-text", "swimAttributes": { "slot": "title" }, "styleAttributes": { "font-size": "24px", "color": "rgb(78,84,108)" }, "id": "a82ff7a1", "content": "-title-" }], "name": "Title" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "flex-direction": "row-reverse", "align-items": "center", "margin-right": "3.8%" }, "id": "96480d63", "content": "", "children": [{ "type": "swim-text", "swimAttributes": {}, "styleAttributes": { "color": "rgb(78, 84, 108)", "opacity": "0.5" }, "id": "7f041834", "content": "ALL SYSTEMS" }], "name": "System Name" }], "name": "Header Row" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "height": "80%", "position": "relative" }, "id": "f34fd5cd", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "display": "flex", "position": "absolute", "top": "0%", "bottom": "0%", "right": "3.8%", "left": "3.8%" }, "id": "mainChartContainer", "name": "chart target" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "position": "absolute", "top": "0px", "left": "3.8%", "right": "3.8%", "border-top": "solid 1px #529fc1" }, "id": "34b3d8b3", "name": "blue top line" }, { "type": "swim-text", "swimAttributes": { "slot": "subtitle" }, "styleAttributes": { "position": "absolute", "left": "3.8%", "top": "1.6%", "opacity": "0" }, "id": "80f95769", "content": "-subtitle-", "name": "subtitle" }], "name": "Center Row" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": "1", "flex-direction": "row", "display": "flex", "position": "relative", "height": "15%" }, "id": "30ab02aa", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "position": "absolute", "top": "0%", "bottom": "0%", "left": "3.8%", "right": "3.8%", "display": "flex" }, "id": "secondChartContainer", "content": "", "children": [{ "type": "swim-time-series", "swimAttributes": { "width": "100%", "gutter-left": "0px", "gutter-bottom": "0px", "header": false, "subheader": false }, "styleAttributes": { "flex-grow": 1 }, "id": "954dfba4" }], "name": "second chart tagget" }], "name": "second chart row" }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "height": "5%" }, "id": "10a281f8", "content": "", "name": "footer" }], "name": "Padding" }], "name": "Main" }], "hostUrl": "", "hostPort": "", "node": "", "lane": "", "keepSynced": false },
//     'moonOverMountainsLayout': { "title": "Moon Over Mountains Layout", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "row", "layoutElements": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "width": "100%", "height": "100%", "flex-shrink": "0" }, "id": "db97694a", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "flex-direction": "column" }, "id": "d37b387d", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "height": "10%", "flex-direction": "row" }, "id": "aca40a2a", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "width": "60%", "display": "flex", "align-items": "center", "margin-left": "3.8%" }, "id": "afd6c1db", "content": "", "children": [{ "type": "swim-text", "swimAttributes": { "slot": "title" }, "styleAttributes": { "font-size": "24px", "color": "rgb(78,84,108)" }, "id": "a82ff7a1", "content": "-title-" }], "name": "Title" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "flex-direction": "row-reverse", "align-items": "center", "margin-right": "3.8%" }, "id": "96480d63", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "color": "rgb(78, 84, 108)", "opacity": "0.5" }, "id": "7f041834", "content": "ALL SYSTEMS" }], "name": "System Name" }], "name": "Header Row" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "height": "80%", "position": "relative" }, "id": "f34fd5cd", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "display": "flex", "position": "absolute", "top": "0%", "bottom": "0%", "right": "3.8%", "left": "3.8%" }, "id": "mainChartContainer", "name": "time series target" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "position": "absolute", "top": "0px", "left": "3.8%", "right": "3.8%", "border-top": "solid 1px #529fc1" }, "id": "34b3d8b3", "name": "blue top line" }, { "type": "swim-text", "swimAttributes": { "slot": "subtitle" }, "styleAttributes": { "position": "absolute", "left": "3.8%", "top": "1.6%", "opacity": "0" }, "id": "80f95769", "content": "-subtitle-", "name": "subtitle" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "position": "absolute", "width": "40%", "height": "40%", "top": "0px", "right": "0px" }, "id": "smallChartContainer", "name": "small chart target" }], "name": "Center Row" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": "1", "flex-direction": "row", "display": "flex", "position": "relative", "height": "15%" }, "id": "30ab02aa", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "position": "absolute", "top": "0%", "bottom": "0%", "left": "3.8%", "right": "3.8%", "display": "flex" }, "id": "secondChartContainer", "content": "", "children": [{ "type": "swim-time-series", "swimAttributes": { "width": "100%", "gutter-left": "0px", "gutter-bottom": "0px", "header": false, "subheader": false }, "styleAttributes": { "flex-grow": 1 }, "id": "954dfba4" }], "name": "second chart tagget" }], "name": "second chart row" }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "height": "5%" }, "id": "10a281f8", "content": "", "name": "footer" }], "name": "Padding" }], "name": "Main" }], "hostUrl": "", "hostPort": "", "node": "", "lane": "", "keepSynced": false },

//     // older layouts
//     'pieChartCard3': { "title": "pie chart 1", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "row", "layoutElements": [{ "type": "swim-pie", "swimAttributes": { "width": "100%", "inner-radius": "0", "outer-radius": "60", "tick-radius": "80", "tick-length": "140", "tick-color": "#667095", "label-radius": "35", "label-size": "10", "label-color": "#ffffff", "title-size": "14", "title-color": "#7883aa" }, "styleAttributes": { "flex-grow": "1" }, "id": "13245", "content": "" }] },
//     'boxGraphCard': { "title": "block chart", "width": "100%", "height": "100%", "backgroundColor": "transparent", "display": "flex", "flexDirection": "column", "layoutElements": [{ "type": "div", "swimAttributes": {}, "id": "9d2fe39b", "styleAttributes": { "flex-grow": "0", "height": "6%" }, "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "color": "#555c78", "margin": "2%" }, "id": "661d7ca7", "content": "Alerts Distribution by Fan Types & Manufacturers - Al" }] }, { "type": "div", "swimAttributes": {}, "id": "08734296", "styleAttributes": { "flex-grow": "1", "display": "flex", "height": "77%", "width": "100%", "flex-direction": "row" }, "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": "1", "display": "flex", "flex-direction": "row", "margin": "2%" }, "id": "440cb5a2", "content": "", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": "1", "background-color": "#d4d7e5", "border": "solid 1px #b0b6cf", "display": "flex", "flex-shrink": "0", "width": "33%" }, "id": "96d6d678", "children": [{ "type": "span", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "border-right": "solid 1px #b0b6cf", "display": "flex", "overflow": "hidden", "text-align": "center", "align-items": "center" }, "id": "054e1d501", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "24c68b73", "content": "Samsung" }], "content": "" }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "display": "flex", "flex-direction": "column" }, "id": "9ee59edf", "content": "", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": "1.7", "border-bottom": "solid 1px #b0b6cf", "text-align": "center", "align-items": "center", "display": "flex" }, "id": "7bf10628", "content": "", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1 }, "id": "75114a32", "content": "LG" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "border-bottom": "solid 1px #b0b6cf", "display": "flex", "align-items": "center" }, "id": "d31b2f01", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "41ec8cdf", "content": "LTech" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "display": "flex", "align-items": "center" }, "id": "e2d38b18", "content": "", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "c6bcc9cb", "content": "TEL" }] }] }] }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "background-color": "#e0e2ec", "border": "solid 1px #b0b6cf", "flex-shrink": "0", "display": "flex", "width": "33%" }, "id": "9179933a", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "border-right": "solid 1px #b0b6cf", "display": "flex", "align-items": "center" }, "id": "bf5646ce", "content": "", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "7d6b584a", "content": "Samsung" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "display": "flex", "flex-direction": "column" }, "id": "5d5ceb7e", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "border-bottom": "solid 1px #b0b6cf", "display": "flex", "align-items": "center" }, "id": "ee57a30d", "content": "", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "cf495ff3", "content": "XPower" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "border-bottom": "solid 1px #b0b6cf", "display": "flex", "align-items": "center" }, "id": "79576306", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "9d8db363", "content": "Ltech" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "border-bottom": "solid 1px #b0b6cf", "display": "flex", "align-items": "center" }, "id": "0e3f6374", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "4f77c46e", "content": "PG" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "display": "flex", "align-items": "center", "border-bottom": "solid 1px #b0b6cf" }, "id": "f0d5aa9e", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "cbabebc9", "content": "TEL" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "display": "flex", "align-items": "center" }, "id": "a5e75b9c", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "3e0bd773", "content": "G5" }] }] }] }, { "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "background-color": "#eeeff5", "border": "solid 1px #b0b6cf", "flex-shrink": "0", "display": "flex", "width": "33%" }, "id": "ecc0feee", "content": "", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "border-right": "solid 1px #b0b6cf", "display": "flex", "align-items": "center" }, "id": "2cba09a0", "content": "", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "132e1d3c", "content": "LTech" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "display": "flex", "flex-direction": "column" }, "id": "e6f25067", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "border-bottom": "solid 1px #b0b6cf", "display": "flex", "align-items": "center" }, "id": "5e13a780", "content": "", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "28a3260a", "content": "PG" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "border-bottom": "solid 1px #b0b6cf", "display": "flex", "align-items": "center" }, "id": "1db161ee", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "2213f1e8", "content": "TEL" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "display": "flex", "align-items": "center" }, "id": "dd5fcdb8", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "text-align": "center" }, "id": "4e02c462", "content": "G5" }] }] }] }] }], "content": "" }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": "0", "height": "16%", "display": "flex", "padding": "0px" }, "id": "165d28d8", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "margin": "2%", "display": "flex" }, "id": "aad130ae", "children": [{ "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": "1", "display": "flex", "width": "33%" }, "id": "6211555d", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "width": "20px" }, "id": "c47b2767", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "width": "20px", "height": "20px", "background-color": "#cccfe0", "border": "solid 1px #b7bed9" }, "id": "c8a005dc" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "padding": "0 0 0 10px", "display": "flex", "flex-direction": "column" }, "id": "309e5643", "children": [{ "type": "swim-text", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "font-size": "12px" }, "id": "3fa0e788", "content": "Fan Type 1 (2 blade)" }, { "type": "swim-text", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "font-size": "12px" }, "id": "d4e46fc1", "content": "51% of types" }, { "type": "swim-text", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "font-size": "12px" }, "id": "ca48ae9d", "content": "5 Fan dudes" }] }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": "1", "display": "flex", "width": "33%" }, "id": "669c77bc", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": "0", "width": "20px" }, "id": "b80f830c", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "width": "20px", "height": "20px", "border": "solid 1px #b7bed9", "background-color": "#e0e2ec" }, "id": "e24df4ae" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "display": "flex", "padding": "0 0 0 10px", "flex-direction": "column" }, "id": "e3502637", "children": [{ "type": "swim-text", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "font-size": "12px" }, "id": "ca9b8cf5", "content": "Fan Type 2 (3 blade)" }, { "type": "swim-text", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "font-size": "12px" }, "id": "108e84d0", "content": "26% of Types" }, { "type": "swim-text", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "font-size": "12px" }, "id": "6ce8705d", "content": "6 Fan Manuf." }] }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": "1", "display": "flex", "width": "33%" }, "id": "4090ed1a", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": "0", "width": "20px" }, "id": "92414999", "children": [{ "type": "div", "swimAttributes": {}, "styleAttributes": { "flex-grow": 1, "width": "20px", "height": "20px", "border": "solid 1px #b7bed9", "background-color": "#edeef5" }, "id": "16a7f5a9" }] }, { "type": "div", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "display": "flex", "flex-direction": "column", "padding": "0 0 0 10px" }, "id": "39d43ef0", "children": [{ "type": "swim-text", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "font-size": "12px" }, "id": "0e561efe", "content": "Fan Type 3 (4 blade)" }, { "type": "swim-text", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "font-size": "12px" }, "id": "98a4fda1", "content": "23% of Types" }, { "type": "swim-text", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "font-size": "12px" }, "id": "8a370100", "content": "5 Fan man" }] }] }] }] }, { "type": "swim-text", "swimAttributes": { "width": "100%" }, "styleAttributes": { "flex-grow": 1, "position": "absolute", "top": "3%", "right": "2%", "color": "rgba(85, 92, 120, 0.4)" }, "id": "5be728c3", "content": "GRPNG" }] },

// };

swim.View.prototype.layoutTemplate = null;
swim.View.prototype.layoutElements = [];
swim.View.prototype.renderedElementCache = [];
swim.View.prototype.links = {};
swim.View.prototype.container = null;
swim.View.prototype.layoutData = {
    nodeRef: null,
    link: null,
    template: null,
    dirty: false,
};

/**
 * is is probably unused now
 */
swim.HtmlView.prototype.loadTemplate = function (templateId = 0, onLoad = () => {}) {
    // if (templateId !== 0) {
    //     let swimUrl = `warp://${window.location.host}`;
    //     // console.info('HtmlView.render');
    //     const nodeRef = swim.nodeRef(swimUrl, `/layout/${templateId}`);
    //     const link = nodeRef.downlinkValue().laneUri('template')
    //         .didSet((newValue) => {
    //             const newTemplate = newValue.toAny();
    //             // console.info('link set for template:', newValue.get("title").value);
    //             dataHandler(newTemplate);
    //         })
    //         .didSync((newValue) => {
    //             const newTemplate = newValue.get("context").toAny();
    //             // console.info('link synced for template:', newValue.get("context").get("title").value);
    //             dataHandler(newTemplate);
    //         })
    //         .didFail(() => {
    //             console.info('link failed');
    //         })
    // } else {
    //     onLoad(null);
    // }
}

swim.HtmlView.prototype.render = function (templateId = 0, onRender = null, keepSynced = false, onSync = null) {
    if (templateId !== 0) {
        let swimUrl = `warp://${window.location.host}`;
        // console.info('HtmlView.render');
        const nodeRef = swim.nodeRef(swimUrl, `/layout/${templateId}`);
        const link = nodeRef.downlinkValue().laneUri('template')
            .didSet((newValue) => {
                const newTemplate = newValue.toAny();
                // console.info('link set for template:', newValue.get("title").value);
                dataHandler(newTemplate);
            })
            .didSync((newValue) => {
                const newTemplate = newValue.get("context").toAny();
                // console.info('link synced for template:', newValue.get("context").get("title").value);
                // dataHandler(newTemplate);
            })
            .didFail(() => {
                console.info('link failed');
            })
            .keepLinked(keepSynced)
        const dataHandler = (newTemplate) => {
            if(!newTemplate) {
                console.error("Template not found. ID:" + templateId);
                return;
            }
            // if (this.layoutData.template === null || (this.layoutData.template !== null && this.layoutData.template.lastEdit !== newTemplate.lastEdit)) {
                window.requestAnimationFrame(() => {
                    this.renderLayout(newTemplate, onRender);
                    if (onRender !== null) {
                        onRender(this.container);
                    }
                    if (!keepSynced) {
                        link.close();
                    }
                    if (onSync !== null) {
                        onSync();
                    }
    
                });

            // }
            // } else {
            //     if (onRender !== null) {
            //         onRender(this.container);
            //     }
            //     if (onSync !== null) {
            //         onSync();
            //     }

            // }

        };

        link.open();
        return this.container;
    }
}

swim.HtmlView.prototype.renderLayout = function (template = null, onRender = null) {
    // console.info('renderlayout', template, this.layoutData.template);

    if (template) {
        // if(this.layoutData.template === null || this.layoutData.template.layoutId !== template.layoutId) {
        this.layoutData.template = template;
        this.layoutData.dirty = true;
        // }

    }
    if (!this.layoutData.dirty) {
        return this.container;
    }
    if (this.layoutData.template !== null) {
        this.buildJsonLayout();
        // console.info('HtmlView.renderLayout', this.layoutData.template, this.node);
    } else {
        console.info('HtmlView.renderLayout : template was null');
    }

    return this.container;
}

swim.HtmlView.prototype.buildJsonLayout = function () {

    if (!this.layoutData.template) {
        console.info('HtmlView.buildJsonLayout - no layout def');
        return;
    }

    if (typeof this.layoutData.template === "string") {
        // this.layoutData.template = JSON.parse(this.layoutData.template);
    }

    // console.info('HtmlView.buildJsonLayout', this.layoutData.template.title);
    this.layoutElements = this.layoutData.template.layoutElements;
    // main super block container
    this.container = swim.HtmlView.create('div')
        .width(this.layoutData.template.width || '100%')
        .height(this.layoutData.template.height || '100%')
        .backgroundColor(this.layoutData.template.backgroundColor || 'transparent')
        .display(this.layoutData.template.display || 'flex')
        .flexDirection(this.layoutData.template.flexDirection || 'default')
        .position('relative');

    // append layout container to page
    // this.container.node.innerHTML = "";
    // if (this.parentView !== null) {
    //     if(this.parentView.node.innerHTML !== "") {
    //         this.destroyLayout();
    //     }

    //     this.append(this.container);
    // } else {
    if (this.node.innerHTML !== "") {
        // console.info(this.childViews);
    }
    this.node.innerHTML = "";
    this.append(this.container);
    // }

    // start rendering the elements which make up the layout
    if (this.layoutElements && this.layoutElements.length > 0) {
        // render each element
        for (const blockData of this.layoutElements) {
            this.renderLayoutElement(this.container, blockData);
        }
    }
    this.layoutData.dirty = false;
}

swim.HtmlView.prototype.renderLayoutElement = function (container, elementData) {
    try {
        const renderedLayout = this.createElement(elementData, container);
        // container.cacheNewElement(elementData.id, renderedLayout);
        container.append(renderedLayout);
    } catch(err) {
        console.info("Render Error:", err);
    }
}

swim.HtmlView.prototype.createElement = function (elementData, parentElement = null) {
    let returnView = null;
    // console.info("createElement", elementData);
    switch (elementData.type) {
        case "chart":
            returnView = this.createChartElement(elementData);
            break;
        case "plot":
            returnView = this.createPlotElement(elementData);
            break;
        case "gauge":
            returnView = this.createGaugeElement(elementData);
            break;
        case "map":
            returnView = this.createMapElement(elementData);
            break;
        case "overlay":
            returnView = this.createMapOverlayElement(elementData, parentElement);
            break;
        case "pie":
            returnView = this.createPieElement(elementData);
            break;
        // case "slice":
        //     returnView = this.createSliceElement(elementData, parentElement);
        //     break;
        case "layout":
            returnView = this.createLayoutElement(elementData);
            break;
        case "dataGrid":
                returnView = this.createDataGridElement(elementData);
                break;
        
        default:
            returnView = this.createHtmlElement(elementData);
            break;
    }
    // console.info("cacheNewElement", elementData.id, returnView);
    this.cacheNewElement(elementData.id, returnView);
    return returnView;
}

swim.HtmlView.prototype.createChartElement = function (elementData) {
    // console.info('render chart here')
    const chartView = swim.HtmlView.create("canvas");
    if (!elementData.id) {
        elementData.id = Utils.newGuid();
    }
    // console.info('new chart', elementData.id, chartView);
    const chart = new swim.ChartView()
        .bottomAxis(elementData.bottomAxis || "time")
        .leftAxis(elementData.leftAxis || "linear")
        .topGutter(elementData.topGutter || 0)
        .rightGutter(elementData.rightGutter || 0)
        .bottomGutter(elementData.bottomGutter || 20)
        .leftGutter(elementData.leftGutter || 20);
    chartView.append(chart);

    if (elementData.children && elementData.children.length > 0) {
        for (const child of elementData.children) {
            const childElement = this.createElement(child);
            chart.addPlot(childElement);
        }
    }

    return chartView;
};

swim.HtmlView.prototype.createPlotElement = function (elementData) {
    // console.info('create plot for chart', elementData);
    const plotAttributes = elementData.swimAttributes;
    const plotType = plotAttributes.plotType || "line";
    let newPlot = null;
    switch(plotType) {
        case "line":
            newPlot = new swim.LineGraphView();
            break;
        case "area":
                newPlot = new swim.AreaGraphView();
                break;
        case "bubble":
                newPlot = new swim.BubblePlotView();
                break;
        
    }
    
    if(plotType === "line") {
        if (plotAttributes.stroke) {
            newPlot.stroke(plotAttributes.stroke);
        }
        if (plotAttributes.strokeWidth) {
            newPlot.strokeWidth(plotAttributes.strokeWidth);
        }
    
    }

    if(plotType === "area") {
        if (plotAttributes.fill) {
            newPlot.fill(plotAttributes.fill);
        }
    }

    if(plotType === "bubble") {
        if (plotAttributes.fill) {
            newPlot.fill(plotAttributes.fill);
        }
        if (plotAttributes.radius) {
            newPlot.radius(plotAttributes.radius);
        }
        if (plotAttributes.stroke) {
            newPlot.stroke(plotAttributes.stroke);
        }
        if (plotAttributes.strokeWidth) {
            newPlot.strokeWidth(plotAttributes.strokeWidth);
        }
    }

    if (plotAttributes.nodeUri && plotAttributes.laneUri) {
        if(!plotAttributes.hostUri) {
            plotAttributes.hostUri = `warp://${window.location.host}`;
        }
        // link to the value's history lane to populate the chart
        this.links[Utils.newGuid()] = swim.downlinkMap()
            .hostUri(plotAttributes.hostUri)
            .nodeUri(plotAttributes.nodeUri)
            .laneUri(plotAttributes.laneUri)
            // on set, update the number on the page
            .didUpdate((newKey, newValue) => {
                const timestamp = newKey.numberValue();
                newPlot.insertDatum({ x: timestamp, y: newValue.numberValue(), y2: 0 });

            })
            .didRemove((key, value) => {
                // console.info('remove', key.numberValue())
                newPlot.removeDatum(key.numberValue());
                
            })
            // open the link
            .open();

        // this.links = newPlot.links;
    }

    return newPlot;
}

swim.HtmlView.prototype.createMapElement = function (elementData) {
    // console.info('create map', elementData);
    const mapView = swim.HtmlView.create("div");
    mapView.width('100%');
    mapView.height('100%');
    if (!elementData.id) {
        elementData.id = Utils.newGuid();
    }
    mapView.id = elementData.id;
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3dpbWl0IiwiYSI6ImNpczUwODM1MTBhNGMydGxreGxreXc4ZXkifQ.zTuMYsNF_7R4STiqTNRBaA';
    const newMap = new mapboxgl.Map({
        container: mapView.node,
        // style: (elementData.swimAttributes.mapStyle) ? elementData.swimAttributes.mapStyle : "mapbox://styles/swimit/cjs5h20wh0fyf1gocidkpmcvm?optimize=true",
        style: "mapbox://styles/swimit/cjs5h20wh0fyf1gocidkpmcvm?optimize=true",
        trackResize: true,
        // center: {lng: 55.296249, lat:  25.276987},
        center: {
            lng: (elementData.swimAttributes.centerLong) ? elementData.swimAttributes.centerLong : 4555.426,
            lat: (elementData.swimAttributes.centerLat) ? elementData.swimAttributes.centerLat : 25.210
        },
        pitch: (elementData.swimAttributes.pitch) ? elementData.swimAttributes.pitch : 45,
        zoom: (elementData.swimAttributes.zoom) ? elementData.swimAttributes.zoom : 10,
        minZoom: (elementData.swimAttributes.minZoom) ? elementData.swimAttributes.minZoom : 0,
        maxZoom: (elementData.swimAttributes.minZoom) ? elementData.swimAttributes.maxZoom : 20,
        bearing: (elementData.swimAttributes.bearing) ? elementData.swimAttributes.bearing : 0,
        antialias: (elementData.swimAttributes.antialias) ? elementData.swimAttributes.antialias : true
    });

    setTimeout(() => {
        newMap.resize();
    }, 1);


    //   newMap.setPitch((elementData.swimAttributes.pitch) ? elementData.swimAttributes.pitch : 45);
    //   newMap.setPitch((elementData.swimAttributes.zoom) ? elementData.swimAttributes.zoom : 10);

    newMap.addControl(new mapboxgl.NavigationControl(), (elementData.swimAttributes.controlPlacement) ? elementData.swimAttributes.controlPlacement : "top-left")
        .getCanvasContainer().addEventListener("touchstart", function () {
            // prevent dragPan from interfering with touch scrolling
            newMap.dragPan.disable();
        });

    mapView.map = newMap;

    if (elementData.children && elementData.children.length > 0) {
        for (const child of elementData.children) {
            const childElement = this.createElement(child, mapView);
            mapView.appendChild(childElement);
        }
    }
    return mapView;
}

swim.HtmlView.prototype.createMapOverlayElement = function (elementData, parentElement) {
    // console.info('create map overlay', elementData);
    const overlayView = swim.HtmlView.create("div"); //new swim.MapboxView(this._map)
    const mapView = new swim.MapboxView(parentElement.map, elementData.id);
    const tween = swim.Transition.duration(elementData.swimAttributes.tween || 100);
    mapView.overlayCanvas();
    if (!parentElement.overlays) {
        parentElement.overlays = {};
    }
    parentElement.overlays[elementData.id] = mapView;
    mapView.markers = {};
    mapView.dataset = {};
    mapView.dataDirty = false;
    mapView.synced = false;
    mapView.map.on("load", () => {
        mapView.mapLoaded = true;
        // console.info("map loaded");
        drawMapPoints();
    })
    // console.info(mapView.map);
    function drawMapPoints() {
        if(mapView.dataDirty && mapView.synced) {
            for(let markerId in mapView.dataset){
                const newValue = mapView.dataset[markerId];
                // console.info(markerId, elementData.swimAttributes.onPointClick)
                if(!mapView.markers[markerId]) {

                    tempMarker = new swim.MapCircleView()
                    
                        .center([newValue.get("longitude").numberValue(0), newValue.get("latitude").numberValue(0)])
                        .radius(elementData.swimAttributes.markerRadius || 5)
                        .fill(elementData.swimAttributes.markerColor || '#44D7B6')
                        .stroke(elementData.swimAttributes.stroke || swim.Color.transparent())
                        .strokeWidth(elementData.swimAttributes.strokeWidth || 0);

                    if(elementData.swimAttributes.onPointClick) {
                        tempMarker.on("click", () => {
                            console.info('point click', mapView.markers[markerId], elementData.swimAttributes.onPointClick);
                            if(elementData.swimAttributes.onPointClick.indexOf('.') >= 0) {
                                const functArr = elementData.swimAttributes.onPointClick.split('.');
                                const functNamespace = window[functArr[0]];
                                functNamespace[functArr[1]](mapView.markers[markerId]);
                            } else {
                                window[elementData.swimAttributes.onPointClick](mapView.markers[markerId]);
                            }
                            
                        });
                    }

                    mapView.setChildView(markerId, tempMarker);
                    mapView.markers[markerId] = tempMarker;
                } else {
                    if(mapView.markers[markerId].removed) {
                        mapView.removeChildView(mapView.markers[markerId]);
                        delete mapView.markers[markerId];
                    } else {
                        const newCenter = [newValue.get("longitude").numberValue(0), newValue.get("latitude").numberValue(0)];
                        mapView.markers[markerId].center.setState(newCenter, tween);
                    }
                }     
            }   
            mapView.dataDirty = false;
        }
        window.requestAnimationFrame(() => {
            drawMapPoints();
        });
    }

    if (elementData.swimAttributes.nodeUri && elementData.swimAttributes.laneUri) {
        if(!elementData.hostUri) {
            elementData.hostUri = `warp://${window.location.host}`;
        }

        // link to the value's history lane to populate the chart
        this.links[Utils.newGuid()] = swim.downlinkMap()
            .hostUri(elementData.swimAttributes.hostUri)
            .nodeUri(elementData.swimAttributes.nodeUri)
            .laneUri(elementData.swimAttributes.laneUri)
            // on set, update the number on the page
            .didUpdate((newKey, newValue) => {
                const markerId = newKey.stringValue();
                mapView.dataset[markerId] = newValue;
                mapView.dataDirty = true;
                // newPlot.insertDatum({ x: timestamp, y: newValue.numberValue(), y2: 0 });
                // console.info('create marker', newKey, newValue);
                // if(!mapOverlay.markers[markerId]) {
                //     tempMarker = new swim.MapCircleView()
                    
                //         .center([newValue.get("longitude").numberValue(0), newValue.get("latitude").numberValue(0)])
                //         .radius(elementData.swimAttributes.markerRadius || 5)
                //         .fill(elementData.swimAttributes.markerColor || '#44D7B6')
                //         .stroke(elementData.swimAttributes.stroke || swim.Color.transparent())
                //         .strokeWidth(elementData.swimAttributes.strokeWidth || 0);

                //     if(elementData.swimAttributes.onPointClick) {
                //         tempMarker.on("click", () => {
                //             // console.info('point click', mapOverlay.markers[markerId], elementData.swimAttributes.onPointClick);
                //             if(elementData.swimAttributes.onPointClick.indexOf('.') >= 0) {
                //                 const functArr = elementData.swimAttributes.onPointClick.split('.');
                //                 const functNamespace = window[functArr[0]];
                //                 functNamespace[functArr[1]](mapOverlay.markers[markerId]);
                //             } else {
                //                 window[elementData.swimAttributes.onPointClick](mapOverlay.markers[markerId]);
                //             }
                            
                //         });
                //     }

                //     mapOverlay.setChildView(markerId, tempMarker);
                //     mapOverlay.markers[markerId] = tempMarker;
                // } else {
                //     const newCenter = [newValue.get("longitude").numberValue(0), newValue.get("latitude").numberValue(0)];
                //     mapOverlay.markers[markerId].center.setState(newCenter, tween);
                // }

            })
            .didRemove((key, value) => {
                const markerId = key.stringValue();
                mapView.markers[markerId].removed = true;
                // mapView.removeChildView(mapView.markers[markerId]);
                // delete mapView.markers[markerId];
                // console.info('remove marker', key, value)
            })
            .didSync(() => {
                // drawMapPoints();
                mapView.synced = true;
            })
            // open the link
            .open();

        // this.links = newPlot.links;
    }

    return overlayView;
}

swim.HtmlView.prototype.createGaugeElement = function (elementData) {
    // console.info('render gauge here')
    const gaugeView = swim.HtmlView.create("canvas");
    const gaugeAttributes = elementData.swimAttributes;
    if (!elementData.id) {
        elementData.id = Utils.newGuid();
    }
    gaugeView.id = elementData.id;
    gaugeView.width(gaugeAttributes.width || "100%");
    gaugeView.height(gaugeAttributes.height || "100%");
    gaugeView.backgroundColor(gaugeAttributes.backgroundColor || "rgba(0,0,0,0)");
    this.container.height(gaugeAttributes.height || "100%");
    // console.info('new gauge', elementData);
    const tween = swim.Transition.duration(gaugeAttributes.tween || 100);
    const maxValue = gaugeAttributes.maxValue || 100;
    const gauge = new swim.GaugeView()
        .innerRadius(gaugeAttributes.innerRadius || '30%')
        .outerRadius(gaugeAttributes.outerRadius || '40%')
        .startAngle(gaugeAttributes.startAngle || '270deg')
        .sweepAngle(gaugeAttributes.sweepAngle || '360deg')
        .cornerRadius(gaugeAttributes.cornerRadius || '50%')
        .dialSpacing(gaugeAttributes.dialSpacing || '1px')
        // .dialColor(swim.Color.parse(gaugeAttributes.dialColor || 'rgba(0,0,0,0)'))
        .meterColor(swim.Color.parse(gaugeAttributes.meterColor || "#000000"))
        .labelPadding(gaugeAttributes.labelPadding || "25%")
        .title(gaugeAttributes.defaultTitle || "")
        .font(gaugeAttributes.font || "18px sans-serif")
        .textColor(swim.Color.parse(gaugeAttributes.color || "#000"))
        .tickColor(swim.Color.parse(gaugeAttributes.tickColor || "#000"))

    const dial = new swim.DialView()
        .value(gaugeAttributes.defaultValue || 0, tween)
        .dialColor(swim.Color.parse(gaugeAttributes.dialColor || 'rgba(0,0,0,0.25)'))
        .meterColor(swim.Color.parse(gaugeAttributes.meterColor || "#000000"))
        .label(gaugeAttributes.defaultLabel || "")
        .legend(gaugeAttributes.defaultLegend || null)
        .tickAlign(gaugeAttributes.tickAlign || "0.5")
        .tickRadius(gaugeAttributes.tickRadius || "45%")
        .tickLength(gaugeAttributes.tickLength || "50%")
        .tickWidth(gaugeAttributes.tickWidth || "1px")
        .tickPadding(gaugeAttributes.tickPadding || "1px")

    if (gaugeAttributes.nodeUri && gaugeAttributes.laneUri) {
        if(!gaugeAttributes.hostUri) {
            gaugeAttributes.hostUri = `warp://${window.location.host}`;
        }

        // link to the value's history lane to populate the chart
        gauge.links[Utils.newGuid()] = swim.downlinkValue()
            .hostUri(gaugeAttributes.hostUri)
            .nodeUri(gaugeAttributes.nodeUri)
            .laneUri(gaugeAttributes.laneUri)
            // on set, update the number on the page
            .didSet((newValue) => {
                if (gaugeAttributes.title) {
                    gauge.title(gaugeAttributes.title.replace(':value:', newValue.value), tween);
                } else {
                    gauge.title(gaugeAttributes.title || newValue.value.toString(), tween);
                }
                if (gaugeAttributes.label) {
                    dial.label(gaugeAttributes.label.replace(':value:', newValue.value), tween);
                } 
                if (gaugeAttributes.legend) {
                    dial.legend(gaugeAttributes.legend.replace(':value:', newValue.value), tween);
                } 

                const dialValue = newValue.numberValue() / maxValue;
                const setMeterColor = (newColor) => {
                    if(dial.meterColor() !== newColor) {
                        dial.meterColor(newColor, tween);
                    }
                }
                const setDialColor = (newColor) => {
                    if(dial.dialColor() !== newColor) {
                        dial.dialColor(newColor, tween);
                    }
                }

                if(gaugeAttributes.warnMinValue && (gaugeAttributes.warnMeterColor || gaugeAttributes.warnDialColor) && newValue.numberValue() <= parseInt(gaugeAttributes.warnMinValue)) {
                    setMeterColor(swim.Color.parse(gaugeAttributes.warnMeterColor || gaugeAttributes.meterColor));
                    setDialColor(swim.Color.parse(gaugeAttributes.warnDialColor || gaugeAttributes.dialColor));
                } else if(gaugeAttributes.warnMaxValue && gaugeAttributes.warnMeterColor && newValue.numberValue() >= parseInt(gaugeAttributes.warnMaxValue)) {
                    setMeterColor(gaugeAttributes.warnMeterColor);
                    setDialColor(swim.Color.parse(gaugeAttributes.warnDialColor || gaugeAttributes.dialColor));
                } else {
                    setMeterColor(swim.Color.parse(gaugeAttributes.meterColor || 'rgba(0,0,0,.75)'));
                    setDialColor(swim.Color.parse(gaugeAttributes.dialColor || 'rgba(0,0,0,0.25)'));
                }

                dial.value(dialValue, tween)
            })
            // open the link
            .open();
    }
    gauge.append(dial);
    gaugeView.append(gauge);

    return gaugeView;
};


swim.HtmlView.prototype.createPieElement = function (elementData) {
    // console.info('render pie here')
    const pieView = swim.HtmlView.create("canvas");
    if (!elementData.id) {
        elementData.id = Utils.newGuid();
    }
    pieView.id = elementData.id;
    // console.info('new pie', elementData);
    const pieAttributes = elementData.swimAttributes;
    const tween = swim.Transition.duration(pieAttributes.tween || 100);
    const pie = new swim.PieView()
        .limit(pieAttributes.limit || 0)
        .baseAngle(pieAttributes.baseAngle || 0)
        .innerRadius(pieAttributes.innerRadius || '15%')
        .outerRadius(pieAttributes.outerRadius || '30%')
        .padAngle(pieAttributes.padAngle || '2deg')
        //  TODO: pad radius broken because we cant tween from a null default value
        // .padRadius(pieAttributes.padRadius || null, tween)
        .cornerRadius(pieAttributes.cornerRadius || 0)
        .labelRadius(pieAttributes.labelRadius || "50%")
        .tickAlign(pieAttributes.tickAlign || "0.5")
        .tickRadius(pieAttributes.tickRadius || "45%")
        .tickLength(pieAttributes.tickLength || "50%")
        .tickWidth(pieAttributes.tickWidth || "1px")
        .tickPadding(pieAttributes.tickPadding || "1px")
        .tickColor(swim.Color.parse(pieAttributes.tickColor || "#000"))
        .textColor(swim.Color.parse(pieAttributes.color || "#000"))
        .font(pieAttributes.font || '12px sans-serif')


    pieView.append(pie);
    pieView.pie = pie;

    if (elementData.children && elementData.children.length > 0) {
        for (const child of elementData.children) {
            const childElement = this.createElement(child, pieView);
            pieView.append(childElement);
        }
    }

    interpolate = (startValue, endValue, stepNumber, lastStepNumber) => {
        return (endValue - startValue) * stepNumber / lastStepNumber + startValue;
    }

    let sliceIndex = 0;
    let totalSlices = pieAttributes.totalSlices || 4;
    updateSlice = (key, value, mapKey = null) => {
        if(mapKey === null) return;
        const v = value.get(mapKey).numberValue();
        let slice = pie.getChildView(key);
        if (slice) {
            slice.value(v, tween);
            slice.label().text(v);
        } else {
            let sliceColor = (swim.Color.parse(pieAttributes.sliceColor || "#000000"));
            if(pieAttributes.sliceColors) {
                if(pieAttributes.sliceColors.indexOf("...") >= 0) {
                    const colorRange = pieAttributes.sliceColors.split("...");
                    if(colorRange.length === 2) {
                        try {
                            const startColorHsl = swim.Color.parse(colorRange[0]).hsl();
                            const endColorHsl = swim.Color.parse(colorRange[1]).hsl();
                            const newHsl = new swim.Color.Hsl();
                            newHsl.h = interpolate(startColorHsl.h, endColorHsl.h, sliceIndex, totalSlices);
                            newHsl.s = interpolate(startColorHsl.s, endColorHsl.s, sliceIndex, totalSlices);
                            newHsl.l = interpolate(startColorHsl.l, endColorHsl.l, sliceIndex, totalSlices);
                            newHsl.a = interpolate(startColorHsl.a, endColorHsl.a, sliceIndex, totalSlices);
                            sliceColor = newHsl.rgb();
                            sliceIndex++;
                            if(sliceIndex >= totalSlices) {
                                sliceIndex = 0;
                            }    
                        } catch(err) {
                            console.info("error parsing pie colors:", err)
                        }                    
                    }
                } else {
                    const colorOptions = pieAttributes.sliceColors.split(":");
                    if(colorOptions.length > 0){
                        sliceColor = swim.Color.parse(colorOptions[sliceIndex] || "#000000");
                        sliceIndex++;
                        if(sliceIndex >= colorOptions.length) {
                            sliceIndex = 0;
                        }
                    }
                }
            }
            slice = new swim.SliceView()
                .sliceColor(sliceColor)
                .value(v)
                .label(v.toFixed())
                .legend(key.stringValue());
            pie.setChildView(key, slice);
        }
    }

    if (elementData.swimAttributes.nodeUri && elementData.swimAttributes.laneUri) {
        if(!elementData.hostUri) {
            elementData.hostUri = `warp://${window.location.host}`;
        }

        // link to the value's history lane to populate the chart
        this.links[Utils.newGuid()] = swim.downlinkMap()
            .hostUri(elementData.swimAttributes.hostUri)
            .nodeUri(elementData.swimAttributes.nodeUri)
            .laneUri(elementData.swimAttributes.laneUri)
            // on set, update the number on the page
            .didUpdate((newKey, newValue) => {
                updateSlice(newKey, newValue, elementData.swimAttributes.mapKey);

            })
            .didRemove((key, value) => {
                // newPlot.removeDatum(key.numberValue());
                // console.info('remove marker', newKey, newValue)
            })
            // open the link
            .open();

        // this.links = newPlot.links;
    }

    return pieView;
}

// swim.HtmlView.prototype.createSliceElement = function (elementData, parentElement) {
//     console.info('render slice here')
//     const sliceView = swim.HtmlView.create("div");
//     if (!elementData.id) {
//         elementData.id = Utils.newGuid();
//     }
//     if (!parentElement.sliceCounter) {
//         parentElement.sliceCounter = 0;
//     }
//     sliceView.id = elementData.id;
//     console.info('new slice', elementData);
//     const r = 30
//     const counter = parentElement.sliceCounter;
//     const sliceAttributes = elementData.swimAttributes;
//     // const tween = swim.Transition.duration(gaugeAttributes.tween || 100);
//     const legend = new swim.TextRunView('${elementData.key}').font('12px sans-serif');
//     const slice = new swim.SliceView()
//         .cornerRadius(parentElement.pie.cornerRadius() || 0)
//         .label(sliceAttributes.value || '')
//         .legend('legend')
//         .tickRadius(`${r + counter + 3}%`)
//         .tickLength(15)
//         .labelRadius(`${r + counter + 3}%`)
//         .outerRadius(parentElement.pie.outerRadius() || '30%')
//         .innerRadius(parentElement.pie.innerRadius() || '15%')
//         .sliceColor(sliceAttributes.sliceColor || '#F9F070')
//         .tickColor(swim.Color.black())
//         .tickWidth(3)
//         .tickPadding(1)
//         .value(sliceAttributes.value || 1);

//     slice.label().font('12px sans-serif').textColor(swim.Color.black());

//     parentElement.setChildView(elementData.id, slice);
//     parentElement.sliceCounter++;

//     return sliceView;
// }

swim.HtmlView.prototype.createLayoutElement = function (elementData) {
    // console.info('render layout here')
    const layoutView = swim.HtmlView.create("div");
    if (!elementData.id) {
        elementData.id = Utils.newGuid();
    }
    // console.info('new layout', elementData.id, layoutView);
    layoutView.id = elementData.id;
    if(elementData.swimAttributes.layoutId) {
        const container = layoutView.render(elementData.swimAttributes.layoutId, null, true);
    }
    // console.info("layoutview", layoutView);
    return layoutView;
};

swim.HtmlView.prototype.createDataGridElement = function (elementData) {
    // console.info('render data grid here')
    const dataGridView = swim.HtmlView.create("div");
    const gridAttributes = elementData.swimAttributes;
    if (!elementData.id) {
        elementData.id = Utils.newGuid();
    }
    // console.info('new data grid', elementData.id, dataGridView);
    dataGridView.id(elementData.id);
    dataGridView.className("dataGrid");
    dataGridView.width(gridAttributes.width);

    if(gridAttributes.title) {
        const gridTitle = swim.HtmlView.create("div");
        gridTitle.className("gridTitle");
        gridTitle.node.innerHTML = gridAttributes.title;
        gridTitle.width("100%");
        gridTitle.backgroundColor(gridAttributes.titleBgColor || "rgba(100,100,255,0.75)");
        gridTitle.textAlign(gridAttributes.titleAlign || "center");
        gridTitle.font(gridAttributes.titleFont || "22px sans-serif");
        gridTitle.color(gridAttributes.titleColor || "#000000");
        gridTitle.padding(gridAttributes.titlePadding || "3px");
        gridTitle.margin(gridAttributes.titleMargin || "0px");
        dataGridView.append(gridTitle);
    }

    if(gridAttributes.headerColumns) {
        const headerColumns = gridAttributes.headerColumns.split(",");
        if(headerColumns.length > 0) {
            const gridHeader = swim.HtmlView.create("div");
            gridHeader.className("gridHeader");
            gridHeader.display("flex");
            gridHeader.width("100%");
            gridHeader.backgroundColor(gridAttributes.headerBgColor || "rgba(255,255,255,0.5)");
            gridHeader.textAlign(gridAttributes.headerAlign || "center");
            gridHeader.font(gridAttributes.headerFont || "14px sans-serif");
            gridHeader.color(gridAttributes.headerColor || "#000000");
            gridHeader.padding(gridAttributes.headerPadding || "3px");
            gridHeader.margin(gridAttributes.headerMargin || "0px");
            for(let i=0; i<headerColumns.length; i++) {
                const headerColumn = swim.HtmlView.create("div");
                headerColumn.className("headerColumn");
                headerColumn.node.innerHTML = headerColumns[i];
                headerColumn.node.style.flexGrow = 1;
                gridHeader.append(headerColumn);
            }
            dataGridView.append(gridHeader);
        }
    }

    let redrawTimeout = null;
    dataGridView.dataset = {};
    let rowIndex = 0;
    let rowColors = ["#ffffff"];
    if(gridAttributes.rowColors) {
        if(gridAttributes.rowColors.indexOf(":") > 0) {
            rowColors = gridAttributes.rowColors.split(":");
        } else {
            rowColors = [gridAttributes.rowColors];
        }
    }

    const drawRows = () => {
        if(gridAttributes.columnKeys) {
            const columnKeys = gridAttributes.columnKeys.split(",");
            for(let dataRowKey in dataGridView.dataset) {
                // let currRowColor = swim.Color.parse("rgba(255,255,255,0.25)");
                // if(rowColors.length > 1){
                //     currRowColor = swim.Color.parse(rowColors[rowIndex] || "#000000");
                // } else {
                //     currRowColor = rowColors;
                // }  
                const currRowData = dataGridView.dataset[dataRowKey];
                let currRowElement = currRowData.rowElement;
                if(!currRowElement) {
                    currRowElement = swim.HtmlView.create("div");
                    currRowElement.className("gridRow");
                    currRowElement.columnElements = {};
                    currRowElement.display("flex");
                    currRowElement.width("100%");
                    // currRowElement.node.style.flexGrow = 1;
                    currRowData.rowElement = currRowElement;
                    dataGridView.append(currRowElement);
                    
                }
                currRowElement.node.style.backgroundColor = rowColors[rowIndex];
                rowIndex++;
                if(rowIndex >= rowColors.length) {
                    rowIndex = 0;
                }
                for(let i=0; i<columnKeys.length; i++) {
                    const currColumnKey = columnKeys[i];
                    const currValue = currRowData.rowValues.get(currColumnKey);
                    if(currValue) {
                        let currColumn = currRowElement.columnElements[currColumnKey];
                        if(!currColumn) {
                            currColumn = swim.HtmlView.create("div");
                            currColumn.className("dataColumn");
                            currColumn.width(`${100/columnKeys.length}%`);
                            currRowElement.columnElements[currColumnKey] = currColumn;
                            currRowElement.append(currColumn);
                        }
                        currColumn.node.innerHTML = currValue.stringValue();
                    }
                }    
                // currRowElement.node.innerHTML = currRowData.rowValue;
                // console.info(currRowKey, currRowData.rowValue.get(currRowKey));
                
            }
        }
        redrawTimeout = null;
        rowIndex = 0;
    }

    const updateRow = (key, value) => {
        // console.info('update row', key, value)
        let currentRow = dataGridView.dataset[key];
        if(!currentRow) {
            dataGridView.dataset[key] = {
                rowElement: null,
                rowValues:  {}
            }
        }
        dataGridView.dataset[key].rowValues = value;
    }

    const removeRow = (key, value) => {
        // console.info('remove marker', key, value);
        delete dataGridView.dataset[key];
    }


    if (elementData.swimAttributes.nodeUri && elementData.swimAttributes.laneUri) {
        if(!elementData.hostUri) {
            elementData.hostUri = `warp://${window.location.host}`;
        }

        this.links[Utils.newGuid()] = swim.downlinkMap()
            .hostUri(elementData.swimAttributes.hostUri)
            .nodeUri(elementData.swimAttributes.nodeUri)
            .laneUri(elementData.swimAttributes.laneUri)
            .didUpdate((newKey, newValue) => {
                updateRow(newKey, newValue);
                if(redrawTimeout !== null) {
                    clearTimeout(redrawTimeout);
                }
                redrawTimeout = setTimeout(() => {
                    drawRows();
                }, 1)
                
            })
            .didRemove((key, value) => {
                removeRow(newKey, newValue);
                if(redrawTimeout !== null) {
                    clearTimeout(redrawTimeout);
                }
                redrawTimeout = setTimeout(() => {
                    drawRows();
                }, 1)
            })
            .open();

        // this.links = newPlot.links;
    }    

    return dataGridView;
};

swim.HtmlView.prototype.createHtmlElement = function (elementData) {
    // console.info('HtmlView.createHtmlElem: elem data => ', elementData);
    let newElement = swim.HtmlView.create(elementData.type);

    if (elementData.type === 'svg') {
        newElement = swim.SvgView.create('svg')
            .width(elementData.width)
            .height(elementData.height)
            .viewBox(`0 0 ${elementData.width} ${elementData.height}`);
        // .fill(new Rgb(255, 255, 255));

    }

    if (!elementData.id) {
        elementData.id = Utils.newGuid();
    }

    newElement.id(elementData.id);

    if (elementData.width && elementData.type !== 'svg') {
        newElement.width(elementData.width);
    }
    if (elementData.height && elementData.type !== 'svg') {
        newElement.height(elementData.height);
    }

    if (elementData.content) {
        newElement.text(elementData.content);
    }

    if (elementData.swimAttributes) {
        for (const attributeKey of Object.keys(elementData.swimAttributes)) {
            if (typeof newElement[attributeKey] === 'function') {
                newElement[attributeKey](elementData.swimAttributes[attributeKey]);
            } else {
                newElement.node.setAttribute(attributeKey, elementData.swimAttributes[attributeKey]);
            }

        }
    }

    if (elementData.htmlAttributes) {
        for (const attributeKey of Object.keys(elementData.htmlAttributes)) {
            if (typeof elementData.htmlAttributes[attributeKey] === 'function') {
                // need to do the setting this way so event handlers properly bind to their methods.
                newElement.node[attributeKey] = elementData.htmlAttributes[attributeKey];
            } else if (attributeKey === 'path') {
                newElement.append('path').d(elementData.htmlAttributes[attributeKey]);
            } else if (attributeKey === 'polygon') {
                newElement.append('polygon')
                    .points(elementData.htmlAttributes[attributeKey]);
            } else {
                newElement.node.setAttribute(attributeKey, elementData.htmlAttributes[attributeKey]);
            }
        }
    }

    if (elementData.styleAttributes) {
        let newStyleStr = '';
        for (const attributeKey of Object.keys(elementData.styleAttributes)) {
            newStyleStr += `${attributeKey}: ${elementData.styleAttributes[attributeKey]}; `;
        }
        newElement.node.setAttribute('style', newStyleStr);
    }

    if (elementData.children && elementData.children.length > 0) {
        for (const child of elementData.children) {
            const childElement = this.createElement(child);
            newElement.append(childElement);
        }
    }

    // this.cacheNewElement(elementData.id, newElement);
    // console.info('HtmlView.createHtmlElem => newElement', newElement);
    return newElement; // return completed HtmlTrack
}

swim.HtmlView.prototype.cacheNewElement = function (elementId, newElement) {
    // console.info('to cache', elementId, newElement);
    this.renderedElementCache[elementId.toString()] = newElement;
}

swim.HtmlView.prototype.getCachedElement = function (elementId) {
    // console.info('from cache', elementId, this.renderedElementCache);
    if (!elementId) {
        return null;
    }
    return this.renderedElementCache[elementId.toString()];
}

swim.HtmlView.prototype.getLayoutElements = function () {
    return this.layoutElements;
}

swim.HtmlView.prototype.destroyLayout = function () {
    // console.info("DESTROY LAYOUT", this.links);
    this.removeAll();
}

Utils = {
    newGuid: () => {
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = (c === 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    setCookie: (cookieName, cookieValue, expireDays) => {
        var newDate = new Date();
        newDate.setTime(newDate.getTime() + (expireDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + newDate.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    },

    getCookie: (cookieName) => {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieValues = decodedCookie.split('=');
        if(cookieValues.length === 2) {
            return cookieValues[1];
        }
        return "";
    }    
}