const inputElement = document.querySelector("#input-disp");
const resultElement = document.querySelector("#result-disp");

function addInput(newValue) {
  inputElement.value += newValue;
}

function clearInput() {
  inputElement.value = inputElement.value.slice(0, -1);
}

function clearDisplay() {
  inputElement.value = "";
  resultElement.value = "";
}

function calculate() {
  try {
    resultElement.value = eval(inputElement.value);
  } catch (error) {
    resultElement.value = "Error";
  }
}
