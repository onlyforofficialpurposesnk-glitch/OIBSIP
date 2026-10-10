const input = document.getElementById("temp-input");
const unitSelect = document.getElementById("unit-select");
const button = document.getElementById("convert-btn");
const errorMsg = document.getElementById("error-msg");
const outC = document.getElementById("out-c");
const outF = document.getElementById("out-f");
const outK = document.getElementById("out-k");

function showError(message) {
  errorMsg.textContent = message;
  input.classList.add("invalid");
  outC.textContent = "-";
  outF.textContent = "-";
  outK.textContent = "-";
}

function clearError() {
  errorMsg.textContent = "";
  input.classList.remove("invalid");
}

function convert() {
  clearError();

  const text = input.value.trim();

  if (text === "") {
    showError("Please enter a temperature.");
    return;
  }

  const value = Number(text);

  if (isNaN(value)) {
    showError("That doesn't look like a number. Please enter digits only, like 25 or -4.5.");
    return;
  }

  const unit = unitSelect.value;
  let celsius;

  if (unit === "C") {
    celsius = value;
  } else if (unit === "F") {
    celsius = (value - 32) * 5 / 9;
  } else {
    celsius = value - 273.15;
  }

  if (celsius < -273.15) {
    showError("That's below absolute zero (-273.15°C), which isn't possible. Try a higher value.");
    return;
  }

  const fahrenheit = celsius * 9 / 5 + 32;
  const kelvin = celsius + 273.15;

  outC.textContent = celsius.toFixed(2) + " °C";
  outF.textContent = fahrenheit.toFixed(2) + " °F";
  outK.textContent = kelvin.toFixed(2) + " K";
}

button.addEventListener("click", convert);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    convert();
  }
});

input.addEventListener("input", function () {
  const text = input.value.trim();
  if (text !== "" && isNaN(Number(text))) {
    errorMsg.textContent = "Numbers only, please.";
    input.classList.add("invalid");
  } else {
    clearError();
  }
});