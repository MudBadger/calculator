let firstNumber = undefined;
let secondNumber = undefined;
let total;
let operator;
let isOperatorClicked = false;
let firstArr = [];
let secondArr = [];
let numberKeys = document.querySelectorAll(".numberBtn");
let operatorKeys = document.querySelectorAll(".operatorBtn");
let screen = document.querySelector(".screenContainer");
let clear = document.querySelector(".clearBtn");
let equal = document.querySelector(".equalBtn");
let decimal = document.querySelector(".decimalBtn");
let back = document.querySelector(".backBtn");

clear.addEventListener("click", (e) => {
    clearAndRestart();
    screen.innerHTML = "";
});

back.addEventListener("click", (e) => {
    goBack();
});

numberKeys.forEach((key) => {
    key.addEventListener("click", (e) => {
        if (total !== null) {
            clearAndRestart();
        }
        if (total) {
        }
        let number = e.target.dataset.number;
        calculate(operator, isOperatorClicked, number);
    });
});

operatorKeys.forEach((key) => {
    key.addEventListener("click", (e) => {
        let currentOperator = e.target.dataset.operator;
        if (total !== null) {
            firstNumber = total;
            secondArr = [];
            secondNumber = undefined;
            total = null;
        }
        let isClicked = true;
        getOperator(currentOperator, isClicked);
    });
});

equal.addEventListener("click", (e) => {
    if (operator === "/" && (secondNumber === 0 || firstNumber === 0)) {
        screen.innerHTML = "<p>Error: Division by 0</p>";
        return null;
    }
    if (operator && firstNumber !== undefined && secondNumber !== undefined) {
        operate(operator, firstNumber, secondNumber);
        setScreen(firstNumber, secondNumber, total, operator);
    }
});

function clearAndRestart() {
    return (
        (operator = ""),
        (firstArr = []),
        (secondArr = []),
        (firstNumber = undefined),
        (secondNumber = undefined),
        (total = null),
        (operator = ""),
        (isOperatorClicked = false)
    );
}

function goBack() {
    if (!operator && !secondNumber && firstNumber !== undefined) {
        let arr = Array.from(String(firstNumber), Number);
        if (arr.length <= 1) {
            clearAndRestart();
            setScreen(firstNumber, secondNumber, total, operator);
        } else if (arr.length >= 2) {
            arr.pop();
            firstNumber = parseFloat(arr.join("")) || 0;
            setScreen(firstNumber, secondNumber, total, operator);
        }
        return firstNumber;
    } else if (
        operator &&
        firstNumber !== undefined &&
        secondNumber !== undefined
    ) {
        let arr = Array.from(String(secondNumber), Number);
        if (arr.length <= 1) {
            secondNumber = undefined;
            secondArr = [];
            setScreen(firstNumber, secondNumber, total, operator);
        } else {
            arr.pop();
            secondNumber = parseFloat(arr.join("")) || 0;
            setScreen(firstNumber, secondNumber, total, operator);
        }
        return secondNumber;
    }
}
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

function setScreen(firstNumber, secondNumber, total, operator) {
    if (total !== undefined && total !== null) {
        screen.innerHTML =
            "<p class='innerText'>" +
            firstNumber +
            " " +
            operator +
            " " +
            secondNumber +
            " = " +
            total +
            "</p>";
    } else if (
        firstNumber !== undefined &&
        operator &&
        secondNumber !== undefined
    ) {
        screen.innerHTML =
            "<p class='innerText'>" +
            firstNumber +
            " " +
            operator +
            " " +
            secondNumber +
            "</p>";
    } else if (firstNumber !== undefined) {
        screen.innerHTML = "<p class='innerText'>" + firstNumber + "</p>";
    } else {
        screen.innerHTML = "";
    }
}

function operate(operator, firstNumber, secondNumber) {
    const operators = {
        "+": add(firstNumber, secondNumber),
        "-": subtract(firstNumber, secondNumber),
        "*": multiply(firstNumber, secondNumber),
        "/": divide(firstNumber, secondNumber),
    };
    total = operators[operator];
    if (total !== null && total.toString().includes(".")) {
        const decimals = total.toString().split(".")[1];
        if (decimals.length > 5) {
            total = parseFloat(total.toFixed(5));
        }
    }
    return total;
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

function calculate(operator, isOperatorClicked, number) {
    getNumber(number, isOperatorClicked);
    s;
    if (firstNumber === undefined) {
        screen.innerHTML = "<p>Error: Enter a valid first number</p>";
        return;
    }
    setScreen(firstNumber, secondNumber, total, operator);
}
