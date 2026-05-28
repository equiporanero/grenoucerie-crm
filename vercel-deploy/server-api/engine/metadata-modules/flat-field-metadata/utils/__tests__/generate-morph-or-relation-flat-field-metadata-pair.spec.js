"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _applicationregistrationsourcetypeenum = require("../../../../core-modules/application/application-registration/enums/application-registration-source-type.enum");
const _generatemorphorrelationflatfieldmetadatapairutil = require("../generate-morph-or-relation-flat-field-metadata-pair.util");
const _companyflatobjectmock = require("../../../flat-object-metadata/__mocks__/company-flat-object.mock");
const _petflatobjectmock = require("../../../flat-object-metadata/__mocks__/pet-flat-object.mock");
const MOCK_FLAT_APPLICATION = {
    id: '20202020-81ee-42da-a281-668632f32fe7',
    universalIdentifier: '20202020-81ee-42da-a281-668632f32fe7',
    name: 'Workspace Custom Application',
    description: null,
    logo: null,
    version: null,
    workspaceId: 'workspace-id',
    sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.LOCAL,
    sourcePath: '',
    packageJsonChecksum: null,
    packageJsonFileId: null,
    yarnLockChecksum: null,
    yarnLockFileId: null,
    availablePackages: {},
    logicFunctionLayerId: null,
    defaultRoleId: null,
    defaultRole: null,
    settingsCustomTabFrontComponentId: null,
    canBeUninstalled: false,
    applicationRegistrationId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    isSdkLayerStale: true
};
describe('generate Morph Or Relation Flat Field Metadata Pair test suite', ()=>{
    describe('Success cases', ()=>{
        const testCases = [
            {
                title: 'should generate a regular RELATION field pair with ONE_TO_MANY relation type',
                context: {
                    input: {
                        sourceFlatObjectMetadata: _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK,
                        targetFlatObjectMetadata: _petflatobjectmock.PET_FLAT_OBJECT_MOCK,
                        targetFlatFieldMetadataType: _types.FieldMetadataType.RELATION,
                        sourceFlatObjectMetadataJoinColumnName: 'petId',
                        flatApplication: MOCK_FLAT_APPLICATION,
                        createFieldInput: {
                            name: 'pets',
                            label: 'Pets',
                            description: 'Company pets',
                            icon: 'IconCat',
                            type: _types.FieldMetadataType.RELATION,
                            isCustom: true,
                            isSystem: false,
                            isUnique: false,
                            relationCreationPayload: {
                                type: _types.RelationType.ONE_TO_MANY,
                                targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.universalIdentifier,
                                targetFieldLabel: 'Company',
                                targetFieldIcon: 'IconBuildingSkyscraper'
                            }
                        }
                    },
                    expectedSourceFieldType: _types.FieldMetadataType.RELATION,
                    expectedTargetFieldType: _types.FieldMetadataType.RELATION,
                    expectedSourceRelationType: _types.RelationType.ONE_TO_MANY,
                    expectedTargetRelationType: _types.RelationType.MANY_TO_ONE,
                    shouldSourceHaveMorphId: false
                }
            },
            {
                title: 'should generate a regular RELATION field pair with MANY_TO_ONE relation type',
                context: {
                    input: {
                        sourceFlatObjectMetadata: _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK,
                        targetFlatObjectMetadata: _petflatobjectmock.PET_FLAT_OBJECT_MOCK,
                        targetFlatFieldMetadataType: _types.FieldMetadataType.RELATION,
                        sourceFlatObjectMetadataJoinColumnName: 'petId',
                        flatApplication: MOCK_FLAT_APPLICATION,
                        createFieldInput: {
                            name: 'pets',
                            label: 'Pets',
                            description: 'Company pets',
                            icon: 'IconCat',
                            type: _types.FieldMetadataType.RELATION,
                            isCustom: true,
                            isSystem: false,
                            isUnique: false,
                            relationCreationPayload: {
                                type: _types.RelationType.MANY_TO_ONE,
                                targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.universalIdentifier,
                                targetFieldLabel: 'Company',
                                targetFieldIcon: 'IconBuildingSkyscraper'
                            }
                        }
                    },
                    expectedSourceFieldType: _types.FieldMetadataType.RELATION,
                    expectedTargetFieldType: _types.FieldMetadataType.RELATION,
                    expectedSourceRelationType: _types.RelationType.MANY_TO_ONE,
                    expectedTargetRelationType: _types.RelationType.ONE_TO_MANY,
                    shouldSourceHaveMorphId: false
                }
            },
            {
                title: 'should generate a regular RELATION with isCustom, isSytem, isUnique not default values',
                context: {
                    input: {
                        sourceFlatObjectMetadata: _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK,
                        targetFlatObjectMetadata: _petflatobjectmock.PET_FLAT_OBJECT_MOCK,
                        targetFlatFieldMetadataType: _types.FieldMetadataType.RELATION,
                        sourceFlatObjectMetadataJoinColumnName: 'petId',
                        flatApplication: MOCK_FLAT_APPLICATION,
                        createFieldInput: {
                            name: 'pets',
                            label: 'Pets',
                            description: 'Company pets',
                            icon: 'IconCat',
                            type: _types.FieldMetadataType.RELATION,
                            isCustom: false,
                            isSystem: true,
                            isUnique: true,
                            relationCreationPayload: {
                                type: _types.RelationType.MANY_TO_ONE,
                                targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.universalIdentifier,
                                targetFieldLabel: 'Company',
                                targetFieldIcon: 'IconBuildingSkyscraper'
                            }
                        }
                    },
                    expectedSourceFieldType: _types.FieldMetadataType.RELATION,
                    expectedTargetFieldType: _types.FieldMetadataType.RELATION,
                    expectedSourceRelationType: _types.RelationType.MANY_TO_ONE,
                    expectedTargetRelationType: _types.RelationType.ONE_TO_MANY,
                    shouldSourceHaveMorphId: false
                }
            },
            {
                title: 'should generate a MORPH_RELATION (MANY_TO_ONE) field pair with morphId when provided',
                context: {
                    input: {
                        sourceFlatObjectMetadata: _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK,
                        targetFlatObjectMetadata: _petflatobjectmock.PET_FLAT_OBJECT_MOCK,
                        targetFlatFieldMetadataType: _types.FieldMetadataType.RELATION,
                        sourceFlatObjectMetadataJoinColumnName: 'targetPetId',
                        flatApplication: MOCK_FLAT_APPLICATION,
                        morphId: '20202020-9a2b-4c3d-a4e5-f6a7b8c9d0e1',
                        createFieldInput: {
                            name: 'targetPet',
                            label: 'Target Pet',
                            description: 'Morph relation to pet',
                            icon: 'IconCat',
                            type: _types.FieldMetadataType.MORPH_RELATION,
                            isCustom: false,
                            isSystem: true,
                            isUnique: false,
                            relationCreationPayload: {
                                type: _types.RelationType.MANY_TO_ONE,
                                targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.universalIdentifier,
                                targetFieldLabel: 'Companies',
                                targetFieldIcon: 'IconBuildingSkyscraper'
                            }
                        }
                    },
                    expectedSourceFieldType: _types.FieldMetadataType.MORPH_RELATION,
                    expectedTargetFieldType: _types.FieldMetadataType.RELATION,
                    expectedSourceRelationType: _types.RelationType.MANY_TO_ONE,
                    expectedTargetRelationType: _types.RelationType.ONE_TO_MANY,
                    shouldSourceHaveMorphId: true
                }
            },
            {
                title: 'should generate a MORPH_RELATION (ONE_TO_MANY) field pair with morphId when provided',
                context: {
                    input: {
                        sourceFlatObjectMetadata: _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK,
                        targetFlatObjectMetadata: _petflatobjectmock.PET_FLAT_OBJECT_MOCK,
                        targetFlatFieldMetadataType: _types.FieldMetadataType.RELATION,
                        sourceFlatObjectMetadataJoinColumnName: 'targetPetId',
                        flatApplication: MOCK_FLAT_APPLICATION,
                        morphId: '20202020-9a2b-4c3d-a4e5-f6a7b8c9d0e1',
                        createFieldInput: {
                            name: 'targetPet',
                            label: 'Target Pet',
                            description: 'Morph relation to pet',
                            icon: 'IconCat',
                            type: _types.FieldMetadataType.MORPH_RELATION,
                            isCustom: false,
                            isSystem: true,
                            isUnique: false,
                            relationCreationPayload: {
                                type: _types.RelationType.ONE_TO_MANY,
                                targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.universalIdentifier,
                                targetFieldLabel: 'Companies',
                                targetFieldIcon: 'IconBuildingSkyscraper'
                            }
                        }
                    },
                    expectedSourceFieldType: _types.FieldMetadataType.MORPH_RELATION,
                    expectedTargetFieldType: _types.FieldMetadataType.RELATION,
                    expectedSourceRelationType: _types.RelationType.ONE_TO_MANY,
                    expectedTargetRelationType: _types.RelationType.MANY_TO_ONE,
                    shouldSourceHaveMorphId: true
                }
            },
            {
                title: 'should generate a MORPH_RELATION (ONE_TO_MANY) field pair with MORPH as target',
                context: {
                    input: {
                        sourceFlatObjectMetadata: _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK,
                        targetFlatObjectMetadata: _petflatobjectmock.PET_FLAT_OBJECT_MOCK,
                        targetFlatFieldMetadataType: _types.FieldMetadataType.MORPH_RELATION,
                        sourceFlatObjectMetadataJoinColumnName: 'targetPetId',
                        flatApplication: MOCK_FLAT_APPLICATION,
                        morphId: '20202020-9a2b-4c3d-a4e5-f6a7b8c9d0e1',
                        createFieldInput: {
                            name: 'targetPet',
                            label: 'Target Pet',
                            description: 'Morph relation to pet',
                            icon: 'IconCat',
                            type: _types.FieldMetadataType.RELATION,
                            isCustom: false,
                            isSystem: true,
                            isUnique: false,
                            relationCreationPayload: {
                                type: _types.RelationType.ONE_TO_MANY,
                                targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.universalIdentifier,
                                targetFieldLabel: 'Companies',
                                targetFieldIcon: 'IconBuildingSkyscraper'
                            }
                        }
                    },
                    expectedSourceFieldType: _types.FieldMetadataType.RELATION,
                    expectedTargetFieldType: _types.FieldMetadataType.MORPH_RELATION,
                    expectedSourceRelationType: _types.RelationType.ONE_TO_MANY,
                    expectedTargetRelationType: _types.RelationType.MANY_TO_ONE,
                    shouldSourceHaveMorphId: false
                }
            }
        ];
        test.each(testCases)('$title', ({ context: { input, expectedSourceFieldType, expectedTargetFieldType, expectedSourceRelationType, expectedTargetRelationType, shouldSourceHaveMorphId } })=>{
            const result = (0, _generatemorphorrelationflatfieldmetadatapairutil.generateMorphOrRelationFlatFieldMetadataPair)(input);
            expect(result.flatFieldMetadatas).toHaveLength(2);
            expect(result.indexMetadatas).toHaveLength(1);
            const [sourceFieldMetadata, targetFieldMetadata] = result.flatFieldMetadatas;
            expect(sourceFieldMetadata.type).toBe(expectedSourceFieldType);
            expect(sourceFieldMetadata.name).toBe(input.createFieldInput.name);
            expect(sourceFieldMetadata.label).toBe(input.createFieldInput.label);
            expect(sourceFieldMetadata.objectMetadataUniversalIdentifier).toBe(input.sourceFlatObjectMetadata.universalIdentifier);
            expect(sourceFieldMetadata.relationTargetObjectMetadataUniversalIdentifier).toBe(input.targetFlatObjectMetadata.universalIdentifier);
            const sourceSettings = sourceFieldMetadata.universalSettings;
            const targetSettings = targetFieldMetadata.universalSettings;
            expect(sourceSettings.relationType).toBe(expectedSourceRelationType);
            if (shouldSourceHaveMorphId) {
                expect(sourceFieldMetadata.morphId).toBe(input.morphId);
            } else {
                expect(sourceFieldMetadata.morphId).toBeNull();
            }
            expect(targetFieldMetadata.type).toBe(expectedTargetFieldType);
            expect(targetFieldMetadata.objectMetadataUniversalIdentifier).toBe(input.targetFlatObjectMetadata.universalIdentifier);
            expect(targetFieldMetadata.relationTargetObjectMetadataUniversalIdentifier).toBe(input.sourceFlatObjectMetadata.universalIdentifier);
            expect(targetSettings.relationType).toBe(expectedTargetRelationType);
            expect(sourceFieldMetadata.relationTargetFieldMetadataUniversalIdentifier).toBe(targetFieldMetadata.universalIdentifier);
            expect(targetFieldMetadata.relationTargetFieldMetadataUniversalIdentifier).toBe(sourceFieldMetadata.universalIdentifier);
            if (expectedSourceRelationType === _types.RelationType.MANY_TO_ONE) {
                expect(sourceSettings.joinColumnName).toBe(input.sourceFlatObjectMetadataJoinColumnName);
                expect(sourceSettings.onDelete).toBe(_types.RelationOnDeleteAction.SET_NULL);
            }
            if (expectedTargetRelationType === _types.RelationType.MANY_TO_ONE) {
                expect(targetSettings.joinColumnName).toBeDefined();
                expect(targetSettings.onDelete).toBe(_types.RelationOnDeleteAction.SET_NULL);
            }
        });
    });
    describe('Universal identifier behaviour', ()=>{
        it('should keep the source field universalIdentifier from createFieldInput', ()=>{
            const sourceUniversalIdentifier = '11111111-2222-3333-4444-555555555555';
            const input = {
                sourceFlatObjectMetadata: _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK,
                targetFlatObjectMetadata: _petflatobjectmock.PET_FLAT_OBJECT_MOCK,
                targetFlatFieldMetadataType: _types.FieldMetadataType.RELATION,
                sourceFlatObjectMetadataJoinColumnName: 'petId',
                flatApplication: MOCK_FLAT_APPLICATION,
                createFieldInput: {
                    name: 'pets',
                    label: 'Pets',
                    description: 'Company pets',
                    icon: 'IconCat',
                    type: _types.FieldMetadataType.RELATION,
                    isCustom: true,
                    isSystem: false,
                    isUnique: false,
                    universalIdentifier: sourceUniversalIdentifier,
                    relationCreationPayload: {
                        type: _types.RelationType.ONE_TO_MANY,
                        targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.id,
                        targetFieldLabel: 'Company',
                        targetFieldIcon: 'IconBuildingSkyscraper'
                    }
                }
            };
            const result = (0, _generatemorphorrelationflatfieldmetadatapairutil.generateMorphOrRelationFlatFieldMetadataPair)(input);
            const [sourceFieldMetadata, targetFieldMetadata] = result.flatFieldMetadatas;
            expect(sourceFieldMetadata.universalIdentifier).toBe(sourceUniversalIdentifier);
            expect(targetFieldMetadata.universalIdentifier).toBeDefined();
            expect(targetFieldMetadata.universalIdentifier).not.toBe(sourceUniversalIdentifier);
        });
    });
});

//# sourceMappingURL=generate-morph-or-relation-flat-field-metadata-pair.spec.js.map