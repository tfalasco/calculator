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
    RESET: 0,
    ENTERING_FIRST_OPERAND: 1,
    WAITING_FOR_SECOND_OPERAND: 2,
    ENTERING_SECOND_OPERAND: 3,
    VIEWING_ANSWER: 4,
});
/*****************************************************************************/

/******************************************************************************
 * Global Variables
 *****************************************************************************/
const ERR = "Err";

const display = document.querySelector("#display");

let currentStep = CalcSteps.ENTERING_FIRST_OPERAND;
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
    currentStep = CalcSteps.RESET;
    operand1 = null;
    operand2 = null;
    operator = null;
}

function performCalculation() {
    operand2 = display.textContent;
    display.textContent = operate(operand1, operand2, operator);
    operand1 = (ERR === display.textContent) ? null : display.textContent;
    currentStep = CalcSteps.VIEWING_ANSWER;
}

function registerOperation(op) {
    switch (currentStep) {
        case CalcSteps.RESET:
            operand1 = "0";
            operator = op;
            currentStep = CalcSteps.WAITING_FOR_SECOND_OPERAND;
            break;
        case CalcSteps.ENTERING_FIRST_OPERAND:
            operand1 = display.textContent;
            operator = op;
            currentStep = CalcSteps.WAITING_FOR_SECOND_OPERAND;
            break;
        case CalcSteps.WAITING_FOR_SECOND_OPERAND:
            operator = op;
            break;
        case CalcSteps.ENTERING_SECOND_OPERAND:
            performCalculation();
            operand2 = null;
            operator = op;
            currentStep = CalcSteps.WAITING_FOR_SECOND_OPERAND;
            break;
        case CalcSteps.VIEWING_ANSWER:
            operand1 = display.textContent;
            operand2 = null;
            operator = op;
            currentStep = CalcSteps.WAITING_FOR_SECOND_OPERAND;
            break;
        default:
            break;
    }
}

function enterNumber(num) {
    switch (currentStep) {
        case CalcSteps.RESET:
            display.textContent = num;
            currentStep = CalcSteps.ENTERING_FIRST_OPERAND;
            break;
        case CalcSteps.ENTERING_FIRST_OPERAND:
            display.textContent += num;
            break;
        case CalcSteps.WAITING_FOR_SECOND_OPERAND:
            display.textContent = num;
            currentStep = CalcSteps.ENTERING_SECOND_OPERAND;
            break;
        case CalcSteps.ENTERING_SECOND_OPERAND:
            display.textContent += num;
            break;
        case CalcSteps.VIEWING_ANSWER:
            resetCalculator();
            enterNumber(num);
            break;
        default:
            console.log("Calculator is in invalid state.");
            console.log(`Current CalcStep: ${currentStep}`);
            break;
    }
}

function assignEventListenersToButtons() {
    // Here we are taking advantage of event bubbling to reduce the number of
    // event listeners, which should improve performance.
    const buttons = document.querySelector("#buttons");
    buttons.addEventListener("click", function(e) {
        // When the buttons div gets a click event, check which target was 
        // clicked
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
                enterNumber(e.target.textContent);
                break;
            case "decimal":
                if (!display.textContent.includes(".")) {
                    display.textContent += ".";
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
                    display.textContent = display.textContent.slice(0, 
                        display.textContent.length - 1);
                }
                break;
            case "clear":
                resetCalculator();
                break;
            case "clear-entry":
                if (CalcSteps.VIEWING_ANSWER === currentStep) {
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
        console.log(`clicked: ${e.target.textContent}`);
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
  