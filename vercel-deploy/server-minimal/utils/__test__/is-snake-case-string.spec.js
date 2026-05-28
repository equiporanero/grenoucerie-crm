"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _issnakecasestring = require("../is-snake-case-string");
const testCases = [
    {
        title: 'single word',
        context: {
            input: 'FOO',
            expected: true
        }
    },
    {
        title: 'two words',
        context: {
            input: 'FOO_BAR',
            expected: true
        }
    },
    {
        title: 'words with numbers',
        context: {
            input: 'FOO1_BAR2',
            expected: true
        }
    },
    {
        title: 'lowercase',
        context: {
            input: 'foo_bar',
            expected: false
        }
    },
    {
        title: 'double underscore',
        context: {
            input: 'FOO__BAR',
            expected: false
        }
    },
    {
        title: 'dash instead of underscore',
        context: {
            input: 'FOO-BAR',
            expected: false
        }
    },
    {
        title: 'leading underscore',
        context: {
            input: '_FOO_BAR',
            expected: false
        }
    },
    {
        title: 'trailing underscore',
        context: {
            input: 'FOO_BAR_',
            expected: false
        }
    },
    {
        title: 'empty string',
        context: {
            input: '',
            expected: false
        }
    },
    {
        title: 'space instead of underscore',
        context: {
            input: 'FOO BAR',
            expected: false
        }
    }
];
describe('is-snake-case-string', ()=>{
    test.each(testCases)('$title', ({ context: { input, expected } })=>{
        expect((0, _issnakecasestring.isSnakeCaseString)(input)).toBe(expected);
    });
});

//# sourceMappingURL=is-snake-case-string.spec.js.map