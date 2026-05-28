"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _createemptyflatentitymapsconstant = require("../../constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../add-flat-entity-to-flat-entity-maps-or-throw.util");
const _deleteflatentityfromflatentityandrelatedentitymapsthroughmutationorthrowutil = require("../delete-flat-entity-from-flat-entity-and-related-entity-maps-through-mutation-or-throw.util");
const _findflatentitybyuniversalidentifierutil = require("../find-flat-entity-by-universal-identifier.util");
const _getflatfieldmetadatamock = require("../../../flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _getflatobjectmetadatamock = require("../../../flat-object-metadata/__mocks__/get-flat-object-metadata.mock");
describe('deleteFlatEntityFromFlatEntityAndRelatedEntityMapsThroughMutationOrThrow', ()=>{
    it('should delete a view and update related objectMetadata and fieldMetadata by removing both id and universal identifier aggregators', ()=>{
        const objectMetadataId = 'object-1';
        const viewId = 'view-1';
        const applicationId = '20202020-f3ad-452e-b5b6-2d49d3ea88b1';
        const workspaceId = '20202020-bc64-4148-8a79-b3144f743694';
        const objectUniversalIdentifier = 'object-universal-1';
        const fieldUniversalIdentifier = 'field-universal-1';
        const viewUniversalIdentifier = 'view-universal-1';
        const mockObjectMetadata = (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
            id: objectMetadataId,
            universalIdentifier: objectUniversalIdentifier,
            viewIds: [
                viewId,
                'something-else'
            ],
            viewUniversalIdentifiers: [
                viewUniversalIdentifier,
                'something-else-ui'
            ],
            fieldIds: [],
            workspaceId,
            imageIdentifierFieldMetadataId: '20202020-9d65-415f-b0e1-216a2e257ea4',
            labelIdentifierFieldMetadataId: '20202020-1a62-405c-87fa-4d4fd215851b',
            applicationId
        });
        const mockFieldMetadata = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            objectMetadataId,
            id: '20202020-4087-423b-852a-91f91acf2df2',
            type: _types.FieldMetadataType.DATE,
            universalIdentifier: fieldUniversalIdentifier,
            viewFieldIds: [],
            viewFilterIds: [],
            workspaceId,
            calendarViewIds: [
                viewId
            ],
            calendarViewUniversalIdentifiers: [
                viewUniversalIdentifier
            ],
            mainGroupByFieldMetadataViewIds: [],
            applicationId
        });
        const mockView = {
            id: viewId,
            universalIdentifier: viewUniversalIdentifier,
            objectMetadataId: objectMetadataId,
            objectMetadataUniversalIdentifier: objectUniversalIdentifier,
            viewFieldIds: [],
            viewFilterIds: [],
            viewGroupIds: [],
            workspaceId,
            calendarFieldMetadataId: mockFieldMetadata.id,
            calendarFieldMetadataUniversalIdentifier: fieldUniversalIdentifier,
            createdAt: new Date('2024-01-01').toISOString(),
            updatedAt: new Date('2024-01-01').toISOString(),
            icon: 'icon',
            isCompact: false,
            name: 'View Name',
            position: 0,
            applicationId
        };
        const flatEntityAndRelatedMapsToMutate = {
            flatFieldMetadataMaps: (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                flatEntity: mockFieldMetadata,
                flatEntityMaps: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)()
            }),
            flatObjectMetadataMaps: (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                flatEntity: mockObjectMetadata,
                flatEntityMaps: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)()
            }),
            flatViewMaps: (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                flatEntity: mockView,
                flatEntityMaps: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)()
            })
        };
        (0, _deleteflatentityfromflatentityandrelatedentitymapsthroughmutationorthrowutil.deleteFlatEntityFromFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
            metadataName: 'view',
            flatEntity: mockView,
            flatEntityAndRelatedMapsToMutate
        });
        expect((0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: viewUniversalIdentifier,
            flatEntityMaps: flatEntityAndRelatedMapsToMutate.flatViewMaps
        })).toBeUndefined();
        expect((0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: objectUniversalIdentifier,
            flatEntityMaps: flatEntityAndRelatedMapsToMutate.flatObjectMetadataMaps
        })).toMatchObject({
            viewIds: [
                'something-else'
            ],
            viewUniversalIdentifiers: [
                'something-else-ui'
            ]
        });
        expect((0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: fieldUniversalIdentifier,
            flatEntityMaps: flatEntityAndRelatedMapsToMutate.flatFieldMetadataMaps
        })).toMatchObject({
            calendarViewIds: [],
            calendarViewUniversalIdentifiers: []
        });
    });
});

//# sourceMappingURL=delete-flat-entity-from-flat-entity-and-related-entity-maps-through-mutation-or-throw.spec.js.map