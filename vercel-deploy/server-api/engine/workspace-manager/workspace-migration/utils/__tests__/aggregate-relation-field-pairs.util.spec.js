"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getflatfieldmetadatamock = require("../../../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _emptyorchestratoractionsreportconstant = require("../../constant/empty-orchestrator-actions-report.constant");
const _aggregaterelationfieldpairsutil = require("../aggregate-relation-field-pairs.util");
describe('aggregateRelationFieldPairs', ()=>{
    it('should bundle relation field pairs into single action with relatedFieldId', ()=>{
        const attachmentObjectId = 'attachment-object';
        const taskObjectId = 'task-object';
        const targetTaskFieldId = 'target-task-field';
        const attachmentsFieldId = 'attachments-field';
        const input = {
            ...(0, _emptyorchestratoractionsreportconstant.createEmptyOrchestratorActionsReport)(),
            fieldMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                            universalIdentifier: targetTaskFieldId,
                            objectMetadataId: 'attachment-object-metadata-id',
                            objectMetadataUniversalIdentifier: attachmentObjectId,
                            type: _types.FieldMetadataType.RELATION,
                            name: 'targetTask',
                            relationTargetFieldMetadataUniversalIdentifier: attachmentsFieldId,
                            relationTargetObjectMetadataUniversalIdentifier: taskObjectId
                        }),
                        id: 'target-task-generated-id'
                    },
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                            universalIdentifier: attachmentsFieldId,
                            objectMetadataId: 'task-object-metadata-id',
                            objectMetadataUniversalIdentifier: taskObjectId,
                            type: _types.FieldMetadataType.RELATION,
                            name: 'attachments',
                            relationTargetFieldMetadataUniversalIdentifier: targetTaskFieldId,
                            relationTargetObjectMetadataUniversalIdentifier: attachmentObjectId
                        }),
                        id: 'attachments-generated-id'
                    }
                ],
                update: [],
                delete: []
            }
        };
        const result = (0, _aggregaterelationfieldpairsutil.aggregateRelationFieldPairs)({
            orchestratorActionsReport: input
        });
        // Should be bundled into a single action with flatEntity and relatedUniversalFlatFieldMetadata
        expect(result.fieldMetadata.create).toMatchObject([
            {
                flatEntity: {
                    universalIdentifier: targetTaskFieldId
                },
                id: 'target-task-generated-id',
                relatedUniversalFlatFieldMetadata: {
                    universalIdentifier: attachmentsFieldId
                },
                relatedFieldId: 'attachments-generated-id'
            }
        ]);
    });
    it('should keep standalone fields (no relation target) as separate actions', ()=>{
        const fieldUniversalId = 'standalone-field';
        const objectUniversalId = 'some-object';
        const input = {
            ...(0, _emptyorchestratoractionsreportconstant.createEmptyOrchestratorActionsReport)(),
            fieldMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                            universalIdentifier: fieldUniversalId,
                            objectMetadataId: 'some-object-metadata-id',
                            objectMetadataUniversalIdentifier: objectUniversalId,
                            type: _types.FieldMetadataType.TEXT,
                            name: 'standaloneField'
                        }),
                        id: 'standalone-field-id'
                    }
                ],
                update: [],
                delete: []
            }
        };
        const result = (0, _aggregaterelationfieldpairsutil.aggregateRelationFieldPairs)({
            orchestratorActionsReport: input
        });
        // Should remain as single action without relatedUniversalFlatFieldMetadata
        expect(result.fieldMetadata.create).toMatchObject([
            {
                flatEntity: {
                    universalIdentifier: fieldUniversalId
                }
            }
        ]);
        expect(result.fieldMetadata.create[0].relatedUniversalFlatFieldMetadata).toBeUndefined();
        expect(result.fieldMetadata.create[0].relatedFieldId).toBeUndefined();
    });
    it('should handle relation field with target not being created (existing field)', ()=>{
        const relationFieldId = 'new-relation-field';
        const existingTargetFieldId = 'existing-target-field';
        const objectUniversalId = 'some-object';
        const input = {
            ...(0, _emptyorchestratoractionsreportconstant.createEmptyOrchestratorActionsReport)(),
            fieldMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                            universalIdentifier: relationFieldId,
                            objectMetadataId: 'some-object-metadata-id',
                            objectMetadataUniversalIdentifier: objectUniversalId,
                            type: _types.FieldMetadataType.RELATION,
                            name: 'relationToExisting',
                            relationTargetFieldMetadataUniversalIdentifier: existingTargetFieldId,
                            relationTargetObjectMetadataUniversalIdentifier: 'other-object'
                        }),
                        id: 'new-relation-field-id'
                    }
                ],
                update: [],
                delete: []
            }
        };
        const result = (0, _aggregaterelationfieldpairsutil.aggregateRelationFieldPairs)({
            orchestratorActionsReport: input
        });
        // Should remain as single action without relatedUniversalFlatFieldMetadata (target not being created)
        expect(result.fieldMetadata.create).toMatchObject([
            {
                flatEntity: {
                    universalIdentifier: relationFieldId
                }
            }
        ]);
        expect(result.fieldMetadata.create[0].relatedUniversalFlatFieldMetadata).toBeUndefined();
        expect(result.fieldMetadata.create[0].relatedFieldId).toBeUndefined();
    });
    it('should handle multiple independent relation pairs', ()=>{
        const pair1FieldA = 'pair1-field-a';
        const pair1FieldB = 'pair1-field-b';
        const pair2FieldA = 'pair2-field-a';
        const pair2FieldB = 'pair2-field-b';
        const input = {
            ...(0, _emptyorchestratoractionsreportconstant.createEmptyOrchestratorActionsReport)(),
            fieldMetadata: {
                create: [
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                            universalIdentifier: pair1FieldA,
                            objectMetadataId: 'object-1-metadata-id',
                            objectMetadataUniversalIdentifier: 'object-1',
                            type: _types.FieldMetadataType.RELATION,
                            name: 'pair1FieldA',
                            relationTargetFieldMetadataUniversalIdentifier: pair1FieldB,
                            relationTargetObjectMetadataUniversalIdentifier: 'object-2'
                        }),
                        id: 'id-1a'
                    },
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                            universalIdentifier: pair1FieldB,
                            objectMetadataId: 'object-2-metadata-id',
                            objectMetadataUniversalIdentifier: 'object-2',
                            type: _types.FieldMetadataType.RELATION,
                            name: 'pair1FieldB',
                            relationTargetFieldMetadataUniversalIdentifier: pair1FieldA,
                            relationTargetObjectMetadataUniversalIdentifier: 'object-1'
                        }),
                        id: 'id-1b'
                    },
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                            universalIdentifier: pair2FieldA,
                            objectMetadataId: 'object-3-metadata-id',
                            objectMetadataUniversalIdentifier: 'object-3',
                            type: _types.FieldMetadataType.RELATION,
                            name: 'pair2FieldA',
                            relationTargetFieldMetadataUniversalIdentifier: pair2FieldB,
                            relationTargetObjectMetadataUniversalIdentifier: 'object-4'
                        }),
                        id: 'id-2a'
                    },
                    {
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntity: (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                            universalIdentifier: pair2FieldB,
                            objectMetadataId: 'object-4-metadata-id',
                            objectMetadataUniversalIdentifier: 'object-4',
                            type: _types.FieldMetadataType.RELATION,
                            name: 'pair2FieldB',
                            relationTargetFieldMetadataUniversalIdentifier: pair2FieldA,
                            relationTargetObjectMetadataUniversalIdentifier: 'object-3'
                        }),
                        id: 'id-2b'
                    }
                ],
                update: [],
                delete: []
            }
        };
        const result = (0, _aggregaterelationfieldpairsutil.aggregateRelationFieldPairs)({
            orchestratorActionsReport: input
        });
        // Should result in 2 bundled actions (one per pair)
        expect(result.fieldMetadata.create).toMatchObject([
            {
                flatEntity: {
                    universalIdentifier: pair1FieldA
                },
                id: 'id-1a',
                relatedUniversalFlatFieldMetadata: {
                    universalIdentifier: pair1FieldB
                },
                relatedFieldId: 'id-1b'
            },
            {
                flatEntity: {
                    universalIdentifier: pair2FieldA
                },
                id: 'id-2a',
                relatedUniversalFlatFieldMetadata: {
                    universalIdentifier: pair2FieldB
                },
                relatedFieldId: 'id-2b'
            }
        ]);
    });
});

//# sourceMappingURL=aggregate-relation-field-pairs.util.spec.js.map