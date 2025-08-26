let currentInput = "";

// Append numbers
function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

// Append operators
function appendOperator(operator) {
    if (currentInput === "") return; 
    const lastChar = currentInput.slice(-1);
    if ("+-*/".includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + operator;
    } else {
        currentInput += operator;
    }
    updateDisplay();
}

// Clear
function clearResult() {
    currentInput = "";
    updateDisplay();
}

// Calculate
function calculateResult() {
    try {
        const sanitizedInput = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
        const result = eval(sanitizedInput);
        currentInput = result.toString();
        updateDisplay();
    } catch {
        currentInput = "Error";
        updateDisplay();
        currentInput = "";
    }
}

// Percentage (works like real calculator)
function appendPercentage() {
    if (currentInput === "") return;

    // Match the last number
    const match = currentInput.match(/(\d+\.?\d*)$/);
    if (!match) return;

    const number = parseFloat(match[0]);

    // Find operator before this number
    const operatorMatch = currentInput.slice(0, -match[0].length).match(/(\d+\.?\d*)\s*([\+\-\*\/])\s*$/);
    let base = operatorMatch ? parseFloat(operatorMatch[1]) : number;

    // Calculate percentage relative to base
    const percentValue = (base * number) / 100;

    // Replace last number with its percentage
    currentInput = currentInput.slice(0, -match[0].length) + percentValue;
    updateDisplay();
}

// Update display
function updateDisplay() {
    document.getElementById("result").value = currentInput || "0";
}
