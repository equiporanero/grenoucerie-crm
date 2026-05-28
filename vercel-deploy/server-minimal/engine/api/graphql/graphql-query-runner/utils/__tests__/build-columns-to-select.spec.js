"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _relationtypeinterface = require("../../../../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _buildcolumnstoselect = require("../build-columns-to-select");
describe('buildColumnsToSelect', ()=>{
    const workspaceId = '20202020-1c25-4d02-bf25-6aeccf7ea419';
    const personObjectId = 'a55d8cad-4c3d-4c8a-82b5-539a36de5605';
    const companyObjectId = '9af20778-2f2c-4e22-ae83-2e77e479b57c';
    const nameFieldId = '92414583-c6a6-4c98-bae7-6ce318bd3423';
    const companyFieldId = '30dc1370-bb1a-42e3-abbc-a40edf1c6796';
    const createMockField = (overrides)=>({
            workspaceId,
            isNullable: true,
            isLabelSyncedWithName: true,
            createdAt: new Date('2025-07-10T10:58:54.536Z'),
            updatedAt: new Date('2025-07-10T10:58:54.536Z'),
            universalIdentifier: overrides.id,
            viewFieldIds: [],
            viewFilterIds: [],
            kanbanAggregateOperationViewIds: [],
            calendarViewIds: [],
            applicationId: null,
            label: overrides.name,
            isCustom: false,
            isActive: true,
            isSystem: false,
            isUnique: false,
            ...overrides
        });
    const nameField = createMockField({
        id: nameFieldId,
        type: _types.FieldMetadataType.FULL_NAME,
        name: 'name',
        label: 'Name',
        objectMetadataId: personObjectId,
        defaultValue: {
            lastName: "''",
            firstName: "''"
        },
        description: "Contact's name",
        icon: 'IconUser'
    });
    const companyRelationField = createMockField({
        id: companyFieldId,
        type: _types.FieldMetadataType.RELATION,
        name: 'company',
        label: 'Company',
        objectMetadataId: personObjectId,
        defaultValue: null,
        description: "Contact's company",
        icon: 'IconBuildingSkyscraper',
        settings: {
            relationType: _relationtypeinterface.RelationType.MANY_TO_ONE,
            joinColumnName: 'companyId'
        },
        relationTargetFieldMetadataId: '83cd9e7f-dfbc-4b93-a0a7-4c04b76d2009',
        relationTargetObjectMetadataId: companyObjectId
    });
    const buildMockFlatObjectMetadata = (fieldIds)=>({
            id: personObjectId,
            standardId: '20202020-e674-48e5-a542-72570eee7213',
            nameSingular: 'person',
            namePlural: 'people',
            labelSingular: 'Person',
            labelPlural: 'People',
            description: 'A person',
            icon: 'IconUser',
            targetTableName: 'DEPRECATED',
            isCustom: false,
            isRemote: false,
            isActive: true,
            isSystem: false,
            isAuditLogged: true,
            isSearchable: true,
            duplicateCriteria: [
                [
                    'nameFirstName',
                    'nameLastName'
                ],
                [
                    'linkedinLinkPrimaryLinkUrl'
                ],
                [
                    'emailsPrimaryEmail'
                ]
            ],
            shortcut: 'P',
            labelIdentifierFieldMetadataId: nameFieldId,
            imageIdentifierFieldMetadataId: '6bfcecc4-1866-4254-ba6b-6f22246819bb',
            isLabelSyncedWithName: false,
            workspaceId,
            createdAt: new Date('2025-07-10T10:58:54.536Z'),
            updatedAt: new Date('2025-07-10T10:58:54.536Z'),
            universalIdentifier: personObjectId,
            fieldIds: fieldIds,
            indexMetadataIds: [],
            viewIds: [],
            applicationId: null
        });
    const buildFlatFieldMetadataMaps = (fields)=>({
            byUniversalIdentifier: fields.reduce((acc, field)=>{
                acc[field.universalIdentifier] = field;
                return acc;
            }, {}),
            universalIdentifierById: fields.reduce((acc, field)=>{
                acc[field.id] = field.universalIdentifier;
                return acc;
            }, {}),
            universalIdentifiersByApplicationId: {}
        });
    const buildFlatObjectMetadataMaps = (objects)=>({
            byUniversalIdentifier: objects.reduce((acc, obj)=>{
                acc[obj.universalIdentifier] = obj;
                return acc;
            }, {}),
            universalIdentifierById: objects.reduce((acc, obj)=>{
                if (obj.universalIdentifier) {
                    acc[obj.id] = obj.universalIdentifier;
                }
                return acc;
            }, {}),
            universalIdentifiersByApplicationId: {}
        });
    const companyObjectMetadata = {
        id: companyObjectId,
        nameSingular: 'company',
        namePlural: 'companies',
        fieldIds: [],
        indexMetadataIds: [],
        viewIds: []
    };
    it('should build columns to select with relation fields', ()=>{
        const flatObjectMetadata = buildMockFlatObjectMetadata([
            nameFieldId,
            companyFieldId
        ]);
        const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
            nameField,
            companyRelationField
        ]);
        const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
            flatObjectMetadata,
            companyObjectMetadata
        ]);
        const select = {
            nameFirstName: true,
            company: {
                id: true,
                name: true
            }
        };
        const relations = {
            company: {}
        };
        const result = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select,
            relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toEqual({
            nameFirstName: true,
            companyId: true,
            id: true
        });
    });
    it('should build columns to select without relation fields', ()=>{
        const flatObjectMetadata = buildMockFlatObjectMetadata([
            nameFieldId,
            companyFieldId
        ]);
        const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
            nameField,
            companyRelationField
        ]);
        const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
            flatObjectMetadata,
            companyObjectMetadata
        ]);
        const select = {
            nameFirstName: true,
            nameLastName: true
        };
        const relations = {};
        const result = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select,
            relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toEqual({
            nameFirstName: true,
            nameLastName: true,
            id: true
        });
    });
    it('should filter out non-boolean values from select', ()=>{
        const flatObjectMetadata = buildMockFlatObjectMetadata([
            nameFieldId,
            companyFieldId
        ]);
        const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
            nameField,
            companyRelationField
        ]);
        const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
            flatObjectMetadata,
            companyObjectMetadata
        ]);
        const select = {
            nameFirstName: true,
            nameLastName: false,
            company: {
                id: true
            }
        };
        const relations = {};
        const result = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select,
            relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toEqual({
            nameFirstName: true,
            id: true
        });
    });
    it('should handle relation field that is not a relation type', ()=>{
        const flatObjectMetadata = buildMockFlatObjectMetadata([
            nameFieldId,
            companyFieldId
        ]);
        const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
            nameField,
            companyRelationField
        ]);
        const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
            flatObjectMetadata,
            companyObjectMetadata
        ]);
        const select = {
            nameFirstName: true
        };
        const relations = {
            name: {}
        };
        const result = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select,
            relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toEqual({
            nameFirstName: true,
            id: true
        });
    });
    it('should handle relation field that is not MANY_TO_ONE', ()=>{
        const oneToManyCompanyField = createMockField({
            id: companyFieldId,
            type: _types.FieldMetadataType.RELATION,
            name: 'company',
            label: 'Company',
            objectMetadataId: personObjectId,
            defaultValue: null,
            settings: {
                relationType: _relationtypeinterface.RelationType.ONE_TO_MANY,
                joinColumnName: 'companyId'
            },
            relationTargetObjectMetadataId: companyObjectId
        });
        const flatObjectMetadata = buildMockFlatObjectMetadata([
            nameFieldId,
            companyFieldId
        ]);
        const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
            nameField,
            oneToManyCompanyField
        ]);
        const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
            flatObjectMetadata,
            companyObjectMetadata
        ]);
        const select = {
            nameFirstName: true
        };
        const relations = {
            company: {}
        };
        const result = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select,
            relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        expect(result).toEqual({
            nameFirstName: true,
            id: true
        });
    });
});

//# sourceMappingURL=build-columns-to-select.spec.js.map