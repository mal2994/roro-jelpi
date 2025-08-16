var creditsDiv = document.createElement("div");
creditsDiv.id = "credits-div";
document.body.appendChild(creditsDiv);

fetch("credits.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("credits-div").innerHTML = data;
  });
