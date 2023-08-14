
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const _ALBUM = getParameterByName("album");

const photoLoad = () => {
    const URL = document.getElementById("viewerScript").getAttribute("cURL");
    const HANDLER_ID = document.getElementById("viewerScript").getAttribute("cHandler");
    const HEIGHT = document.getElementById("viewerScript").getAttribute("cHeight");

    let handler = document.getElementById(HANDLER_ID);
    let json = JSON.parse(Get(URL + ".json"));

    if(json.type == "photoViewer") {
        if(_ALBUM == undefined || _ALBUM == "") {
            Object.keys(json.photos).forEach(element => {
                Object.keys(json.photos[element].photos).forEach(element2 => {
                    let img = document.createElement('img');
                    handler.appendChild(img);

                    img.setAttribute("height", HEIGHT);
                    img.title = json.photos[element].credit + " " + json.photos[element].year + " / " + json.photos[element].photos[element2].name;
                    img.alt = json.photos[element].credit + " " + json.photos[element].year + " / " + json.photos[element].photos[element2].name;
                    img.src = json.photos[element].photos[element2].url;
                    
                    img.setAttribute("album", element);
                    img.setAttribute("index", element2);
    
                    img.onclick = (e) => {
                        a = document.createElement('a');
                        a.href = "/london/explore/view.html?album=" + e.target.getAttribute("album") + "&index=" + e.target.getAttribute("index") + "&prev=" + window.location.pathname;
                        a.click();
                        a.remove();
                    }
                });
            });
        }
        else {
            let obj = json.photos[_ALBUM]

            Object.keys(obj.photos).forEach(element2 => {
                let img = document.createElement('img');
                handler.appendChild(img);

                img.setAttribute("height", HEIGHT);
                img.title = obj.credit + " " + obj.year + " / " + obj.photos[element2].name;
                img.alt = obj.credit + " " + obj.year + " / " + obj.photos[element2].name;
                img.src = obj.photos[element2].url;
                
                img.setAttribute("album", _ALBUM);
                img.setAttribute("index", element2);

                img.onclick = (e) => {
                    a = document.createElement('a');
                    a.href = "/london/explore/view.html?album=" + e.target.getAttribute("album") + "&index=" + e.target.getAttribute("index") + "&prev=" + window.location.pathname;
                    a.click();
                    a.remove();
                }
            });
        }
    }
    else {
        console.error("Error: Invalid JSON type");
    }
};
