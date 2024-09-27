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
const MAX_DISPLAY_CHARS = 9;
const MAX_DISPLAY_CHARS_PLUS_NEG_SGN = MAX_DISPLAY_CHARS + 1;
const display = document.querySelector("#display");
const NUM_BTN_COLOR = "cadetblue";
const OP_BTN_COLOR = "coral";
const EQUAL_BTN_COLOR = "khaki";

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
    replaceDisplayContents("0");
    currentStep = CalcSteps.RESET;
    operand1 = null;
    operand2 = null;
    operator = null;
}

function performCalculation() {
    operand2 = display.textContent;
    replaceDisplayContents(operate(operand1, operand2, operator));
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
            replaceDisplayContents(num);
            currentStep = CalcSteps.ENTERING_FIRST_OPERAND;
            break;
        case CalcSteps.ENTERING_FIRST_OPERAND:
            addToDisplay(num);
            break;
        case CalcSteps.WAITING_FOR_SECOND_OPERAND:
            replaceDisplayContents(num);
            currentStep = CalcSteps.ENTERING_SECOND_OPERAND;
            break;
        case CalcSteps.ENTERING_SECOND_OPERAND:
            addToDisplay(num);
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

function toggleNegativeSign() {
    // Don't do anything if there is an error
    if (ERR === display.textContent) {
        return;
    }
    // Otherwise, toggle the negative sign
    else if ("-" === display.textContent.charAt(0)) {
        display.textContent = display.textContent.substring(1);
    }
    else {
        display.textContent = "-" + display.textContent;
    }
}

function stringIsTooLong(str) {
    // Ensure str is a string
    str = String(str);

    // Determine the maximum length
    const maxLength =  ("-" === str.charAt(0)) ?
                        MAX_DISPLAY_CHARS_PLUS_NEG_SGN :
                        MAX_DISPLAY_CHARS;
    
    return (str.length > maxLength);
}

function truncate(str) {
    // Ensure str is a string
    str = String(str);

    // Determine the maximum length
    const maxLength =  ("-" === str.charAt(0)) ?
                        MAX_DISPLAY_CHARS_PLUS_NEG_SGN :
                        MAX_DISPLAY_CHARS;

    // If the string is already short enough, just return it
    if (str.length <= maxLength) {
        return str;
    }
    // If the string doesn't contain a decimal point, we can't truncate it
    else if (!str.includes(".")) {
        return ERR;
    }
    // If there are too many digits to the left of the decimal point we can't
    // truncate it
    else if (str.indexOf(".") >= maxLength) {
        return ERR;
    }
    // Now str is longer than maxLength, has a decimal point, and can be 
    // truncated.
    // Lop off the least significant digits to fit maxLength
    else {
        str = str.slice(0, maxLength);

        // If the last character is a decimal point, lop that off too.
        if ("." === str.charAt(maxLength - 1)) {
            str = str.slice(0, maxLength - 1);
        }

        return str;
    }
}

function addToDisplay(str) {
    const tempStr = display.textContent + str;

    if (stringIsTooLong(tempStr)) {
        display.textContent = truncate(tempStr);
    }
    else {
        display.textContent = tempStr;
    }
}

function replaceDisplayContents(str) {
    if (stringIsTooLong(str)) {
        display.textContent = truncate(str);
    }
    else {
        display.textContent = str;
    }
}

function assignEventListenersToButtons() {
    // Here we are taking advantage of event bubbling to reduce the number of
    // event listeners, which should improve performance.
    const buttons = document.querySelector("#buttons");

    // Blink the buttons grey while they are being clicked
    buttons.addEventListener("mousedown", function(e) {
        if (e.target.id != "buttons") {
            e.target.style.backgroundColor = "gray";
        }
    });

    // Act on each button click, then return the button to its original color
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
                    addToDisplay(".");
                }
                break;
            case "plus-minus":
                toggleNegativeSign();
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
                    replaceDisplayContents("0");
                }
                else {
                    replaceDisplayContents(display.textContent.slice(0, 
                        display.textContent.length - 1));
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
                    replaceDisplayContents(0);
                }
                break;
            default:
                console.log("Unhandled click event.");
                console.log(e);
                break;            
        }

        // Change the button colors back
        if ((e.target.className).includes("number")) {
            e.target.style.backgroundColor = NUM_BTN_COLOR;
        }
        else if ((e.target.className).includes("operation")) {
            e.target.style.backgroundColor = OP_BTN_COLOR;
        }
        else if ((e.target.className).includes("equals")) {
            e.target.style.backgroundColor = EQUAL_BTN_COLOR;
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
  