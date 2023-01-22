/* eslint-disable no-console */
/* eslint-disable no-undef */
function add(op1, op2) {
  return +op1 + +op2;
}
function subtract(op1, op2) {
  return +op1 - +op2;
}
function multiply(op1, op2) {
  return +op1 * +op2;
}
function divide(op1, op2) {
  return +op1 / +op2;
}
const decimalPlaces = 9;
function roundedResults(lhs) {
  if (Math.round(+lhs * 10) / 10 === +lhs || typeof lhs !== 'number') {
    return lhs;
  }
  return lhs.toFixed(decimalPlaces);
}

function operate(op, op1, op2) {
  let result;
  switch (op) {
    case '+':
      result = add(op1, op2);
      break;
    case '-':
      result = subtract(op1, op2);
      break;
    case '*':
      result = multiply(op1, op2);
      break;
    case '/':
      result = op2 === 0 ? '[REDACTED]' : divide(op1, op2);
      break;
    default:
      result = '';
  }
  result = roundedResults(result);
  return result;
}

let startNewNumber = false;
let haveNewInput = false;
let stored = null;
let operand = null;
let operator = null;

const display = document.querySelector('.display');

function addDigits(button) {
  if (display.innerText.length >= 22) return;
  haveNewInput = true;
  if (startNewNumber) {
    display.innerText = button.innerText;
    startNewNumber = false;
  } else {
    display.innerText += button.innerText;
  }
}

function addDecimal() {
  if (display.innerText.indexOf('.') === -1) {
    display.innerText += '.';
  }
}

function evaluate(button) {
  console.log(`${stored} ${operator} 
  ${operand}`);
  startNewNumber = true;
  if (haveNewInput) {
    if (stored === null) {
      stored = +display.innerText;
    } else {
      operand = +display.innerText;
      stored = operate(operator, stored, operand);
      operand = null;
    }
    haveNewInput = false;
  }
  operator = button.innerText;
  display.innerText = stored.length > 22 ? 'Toooo Big!' : stored;

  console.log(`${stored} ${operator} ${operand}`);
  console.log('\n');
}

function negate() {
  console.log('urrrrhhh');
  display.innerText = -1 * +display.innerText;
}

function equals() {
  startNewNumber = true;
  if (haveNewInput) {
    operand = +display.innerText;
    stored = operate(operator, stored, operand);
    haveNewInput = false;
  } else {
    stored = operate(operator, stored, operand);
  }
  display.innerText = stored.length > 22 ? 'Toooo Big!' : stored;

  console.log(`${stored} ${operator} ${operand}`);
  console.log('\n');
}

function backspace() {
  if (display.innerText !== '') {
    display.innerText = display.innerText.substring(
      0,
      display.innerText.length - 1,
    );
  }
}

function clearDisplay() {
  display.innerText = '';
  stored = null;
  operand = null;
  operator = null;
  startNewNumber = false;
  haveNewInput = false;
}

const digitButtons = document.querySelectorAll('button.digit');
digitButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addDigits(button);
  });
});

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
  addDecimal();
});

const operatorButtons = document.querySelectorAll('button.operator');
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    evaluate(button);
  });
});

const negateButton = document.querySelector('#negate');
negateButton.addEventListener('click', () => {
  negate();
});

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', () => {
  equals();
});

const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', () => {
  backspace();
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
  clearDisplay();
});

document.addEventListener('keydown', (event) => {
  console.log(event);
  digitButtons.forEach((button) => {
    if (event.key === button.innerText) {
      addDigits(button);
    }
  });

  if (event.key === '.') addDecimal();

  operatorButtons.forEach((button) => {
    if (event.key === button.innerText) {
      evaluate(button);
    }
  });

  if (event.key === '=') equals();

  if (event.key === 'Backspace') backspace();

  if (event.key === 'c') clearDisplay();
});
