/*
<header class="topbar-ddev">
    <a class="topbar-link" href="https://ddev247.github.io/home"><img src="https://ddev247.github.io/assets/logo25.png" alt="Home"></a>
    <a class="topbar-link" href="https://ddev247.github.io/dev">Developer</a>
    <a class="topbar-link" href="https://ddev247.github.io/dev/blogs">Blogs</a>
    <a class="topbar-link" href="https://ddev247.github.io/about">About</a>
</header>

<header id="topbar-mobile" class="hdr-ddev">
    <div class="topnav">
        <!-- <a href="http://ddev-local.pl/home">Home</a> -->
        <a class="topbar-link" href="https://ddev247.github.io/home"><img src="https://ddev247.github.io/assets/logo25.png" alt="Home"></a>
        <a href="http://ddev-local.pl/games">Games</a>
        <a href="http://ddev-local.pl/sims">Simulations</a>
        <a href="http://ddev-local.pl/blogs">Blogs</a>
        <a href="http://ddev-local.pl/about">About</a>
    </div>
</header>
*/

const header = document.createElement("header");
header.id = "header";

const link1 = document.createElement("a");
link1.className = "topbar-link";
link1.href = "https://ddev247.github.io/home";

const link1Img = document.createElement("img");
link1Img.src = "https://ddev247.github.io/assets/logo25.png";
link1Img.alt = "Home";

link1.appendChild(link1Img);

const link2 = document.createElement("a");
link1.className = "topbar-link";
link1.href = "https://ddev247.github.io/dev";
link1.text = "Developer";

const link3 = document.createElement("a");
link1.className = "topbar-link";
link1.href = "https://ddev247.github.io/dev/blogs";
link1.text = "Blogs";

const link4 = document.createElement("a");
link1.className = "topbar-link";
link1.href = "https://ddev247.github.io/about";
link1.text = "About";

header.appendChild(link1);
header.appendChild(link2);
header.appendChild(link3);
header.appendChild(link4);



const header_mobile = document.createElement("header");

const mobile_link1 = document.createElement("a");
link1.href = "https://ddev247.github.io/home";

const mobile_link1Img = document.createElement("img");
link1Img.src = "https://ddev247.github.io/assets/logo25.png";
link1Img.alt = "Home";

mobile_link1.appendChild(link1Img);

const mobile_link2 = document.createElement("a");
link1.href = "https://ddev247.github.io/dev";
link1.text = "Developer";

const mobile_link3 = document.createElement("a");
link1.href = "https://ddev247.github.io/dev/blogs";
link1.text = "Blogs";

const mobile_link4 = document.createElement("a");
link1.href = "https://ddev247.github.io/about";
link1.text = "About";

header_mobile.appendChild(mobile_link1);
header_mobile.appendChild(mobile_link2);
header_mobile.appendChild(mobile_link3);
header_mobile.appendChild(mobile_link4);

document.getElementById("content").insertBefore(header);
document.getElementById("header").after(header);