"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getgroupablesubfieldsforcompositetypeutil = require("../get-groupable-sub-fields-for-composite-type.util");
const _iscompositepropertysupportedingroupbyutil = require("../is-composite-property-supported-in-group-by.util");
const _issupportedingroupbyutil = require("../is-supported-in-group-by.util");
const buildFlatFieldMetadata = (type, name = 'field', isSystem = false)=>({
        type,
        name,
        isSystem
    });
const buildCompositeProperty = (type, hidden = false)=>({
        name: 'subField',
        type,
        hidden,
        isRequired: false
    });
describe('isFlatFieldMetadataSupportedInGroupBy', ()=>{
    it('returns false for low-level field types', ()=>{
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.TS_VECTOR))).toBe(false);
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.RAW_JSON))).toBe(false);
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.FILES))).toBe(false);
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.POSITION))).toBe(false);
    });
    it('returns true for regular field types', ()=>{
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.TEXT))).toBe(true);
    });
    it('returns false for internal/system field names', ()=>{
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.TEXT, 'id'))).toBe(false);
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.DATE_TIME, 'deletedAt'))).toBe(false);
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.TS_VECTOR, 'searchVector'))).toBe(false);
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.ACTOR, 'createdBy'))).toBe(false);
    });
    it('returns true for createdAt and updatedAt date fields even if system', ()=>{
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.DATE_TIME, 'createdAt', true))).toBe(true);
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.DATE_TIME, 'updatedAt', true))).toBe(true);
    });
    it('returns false for other system fields', ()=>{
        expect((0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(buildFlatFieldMetadata(_types.FieldMetadataType.TEXT, 'customSystemField', true))).toBe(false);
    });
});
describe('isCompositePropertySupportedInGroupBy', ()=>{
    it('returns false for hidden or raw_json composite properties', ()=>{
        expect((0, _iscompositepropertysupportedingroupbyutil.isCompositePropertySupportedInGroupBy)(buildCompositeProperty(_types.FieldMetadataType.TEXT, true))).toBe(false);
        expect((0, _iscompositepropertysupportedingroupbyutil.isCompositePropertySupportedInGroupBy)(buildCompositeProperty(_types.FieldMetadataType.RAW_JSON))).toBe(false);
    });
    it('returns true for visible non-raw_json composite properties', ()=>{
        expect((0, _iscompositepropertysupportedingroupbyutil.isCompositePropertySupportedInGroupBy)(buildCompositeProperty(_types.FieldMetadataType.TEXT))).toBe(true);
    });
});
describe('getGroupableSubFieldsForCompositeType', ()=>{
    it('returns null for non-composite field types', ()=>{
        expect((0, _getgroupablesubfieldsforcompositetypeutil.getGroupableSubFieldsForCompositeType)(_types.FieldMetadataType.TEXT)).toBe(null);
    });
    it('returns supported subfields for composite field types', ()=>{
        expect((0, _getgroupablesubfieldsforcompositetypeutil.getGroupableSubFieldsForCompositeType)(_types.FieldMetadataType.CURRENCY)).toEqual(expect.arrayContaining([
            'amountMicros',
            'currencyCode'
        ]));
    });
});

//# sourceMappingURL=is-supported-in-group-by.spec.js.map