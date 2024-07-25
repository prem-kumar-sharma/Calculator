new Vue({
    el: '#app',
    data: {
        currentInput: '0',
        operator: null,
        previousInput: null,
    },
    methods: {
        appendNumber(number) {
            if (this.currentInput === '0') {
                this.currentInput = String(number);
            } else {
                this.currentInput += String(number);
            }
        },
        appendDot() {
            if (!this.currentInput.includes('.')) {
                this.currentInput += '.';
            }
        },
        appendOperator(operator) {
            if (this.currentInput !== '0') {
                this.operator = operator;
                this.previousInput = this.currentInput;
                this.currentInput = '';
            }
        },
        clearInput() {
            this.currentInput = '0';
            this.operator = null;
            this.previousInput = null;
        },
        deleteLast() {
            this.currentInput = this.currentInput.slice(0, -1) || '0';
        },
        calculateResult() {
            let result;
            const prev = parseFloat(this.previousInput);
            const current = parseFloat(this.currentInput);

            if (isNaN(prev) || isNaN(current)) return;

            switch (this.operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    result = prev / current;
                    break;
                default:
                    return;
            }

            this.currentInput = String(result);
            this.operator = null;
            this.previousInput = null;
        }
    }
});
