/******************************************************************************
 * Enums
 *****************************************************************************/
const Operations = Object.freeze({
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
});

const CalcSteps = Object.freeze({
    ENTER_FIRST_NUMBER: 0,
    ENTER_SECOND_NUMBER: 1,
    ANSWER: 2,
});
/*****************************************************************************/

/******************************************************************************
 * Global Variables
 *****************************************************************************/
const ERR = "Err";

const display = document.querySelector("#display");

let currentStep = CalcSteps.ENTER_FIRST_NUMBER;
let operand1 = null;
let operand2 = null;
let operator = null;
/*****************************************************************************/

/******************************************************************************
 * Functions
 *****************************************************************************/
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
    if (0 === b) {
        return ERR;
    }
    return a / b;
}

function operate(op1, op2, operator) {
    const op1Number = parseFloat(op1);
    const op2Number = parseFloat(op2);

    if ((!isNaN(op1Number)) && 
        (!isNaN(op2Number)) &&
        (Operations[operator])) {
        return Operations[operator](op1Number, op2Number);
    }
    else {
        return ERR;
    }
}

function resetCalculator() {
    display.textContent = "0";
    currentStep = CalcSteps.ENTER_FIRST_NUMBER;
    operand1 = null;
    operand2 = null;
    operator = null;
}

function performCalculation() {
    operand2 = display.textContent;
    display.textContent = operate(operand1, operand2, operator);
    operand1 = (ERR === display.textContent) ? null : display.textContent;
    currentStep = CalcSteps.ANSWER;
}

function registerOperation(op) {
    if (CalcSteps.ENTER_FIRST_NUMBER === currentStep) {
        operand1 = display.textContent;
        operator = op;
        display.textContent = "0";
        currentStep = CalcSteps.ENTER_SECOND_NUMBER;
    }
    else if (CalcSteps.ENTER_SECOND_NUMBER === currentStep) {
        performCalculation();
        operand2 = null;
        operator = op;
    }
    else if (CalcSteps.ANSWER === currentStep) {
        operand1 = display.textContent;
        operand2 = null;
        operator = op;
        display.textContent = "0";
        currentStep = CalcSteps.ENTER_SECOND_NUMBER;
    }
}

function assignEventListenersToButtons() {// Assign event listeners to the buttons
    // Here we are taking advantage of event bubbling to reduce the number of
    // event listeners, which should improve performance.
    const buttons = document.querySelector("#buttons");
    buttons.addEventListener("click", function(e) {
        // When the buttons div gets a click event, check which target was clicked
        switch (e.target.id) {
            case "one":     // Intentional fall-through
            case "two":     // Intentional fall-through
            case "three":   // Intentional fall-through
            case "four":    // Intentional fall-through
            case "five":    // Intentional fall-through
            case "six":     // Intentional fall-through
            case "seven":   // Intentional fall-through
            case "eight":   // Intentional fall-through
            case "nine":    // Intentional fall-through
            case "zero":
                if ("0" === display.textContent) {
                    // Replace the 0 if that's the only character
                    display.textContent = e.target.textContent;
                }
                else if ("-0" === display.textContent) {
                    // Drop the zero and append this number to the display
                    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
                    display.textContent += e.target.textContent;
                }
                else {
                    // Otherwise, append this number to the display
                    display.textContent += e.target.textContent;
                }
                break;
            case "decimal":
                if (!display.textContent.includes(".")) {
                    display.textContent += e.target.textContent;
                }
                break;
            case "plus-minus":
                if ("-" === display.textContent.charAt(0)) {
                    display.textContent = display.textContent.substring(1);
                }
                else {
                    display.textContent = "-" + display.textContent;
                }
                break;
            case "add":
                registerOperation("+");
                break;
            case "subtract":
                registerOperation("-");
                break;
            case "multiply":
                registerOperation("*");
                break;
            case "divide":
                registerOperation("/");
                break;
            case "equals":
                performCalculation();
                break;
            case "backspace":
                if (1 === display.textContent.length) {
                    display.textContent = "0";
                }
                else {
                    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
                }
                break;
            case "clear":
                resetCalculator();
                break;
            case "clear-entry":
                if (CalcSteps.ANSWER === currentStep) {
                    resetCalculator();
                }
                else {
                    display.textContent = 0;
                }
                break;
            default:
                console.log("Unhandled click event.");
                console.log(e);
                break;            
        }
    
        console.log("----------------------");
        console.log(`cal step: ${currentStep}`);
        console.log(`first num: ${operand1}`);
        console.log(`second num: ${operand2}`);
        console.log(`operator: ${operator}`);
    });
}
/*****************************************************************************/

/******************************************************************************
 * Main Script
 *****************************************************************************/
resetCalculator();
assignEventListenersToButtons();
/*****************************************************************************/

/******************************************************************************
 * Exports
 *****************************************************************************/
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operate,
  };
  /*****************************************************************************/
  