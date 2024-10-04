const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '';
        } else if (value === '=') {
            if (currentInput && previousInput && operator) {
                const result = calculate(previousInput, currentInput, operator);
                display.value = result;
                previousInput = result;
                currentInput = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                if (previousInput) {
                    const result = calculate(previousInput, currentInput, operator);
                    display.value = result;
                    previousInput = result;
                } else {
                    previousInput = currentInput;
                }
                operator = value;
                currentInput = '';
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

function calculate(prev, curr, operator) {
    prev = parseFloat(prev);
    curr = parseFloat(curr);

    switch (operator) {
        case '+':
            return prev + curr;
        case '-':
            return prev - curr;
        case '*':
            return prev * curr;
        case '/':
            return curr !== 0 ? prev / curr : 'Error';
        default:
            return curr;
    }
}
