let currentOperation = '';
let currentNumber = '';
let operation = '';

function appendNumber(number) {
    currentNumber += number;
    updateDisplay(currentNumber);
}

function setOperation(op) {
    if (currentNumber === '') return;
    if (currentOperation !== '') {
        calculate();
    }
    operation = op;
    currentOperation = currentNumber + ' ' + op;
    currentNumber = '';
    updateDisplay(currentOperation);
}

function calculate() {
    if (currentNumber === '' || currentOperation === '') return;
    currentOperation += ' ' + currentNumber;
    try {
        if (currentOperation.includes('/ 0')) {
            updateDisplay('Error: Division by zero');
            currentOperation = '';
            currentNumber = '';
        } else {
            const result = eval(currentOperation);
            updateDisplay(result);
            currentOperation = '';
            currentNumber = '' + result;
        }
    } catch (e) {
        updateDisplay('Error');
        currentOperation = '';
        currentNumber = '';
    }
}

function clearDisplay() {
    currentOperation = '';
    currentNumber = '';
    updateDisplay('0');
}

function toggleSign() {
    if (currentNumber === '') return;
    currentNumber = (-parseFloat(currentNumber)).toString();
    updateDisplay(currentNumber);
}

function calculatePercentage() {
    if (currentNumber === '') return;
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    updateDisplay(currentNumber);
}

function updateDisplay(value) {
    document.getElementById('display').value = value;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        setOperation(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '%') {
        calculatePercentage();
    }
});

let memory = 0;

function memoryStore() {
    memory = parseFloat(currentNumber);
}

function memoryRecall() {
    currentNumber = memory.toString();
    updateDisplay(currentNumber);
}

function memoryClear() {
    memory = 0;
}

function calculateSquareRoot() {
    if (currentNumber === '') return;
    currentNumber = Math.sqrt(parseFloat(currentNumber)).toString();
    updateDisplay(currentNumber);
}

function calculateSquare() {
    if (currentNumber === '') return;
    currentNumber = Math.pow(parseFloat(currentNumber), 2).toString();
    updateDisplay(currentNumber);
}

let history = [];

function updateHistory(operation) {
    history.push(operation);
    
    // Limit the history to the last 5 operations (adjust the number as needed)
    if (history.length > 5) {
        history.shift();  // Remove the oldest entry if history exceeds the limit
    }

    const historyDisplay = document.getElementById('history');
    historyDisplay.innerHTML = history.join('<br>');
}

function calculate() {
    if (currentNumber === '' || currentOperation === '') return;
    currentOperation += ' ' + currentNumber;
    try {
        const result = eval(currentOperation);
        updateDisplay(result);
        updateHistory(currentOperation + ' = ' + result);  // Add this line
        currentOperation = '';
        currentNumber = '' + result;
    } catch (e) {
        updateDisplay('Error');
        currentOperation = '';
        currentNumber = '';
    }
}




