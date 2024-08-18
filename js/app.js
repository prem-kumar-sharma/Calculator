const screen = document.getElementById('calculator-screen');
let currentInput = '0';
let previousInput = '';
let operator = '';
let operatorPressed = false;

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (value === 'AC') {
            currentInput = '0';
            previousInput = '';
            operator = '';
            operatorPressed = false;
        } else if (value === 'DE') {
            currentInput = currentInput.slice(0, -1) || '0';
        } else if (['/', 'x', '-', '+'].includes(value)) {
            if (operatorPressed) {
                operator = value;  // Change the operator without resetting inputs
            } else if (currentInput !== '0') {
                if (operator && previousInput) {
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                operator = value;
                previousInput = currentInput;
                operatorPressed = true;
            }
        } else if (value === '=') {
            if (operator && previousInput) {
                currentInput = calculate(previousInput, currentInput, operator);
                operator = '';
                previousInput = '';
            }
            operatorPressed = false;
        } else {
            if (operatorPressed) {
                currentInput = value;
                operatorPressed = false;
            } else {
                currentInput = currentInput === '0' ? value : currentInput + value;
            }
        }

        screen.innerText = currentInput;
    });
});

function calculate(a, b, op) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (op) {
        case '/': return (num1 / num2).toString();
        case 'x': return (num1 * num2).toString();
        case '-': return (num1 - num2).toString();
        case '+': return (num1 + num2).toString();
        default: return '0';
    }
}
