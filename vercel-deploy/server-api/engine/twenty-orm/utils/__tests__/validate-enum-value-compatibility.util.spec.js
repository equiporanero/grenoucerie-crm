"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _validateenumvaluecompatibilityutil = require("../validate-enum-value-compatibility.util");
describe('validateEnumValueCompatibility', ()=>{
    const createMockFieldMetadata = (type, options)=>{
        return {
            id: 'mock-id',
            name: 'mockField',
            type,
            options: options || []
        };
    };
    describe('when both fields are enum types', ()=>{
        it('should return true when value exists in target field options', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                },
                {
                    value: 'option2',
                    label: 'Option 2'
                }
            ]);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                },
                {
                    value: 'option2',
                    label: 'Option 2'
                },
                {
                    value: 'option3',
                    label: 'Option 3'
                }
            ]);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: 'option1'
            });
            expect(result).toBe(true);
        });
        it('should return false when value does not exist in target field options', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                },
                {
                    value: 'option2',
                    label: 'Option 2'
                }
            ]);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option3',
                    label: 'Option 3'
                },
                {
                    value: 'option4',
                    label: 'Option 4'
                }
            ]);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: 'option1'
            });
            expect(result).toBe(false);
        });
        it('should validate array values for MULTI_SELECT fields', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.MULTI_SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                },
                {
                    value: 'option2',
                    label: 'Option 2'
                }
            ]);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.MULTI_SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                },
                {
                    value: 'option2',
                    label: 'Option 2'
                },
                {
                    value: 'option3',
                    label: 'Option 3'
                }
            ]);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: [
                    'option1',
                    'option2'
                ]
            });
            expect(result).toBe(true);
        });
        it('should return false when any value in array is invalid', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.MULTI_SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                },
                {
                    value: 'option2',
                    label: 'Option 2'
                }
            ]);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.MULTI_SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                },
                {
                    value: 'option3',
                    label: 'Option 3'
                }
            ]);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: [
                    'option1',
                    'option2'
                ]
            });
            expect(result).toBe(false);
        });
        it('should return true when target field has no options', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                }
            ]);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, []);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: 'option1'
            });
            expect(result).toBe(true);
        });
        it('should handle SELECT to MULTI_SELECT comparison', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                }
            ]);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.MULTI_SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                },
                {
                    value: 'option2',
                    label: 'Option 2'
                }
            ]);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: 'option1'
            });
            expect(result).toBe(true);
        });
    });
    describe('when fields are not both enum types', ()=>{
        it('should return true when workspace member field is not enum', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.TEXT);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                }
            ]);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: 'some text'
            });
            expect(result).toBe(true);
        });
        it('should return true when target field is not enum', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                }
            ]);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.TEXT);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: 'option1'
            });
            expect(result).toBe(true);
        });
        it('should return true when neither field is enum', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.TEXT);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.TEXT);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: 'some text'
            });
            expect(result).toBe(true);
        });
    });
    describe('edge cases', ()=>{
        it('should handle undefined value', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                }
            ]);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                }
            ]);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: undefined
            });
            expect(result).toBe(false);
        });
        it('should handle null value', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                }
            ]);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                }
            ]);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: null
            });
            expect(result).toBe(false);
        });
        it('should handle empty array', ()=>{
            const workspaceMemberField = createMockFieldMetadata(_types.FieldMetadataType.MULTI_SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                }
            ]);
            const targetField = createMockFieldMetadata(_types.FieldMetadataType.MULTI_SELECT, [
                {
                    value: 'option1',
                    label: 'Option 1'
                }
            ]);
            const result = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata: workspaceMemberField,
                targetFieldMetadata: targetField,
                predicateValue: []
            });
            expect(result).toBe(true);
        });
    });
});

//# sourceMappingURL=validate-enum-value-compatibility.util.spec.js.map