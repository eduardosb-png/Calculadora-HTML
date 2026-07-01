const previousOperandEl = document.getElementById('previous-operand');
const currentOperandEl = document.getElementById('current-operand');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function updateDisplay(){
    currentOperandEl.textContent = currentOperand;
    previousOperandEl.textContent = operation
    ? `${previousOperand} ${operation}`
    : previousOperand;
}

function appendNumber(number){
    if(number === '.' && currentOperand.includes('.')) return;
    if(currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
}

function chooseOperation(op){
    if(currentOperand === '') return;
    if(previousOperand !== ''){
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let result;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(curr)) return;

    switch(operation){
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'x':
            result = prev * curr;
            break;
        case '÷':
            result = curr === 0 ? 'Erro' : prev / curr;
            break;
        default: 
            return;    
    }

currentOperand = typeof result === 'number'
    ? roundResult(result).toString() : result;
    operation = undefined;
    previousOperand = '';
}

function roundResult(number){
    return Math.round((number + Number.EPSILON) * 1e10) / 1e10;
}

function clearAll(){
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
}

function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
    if(currentOperand === '') currentOperand = '0';
}

function percent() {
    currentOperand = (parseFloat(currentOperand) / 100).toString();
}

document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.number);
        updateDisplay();
    });
});

document.querySelectorAll('[data-operator]').forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.dataset.operator);
        updateDisplay();
    });
});

document.querySelector('[data-action="equals"]').addEventListener('click', () => {
    compute();
    updateDisplay();
});

document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    clearAll();
    updateDisplay();
});

document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    deleteLast();
    updateDisplay();
});

document.querySelector('[data-action="percent"]').addEventListener('click', () => {
    percent();
    updateDisplay();
});

window.addEventListener('keydown', (e) => {
    if(e.key >= '0' && e.key <= '9'){ appendNumber(e.key); updateDisplay();}
    if(e.key === '.') {appendNumber('.'); updateDisplay();}
    if(e.key === '+'){ chooseOperation('+'); updateDisplay();}
    if(e.key === '-'){ chooseOperation('-'); updateDisplay();}
    if(e.key === '*'){ chooseOperation('x'); updateDisplay();}
    if(e.key === '/'){ e.preventDefault(); chooseOperation('÷'); updateDisplay();}
    if(e.key === 'Enter' || e.key === '='){ compute(); updateDisplay();}
    if(e.key === 'Backspace'){ deleteLast(); updateDisplay();}
    if(e.key === 'Escape'){ clearAll(); updateDisplay();}  
    if(e.key === '%'){ percent(); updateDisplay();}
});
