"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _applicationservice = require("../../../../core-modules/application/application.service");
const _createemptyflatentitymapsconstant = require("../../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _workspacemanyorallflatentitymapscacheservice = require("../../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _getflatindexmetadatamock = require("../../../flat-index-metadata/__mocks__/get-flat-index-metadata.mock");
const _constants = require("twenty-shared/constants");
const _indexfieldmetadataexception = require("../../index-field-metadata.exception");
const _indexmetadataservice = require("../index-metadata.service");
const _indexTypetypes = require("../../types/indexType.types");
const _workspacemigrationvalidatebuildandrunservice = require("../../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
const WORKSPACE_ID = 'workspace-id';
const OBJECT_ID = 'object-id';
const OBJECT_UNIVERSAL_ID = 'object-universal-id';
const APPLICATION_UNIVERSAL_ID = 'app-universal-id';
const buildFlatObjectMetadataMaps = ()=>{
    const maps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    maps.byUniversalIdentifier = {
        [OBJECT_UNIVERSAL_ID]: {
            id: OBJECT_ID,
            universalIdentifier: OBJECT_UNIVERSAL_ID,
            nameSingular: 'company',
            isCustom: false
        }
    };
    maps.universalIdentifierById = {
        [OBJECT_ID]: OBJECT_UNIVERSAL_ID
    };
    return maps;
};
const buildFlatFieldMetadataMaps = (fields)=>{
    const maps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const field of fields){
        maps.byUniversalIdentifier[field.universalIdentifier] = {
            id: field.id,
            universalIdentifier: field.universalIdentifier,
            name: field.name,
            label: field.name,
            type: field.type ?? _types.FieldMetadataType.TEXT,
            objectMetadataId: OBJECT_ID,
            isUnique: false,
            isCustom: true,
            isActive: true,
            isSystem: false,
            isNullable: true
        };
        maps.universalIdentifierById[field.id] = field.universalIdentifier;
    }
    return maps;
};
const buildFlatIndexMaps = (indexes)=>{
    const maps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const index of indexes){
        maps.byUniversalIdentifier[index.universalIdentifier] = (0, _getflatindexmetadatamock.getFlatIndexMetadataMock)({
            id: index.id,
            universalIdentifier: index.universalIdentifier,
            objectMetadataId: OBJECT_ID,
            objectMetadataUniversalIdentifier: OBJECT_UNIVERSAL_ID,
            applicationUniversalIdentifier: APPLICATION_UNIVERSAL_ID,
            isCustom: index.isCustom
        });
        maps.universalIdentifierById[index.id] = index.universalIdentifier;
    }
    return maps;
};
describe('IndexMetadataService', ()=>{
    let service;
    let cacheService;
    let migrationService;
    let applicationService;
    const setupCacheReturn = ({ fieldIds = [], customIndexCount = 0 } = {})=>{
        const indexes = Array.from({
            length: customIndexCount
        }).map((_, i)=>({
                id: `idx-${i}`,
                universalIdentifier: `idx-universal-${i}`,
                isCustom: true
            }));
        cacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
            flatObjectMetadataMaps: buildFlatObjectMetadataMaps(),
            flatFieldMetadataMaps: buildFlatFieldMetadataMaps(fieldIds),
            flatIndexMaps: buildFlatIndexMaps(indexes)
        });
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _indexmetadataservice.IndexMetadataService,
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: {
                        getOrRecomputeManyOrAllFlatEntityMaps: jest.fn(),
                        invalidateFlatEntityMaps: jest.fn()
                    }
                },
                {
                    provide: _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
                    useValue: {
                        validateBuildAndRunWorkspaceMigration: jest.fn().mockResolvedValue({
                            status: 'success'
                        })
                    }
                },
                {
                    provide: _applicationservice.ApplicationService,
                    useValue: {
                        findWorkspaceTwentyStandardAndCustomApplicationOrThrow: jest.fn().mockResolvedValue({
                            workspaceCustomFlatApplication: {
                                universalIdentifier: APPLICATION_UNIVERSAL_ID
                            }
                        })
                    }
                }
            ]
        }).compile();
        service = module.get(_indexmetadataservice.IndexMetadataService);
        cacheService = module.get(_workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService);
        migrationService = module.get(_workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService);
        applicationService = module.get(_applicationservice.ApplicationService);
    });
    describe('createOne validation', ()=>{
        it('rejects empty fields', async ()=>{
            setupCacheReturn();
            await expect(service.createOne({
                workspaceId: WORKSPACE_ID,
                createIndexInput: {
                    objectMetadataId: OBJECT_ID,
                    fields: [],
                    indexType: _indexTypetypes.IndexType.BTREE
                }
            })).rejects.toMatchObject({
                code: _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_FIELDS_REQUIRED
            });
        });
        it('rejects duplicate (fieldMetadataId + subFieldName) pairs', async ()=>{
            setupCacheReturn();
            await expect(service.createOne({
                workspaceId: WORKSPACE_ID,
                createIndexInput: {
                    objectMetadataId: OBJECT_ID,
                    fields: [
                        {
                            fieldMetadataId: 'field-1'
                        },
                        {
                            fieldMetadataId: 'field-1'
                        }
                    ],
                    indexType: _indexTypetypes.IndexType.BTREE
                }
            })).rejects.toMatchObject({
                code: _indexfieldmetadataexception.IndexMetadataExceptionCode.DUPLICATE_INDEX_FIELDS
            });
        });
        it('rejects when object does not exist', async ()=>{
            setupCacheReturn();
            await expect(service.createOne({
                workspaceId: WORKSPACE_ID,
                createIndexInput: {
                    objectMetadataId: 'unknown-object',
                    fields: [
                        {
                            fieldMetadataId: 'field-1'
                        }
                    ],
                    indexType: _indexTypetypes.IndexType.BTREE
                }
            })).rejects.toMatchObject({
                code: _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_OBJECT_NOT_FOUND
            });
        });
        it('rejects composite-type fields without subFieldName', async ()=>{
            setupCacheReturn({
                fieldIds: [
                    {
                        id: 'field-currency',
                        universalIdentifier: 'field-currency-universal',
                        name: 'annualRecurringRevenue',
                        type: _types.FieldMetadataType.CURRENCY
                    }
                ]
            });
            await expect(service.createOne({
                workspaceId: WORKSPACE_ID,
                createIndexInput: {
                    objectMetadataId: OBJECT_ID,
                    fields: [
                        {
                            fieldMetadataId: 'field-currency'
                        }
                    ],
                    indexType: _indexTypetypes.IndexType.BTREE
                }
            })).rejects.toMatchObject({
                code: _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_SUPPORTED_FOR_COMPOSITE_FIELD
            });
            expect(migrationService.validateBuildAndRunWorkspaceMigration).not.toHaveBeenCalled();
        });
        it('rejects composite-type fields with an unknown subFieldName', async ()=>{
            setupCacheReturn({
                fieldIds: [
                    {
                        id: 'field-currency',
                        universalIdentifier: 'field-currency-universal',
                        name: 'annualRecurringRevenue',
                        type: _types.FieldMetadataType.CURRENCY
                    }
                ]
            });
            await expect(service.createOne({
                workspaceId: WORKSPACE_ID,
                createIndexInput: {
                    objectMetadataId: OBJECT_ID,
                    fields: [
                        {
                            fieldMetadataId: 'field-currency',
                            subFieldName: 'notARealProp'
                        }
                    ],
                    indexType: _indexTypetypes.IndexType.BTREE
                }
            })).rejects.toMatchObject({
                code: _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_SUPPORTED_FOR_COMPOSITE_FIELD
            });
        });
        it('rejects subFieldName on a scalar field', async ()=>{
            setupCacheReturn({
                fieldIds: [
                    {
                        id: 'field-text',
                        universalIdentifier: 'field-text-universal',
                        name: 'someText',
                        type: _types.FieldMetadataType.TEXT
                    }
                ]
            });
            await expect(service.createOne({
                workspaceId: WORKSPACE_ID,
                createIndexInput: {
                    objectMetadataId: OBJECT_ID,
                    fields: [
                        {
                            fieldMetadataId: 'field-text',
                            subFieldName: 'whatever'
                        }
                    ],
                    indexType: _indexTypetypes.IndexType.BTREE
                }
            })).rejects.toMatchObject({
                code: _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_SUPPORTED_FOR_COMPOSITE_FIELD
            });
        });
        it('rejects when a field does not belong to the object', async ()=>{
            setupCacheReturn();
            await expect(service.createOne({
                workspaceId: WORKSPACE_ID,
                createIndexInput: {
                    objectMetadataId: OBJECT_ID,
                    fields: [
                        {
                            fieldMetadataId: 'unknown-field'
                        }
                    ],
                    indexType: _indexTypetypes.IndexType.BTREE
                }
            })).rejects.toMatchObject({
                code: _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_FIELD_NOT_FOUND_ON_OBJECT
            });
        });
        it('rejects when custom index count is at the cap', async ()=>{
            setupCacheReturn({
                fieldIds: [
                    {
                        id: 'field-1',
                        universalIdentifier: 'field-1-universal',
                        name: 'someColumn'
                    }
                ],
                customIndexCount: _constants.MAX_CUSTOM_INDEXES_PER_OBJECT
            });
            await expect(service.createOne({
                workspaceId: WORKSPACE_ID,
                createIndexInput: {
                    objectMetadataId: OBJECT_ID,
                    fields: [
                        {
                            fieldMetadataId: 'field-1'
                        }
                    ],
                    indexType: _indexTypetypes.IndexType.BTREE
                }
            })).rejects.toMatchObject({
                code: _indexfieldmetadataexception.IndexMetadataExceptionCode.CUSTOM_INDEX_LIMIT_REACHED
            });
            expect(applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow).not.toHaveBeenCalled();
        });
    });
    describe('deleteOne validation', ()=>{
        it('throws INDEX_NOT_FOUND (not the generic flat-entity error) for an unknown id', async ()=>{
            cacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatIndexMaps: buildFlatIndexMaps([])
            });
            await expect(service.deleteOne({
                id: 'unknown-idx',
                workspaceId: WORKSPACE_ID
            })).rejects.toMatchObject({
                code: _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_FOUND
            });
            expect(migrationService.validateBuildAndRunWorkspaceMigration).not.toHaveBeenCalled();
        });
        it('refuses to delete a system index', async ()=>{
            cacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatIndexMaps: buildFlatIndexMaps([
                    {
                        id: 'system-idx',
                        universalIdentifier: 'system-idx-universal',
                        isCustom: false
                    }
                ])
            });
            await expect(service.deleteOne({
                id: 'system-idx',
                workspaceId: WORKSPACE_ID
            })).rejects.toMatchObject({
                code: _indexfieldmetadataexception.IndexMetadataExceptionCode.CANNOT_DELETE_SYSTEM_INDEX
            });
            expect(migrationService.validateBuildAndRunWorkspaceMigration).not.toHaveBeenCalled();
        });
        it('runs the migration when deleting a custom index', async ()=>{
            cacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatIndexMaps: buildFlatIndexMaps([
                    {
                        id: 'custom-idx',
                        universalIdentifier: 'custom-idx-universal',
                        isCustom: true
                    }
                ])
            });
            await service.deleteOne({
                id: 'custom-idx',
                workspaceId: WORKSPACE_ID
            });
            expect(migrationService.validateBuildAndRunWorkspaceMigration).toHaveBeenCalledTimes(1);
            const call = migrationService.validateBuildAndRunWorkspaceMigration.mock.calls[0][0];
            expect(call.allFlatEntityOperationByMetadataName.index?.flatEntityToDelete).toHaveLength(1);
        });
    });
    it('IndexMetadataException can be thrown', ()=>{
        expect(new _indexfieldmetadataexception.IndexMetadataException('msg', _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_FOUND)).toBeInstanceOf(_indexfieldmetadataexception.IndexMetadataException);
    });
});

//# sourceMappingURL=index-metadata.service.spec.js.map