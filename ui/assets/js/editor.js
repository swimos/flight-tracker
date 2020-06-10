const EditorElementIds = {
  unselectedShadow: 'rgb(0, 0, 0) 0px 0px 0px 0px',
  // selectedShadow: 'inset rgba(42, 255, 42, 0.5) 0px 0px 3px 3px',
  // highlightedShadow: 'inset rgba(255, 42, 42, 0.5) 0px 0px 3px 1px',
  selectedShadow: 'inset rgba(42, 255, 42, 1) 0px 0px 2px 1px',
  highlightedShadow: 'inset rgba(255, 42, 42, 1) 0px 0px 2px 1px',

  layoutIdTagId: '258f66c5',
  titleFieldTagId: '258f66d4',
  widthFieldTagId: '1056f91e',
  widthTitleTagId: '83fea821',
  heightFieldTagId: 'e9a054b0',
  heightTitleTagId: '1707e5cf',
  bgColorFieldTagId: 'bf26f39e',
  bgColorTitleTagId: '63568108',
  addElementButtonTagId: '27e250a2',
  displayTypeTitleTagId: 'a32edb7c',
  displayTypeFieldTagId: 'ea01c64a',
  flexTypeTitleTagId: '8bf2625c',
  flexTypeFieldTagId: '9e5c85a6',
  renderTypeTitleTagId: 'd23899aa',
  renderTypeFieldTagId: '933f721d',
  swimHostUrlLabelId: 'swimHostUrlLabel',
  swimDataKeysLabelId: '452d2af0',
  hostInputFieldId: '96af4f65',
  nodeInputFieldId: 'e299d99c',
  laneInputFieldId: '01fa2cb7',
  submitButtonId: '917495b7',
  cancelButtonId: '0e315fca',
  errorMessageId: '353ec5b7',
  titleMessageId: 'fc14565c',
  keepSyncedFieldId: 'faf17c1c',
  quiltIdInputFieldId: '01fa2cb7',
  nameInputFieldId: 'e299d99c',
  valueInputFieldId: '01fa2cb7',
  loadButtonId: '3fcd7fab',
  textAreaInputFieldId: 'ddb022da'
};
class LayoutEditor {

  constructor() {
    // console.info('LayoutEditor.constructor');

    this.swimUrl = `warp://${window.location.host}`;

    this.editorLoaded = false;

    this.pageElement = null;
    this.contentElement = null;
    this.headerElement = null;
    this.headerMenu = null;

    this.leftColumnDiv = null;
    this.workspaceDiv = null;
    this.rightColumnDiv = null;
    this.layoutAttributesDiv = null;

    this.layoutElementListDiv = null;

    this.activeLayoutTemplate = null;
    this.selectedLayoutElement = null;

    this.popover = null;

    this.layoutChangesSaved = true;
    this.hideSystemFile = true;

    this.layoutManager = {
      nodeRef: null,
      link: null,
      templateList: {}
    }

  }

  /**
   * Main editor start function
   */
  start() {

    this.openLayoutManagerLink(() => {
      if (!this.editorLoaded) {
        this.buildBaseEditorLayout();
        this.buildLayoutEditorForm(() => {
          this.newLayout();
          this.editorLoaded = true;
          this.keyPressHandler();
        });

      }

    });
  }

  /**
   * start keypress listener to handle keyboard shortcuts
   */
  keyPressHandler() {
    document.onkeydown = (key) => {
      const ctrlDown = key.ctrlKey;
      switch (key.code) {
        case "KeyS":
          if (ctrlDown) {
            this.saveLayout();
            key.preventDefault();
            key.stopPropagation();

          }


      }
    }
  }

  openLayoutManagerLink(onSync = null) {
    if (this.layoutManager.nodeRef === null) {
      this.layoutManager.nodeRef = swim.nodeRef(this.swimUrl, "/layoutManager");
    }
    this.layoutManager.link = this.layoutManager.nodeRef.downlinkMap().laneUri('layoutListRecords')
      .didUpdate((key, newValue) => {
        this.layoutManager.templateList[key.value.toString()] = newValue;
      })
      .didRemove((removeKey) => {
        let newArr = [];
        for (const key in listItems) {
          if (key !== removeKey.value.toString()) {
            newArr[key] = listItems[key];
          }
        }
        this.layoutManager.templateList = newArr;
      })
      .didSync(() => {
        if (onSync !== null) {
          onSync();
        }
      })
      .didFail(() => {
        // console.error('link failed');
      })
      .open();
  }

  updatePageTitle() {
    const titleDiv = document.getElementById("editorTitle");
    if (this.activeLayoutTemplate.title === "New layout") {
      titleDiv.innerText = "Layout Editor";
      document.title = "Swim Layout Editor";

    } else {
      const pageTitle = `Editing: ${this.activeLayoutTemplate.title}`;
      titleDiv.innerText = `${pageTitle} (${this.activeLayoutTemplate.layoutId})`;
      document.title = "Swim Layout Editor: " + `${this.activeLayoutTemplate.title}`;

    }

    if (this.layoutChangesSaved) {
      titleDiv.style.color = "rgba(255,255,255,1)";
    } else {
      titleDiv.style.color = "rgba(255,200,200,1)";
    }

  }

