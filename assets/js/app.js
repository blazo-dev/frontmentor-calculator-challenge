import { $, removeComasFromNumber, formatNumber } from "./helpers.js";

(() => {
  const keys = $(".calculator-key");
  const display = $("#calculator-display");
  const themeSwitch = $("#theme-switch");

  let operator = "";
  let firstNumber = "";
  let secondNumber = "";

  themeSwitch.addEventListener("input", (e) => changeTheme(e.target.value));

  keys.forEach((key) => {
    if (key.attributes["data-number"] || key.id === "point") {
      key.addEventListener("click", addNumberToDisplay);
    }

    if (key.attributes["data-operator"]) {
      key.addEventListener("click", getOperator);
    }

    if (key.id === "equal") {
      key.addEventListener("click", calculateOperationResult);
    }

    if (key.id === "clear") {
      key.addEventListener("click", clearCalculator);
    }

    if (key.id === "del") {
      key.addEventListener("click", removeOneNumber);
    }
  });

  function addNumberToDisplay(event) {
    const key = event.target;

    if (display.textContent === "0" && key.id !== "point") {
      display.textContent = key.id;
      return;
    }

    if (key.id === "point" && !display.textContent.includes(".")) {
      display.textContent += ".";
      return;
    }

    if (key.id !== "point") {
      const numberToDisplay = Number(
        display.textContent.split(",").join("") + key.id
      );
      display.textContent = formatNumber(numberToDisplay);
    }
  }

  function getOperator(event) {
    const key = event.target;
    firstNumber = removeComasFromNumber(display.textContent);

    if (key.id === "plus") {
      operator = "+";
    }

    if (key.id === "minus") {
      operator = "-";
    }

    if (key.id === "divide") {
      operator = "/";
    }

    if (key.id === "times") {
      operator = "*";
    }

    display.textContent = "0";
  }

  function calculateOperationResult() {
    let result = 0;

    secondNumber = removeComasFromNumber(display.textContent);

    if (operator === "+") {
      result = Number(firstNumber) + Number(secondNumber);
    }
    if (operator === "-") {
      result = Number(firstNumber) - Number(secondNumber);
    }
    if (operator === "*") {
      result = Number(firstNumber) * Number(secondNumber);
    }
    if (operator === "/") {
      result = Number(firstNumber) / Number(secondNumber);
    }

    display.textContent = formatNumber(result);
  }

  function clearCalculator() {
    display.textContent = "0";
    operator = "";
    firstNumber = "";
    secondNumber = "";
  }

  function removeOneNumber() {
    if (display.textContent.length === 1) {
      display.textContent = "0";
      return;
    }

    const numberToDisplay = Number(
      removeComasFromNumber(display.textContent.slice(0, -1))
    );

    display.textContent = formatNumber(numberToDisplay);
  }

  function changeTheme(themeNumber) {
    document.documentElement.setAttribute("data-theme", themeNumber);
  }
})();
