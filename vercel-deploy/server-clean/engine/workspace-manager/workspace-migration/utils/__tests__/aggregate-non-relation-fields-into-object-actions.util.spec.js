"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getflatfieldmetadatamock = require("../../../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _getflatobjectmetadatamock = require("../../../../metadata-modules/flat-object-metadata/__mocks__/get-flat-object-metadata.mock");
const _emptyorchestratoractionsreportconstant = require("../../constant/empty-orchestrator-actions-report.constant");
const _aggregatenonrelationfieldsintoobjectactionsutil = require("../aggregate-non-relation-fields-into-object-actions.util");
describe('aggregateNonRelationFieldsIntoObjectActions', ()=>{
    it('should merge non-relation field into matching create-object action', ()=>{
        const objectUniversalId = 'object-1';
        const fieldUniversalId = 'field-1';
        const flatFieldMetadata = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            universalIdentifier: fieldUniversalId,
            objectMetadataId: 'object-metadata-id',
            objectMetadataUniversalIdentifier: objectUniversalId,
            type: _types.FieldMetadataType.TEXT,
            name: 'testField'
        });
        const input = {
            ...(0, _emptyorchestratoractionsreportconstant.createEmptyOrchestratorActionsReport)(),
            objectMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'objectMetadata',
                        flatEntity: (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
                            universalIdentifier: objectUniversalId,
                            nameSingular: 'testObject',
                            namePlural: 'testObjects'
                        }),
                        universalFlatFieldMetadatas: []
                    }
                ],
                update: [],
                delete: []
            },
            fieldMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: flatFieldMetadata,
                        id: 'generated-field-id'
                    }
                ],
                update: [],
                delete: []
            }
        };
        const result = (0, _aggregatenonrelationfieldsintoobjectactionsutil.aggregateNonRelationFieldsIntoObjectActions)({
            orchestratorActionsReport: input
        });
        // Field should be merged into object action
        expect(result.objectMetadata.create).toMatchObject([
            {
                universalFlatFieldMetadatas: [
                    {
                        universalIdentifier: fieldUniversalId
                    }
                ],
                fieldIdByUniversalIdentifier: {
                    [fieldUniversalId]: 'generated-field-id'
                }
            }
        ]);
        // No remaining field actions
        expect(result.fieldMetadata.create).toHaveLength(0);
    });
    it('should keep relation field in separate create-field action', ()=>{
        const objectUniversalId = 'object-1';
        const relationFieldUniversalId = 'relation-field-1';
        const targetFieldUniversalId = 'target-field-1';
        const flatRelationFieldMetadata = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            universalIdentifier: relationFieldUniversalId,
            objectMetadataId: 'object-metadata-id',
            objectMetadataUniversalIdentifier: objectUniversalId,
            type: _types.FieldMetadataType.RELATION,
            name: 'relationField',
            relationTargetFieldMetadataUniversalIdentifier: targetFieldUniversalId,
            relationTargetObjectMetadataUniversalIdentifier: 'other-object'
        });
        const input = {
            ...(0, _emptyorchestratoractionsreportconstant.createEmptyOrchestratorActionsReport)(),
            objectMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'objectMetadata',
                        flatEntity: (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
                            universalIdentifier: objectUniversalId,
                            nameSingular: 'testObject',
                            namePlural: 'testObjects'
                        }),
                        universalFlatFieldMetadatas: []
                    }
                ],
                update: [],
                delete: []
            },
            fieldMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: flatRelationFieldMetadata,
                        id: 'generated-relation-field-id'
                    }
                ],
                update: [],
                delete: []
            }
        };
        const result = (0, _aggregatenonrelationfieldsintoobjectactionsutil.aggregateNonRelationFieldsIntoObjectActions)({
            orchestratorActionsReport: input
        });
        // Object action should have no fields merged
        expect(result.objectMetadata.create).toMatchObject([
            {
                universalFlatFieldMetadatas: []
            }
        ]);
        // Relation field should remain in field actions
        expect(result.fieldMetadata.create).toMatchObject([
            {
                flatEntity: {
                    universalIdentifier: relationFieldUniversalId
                }
            }
        ]);
    });
    it('should keep field for existing object in separate create-field action', ()=>{
        const existingObjectUniversalId = 'existing-object';
        const fieldUniversalId = 'field-for-existing-object';
        const flatFieldMetadata = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            universalIdentifier: fieldUniversalId,
            objectMetadataId: 'existing-object-metadata-id',
            objectMetadataUniversalIdentifier: existingObjectUniversalId,
            type: _types.FieldMetadataType.TEXT,
            name: 'fieldForExistingObject'
        });
        const input = {
            ...(0, _emptyorchestratoractionsreportconstant.createEmptyOrchestratorActionsReport)(),
            objectMetadata: {
                create: [],
                update: [],
                delete: []
            },
            fieldMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: flatFieldMetadata,
                        id: 'generated-field-id'
                    }
                ],
                update: [],
                delete: []
            }
        };
        const result = (0, _aggregatenonrelationfieldsintoobjectactionsutil.aggregateNonRelationFieldsIntoObjectActions)({
            orchestratorActionsReport: input
        });
        // No object actions
        expect(result.objectMetadata.create).toHaveLength(0);
        // Field should remain in field actions (no matching object to merge into)
        expect(result.fieldMetadata.create).toMatchObject([
            {
                flatEntity: {
                    universalIdentifier: fieldUniversalId
                }
            }
        ]);
    });
    it('should handle mixed relation and non-relation fields as separate actions', ()=>{
        const objectUniversalId = 'object-1';
        const textFieldUniversalId = 'text-field';
        const relationFieldUniversalId = 'relation-field';
        const flatTextFieldMetadata = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            universalIdentifier: textFieldUniversalId,
            objectMetadataId: 'object-metadata-id',
            objectMetadataUniversalIdentifier: objectUniversalId,
            type: _types.FieldMetadataType.TEXT,
            name: 'textField'
        });
        const flatRelationFieldMetadata = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
            universalIdentifier: relationFieldUniversalId,
            objectMetadataId: 'object-metadata-id',
            objectMetadataUniversalIdentifier: objectUniversalId,
            type: _types.FieldMetadataType.RELATION,
            name: 'relationField',
            relationTargetFieldMetadataUniversalIdentifier: 'target-field',
            relationTargetObjectMetadataUniversalIdentifier: 'other-object'
        });
        const input = {
            ...(0, _emptyorchestratoractionsreportconstant.createEmptyOrchestratorActionsReport)(),
            objectMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'objectMetadata',
                        flatEntity: (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
                            universalIdentifier: objectUniversalId,
                            nameSingular: 'testObject',
                            namePlural: 'testObjects'
                        }),
                        universalFlatFieldMetadatas: []
                    }
                ],
                update: [],
                delete: []
            },
            fieldMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: flatTextFieldMetadata,
                        id: 'text-field-id'
                    },
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: flatRelationFieldMetadata,
                        id: 'relation-field-id'
                    }
                ],
                update: [],
                delete: []
            }
        };
        const result = (0, _aggregatenonrelationfieldsintoobjectactionsutil.aggregateNonRelationFieldsIntoObjectActions)({
            orchestratorActionsReport: input
        });
        // Text field should be merged into object action
        expect(result.objectMetadata.create).toMatchObject([
            {
                universalFlatFieldMetadatas: [
                    {
                        universalIdentifier: textFieldUniversalId
                    }
                ]
            }
        ]);
        // Relation field should remain in field actions
        expect(result.fieldMetadata.create).toMatchObject([
            {
                flatEntity: {
                    universalIdentifier: relationFieldUniversalId
                }
            }
        ]);
    });
});

//# sourceMappingURL=aggregate-non-relation-fields-into-object-actions.util.spec.js.map