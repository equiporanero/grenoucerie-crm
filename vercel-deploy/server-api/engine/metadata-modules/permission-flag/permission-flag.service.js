"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PermissionFlagService", {
    enumerable: true,
    get: function() {
        return PermissionFlagService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _fromcreatepermissionflaginputtoflatpermissionflagtocreateutil = require("../flat-permission-flag/utils/from-create-permission-flag-input-to-flat-permission-flag-to-create.util");
const _fromdeletepermissionflaginputtoflatpermissionflagorthrowutil = require("../flat-permission-flag/utils/from-delete-permission-flag-input-to-flat-permission-flag-or-throw.util");
const _fromflatpermissionflagtopermissionflagdtoutil = require("../flat-permission-flag/utils/from-flat-permission-flag-to-permission-flag-dto.util");
const _fromupdatepermissionflaginputtoflatpermissionflagtoupdateorthrowutil = require("../flat-permission-flag/utils/from-update-permission-flag-input-to-flat-permission-flag-to-update-or-throw.util");
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
let PermissionFlagService = class PermissionFlagService {
    async findAll(workspaceId) {
        const { flatPermissionFlagMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPermissionFlagMaps'
            ]
        });
        return Object.values(flatPermissionFlagMaps.byUniversalIdentifier).filter(_utils.isDefined).sort((a, b)=>a.createdAt.localeCompare(b.createdAt)).map(_fromflatpermissionflagtopermissionflagdtoutil.fromFlatPermissionFlagToPermissionFlagDto);
    }
    async findById(id, workspaceId) {
        const { flatPermissionFlagMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPermissionFlagMaps'
            ]
        });
        const flatPermissionFlag = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatPermissionFlagMaps
        });
        if (!(0, _utils.isDefined)(flatPermissionFlag)) {
            return null;
        }
        return (0, _fromflatpermissionflagtopermissionflagdtoutil.fromFlatPermissionFlagToPermissionFlagDto)(flatPermissionFlag);
    }
    async create(input, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const flatToCreate = (0, _fromcreatepermissionflaginputtoflatpermissionflagtocreateutil.fromCreatePermissionFlagInputToFlatPermissionFlagToCreate)({
            createPermissionFlagInput: input,
            workspaceId,
            flatApplication: workspaceCustomFlatApplication
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                permissionFlag: {
                    flatEntityToCreate: [
                        flatToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Validation errors occurred while creating permission flag');
        }
        const { flatPermissionFlagMaps: recomputedMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPermissionFlagMaps'
            ]
        });
        return (0, _fromflatpermissionflagtopermissionflagdtoutil.fromFlatPermissionFlagToPermissionFlagDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatToCreate.id,
            flatEntityMaps: recomputedMaps
        }));
    }
    async update(input, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatPermissionFlagMaps: existingMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPermissionFlagMaps'
            ]
        });
        const flatToUpdate = (0, _fromupdatepermissionflaginputtoflatpermissionflagtoupdateorthrowutil.fromUpdatePermissionFlagInputToFlatPermissionFlagToUpdateOrThrow)({
            flatPermissionFlagMaps: existingMaps,
            updatePermissionFlagInput: input
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                permissionFlag: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatToUpdate
                    ]
                }
            },
            workspaceId,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Validation errors occurred while updating permission flag');
        }
        const { flatPermissionFlagMaps: recomputedMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPermissionFlagMaps'
            ]
        });
        return (0, _fromflatpermissionflagtopermissionflagdtoutil.fromFlatPermissionFlagToPermissionFlagDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: input.id,
            flatEntityMaps: recomputedMaps
        }));
    }
    async delete(id, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatPermissionFlagMaps: existingMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPermissionFlagMaps'
            ]
        });
        const flatToDelete = (0, _fromdeletepermissionflaginputtoflatpermissionflagorthrowutil.fromDeletePermissionFlagInputToFlatPermissionFlagOrThrow)({
            flatPermissionFlagMaps: existingMaps,
            permissionFlagId: id
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                permissionFlag: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        flatToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Validation errors occurred while deleting permission flag');
        }
        return (0, _fromflatpermissionflagtopermissionflagdtoutil.fromFlatPermissionFlagToPermissionFlagDto)(flatToDelete);
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
PermissionFlagService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], PermissionFlagService);

//# sourceMappingURL=permission-flag.service.js.map