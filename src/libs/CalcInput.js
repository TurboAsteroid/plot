class CalcInput {
    equation;
    queue = [];
    parseResult;

    constructor(equation) {
        this.equation = equation;
        this.parseResult = this.prepareToCompute();
    }

    _checkValue(value) {
        const regex = /(^-?\d+(\.\d+)?$)/;
        return value.toString().search(regex) === 0;
    }
    _argCount(c) {
        switch (c) {
            case '^':
            case '*':
            case '/':
            case '+':
            case '-':
                return 2;
            case 'S':
                return 1;
            default:
                return 0;
        }
    }
    _isOperation(c) {
        switch (c) {
            case '^':
                return 4;

            case '*':
            case '/':
                return 3;

            case '+':
            case '-':
                return 2;
            default:
                return 0;
        }
    }
    _isOperator(c) {
        return ['+', '-', '/', '*', '^'].includes(c);
    }
    _leftAssoc(c) {
        switch(c) {
            // лево-ассоциативные операторы
            case '*':
            case '/':
            case '+':
            case '-':
                return true;
                // право-ассоциативные операторы
            case '^':
                return false;
            default:
                return false;
        }
    }
    _isIdent(c) {
        return c === 'x';
    }
    _isDigit(c) {
        return (c >= '0' && c <= '9');
    }
    _isFunction(c) {
        return c === "S";
    }
    _executeOperation(op, args) {
        switch (op) {
            case '*':
                return args[1] * args[0];
            case '/':
                return args[1] / args[0];
            case '+':
                return args[1] + args[0];
            case '-':
                return args[1] - args[0];
            case '^':
                return args[1] ** args[0];
            case 'S':
                return Math.sqrt(args[0]);
            default:
                return 0;
        }
    }

    prepareToCompute() {
        let input = this.equation.replace(/\s+/g, '');
        input = input.replace(/(sqrt)/g, 'S');
        let inputArray = input.split('');
        let queue = [];
        let stack = [];

        for (let i = 0; i < inputArray.length; i++) {
            let c = inputArray[i];
            if (i === 0 && c === '-') {
                queue.push(0);
            }
            if (this._isDigit(c)) {
                for (let j = 1 + i; j < inputArray.length; j++) {
                    if (this._isDigit(inputArray[j]) || inputArray[j] === '.') {
                        c += inputArray[j];
                        i++;
                    } else {
                        break;
                    }
                }
                if (this._checkValue(c)) {
                    queue.push(parseFloat(c));
                } else {
                    console.warn('Не верный формат числа');
                    return false;
                }
            } else if (this._isIdent(c)) {
                queue.push(c);
            }else if(this._isFunction(c)) {
                stack.push(c);
            } else if (this._isOperator(c)) {
                while (stack.length) {
                    let sc = stack[stack.length - 1];
                    if (
                        (this._leftAssoc(sc) && this._isOperation(c) <= this._isOperation(sc)) ||
                        (!this._leftAssoc(sc) && this._isOperation(c) < this._isOperation(sc))
                    ) {
                        queue.push(stack.pop());
                    } else {
                        break;
                    }
                }
                stack.push(c);
            } else if (c === '(') {
                stack.push(c);
                if (inputArray[i + 1] === '-') {
                    queue.push(0);
                }
            } else if (c === ')') {
                let pe = false;
                while (stack.length) {
                    let sc = stack[stack.length - 1];
                    if (sc === '(') {
                        pe = true;
                        break;
                    } else {
                        queue.push(stack.pop());
                    }
                }
                if (!pe) {
                    console.warn("пропущена скобка");
                    return false;
                }
                stack.pop();

                if(stack.length && this._isFunction(stack[stack.length-1])) {
                    queue.push(stack.pop());
                }
            } else {
                console.warn('неизвестный символ');
                return false;
            }
        }
        while (stack.length > 0) {
            let sc = stack[stack.length - 1];
            if (sc === '(' || sc === ')') {
                console.warn("пропущена скобка");
                return false;
            }
            queue.push(stack.pop());
        }
        this.queue = queue.slice();
        return true;
    }
    compute(varValues) {
        let queue = this.queue.slice();
        let stack = [];
        while (queue.length) {
            let c = queue.shift();
            if (this._checkValue(c)) {
                stack.push(c);
            } else if (this._isIdent(c)) {
                if (!(c in varValues) || c === undefined) {
                    console.warn("Не задано значение переменной");
                    return false;
                } else {
                    stack.push(varValues[c]);
                }
            } else if (this._isOperator(c) || this._isFunction(c)) {
                if (stack.length < this._argCount(c)) {
                    console.warn("Недостаточно данных");
                    return false;
                }
                let args = [];
                for (let i = 0; i < this._argCount(c); i++) {
                    args.push(stack.pop());
                }

                let result = this._executeOperation(c, args);
                stack.push(result);
            } else {
                console.warn("неизвестный оператор")
                return false;
            }
        }
        if (stack.length === 1) {
            return stack[0];
        } else {
            console.warn("Ошибочка")
            return false;
        }
    }
}

export default CalcInput;