"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _mockObjectMetadataItemsWithFieldMaps = require("../../../../../../engine/core-modules/__mocks__/mockObjectMetadataItemsWithFieldMaps");
const _generatefakeformresponse = require("../generate-fake-form-response");
describe('generateFakeFormResponse', ()=>{
    it('should generate fake responses for a form schema', async ()=>{
        const formFieldMetadataItems = [
            {
                id: '96939213-49ac-4dee-949d-56e6c7be98e6',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                label: 'Name'
            },
            {
                id: '96939213-49ac-4dee-949d-56e6c7be98e7',
                name: 'age',
                type: _types.FieldMetadataType.NUMBER,
                label: 'Age'
            },
            {
                id: '96939213-49ac-4dee-949d-56e6c7be98e8',
                name: 'company',
                type: 'RECORD',
                label: 'Company',
                settings: {
                    objectName: 'company'
                }
            },
            {
                id: '96939213-49ac-4dee-949d-56e6c7be98e9',
                name: 'date',
                type: _types.FieldMetadataType.DATE,
                label: 'Date',
                placeholder: 'mm/dd/yyyy'
            }
        ];
        const result = (0, _generatefakeformresponse.generateFakeFormResponse)({
            formFieldMetadataItems,
            flatObjectMetadataMaps: _mockObjectMetadataItemsWithFieldMaps.mockFlatObjectMetadataMaps,
            flatFieldMetadataMaps: _mockObjectMetadataItemsWithFieldMaps.mockFlatFieldMetadataMaps,
            objectIdByNameSingular: _mockObjectMetadataItemsWithFieldMaps.mockObjectIdByNameSingular
        });
        expect(result).toEqual({
            age: {
                isLeaf: true,
                label: 'Age',
                type: 'NUMBER',
                value: 20
            },
            company: {
                isLeaf: false,
                label: 'Company',
                value: {
                    _outputSchemaType: 'RECORD',
                    fields: {
                        domainName: {
                            fieldMetadataId: 'domainNameFieldMetadataId',
                            icon: 'test-field-icon',
                            isLeaf: false,
                            label: 'Domain Name',
                            type: 'LINKS',
                            value: {
                                primaryLinkLabel: {
                                    fieldMetadataId: 'domainNameFieldMetadataId',
                                    isCompositeSubField: true,
                                    isLeaf: true,
                                    label: 'Primary Link Label',
                                    type: 'TEXT',
                                    value: 'My text'
                                },
                                primaryLinkUrl: {
                                    fieldMetadataId: 'domainNameFieldMetadataId',
                                    isCompositeSubField: true,
                                    isLeaf: true,
                                    label: 'Primary Link Url',
                                    type: 'TEXT',
                                    value: 'My text'
                                },
                                secondaryLinks: {
                                    fieldMetadataId: 'domainNameFieldMetadataId',
                                    isCompositeSubField: true,
                                    isLeaf: true,
                                    label: 'Secondary Links',
                                    type: 'RAW_JSON',
                                    value: null
                                }
                            }
                        },
                        name: {
                            fieldMetadataId: 'nameFieldMetadataId-company',
                            icon: 'test-field-icon',
                            isLeaf: true,
                            label: 'Name',
                            type: 'TEXT',
                            value: 'My text'
                        }
                    },
                    object: {
                        fieldIdName: 'id',
                        icon: 'test-company-icon',
                        isLeaf: true,
                        label: 'Company',
                        objectMetadataId: '20202020-c03c-45d6-a4b0-04afe1357c5c',
                        value: 'A company'
                    }
                }
            },
            date: {
                isLeaf: true,
                label: 'Date',
                type: 'DATE',
                value: 'mm/dd/yyyy'
            },
            name: {
                isLeaf: true,
                label: 'Name',
                type: 'TEXT',
                value: 'My text'
            }
        });
    });
});

//# sourceMappingURL=generate-fake-form-response.spec.js.map