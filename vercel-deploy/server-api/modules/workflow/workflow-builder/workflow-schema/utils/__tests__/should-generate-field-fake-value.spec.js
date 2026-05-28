"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getflatfieldmetadatamock = require("../../../../../../engine/metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _shouldgeneratefieldfakevalue = require("../should-generate-field-fake-value");
describe('shouldGenerateFieldFakeValue', ()=>{
    it('should return true for active non-system fields', ()=>{
        const field = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            objectMetadataId: '20202020-0000-0000-0000-000000000001',
            isSystem: false,
            isActive: true,
            type: _types.FieldMetadataType.TEXT,
            name: 'testField',
            universalIdentifier: 'test-field-universal-id'
        });
        expect((0, _shouldgeneratefieldfakevalue.shouldGenerateFieldFakeValue)(field)).toBe(true);
    });
    it('should return true for system id field', ()=>{
        const field = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            objectMetadataId: '20202020-0000-0000-0000-000000000001',
            isSystem: true,
            isActive: true,
            type: _types.FieldMetadataType.UUID,
            name: 'id',
            universalIdentifier: 'id-field-universal-id'
        });
        expect((0, _shouldgeneratefieldfakevalue.shouldGenerateFieldFakeValue)(field)).toBe(true);
    });
    it('should return false for inactive fields', ()=>{
        const field = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            objectMetadataId: '20202020-0000-0000-0000-000000000001',
            isSystem: false,
            isActive: false,
            type: _types.FieldMetadataType.TEXT,
            name: 'testField',
            universalIdentifier: 'inactive-field-universal-id'
        });
        expect((0, _shouldgeneratefieldfakevalue.shouldGenerateFieldFakeValue)(field)).toBe(false);
    });
    it('should return true for system fields', ()=>{
        const field = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            objectMetadataId: '20202020-0000-0000-0000-000000000001',
            isSystem: true,
            isActive: true,
            type: _types.FieldMetadataType.TEXT,
            name: 'testField',
            universalIdentifier: 'system-field-universal-id'
        });
        expect((0, _shouldgeneratefieldfakevalue.shouldGenerateFieldFakeValue)(field)).toBe(true);
    });
    it('should return true for many-to-one relation fields', ()=>{
        const field = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            objectMetadataId: '20202020-0000-0000-0000-000000000001',
            isSystem: false,
            isActive: true,
            type: _types.FieldMetadataType.RELATION,
            name: 'testField',
            universalIdentifier: 'relation-field-universal-id',
            settings: {
                relationType: _types.RelationType.MANY_TO_ONE
            }
        });
        expect((0, _shouldgeneratefieldfakevalue.shouldGenerateFieldFakeValue)(field)).toBe(true);
    });
});

//# sourceMappingURL=should-generate-field-fake-value.spec.js.map