  setActiveTemplate(template) {
    this.activeLayoutTemplate = template;

    // populate the workspace with the layout we are editing
    if (this.activeLayoutTemplate) {
      let styleElem = document.getElementById('pageCssElem');
      if (this.activeLayoutTemplate.pageCss) {
        styleElem.href = this.activeLayoutTemplate.pageCss; //"/assets/css/style.css"
      } else {
        styleElem.href = "";
      }

      // this.activeLayoutTemplate.pageJsFile = pageJsFileField.node.value || '';
      let pageJsFileElem = document.getElementById('pageJsFileElem');
      if (this.activeLayoutTemplate.pageJsFile) {
        pageJsFileElem.src = this.activeLayoutTemplate.pageJsFile;
      } else {
        pageJsFileElem.src = "";
      }

      this.workspaceDiv.renderLayout(this.activeLayoutTemplate);
      this.buildLayoutElementList(this.workspaceDiv.getLayoutElements());
      this.updatePageTitle();

    }
  }

  buildEditorHeader() {
    // console.info('LayoutEditor.buildEditorHeader');
    this.pageElement = swim.HtmlView.fromNode(document.getElementById("page"));
    this.headerElement = swim.HtmlView.create("div").id("header");
    this.pageElement.append(this.headerElement);

    this.headerMenu = swim.HtmlView.create("div").id("headerNavigation");
    this.headerElement.append(this.headerMenu);
    this.headerMenu.render('mainHeaderMenu');

  }

  buildEditorContent() {
    this.pageElement = document.getElementById("page");
    this.contentElement = swim.HtmlView.create("div").id("content");
    this.pageElement.appendChild(this.contentElement.node);

    this.leftColumnDiv = swim.HtmlView.create("div");
    this.leftColumnDiv.id("leftColumn");

    this.workspaceDiv = swim.HtmlView.create("div");
    this.workspaceDiv.id("workspace");

    this.rightColumnDiv = swim.HtmlView.create("div");
    this.rightColumnDiv.id("rightColumn");

    this.contentElement.append(this.leftColumnDiv);
    this.contentElement.append(this.workspaceDiv);
    this.contentElement.append(this.rightColumnDiv);

  }

  buildBaseEditorLayout() {
    // console.info('LayoutEditor.buildBaseEditorLayout');
    this.buildEditorHeader();
    this.buildEditorContent();
  }

  buildLayoutEditorForm(onRender = null) {

    this.leftColumnDiv.render("editorLeftSidebar", (container) => {
      const addElementButton = this.leftColumnDiv.getCachedElement(EditorElementIds.addElementButtonTagId);


      if (addElementButton) {
        addElementButton.on('mouseup', (evt) => {
          this.addNewLayoutElement('div');
        });
      }

      if (onRender !== null) {
        onRender();
      }
    });

  }

  newLayout() {
    if (!this.layoutChangesSaved) {
      if (!confirm("If you continue changes will be lost.\n Are you sure?")) {
        return false;
      }
    }
    this.clearWorkspace(true);
    const emptyDef = {
      layoutId: Utils.newGuid(),
      title: 'New layout',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      display: 'block',
      flexDirection: '',
      layoutElements: null,
      keepSynced: false,
      renderType: 'json',
      lastEdit: 0,
      pageCss: '',
      pageJsFile: '',
      systemLayout: false
    };
    this.setActiveTemplate(emptyDef);
    this.buildLayoutElementList(this.activeLayoutTemplate.layoutElements);
    this.layoutChangesSaved = true;
    this.updatePageTitle();
  }

  clearWorkspace(clearSelection = false) {
    if (this.activeLayoutTemplate && this.workspaceDiv.node.innerHTML !== "") {
      this.workspaceDiv.destroyLayout();
    }
    if (clearSelection) {
      this.selectLayoutElement();
    }
  }

  buildLayoutElementList(layoutElementList) {
    if (this.layoutElementListDiv && this.layoutElementListDiv !== null) {
      this.layoutElementListDiv.remove();
    }
    this.layoutElementListDiv = swim.HtmlView.create('div')
      .id('layoutElementListContainer')
      .overflow('auto');

    this.leftColumnDiv.append(this.layoutElementListDiv);

    const listWithRoot = [{
      type: 'root',
      id: 'root',
      children: layoutElementList,
    }];

    if (listWithRoot) {
      this.outputLayoutElementsListItems(listWithRoot, this.layoutElementListDiv);
    }

  }

