
let documentID = getParameterByName("id");
let documentContent = document.getElementById("document-content");
let action = undefined;
let doc = undefined;

let _ERROR_DIV = document.getElementById("error-div");
let _ERROR_CONTENT = document.getElementById("error-content");

let currentEdit = undefined;

async function loadDocument() {
    while(db == {}) {

    }

    documentID = getParameterByName("id");

    doc = getDocById(documentID);
    documentEditor = document.getElementById("document-editor");
    documentContent = document.getElementById("document-content");

    documentContent.innerHTML = "";
    documentEditor.innerHTML = "";
    
    if(doc != undefined) {
        let i = 0;
        document.getElementById("document-name-text").innerText = doc.name;

        doc.content.forEach(element => {
            const idd = "docElem" + i;

            let el = createElementFromHTML(element);
            el.id = idd + "content";
            documentContent.appendChild(el);

            let ele = document.createElement('span');
            ele.innerText = el.innerText;
            ele.id = idd + "span";
            ele.setAttribute("contenteditable", "");
            ele.setAttribute("autofocus", "");
            let elem = document.createElement(el.nodeName);
            elem.id = idd;
            elem.className = el.className;
            elem.oninput = (e) => {
                el.innerText = e.target.innerText;
            }
            elem.onclick = (e) => {
                if(elem == undefined)
                    debugger;
                currentEdit = elem;
            }
            elem.appendChild(ele);

            documentEditor.appendChild(elem);
            
            i++;
        });
    }
    else {
        showError("The document with the id of '" + documentID + "' doesn't exist.")
    }
}

async function saveDocument() {
    let spinner = document.getElementById("spinner");
    spinner.style.display = "";
    while(db == {}) {

    }

    documentID = getParameterByName("id");

    doc = getDocById(documentID);
    documentContent = document.getElementById("document-content");
    doc.content = [];
    doc.name = document.getElementById("document-name-text").innerText;

    /*const styleToString = (element) => {
        return '"' + element.style.cssText + '"';
    }*/

    const classToString = (element) => {
        let out = "";

        element.classList.forEach(e => {
            out += e + " ";
        });
        return '"' + out + '"';
    }

    documentContent.childNodes.forEach(element => {
        doc.content.push(`<${element.nodeName} class=${classToString(element)}>${element.innerText}</${element.nodeName}>`);
    });

    doc.time = Date.now();

    saveDB();
    loadDocument();
    setTimeout(() => {
        spinner.style.display = "none";
    }, 100);

    let savetext = document.createElement('p');
    savetext.innerText = "Document saved.";
    savetext.className = "light";
    document.getElementById("header-top-right").appendChild(savetext);

    setTimeout(() => {
        savetext.remove();
    }, 5500);
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function showError(message) {
    _ERROR_DIV.style.display = "";
    _ERROR_CONTENT.innerText = message;

    document.onscroll = (e) => {
        let y = window.scrollY;
        let x = window.scrollX;

        _ERROR_DIV.style.top = y + "px";
        _ERROR_DIV.style.left = x + "px";
    };
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

function setBold(element) {
    element.classList.toggle("bold");
    document.getElementById(element.id + "content").classList.toggle("bold");

    saveDocument();
}

function setItalic(element) {
    element.classList.toggle("italic");
    document.getElementById(element.id + "content").classList.toggle("italic");

    saveDocument();
}

function setUnderline(element) {
    element.classList.toggle("underline");
    document.getElementById(element.id + "content").classList.toggle("underline");

    saveDocument();
}

let colorpickerElement;
let selectedColor;
function showColorPicker(element) {
    let picker = document.getElementById("color-picker");
    let documentEditor = document.getElementById("document-editor");
    let pickerColors = document.getElementById("color-picker-div");
    for(let i = 0; i < pickerColors.children.length; i++) {
        let e = pickerColors.children.item(i);
        e.setAttribute("title", e.classList[1]);
        e.style.backgroundColor = window.getComputedStyle(e).getPropertyValue("color");
    }
    picker.style.display = "";
    documentContent.style.display = "none";
    documentEditor.style.display = "none";

    colorpickerElement = element;
}

function hideColorPicker() {
    let picker = document.getElementById("color-picker");
    let documentContent = document.getElementById("document-content");
    let documentEditor = document.getElementById("document-editor");

    documentContent.style.display = "";
    documentEditor.style.display = "";
    picker.style.display = "none";
}

function selectColor(element) {
    let picker = document.getElementById("color-picker");
    let pickerText = document.getElementById("color-picker-example");
    pickerText.className = element.classList[1];
    selectedColor = element.classList[1];

    let dropper = document.getElementById("dropper");
    let pickerColors = document.getElementById("color-picker-div");
    for(let i = 0; i < pickerColors.children.length; i++) {
        let e = pickerColors.children.item(i);

        if(dropper.classList.contains(e.classList[1]))
            dropper.classList.toggle(e.classList[1]);
    }

    dropper.classList.toggle(element.classList[1]);
}

function setColorPickerColor() {
    let picker = document.getElementById("color-picker");
    let pickerColors = document.getElementById("color-picker-div");
    let span = document.getElementById(colorpickerElement.id + "content");
    for(let i = 0; i < pickerColors.children.length; i++) {
        let e = pickerColors.children.item(i);

        if(colorpickerElement.classList.contains(e.classList[1]))
            colorpickerElement.classList.toggle(e.classList[1]);

        if(span.classList.contains(e.classList[1]))
            span.classList.toggle(e.classList[1]);
    }
    colorpickerElement.classList.toggle(selectedColor);
    span.classList.toggle(selectedColor);
    hideColorPicker();

    saveDocument();
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addElement(element, elementName) {
    let ctnt = document.getElementById(element.id + "content");

    let ele = document.createElement(elementName);
    ele.innerText = "...";

    insertAfter(ctnt, ele);
    //documentContent.appendChild(element);

    saveDocument();
}

function deleteElement(element) {
    let ctnt = document.getElementById(element.id + "content");
    ctnt.remove();
    element.remove();
    saveDocument();
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function saveToFile() {
    saveDocument();

    console.log("saving to file: " + JSON.stringify(doc));
    download(doc.name + ".json", JSON.stringify(doc));
}

loadDocument();
