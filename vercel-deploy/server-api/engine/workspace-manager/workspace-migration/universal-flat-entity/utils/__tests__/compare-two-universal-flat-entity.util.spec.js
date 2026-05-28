"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _extractrecordidsanddatesasexpectany = require("test/utils/extract-record-ids-and-dates-as-expect-any");
const _testing = require("twenty-shared/testing");
const _types = require("twenty-shared/types");
const _getflatfieldmetadatamock = require("../../../../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _comparetwouniversalflatentityutil = require("../compare-two-universal-flat-entity.util");
describe('compareTwoFlatEntity', ()=>{
    const testCases = [
        {
            title: 'It should detect flat field metadata isActive diff from true to false',
            context: {
                fromUniversalFlatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                    objectMetadataId: 'object-metadata-id',
                    type: _types.FieldMetadataType.TEXT,
                    universalIdentifier: 'universal-identifier',
                    isActive: true
                }),
                metadataName: 'fieldMetadata',
                toUniversalFlatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                    objectMetadataId: 'object-metadata-id',
                    type: _types.FieldMetadataType.TEXT,
                    universalIdentifier: 'universal-identifier',
                    isActive: false
                })
            }
        },
        {
            title: 'It should detect flat field metadata isActive diff from true to false',
            context: {
                fromUniversalFlatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                    objectMetadataId: 'object-metadata-id',
                    type: _types.FieldMetadataType.TEXT,
                    universalIdentifier: 'universal-identifier',
                    isActive: false
                }),
                metadataName: 'fieldMetadata',
                toUniversalFlatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                    objectMetadataId: 'object-metadata-id',
                    type: _types.FieldMetadataType.TEXT,
                    universalIdentifier: 'universal-identifier',
                    isActive: true
                })
            }
        }
    ];
    test.each((0, _testing.eachTestingContextFilter)(testCases))('$title', ({ context: { metadataName, fromUniversalFlatEntity, toUniversalFlatEntity } })=>{
        const result = (0, _comparetwouniversalflatentityutil.compareTwoFlatEntity)({
            fromUniversalFlatEntity,
            toUniversalFlatEntity,
            metadataName
        });
        expect(result).toMatchSnapshot((0, _extractrecordidsanddatesasexpectany.extractRecordIdsAndDatesAsExpectAny)({
            ...result
        }));
    });
});

//# sourceMappingURL=compare-two-universal-flat-entity.util.spec.js.map