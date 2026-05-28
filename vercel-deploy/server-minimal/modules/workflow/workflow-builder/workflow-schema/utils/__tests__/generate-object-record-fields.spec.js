"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _mockObjectMetadataItemsWithFieldMaps = require("../../../../../../engine/core-modules/__mocks__/mockObjectMetadataItemsWithFieldMaps");
const _generatefakerecordfield = require("../generate-fake-record-field");
const _generateobjectrecordfields = require("../generate-object-record-fields");
const _shouldgeneratefieldfakevalue = require("../should-generate-field-fake-value");
jest.mock('src/modules/workflow/workflow-builder/workflow-schema/utils/generate-fake-record-field');
jest.mock('src/modules/workflow/workflow-builder/workflow-schema/utils/should-generate-field-fake-value');
describe('generateObjectRecordFields', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    it('should generate fields for valid fields only', ()=>{
        _shouldgeneratefieldfakevalue.shouldGenerateFieldFakeValue.mockImplementation((field)=>field.type !== _types.FieldMetadataType.RELATION);
        _generatefakerecordfield.generateFakeRecordField.mockImplementation(({ type, label, icon })=>({
                type,
                label,
                icon,
                value: `mock-${type}`
            }));
        const result = (0, _generateobjectrecordfields.generateObjectRecordFields)({
            objectMetadataInfo: _mockObjectMetadataItemsWithFieldMaps.mockCompanyObjectMetadataInfo
        });
        expect(result).toEqual({
            domainName: {
                icon: 'test-field-icon',
                label: 'Domain Name',
                type: 'LINKS',
                value: 'mock-LINKS'
            },
            name: {
                icon: 'test-field-icon',
                label: 'Name',
                type: 'TEXT',
                value: 'mock-TEXT'
            }
        });
        expect(_shouldgeneratefieldfakevalue.shouldGenerateFieldFakeValue).toHaveBeenCalledTimes(2);
        expect(_generatefakerecordfield.generateFakeRecordField).toHaveBeenCalledTimes(2);
    });
    it('should return empty object when no valid fields', ()=>{
        _shouldgeneratefieldfakevalue.shouldGenerateFieldFakeValue.mockReturnValue(false);
        const result = (0, _generateobjectrecordfields.generateObjectRecordFields)({
            objectMetadataInfo: _mockObjectMetadataItemsWithFieldMaps.mockCompanyObjectMetadataInfo
        });
        expect(result).toEqual({});
        expect(_shouldgeneratefieldfakevalue.shouldGenerateFieldFakeValue).toHaveBeenCalledTimes(2);
        expect(_generatefakerecordfield.generateFakeRecordField).not.toHaveBeenCalled();
    });
});

//# sourceMappingURL=generate-object-record-fields.spec.js.map