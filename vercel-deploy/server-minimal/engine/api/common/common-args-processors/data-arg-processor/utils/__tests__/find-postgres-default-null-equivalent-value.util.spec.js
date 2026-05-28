"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _nullequivalentvaluesconstant = require("../../constants/null-equivalent-values.constant");
const _findpostgresdefaultnullequivalentvalueutil = require("../find-postgres-default-null-equivalent-value.util");
describe('findPostgresDefaultNullEquivalentValue', ()=>{
    describe('Simple Types', ()=>{
        describe('TEXT', ()=>{
            it('should return POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE for null', ()=>{
                expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)(null, _types.FieldMetadataType.TEXT)).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
            });
            it('should return POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE for empty string', ()=>{
                expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('', _types.FieldMetadataType.TEXT)).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
            });
            it("should return POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE for 'NULL'", ()=>{
                expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('NULL', _types.FieldMetadataType.TEXT)).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
            });
            it('should return undefined for non-null equivalent value', ()=>{
                expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('value', _types.FieldMetadataType.TEXT)).toBeUndefined();
            });
        });
        describe('ARRAY', ()=>{
            it('should return POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE for null', ()=>{
                expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)(null, _types.FieldMetadataType.ARRAY)).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE);
            });
            it('should return POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE for empty array', ()=>{
                expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)([], _types.FieldMetadataType.ARRAY)).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE);
            });
            it("should return POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE for 'NULL'", ()=>{
                expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('NULL', _types.FieldMetadataType.ARRAY)).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE);
            });
        });
    });
    describe('ACTOR', ()=>{
        it('should return text default for name', ()=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('', _types.FieldMetadataType.ACTOR, 'name')).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
        it('should return json default for context', ()=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)({}, _types.FieldMetadataType.ACTOR, 'context')).toBe(undefined);
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
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('', _types.FieldMetadataType.ADDRESS, key)).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
    describe('EMAILS', ()=>{
        it('should return text default for primaryEmail', ()=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('', _types.FieldMetadataType.EMAILS, 'primaryEmail')).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
        it('should return array default for additionalEmails', ()=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)([], _types.FieldMetadataType.EMAILS, 'additionalEmails')).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
    describe('LINKS', ()=>{
        it('should return text default for primaryLinkUrl', ()=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('', _types.FieldMetadataType.LINKS, 'primaryLinkUrl')).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
        it('should return array default for secondaryLinks', ()=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)([], _types.FieldMetadataType.LINKS, 'secondaryLinks')).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
    describe('PHONES', ()=>{
        it('should return text default for primaryPhoneNumber', ()=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('', _types.FieldMetadataType.PHONES, 'primaryPhoneNumber')).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
        it('should return array default for additionalPhones', ()=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)([], _types.FieldMetadataType.PHONES, 'additionalPhones')).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
    describe('RICH_TEXT', ()=>{
        it('should return json default for blocknote', ()=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)({}, _types.FieldMetadataType.RICH_TEXT, 'blocknote')).toBe(undefined);
        });
        it('should return text default for markdown', ()=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('', _types.FieldMetadataType.RICH_TEXT, 'markdown')).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
    describe('FULL_NAME', ()=>{
        it.each([
            'firstName',
            'lastName'
        ])('should return text default for %s', (key)=>{
            expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('', _types.FieldMetadataType.FULL_NAME, key)).toBe(_nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE);
        });
    });
});
it('should return undefined for unknown type', ()=>{
    expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)(null, 'UNKNOWN')).toBeUndefined();
});
it('should return undefined for unknown composite key', ()=>{
    expect((0, _findpostgresdefaultnullequivalentvalueutil.findPostgresDefaultNullEquivalentValue)('', _types.FieldMetadataType.ACTOR, 'unknown')).toBeUndefined();
});

//# sourceMappingURL=find-postgres-default-null-equivalent-value.util.spec.js.map