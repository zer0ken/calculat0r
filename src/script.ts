// 컴파일: npx tsc .\src\script.ts

type Operator = null | '+' | '-' | '*' | '/';

const MAX_INPUT_DIGIT = 3;
const MAX_DIPLAY_DIGIT = 10;

let operator: Operator = null;
let result: number = 0;
let [a, b]: [string, string] = ['', ''];

clearAll();
display();

/**
 * DOM
 */

const $acBtn = document.querySelector('button.ac');
$acBtn!.addEventListener('click', () => {
    clearAll();
    display();
});

const $backspaceBtn = document.querySelector('button.backspace');
$backspaceBtn!.addEventListener('click', () => {
    eraseFromBack();
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
        if (countDigits(a)) {
            operator = op as Operator;
        }
        display();
    });
});

const $subBtn = document.querySelector('button.op.sub');
$subBtn!.addEventListener('click', () => {
    if (!a) {
        attachDigit('-');
    } else if (!operator && countDigits(a)) {
        operator = '-';
    } else if (operator) {
        if (b) {
            operator = '-';
        } else {
            attachDigit('-');
        }
    }
    display();
});

for (let i = 0; i <= 9; i++) {
    const $numBtn = document.querySelector(`button.num.digit-${i}`);
    $numBtn!.addEventListener('click', () => {
        attachDigit(String(i));
        display();
    });
}

/**
 * 단위 기능
 */

function display() {
    const $display = document.querySelector('.display');
    $display!.textContent = result.toString();

    const $input = document.querySelector('.input');
    $input!.textContent = `${a}${operator ? ' ' + operator + ' ' : ''}${b} =>`;
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
    const numA: number = Number(a);
    const numB: number = Number(b);
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
    console.log(`${a} ${operator} ${b} => ${result}`);
    
    if (countDigits(result.toString()) > MAX_DIPLAY_DIGIT) {
        result = NaN;
        a = '';
    } else {
        a = result.toString();
    }
    b = '';
    operator = null;
}

function attachDigit(digit: string) {
    if (!operator && countDigits(a) < MAX_INPUT_DIGIT) {
        a += digit;
    } else if (operator && countDigits(b) < MAX_INPUT_DIGIT) {
        b += digit;
    }
}

function eraseFromBack() {
    if (b) {
        b = b.substring(0, b.length - 1);
    } else if (operator) {
        operator = null;
    } else if (a) {
        a = a.substring(0, a.length - 1);
    }
}

function countDigits(number: string) {
    return number.length - Number(number.includes('-'));
}
