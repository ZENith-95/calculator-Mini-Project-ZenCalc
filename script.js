const inputElement = document.querySelector("#input-disp");
const resultElement = document.querySelector("#result-disp");

// let currentInput = "";

function addInput(newValue) {
  // Prevent multiple leading zeros
  if (inputElement.value === "0" && newValue !== ".") {
    inputElement.value = newValue; // Replace leading zero with the new value
  } else {
    inputElement.value += newValue;
  }
  calculateRealTime();
}

function appendOperator(op) {
  const lastChar = inputElement.value.slice(-1);

  if (op === "%") {
    // Convert percentage to its decimal equivalent
    if (!isNaN(lastChar)) {
      inputElement.value += "/100"; // Append division for percentage
    } else {
      return; // Prevent invalid percentage usage
    }
  } else if ("+-*/".includes(lastChar) && "+-*/".includes(op)) {
    // Prevent consecutive operators
    inputElement.value = inputElement.value.slice(0, -1) + op;
  } else {
    inputElement.value += op;
  }
  calculateRealTime();
}

function clearInput() {
  inputElement.value = inputElement.value.slice(0, -1);
  calculateRealTime();
}

function clearDisplay() {
  inputElement.value = "";
  resultElement.value = "";
}

function calculate() {
  try {
    // Evaluate as an integer
    const evaluatedValue = parseInt(eval(inputElement.value)); // Convert result to integer
    if (!isFinite(evaluatedValue)) {
      throw new Error("Result is not finite");
    }
    resultElement.value = evaluatedValue;
  } catch (error) {
    resultElement.value = "Error"; // Display error for invalid expressions
  }
}

function calculateRealTime() {
  try {
    if (inputElement.value.trim() === "") {
      resultElement.value = ""; // Empty result if input is empty
      return;
    }
    // Real-time evaluation as integer
    const evaluatedValue = eval(inputElement.value);
    if (!isFinite(evaluatedValue)) {
      throw new Error("Result is not finite");
    }
    resultElement.value = evaluatedValue;
  } catch (error) {
    resultElement.value = "";
  }
}

inputElement.addEventListener("input", calculateRealTime);

document
  .querySelectorAll(".num")
  .forEach((button) =>
    button.addEventListener("click", (e) => addInput(e.target.value))
  );

document
  .querySelectorAll(".op")
  .forEach((button) =>
    button.addEventListener("click", (e) => appendOperator(e.target.value))
  );

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    addInput(parseInt(key));
  } else if (key === ".") {
    addInput(".");
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendOperator(key);
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace" || key === "Delete") {
    clearInput();
  }


   else if (key === "Escape" || key === "c" || key === 'C') {
    clearDisplay();
   }else if (key === '%'){
    appendOperator('%')
   }
});