  /**
   * method to recursively walk thru the layoutElements which make up the active layout
   * and create the UI the user will use to interact with each element of the layout
   *
   * @param {*} elementsList - list of elements to traverse
   * @param {HtmlView} target - target element the new elements will render to
   * @param {number} [nestingLevel=0] - nesting level of current list. Used to create indentions.
   * @memberof LayoutEditor
   */
  outputLayoutElementsListItems(elementsList, target, nestingLevel = 0) {
    let row = 0;
    for (const element of elementsList) {
      let lineStartChar = '';
      let nestedLines = '';
      row++;

      // figure out line start character based on current recursion level
      if (nestingLevel !== 0) {
        lineStartChar = (row === elementsList.length && !element.children) ? '└' : '├';
      }
      if (nestingLevel >= 2) {
        for (let i = 1; i < nestingLevel; i++) {
          nestedLines += '─';
        }
      }

      // create row element
      const elemName = (element.name) ? `${element.name}` : `<${element.type}>`;
      const tempElement = swim.HtmlView.create((nestingLevel === 0) ? 'div' : 'div')
        .text(`${lineStartChar}${nestedLines} ${elemName}`);

      if (tempElement.node) {
        tempElement.node.id = element.id;
      }

      const removeButton = swim.HtmlView.create('span')
        .className('removeElementButton')
        .text('-')
        .title("Remove Element");

      if (this.selectedLayoutElement && this.selectedLayoutElement.node.id === element.id) {
        this.selectedLayoutElement = tempElement;
        tempElement.className('selected');
      } else if (!this.selectedLayoutElement && element.id === 'root') {
        this.selectedLayoutElement = tempElement;
        tempElement.className('selected');
      } else {
        tempElement.className('');
      }

      if (element.id !== 'root') { // don't put a delete button on the root since its not a removable element
        removeButton.node.onmouseup = (evt) => {
          if (confirm('Are you sure you want to delete this element?\r\nThis will also remove any child elements as well and can not be undone')) {
            const parent = this.findParentElementById(element.id);
            this.deleteChildElement(parent, element);

          }
          evt.preventDefault();
          evt.stopPropagation();
        };

        tempElement.append(removeButton);
      }

      // add mouse over handler
      tempElement.node.onmouseover = (evt) => {
        if (element.id === 'root') {
          this.highlightLayoutElement(this.workspaceDiv);
        } else {
          this.highlightLayoutElement(this.workspaceDiv.getCachedElement(element.id));
        }
        evt.preventDefault();
        evt.stopPropagation();
      };

      // mouse out handler
      tempElement.node.onmouseout = (evt) => {
        this.removeElementHighlight();
        evt.preventDefault();
        evt.stopPropagation();
      };

      // mouse button up handler
      tempElement.node.onmouseup = (evt) => {
        if (element.id === 'root') {
          this.selectLayoutElement(null, tempElement);
        } else {
          this.selectLayoutElement(element, tempElement);
        }

        evt.preventDefault();
        evt.stopPropagation();
      };

      // append new row to list
      this.layoutElementListDiv.append(tempElement);

      // recurse over children (if any)
      if (element.children && element.children.length > 0) {
        const currNestLevel = nestingLevel + 1;
        this.outputLayoutElementsListItems(element.children, tempElement, currNestLevel);
      }

    }

  }

  /**
   * method to append a new element to either the selected layout element or root parent of no element is selected
   *
   * @param {string} [elementType='div'] - html tag the element should be
   * @memberof LayoutEditor
   */
  addNewLayoutElement(elementType) {

    const newElementInfo = {
      type: elementType
    };

    if (this.selectedLayoutElement && this.selectedLayoutElement.node.id !== "root") {
      const elemToUpdate = this.findLayoutElementById(this.selectedLayoutElement.node.id, this.activeLayoutTemplate.layoutElements || []);

      if (!elemToUpdate) {
        alert("Valid parent element not found");
        return;
      }
      if (elemToUpdate.type === "chart") {
        newElementInfo.type = "plot";
        newElementInfo.id = Utils.newGuid();
      }

      if (elemToUpdate.type === "map") {
        newElementInfo.type = "overlay";
        newElementInfo.id = Utils.newGuid();
      }

      if (elemToUpdate.type === "pie") {
        // newElementInfo.type = "slice";
        // newElementInfo.id = Utils.newGuid();
        alert("Static slice elements not yet supported.");
        return;
      }

      if (elemToUpdate.type === "overlay") {
        alert("Overlays can not have child elements.");
        return;
      }

      if (elemToUpdate.type === "plot") {
        alert("Plots can not have child elements.");
        return;
      }

      if (elemToUpdate.type === "slice") {
        alert("Slices can not have child elements.");
        return;
      }

      if (!elemToUpdate.children || !elemToUpdate.children.length) {
        elemToUpdate.children = [];
      }
      elemToUpdate.children.push(newElementInfo);
      // this.activeLayoutTemplate.layoutElements.push(newElementInfo);
    } else {
      if (this.activeLayoutTemplate.layoutElements === null) {
        this.activeLayoutTemplate.layoutElements = [];
        this.activeLayoutTemplate.layoutElements.push(newElementInfo);
      } else {
        this.activeLayoutTemplate.layoutElements.push(newElementInfo);
      }

    }

    this.layoutChangesSaved = false;

    this.clearWorkspace(false);
    this.setActiveTemplate(this.activeLayoutTemplate);
    this.workspaceDiv.buildJsonLayout();

    this.buildLayoutElementList(this.activeLayoutTemplate.layoutElements);

  }

  /**
   * utility method to find an element within the layout data def by ID of element
   *
   * @param {*} elementId - the ID of the element to find
   * @param {*} searchList - list ot search within
   * @returns {(any | null)}
   * @memberof LayoutEditor
   */
  findLayoutElementById(elementId, searchList) {
    let returnObject = null;
    if (Object.keys(searchList).length === 0) {
      return null;
    }
    for (const element of searchList) {
      if (returnObject !== null) {
        break;
      }
      if (element.id === elementId) {
        returnObject = element;
      }

      if (element.children && returnObject === null) {
        returnObject = this.findLayoutElementById(elementId, element.children);
      }

    }
    return returnObject;
  }

