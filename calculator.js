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
    let result = 0;
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
            result = (op2 === 0) ? "Nice try..." : divide(op1,op2);
//            result = divide(op1,op2);
            break;
        default:
            result = "wot tha fuck you doing mate";
    }
    return result;
}

let startNewNumber = true;
let newInput = false;
let runningTotal = null;
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
    startNewNumber = true;

}

function equals(){

}

function addDigits(button){
    if (startNewNumber){
        display.innerText = button.innerText;
        startNewNumber = false;
    }
    else {
        display.innerText += button.innerText;
    }
}

function clearDisplay(){
    display.innerText = '';
    runningTotal = null;
    rhs = null;
    operator = null;
    startNewNumber = true;
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





