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
        case '*':
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

const display = document.querySelector('.display');
function addDigits(button){
    if (display.innerText === '0'){
        display.innerText = button.innerText;
    }
    else if (+display.innerText === +display.innerText){
        //if it's a number.. append
        display.innerText += button.innerText;
    }
    else{
        display.innerText = '0';
    }
}
const digitButtons = document.querySelectorAll('button.digit');
digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        addDigits(button);
    });
});

const clearButton = document.querySelector('#clear');
function clearDisplay(){
    display.innerText = '0';
}
clearButton.addEventListener('click', () => {
    clearDisplay();
});