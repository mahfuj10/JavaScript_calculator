class Calculator {

    constructor(previousOperand, currentOperand, operationField, outputField) {
        this.currentOperandText = currentOperand;
        this.previousOperandText = previousOperand;
        this.operationField = operationField;
        this.outputField = outputField;
    }

    clear() {
        this.currentOperandText.innerText = '';
        this.previousOperandText.innerText = '';
        this.operationField.innerText = '';
        this.outputField.innerText = '';
    }

    delete() {

        const prevText = this.previousOperandText.innerText;
        const curText = this.currentOperandText.innerText;
        const operator = this.operationField.innerText;

        if (prevText !== '' && curText === '' && operator === '') {

            this.previousOperandText.innerText = this.previousOperandText.innerText.toString().slice(0, -1);

        }
        else if (prevText !== '' && operator !== '' && curText === '') {
            this.operationField.innerText = '';
        }
        else if (prevText !== '' && operator !== '' && curText !== '') {
            this.currentOperandText.innerText = this.currentOperandText.innerText.toString().slice(0, -1);
        }
        else if (this.outputField !== '') {
            this.outputField.innerText = this.outputField.innerText.toString().slice(0, -1);
        }

    }


    appendNumber(number) {

        if (number === '.' && this.previousOperandText.innerText.includes('.') && this.operationField.innerText == '') return;

        else if (number === '.' && this.currentOperandText.innerText.includes('.') && this.operationField.innerText !== '') return;

        this.typedNumber = `${this.currentOperandText.innerText + number}`;
        this.currentOperand = `${this.previousOperandText.innerText + number}`;
    }

    chooseOperation(operation) {
        if (this.previousOperandText.innerText === '') return;
        this.operationField.innerText = operation;
    }

    showOutput() {
        console.log(this.output);
        this.outputField.innerText = this.output;
        this.currentOperandText.innerText = '';
        this.previousOperandText.innerText = '';
        this.operationField.innerText = '';
    }

    computer() {

        const firstNum = parseFloat(this.currentOperandText.innerText);
        const secondNum = parseFloat(this.previousOperandText.innerText);

        if (this.operationField.innerText === '') return;

        switch (this.operationField.innerText) {
            case '+':
                this.output = firstNum + secondNum;
                this.showOutput();
                break;
            case '-':
                this.output = firstNum - secondNum;
                this.showOutput();
                break;
            case '÷':
                this.output = firstNum / secondNum;
                this.showOutput();
                break;
            case '*':
                this.output = firstNum * secondNum;
                this.showOutput();
                break;

            default:
                return;
        }


    }



    updateDisplay() {

        if (this.operationField.innerText === '') {
            this.previousOperandText.innerText = this.currentOperand;
        } else {
            this.currentOperandText.innerText = this.typedNumber;
        }

    }


}


const numbersButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const eqalButtons = document.querySelector('[data-eqals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('.previous-operand');
const currentOperand = document.querySelector('.current-operand');
const operationField = document.querySelector('.operation-field');
const outputField = document.querySelector('[data-output]');


const calculator = new Calculator(previousOperand, currentOperand, operationField, outputField);

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});



operationButtons.forEach(operation => {
    operation.classList.add('operationButtons');
    operation.addEventListener('click', () => {
        calculator.chooseOperation(operation.innerText);
    });
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
});

eqalButtons.addEventListener('click', () => {
    // alert("Hi, im eqals buttons")
    calculator.computer();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
});

