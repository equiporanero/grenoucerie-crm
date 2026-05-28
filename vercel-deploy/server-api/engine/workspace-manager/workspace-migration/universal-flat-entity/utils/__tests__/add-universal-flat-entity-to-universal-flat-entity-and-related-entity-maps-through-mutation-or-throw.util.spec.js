"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _flatentitymapsexception = require("../../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _adduniversalflatentitytouniversalflatentityandrelatedentitymapsthroughmutationorthrowutil = require("../add-universal-flat-entity-to-universal-flat-entity-and-related-entity-maps-through-mutation-or-throw.util");
const _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil = require("../add-universal-flat-entity-to-universal-flat-entity-maps-through-mutation-or-throw.util");
const createEmptyUniversalFlatEntityMaps = ()=>({
        byUniversalIdentifier: {}
    });
describe('addUniversalFlatEntityToUniversalFlatEntityAndRelatedEntityMapsThroughMutationOrThrow', ()=>{
    it('should add a view and update related objectMetadata with viewUniversalIdentifier', ()=>{
        const objectMetadataUniversalIdentifier = 'object-universal-1';
        const fieldMetadataUniversalIdentifier = 'field-universal-1';
        const viewUniversalIdentifier = 'view-universal-1';
        const applicationUniversalIdentifier = '20202020-f3ad-452e-b5b6-2d49d3ea88b1';
        const mockUniversalObjectMetadata = {
            universalIdentifier: objectMetadataUniversalIdentifier,
            viewUniversalIdentifiers: [],
            fieldUniversalIdentifiers: [],
            indexMetadataUniversalIdentifiers: [],
            description: 'default flat object metadata description',
            icon: 'icon',
            isActive: true,
            isAuditLogged: true,
            isCustom: true,
            isLabelSyncedWithName: false,
            isRemote: false,
            isSearchable: true,
            isSystem: false,
            isUIReadOnly: false,
            labelPlural: 'default flat object metadata label plural',
            labelSingular: 'default flat object metadata label singular',
            namePlural: 'defaultflatObjectMetadataNamePlural',
            nameSingular: 'defaultflatObjectMetadataNameSingular',
            shortcut: 'shortcut',
            standardOverrides: null,
            targetTableName: '',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            duplicateCriteria: null,
            applicationUniversalIdentifier,
            labelIdentifierFieldMetadataUniversalIdentifier: '20202020-1a62-405c-87fa-4d4fd215851b',
            imageIdentifierFieldMetadataUniversalIdentifier: '20202020-9d65-415f-b0e1-216a2e257ea4'
        };
        const mockUniversalFieldMetadata = {
            universalIdentifier: fieldMetadataUniversalIdentifier,
            objectMetadataUniversalIdentifier,
            type: _types.FieldMetadataType.DATE,
            applicationUniversalIdentifier,
            viewFieldUniversalIdentifiers: [],
            viewFilterUniversalIdentifiers: [],
            calendarViewUniversalIdentifiers: [],
            mainGroupByFieldMetadataViewUniversalIdentifiers: [],
            kanbanAggregateOperationViewUniversalIdentifiers: [],
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            defaultValue: null,
            options: null,
            morphId: null,
            settings: null,
            universalSettings: null,
            description: 'default flat field metadata description',
            icon: 'icon',
            isActive: true,
            isCustom: true,
            name: 'flatFieldMetadataName',
            label: 'flat field metadata label',
            isNullable: true,
            isUnique: false,
            isUIReadOnly: false,
            isLabelSyncedWithName: false,
            isSystem: false,
            standardOverrides: null,
            relationTargetObjectMetadataUniversalIdentifier: null,
            relationTargetFieldMetadataUniversalIdentifier: null
        };
        const mockUniversalView = {
            universalIdentifier: viewUniversalIdentifier,
            objectMetadataUniversalIdentifier,
            viewFieldUniversalIdentifiers: [],
            viewFilterUniversalIdentifiers: [],
            viewGroupUniversalIdentifiers: [],
            applicationUniversalIdentifier,
            calendarFieldMetadataUniversalIdentifier: fieldMetadataUniversalIdentifier,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            name: 'Test View',
            type: 'table',
            icon: 'IconList',
            isCompact: false,
            position: 0,
            key: null,
            kanbanFieldMetadataUniversalIdentifier: null,
            kanbanAggregateOperationFieldMetadataUniversalIdentifier: null,
            kanbanAggregateOperation: null,
            mainGroupByFieldMetadataUniversalIdentifier: null,
            viewFilterGroupUniversalIdentifiers: [],
            rowLevelPermissionPredicateGroupUniversalIdentifiers: []
        };
        const flatObjectMetadataMaps = createEmptyUniversalFlatEntityMaps();
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: mockUniversalObjectMetadata,
            universalFlatEntityMapsToMutate: flatObjectMetadataMaps
        });
        const flatFieldMetadataMaps = createEmptyUniversalFlatEntityMaps();
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: mockUniversalFieldMetadata,
            universalFlatEntityMapsToMutate: flatFieldMetadataMaps
        });
        const universalFlatEntityAndRelatedMapsToMutate = {
            flatFieldMetadataMaps,
            flatObjectMetadataMaps,
            flatViewMaps: createEmptyUniversalFlatEntityMaps()
        };
        (0, _adduniversalflatentitytouniversalflatentityandrelatedentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
            metadataName: 'view',
            universalFlatEntity: mockUniversalView,
            universalFlatEntityAndRelatedMapsToMutate
        });
        expect((0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: viewUniversalIdentifier,
            flatEntityMaps: universalFlatEntityAndRelatedMapsToMutate.flatViewMaps
        })).toMatchObject({
            universalIdentifier: viewUniversalIdentifier
        });
        const updatedObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: objectMetadataUniversalIdentifier,
            flatEntityMaps: universalFlatEntityAndRelatedMapsToMutate.flatObjectMetadataMaps
        });
        expect(updatedObjectMetadata).toMatchObject({
            viewUniversalIdentifiers: [
                viewUniversalIdentifier
            ]
        });
        const updatedFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: fieldMetadataUniversalIdentifier,
            flatEntityMaps: universalFlatEntityAndRelatedMapsToMutate.flatFieldMetadataMaps
        });
        expect(updatedFieldMetadata).toMatchObject({
            calendarViewUniversalIdentifiers: [
                viewUniversalIdentifier
            ]
        });
    });
    it('should throw when related entity is not found', ()=>{
        const viewUniversalIdentifier = 'view-universal-1';
        const nonExistentObjectMetadataUniversalIdentifier = 'non-existent-object-universal';
        const applicationUniversalIdentifier = '20202020-f3ad-452e-b5b6-2d49d3ea88b1';
        const mockUniversalView = {
            universalIdentifier: viewUniversalIdentifier,
            objectMetadataUniversalIdentifier: nonExistentObjectMetadataUniversalIdentifier,
            viewFieldUniversalIdentifiers: [],
            viewFilterUniversalIdentifiers: [],
            viewGroupUniversalIdentifiers: [],
            applicationUniversalIdentifier,
            calendarFieldMetadataUniversalIdentifier: null,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
            name: 'Test View',
            type: 'table',
            icon: 'IconList',
            isCompact: false,
            position: 0,
            key: null,
            kanbanFieldMetadataUniversalIdentifier: null,
            kanbanAggregateOperationFieldMetadataUniversalIdentifier: null,
            kanbanAggregateOperation: null,
            mainGroupByFieldMetadataUniversalIdentifier: null,
            viewFilterGroupUniversalIdentifiers: [],
            rowLevelPermissionPredicateGroupUniversalIdentifiers: []
        };
        const universalFlatEntityAndRelatedMapsToMutate = {
            flatFieldMetadataMaps: createEmptyUniversalFlatEntityMaps(),
            flatObjectMetadataMaps: createEmptyUniversalFlatEntityMaps(),
            flatViewMaps: createEmptyUniversalFlatEntityMaps()
        };
        expect(()=>(0, _adduniversalflatentitytouniversalflatentityandrelatedentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
                metadataName: 'view',
                universalFlatEntity: mockUniversalView,
                universalFlatEntityAndRelatedMapsToMutate
            })).toThrow(new _flatentitymapsexception.FlatEntityMapsException(`Could not find flat entity with universal identifier ${nonExistentObjectMetadataUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND));
    });
});

//# sourceMappingURL=add-universal-flat-entity-to-universal-flat-entity-and-related-entity-maps-through-mutation-or-throw.util.spec.js.map