  /**
   * find an element's parent by ID of an element
   *
   * @param {string} elementId - ID of the element we want to find the parent of
   * @param {*} [searchList=this.activeLayoutTemplate.layoutElements] - list of elements to search
   * @param {(any | null)} [parentElement=null] - parent element we are searching in (for passing back an ID once we find the right element)
   * @returns {(any | null)}
   *
   * @memberOf LayoutEditor
   */
  findParentElementById(elementId, searchList = this.activeLayoutTemplate.layoutElements, parentElement) {
    let returnObject = null;
    if (Object.keys(searchList).length === 0) {
      return null;
    }
    for (const element of searchList) {
      if (returnObject !== null) {
        break;
      }
      if (element.id === elementId) {
        returnObject = parentElement;
      }

      if (element.children && returnObject === null) {
        returnObject = this.findParentElementById(elementId, element.children, element);
      }

    }
    return returnObject;
  }

  /**
   * method to set a layout element as selected
   *
   * @param {(any | null)} elementData - data about the selected element
   * @param {(any | null)} selectedElement - the element the user clicked on
   * @memberof LayoutEditor
   */
  selectLayoutElement(elementData = null, selectedElement = null) {

    // if there is a selected layout, unselect it first
    if (this.selectedLayoutElement) {
      const oldElement = this.workspaceDiv.getCachedElement(this.selectedLayoutElement.node.id);
      if (oldElement && oldElement.node) {
        oldElement.node.style.boxShadow = EditorElementIds.unselectedShadow;
      }
      this.selectedLayoutElement.node.className = '';
      this.selectedLayoutElement = null;
    }

    // highlight the new selection
    if (selectedElement) {
      this.selectedLayoutElement = selectedElement;
      this.selectedLayoutElement.node.className = 'selected';
    }

    // get cached element from the layout
    let element = null;
    if (elementData && elementData.id !== 'root' && elementData.id !== 'plot') {
      element = this.workspaceDiv.getCachedElement(elementData.id);
      if (element && element.node) {
        element.node.style.boxShadow = EditorElementIds.selectedShadow;
      } else {
        // element.parentView.node.style.boxShadow = EditorElementIds.selectedShadow;
      }

    }

    // select the new element if element is not null
    if (element) {
      this.selectedLayoutData = elementData;
      this.buildLayoutAttributePanelLists();
    } else {
      this.selectedLayoutData = null;
      this.removeLayoutAttributePanel();
    }

  }

  /**
   * put a highlight around a layout element
   *
   * @returns {void}
   * @memberof LayoutEditor
   */
  removeElementHighlight() {
    // if layout is selected then there is no highlight to remove
    if (this.selectedLayoutElement && this.highlightedLayoutElement && this.selectedLayoutElement.node && this.highlightedLayoutElement.node && this.selectedLayoutElement.node.id === this.highlightedLayoutElement.node.id) {
      return;
    }

    // remove the highlight from the highlighted layout
    if (this.highlightedLayoutElement && this.highlightedLayoutElement.node) {

      this.highlightedLayoutElement.node.style.boxShadow = this.highlightedLayoutElement.node.style.origBoxShadow;
      this.highlightedLayoutElement = null;
    }
  }

  /**
   * highlight a layout element
   *
   * @param {HtmlView} element
   * @returns {void}
   * @memberof LayoutEditor
   */
  highlightLayoutElement(element) {

    if (element && element.node && this.selectedLayoutElement && this.selectedLayoutElement.node.id === element.node.id) {
      return;
    }
    if (this.highlightedLayoutElement) {
      this.removeElementHighlight();
    }

    this.highlightedLayoutElement = element;

    if (this.highlightedLayoutElement && this.highlightedLayoutElement.node) {
      this.highlightedLayoutElement.node.style.origBoxShadow = this.highlightedLayoutElement.node.style.boxShadow;
      this.highlightedLayoutElement.node.style.boxShadow = EditorElementIds.highlightedShadow;
    }
  }


  /**
   * build attribute panel for each section of attributes of selected element
   *
   * @protected
   * @memberof LayoutEditor
   */
  buildLayoutAttributePanelLists() {
    this.removeLayoutAttributePanel();
    this.layoutAttributesDiv = this.rightColumnDiv;
    // this.rightColumnDiv.append(this.layoutAttributesDiv);
    this.buildLayoutAttributePanel('Core Attributes');
    this.buildLayoutAttributePanel('Swim Attributes', 'swimAttributes');
    this.buildLayoutAttributePanel('HTML Attributes', 'htmlAttributes');
    this.buildLayoutAttributePanel('Style Attributes', 'styleAttributes');


  }

