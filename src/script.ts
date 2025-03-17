// 컴파일: npx tsc .\src\script.ts

const $acBtn = document.querySelector('button.ac');
$acBtn!.addEventListener('click', () => {
    clearAll();
    display();
});

const $backspaceBtn = document.querySelector('button.backspace');
$backspaceBtn!.addEventListener('click', () => {
    dettachFromB();
    display();
});

const $calculateBtn = document.querySelector('button.calculate');
$calculateBtn!.addEventListener('click', () => {
    calculate();
    display();
});

[
    ['+', 'add'],
    ['*', 'mul'],
    ['/', 'div'],
].forEach((element) => {
    const [op, cls] = element;
    const $opBtn = document.querySelector(`button.op.${cls}`);
    $opBtn!.addEventListener('click', () => {
        operator = op as Operator;
        display();
    });
});

const $subBtn = document.querySelector('button.op.sub');
$subBtn!.addEventListener('click', () => {
    console.log('operator', operator);
    console.log('b', b);
    if ([' ', '?'].includes(operator) || countDigitOfB()) {
        operator = '-';
        display();
    } else if (b && b.includes('-')) {
        operator = '-';
        b = b.substring(1);
        display();
    } else {
        attachToB('-');
        display();
    }
});

for (let i = 0; i <= 9; i++) {
    const $numBtn = document.querySelector(`button.num.digit-${i}`);
    $numBtn!.addEventListener('click', () => {
        attachToB(String(i));
        display();
    });
}

const $dotBtn = document.querySelector('button.dot');
$dotBtn!.addEventListener('click', () => {
    if (!b.includes('.')) {
        attachToB('.');
        display();
    }
});

clearAll();
display();

type Operator = ' ' | '?' | '+' | '-' | '*' | '/';
let operator: Operator = ' ';
let [a, b]: [string, string] = ['0', ''];

function display() {
    const $display = document.querySelector('.display');
    $display!.textContent = a.toString();

    const $input = document.querySelector('.input');
    $input!.textContent = `= ${a}${operator}${b}`;
}

function clearAll() {
    a = '0';
    b = '';
    operator = ' ';
}

function attachToB(num: string) {
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

    let tempA: number = Number(a);
    const tempB: number = Number(b);
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
    return (
        b.length -
        Number(b.includes('?')) -
        Number(b.includes('.')) -
        Number(b.includes('-'))
    );
}
