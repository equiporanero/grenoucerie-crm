"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _commonselectfieldshelper = require("../../../../common/common-select-fields/common-select-fields-helper");
const _maxdepthconstant = require("../../../input-request-parsers/constants/max-depth.constant");
const _createemptyflatentitymapsconstant = require("../../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
describe('RestToCommonSelectedFieldsHandler', ()=>{
    let handler;
    const createMockField = (overrides)=>({
            workspaceId: 'workspace-id',
            isNullable: true,
            isLabelSyncedWithName: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            universalIdentifier: overrides.id,
            viewFieldIds: [],
            viewFilterIds: [],
            kanbanAggregateOperationViewIds: [],
            calendarViewIds: [],
            applicationId: null,
            label: overrides.name,
            settings: null,
            relationTargetObjectMetadataId: null,
            relationTargetFieldMetadataId: null,
            ...overrides
        });
    const createMockObjectMetadata = (overrides)=>({
            workspaceId: 'workspace-id',
            namePlural: `${overrides.nameSingular}s`,
            labelSingular: overrides.nameSingular,
            labelPlural: `${overrides.nameSingular}s`,
            isCustom: false,
            isRemote: false,
            isActive: true,
            isSystem: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            universalIdentifier: overrides.id,
            indexMetadataIds: [],
            viewIds: [],
            applicationId: null,
            labelIdentifierFieldMetadataId: null,
            imageIdentifierFieldMetadataId: null,
            ...overrides
        });
    const buildFlatFieldMetadataMaps = (fields)=>fields.reduce((maps, field)=>(0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                flatEntity: field,
                flatEntityMaps: maps
            }), (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)());
    const buildFlatObjectMetadataMaps = (objects)=>objects.reduce((maps, object)=>(0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                flatEntity: object,
                flatEntityMaps: maps
            }), (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)());
    const createObjectsPermissions = (objectIds, options = {})=>{
        return objectIds.reduce((acc, objectId)=>{
            acc[objectId] = {
                canReadObjectRecords: true,
                canUpdateObjectRecords: true,
                canSoftDeleteObjectRecords: true,
                canDestroyObjectRecords: true,
                restrictedFields: options.restrictedFields || {},
                rowLevelPermissionPredicates: [],
                rowLevelPermissionPredicateGroups: []
            };
            return acc;
        }, {});
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _commonselectfieldshelper.CommonSelectFieldsHelper
            ]
        }).compile();
        handler = module.get(_commonselectfieldshelper.CommonSelectFieldsHelper);
    });
    describe('computeFromDepth', ()=>{
        it('should return all selectable fields when depth is undefined', ()=>{
            const nameField = createMockField({
                id: 'field-1',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'person-id'
            });
            const emailField = createMockField({
                id: 'field-2',
                name: 'email',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'person-id'
            });
            const personObject = createMockObjectMetadata({
                id: 'person-id',
                nameSingular: 'person',
                fieldIds: [
                    'field-1',
                    'field-2'
                ]
            });
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
                nameField,
                emailField
            ]);
            const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
                personObject
            ]);
            const result = handler.computeFromDepth({
                objectsPermissions: createObjectsPermissions([
                    'person-id'
                ]),
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatObjectMetadata: personObject,
                depth: undefined
            });
            expect(result).toEqual({
                name: true,
                email: true
            });
        });
        it('should include relation fields when depth is 1', ()=>{
            const nameField = createMockField({
                id: 'field-1',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'person-id'
            });
            const companyRelationField = createMockField({
                id: 'field-2',
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                objectMetadataId: 'person-id',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    joinColumnName: 'companyId'
                },
                relationTargetObjectMetadataId: 'company-id'
            });
            const companyNameField = createMockField({
                id: 'field-3',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'company-id'
            });
            const personObject = createMockObjectMetadata({
                id: 'person-id',
                nameSingular: 'person',
                fieldIds: [
                    'field-1',
                    'field-2'
                ]
            });
            const companyObject = createMockObjectMetadata({
                id: 'company-id',
                nameSingular: 'company',
                fieldIds: [
                    'field-3'
                ]
            });
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
                nameField,
                companyRelationField,
                companyNameField
            ]);
            const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
                personObject,
                companyObject
            ]);
            const result = handler.computeFromDepth({
                objectsPermissions: createObjectsPermissions([
                    'person-id',
                    'company-id'
                ]),
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatObjectMetadata: personObject,
                depth: 1
            });
            expect(result).toEqual({
                name: true,
                companyId: true,
                company: {
                    name: true
                }
            });
        });
        it('should respect restricted fields in related objects', ()=>{
            const companyRelationField = createMockField({
                id: 'field-1',
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                objectMetadataId: 'person-id',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                },
                relationTargetObjectMetadataId: 'company-id'
            });
            const companyNameField = createMockField({
                id: 'field-2',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'company-id'
            });
            const companySecretField = createMockField({
                id: 'field-3',
                name: 'secret',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'company-id'
            });
            const personObject = createMockObjectMetadata({
                id: 'person-id',
                nameSingular: 'person',
                fieldIds: [
                    'field-1'
                ]
            });
            const companyObject = createMockObjectMetadata({
                id: 'company-id',
                nameSingular: 'company',
                fieldIds: [
                    'field-2',
                    'field-3'
                ]
            });
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
                companyRelationField,
                companyNameField,
                companySecretField
            ]);
            const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
                personObject,
                companyObject
            ]);
            const objectsPermissions = createObjectsPermissions([
                'person-id',
                'company-id'
            ]);
            objectsPermissions['company-id'].restrictedFields = {
                'field-3': {
                    canRead: false,
                    canUpdate: false
                }
            };
            const result = handler.computeFromDepth({
                objectsPermissions,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatObjectMetadata: personObject,
                depth: 1
            });
            expect(result).toEqual({
                company: {
                    name: true
                }
            });
        });
        it('should not include relation if all fields are restricted', ()=>{
            const companyRelationField = createMockField({
                id: 'field-1',
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                objectMetadataId: 'person-id',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                },
                relationTargetObjectMetadataId: 'company-id'
            });
            const companyNameField = createMockField({
                id: 'field-2',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'company-id'
            });
            const personObject = createMockObjectMetadata({
                id: 'person-id',
                nameSingular: 'person',
                fieldIds: [
                    'field-1'
                ]
            });
            const companyObject = createMockObjectMetadata({
                id: 'company-id',
                nameSingular: 'company',
                fieldIds: [
                    'field-2'
                ]
            });
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
                companyRelationField,
                companyNameField
            ]);
            const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
                personObject,
                companyObject
            ]);
            const objectsPermissions = createObjectsPermissions([
                'person-id',
                'company-id'
            ]);
            objectsPermissions['company-id'].restrictedFields = {
                'field-2': {
                    canRead: false,
                    canUpdate: false
                }
            };
            const result = handler.computeFromDepth({
                objectsPermissions,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatObjectMetadata: personObject,
                depth: 1
            });
            // ONE_TO_MANY relations are included as regular boolean fields
            expect(result).toEqual({
                company: true
            });
        });
        it('should handle nested relations up to MAX_DEPTH', ()=>{
            const personCompanyRelation = createMockField({
                id: 'field-1',
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                objectMetadataId: 'person-id',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE
                },
                relationTargetObjectMetadataId: 'company-id'
            });
            const companyNameField = createMockField({
                id: 'field-2',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'company-id'
            });
            const companyPeopleRelation = createMockField({
                id: 'field-3',
                name: 'people',
                type: _types.FieldMetadataType.RELATION,
                objectMetadataId: 'company-id',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                },
                relationTargetObjectMetadataId: 'person-id'
            });
            const personNameField = createMockField({
                id: 'field-4',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'person-id'
            });
            const personObject = createMockObjectMetadata({
                id: 'person-id',
                nameSingular: 'person',
                fieldIds: [
                    'field-1',
                    'field-4'
                ]
            });
            const companyObject = createMockObjectMetadata({
                id: 'company-id',
                nameSingular: 'company',
                fieldIds: [
                    'field-2',
                    'field-3'
                ]
            });
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
                personCompanyRelation,
                companyNameField,
                companyPeopleRelation,
                personNameField
            ]);
            const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
                personObject,
                companyObject
            ]);
            const result = handler.computeFromDepth({
                objectsPermissions: createObjectsPermissions([
                    'person-id',
                    'company-id'
                ]),
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatObjectMetadata: personObject,
                depth: _maxdepthconstant.MAX_DEPTH
            });
            expect(result).toEqual({
                name: true,
                companyId: true,
                company: {
                    name: true,
                    people: {
                        name: true,
                        companyId: true
                    }
                }
            });
        });
        it('should only return label identifier fields when flag is true', ()=>{
            const idField = createMockField({
                id: 'field-id',
                name: 'id',
                type: _types.FieldMetadataType.UUID,
                objectMetadataId: 'person-id'
            });
            const nameField = createMockField({
                id: 'field-1',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'person-id'
            });
            const emailField = createMockField({
                id: 'field-2',
                name: 'email',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'person-id'
            });
            const personObject = createMockObjectMetadata({
                id: 'person-id',
                nameSingular: 'person',
                fieldIds: [
                    'field-id',
                    'field-1',
                    'field-2'
                ],
                labelIdentifierFieldMetadataId: 'field-1'
            });
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
                idField,
                nameField,
                emailField
            ]);
            const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
                personObject
            ]);
            const result = handler.computeFromDepth({
                objectsPermissions: createObjectsPermissions([
                    'person-id'
                ]),
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatObjectMetadata: personObject,
                depth: undefined,
                onlyUseLabelIdentifierFieldsInRelations: true
            });
            // onlyUseLabelIdentifierFields only applies to nested relations, not base fields
            expect(result).toEqual({
                id: true,
                name: true,
                email: true
            });
        });
        it('should handle activity target objects (noteTarget)', ()=>{
            const noteRelationField = createMockField({
                id: 'field-1',
                name: 'note',
                type: _types.FieldMetadataType.RELATION,
                objectMetadataId: 'noteTarget-id',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE
                },
                relationTargetObjectMetadataId: 'note-id'
            });
            const targetRelationField = createMockField({
                id: 'field-2',
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                objectMetadataId: 'noteTarget-id',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE
                },
                relationTargetObjectMetadataId: 'company-id'
            });
            const noteNameField = createMockField({
                id: 'field-3',
                name: 'title',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'note-id'
            });
            const companyNameField = createMockField({
                id: 'field-4',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'company-id'
            });
            const noteTargetObject = createMockObjectMetadata({
                id: 'noteTarget-id',
                nameSingular: 'noteTarget',
                fieldIds: [
                    'field-1',
                    'field-2'
                ]
            });
            const noteObject = createMockObjectMetadata({
                id: 'note-id',
                nameSingular: 'note',
                fieldIds: [
                    'field-3'
                ]
            });
            const companyObject = createMockObjectMetadata({
                id: 'company-id',
                nameSingular: 'company',
                fieldIds: [
                    'field-4'
                ]
            });
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
                noteRelationField,
                targetRelationField,
                noteNameField,
                companyNameField
            ]);
            const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
                noteTargetObject,
                noteObject,
                companyObject
            ]);
            const result = handler.computeFromDepth({
                objectsPermissions: createObjectsPermissions([
                    'noteTarget-id',
                    'note-id',
                    'company-id'
                ]),
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatObjectMetadata: noteTargetObject,
                depth: 1
            });
            expect(result).toEqual({
                noteId: true,
                note: {
                    title: true
                },
                companyId: true,
                company: {
                    name: true
                }
            });
        });
        it('should handle junction table relations with depth', ()=>{
            const junctionRelation1 = createMockField({
                id: 'field-1',
                name: 'person',
                type: _types.FieldMetadataType.RELATION,
                objectMetadataId: 'junction-id',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    joinColumnName: 'personId'
                },
                relationTargetObjectMetadataId: 'person-id'
            });
            const junctionRelation2 = createMockField({
                id: 'field-2',
                name: 'company',
                type: _types.FieldMetadataType.RELATION,
                objectMetadataId: 'junction-id',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    joinColumnName: 'companyId'
                },
                relationTargetObjectMetadataId: 'company-id'
            });
            const companyJunctionRelation = createMockField({
                id: 'field-3',
                name: 'personCompanies',
                type: _types.FieldMetadataType.RELATION,
                objectMetadataId: 'company-id',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY,
                    junctionTargetFieldId: 'field-2'
                },
                relationTargetObjectMetadataId: 'junction-id'
            });
            const companyNameField = createMockField({
                id: 'field-4',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'company-id'
            });
            const personNameField = createMockField({
                id: 'field-5',
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                objectMetadataId: 'person-id'
            });
            const companyObject = createMockObjectMetadata({
                id: 'company-id',
                nameSingular: 'company',
                fieldIds: [
                    'field-3',
                    'field-4'
                ]
            });
            const junctionObject = createMockObjectMetadata({
                id: 'junction-id',
                nameSingular: 'personCompany',
                fieldIds: [
                    'field-1',
                    'field-2'
                ]
            });
            const personObject = createMockObjectMetadata({
                id: 'person-id',
                nameSingular: 'person',
                fieldIds: [
                    'field-5'
                ]
            });
            const flatFieldMetadataMaps = buildFlatFieldMetadataMaps([
                junctionRelation1,
                junctionRelation2,
                companyJunctionRelation,
                companyNameField,
                personNameField
            ]);
            const flatObjectMetadataMaps = buildFlatObjectMetadataMaps([
                companyObject,
                junctionObject,
                personObject
            ]);
            const result = handler.computeFromDepth({
                objectsPermissions: createObjectsPermissions([
                    'company-id',
                    'junction-id',
                    'person-id'
                ]),
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatObjectMetadata: companyObject,
                depth: _maxdepthconstant.MAX_DEPTH
            });
            expect(result).toEqual({
                name: true,
                personCompanies: {
                    personId: true,
                    companyId: true,
                    person: {
                        name: true
                    },
                    company: {
                        name: true,
                        personCompanies: true
                    }
                }
            });
        });
    });
});

//# sourceMappingURL=selected-fields-handler.spec.js.map