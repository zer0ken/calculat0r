// 컴파일: npx tsc .\src\script.ts
var $acBtn = document.querySelector('button.ac');
$acBtn.addEventListener('click', function () {
    clearAll();
    display();
});
var $backspaceBtn = document.querySelector('button.backspace');
$backspaceBtn.addEventListener('click', function () {
    eraseFromBack();
    display();
});
var $calculateBtn = document.querySelector('button.calculate');
$calculateBtn.addEventListener('click', function () {
    calculate();
    display();
});
[
    ['+', 'add'],
    ['*', 'mul'],
    ['/', 'div'],
].forEach(function (element) {
    var op = element[0], cls = element[1];
    var $opBtn = document.querySelector("button.op.".concat(cls));
    $opBtn.addEventListener('click', function () {
        if (countDigits(a)) {
            operator = op;
        }
        display();
    });
});
var $subBtn = document.querySelector('button.op.sub');
$subBtn.addEventListener('click', function () {
    if (!a) {
        attachDigit('-');
    }
    else if (!operator && countDigits(a)) {
        operator = '-';
    }
    else if (operator) {
        if (b) {
            operator = '-';
        }
        else {
            attachDigit('-');
        }
    }
    display();
});
var _loop_1 = function (i) {
    var $numBtn = document.querySelector("button.num.digit-".concat(i));
    $numBtn.addEventListener('click', function () {
        attachDigit(String(i));
        display();
    });
};
for (var i = 0; i <= 9; i++) {
    _loop_1(i);
}
clearAll();
display();
var operator = null;
var result = 0;
var _a = ['', ''], a = _a[0], b = _a[1];
function display() {
    var $display = document.querySelector('.display');
    $display.textContent = result.toString();
    var $input = document.querySelector('.input');
    $input.textContent = "".concat(a).concat(operator ? ' ' + operator + ' ' : '').concat(b, " =>");
}
function clearAll() {
    a = '';
    b = '';
    operator = null;
    result = 0;
}
function calculate() {
    if (!countDigits(a)) {
        return;
    }
    if (!operator && countDigits(a)) {
        result = Number(a);
        return;
    }
    if (operator && !countDigits(b)) {
        return;
    }
    var numA = Number(a);
    var numB = Number(b);
    switch (operator) {
        case '+':
            result = numA + numB;
            break;
        case '-':
            result = numA - numB;
            break;
        case '*':
            result = numA * numB;
            break;
        case '/':
            result = parseInt((numA / numB).toString());
            break;
    }
    console.log("".concat(a, " ").concat(operator, " ").concat(b, " => ").concat(result));
    if (countDigits(result.toString()) > 10) {
        result = NaN;
        a = '';
    }
    else {
        a = result.toString();
    }
    b = '';
    operator = null;
}
function attachDigit(digit) {
    if (!operator && countDigits(a) < 3) {
        a += digit;
    }
    else if (operator && countDigits(b) < 3) {
        b += digit;
    }
}
function eraseFromBack() {
    if (b) {
        b = b.substring(0, b.length - 1);
    }
    else if (operator) {
        operator = null;
    }
    else if (a) {
        a = a.substring(0, a.length - 1);
    }
}
function countDigits(number) {
    return number.length - Number(number.includes('-'));
}
