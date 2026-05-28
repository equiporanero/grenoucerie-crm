"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getflatobjectmetadatamock = require("../../../../../metadata-modules/flat-object-metadata/__mocks__/get-flat-object-metadata.mock");
const _deleteuniversalflatentityforeignkeyaggregatorsutil = require("../delete-universal-flat-entity-foreign-key-aggregators.util");
describe('deleteUniversalFlatEntityForeignKeyAggregators', ()=>{
    it('should delete all aggregator keys from the entity', ()=>{
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
        const result = (0, _deleteuniversalflatentityforeignkeyaggregatorsutil.deleteUniversalFlatEntityForeignKeyAggregators)({
            universalFlatEntity: objectMetadata,
            metadataName: 'objectMetadata'
        });
        expect(result).not.toHaveProperty('fieldUniversalIdentifiers');
        expect(result).not.toHaveProperty('viewUniversalIdentifiers');
        expect(result).not.toHaveProperty('indexMetadataUniversalIdentifiers');
        expect(result.universalIdentifier).toBe('object-1');
    });
    it('should return the same reference for metadata with no aggregators', ()=>{
        const entity = (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
            universalIdentifier: 'logic-1'
        });
        const result = (0, _deleteuniversalflatentityforeignkeyaggregatorsutil.deleteUniversalFlatEntityForeignKeyAggregators)({
            universalFlatEntity: entity,
            metadataName: 'logicFunction'
        });
        expect(result).toBe(entity);
    });
});

//# sourceMappingURL=delete-universal-flat-entity-foreign-key-aggregators.util.spec.js.map