
let _RECENT_DOCUMENTS_DIV = document.getElementById("recent-documents");
let _ERROR_DIV = document.getElementById("error-div");
let _ERROR_CONTENT = document.getElementById("error-content");

var Ipsum = "";

httpGetAsync("http://asdfast.beobit.net/api/?type=paragraph?length=10?startLorem=true", (text) => {
    Ipsum = JSON.parse(text).text;
});

async function loadList() {
    while(db == {}) {

    }

    _RECENT_DOCUMENTS_DIV = document.getElementById("recent-documents");
    _ERROR_DIV = document.getElementById("error-div");
    _ERROR_CONTENT = document.getElementById("error-content");

    Array.from(_RECENT_DOCUMENTS_DIV.children).forEach(element => {
        element.remove();
    });

    // do stuff
    db.database.docs.forEach(element => {
        console.log("Loading document id of '" + element.id + "'");

        _RECENT_DOCUMENTS_DIV.appendChild(createRecentDoc(element));
    });
}

function createRecentDoc(element) {
    let dateText = "";
    const time = new Date(element.time);
    console.log(element.time + " | " + time.getTime());
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (today.toDateString() === time.toDateString()) {
        const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        dateText = "Today at " + time.getHours() + ":" + minutes;
    }
    else if (yesterday.toDateString() === time.toDateString()) {
        const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        dateText = "Yesterday at " + time.getHours() + ":" + minutes;
    }
    else {
        const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        dateText = time.getDate() + "." + time.getMonth() + "." + time.getFullYear() + " at " + time.getHours() + ":" + minutes;
    }

    let root = document.createElement('div');
    root.setAttribute("docid", element.id);
    root.className = "recent-document";

    let left = document.createElement('div');
    let title = document.createElement('h3');
    title.textContent = element.name;

    let date = document.createElement('p');
    date.textContent = dateText;
    
    left.appendChild(title);
    left.appendChild(date);

    let right = document.createElement('div');
    let openLink = document.createElement('a');
    openLink.innerText = "Open"
    openLink.setAttribute("onclick", "load('/docs/document?id=" + element.id + "')");

    let br = document.createElement('br');

    let deleteLink = document.createElement('a');
    deleteLink.innerText = "Delete"
    deleteLink.setAttribute("onclick", "deleteDoc('" + element.id + "')");

    right.appendChild(openLink);
    right.appendChild(br);
    right.appendChild(deleteLink);

    root.appendChild(left);
    root.appendChild(right);

    return root;
}

function create(a) {
    let template = a.getAttribute("template");

    createDoc(template);
}

function createDoc(template) {
    console.log("Creating document with template: '" + template + "'")

    let content;
    
    switch (template) {
        case "Empty":
            content = ["<p> </p>"];
            break;

        case "Lorem Ipsum":
            content = [
                "<h1>Lorem Ipsum</h1>",
                "<p>" + Ipsum + "</p>"
            ];
            break;
    
        default:
            break;
    }

    db.database.docs.push({
        "id": "document" + db.database.docs.length,
        "name": template + " Document",
        "time": Date.now(),
        content
    });

    saveDB();
    loadList();
}

function deleteDoc(id) {
    let doc = getDocById(id);

    if(doc != undefined) {
        let newDocs = [];

        db.database.docs.forEach(element => {
            if(element.id != id)
                newDocs.push(element);
        });
        
        db = {
            "version": db.version,
            "type": db.type,
            "database": {
                "docs": newDocs,
                "settings": db.database.settings
            }
        }
        
        saveDB();
    }
    else {
        showError("The document with the id of '" + id + "' doesn't exist.")
    }

    loadList();
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
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

function addDocument() {
    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 
        let file = e.target.files[0]; 
     
        let reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;

            // load
            let obj = JSON.parse(content);

            console.log("adding");
            console.log(obj);
            db.database.docs.push(obj);
            saveDB();

            let a = document.createElement('a');
            a.href = "/docs/document?id=" + obj.id;

            console.log(content);
            a.click();
        }
    }

    input.click();
}

loadList();
