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
            result = divide(op1,op2);
            break;
        default:
            result = "wot tha fuck you doing mate";
    }
    return result;
}

let startNewNumber = true;
let lhs = null;
let rhs = null;
let operator = null;

const display = document.querySelector('.display');

function evaluate(button){
    startNewNumber = true;

    if (lhs === null){ //need left side
        lhs = +display.innerText;
    }
    else{ //don't need left side
        if (rhs === null){ //need right side
            rhs = +display.innerText;
        }
    }
    
    if (operator !== null){ //save result so far
        lhs = operate(operator, lhs, rhs);
        rhs = null;
    }
    display.innerText = lhs;
    operator = button.innerText;
    console.log(`lhs=${lhs}\top=${operator}\trhs=${rhs}`);
}

function equals(){
    if (lhs === null) return;
    if (rhs === null){
        if (display.innerText !== ''){
            rhs = +display.innerText;
        }
    }
    lhs = operate(operator, lhs, rhs);
    display.innerText = lhs;
    console.log(`lhs=${lhs}\top=${operator}\trhs=${rhs}`);
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
    lhs = null;
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





