"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _databaseeventaction = require("../../../../../../engine/api/graphql/graphql-query-runner/enums/database-event-action");
const _mockObjectMetadataItemsWithFieldMaps = require("../../../../../../engine/core-modules/__mocks__/mockObjectMetadataItemsWithFieldMaps");
const _generatefakeobjectrecordevent = require("../generate-fake-object-record-event");
const _generateobjectrecordfields = require("../generate-object-record-fields");
jest.mock('src/modules/workflow/workflow-builder/workflow-schema/utils/generate-object-record-fields');
describe('generateFakeObjectRecordEvent', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    const mockFields = {
        field1: {
            type: 'TEXT',
            value: 'test',
            fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
        },
        field2: {
            type: 'NUMBER',
            value: 123,
            fieldMetadataId: '123e4567-e89b-12d3-a456-426614174001'
        }
    };
    beforeEach(()=>{
        _generateobjectrecordfields.generateObjectRecordFields.mockReturnValue(mockFields);
    });
    it('should generate record with "after" prefix for CREATED action', ()=>{
        const result = (0, _generatefakeobjectrecordevent.generateFakeObjectRecordEvent)(_mockObjectMetadataItemsWithFieldMaps.mockCompanyObjectMetadataInfo, _databaseeventaction.DatabaseEventAction.CREATED);
        expect(result).toEqual({
            object: {
                isLeaf: true,
                icon: 'test-company-icon',
                label: 'Company',
                value: 'A company',
                fieldIdName: 'properties.after.id',
                objectMetadataId: '20202020-c03c-45d6-a4b0-04afe1357c5c'
            },
            fields: {
                'properties.after.field1': {
                    type: 'TEXT',
                    value: 'test',
                    fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
                },
                'properties.after.field2': {
                    type: 'NUMBER',
                    value: 123,
                    fieldMetadataId: '123e4567-e89b-12d3-a456-426614174001'
                }
            },
            _outputSchemaType: 'RECORD'
        });
    });
    it('should generate record with "after" prefix for UPDATED action', ()=>{
        const result = (0, _generatefakeobjectrecordevent.generateFakeObjectRecordEvent)(_mockObjectMetadataItemsWithFieldMaps.mockCompanyObjectMetadataInfo, _databaseeventaction.DatabaseEventAction.UPDATED);
        expect(result).toEqual({
            object: {
                isLeaf: true,
                icon: 'test-company-icon',
                label: 'Company',
                value: 'A company',
                fieldIdName: 'properties.after.id',
                objectMetadataId: '20202020-c03c-45d6-a4b0-04afe1357c5c'
            },
            fields: {
                'properties.after.field1': {
                    type: 'TEXT',
                    value: 'test',
                    fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
                },
                'properties.after.field2': {
                    type: 'NUMBER',
                    value: 123,
                    fieldMetadataId: '123e4567-e89b-12d3-a456-426614174001'
                }
            },
            _outputSchemaType: 'RECORD'
        });
    });
    it('should generate record with "before" prefix for DELETED action', ()=>{
        const result = (0, _generatefakeobjectrecordevent.generateFakeObjectRecordEvent)(_mockObjectMetadataItemsWithFieldMaps.mockCompanyObjectMetadataInfo, _databaseeventaction.DatabaseEventAction.DELETED);
        expect(result).toEqual({
            object: {
                isLeaf: true,
                icon: 'test-company-icon',
                label: 'Company',
                value: 'A company',
                fieldIdName: 'properties.before.id',
                objectMetadataId: '20202020-c03c-45d6-a4b0-04afe1357c5c'
            },
            fields: {
                'properties.before.field1': {
                    type: 'TEXT',
                    value: 'test',
                    fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
                },
                'properties.before.field2': {
                    type: 'NUMBER',
                    value: 123,
                    fieldMetadataId: '123e4567-e89b-12d3-a456-426614174001'
                }
            },
            _outputSchemaType: 'RECORD'
        });
    });
    it('should generate record with "before" prefix for DESTROYED action', ()=>{
        const result = (0, _generatefakeobjectrecordevent.generateFakeObjectRecordEvent)(_mockObjectMetadataItemsWithFieldMaps.mockCompanyObjectMetadataInfo, _databaseeventaction.DatabaseEventAction.DESTROYED);
        expect(result).toEqual({
            object: {
                isLeaf: true,
                icon: 'test-company-icon',
                label: 'Company',
                value: 'A company',
                fieldIdName: 'properties.before.id',
                objectMetadataId: '20202020-c03c-45d6-a4b0-04afe1357c5c'
            },
            fields: {
                'properties.before.field1': {
                    type: 'TEXT',
                    value: 'test',
                    fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
                },
                'properties.before.field2': {
                    type: 'NUMBER',
                    value: 123,
                    fieldMetadataId: '123e4567-e89b-12d3-a456-426614174001'
                }
            },
            _outputSchemaType: 'RECORD'
        });
    });
    it('should generate record with "after" prefix for UPSERTED action', ()=>{
        const result = (0, _generatefakeobjectrecordevent.generateFakeObjectRecordEvent)(_mockObjectMetadataItemsWithFieldMaps.mockCompanyObjectMetadataInfo, _databaseeventaction.DatabaseEventAction.UPSERTED);
        expect(result).toEqual({
            object: {
                isLeaf: true,
                icon: 'test-company-icon',
                label: 'Company',
                value: 'A company',
                fieldIdName: 'properties.after.id',
                objectMetadataId: '20202020-c03c-45d6-a4b0-04afe1357c5c'
            },
            fields: {
                'properties.after.field1': {
                    type: 'TEXT',
                    value: 'test',
                    fieldMetadataId: '123e4567-e89b-12d3-a456-426614174000'
                },
                'properties.after.field2': {
                    type: 'NUMBER',
                    value: 123,
                    fieldMetadataId: '123e4567-e89b-12d3-a456-426614174001'
                }
            },
            _outputSchemaType: 'RECORD'
        });
    });
    it('should throw error for unknown action', ()=>{
        expect(()=>{
            (0, _generatefakeobjectrecordevent.generateFakeObjectRecordEvent)(_mockObjectMetadataItemsWithFieldMaps.mockCompanyObjectMetadataInfo, 'UNKNOWN');
        }).toThrow("Unknown action 'UNKNOWN'");
    });
});

//# sourceMappingURL=generate-fake-object-record-event.spec.js.map