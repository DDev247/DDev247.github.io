
const HEADER = document.getElementById("header")

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const _NAME = getParameterByName("authorName");
const _ALBUMM = getParameterByName("album");
document.getElementById("viewerScript").setAttribute("cURL", "/london/photos/" + _ALBUMM);
photoLoad();

HEADER.textContent = `Photos by ${_NAME.split('-')[0]} ${_NAME.split('-')[1]}`;
