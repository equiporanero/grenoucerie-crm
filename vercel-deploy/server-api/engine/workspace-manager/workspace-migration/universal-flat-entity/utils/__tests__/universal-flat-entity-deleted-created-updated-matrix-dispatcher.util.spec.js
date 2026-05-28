"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("twenty-shared/testing");
const _types = require("twenty-shared/types");
const _getflatfieldmetadatamock = require("../../../../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _universalflatentitydeletedcreatedupdatedmatrixdispatcherutil = require("../universal-flat-entity-deleted-created-updated-matrix-dispatcher.util");
describe('flatEntityDeletedCreatedUpdatedMatrixDispatcher', ()=>{
    const testCases = [
        {
            title: 'It should detect a created entity',
            context: {
                from: [],
                to: [
                    (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                        objectMetadataId: 'object-metadata-id-1',
                        type: _types.FieldMetadataType.TEXT,
                        universalIdentifier: 'universal-identifier-1',
                        id: 'field-id-1',
                        workspaceId: 'workspace-id-1',
                        applicationId: 'application-id-1',
                        createdAt: '2024-01-01T00:00:00.000Z',
                        updatedAt: '2024-01-01T00:00:00.000Z',
                        applicationUniversalIdentifier: 'application-universal-identifier-1',
                        objectMetadataUniversalIdentifier: 'object-metadata-universal-identifier-1'
                    })
                ],
                metadataName: 'fieldMetadata',
                buildOptions: {
                    inferDeletionFromMissingEntities: {
                        fieldMetadata: false
                    },
                    isSystemBuild: false,
                    applicationUniversalIdentifier: 'application-universal-identifier-1'
                }
            }
        },
        {
            title: 'It should detect a deleted entity',
            context: {
                from: [
                    (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                        objectMetadataId: 'object-metadata-id-1',
                        type: _types.FieldMetadataType.TEXT,
                        universalIdentifier: 'universal-identifier-1',
                        id: 'field-id-1',
                        workspaceId: 'workspace-id-1',
                        applicationId: 'application-id-1',
                        createdAt: '2024-01-01T00:00:00.000Z',
                        updatedAt: '2024-01-01T00:00:00.000Z',
                        applicationUniversalIdentifier: 'application-universal-identifier-1',
                        objectMetadataUniversalIdentifier: 'object-metadata-universal-identifier-1'
                    })
                ],
                to: [],
                metadataName: 'fieldMetadata',
                buildOptions: {
                    inferDeletionFromMissingEntities: {
                        fieldMetadata: true
                    },
                    isSystemBuild: false,
                    applicationUniversalIdentifier: 'application-universal-identifier-1'
                }
            }
        },
        {
            title: 'It should detect an updated entity',
            context: {
                from: [
                    (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                        objectMetadataId: 'object-metadata-id-1',
                        type: _types.FieldMetadataType.TEXT,
                        universalIdentifier: 'universal-identifier-1',
                        id: 'field-id-1',
                        workspaceId: 'workspace-id-1',
                        applicationId: 'application-id-1',
                        createdAt: '2024-01-01T00:00:00.000Z',
                        updatedAt: '2024-01-01T00:00:00.000Z',
                        isActive: false,
                        applicationUniversalIdentifier: 'application-universal-identifier-1',
                        objectMetadataUniversalIdentifier: 'object-metadata-universal-identifier-1'
                    })
                ],
                to: [
                    (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                        objectMetadataId: 'object-metadata-id-1',
                        type: _types.FieldMetadataType.TEXT,
                        universalIdentifier: 'universal-identifier-1',
                        id: 'field-id-1',
                        workspaceId: 'workspace-id-1',
                        applicationId: 'application-id-1',
                        createdAt: '2024-01-01T00:00:00.000Z',
                        updatedAt: '2024-01-01T00:00:00.000Z',
                        isActive: true,
                        applicationUniversalIdentifier: 'application-universal-identifier-1',
                        objectMetadataUniversalIdentifier: 'object-metadata-universal-identifier-1'
                    })
                ],
                metadataName: 'fieldMetadata',
                buildOptions: {
                    inferDeletionFromMissingEntities: {
                        fieldMetadata: false
                    },
                    isSystemBuild: false,
                    applicationUniversalIdentifier: 'application-universal-identifier-1'
                }
            }
        },
        {
            title: 'It should detect created, deleted and updated entities',
            context: {
                from: [
                    (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                        objectMetadataId: 'object-metadata-id-1',
                        type: _types.FieldMetadataType.TEXT,
                        universalIdentifier: 'universal-identifier-1',
                        id: 'field-id-1',
                        workspaceId: 'workspace-id-1',
                        applicationId: 'application-id-1',
                        createdAt: '2024-01-01T00:00:00.000Z',
                        updatedAt: '2024-01-01T00:00:00.000Z',
                        applicationUniversalIdentifier: 'application-universal-identifier-1',
                        objectMetadataUniversalIdentifier: 'object-metadata-universal-identifier-1',
                        isActive: true
                    }),
                    (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                        objectMetadataId: 'object-metadata-id-1',
                        type: _types.FieldMetadataType.TEXT,
                        universalIdentifier: 'universal-identifier-2',
                        id: 'field-id-2',
                        workspaceId: 'workspace-id-1',
                        applicationId: 'application-id-1',
                        createdAt: '2024-01-01T00:00:00.000Z',
                        updatedAt: '2024-01-01T00:00:00.000Z',
                        applicationUniversalIdentifier: 'application-universal-identifier-1',
                        objectMetadataUniversalIdentifier: 'object-metadata-universal-identifier-1'
                    })
                ],
                to: [
                    (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                        objectMetadataId: 'object-metadata-id-1',
                        type: _types.FieldMetadataType.TEXT,
                        universalIdentifier: 'universal-identifier-1',
                        id: 'field-id-1',
                        workspaceId: 'workspace-id-1',
                        applicationId: 'application-id-1',
                        createdAt: '2024-01-01T00:00:00.000Z',
                        applicationUniversalIdentifier: 'application-universal-identifier-1',
                        objectMetadataUniversalIdentifier: 'object-metadata-universal-identifier-1',
                        updatedAt: '2024-01-01T00:00:00.000Z',
                        isActive: false
                    }),
                    (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                        objectMetadataId: 'object-metadata-id-1',
                        type: _types.FieldMetadataType.TEXT,
                        universalIdentifier: 'universal-identifier-3',
                        id: 'field-id-3',
                        workspaceId: 'workspace-id-1',
                        applicationId: 'application-id-1',
                        createdAt: '2024-01-01T00:00:00.000Z',
                        applicationUniversalIdentifier: 'application-universal-identifier-1',
                        objectMetadataUniversalIdentifier: 'object-metadata-universal-identifier-1',
                        updatedAt: '2024-01-01T00:00:00.000Z'
                    })
                ],
                metadataName: 'fieldMetadata',
                buildOptions: {
                    inferDeletionFromMissingEntities: {
                        fieldMetadata: true
                    },
                    isSystemBuild: false,
                    applicationUniversalIdentifier: 'application-universal-identifier-1'
                }
            }
        },
        {
            title: 'It should not detect deleted entities when inferDeletionFromMissingEntities is false',
            context: {
                from: [
                    (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                        objectMetadataId: 'object-metadata-id-1',
                        type: _types.FieldMetadataType.TEXT,
                        universalIdentifier: 'universal-identifier-1',
                        id: 'field-id-1',
                        workspaceId: 'workspace-id-1',
                        applicationId: 'application-id-1',
                        createdAt: '2024-01-01T00:00:00.000Z',
                        applicationUniversalIdentifier: 'application-universal-identifier-1',
                        objectMetadataUniversalIdentifier: 'object-metadata-universal-identifier-1',
                        updatedAt: '2024-01-01T00:00:00.000Z'
                    })
                ],
                to: [],
                metadataName: 'fieldMetadata',
                buildOptions: {
                    inferDeletionFromMissingEntities: {
                        fieldMetadata: false
                    },
                    isSystemBuild: false,
                    applicationUniversalIdentifier: 'application-universal-identifier-1'
                }
            }
        }
    ];
    test.each((0, _testing.eachTestingContextFilter)(testCases))('$title', ({ context: { from, to, metadataName, buildOptions } })=>{
        const result = (0, _universalflatentitydeletedcreatedupdatedmatrixdispatcherutil.flatEntityDeletedCreatedUpdatedMatrixDispatcher)({
            from: from,
            to: to,
            metadataName,
            buildOptions
        });
        expect(result).toMatchSnapshot();
    });
});

//# sourceMappingURL=universal-flat-entity-deleted-created-updated-matrix-dispatcher.util.spec.js.map