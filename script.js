let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let displayValue = "0";
const display = document.getElementById("display");
const decimalButton = document.querySelector(".btn:nth-child(12)"); // Get the decimal button

function appendToDisplay(value) {
  if (value === "." && displayValue.includes(".")) {
    return; // Prevent adding more than one decimal point
  }
  if (displayValue === "0" && value !== ".") {
    displayValue = value;
  } else {
    displayValue += value;
  }
  updateDisplay();
  checkDecimal();
}

function setOperator(operator) {
  if (currentOperator && secondNumber !== null) {
    calculateResult();
  }
  firstNumber = parseFloat(displayValue);
  currentOperator = operator;
  displayValue = "0";
  updateDisplay();
}

function calculateResult() {
  if (currentOperator === null) return;

  secondNumber = parseFloat(displayValue);
  let result;

  switch (currentOperator) {
    case "+":
      result = add(firstNumber, secondNumber);
      break;
    case "-":
      result = subtract(firstNumber, secondNumber);
      break;
    case "*":
      result = multiply(firstNumber, secondNumber);
      break;
    case "/":
      result = divide(firstNumber, secondNumber);
      break;
  }

  if (result === "Error") {
    displayValue = "Cannot divide by 0!";
  } else {
    displayValue = result.toString();
  }

  firstNumber = result;
  secondNumber = null;
  currentOperator = null;
  updateDisplay();
}

function clearDisplay() {
  displayValue = "0";
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  updateDisplay();
}

function backspace() {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = "0";
  }
  updateDisplay();
  checkDecimal();
}

function checkDecimal() {
  decimalButton.disabled = displayValue.includes(".");
}

function updateDisplay() {
  display.value = displayValue;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  return parseFloat((a / b).toFixed(5)); // Rounding to 5 decimals
}

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    appendToDisplay(key);
  } else if (key === ".") {
    appendToDisplay(".");
  } else if (["+", "-", "*", "/"].includes(key)) {
    setOperator(key);
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
