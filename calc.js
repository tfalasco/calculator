/******************************************************************************
 * Global Variables
 *****************************************************************************/
const ERR = "Err";
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
    let func;
    switch (operator) {
        case '+':
            func = add;
            break;
        case '-':
            func = subtract;
            break;
        case '*':
            func = multiply;
            break;
        case '/':
            func = divide;
            break;
        default:
            func = undefined;
    }

    if (undefined === func) {
        return ERR;
    }
    else {
        return func(op1, op2);
    }
}
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
  