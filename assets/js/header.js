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

// Basic header

// parent Div
const headerDiv = document.getElementById("header");

const headerHome = document.createElement("a");
headerHome.className = "header-link";
headerHome.href = "https://ddev247.github.io/home";

const headerHomeImage = document.createElement("img");
headerHomeImage.src = "https://ddev247.github.io/assets/logo25.png";

headerHome.appendChild(headerHomeImage);

const headerLink1 = document.createElement("a");
headerLink1.className = "header-link";
headerLink1.href = "https://ddev247.github.io/dev";
headerLink1.text = "Developer";
const headerLink2 = document.createElement("a");
headerLink2.className = "header-link";
headerLink2.href = "https://ddev247.github.io/dev/blogs";
headerLink2.text = "Blogs";
const headerLink3 = document.createElement("a");
headerLink3.className = "header-link";
headerLink3.href = "https://ddev247.github.io/about";
headerLink3.text = "About";

headerDiv.appendChild(headerHome);

headerDiv.appendChild(headerLink1);
headerDiv.appendChild(headerLink2);
headerDiv.appendChild(headerLink3);
