function add(op1, op2){
    return +op1 + +op2;
}
function subtract(op1, op2){
    return +op1 - +op2;
}
function multiply(op1, op2){
    return +op1 * +op2;
}
function divide(op1, op2){
    return +op1 / +op2;
}

function operate(op, op1, op2){
    let result;
    switch (op){
        case '+':
            result = add(op1,op2);
            break;
        case '-':
            result = subtract(op1,op2);
            break;
        case 'x':
            result = multiply(op1,op2);
            break;
        case '/':
            result = (op2 === 0) ? "[REDACTED]" : divide(op1,op2);
//            result = divide(op1,op2);
            break;
        default:
            result = "";
    }
    result = roundedResults(result);
    return result;
}

let startNewNumber = false;
let haveNewInput = false; //redundant?
let stored = null;
let operand = null;
let operator = null;
let decimalPlaces = 10;

const display = document.querySelector('.display');

function roundedResults(lhs){
    if (Math.round(+lhs * 10) / 10 === +lhs || typeof lhs != "number"){
        return lhs;
    }
    return lhs.toFixed(decimalPlaces);
}

function evaluate(button){
    console.log(`${stored} ${operator} ${operand}`);
    startNewNumber = true;
    if (haveNewInput){
        if (stored === null){
            stored = +display.innerText;
        }
        else{
            operand = +display.innerText;
            stored = operate(operator, stored, operand);
            operand = null;
        }
        haveNewInput = false;
    }
    operator = button.innerText;
    display.innerText = stored;

    console.log(`${stored} ${operator} ${operand}`);
    console.log('\n');
}

function equals(){
    startNewNumber = true;
    if (haveNewInput){
        operand = +display.innerText;
        stored = operate(operator, stored, operand);
        haveNewInput = false;
    }
    else{
        stored = operate(operator, stored, operand);
    }
    display.innerText = stored;
    console.log(`${stored} ${operator} ${operand}`);
    console.log('\n');
}

function addDigits(button){
    if (startNewNumber){
        display.innerText = button.innerText;
        startNewNumber = false;
    }
    else {
        display.innerText += button.innerText;
    }
    haveNewInput = true;
}

function clearDisplay(){
    display.innerText = '';
    stored = null;
    operand = null;
    operator = null;
    haveNewInput = false;
}

const operatorButtons = document.querySelectorAll('button.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        evaluate(button);
    })
});

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', () => {
    equals();
});

const digitButtons = document.querySelectorAll('button.digit');
digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        addDigits(button);
    });
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    clearDisplay();
});





