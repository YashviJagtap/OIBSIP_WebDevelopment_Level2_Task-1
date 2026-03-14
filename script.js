const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let previousValue = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('number')) {
      if (currentInput === '0' && value !== '.') currentInput = value;
      else currentInput += value;
      display.textContent = currentInput;
    }

    if (button.classList.contains('operator')) {
      if (currentInput === '' && previousValue !== '') operator = value;
      else {
        if (previousValue !== '') {
          previousValue = calculate(previousValue, currentInput, operator);
        } else {
          previousValue = currentInput;
        }
        operator = value;
        currentInput = '';
        display.textContent = previousValue;
      }
    }

    if (button.id === 'equal') {
      if (previousValue && operator && currentInput) {
        currentInput = calculate(previousValue, currentInput, operator);
        display.textContent = currentInput;
        previousValue = '';
        operator = '';
      }
    }

    if (button.id === 'clear') {
      currentInput = '';
      previousValue = '';
      operator = '';
      display.textContent = '0';
    }
  });
});

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch(op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error';
    default: return b;
  }
}