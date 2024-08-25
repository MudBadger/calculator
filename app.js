let firstNumber;
let secondNumber;
let total;
let number;
let operator;
let isOperatorClicked = false;
let firstArr = [];
let secondArr = [];
let numberKeys = document.querySelectorAll(".numberBtn");
let operatorKeys = document.querySelectorAll(".operatorBtn");

numberKeys.forEach((key) => {
    key.addEventListener("click", (e) => {
        number = e.target.dataset.number;
        calculate(operator, isOperatorClicked, number);
    });
});

operatorKeys.forEach((key) => {
    key.addEventListener("click", (e) => {
        let currentOperator = e.target.dataset.operator;
        let isClicked = true;
        getOperator(currentOperator, isClicked);
    });
});

function getNumber(number, isOperatorClicked) {
    if (!isOperatorClicked) {
        firstArr.push(number);
        firstNumber = parseFloat(
            firstArr.reduce((accum, digit) => accum + digit)
        );
        return firstNumber;
    } else if (isOperatorClicked) {
        secondArr.push(number);
        secondNumber = parseFloat(
            secondArr.reduce((accum, digit) => accum + digit)
        );
        return secondNumber;
    }
}

function getOperator(currentOperator, isClicked) {
    operator = currentOperator;
    isOperatorClicked = isClicked;
    return operator, isOperatorClicked;
}
function calculate(operator, isOperatorClicked, number) {
    getNumber(number, isOperatorClicked);
    console.log(operator, firstNumber, secondNumber);
    if (operator && firstNumber && secondNumber) {
        total = operate(operator, firstNumber, secondNumber);
        console.log(total);
    }
}
function operate(operator, firstNumber, secondNumber) {
    const operators = {
        "add": add(firstNumber, secondNumber),
        "substract": subtract(firstNumber, secondNumber),
        "multiply": multiply(firstNumber, secondNumber),
        "divide": divide(firstNumber, secondNumber),
    };

    return operators[operator];
}

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}
function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}
function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}
function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}
