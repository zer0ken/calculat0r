// 컴파일: npx tsc .\src\script.ts
var $acBtn = document.querySelector('button.ac');
$acBtn.addEventListener('click', function () {
    clearAll();
    display();
});
var $backspaceBtn = document.querySelector('button.backspace');
$backspaceBtn.addEventListener('click', function () {
    dettachFromB();
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
        operator = op;
        display();
    });
});
var $subBtn = document.querySelector('button.op.sub');
$subBtn.addEventListener('click', function () {
    console.log('operator', operator);
    console.log('b', b);
    if ([' ', '?'].includes(operator) || countDigitOfB()) {
        operator = '-';
        display();
    }
    else if (b && b.includes('-')) {
        operator = '-';
        b = b.substring(1);
        display();
    }
    else {
        attachToB('-');
        display();
    }
});
var _loop_1 = function (i) {
    var $numBtn = document.querySelector("button.num.digit-".concat(i));
    $numBtn.addEventListener('click', function () {
        attachToB(String(i));
        display();
    });
};
for (var i = 0; i <= 9; i++) {
    _loop_1(i);
}
var $dotBtn = document.querySelector('button.dot');
$dotBtn.addEventListener('click', function () {
    if (!b.includes('.')) {
        attachToB('.');
        display();
    }
});
clearAll();
display();
var operator = ' ';
var _a = ['0', ''], a = _a[0], b = _a[1];
function display() {
    var $display = document.querySelector('.display');
    $display.textContent = a.toString();
    var $input = document.querySelector('.input');
    $input.textContent = "= ".concat(a).concat(operator).concat(b);
}
function clearAll() {
    a = '0';
    b = '';
    operator = ' ';
}
function attachToB(num) {
    if (b.length && b.at(b.length - 1) == '?') {
        b = b.substring(0, b.length - 1);
    }
    if (countDigitOfB() < 3) {
        b += num;
    }
}
function dettachFromB() {
    if (b.length) {
        b = b.substring(0, b.length - 1);
    }
}
function calculate() {
    console.log('@ calculate()');
    if (!countDigitOfB()) {
        console.log('b has no digit');
        attachToB('?');
        return;
    }
    if ([' ', '?'].includes(operator)) {
        console.log('oprator unset');
        operator = '?';
        return;
    }
    var tempA = Number(a);
    var tempB = Number(b);
    switch (operator) {
        case '+':
            tempA = tempA + tempB;
            break;
        case '-':
            tempA = tempA - tempB;
            break;
        case '*':
            tempA = tempA * tempB;
            break;
        case '/':
            if (tempB == 0) {
                console.log('zero division');
                return;
            }
            tempA = tempA / tempB;
            break;
    }
    a = Number(tempA.toFixed(3)).toString();
    operator = ' ';
    b = '';
}
function countDigitOfB() {
    if (!b) {
        return 0;
    }
    return (b.length -
        Number(b.includes('?')) -
        Number(b.includes('.')) -
        Number(b.includes('-')));
}
