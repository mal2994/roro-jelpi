var creditsDiv = document.createElement("div");
creditsDiv.id = "credits-div";
var body0 = document.getElementById("body_0");
body0.appendChild(creditsDiv);

fetch("credits.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("credits-div").innerHTML = data;
  });