  /**
   * render the layout attribute panel for the selected layout element
   *
   * @protected
   * @memberof LayoutEditor
   */
  buildLayoutAttributePanel(panelTitle, newAttributeListKey = 'core', isHtmlAttributes = false) {
    let newAttributeList = null;

    if (newAttributeListKey === 'core') {
      newAttributeList = {
        id: this.selectedLayoutData.id,
        name: this.selectedLayoutData.name || '',
        type: this.selectedLayoutData.type,
        content: this.selectedLayoutData.content || '',
      };
    } else {
      newAttributeList = this.selectedLayoutData[newAttributeListKey];
    }
    const newPanel = swim.HtmlView.create('div')
      .id('attributePanel');

    const title = swim.HtmlView.create('h3')
      .text(panelTitle);

    const addAttributeButton = swim.HtmlView.create('div')
      .className('addElementButton')
      .text('+')
      .title("Add New Attribute");

    addAttributeButton.node.onmouseup = (evt) => {
      // const attrName = window.prompt('Enter attribute name:', 'style');
      this.showAddAttributeDialog((attrName, attrValue) => {
        if (attrName && attrValue) {
          this.addElementAttribute(newAttributeListKey, attrName, attrValue);
        }

      });
    };

    title.append(addAttributeButton);

    newPanel.append(title);
    let rowNumber = 1;

    const listing = swim.HtmlView.create('div');
    listing.className("attributesContainer");

    if (isHtmlAttributes) {
      listing.append(this.buildAttributeRow(newAttributeListKey, 'type', this.selectedLayoutData.type));

      if (this.selectedLayoutData.content) {
        const contentRowTrack = this.buildAttributeRow(newAttributeListKey, 'content', this.selectedLayoutData.content);
        contentRowTrack.node.style.backgroundColor = 'rgba(200, 200, 200, 0.2)';
        rowNumber++;
        listing.append(contentRowTrack);
      }
    }

    if (newAttributeList) {
      for (const attributeKey of Object.keys(newAttributeList)) {
        const value = newAttributeList[attributeKey];
        const rowTrack = this.buildAttributeRow(newAttributeListKey, attributeKey, value);
        if (rowNumber % 2 === 1) {
          rowTrack.node.style.backgroundColor = 'rgba(200, 200, 200, 0.2)';
        }
        listing.append(rowTrack);
        rowNumber++;
      }
    }

    newPanel.append(listing);
    if (this.layoutAttributesDiv) {
      this.layoutAttributesDiv.append(newPanel);
    }
  }


  /**
   * utility method used to render an attribute row inside the Layout Attribute panel
   * this will be call for each set of attributes on the selected layout elem
   *
   * @protected
   * @param {string} key
   * @param {*} value
   * @returns {HtmlView}
   * @memberof LayoutEditor
   */
  buildAttributeRow(listKey, attributeKey, value) {
    const rowTrack = swim.HtmlView.create('div')
      .className('attributeRow')
      .display('flex')
      .flexDirection('row');

    const rowKeyElement = swim.HtmlView.create('div')
      .text(attributeKey)
      .className('rowKey');

    const removeButton = swim.HtmlView.create('span')
      .className('removeElementButton')
      .text('-')
      .title("Remove Attribute");
    rowKeyElement.append(removeButton);

    removeButton.node.onmouseup = (evt) => {
      if (confirm('Are you sure you want to delete this element?\r\nThis will also remove any child elements as well and can not be undone')) {
        if (this.deleteElementAttribute(listKey, attributeKey)) {
          rowTrack.remove();
          this.layoutChangesSaved = false;

        }
      }
      evt.preventDefault();
    };

    const rowValueElement = swim.HtmlView.create('div')
      .text(value)
      .className('rowValue');

    rowValueElement.node.setAttribute('contenteditable', 'true');
    rowValueElement.node.onblur = (evt) => {
      this.updateSelectedLayoutAttribute(listKey, attributeKey, rowValueElement.node.innerText);
    };

    rowTrack.append(rowKeyElement);
    rowTrack.append(rowValueElement);

    return rowTrack;

  }


  /**
   * remove the layout attribute panel from the UI
   *
   * @protected
   * @memberof LayoutEditor
   */
  removeLayoutAttributePanel() {
    if (this.layoutAttributesDiv) {
      for (let childDiv of this.layoutAttributesDiv.childViews) {
        childDiv.remove();
        this.layoutChangesSaved = false;
      }
      // this.layoutAttributesDiv.remove();
      // this.layoutAttributesDiv = null;
    }
  }

  /**
   * handle when the user changes the value of an attribute in the layout attribute panel
   *
   * @protected
   * @param {string} listKey
   * @param {string} attributeKey
   * @param {*} value
   *
   * @memberOf LayoutEditor
   */
  updateSelectedLayoutAttribute(listKey, attributeKey, value) {
    let dirty = false;
    if (listKey === 'core') {
      switch (attributeKey) {
        case 'type':
          if (value === '') {
            break;
          }
          if (this.selectedLayoutData.type !== value) {
            this.selectedLayoutData.type = value;
            dirty = true;
          }
          break;
        case 'name':
          if (this.selectedLayoutData.name !== value) {
            this.selectedLayoutData.name = value;
            dirty = true;
          }
          break;
        case 'content':
          if (this.selectedLayoutData.content !== value) {
            this.selectedLayoutData.content = value;
            dirty = true;
          }
          break;
        case 'id':
          if (this.selectedLayoutData.id !== value) {
            this.selectedLayoutData.id = value;
            dirty = true;
          }
          break;
        default:
          // noop
          break;
      }
    } else {
      const updateList = this.selectedLayoutData[listKey];
      if (updateList[attributeKey] !== value) {
        updateList[attributeKey] = value;
        dirty = true;
      }
    }

    if (dirty) {
      this.layoutChangesSaved = false;
      this.clearWorkspace(false);
      this.setActiveTemplate(this.activeLayoutTemplate);
      dirty = false;
    }
  }

