"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldMetadataService", {
    enumerable: true,
    get: function() {
        return FieldMetadataService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _fieldmetadataentity = require("../field-metadata.entity");
const _fieldmetadataexception = require("../field-metadata.exception");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findflatentitybyuniversalidentifierutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps-or-throw.util");
const _fromcreatefieldinputtoflatfieldmetadatastocreateutil = require("../../flat-field-metadata/utils/from-create-field-input-to-flat-field-metadatas-to-create.util");
const _fromdeletefieldinputtoflatfieldmetadatastodeleteutil = require("../../flat-field-metadata/utils/from-delete-field-input-to-flat-field-metadatas-to-delete.util");
const _fromupdatefieldinputtoflatfieldmetadatautil = require("../../flat-field-metadata/utils/from-update-field-input-to-flat-field-metadata.util");
const _throwonfieldinputtranspilationserrorutil = require("../../flat-field-metadata/utils/throw-on-field-input-transpilations-error.util");
const _computeflatviewfieldsfromfieldswidgetsutil = require("../../flat-view-field/utils/compute-flat-view-fields-from-fields-widgets.util");
const _widgetconfigurationtypetype = require("../../page-layout-widget/enums/widget-configuration-type.type");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _emptyorchestratorfailurereportconstant = require("../../../workspace-manager/workspace-migration/constant/empty-orchestrator-failure-report.constant");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
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
let FieldMetadataService = class FieldMetadataService extends _nestjsquerytypeorm.TypeOrmQueryService {
    async createOneField({ createFieldInput, workspaceId, ownerFlatApplication }) {
        const [createdFieldMetadata] = await this.createManyFields({
            workspaceId,
            createFieldInputs: [
                createFieldInput
            ],
            ownerFlatApplication
        });
        if (!(0, _utils.isDefined)(createdFieldMetadata)) {
            throw new _fieldmetadataexception.FieldMetadataException('Failed to create field metadata', _fieldmetadataexception.FieldMetadataExceptionCode.INTERNAL_SERVER_ERROR);
        }
        return createdFieldMetadata;
    }
    async deleteOneField({ deleteOneFieldInput, workspaceId, isSystemBuild = false, ownerFlatApplication }) {
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? (await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        })).workspaceCustomFlatApplication;
        const { flatObjectMetadataMaps: existingFlatObjectMetadataMaps, flatIndexMaps: existingFlatIndexMaps, flatFieldMetadataMaps: existingFlatFieldMetadataMaps, flatPageLayoutWidgetMaps: existingFlatPageLayoutWidgetMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatIndexMaps',
                'flatFieldMetadataMaps',
                'flatPageLayoutWidgetMaps'
            ]
        });
        const { flatFieldMetadatasToDelete, flatIndexesToDelete, flatIndexesToUpdate } = (0, _fromdeletefieldinputtoflatfieldmetadatastodeleteutil.fromDeleteFieldInputToFlatFieldMetadatasToDelete)({
            deleteOneFieldInput,
            flatFieldMetadataMaps: existingFlatFieldMetadataMaps,
            flatIndexMaps: existingFlatIndexMaps,
            flatObjectMetadataMaps: existingFlatObjectMetadataMaps
        });
        const deletedFlatFieldMetadata = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: flatFieldMetadatasToDelete[0].universalIdentifier,
            flatEntityMaps: existingFlatFieldMetadataMaps
        });
        const deletedFieldIds = new Set(flatFieldMetadatasToDelete.map((f)=>{
            const resolved = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: f.universalIdentifier,
                flatEntityMaps: existingFlatFieldMetadataMaps
            });
            return resolved?.id;
        }).filter(_utils.isDefined));
        const flatPageLayoutWidgetsToDelete = Object.values(existingFlatPageLayoutWidgetMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((widget)=>!(0, _utils.isDefined)(widget.deletedAt) && widget.configuration?.configurationType === _widgetconfigurationtypetype.WidgetConfigurationType.FIELD && deletedFieldIds.has(widget.configuration.fieldMetadataId));
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                fieldMetadata: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatFieldMetadatasToDelete,
                    flatEntityToUpdate: []
                },
                index: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatIndexesToDelete,
                    flatEntityToUpdate: flatIndexesToUpdate
                },
                ...flatPageLayoutWidgetsToDelete.length > 0 ? {
                    pageLayoutWidget: {
                        flatEntityToCreate: [],
                        flatEntityToDelete: flatPageLayoutWidgetsToDelete,
                        flatEntityToUpdate: []
                    }
                } : {}
            },
            workspaceId,
            isSystemBuild,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting field');
        }
        return deletedFlatFieldMetadata;
    }
    async updateOneField({ updateFieldInput, workspaceId, isSystemBuild = false, ownerFlatApplication }) {
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? (await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        })).workspaceCustomFlatApplication;
        const { flatObjectMetadataMaps: existingFlatObjectMetadataMaps, flatIndexMaps: existingFlatIndexMaps, flatFieldMetadataMaps: existingFlatFieldMetadataMaps, flatViewFilterMaps: existingFlatViewFilterMaps, flatViewGroupMaps: existingFlatViewGroupMaps, flatViewMaps: existingFlatViewMaps, flatViewFieldMaps: existingFlatViewFieldMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatIndexMaps',
                'flatFieldMetadataMaps',
                'flatViewFilterMaps',
                'flatViewGroupMaps',
                'flatViewMaps',
                'flatViewFieldMaps'
            ]
        });
        const inputTranspilationResult = (0, _fromupdatefieldinputtoflatfieldmetadatautil.fromUpdateFieldInputToFlatFieldMetadata)({
            flatFieldMetadataMaps: existingFlatFieldMetadataMaps,
            flatIndexMaps: existingFlatIndexMaps,
            flatObjectMetadataMaps: existingFlatObjectMetadataMaps,
            updateFieldInput: {
                ...updateFieldInput,
                workspaceId
            },
            flatViewFilterMaps: existingFlatViewFilterMaps,
            flatViewGroupMaps: existingFlatViewGroupMaps,
            flatViewMaps: existingFlatViewMaps,
            flatViewFieldMaps: existingFlatViewFieldMaps,
            flatApplication: resolvedOwnerFlatApplication,
            isSystemBuild
        });
        if (inputTranspilationResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException({
                report: {
                    ...(0, _emptyorchestratorfailurereportconstant.EMPTY_ORCHESTRATOR_FAILURE_REPORT)(),
                    fieldMetadata: [
                        {
                            errors: inputTranspilationResult.errors,
                            type: 'update',
                            metadataName: 'fieldMetadata',
                            flatEntityMinimalInformation: {
                                id: ''
                            }
                        }
                    ]
                },
                status: 'fail'
            }, 'Validation errors occurred while updating field');
        }
        const { flatFieldMetadatasToUpdate, flatFieldMetadatasToCreate, flatIndexMetadatasToUpdate, flatIndexMetadatasToDelete, flatIndexMetadatasToCreate, flatViewGroupsToCreate, flatViewGroupsToDelete, flatViewGroupsToUpdate, flatViewFiltersToDelete, flatViewFiltersToUpdate, flatViewFieldsToDelete, flatViewsToUpdate, flatViewsToDelete } = inputTranspilationResult.result;
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                fieldMetadata: {
                    flatEntityToCreate: flatFieldMetadatasToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: flatFieldMetadatasToUpdate
                },
                index: {
                    flatEntityToCreate: flatIndexMetadatasToCreate,
                    flatEntityToDelete: flatIndexMetadatasToDelete,
                    flatEntityToUpdate: flatIndexMetadatasToUpdate
                },
                viewFilter: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatViewFiltersToDelete,
                    flatEntityToUpdate: flatViewFiltersToUpdate
                },
                viewGroup: {
                    flatEntityToCreate: flatViewGroupsToCreate,
                    flatEntityToDelete: flatViewGroupsToDelete,
                    flatEntityToUpdate: flatViewGroupsToUpdate
                },
                view: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatViewsToDelete,
                    flatEntityToUpdate: flatViewsToUpdate
                },
                viewField: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatViewFieldsToDelete,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating field');
        }
        const { flatFieldMetadataMaps: recomputedFlatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps'
            ]
        });
        return (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatFieldMetadatasToUpdate[0].id,
            flatEntityMaps: recomputedFlatFieldMetadataMaps
        });
    }
    async createManyFields({ createFieldInputs, workspaceId, ownerFlatApplication, isSystemBuild = false }) {
        if (createFieldInputs.length === 0) {
            return [];
        }
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? (await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        })).workspaceCustomFlatApplication;
        const { flatObjectMetadataMaps: existingFlatObjectMetadataMaps, flatFieldMetadataMaps: existingFlatFieldMetadataMaps, flatPageLayoutWidgetMaps: existingFlatPageLayoutWidgetMaps, flatViewFieldMaps: existingFlatViewFieldMaps, flatViewMaps: existingFlatViewMaps, flatViewFieldGroupMaps: existingFlatViewFieldGroupMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps',
            'flatPageLayoutWidgetMaps',
            'flatViewFieldMaps',
            'flatViewMaps',
            'flatViewFieldGroupMaps'
        ]);
        const allTranspiledTranspilationInputs = [];
        for (const createFieldInput of createFieldInputs){
            allTranspiledTranspilationInputs.push(await (0, _fromcreatefieldinputtoflatfieldmetadatastocreateutil.fromCreateFieldInputToFlatFieldMetadatasToCreate)({
                flatObjectMetadataMaps: existingFlatObjectMetadataMaps,
                flatFieldMetadataMaps: existingFlatFieldMetadataMaps,
                createFieldInput,
                flatApplication: resolvedOwnerFlatApplication
            }));
        }
        (0, _throwonfieldinputtranspilationserrorutil.throwOnFieldInputTranspilationsError)(allTranspiledTranspilationInputs, 'Multiple validation errors occurred while creating field');
        const { flatFieldMetadatas: flatFieldMetadatasToCreate, indexMetadatas: flatIndexMetadatasToCreate } = allTranspiledTranspilationInputs.reduce((acc, { result })=>({
                flatFieldMetadatas: [
                    ...acc.flatFieldMetadatas,
                    ...result.flatFieldMetadatas
                ],
                indexMetadatas: [
                    ...acc.indexMetadatas,
                    ...result.indexMetadatas
                ]
            }), {
            flatFieldMetadatas: [],
            indexMetadatas: []
        });
        const flatViewFieldsToCreate = (0, _computeflatviewfieldsfromfieldswidgetsutil.computeFlatViewFieldsFromFieldsWidgets)({
            fieldsToCreate: flatFieldMetadatasToCreate.map((flatFieldMetadata)=>({
                    objectMetadataUniversalIdentifier: flatFieldMetadata.objectMetadataUniversalIdentifier,
                    fieldMetadataUniversalIdentifier: flatFieldMetadata.universalIdentifier
                })),
            flatPageLayoutWidgetMaps: existingFlatPageLayoutWidgetMaps,
            flatViewFieldMaps: existingFlatViewFieldMaps,
            flatViewMaps: existingFlatViewMaps,
            flatViewFieldGroupMaps: existingFlatViewFieldGroupMaps,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                fieldMetadata: {
                    flatEntityToCreate: flatFieldMetadatasToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                index: {
                    flatEntityToCreate: flatIndexMetadatasToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
                viewField: {
                    flatEntityToCreate: flatViewFieldsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating fields');
        }
        const { flatFieldMetadataMaps: recomputedFlatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps'
            ]
        });
        return (0, _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil.findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow)({
            universalIdentifiers: allTranspiledTranspilationInputs.map(({ result: { flatFieldMetadatas } })=>flatFieldMetadatas[0].universalIdentifier),
            flatEntityMaps: recomputedFlatFieldMetadataMaps
        });
    }
    async findOneWithinWorkspace(workspaceId, options) {
        const [fieldMetadata] = await this.fieldMetadataRepository.find({
            ...options,
            where: {
                ...options.where,
                workspaceId
            }
        });
        return fieldMetadata;
    }
    constructor(fieldMetadataRepository, flatEntityMapsCacheService, workspaceMigrationValidateBuildAndRunService, applicationService, workspaceCacheService){
        super(fieldMetadataRepository), this.fieldMetadataRepository = fieldMetadataRepository, this.flatEntityMapsCacheService = flatEntityMapsCacheService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.applicationService = applicationService, this.workspaceCacheService = workspaceCacheService;
    }
};
FieldMetadataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], FieldMetadataService);

//# sourceMappingURL=field-metadata.service.js.map