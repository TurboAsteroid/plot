import React from 'react';
import CalcInput from './libs/CalcInput';

let examples = [
    {
        about: 'Умножение',
        equation: 'x*x',
        parse: true,
        values: [
            [0, 0],
            [1, 1],
            [-1, 1],
            [10, 100],
            [undefined, NaN]
        ]
    },
    {
        about: 'Сложение',
        equation: 'x + 3',
        parse: true,
        values: [
            [0, 3],
            [1, 4],
            [-1, 2],
            [-10, -7]
        ]
    },
    {
        about: 'Вычетание',
        equation: 'x - 17',
        parse: true,
        values: [
            [0, -17],
            [1, -16],
            [-1, -18],
            [100, 83]
        ]
    },
    {
        about: 'деление',
        equation: 'x / 3',
        parse: true,
        values: [
            [0, 0],
            [-21, -7],
            [9, 3],
            [99, 33]
        ]
    },
    {
        about: 'Степень',
        equation: '2 ^ x',
        parse: true,
        values: [
            [0, 1],
            [1, 2],
            [-1, 0.5],
            [3, 8]
        ]
    },
    {
        about: 'Корень',
        equation: 'sqrt(x)',
        parse: true,
        values: [
            [0, 0],
            [4, 2],
            [-1, NaN],
            [9, 3]
        ]
    },
    {
        about: 'Унарный минус',
        equation: '-x',
        parse: true,
        values: [
            [0, 0],
            [1, -1],
            [-10, 10]
        ]
    },
    {
        about: 'Составное выражение',
        equation: '-1+(sqrt(x^2)*3 + 1) / 2',
        parse: true,
        values: [
            [0, -0.5],
            [4, 5.5],
            [-1, 1]
        ]
    },
    {
        about: 'float',
        equation: 'x + 0.33',
        parse: true,
        values: [
            [0, 0.33],
            [1, 1.33],
            [-0.33, 0]
        ]
    },
    {
        about: 'Не верное выражение (все символы известны, но не хватает данных',
        equation: '--1',
        parse: true,
        values: [
            [0, false],
            [1, false],
            [-1, false]
        ]
    },
    {
        about: 'неизвестный символ (не парситя)',
        equation: '3+j',
        parse: false,
        values: [
            [0, false],
            [1, false],
            [-1, false]
        ]
    },
    {
        about: 'Не задан x',
        equation: '3+ x',
        parse: true,
        values: [
            [undefined, NaN]
        ]
    },
    {
        about: 'Пропущена скобка',
        equation: '3*(x + 3',
        parse: false,
        values: [
            [1, false]
        ]
    }
];

for (let example of examples) {
    test(example.about, () => {
        let calc = new CalcInput(example.equation);
        expect(calc.parseResult).toEqual(example.parse);
        for (let value of example.values) {
            let calcResult = calc.compute({x: value[0]});
            expect(calcResult).toEqual(value[1]);
        }
    });

}
