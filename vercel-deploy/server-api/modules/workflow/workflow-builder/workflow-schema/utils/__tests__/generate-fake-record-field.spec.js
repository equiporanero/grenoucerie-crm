"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _generatefakevalue = /*#__PURE__*/ _interop_require_wildcard(require("../../../../../../engine/utils/generate-fake-value"));
const _generatefakerecordfield = require("../generate-fake-record-field");
const _cameltotitlecase = /*#__PURE__*/ _interop_require_wildcard(require("../../../../../../utils/camel-to-title-case"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
jest.mock('src/engine/utils/generate-fake-value');
jest.mock('src/utils/camel-to-title-case');
describe('generateFakeField', ()=>{
    const generateFakeValueSpy = jest.spyOn(_generatefakevalue, 'generateFakeValue');
    const camelToTitleCaseSpy = jest.spyOn(_cameltotitlecase, 'camelToTitleCase');
    beforeEach(()=>{
        jest.clearAllMocks();
        // Default mock implementations
        generateFakeValueSpy.mockImplementation((type)=>`fake-${type}`);
        camelToTitleCaseSpy.mockImplementation((str)=>`Title ${str}`);
    });
    describe('for simple field types', ()=>{
        it('should generate a leaf node for TEXT type', ()=>{
            generateFakeValueSpy.mockReturnValueOnce('Fake Text');
            const result = (0, _generatefakerecordfield.generateFakeRecordField)({
                type: _types.FieldMetadataType.TEXT,
                label: 'Text Field',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(result).toEqual({
                isLeaf: true,
                type: _types.FieldMetadataType.TEXT,
                icon: undefined,
                label: 'Text Field',
                value: 'Fake Text',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(generateFakeValueSpy).toHaveBeenCalledWith(_types.FieldMetadataType.TEXT, 'FieldMetadataType');
        });
        it('should handle custom value', ()=>{
            const result = (0, _generatefakerecordfield.generateFakeRecordField)({
                type: _types.FieldMetadataType.TEXT,
                label: 'Text Field',
                value: 'Test value',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(result).toEqual({
                isLeaf: true,
                type: _types.FieldMetadataType.TEXT,
                icon: undefined,
                label: 'Text Field',
                value: 'Test value',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(generateFakeValueSpy).not.toHaveBeenCalled();
        });
        it('should generate a leaf node for NUMBER type with icon', ()=>{
            generateFakeValueSpy.mockReturnValueOnce(42);
            const result = (0, _generatefakerecordfield.generateFakeRecordField)({
                type: _types.FieldMetadataType.NUMBER,
                label: 'Number Field',
                icon: 'IconNumber',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(result).toEqual({
                isLeaf: true,
                type: _types.FieldMetadataType.NUMBER,
                icon: 'IconNumber',
                label: 'Number Field',
                value: 42,
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
        });
        it('should generate a leaf node for DATE type', ()=>{
            const fakeDate = new Date('2023-01-01');
            generateFakeValueSpy.mockReturnValueOnce(fakeDate);
            const result = (0, _generatefakerecordfield.generateFakeRecordField)({
                type: _types.FieldMetadataType.DATE,
                label: 'Date Field',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(result).toEqual({
                isLeaf: true,
                type: _types.FieldMetadataType.DATE,
                icon: undefined,
                label: 'Date Field',
                value: fakeDate,
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
        });
    });
    describe('for composite field types', ()=>{
        it('should generate a node with properties for LINKS type', ()=>{
            generateFakeValueSpy.mockReturnValueOnce('Fake Label').mockReturnValueOnce('https://example.com');
            camelToTitleCaseSpy.mockReturnValueOnce('Label').mockReturnValueOnce('Url');
            const result = (0, _generatefakerecordfield.generateFakeRecordField)({
                type: _types.FieldMetadataType.LINKS,
                label: 'Links Field',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(result).toEqual({
                isLeaf: false,
                icon: undefined,
                label: 'Links Field',
                type: _types.FieldMetadataType.LINKS,
                value: {
                    primaryLinkLabel: {
                        fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000',
                        isCompositeSubField: true,
                        isLeaf: true,
                        type: _types.FieldMetadataType.TEXT,
                        label: 'Label',
                        value: 'Fake Label'
                    },
                    primaryLinkUrl: {
                        fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000',
                        isCompositeSubField: true,
                        isLeaf: true,
                        type: _types.FieldMetadataType.TEXT,
                        label: 'Url',
                        value: 'https://example.com'
                    },
                    secondaryLinks: {
                        fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000',
                        isCompositeSubField: true,
                        isLeaf: true,
                        label: 'Title secondaryLinks',
                        type: 'RAW_JSON',
                        value: 'fake-RAW_JSON'
                    }
                },
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(generateFakeValueSpy).toHaveBeenCalledTimes(3);
            expect(camelToTitleCaseSpy).toHaveBeenCalledWith('primaryLinkLabel');
            expect(camelToTitleCaseSpy).toHaveBeenCalledWith('primaryLinkUrl');
            expect(camelToTitleCaseSpy).toHaveBeenCalledWith('secondaryLinks');
        });
        it('should generate a node with properties for CURRENCY type', ()=>{
            generateFakeValueSpy.mockReturnValueOnce(100).mockReturnValueOnce('USD');
            camelToTitleCaseSpy.mockReturnValueOnce('Amount').mockReturnValueOnce('Currency Code');
            const result = (0, _generatefakerecordfield.generateFakeRecordField)({
                type: _types.FieldMetadataType.CURRENCY,
                label: 'Currency Field',
                icon: 'IconCurrency',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(result).toEqual({
                isLeaf: false,
                icon: 'IconCurrency',
                label: 'Currency Field',
                type: _types.FieldMetadataType.CURRENCY,
                value: {
                    amountMicros: {
                        fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000',
                        isCompositeSubField: true,
                        isLeaf: true,
                        type: _types.FieldMetadataType.NUMERIC,
                        label: 'Amount',
                        value: 100
                    },
                    currencyCode: {
                        fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000',
                        isCompositeSubField: true,
                        isLeaf: true,
                        type: _types.FieldMetadataType.TEXT,
                        label: 'Currency Code',
                        value: 'USD'
                    }
                },
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
        });
    });
    describe('edge cases', ()=>{
        it('should handle unknown field types as leaf nodes', ()=>{
            const unknownType = 'UNKNOWN_TYPE';
            generateFakeValueSpy.mockReturnValueOnce('Unknown Value');
            const result = (0, _generatefakerecordfield.generateFakeRecordField)({
                type: unknownType,
                label: 'Unknown Field',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(result).toEqual({
                isLeaf: true,
                type: unknownType,
                icon: undefined,
                label: 'Unknown Field',
                value: 'Unknown Value',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
        });
        it('should handle empty label', ()=>{
            generateFakeValueSpy.mockReturnValueOnce('Fake Boolean');
            const result = (0, _generatefakerecordfield.generateFakeRecordField)({
                type: _types.FieldMetadataType.BOOLEAN,
                label: '',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
            expect(result).toEqual({
                isLeaf: true,
                type: _types.FieldMetadataType.BOOLEAN,
                icon: undefined,
                label: '',
                value: 'Fake Boolean',
                fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
            });
        });
    });
});

//# sourceMappingURL=generate-fake-record-field.spec.js.map