const URL = document.getElementById("viewerScript").getAttribute("cURL");
const HANDLER_ID = document.getElementById("viewerScript").getAttribute("cHandler");

const TITLE = document.getElementById("photoTitle");
const CREDIT = document.getElementById("photoCredit");
const YEAR = document.getElementById("photoYear");
const BACK = document.getElementById("backBtn");

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const _ALBUM = getParameterByName("album");
const _INDEX = getParameterByName("index");
const _PREV = getParameterByName("prev");

BACK.onclick = () => {
    a = document.createElement('a');
    a.href = _PREV;
    a.click();
    a.remove();
}

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

window.addEventListener('load', (event) => {
    let handler = document.getElementById(HANDLER_ID);
    let json = JSON.parse(Get(URL + _ALBUM + "/photos.json"));

    if(json.type == "photoViewer") {
        let main = json.photos[_ALBUM];
        let obj = json.photos[_ALBUM].photos[_INDEX];
        
        let img = handler.querySelector("#photoView");
        img.title = main.credit + " " + main.year + " / " + obj.name;
        img.alt = main.credit + " " + main.year + " / " + obj.name;
        img.src = obj.url;
        
        img.setAttribute("album", _ALBUM);
        img.setAttribute("index", _INDEX);

        img.onclick = () => {
            let a = document.createElement('a');
            a.href = obj.url;
            a.click();
            a.remove();
        }

        TITLE.textContent = obj.name;
        CREDIT.textContent = main.credit;
        YEAR.textContent = main.year;
        
        setInterval((i = img) => {
            let height = window.innerWidth - 50;
            let max = Number.parseInt(i.getAttribute("maxWidth"));

            i.setAttribute("height", height < max ? height : max);
            
            let w = ((window.innerWidth - 50) / 2) - i.clientWidth/2;
            i.parentElement.style = `padding-left: ${w}px`;
        }, 10);
    }
    else {
        console.error("Error: Invalid JSON type");
    }
});
