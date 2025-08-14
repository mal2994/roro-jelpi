// watches GPIO for changes and updates highscore
let lastValue = null;
let isHighscoreInitialized = false;
const httpEndpoint =
  "https://mal2994--61f183ca6db311f0af770224a6c84d84.web.val.run";

log = console.log;
fetch(httpEndpoint)
  .then((response) => response.text())
  .then((data) => {
    const splitData = data.match(/.{1,2}/g) || [];
    const rejoinedData = splitData.join("");

    pico8_gpio = splitData;
    lastValue = rejoinedData;

    console.log("initial data fetched" + data);

    setInterval(() => {
      // if (!isHighscoreInitialized) return;
      if (typeof pico8_gpio !== "undefined") {
        const currentValue = pico8_gpio.join("");
        if (currentValue !== lastValue) {
          console.log("GPIO changed:", currentValue);
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
    }, 500);
  })
  .catch((error) => console.error("Error:", error));

console.log("GPIO watcher initialized");
