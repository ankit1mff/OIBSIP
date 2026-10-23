const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = "";

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            currentInput = "";
            display.value = "";
            return;
        }

        if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
            return;
        }
        if (value === '=') {
            try {
                if (currentInput.includes('/0')) {
                    display.value = "Error: Division by zero";
                    currentInput = "";
                    return;
                }
                let result = Function('return ' + currentInput)();
                display.value = result;
                currentInput = result.toString();
            } catch (error) {
                display.value = "Error";
                currentInput = "";
            }
            return;
        }
        currentInput += value;
        display.value = currentInput;
    });
});