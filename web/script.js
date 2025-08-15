// watches GPIO for changes and updates highscore
// let lastValueGPIO = null;
let lastValue = null;
let currentValue = null;
const httpEndpoint =
  "https://mal2994--61f183ca6db311f0af770224a6c84d84.web.val.run";

function splitGPIOData(data) {
  const splitData = data.match(/.{1,2}/g) || [];
  // const decimalValues = splitData.map((hex) => parseInt(hex, 16));
  let decimalValues = [];
  for (var i = 0; i < splitData.length; i += 4) {
    for (var j = 3; j >= 0; j--) {
      const n = splitData[i + j];
      const h = parseInt(n, 16);
      decimalValues.push(h);
    }
  }
  return decimalValues;
}

function rejoinGPIOData(splitData) {
  // const rejoinedData = splitData.join("");
  const hexValues = splitData.map((num) => num.toString(16).padStart(2, "0"))
    .join("");
  return hexValues;
}

function fetchData() {
  fetch(httpEndpoint)
    .then((response) => response.text())
    .then((data) => {
      pico8_gpio = splitGPIOData(data);
      lastValue = rejoinGPIOData(pico8_gpio);
      console.log("GPIO data fetched " + data);
    }).catch((error) => console.error("Error:", error));
}

function checkDataAndPost() {
  currentValue = rejoinGPIOData(pico8_gpio);
  if (!currentValue || !lastValue) return;
  if (currentValue !== lastValue) {
    fetch(httpEndpoint + "/ul", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: rejoinGPIOData(pico8_gpio),
    })
      .then((response) => response.text())
      .then((data) => console.log("Posted GPIO:", data))
      .catch((error) => console.error("Post error:", error));
    console.log("GPIO data posted ", currentValue);
    lastValue = currentValue;
  }
}

// checkfor changes every 20 seconds
setInterval(fetchData, 20000);
fetchData(); // initial fetch

// check for GPIO changes every 500ms
setInterval(checkDataAndPost, 500);

if (true) {
  fetchDataHardcodedForTesting = () => {
    console.log("Using hardcoded GPIO data for testing");
    var rawDataString =
      "000d121212000b80cc8b0d120101000b0ccc8b010d121200000d10e5180d121201000d44662401010101000d0e00000202010100000e4c8bd90d121212000e6e66240d120000000f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    fetch(httpEndpoint + "/ul", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: rawDataString,
    })
      .then((response) => response.text())
      .then((data) => console.log("Posted GPIO:", rawDataString))
      .catch((error) => console.error("Post error:", error));
  };
  fetchDataHardcodedForTesting();
}
