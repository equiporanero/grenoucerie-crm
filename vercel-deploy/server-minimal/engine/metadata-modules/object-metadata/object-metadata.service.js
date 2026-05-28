"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataService", {
    enumerable: true,
    get: function() {
        return ObjectMetadataService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _applicationservice = require("../../core-modules/application/application.service");
const _buildnavigationflatcommandmenuitemutil = require("../flat-command-menu-item/utils/build-navigation-flat-command-menu-item.util");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findflatentitybyuniversalidentifierutil = require("../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _fromcreateobjectinputtoflatobjectmetadataandflatfieldmetadatastocreateutil = require("../flat-object-metadata/utils/from-create-object-input-to-flat-object-metadata-and-flat-field-metadatas-to-create.util");
const _fromdeleteobjectinputtoflatfieldmetadatastodeleteutil = require("../flat-object-metadata/utils/from-delete-object-input-to-flat-field-metadatas-to-delete.util");
const _fromupdateobjectinputtoflatobjectmetadataandrelatedflatentitiesutil = require("../flat-object-metadata/utils/from-update-object-input-to-flat-object-metadata-and-related-flat-entities.util");
const _navigationmenuitemtypeenum = require("../navigation-menu-item/enums/navigation-menu-item-type.enum");
const _objectmetadataentity = require("./object-metadata.entity");
const _objectmetadataexception = require("./object-metadata.exception");
const _computeflatdefaultrecordpagelayouttocreateutil = require("./utils/compute-flat-default-record-page-layout-to-create.util");
const _computeflatrecordpagefieldsviewtocreateutil = require("./utils/compute-flat-record-page-fields-view-to-create.util");
const _computeflatviewfieldstocreateutil = require("./utils/compute-flat-view-fields-to-create.util");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
const _workspacemigrationbuilderexception = require("../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ObjectMetadataService = class ObjectMetadataService extends _nestjsquerytypeorm.TypeOrmQueryService {
    async updateOneObject({ updateObjectInput, workspaceId, ownerFlatApplication }) {
        const { workspaceCustomFlatApplication, twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? workspaceCustomFlatApplication;
        const { flatObjectMetadataMaps: existingFlatObjectMetadataMaps, flatIndexMaps: existingFlatIndexMaps, flatFieldMetadataMaps: existingFlatFieldMetadataMaps, flatViewFieldMaps: existingFlatViewFieldMaps, flatViewMaps: existingFlatViewMaps, flatCommandMenuItemMaps: existingFlatCommandMenuItemMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatIndexMaps',
                'flatFieldMetadataMaps',
                'flatViewFieldMaps',
                'flatViewMaps',
                'flatCommandMenuItemMaps'
            ]
        });
        const { otherObjectFlatFieldMetadatasToUpdate, sameObjectFlatFieldMetadatasToUpdate, flatObjectMetadataToUpdate, flatIndexMetadatasToUpdate, flatViewFieldsToCreate, flatViewFieldsToUpdate } = (0, _fromupdateobjectinputtoflatobjectmetadataandrelatedflatentitiesutil.fromUpdateObjectInputToFlatObjectMetadataAndRelatedFlatEntities)({
            flatFieldMetadataMaps: existingFlatFieldMetadataMaps,
            flatObjectMetadataMaps: existingFlatObjectMetadataMaps,
            updateObjectInput,
            flatIndexMaps: existingFlatIndexMaps,
            flatViewFieldMaps: existingFlatViewFieldMaps,
            flatViewMaps: existingFlatViewMaps
        });
        const existingFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityMaps: existingFlatObjectMetadataMaps,
            flatEntityId: updateObjectInput.id
        });
        const isActiveChangeDefined = (0, _utils.isDefined)(updateObjectInput.update.isActive);
        const isBeingEnabled = isActiveChangeDefined && updateObjectInput.update.isActive === true && (0, _utils.isDefined)(existingFlatObjectMetadata) && !existingFlatObjectMetadata.isActive;
        const isBeingDisabled = isActiveChangeDefined && updateObjectInput.update.isActive === false && (0, _utils.isDefined)(existingFlatObjectMetadata) && existingFlatObjectMetadata.isActive;
        const { commandMenuItemsToCreate, commandMenuItemsToDelete } = this.computeCommandMenuItemChangesForActiveToggle({
            isBeingEnabled,
            isBeingDisabled,
            existingFlatObjectMetadata,
            flatCommandMenuItemMaps: existingFlatCommandMenuItemMaps,
            workspaceId,
            applicationId: twentyStandardFlatApplication.id
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                objectMetadata: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatObjectMetadataToUpdate
                    ]
                },
                index: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: flatIndexMetadatasToUpdate
                },
                fieldMetadata: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        ...otherObjectFlatFieldMetadatasToUpdate,
                        ...sameObjectFlatFieldMetadatasToUpdate
                    ]
                },
                viewField: {
                    flatEntityToCreate: flatViewFieldsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: flatViewFieldsToUpdate
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating object');
        }
        const hasCommandMenuItemChanges = commandMenuItemsToCreate.length > 0 || commandMenuItemsToDelete.length > 0;
        if (hasCommandMenuItemChanges) {
            const commandMenuItemMigrationResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
                allFlatEntityOperationByMetadataName: {
                    commandMenuItem: {
                        flatEntityToCreate: commandMenuItemsToCreate,
                        flatEntityToDelete: commandMenuItemsToDelete,
                        flatEntityToUpdate: []
                    }
                },
                workspaceId,
                applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
            });
            if (commandMenuItemMigrationResult.status === 'fail') {
                throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(commandMenuItemMigrationResult, 'Multiple validation errors occurred while updating command menu items');
            }
        }
        const { flatObjectMetadataMaps: recomputedFlatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps'
            ]
        });
        const updatedFlatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatObjectMetadataToUpdate.universalIdentifier,
            flatEntityMaps: recomputedFlatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(updatedFlatObjectMetadata)) {
            throw new _objectmetadataexception.ObjectMetadataException('Updated object metadata not found in recomputed cache', _objectmetadataexception.ObjectMetadataExceptionCode.INTERNAL_SERVER_ERROR);
        }
        if ((0, _utils.isDefined)(updateObjectInput.update.labelIdentifierFieldMetadataId)) {
            await this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
                'rolesPermissions'
            ]);
        }
        if (isActiveChangeDefined) {
            await this.flatEntityMapsCacheService.invalidateFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatNavigationMenuItemMaps',
                    'flatCommandMenuItemMaps'
                ]
            });
        }
        return updatedFlatObjectMetadata;
    }
    async deleteOneObject({ deleteObjectInput, workspaceId, isSystemBuild = false, ownerFlatApplication }) {
        const deletedObjectMetadataDtos = await this.deleteManyObjectMetadatas({
            deleteObjectInputs: [
                deleteObjectInput
            ],
            workspaceId,
            isSystemBuild,
            ownerFlatApplication
        });
        if (deletedObjectMetadataDtos.length !== 1) {
            throw new _objectmetadataexception.ObjectMetadataException('Could not retrieve deleted object metadata dto', _objectmetadataexception.ObjectMetadataExceptionCode.INTERNAL_SERVER_ERROR);
        }
        const [deletedObjectMetadataDto] = deletedObjectMetadataDtos;
        return deletedObjectMetadataDto;
    }
    async deleteManyObjectMetadatas({ workspaceId, deleteObjectInputs, isSystemBuild = false, ownerFlatApplication }) {
        if (deleteObjectInputs.length === 0) {
            return [];
        }
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? (await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        })).workspaceCustomFlatApplication;
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, flatIndexMaps, flatCommandMenuItemMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatIndexMaps',
                'flatFieldMetadataMaps',
                'flatCommandMenuItemMaps'
            ]
        });
        const initialAccumulator = {
            flatFieldMetadatasToDeleteByUniversalIdentifier: {},
            flatIndexToDeleteByUniversalIdentifier: {},
            flatObjectMetadatasToDeleteByUniversalIdentifier: {}
        };
        const { flatFieldMetadatasToDeleteByUniversalIdentifier, flatIndexToDeleteByUniversalIdentifier, flatObjectMetadatasToDeleteByUniversalIdentifier } = deleteObjectInputs.reduce((accumulator, deleteObjectInput)=>{
            const { flatFieldMetadatasToDelete, flatObjectMetadataToDelete, flatIndexToDelete } = (0, _fromdeleteobjectinputtoflatfieldmetadatastodeleteutil.fromDeleteObjectInputToFlatFieldMetadatasToDelete)({
                flatObjectMetadataMaps,
                flatIndexMaps,
                flatFieldMetadataMaps,
                deleteObjectInput
            });
            return {
                flatFieldMetadatasToDeleteByUniversalIdentifier: {
                    ...accumulator.flatFieldMetadatasToDeleteByUniversalIdentifier,
                    ...(0, _utils.fromArrayToUniqueKeyRecord)({
                        array: flatFieldMetadatasToDelete,
                        uniqueKey: 'universalIdentifier'
                    })
                },
                flatIndexToDeleteByUniversalIdentifier: {
                    ...accumulator.flatIndexToDeleteByUniversalIdentifier,
                    ...(0, _utils.fromArrayToUniqueKeyRecord)({
                        array: flatIndexToDelete,
                        uniqueKey: 'universalIdentifier'
                    })
                },
                flatObjectMetadatasToDeleteByUniversalIdentifier: {
                    ...accumulator.flatObjectMetadatasToDeleteByUniversalIdentifier,
                    [flatObjectMetadataToDelete.universalIdentifier]: flatObjectMetadataToDelete
                }
            };
        }, initialAccumulator);
        const { flatFieldMetadatasToDelete, flatObjectMetadatasToDelete, flatIndexToDelete } = {
            flatFieldMetadatasToDelete: Object.values(flatFieldMetadatasToDeleteByUniversalIdentifier),
            flatObjectMetadatasToDelete: Object.values(flatObjectMetadatasToDeleteByUniversalIdentifier),
            flatIndexToDelete: Object.values(flatIndexToDeleteByUniversalIdentifier)
        };
        const deletedFlatObjectMetadatas = flatObjectMetadatasToDelete.map((flatObjectMetadataToDelete)=>(0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
                universalIdentifier: flatObjectMetadataToDelete.universalIdentifier,
                flatEntityMaps: flatObjectMetadataMaps
            }));
        const flatCommandMenuItemsToDelete = flatObjectMetadatasToDelete.map((flatObjectMetadataToDelete)=>this.findNavigationCommandMenuItemForObject({
                objectUniversalIdentifier: flatObjectMetadataToDelete.universalIdentifier,
                flatCommandMenuItemMaps
            })).filter(_utils.isDefined);
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                objectMetadata: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatObjectMetadatasToDelete,
                    flatEntityToUpdate: []
                },
                index: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatIndexToDelete,
                    flatEntityToUpdate: []
                },
                fieldMetadata: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatFieldMetadatasToDelete,
                    flatEntityToUpdate: []
                },
                commandMenuItem: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatCommandMenuItemsToDelete,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, `Multiple validation errors occurred while deleting object${deleteObjectInputs.length > 1 ? 's' : ''}`);
        }
        return deletedFlatObjectMetadatas;
    }
    async createOneObject({ createObjectInput, workspaceId, ownerFlatApplication }) {
        const { workspaceCustomFlatApplication, twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? workspaceCustomFlatApplication;
        const { flatObjectMetadataMaps: existingFlatObjectMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps'
        ]);
        const { flatObjectMetadataToCreate, flatIndexMetadataToCreate, flatFieldMetadataToCreateOnObject, relationTargetFlatFieldMetadataToCreate } = (0, _fromcreateobjectinputtoflatobjectmetadataandflatfieldmetadatastocreateutil.fromCreateObjectInputToFlatObjectMetadataAndFlatFieldMetadatasToCreate)({
            createObjectInput,
            flatApplication: resolvedOwnerFlatApplication,
            flatObjectMetadataMaps: existingFlatObjectMetadataMaps
        });
        const flatDefaultViewToCreate = this.computeFlatViewToCreate({
            objectMetadata: flatObjectMetadataToCreate,
            flatApplication: resolvedOwnerFlatApplication
        });
        const flatDefaultViewFieldsToCreate = (0, _computeflatviewfieldstocreateutil.computeFlatViewFieldsToCreate)({
            flatApplication: workspaceCustomFlatApplication,
            objectFlatFieldMetadatas: flatFieldMetadataToCreateOnObject,
            labelIdentifierFieldMetadataUniversalIdentifier: flatObjectMetadataToCreate.labelIdentifierFieldMetadataUniversalIdentifier,
            viewUniversalIdentifier: flatDefaultViewToCreate.universalIdentifier
        });
        const flatNavigationMenuItemToCreate = await this.computeFlatNavigationMenuItemToCreate({
            objectMetadata: flatObjectMetadataToCreate,
            workspaceId,
            workspaceCustomApplicationId: workspaceCustomFlatApplication.id,
            workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        const { flatCommandMenuItemMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatCommandMenuItemMaps'
            ]
        });
        const flatCommandMenuItemToCreate = this.buildFlatNavigationCommandMenuItem({
            objectMetadata: flatObjectMetadataToCreate,
            workspaceId,
            applicationId: twentyStandardFlatApplication.id,
            flatCommandMenuItemMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                objectMetadata: {
                    flatEntityToCreate: [
                        flatObjectMetadataToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                view: {
                    flatEntityToCreate: [
                        flatDefaultViewToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                viewField: {
                    flatEntityToCreate: flatDefaultViewFieldsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                fieldMetadata: {
                    flatEntityToCreate: [
                        ...flatFieldMetadataToCreateOnObject,
                        ...relationTargetFlatFieldMetadataToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                index: {
                    flatEntityToCreate: flatIndexMetadataToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                ...(0, _utils.isDefined)(flatNavigationMenuItemToCreate) ? {
                    navigationMenuItem: {
                        flatEntityToCreate: [
                            flatNavigationMenuItemToCreate
                        ],
                        flatEntityToDelete: [],
                        flatEntityToUpdate: []
                    }
                } : {}
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating object');
        }
        const commandMenuItemMigrationResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                commandMenuItem: {
                    flatEntityToCreate: [
                        flatCommandMenuItemToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (commandMenuItemMigrationResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(commandMenuItemMigrationResult, 'Multiple validation errors occurred while creating command menu item');
        }
        const flatRecordPageFieldsViewToCreate = this.computeFlatRecordPageFieldsViewToCreate({
            objectMetadata: flatObjectMetadataToCreate,
            flatApplication: twentyStandardFlatApplication
        });
        const flatRecordPageFieldsViewFieldsToCreate = (0, _computeflatviewfieldstocreateutil.computeFlatViewFieldsToCreate)({
            flatApplication: twentyStandardFlatApplication,
            objectFlatFieldMetadatas: flatFieldMetadataToCreateOnObject,
            labelIdentifierFieldMetadataUniversalIdentifier: flatObjectMetadataToCreate.labelIdentifierFieldMetadataUniversalIdentifier,
            viewUniversalIdentifier: flatRecordPageFieldsViewToCreate.universalIdentifier,
            excludeLabelIdentifier: true
        });
        const flatDefaultRecordPageLayoutsToCreate = this.computeFlatDefaultRecordPageLayoutToCreate({
            objectMetadata: flatObjectMetadataToCreate,
            flatApplication: twentyStandardFlatApplication,
            recordPageFieldsView: flatRecordPageFieldsViewToCreate,
            workspaceId
        });
        const pageLayoutMigrationResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                view: {
                    flatEntityToCreate: [
                        flatRecordPageFieldsViewToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                viewField: {
                    flatEntityToCreate: flatRecordPageFieldsViewFieldsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                pageLayout: {
                    flatEntityToCreate: flatDefaultRecordPageLayoutsToCreate.pageLayouts,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                pageLayoutTab: {
                    flatEntityToCreate: flatDefaultRecordPageLayoutsToCreate.pageLayoutTabs,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                pageLayoutWidget: {
                    flatEntityToCreate: flatDefaultRecordPageLayoutsToCreate.pageLayoutWidgets,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (pageLayoutMigrationResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(pageLayoutMigrationResult, 'Multiple validation errors occurred while creating page layouts for object');
        }
        const { flatObjectMetadataMaps: recomputedFlatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps'
            ]
        });
        const createdFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: flatObjectMetadataToCreate.id,
            flatEntityMaps: recomputedFlatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(createdFlatObjectMetadata)) {
            throw new _objectmetadataexception.ObjectMetadataException('Created object metadata not found in recomputed cache', _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND);
        }
        return createdFlatObjectMetadata;
    }
    computeFlatViewToCreate({ objectMetadata, flatApplication }) {
        const createdAt = new Date().toISOString();
        return {
            id: (0, _uuid.v4)(),
            objectMetadataUniversalIdentifier: objectMetadata.universalIdentifier,
            name: `All {objectLabelPlural}`,
            key: _types.ViewKey.INDEX,
            icon: 'IconList',
            type: _types.ViewType.TABLE,
            createdAt,
            updatedAt: createdAt,
            deletedAt: null,
            isCustom: true,
            anyFieldFilterValue: null,
            calendarFieldMetadataUniversalIdentifier: null,
            calendarLayout: null,
            isCompact: false,
            shouldHideEmptyGroups: false,
            kanbanAggregateOperation: null,
            kanbanAggregateOperationFieldMetadataUniversalIdentifier: null,
            mainGroupByFieldMetadataUniversalIdentifier: null,
            openRecordIn: _types.ViewOpenRecordIn.SIDE_PANEL,
            position: 0,
            universalIdentifier: (0, _uuid.v4)(),
            visibility: _types.ViewVisibility.WORKSPACE,
            createdByUserWorkspaceId: null,
            viewFieldUniversalIdentifiers: [],
            viewFieldGroupUniversalIdentifiers: [],
            viewFilterUniversalIdentifiers: [],
            viewGroupUniversalIdentifiers: [],
            viewFilterGroupUniversalIdentifiers: [],
            viewSortUniversalIdentifiers: [],
            applicationUniversalIdentifier: flatApplication.universalIdentifier
        };
    }
    computeFlatRecordPageFieldsViewToCreate({ objectMetadata, flatApplication }) {
        return (0, _computeflatrecordpagefieldsviewtocreateutil.computeFlatRecordPageFieldsViewToCreate)({
            objectMetadata,
            flatApplication
        });
    }
    computeFlatDefaultRecordPageLayoutToCreate({ objectMetadata, flatApplication, recordPageFieldsView, workspaceId }) {
        return (0, _computeflatdefaultrecordpagelayouttocreateutil.computeFlatDefaultRecordPageLayoutToCreate)({
            objectMetadata,
            flatApplication,
            recordPageFieldsView,
            workspaceId
        });
    }
    async computeFlatNavigationMenuItemToCreate({ objectMetadata, workspaceId, workspaceCustomApplicationId, workspaceCustomApplicationUniversalIdentifier }) {
        const { flatNavigationMenuItemMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatNavigationMenuItemMaps'
        ]);
        const workspaceLevelItems = Object.values(flatNavigationMenuItemMaps.byUniversalIdentifier).filter((item)=>(0, _utils.isDefined)(item) && !(0, _utils.isDefined)(item.userWorkspaceId));
        const nextPosition = workspaceLevelItems.length > 0 ? Math.max(...workspaceLevelItems.map((item)=>item.position)) + 1 : 0;
        const newId = (0, _uuid.v4)();
        const now = new Date().toISOString();
        return {
            id: newId,
            type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
            universalIdentifier: newId,
            userWorkspaceId: null,
            targetRecordId: null,
            targetObjectMetadataId: objectMetadata.id,
            targetObjectMetadataUniversalIdentifier: objectMetadata.universalIdentifier,
            viewId: null,
            viewUniversalIdentifier: null,
            folderId: null,
            folderUniversalIdentifier: null,
            pageLayoutId: null,
            pageLayoutUniversalIdentifier: null,
            name: null,
            link: null,
            icon: null,
            color: null,
            position: nextPosition,
            workspaceId,
            applicationId: workspaceCustomApplicationId,
            applicationUniversalIdentifier: workspaceCustomApplicationUniversalIdentifier,
            createdAt: now,
            updatedAt: now
        };
    }
    buildFlatNavigationCommandMenuItem({ objectMetadata, workspaceId, applicationId, flatCommandMenuItemMaps }) {
        const existingItems = Object.values(flatCommandMenuItemMaps.byUniversalIdentifier).filter(_utils.isDefined);
        const nextPosition = existingItems.length > 0 ? Math.max(...existingItems.map((item)=>item.position)) + 1 : 0;
        return (0, _buildnavigationflatcommandmenuitemutil.buildNavigationFlatCommandMenuItem)({
            objectMetadata,
            commandMenuItemId: (0, _uuid.v4)(),
            applicationId,
            workspaceId,
            position: nextPosition,
            now: new Date().toISOString()
        });
    }
    findNavigationCommandMenuItemForObject({ objectUniversalIdentifier, flatCommandMenuItemMaps }) {
        const commandMenuItemUniversalIdentifier = (0, _uuid.v5)(objectUniversalIdentifier, _buildnavigationflatcommandmenuitemutil.NAVIGATION_COMMAND_UUID_NAMESPACE);
        return (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: flatCommandMenuItemMaps,
            universalIdentifier: commandMenuItemUniversalIdentifier
        });
    }
    computeCommandMenuItemChangesForActiveToggle({ isBeingEnabled, isBeingDisabled, existingFlatObjectMetadata, flatCommandMenuItemMaps, workspaceId, applicationId }) {
        if (!(0, _utils.isDefined)(existingFlatObjectMetadata)) {
            return {
                commandMenuItemsToCreate: [],
                commandMenuItemsToDelete: []
            };
        }
        if (isBeingEnabled) {
            const existingCommandMenuItem = this.findNavigationCommandMenuItemForObject({
                objectUniversalIdentifier: existingFlatObjectMetadata.universalIdentifier,
                flatCommandMenuItemMaps
            });
            if (!(0, _utils.isDefined)(existingCommandMenuItem)) {
                return {
                    commandMenuItemsToCreate: [
                        this.buildFlatNavigationCommandMenuItem({
                            objectMetadata: existingFlatObjectMetadata,
                            workspaceId,
                            applicationId,
                            flatCommandMenuItemMaps
                        })
                    ],
                    commandMenuItemsToDelete: []
                };
            }
        }
        if (isBeingDisabled) {
            const commandMenuItemToDelete = this.findNavigationCommandMenuItemForObject({
                objectUniversalIdentifier: existingFlatObjectMetadata.universalIdentifier,
                flatCommandMenuItemMaps
            });
            if ((0, _utils.isDefined)(commandMenuItemToDelete)) {
                return {
                    commandMenuItemsToCreate: [],
                    commandMenuItemsToDelete: [
                        commandMenuItemToDelete
                    ]
                };
            }
        }
        return {
            commandMenuItemsToCreate: [],
            commandMenuItemsToDelete: []
        };
    }
    async findOneWithinWorkspace(workspaceId, options) {
        return this.objectMetadataRepository.findOne({
            relations: [
                'fields',
                'indexMetadatas',
                'indexMetadatas.indexFieldMetadatas'
            ],
            ...options,
            where: {
                ...options.where,
                workspaceId
            }
        });
    }
    async findManyWithinWorkspace(workspaceId, options) {
        const objectMetadataEntities = await this.objectMetadataRepository.find({
            ...options,
            where: {
                ...options?.where,
                workspaceId
            },
            order: {
                ...options?.order
            },
            select: {
                id: true
            }
        });
        const objectMetadataIds = objectMetadataEntities.map((objectMetadata)=>objectMetadata.id);
        const { flatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps'
            ]
        });
        const filteredOutAndSortedFlatObjectMetadataMaps = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatObjectMetadataMaps,
            flatEntityIds: objectMetadataIds
        });
        return filteredOutAndSortedFlatObjectMetadataMaps;
    }
    constructor(objectMetadataRepository, flatEntityMapsCacheService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService, applicationService){
        super(objectMetadataRepository), this.objectMetadataRepository = objectMetadataRepository, this.flatEntityMapsCacheService = flatEntityMapsCacheService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService, this.applicationService = applicationService;
    }
};
ObjectMetadataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], ObjectMetadataService);

//# sourceMappingURL=object-metadata.service.js.map