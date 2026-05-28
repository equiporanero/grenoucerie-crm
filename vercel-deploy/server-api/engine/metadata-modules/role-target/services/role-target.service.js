"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoleTargetService", {
    enumerable: true,
    get: function() {
        return RoleTargetService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _fromcreateroletargetinputtoflatroletargettocreateutil = require("../utils/from-create-role-target-input-to-flat-role-target-to-create.util");
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
let RoleTargetService = class RoleTargetService {
    async create({ createRoleTargetInput, workspaceId }) {
        const [flatRoleTarget] = await this.createMany({
            createRoleTargetInputs: [
                createRoleTargetInput
            ],
            workspaceId
        });
        return flatRoleTarget;
    }
    async createMany({ createRoleTargetInputs, workspaceId }) {
        if (createRoleTargetInputs.length === 0) {
            return [];
        }
        const { flatRoleTargetMaps, flatApplicationMaps, flatRoleMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRoleTargetMaps',
                'flatApplicationMaps',
                'flatRoleMaps'
            ]
        });
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const allFlatRoleTargetsToCreate = [];
        const allFlatRoleTargetsToDelete = [];
        for (const createRoleTargetInput of createRoleTargetInputs){
            const flatApplication = (0, _utils.isDefined)(createRoleTargetInput.applicationId) ? flatApplicationMaps.byId[createRoleTargetInput.applicationId] : undefined;
            const { flatRoleTargetToCreate, flatRoleTargetsToDelete } = (0, _fromcreateroletargetinputtoflatroletargettocreateutil.fromCreateRoleTargetInputToFlatRoleTargetToCreate)({
                createRoleTargetInput,
                flatRoleTargetMaps,
                flatRoleMaps,
                workspaceId,
                flatApplication: flatApplication ?? workspaceCustomFlatApplication
            });
            allFlatRoleTargetsToCreate.push(flatRoleTargetToCreate);
            allFlatRoleTargetsToDelete.push(...flatRoleTargetsToDelete);
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                roleTarget: {
                    flatEntityToCreate: allFlatRoleTargetsToCreate,
                    flatEntityToDelete: allFlatRoleTargetsToDelete,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating role targets');
        }
        const { flatRoleTargetMaps: recomputedFlatRoleTargetMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRoleTargetMaps'
            ]
        });
        return allFlatRoleTargetsToCreate.map((flatRoleTargetToCreate)=>(0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: flatRoleTargetToCreate.id,
                flatEntityMaps: recomputedFlatRoleTargetMaps
            }));
    }
    async delete({ id, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatRoleTargetMaps: existingFlatRoleTargetMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRoleTargetMaps'
            ]
        });
        const roleTargetToDelete = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: existingFlatRoleTargetMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                roleTarget: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        roleTargetToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting role target');
        }
    }
    async findOne({ findRoleTargetInput }) {
        const { workspaceId, id } = findRoleTargetInput;
        const { flatRoleTargetMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRoleTargetMaps'
            ]
        });
        const roleTarget = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatRoleTargetMaps
        });
        return roleTarget ?? null;
    }
    constructor(flatEntityMapsCacheService, workspaceMigrationValidateBuildAndRunService, applicationService){
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.applicationService = applicationService;
    }
};
RoleTargetService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], RoleTargetService);

//# sourceMappingURL=role-target.service.js.map