"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _computemetadatanamefromlabelorthrowutil = require("../compute-metadata-name-from-label-or-throw.util");
const _invalidmetadataexception = require("../exceptions/invalid-metadata.exception");
describe('computeMetadataNameFromLabel', ()=>{
    const successfulTestCases = [
        {
            title: 'should convert a simple label to camelCase',
            context: {
                input: 'Simple Label',
                expected: 'simpleLabel'
            }
        },
        {
            title: 'should handle special characters and convert to camelCase',
            context: {
                input: 'Special & Characters!',
                expected: 'specialCharacters'
            }
        },
        {
            title: 'should prefix numeric labels with n',
            context: {
                input: '123 Test',
                expected: 'n123Test'
            }
        },
        {
            title: 'should handle multiple spaces and convert to camelCase',
            context: {
                input: 'Multiple   Spaces   Here',
                expected: 'multipleSpacesHere'
            }
        },
        {
            title: 'should handle accented characters',
            context: {
                input: 'Café Crème',
                expected: 'cafeCreme'
            }
        },
        {
            title: 'should handle empty label',
            context: {
                input: '',
                expected: ''
            }
        },
        {
            title: 'should handle mixed case input',
            context: {
                input: 'MiXeD cAsE',
                expected: 'mixedCase'
            }
        },
        {
            title: 'should add "Custom" suffix to reserved keywords',
            context: {
                input: 'Plan',
                expected: 'planCustom'
            }
        },
        {
            title: 'should add "Custom" suffix to plural reserved keywords',
            context: {
                input: 'Events',
                expected: 'eventsCustom'
            }
        },
        {
            title: 'should add "Custom" suffix to core object names',
            context: {
                input: 'User',
                expected: 'userCustom'
            }
        },
        {
            title: 'should not modify non-reserved keywords',
            context: {
                input: 'Customer',
                expected: 'customer'
            }
        }
    ];
    const failingTestCases = [
        {
            title: 'should throw when label is undefined',
            context: {
                input: undefined,
                expectToThrow: {
                    error: new _invalidmetadataexception.InvalidMetadataException('Label is required', _invalidmetadataexception.InvalidMetadataExceptionCode.LABEL_REQUIRED)
                }
            }
        },
        {
            title: 'should throw when label contains only special characters',
            context: {
                input: '!@#$%^&*()',
                expectToThrow: {
                    error: new _invalidmetadataexception.InvalidMetadataException('Invalid label: "!@#$%^&*()"', _invalidmetadataexception.InvalidMetadataExceptionCode.INVALID_LABEL)
                }
            }
        }
    ];
    describe('successful cases', ()=>{
        it.each(successfulTestCases)('$title', ({ context })=>{
            const result = (0, _computemetadatanamefromlabelorthrowutil.computeMetadataNameFromLabelOrThrow)(context.input);
            expect(result).toBe(context.expected);
        });
    });
    describe('failing cases', ()=>{
        it.each(failingTestCases)('$title', ({ context })=>{
            expect(()=>(0, _computemetadatanamefromlabelorthrowutil.computeMetadataNameFromLabelOrThrow)(context.input)).toThrow(context.expectToThrow?.error);
        });
    });
});

//# sourceMappingURL=compute-metadata-name-from-label.util.spec.js.map