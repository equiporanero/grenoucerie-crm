"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _extractrecordidsanddatesasexpectany = require("test/utils/extract-record-ids-and-dates-as-expect-any");
const _jestexpecttobedefinedutiltest = require("test/utils/jest-expect-to-be-defined.util.test");
const _types = require("twenty-shared/types");
const _relationtypeinterface = require("../../field-metadata/interfaces/relation-type.interface");
const _applicationregistrationsourcetypeenum = require("../../../core-modules/application/application-registration/enums/application-registration-source-type.enum");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _fromcreatefieldinputtoflatfieldmetadatastocreateutil = require("../utils/from-create-field-input-to-flat-field-metadatas-to-create.util");
const _companyflatobjectmock = require("../../flat-object-metadata/__mocks__/company-flat-object.mock");
const _flatobjectmetadatamapsmock = require("../../flat-object-metadata/__mocks__/flat-object-metadata-maps.mock");
const _petflatobjectmock = require("../../flat-object-metadata/__mocks__/pet-flat-object.mock");
const _rocketflatobjectmock = require("../../flat-object-metadata/__mocks__/rocket-flat-object.mock");
const MOCK_FLAT_APPLICATION = {
    id: '20202020-81ee-42da-a281-668632f32fe7',
    universalIdentifier: '20202020-81ee-42da-a281-668632f32fe7',
    name: 'Workspace Custom Application',
    description: null,
    logo: null,
    workspaceId: 'workspace-id',
    version: null,
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
const flatObjectMetadataMaps = [
    _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK,
    _rocketflatobjectmock.ROCKET_FLAT_OBJECT_MOCK,
    _petflatobjectmock.PET_FLAT_OBJECT_MOCK
].reduce((flatObjectMetadataMaps, flatObjectMetadata)=>{
    return (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
        flatEntity: flatObjectMetadata,
        flatEntityMaps: flatObjectMetadataMaps
    });
}, (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)());
const emptyFlatFieldMetadataMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
describe('fromCreateFieldInputToFlatFieldMetadatasToCreate MORPH_RELATION test suite', ()=>{
    describe('Success cases', ()=>{
        const successTestCases = [
            {
                title: 'should create morph relation field metadata with valid input on rocket object to pet object',
                context: {
                    input: {
                        flatApplication: MOCK_FLAT_APPLICATION,
                        createFieldInput: {
                            name: 'newField',
                            label: 'newFieldLabel',
                            description: 'new field description',
                            type: _types.FieldMetadataType.MORPH_RELATION,
                            objectMetadataId: _rocketflatobjectmock.ROCKET_FLAT_OBJECT_MOCK.id,
                            morphRelationsCreationPayload: [
                                {
                                    type: _relationtypeinterface.RelationType.ONE_TO_MANY,
                                    targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.id,
                                    targetFieldLabel: 'Pet',
                                    targetFieldIcon: 'IconPet'
                                },
                                {
                                    type: _relationtypeinterface.RelationType.ONE_TO_MANY,
                                    targetObjectMetadataId: _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK.id,
                                    targetFieldLabel: 'Company',
                                    targetFieldIcon: 'IconBuilding'
                                }
                            ]
                        },
                        flatObjectMetadataMaps,
                        flatFieldMetadataMaps: emptyFlatFieldMetadataMaps
                    },
                    expected: 'success'
                }
            }
        ];
        test.each(successTestCases)('$title', async ({ context: { input, expected } })=>{
            const result = await (0, _fromcreatefieldinputtoflatfieldmetadatastocreateutil.fromCreateFieldInputToFlatFieldMetadatasToCreate)(input);
            expect(result.status).toEqual(expected);
            if (result.status !== 'success') {
                throw new Error('Should never occur, typecheck');
            }
            (0, _jestexpecttobedefinedutiltest.jestExpectToBeDefined)(input.createFieldInput.morphRelationsCreationPayload);
            expect(result.result.flatFieldMetadatas.length).toBe(input.createFieldInput.morphRelationsCreationPayload.length * 2);
            expect(result).toMatchSnapshot((0, _extractrecordidsanddatesasexpectany.extractRecordIdsAndDatesAsExpectAny)(result));
        });
    });
    describe('Failure cases', ()=>{
        const failureTestCases = [
            {
                title: 'should fail when morphRelationsCreationPayload is missing',
                context: {
                    input: {
                        flatApplication: MOCK_FLAT_APPLICATION,
                        createFieldInput: {
                            name: 'newField',
                            label: 'newFieldLabel',
                            description: 'new field description',
                            type: _types.FieldMetadataType.MORPH_RELATION,
                            objectMetadataId: _rocketflatobjectmock.ROCKET_FLAT_OBJECT_MOCK.id,
                            morphRelationsCreationPayload: undefined
                        },
                        flatObjectMetadataMaps: _flatobjectmetadatamapsmock.FLAT_OBJECT_METADATA_MAPS_MOCKS,
                        flatFieldMetadataMaps: emptyFlatFieldMetadataMaps
                    },
                    expected: 'fail'
                }
            },
            {
                title: 'should fail when morphRelationsCreationPayload is empty array',
                context: {
                    input: {
                        flatApplication: MOCK_FLAT_APPLICATION,
                        createFieldInput: {
                            name: 'newField',
                            label: 'newFieldLabel',
                            description: 'new field description',
                            type: _types.FieldMetadataType.MORPH_RELATION,
                            objectMetadataId: _rocketflatobjectmock.ROCKET_FLAT_OBJECT_MOCK.id,
                            morphRelationsCreationPayload: []
                        },
                        flatObjectMetadataMaps: _flatobjectmetadatamapsmock.FLAT_OBJECT_METADATA_MAPS_MOCKS,
                        flatFieldMetadataMaps: emptyFlatFieldMetadataMaps
                    },
                    expected: 'fail'
                }
            },
            {
                title: 'should fail when morphRelationsCreationPayload has different relation types',
                context: {
                    input: {
                        flatApplication: MOCK_FLAT_APPLICATION,
                        createFieldInput: {
                            name: 'newField',
                            label: 'newFieldLabel',
                            description: 'new field description',
                            type: _types.FieldMetadataType.MORPH_RELATION,
                            objectMetadataId: _rocketflatobjectmock.ROCKET_FLAT_OBJECT_MOCK.id,
                            morphRelationsCreationPayload: [
                                {
                                    type: _relationtypeinterface.RelationType.ONE_TO_MANY,
                                    targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.id,
                                    targetFieldLabel: 'Pet',
                                    targetFieldIcon: 'IconPet'
                                },
                                {
                                    type: _relationtypeinterface.RelationType.MANY_TO_ONE,
                                    targetObjectMetadataId: _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK.id,
                                    targetFieldLabel: 'Company',
                                    targetFieldIcon: 'IconPet'
                                }
                            ]
                        },
                        flatObjectMetadataMaps: _flatobjectmetadatamapsmock.FLAT_OBJECT_METADATA_MAPS_MOCKS,
                        flatFieldMetadataMaps: emptyFlatFieldMetadataMaps
                    },
                    expected: 'fail'
                }
            },
            {
                title: 'should fail when morphRelationsCreationPayload has several references to same object metadata',
                context: {
                    input: {
                        flatApplication: MOCK_FLAT_APPLICATION,
                        createFieldInput: {
                            name: 'newField',
                            label: 'newFieldLabel',
                            description: 'new field description',
                            type: _types.FieldMetadataType.MORPH_RELATION,
                            objectMetadataId: _rocketflatobjectmock.ROCKET_FLAT_OBJECT_MOCK.id,
                            morphRelationsCreationPayload: [
                                {
                                    type: _relationtypeinterface.RelationType.MANY_TO_ONE,
                                    targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.id,
                                    targetFieldLabel: 'Pet',
                                    targetFieldIcon: 'IconPet'
                                },
                                {
                                    type: _relationtypeinterface.RelationType.MANY_TO_ONE,
                                    targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.id,
                                    targetFieldLabel: 'Pet',
                                    targetFieldIcon: 'IconPet'
                                }
                            ]
                        },
                        flatObjectMetadataMaps: _flatobjectmetadatamapsmock.FLAT_OBJECT_METADATA_MAPS_MOCKS,
                        flatFieldMetadataMaps: emptyFlatFieldMetadataMaps
                    },
                    expected: 'fail'
                }
            },
            {
                title: 'should fail when morphRelationsCreationPayload has invalid relation payload',
                context: {
                    input: {
                        flatApplication: MOCK_FLAT_APPLICATION,
                        createFieldInput: {
                            name: 'newField',
                            label: 'newFieldLabel',
                            description: 'new field description',
                            type: _types.FieldMetadataType.MORPH_RELATION,
                            objectMetadataId: _rocketflatobjectmock.ROCKET_FLAT_OBJECT_MOCK.id,
                            morphRelationsCreationPayload: [
                                {
                                    type: _relationtypeinterface.RelationType.ONE_TO_MANY,
                                    targetObjectMetadataId: _petflatobjectmock.PET_FLAT_OBJECT_MOCK.id
                                }
                            ]
                        },
                        flatObjectMetadataMaps: _flatobjectmetadatamapsmock.FLAT_OBJECT_METADATA_MAPS_MOCKS,
                        flatFieldMetadataMaps: emptyFlatFieldMetadataMaps
                    },
                    expected: 'fail'
                }
            },
            {
                title: 'should fail when target object metadata is not found',
                context: {
                    input: {
                        flatApplication: MOCK_FLAT_APPLICATION,
                        createFieldInput: {
                            name: 'newField',
                            label: 'newFieldLabel',
                            description: 'new field description',
                            type: _types.FieldMetadataType.MORPH_RELATION,
                            objectMetadataId: _rocketflatobjectmock.ROCKET_FLAT_OBJECT_MOCK.id,
                            morphRelationsCreationPayload: [
                                {
                                    type: _relationtypeinterface.RelationType.ONE_TO_MANY,
                                    targetObjectMetadataId: 'non-existent-id',
                                    targetFieldLabel: 'Pet',
                                    targetFieldIcon: 'IconPet'
                                }
                            ]
                        },
                        flatObjectMetadataMaps: _flatobjectmetadatamapsmock.FLAT_OBJECT_METADATA_MAPS_MOCKS,
                        flatFieldMetadataMaps: emptyFlatFieldMetadataMaps
                    },
                    expected: 'fail'
                }
            }
        ];
        test.each(failureTestCases)('$title', async ({ context: { input, expected } })=>{
            const result = await (0, _fromcreatefieldinputtoflatfieldmetadatastocreateutil.fromCreateFieldInputToFlatFieldMetadatasToCreate)(input);
            expect(result.status).toEqual(expected);
            expect(result).toMatchSnapshot((0, _extractrecordidsanddatesasexpectany.extractRecordIdsAndDatesAsExpectAny)(result));
        });
    });
});

//# sourceMappingURL=morph-relation-from-create-field-input-to-flat-field-metadatas-to-create.spec.js.map