// watches GPIO for changes and updates highscore

const httpEndpoint =
  "https://mal2994--61f183ca6db311f0af770224a6c84d84.web.val.run";

let lastValue = null;
let currentValue = null;

function splitGPIOData(str) {
  let decimalValues = [];
  const splitData = str.match(/.{1,2}/g) || [];
  for (let i = 0; i < splitData.length; i += 4) {
    for (let j = 3; j >= 0; j--) {
      const n = splitData[i + j];
      const h = parseInt(n, 16);
      decimalValues.push(h);
    }
  }
  return decimalValues;
}

function joinGPIOData(arr) {
  if (!arr || arr.length === 0) return null;
  let hexValues = "";
  for (let i = 0; i < arr.length; i += 4) {
    for (let j = 3; j >= 0; j--) {
      const n = arr[i + j];
      const h = n.toString(16).padStart(2, "0");
      hexValues += h;
    }
  }
  return hexValues;
}

function fetchData() {
  fetch(httpEndpoint + "/dl")
    .then((response) => response.text())
    .then((data) => {
      pico8_gpio = splitGPIOData(data);
      lastValue = joinGPIOData(pico8_gpio);
      console.log("GPIO data fetched " + data);
    }).catch((error) => console.error("Error:", error));
}

function checkDataAndPost() {
  currentValue = joinGPIOData(pico8_gpio);
  if (!currentValue || !lastValue) return;
  if (currentValue.length < 1 || lastValue.length < 1) return;
  if (currentValue !== lastValue) {
    fetch(httpEndpoint + "/ul", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: currentValue,
    })
      .then((response) => response.text())
      .then((data) => console.log("Posted GPIO:", data))
      .catch((error) => console.error("Post error:", error));
    console.log("GPIO data posted ", currentValue);
    lastValue = currentValue;
  }
}

setInterval(fetchData, 20000);
fetchData();
setInterval(checkDataAndPost, 500);

if (false) {
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
  // fetchDataHardcodedForTesting();
}
