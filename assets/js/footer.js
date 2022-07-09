const footerDiv = document.getElementById("footer");

const footerTop = document.createElement("a");
footerTop.href = "#";
footerTop.text = "Go to the top";

const footerImage = document.createElement("img");
footerImage.src = "https://ddev247.github.io/assets/logo25.png";

const footerLink1 = document.createElement("h3");
footerLink1.text = "Made By DDev\nDDev247 2022";

footerDiv.appendChild(footerImage);

footerDiv.appendChild(footerTop);
footerDiv.appendChild(footerLink1);
