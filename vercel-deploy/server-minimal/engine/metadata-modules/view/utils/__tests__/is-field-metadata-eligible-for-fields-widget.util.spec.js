"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
describe('isFieldMetadataEligibleForFieldsWidget', ()=>{
    it('should exclude deletedAt field', ()=>{
        expect((0, _utils.isFieldMetadataEligibleForFieldsWidget)({
            fieldName: 'deletedAt',
            fieldType: _types.FieldMetadataType.DATE_TIME,
            isLabelIdentifierField: false
        })).toBe(false);
    });
    it('should exclude TS_VECTOR fields', ()=>{
        expect((0, _utils.isFieldMetadataEligibleForFieldsWidget)({
            fieldName: 'searchVector',
            fieldType: _types.FieldMetadataType.TS_VECTOR,
            isLabelIdentifierField: false
        })).toBe(false);
    });
    it('should exclude POSITION fields', ()=>{
        expect((0, _utils.isFieldMetadataEligibleForFieldsWidget)({
            fieldName: 'position',
            fieldType: _types.FieldMetadataType.POSITION,
            isLabelIdentifierField: false
        })).toBe(false);
    });
    it('should exclude id field when it is not the label identifier', ()=>{
        expect((0, _utils.isFieldMetadataEligibleForFieldsWidget)({
            fieldName: 'id',
            fieldType: _types.FieldMetadataType.UUID,
            isLabelIdentifierField: false
        })).toBe(false);
    });
    it('should exclude id field even when it is the label identifier', ()=>{
        expect((0, _utils.isFieldMetadataEligibleForFieldsWidget)({
            fieldName: 'id',
            fieldType: _types.FieldMetadataType.UUID,
            isLabelIdentifierField: true
        })).toBe(false);
    });
    it('should include a normal field', ()=>{
        expect((0, _utils.isFieldMetadataEligibleForFieldsWidget)({
            fieldName: 'name',
            fieldType: _types.FieldMetadataType.TEXT,
            isLabelIdentifierField: false
        })).toBe(true);
    });
    it('should include createdAt field', ()=>{
        expect((0, _utils.isFieldMetadataEligibleForFieldsWidget)({
            fieldName: 'createdAt',
            fieldType: _types.FieldMetadataType.DATE_TIME,
            isLabelIdentifierField: false
        })).toBe(true);
    });
});

//# sourceMappingURL=is-field-metadata-eligible-for-fields-widget.util.spec.js.map