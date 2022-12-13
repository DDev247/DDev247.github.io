
function load(url="/docs/") {
    let a = document.createElement('a');a.href = url;
    a.click();
    return;
    if(url == window.location.pathname) return;

    let loading = document.createElement('div');
    loading.className = "loading-bar";
    
    let loadingdiv = document.createElement('div');
    //loadingdiv.style.width = "50%";

    loading.appendChild(loadingdiv);

    document.body.prepend(loading);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onprogress = function(ev) {
        loadingdiv.style.width = ev.total.toString() + "%";
    }

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            setTimeout(() => {
                const nextURL = url;
                const nextTitle = document.title;
                window.history.pushState({"html":document.innerHTML,"pageTitle":document.title}, nextTitle, nextURL);

                document.documentElement.innerHTML = xmlHttp.responseText;
                
                let script = document.getElementById("home-script");
                let script2 = document.getElementById("document-script");
                if(script) {
                    loadList();
                }

                if(script2) {
                    loadDocument();
                }

                window.onpopstate = (e) => {
                    if(e.state){
                        document.documentElement.innerHTML = e.state.html;
                        document.title = e.state.pageTitle;
                    }
                    console.log(e);
                    debugger;
                };
            }, 100);
        }
    }

    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}
