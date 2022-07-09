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
header.className = "topbar-ddev";
header.id = "header";

const link1 = document.createElement("a");
link1.className = "topbar-link";
link1.href = "https://ddev247.github.io/home";

const link1Img = document.createElement("img");
link1Img.src = "https://ddev247.github.io/assets/logo25.png";
link1Img.alt = "Home";

link1.appendChild(link1Img);

const link2 = document.createElement("a");
link2.className = "topbar-link";
link2.href = "https://ddev247.github.io/dev";
link2.text = "Developer";

const link3 = document.createElement("a");
link3.className = "topbar-link";
link3.href = "https://ddev247.github.io/dev/blogs";
link3.text = "Blogs";

const link4 = document.createElement("a");
link4.className = "topbar-link";
link4.href = "https://ddev247.github.io/about";
link4.text = "About";

header.appendChild(link1);
header.appendChild(link2);
header.appendChild(link3);
header.appendChild(link4);

// MOBILE HEADER

const header_mobile = document.createElement("header");
header_mobile.className = "topnav";
header_mobile.id = "header-mobile";

const mobile_link1 = document.createElement("a");
mobile_link1.href = "https://ddev247.github.io/home";

const mobile_link1Img = document.createElement("img");
mobile_link1Img.src = "https://ddev247.github.io/assets/logo25.png";
mobile_link1Img.alt = "Home";

mobile_link1.appendChild(link1Img);

const mobile_link2 = document.createElement("a");
mobile_link2.href = "https://ddev247.github.io/dev";
mobile_link2.text = "Developer";

const mobile_link3 = document.createElement("a");
mobile_link3.href = "https://ddev247.github.io/dev/blogs";
mobile_link3.text = "Blogs";

const mobile_link4 = document.createElement("a");
mobile_link4.href = "https://ddev247.github.io/about";
mobile_link4.text = "About";

header_mobile.appendChild(mobile_link1);
header_mobile.appendChild(mobile_link2);
header_mobile.appendChild(mobile_link3);
header_mobile.appendChild(mobile_link4);

document.getElementById("content").insertBefore(header, null);
document.getElementById("header").after(header_mobile);