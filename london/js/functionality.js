const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
var DARK_MODE = false;
var MOBILE = false;

if (prefersDarkScheme.matches) {
    DARK_MODE = true;
} else {
    DARK_MODE = false;
}

/*let ls = localStorage.getItem("londonDarkMode");
if (ls == "true") {
    DARK_MODE = true;
}
else if (ls === "false") {
    DARK_MODE = false;
}*/

function dark() {
    if(document.body.classList.contains("checked"))
        DARK_MODE = !DARK_MODE;

    var body = document.body;
    var logo = document.getElementById("logo");
    var logoMobile = document.getElementById("logoMobile");
    var darkLogo = document.getElementById("darkLogo");
    var darkLogoMobile = document.getElementById("darkLogoMobile");

    logo.style = DARK_MODE ? "display: none;" : "";
    logoMobile.style = DARK_MODE ? "display: none;" : "";
    darkLogo.style = DARK_MODE ? "" : "display: none;";
    darkLogoMobile.style = DARK_MODE ? "" : "display: none;";

    
    var elems = document.body.getElementsByTagName("*");
    for (let i = 0; i < elems.length; i++) {
        let element = elems[i];
        if(!DARK_MODE) {
            element.classList.add("white");
            element.classList.remove("dark");
        }
        else {
            element.classList.remove("white");
            element.classList.add("dark");
        }
    }

    if(!DARK_MODE) {
        body.classList.add("white");
        body.classList.remove("dark");
    }
    else {
        body.classList.remove("white");
        body.classList.add("dark");
    }
    body.classList.add("checked");

    // save
    // localStorage.setItem("londonDarkMode", DARK_MODE);
}

function check() {
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