  /**
   * helper method to popup a 'popover' dialog and push a layout into it
   *
   * @param {layoutId} layoutId
   * @returns {(HtmlView | null)}
   *
   * @memberOf LayoutEditor
   */
  spawnDialog(layoutId, onLayoutLoad) {
    const popupTarget = document.getElementById('modal');
    // console.info('spawn dialog', layoutId, onLayoutLoad);
    if (popupTarget) {
      // const popup = swim.Popover.is(popupTarget);
      // console.info('render popup', popupTarget);
      this.popover = new swim.PopoverView(popupTarget);

      this.popover.render(layoutId, () => {
        // console.info('popup rendered');
        this.popover.showPopover();
        this.popover.borderRadius(20);
        this.popover.backgroundColor('rgba(255,255,255,0.9)');
        popupTarget.style.opacity = 1;
        popupTarget.style.display = "block";
        if (onLayoutLoad !== null) {
          onLayoutLoad(this.popover)
        }
        return this.popover;
      });
      popupTarget.style.opacity = 1;
      popupTarget.style.display = "block";

    }

    return null;

  }

  /**
   * public method to load a layout based on the list of available layouts
   *
   * @memberof LayoutEditor
   */
  loadLayoutFromService() {
    // console.info('show load layout dialog', this.layoutManager);
    if (!this.layoutChangesSaved) {
      if (!confirm("If you continue changes will be lost.\n Are you sure?")) {
        return false;
      }
    }

    function onLayoutLoad(renderTrack) {

      const cancelButton = renderTrack.getCachedElement(EditorElementIds.cancelButtonId);
      const listArea = renderTrack.getCachedElement(EditorElementIds.textAreaInputFieldId);
      const errorMessage = renderTrack.getCachedElement(EditorElementIds.errorMessageId);

      if (cancelButton && listArea && errorMessage) {
        // const layoutList = LayoutDataHandler.getLayoutList();
        listArea.node.innerHTML = '';

        let sortedList = [];
        for (let layoutListKey in this.layoutManager.templateList) {
          const layoutDef = this.layoutManager.templateList[layoutListKey];
          sortedList.push([layoutListKey, layoutDef.get("title").stringValue()]);
        }
        sortedList.sort((a, b) => {
          var x = a[1].toLowerCase();
          var y = b[1].toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;          
        });
        for (let layoutListKey in sortedList) {
          const layoutKey = sortedList[layoutListKey][0];
          const layoutDef = this.layoutManager.templateList[layoutKey];
          // console.info('layoutDef', layoutDef.get("systemLayout"));
          if ((!layoutDef.get("systemLayout").booleanValue(false) && this.hideSystemFile) || !this.hideSystemFile) {
            if (!layoutDef.systemLayout) {
              // layoutDef.id = layoutListKey;
              const layoutTitle = layoutDef.get("title").stringValue() || 'No Title';
              let layoutDate = new Date(0);
              layoutDate.setUTCMilliseconds(layoutDef.get("changeDate").stringValue());
              layoutDate = layoutDate.toLocaleString('en-US', {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
              })
              const layoutRow = swim.HtmlView.create('div')
                .className("loadLayoutFileRow")
                .color(swim.Color.parse('black'))
                .on('mouseup', (evt) => {
                  if (evt.button == 0) {
                    const layoutLink = swim.nodeRef(this.swimUrl, "/layout/" + layoutKey);
                    layoutLink.downlinkValue().laneUri('template')
                      .didSet((layoutData) => {
                        const template = layoutData.toAny();
                        this.layoutChangesSaved = true;
                        this.clearWorkspace(true);
                        this.setActiveTemplate(template);

                        if (this.popover) {
                          const popupTarget = document.getElementById('modal');
                          this.popover.destroyLayout();
                          popupTarget.style.opacity = 0;
                          popupTarget.style.display = "none";
                          layoutLink.close();
                        }

                      })
                      .open();
                  }

                });
              layoutRow.node.innerHTML = `<span style='width:65%; overflow:hidden'>${layoutTitle}</span><span style='width:35%;float: right; text-align:right'>${layoutDate}</span>`;
              listArea.append(layoutRow);
            }
          }
        };

        errorMessage.text('');

        cancelButton.on('click', (evt) => {
          this.closeModal();
        });
      }

    }
    const renderTrack = this.spawnDialog("loadListDialog", onLayoutLoad.bind(this));
  }

  /**
   * handler for showing the Add Element Attribute dialog
   *
   * @param {*} onSubmitHandler
   *
   * @memberOf LayoutEditor
   */
  showAddAttributeDialog(onSubmitHandler) {
    // if (this.loadJsonDialog !== null) {
    this.spawnDialog("addAttributeForm", (renderTrack) => {
      if (renderTrack) {
        const nameInputField = renderTrack.getCachedElement(EditorElementIds.nameInputFieldId);
        const valueInputField = renderTrack.getCachedElement(EditorElementIds.valueInputFieldId);
        const submitButton = renderTrack.getCachedElement(EditorElementIds.submitButtonId);
        const cancelButton = renderTrack.getCachedElement(EditorElementIds.cancelButtonId);
        const errorMessage = renderTrack.getCachedElement(EditorElementIds.errorMessageId);
        // const titleMessage = renderTrack.getCachedElement(EditorElementIds.titleMessageId);

        if (nameInputField && submitButton && valueInputField && cancelButton && errorMessage) {
          // console.error(nameInputField, valueInputField);

          errorMessage.text('');
          // nameInputField.focus();

          submitButton.on('click', (evt) => {
            const nameInputValue = (nameInputField.node).value;
            const valueInputValue = (valueInputField.node).value;
            onSubmitHandler(nameInputValue, valueInputValue);
            this.closeModal();
            // const popupTarget = document.getElementById('modal');
            // this.popover.destroyLayout();
            // popupTarget.style.display = "none";
            // popupTarget.style.opacity = 0;
          });

          cancelButton.on('click', (evt) => {
            onSubmitHandler();
            this.closeModal();
            // const popupTarget = document.getElementById('modal');
            // this.popover.destroyLayout();
            // popupTarget.style.display = "none";
            // popupTarget.style.opacity = 0;
          });
        }
      }
    });

    // }
  }

