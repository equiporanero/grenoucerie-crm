"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _nullequivalentvaluesconstant = require("../../../../../../../engine/api/common/common-args-processors/data-arg-processor/constants/null-equivalent-values.constant");
const _finddefaultnullequivalentvalueutil = require("../find-default-null-equivalent-value.util");
describe('findDefaultNullEquivalentValue', ()=>{
    describe('Simple Types', ()=>{
        describe('TEXT', ()=>{
            it('should return DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE for null', ()=>{
                expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                    value: null,
                    fieldMetadataType: _types.FieldMetadataType.TEXT
                })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
            });
            it('should return DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE for empty string', ()=>{
                expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                    value: '',
                    fieldMetadataType: _types.FieldMetadataType.TEXT
                })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
            });
            it('should return undefined for non-null equivalent value', ()=>{
                expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                    value: 'value',
                    fieldMetadataType: _types.FieldMetadataType.TEXT
                })).toBeUndefined();
            });
        });
        describe('ARRAY', ()=>{
            it('should return DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE for null', ()=>{
                expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                    value: null,
                    fieldMetadataType: _types.FieldMetadataType.ARRAY
                })).toBe(_nullequivalentvaluesconstant.DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE);
            });
            it('should return DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE for empty array', ()=>{
                expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                    value: [],
                    fieldMetadataType: _types.FieldMetadataType.ARRAY
                })).toBe(_nullequivalentvaluesconstant.DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE);
            });
        });
    });
    describe('ACTOR', ()=>{
        it('should return text default for name', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: '',
                fieldMetadataType: _types.FieldMetadataType.ACTOR,
                key: 'name'
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
        it('should return undefined for context', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: {},
                fieldMetadataType: _types.FieldMetadataType.ACTOR,
                key: 'context'
            })).toBe(undefined);
        });
    });
    describe('ADDRESS', ()=>{
        it.each([
            'addressStreet1',
            'addressStreet2',
            'addressCity',
            'addressState',
            'addressPostcode',
            'addressCountry'
        ])('should return text default for %s', (key)=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: '',
                fieldMetadataType: _types.FieldMetadataType.ADDRESS,
                key
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
    describe('EMAILS', ()=>{
        it('should return text default for primaryEmail', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: '',
                fieldMetadataType: _types.FieldMetadataType.EMAILS,
                key: 'primaryEmail'
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
        it('should return array default for additionalEmails', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: [],
                fieldMetadataType: _types.FieldMetadataType.EMAILS,
                key: 'additionalEmails'
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
    describe('LINKS', ()=>{
        it('should return text default for primaryLinkUrl', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: '',
                fieldMetadataType: _types.FieldMetadataType.LINKS,
                key: 'primaryLinkUrl'
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
        it('should return text default for primaryLinkLabel', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: '',
                fieldMetadataType: _types.FieldMetadataType.LINKS,
                key: 'primaryLinkLabel'
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
    describe('PHONES', ()=>{
        it('should return text default for primaryPhoneNumber', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: '',
                fieldMetadataType: _types.FieldMetadataType.PHONES,
                key: 'primaryPhoneNumber'
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
        it('should return text default for primaryPhoneCountryCode', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: '',
                fieldMetadataType: _types.FieldMetadataType.PHONES,
                key: 'primaryPhoneCountryCode'
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
        it('should return text default for primaryPhoneCallingCode', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: '',
                fieldMetadataType: _types.FieldMetadataType.PHONES,
                key: 'primaryPhoneCallingCode'
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
    describe('RICH_TEXT', ()=>{
        it('should return undefined for blocknote', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: {},
                fieldMetadataType: _types.FieldMetadataType.RICH_TEXT,
                key: 'blocknote'
            })).toBe(undefined);
        });
        it('should return text default for markdown', ()=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: '',
                fieldMetadataType: _types.FieldMetadataType.RICH_TEXT,
                key: 'markdown'
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
    describe('FULL_NAME', ()=>{
        it.each([
            'firstName',
            'lastName'
        ])('should return text default for %s', (key)=>{
            expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
                value: '',
                fieldMetadataType: _types.FieldMetadataType.FULL_NAME,
                key
            })).toBe(_nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
});
it('should return undefined for unknown type', ()=>{
    expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
        value: null,
        fieldMetadataType: 'UNKNOWN'
    })).toBeUndefined();
});
it('should return undefined for unknown composite key', ()=>{
    expect((0, _finddefaultnullequivalentvalueutil.findDefaultNullEquivalentValue)({
        value: '',
        fieldMetadataType: _types.FieldMetadataType.ACTOR,
        key: 'unknown'
    })).toBeUndefined();
});

//# sourceMappingURL=find-default-null-equivalent-value.util.spec.js.map