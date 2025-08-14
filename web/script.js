// watches GPIO for changes and updates highscore
let lastValue = null;
let currentValue = null;
const httpEndpoint =
  "https://mal2994--61f183ca6db311f0af770224a6c84d84.web.val.run";

function isPostTrigger() {
  return lastValue !== null &&
    currentValue !== null &&
    currentValue !== lastValue;
}

function splitGPIOData(data) {
  const splitData = data.match(/.{1,2}/g) || [];
  const decimalValues = splitData.map((hex) => parseInt(hex, 16));
  return decimalValues;
}
function rejoinGPIOData(splitData) {
  // const rejoinedData = splitData.join("");
  const hexValues = splitData.map((num) => num.toString(16).padStart(2, "0"))
    .join("");
  return hexValues;
}

function fetchData() {
  if (true) {
    fetch(httpEndpoint)
      .then((response) => response.text())
      .then((data) => {
        const splitData = data.match(/.{1,2}/g) || [];
        const rejoinedData = splitData.join("");

        // pico8_gpio = splitData;
        // lastValue = rejoinedData;

        pico8_gpio = splitGPIOData(data);
        lastValue = rejoinGPIOData(pico8_gpio);

        console.log("GPIO data fetched " + data);
      })
      .catch((error) => console.error("Error:", error));
  }
}
function postData() {
  if (isPostTrigger()) {
    currentValue = pico8_gpio.join("");
    if (lastValue != null && currentValue !== lastValue) {
      console.log("GPIO data posted ", currentValue);
      return 0;

      fetch(httpEndpoint + "/ul", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: pico8_gpio.join(","),
      })
        .then((response) => response.text())
        .then((data) => console.log("Posted GPIO:", data))
        .catch((error) => console.error("Post error:", error));
      lastValue = currentValue;
    }
  }
}
// checkfor changes every 20 seconds
setInterval(fetchData, 20000);
fetchData(); // initial fetch

// check for GPIO changes every 500ms
setInterval(postData, 500);