  /**
   * method to append a new attribute to the selected element
   *
   * @param {string} listKey - ID of which attribute list to append to
   * @param {string} [attributeName='newAttr'] - name of new attribute
   * @memberof LayoutEditor
   */
  addElementAttribute(listKey, attributeName = 'newAttr', attributeValue = '') {
    if (attributeName === 'style' || attributeName === 'id') {
      alert(`You can not set the ${attributeName} manually`);
      return;
    }
    if (attributeName === '') {
      alert('Enter an attribute name.');
      return;
    }
    if (this.selectedLayoutElement) {
      const elemToUpdate = this.findLayoutElementById(this.selectedLayoutElement.node.id, this.activeLayoutTemplate.layoutElements);

      if (attributeName === 'content') {
        if (!elemToUpdate.hasOwnProperty('content')) {
          elemToUpdate.content = 'new content';
        } else {
          alert('content already exists');
        }

      } else {
        if (!elemToUpdate[listKey]) {
          elemToUpdate[listKey] = {};
        }

        if (elemToUpdate[listKey].hasOwnProperty(attributeName)) {
          alert(`Attribute '${attributeName}' already exists`);
        } else {
          const attr = elemToUpdate[listKey];
          attr[attributeName] = attributeValue;

        }
      }
      this.clearWorkspace(false);
      this.workspaceDiv.renderLayout(this.activeLayoutTemplate);
      this.buildLayoutAttributePanelLists();

      this.buildLayoutElementList(this.activeLayoutTemplate.layoutElements);

    }
  }

  /**
   * removed an attribute from the selected layout element
   *
   * @param {string} listKey
   * @param {string} attributeKey
   * @returns {boolean}
   *
   * @memberOf LayoutEditor
   */
  deleteElementAttribute(listKey, attributeKey) {
    if (listKey === 'core') {
      alert('You can not delete core attributes.');
      return false;
    } else {
      const newAttrList = {};
      const listToEdit = this.selectedLayoutData[listKey];
      for (const attr in listToEdit) {
        if (attr !== attributeKey) {
          newAttrList[attr] = listToEdit[attr];
        }
      }
      this.layoutChangesSaved = false;
      this.updatePageTitle();
      this.selectedLayoutData[listKey] = newAttrList;
      this.clearWorkspace(false);
      this.workspaceDiv.renderLayout(this.activeLayoutTemplate);
      this.buildLayoutAttributePanelLists();
    }
    return true;
  }

  /**
   * removes an element from the layout layout
   *
   * @param {*} parentElement
   * @param {*} childElement
   *
   * @memberOf LayoutEditor
   */
  deleteChildElement(parentElement, childElement) {
    // this.selectLayoutElement();
    if (!parentElement) {
      const newChildList = [];
      for (const oldChild of this.activeLayoutTemplate.layoutElements) {
        // console.error(oldChild.id, childElement.id);
        if (oldChild.id !== childElement.id) {
          newChildList.push(oldChild);
        }
      }
      this.activeLayoutTemplate.layoutElements = newChildList;
      // this.workspaceDiv.setLayoutDefinition(this.activeLayoutTemplate);
    } else {
      const newChildList = [];
      for (const oldChild of parentElement.children) {
        if (oldChild.id !== childElement.id) {
          newChildList.push(oldChild);
        }
      }
      parentElement.children = newChildList;
    }
    this.layoutChangesSaved = false;
    this.updatePageTitle();

    this.clearWorkspace(true);
    this.workspaceDiv.renderLayout(this.activeLayoutTemplate);
    this.buildLayoutElementList(this.workspaceDiv.getLayoutElements());

  }

  /**
   * call to save layout to server
   */
  saveLayout() {

    const layoutDef = this.activeLayoutTemplate;

    if (layoutDef.title === "New layout") {
      const newTitle = prompt("Enter a layout name.");
      if (newTitle === "") {
        alert("Layout must have a title.");
        return false;
      }
      layoutDef.title = newTitle
    }

    if (!layoutDef.layoutId) {
      layoutDef.layoutId = Utils.newGuid();
    }

    const saveObject = {
      layoutId: layoutDef.layoutId,
      title: layoutDef.title,
      width: layoutDef.width,
      height: layoutDef.height,
      backgroundColor: layoutDef.backgroundColor,
      display: layoutDef.display,
      flexDirection: layoutDef.flexDirection,
      layoutElements: layoutDef.layoutElements || [],
      keepSynced: layoutDef.keepSynced,
      renderType: layoutDef.renderType,
      pageCss: layoutDef.pageCss || '',
      pageJsFile: layoutDef.pageJsFile || '',
      systemLayout: layoutDef.systemLayout || false
    };

    // console.info('save obj', saveObject);
    // console.info(this.layoutManager.templateList[layoutDef.layoutId]);

    if (!this.layoutManager.templateList[layoutDef.layoutId]) {
      this.layoutManager.nodeRef.command("addLayout", JSON.stringify(saveObject));
    } else {
      this.layoutManager.nodeRef.command("updateLayout", JSON.stringify(saveObject));
    }

    this.layoutChangesSaved = true;
    this.updatePageTitle();

  }

