document.body.onload = function() {
    document.getElementById("content").style.backgroundColor = "white";
    document.getElementsByClassName("footer")[0].style.backgroundColor = "white";


    updateColor();
    setInterval(updateColor, 1000);
}


function updateColor() {
    fetch("https://ipv6color.hamptonmoore.com/color.txt?"+Math.random()).then(response => response.text())
        .then((response) => {
            document.body.style.backgroundColor = response;
            document.getElementById("color").innerHTML = response;
        })
}