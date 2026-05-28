"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getflatfieldmetadatamock = require("../../../../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _getflatobjectmetadatamock = require("../../../../../metadata-modules/flat-object-metadata/__mocks__/get-flat-object-metadata.mock");
const _resetuniversalflatentityforeignkeyaggregatorsutil = require("../reset-universal-flat-entity-foreign-key-aggregators.util");
describe('resetUniversalFlatEntityForeignKeyAggregators', ()=>{
    it('should reset aggregator properties to empty arrays for objectMetadata', ()=>{
        const objectMetadata = (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
            universalIdentifier: 'object-1',
            fieldUniversalIdentifiers: [
                'field-1',
                'field-2'
            ],
            viewUniversalIdentifiers: [
                'view-1'
            ],
            indexMetadataUniversalIdentifiers: [
                'index-1'
            ]
        });
        const result = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.resetUniversalFlatEntityForeignKeyAggregators)({
            universalFlatEntity: objectMetadata,
            metadataName: 'objectMetadata'
        });
        expect(result).toMatchObject({
            fieldUniversalIdentifiers: [],
            viewUniversalIdentifiers: [],
            indexMetadataUniversalIdentifiers: []
        });
    });
    it('should reset aggregator properties to empty arrays for fieldMetadata', ()=>{
        const fieldMetadata = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            universalIdentifier: 'field-1',
            objectMetadataId: 'object-1',
            type: _types.FieldMetadataType.TEXT,
            viewFieldUniversalIdentifiers: [
                'vf-1'
            ],
            viewFilterUniversalIdentifiers: [
                'filter-1'
            ]
        });
        const result = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.resetUniversalFlatEntityForeignKeyAggregators)({
            universalFlatEntity: fieldMetadata,
            metadataName: 'fieldMetadata'
        });
        expect(result).toMatchObject({
            viewFieldUniversalIdentifiers: [],
            viewFilterUniversalIdentifiers: [],
            calendarViewUniversalIdentifiers: [],
            kanbanAggregateOperationViewUniversalIdentifiers: [],
            mainGroupByFieldMetadataViewUniversalIdentifiers: []
        });
    });
});

//# sourceMappingURL=reset-universal-flat-entity-foreign-key-aggregators.util.spec.js.map