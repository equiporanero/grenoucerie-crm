"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowCommonWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowCommonWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _commandmenuitemservice = require("../../../../engine/metadata-modules/command-menu-item/command-menu-item.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildobjectidbynamemapsutil = require("../../../../engine/metadata-modules/flat-object-metadata/utils/build-object-id-by-name-maps.util");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _logicfunctionfromsourceservice = require("../../../../engine/metadata-modules/logic-function/services/logic-function-from-source.service");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowcommonexception = require("../exceptions/workflow-common.exception");
const _workflowversionworkspaceentity = require("../standard-objects/workflow-version.workspace-entity");
const _workflowworkspaceentity = require("../standard-objects/workflow.workspace-entity");
const _workflowactiontype = require("../../workflow-executor/workflow-actions/types/workflow-action.type");
const _workflowtriggerexception = require("../../workflow-trigger/exceptions/workflow-trigger.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowCommonWorkspaceService = class WorkflowCommonWorkspaceService {
    async getWorkflowVersionOrFail({ workspaceId, workflowVersionId }) {
        if (!workflowVersionId) {
            throw new _workflowtriggerexception.WorkflowTriggerException('Workflow version ID is required', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_INPUT);
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const workflowVersion = await workflowVersionRepository.findOne({
                where: {
                    id: workflowVersionId
                }
            });
            return this.getValidWorkflowVersionOrFail(workflowVersion);
        }, authContext);
    }
    async getValidWorkflowVersionOrFail(workflowVersion) {
        if (!workflowVersion) {
            throw new _workflowtriggerexception.WorkflowTriggerException('Workflow version not found', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_INPUT);
        }
        return {
            ...workflowVersion,
            trigger: workflowVersion.trigger
        };
    }
    async getFlatEntityMaps(workspaceId) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const { idByNameSingular } = (0, _buildobjectidbynamemapsutil.buildObjectIdByNameMaps)(flatObjectMetadataMaps);
        return {
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            objectIdByNameSingular: idByNameSingular
        };
    }
    async getObjectMetadataInfo(objectNameSingular, workspaceId) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.getFlatEntityMaps(workspaceId);
        const objectId = objectIdByNameSingular[objectNameSingular];
        if (!(0, _utils.isDefined)(objectId)) {
            throw new _workflowcommonexception.WorkflowCommonException(`Failed to read: Object ${objectNameSingular} not found`, _workflowcommonexception.WorkflowCommonExceptionCode.OBJECT_METADATA_NOT_FOUND);
        }
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: objectId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            throw new _workflowcommonexception.WorkflowCommonException(`Failed to read: Object ${objectNameSingular} not found`, _workflowcommonexception.WorkflowCommonExceptionCode.OBJECT_METADATA_NOT_FOUND);
        }
        return {
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        };
    }
    async handleWorkflowSubEntities({ workflowIds, workspaceId, operation }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const workflowRunRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowRun', {
                shouldBypassPermissionChecks: true
            });
            const workflowAutomatedTriggerRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowAutomatedTrigger', {
                shouldBypassPermissionChecks: true
            });
            for (const workflowId of workflowIds){
                switch(operation){
                    case 'delete':
                        await workflowAutomatedTriggerRepository.softDelete({
                            workflowId
                        });
                        await workflowRunRepository.softDelete({
                            workflowId
                        });
                        await workflowVersionRepository.softDelete({
                            workflowId
                        });
                        break;
                    case 'restore':
                        await workflowAutomatedTriggerRepository.restore({
                            workflowId
                        });
                        await workflowRunRepository.restore({
                            workflowId
                        });
                        await workflowVersionRepository.restore({
                            workflowId
                        });
                        break;
                }
                await this.deactivateVersionOnDelete({
                    workflowVersionRepository,
                    workflowId,
                    workspaceId,
                    operation
                });
                await this.handleLogicFunctionSubEntities({
                    workflowVersionRepository,
                    workflowId,
                    workspaceId,
                    operation
                });
            }
        }, authContext);
    }
    async deactivateVersionOnDelete({ workflowVersionRepository, workflowId, workspaceId, operation }) {
        if (operation !== 'delete') {
            return;
        }
        const workflowRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflow', {
            shouldBypassPermissionChecks: true
        });
        const workflowVersions = await workflowVersionRepository.find({
            where: {
                workflowId
            },
            withDeleted: true
        });
        for (const workflowVersion of workflowVersions){
            if (workflowVersion.status === _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE) {
                await this.cleanupCommandMenuItemForVersion(workflowVersion.id, workspaceId);
            }
        }
        const workspaceDataSource = await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource();
        const queryRunner = workspaceDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const workflow = await workflowRepository.findOne({
                where: {
                    id: workflowId
                },
                withDeleted: true
            }, queryRunner.manager);
            if (workflow?.statuses?.includes(_workflowworkspaceentity.WorkflowStatus.ACTIVE)) {
                const newStatuses = [
                    ...workflow.statuses.filter((status)=>status !== _workflowworkspaceentity.WorkflowStatus.ACTIVE),
                    _workflowworkspaceentity.WorkflowStatus.DEACTIVATED
                ];
                await workflowRepository.update(workflowId, {
                    statuses: newStatuses
                }, queryRunner.manager);
            }
            for (const workflowVersion of workflowVersions){
                if (workflowVersion.status === _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE) {
                    await workflowVersionRepository.update(workflowVersion.id, {
                        status: _workflowversionworkspaceentity.WorkflowVersionStatus.DEACTIVATED
                    }, queryRunner.manager);
                }
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally{
            await queryRunner.release();
        }
    }
    async cleanupCommandMenuItemForVersion(workflowVersionId, workspaceId) {
        const existingCommandMenuItem = await this.commandMenuItemService.findByWorkflowVersionId(workflowVersionId, workspaceId);
        if ((0, _utils.isDefined)(existingCommandMenuItem)) {
            await this.commandMenuItemService.delete(existingCommandMenuItem.id, workspaceId);
        }
    }
    async handleLogicFunctionSubEntities({ workflowVersionRepository, workflowId, workspaceId, operation }) {
        // Only handle destroy operation - soft delete/restore is no longer supported
        if (operation !== 'destroy') {
            return;
        }
        const workflowVersions = await workflowVersionRepository.find({
            where: {
                workflowId
            },
            withDeleted: true
        });
        for (const workflowVersion of workflowVersions){
            for (const step of workflowVersion.steps ?? []){
                if (step.type === _workflowactiontype.WorkflowActionType.CODE) {
                    await this.logicFunctionFromSourceService.deleteOneWithSource({
                        id: step.settings.input.logicFunctionId,
                        workspaceId
                    });
                }
            }
        }
    }
    constructor(globalWorkspaceOrmManager, logicFunctionFromSourceService, workspaceManyOrAllFlatEntityMapsCacheService, commandMenuItemService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logicFunctionFromSourceService = logicFunctionFromSourceService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.commandMenuItemService = commandMenuItemService;
        this.logger = new _common.Logger(WorkflowCommonWorkspaceService.name);
    }
};
WorkflowCommonWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _logicfunctionfromsourceservice.LogicFunctionFromSourceService === "undefined" ? Object : _logicfunctionfromsourceservice.LogicFunctionFromSourceService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _commandmenuitemservice.CommandMenuItemService === "undefined" ? Object : _commandmenuitemservice.CommandMenuItemService
    ])
], WorkflowCommonWorkspaceService);

//# sourceMappingURL=workflow-common.workspace-service.js.map