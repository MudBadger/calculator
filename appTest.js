let numberKeys = document.querySelectorAll(".numberBtn");
let numberArr = [];
let firstNumber;

numberKeys.forEach((key) => {
    key.addEventListener("click", (e) => {
        number = e.target.dataset.number;
        numberArr.push(number);
        let currentNumber = numberArr.reduce((accum, digit) => accum + digit);
        firstNumber = currentNumber;
        console.log(currentNumber);
    });
});

console.log(firstNumber);
