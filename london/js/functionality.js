const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
var DARK_MODE = false;
var MOBILE = false;

if (prefersDarkScheme.matches) {
    DARK_MODE = true;
} else {
    DARK_MODE = false;
}

function dark() {
    if(document.body.classList.contains("checked"))
        DARK_MODE = !DARK_MODE;

    var body = document.body;
    var logo = document.getElementById("logo");
    var logoMobile = document.getElementById("logoMobile");
    var darkLogo = document.getElementById("darkLogo");
    var darkLogoMobile = document.getElementById("darkLogoMobile");

    logo.style = DARK_MODE ? "" : "display: none;";
    logoMobile.style = DARK_MODE ? "" : "display: none;";
    darkLogo.style = DARK_MODE ? "display: none;" : "";
    darkLogoMobile.style = DARK_MODE ? "display: none;" : "";

    body.classList.toggle("dark");
    
    var elems = document.body.getElementsByTagName("*");
    for (let i = 0; i < elems.length; i++) {
        let element = elems[i];
        element.classList.toggle("dark");
    }

    if(!DARK_MODE) {
        document.body.classList.add("white");
    }
    else {
        document.body.classList.remove("white");
    }
    document.body.classList.add("checked");
}

function check() {
    if(DARK_MODE)
        dark();

    let header = document.body.getElementsByTagName('header')[0];
    let photoHandler = document.getElementById("photos");
    let desktopHeader = header.querySelector("#desktopHeader");
    let mobileHeader = header.querySelector("#mobileHeader");
    // check if mobile
    setInterval(() => {
        if(window.innerWidth < 720) {
            // mobile
            header.classList.add("mobile");
            try {
                photoHandler.classList.add("mobile");
            } catch {}
            desktopHeader.style.display = "none";
            mobileHeader.style.display = "";

            MOBILE = true;
        }
        else {
            // desktop
            header.classList.remove("mobile");
            try {
                photoHandler.classList.remove("mobile");
            } catch {}
            desktopHeader.style.display = "";
            mobileHeader.style.display = "none";

            MOBILE = false;
        }
    }, 100)
}