  closeModal() {
    // console.info("close modal");
    const popupTarget = document.getElementById('modal');
    this.popover.destroyLayout();
    // this.popover.remove()
    popupTarget.style.opacity = 0;
    popupTarget.style.display = "none";

  }

  showLayoutOptions() {
    this.spawnDialog("layoutOptionsPopup", (renderTrack) => {
      if (renderTrack) {

        const cancelButton = renderTrack.getCachedElement("64f5ae12");
        const saveButton = renderTrack.getCachedElement("1527227b");

        const titleField = renderTrack.getCachedElement("layoutTitleInput");
        const widthField = renderTrack.getCachedElement("layoutWidthInput");
        const heightField = renderTrack.getCachedElement("layoutHeightInput");
        const bgColorField = renderTrack.getCachedElement("layoutBgColorInput");
        const displayTypeField = renderTrack.getCachedElement("layoutDisplayTypeInput");
        const flexTypeField = renderTrack.getCachedElement("layoutFlexTypeInput");
        const pageCssField = renderTrack.getCachedElement("layoutPageCssInput");
        const pageJsFileField = renderTrack.getCachedElement("layoutpageJsFileInput");

        if (titleField) {
          titleField.node.value = this.activeLayoutTemplate.title;
        }
        if (widthField) {
          widthField.node.value = this.activeLayoutTemplate.width;
        }
        if (heightField) {
          heightField.node.value = this.activeLayoutTemplate.height;
        }
        if (bgColorField) {
          bgColorField.node.value = this.activeLayoutTemplate.backgroundColor;
        }
        if (displayTypeField) {
          displayTypeField.node.value = this.activeLayoutTemplate.display;
        }
        if (flexTypeField) {
          flexTypeField.node.value = this.activeLayoutTemplate.flexDirection;
        }
        if (pageCssField) {
          pageCssField.node.value = this.activeLayoutTemplate.pageCss || '';
        }
        if (pageJsFileField) {
          pageJsFileField.node.value = this.activeLayoutTemplate.pageJsFile || '';
        }

        saveButton.on('click', (evt) => {
          this.activeLayoutTemplate.title = titleField.node.value;
          this.activeLayoutTemplate.width = widthField.node.value;
          this.activeLayoutTemplate.height = heightField.node.value;
          this.activeLayoutTemplate.backgroundColor = bgColorField.node.value;
          this.activeLayoutTemplate.display = displayTypeField.node.value;
          this.activeLayoutTemplate.flexDirection = flexTypeField.node.value;
          if (pageCssField) {
            this.activeLayoutTemplate.pageCss = pageCssField.node.value || '';
            let styleElem = document.getElementById('pageCssElem');
            if (this.activeLayoutTemplate.pageCss) {
              styleElem.href = this.activeLayoutTemplate.pageCss; //"/assets/css/style.css"
            } else {
              styleElem.href = "";
            }

          }
          if (pageJsFileField) {
            this.activeLayoutTemplate.pageJsFile = pageJsFileField.node.value || '';
            let pageJsFileElem = document.getElementById('pageJsFileElem');
            if (this.activeLayoutTemplate.pageJsFile) {
              pageJsFileElem.src = this.activeLayoutTemplate.pageJsFile;
            } else {
              pageJsFileElem.src = "";
            }
          }
          this.clearWorkspace(false);
          this.workspaceDiv.renderLayout(this.activeLayoutTemplate);
          this.layoutChangesSaved = false;
          this.updatePageTitle();
          this.closeModal();
        })

        cancelButton.on('click', (evt) => {
          this.closeModal();
        });
      }
    });
  }

  editRawJson() {
    this.spawnDialog("jsonEditor", (renderTrack) => {
      if (renderTrack) {

        const cancelButton = renderTrack.getCachedElement("4ef4cc3e");
        const updateButton = renderTrack.getCachedElement("e59065ad");
        const jsonTextArea = renderTrack.getCachedElement("707b60d7");

        jsonTextArea.text(JSON.stringify(this.activeLayoutTemplate));

        updateButton.on('click', (evt) => {

          try {
            let rawInput = jsonTextArea.text().replace(/(\r\n|\n|\r)/gm, "");
            rawInput = rawInput.replace(/\s\s/g, '');
            rawInput = rawInput.replace(/\": \"/g, '":"');
            console.info(rawInput);
            const template = JSON.parse(rawInput);
            this.setActiveTemplate(template);
            this.layoutChangesSaved = false;
            this.updatePageTitle();
            this.closeModal();
          } catch (ex) {
            alert(ex);
          }

        });

        cancelButton.on('click', (evt) => {
          this.closeModal();
        });
      }
    });
  }

  newWindow() {
    window.open(`http://${window.location.host}/editor.html`);
  }
}