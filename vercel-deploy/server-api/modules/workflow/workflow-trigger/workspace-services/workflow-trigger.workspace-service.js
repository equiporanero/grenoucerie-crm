"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowTriggerWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowTriggerWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _cachestoragedecorator = require("../../../../engine/core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _commandmenuitemservice = require("../../../../engine/metadata-modules/command-menu-item/command-menu-item.service");
const _commandmenuitemavailabilitytypeenum = require("../../../../engine/metadata-modules/command-menu-item/enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../../../../engine/metadata-modules/command-menu-item/enums/engine-component-key.enum");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workspaceeventemitter = require("../../../../engine/workspace-event-emitter/workspace-event-emitter");
const _workflowautomatedtriggerworkspaceentity = require("../../common/standard-objects/workflow-automated-trigger.workspace-entity");
const _workflowversionworkspaceentity = require("../../common/standard-objects/workflow-version.workspace-entity");
const _assertworkflowversiontriggerisdefinedutil = require("../../common/utils/assert-workflow-version-trigger-is-defined.util");
const _workflowcommonworkspaceservice = require("../../common/workspace-services/workflow-common.workspace-service");
const _codestepbuildservice = require("../../workflow-builder/workflow-version-step/code-step/services/code-step-build.service");
const _workflowrunnerworkspaceservice = require("../../workflow-runner/workspace-services/workflow-runner.workspace-service");
const _workflowversionstatusupdatedconstants = require("../../workflow-status/constants/workflow-version-status-updated.constants");
const _automatedtriggerworkspaceservice = require("../automated-trigger/automated-trigger.workspace-service");
const _workflowcrontriggercachekeyconstant = require("../automated-trigger/crons/constants/workflow-cron-trigger-cache-key.constant");
const _workflowtriggerexception = require("../exceptions/workflow-trigger.exception");
const _workflowtriggertype = require("../types/workflow-trigger.type");
const _assertversioncanbeactivatedutil = require("../utils/assert-version-can-be-activated.util");
const _computecronpatternfromschedule = require("../utils/compute-cron-pattern-from-schedule");
const _assert = require("../../../../utils/assert");
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
let WorkflowTriggerWorkspaceService = class WorkflowTriggerWorkspaceService {
    async runWorkflowVersion({ workflowVersionId, payload, createdBy, workflowRunId, workspaceId }) {
        await this.workflowCommonWorkspaceService.getWorkflowVersionOrFail({
            workflowVersionId,
            workspaceId
        });
        return this.workflowRunnerWorkspaceService.run({
            workspaceId,
            workflowRunId,
            workflowVersionId,
            payload,
            source: createdBy
        });
    }
    async activateWorkflowVersion(workflowVersionId, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const workflowVersionNullable = await workflowVersionRepository.findOne({
                where: {
                    id: workflowVersionId
                }
            });
            const workflowVersion = await this.workflowCommonWorkspaceService.getValidWorkflowVersionOrFail(workflowVersionNullable);
            const workflowRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflow', {
                shouldBypassPermissionChecks: true
            });
            const workflow = await workflowRepository.findOne({
                where: {
                    id: workflowVersion.workflowId
                }
            });
            if (!workflow) {
                throw new _workflowtriggerexception.WorkflowTriggerException('No workflow found', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION);
            }
            (0, _assertversioncanbeactivatedutil.assertVersionCanBeActivated)(workflowVersion, workflow);
            await this.codeStepBuildService.buildCodeStepsFromSourceForSteps({
                workspaceId,
                steps: workflowVersion.steps ?? []
            });
            await this.performActivationSteps(workflow, workflowVersion, workflowRepository, workflowVersionRepository, workspaceId);
            return true;
        }, authContext);
    }
    async deactivateWorkflowVersion(workflowVersionId, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            await this.performDeactivationSteps(workflowVersionId, workflowVersionRepository, workspaceId);
            return true;
        }, authContext);
    }
    async stopWorkflowRun(workflowRunId, workspaceId) {
        return this.workflowRunnerWorkspaceService.stopWorkflowRun(workspaceId, workflowRunId);
    }
    async performActivationSteps(workflow, workflowVersion, workflowRepository, workflowVersionRepository, workspaceId) {
        const previousPublishedVersionId = workflow.lastPublishedVersionId;
        if (previousPublishedVersionId && workflowVersion.id !== previousPublishedVersionId) {
            await this.performDeactivationSteps(previousPublishedVersionId, workflowVersionRepository, workspaceId);
        }
        await this.createOrUpdateCommandMenuItem(workflow, workflowVersion, workspaceId);
        const workspaceDataSource = await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource();
        const queryRunner = workspaceDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (workflow.lastPublishedVersionId !== workflowVersion.id) {
                if (workflow.lastPublishedVersionId) {
                    await workflowVersionRepository.update({
                        id: workflow.lastPublishedVersionId
                    }, {
                        status: _workflowversionworkspaceentity.WorkflowVersionStatus.ARCHIVED
                    }, queryRunner.manager);
                }
                await workflowRepository.update({
                    id: workflow.id
                }, {
                    lastPublishedVersionId: workflowVersion.id
                }, queryRunner.manager);
            }
            const activeWorkflowVersions = await workflowVersionRepository.find({
                where: {
                    workflowId: workflowVersion.workflowId,
                    status: _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE
                }
            }, queryRunner.manager);
            if (activeWorkflowVersions.length > 0) {
                throw new _workflowtriggerexception.WorkflowTriggerException('Cannot have more than one active workflow version', _workflowtriggerexception.WorkflowTriggerExceptionCode.FORBIDDEN, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "IDMgr/",
                        message: "Cannot have more than one active workflow version"
                    }
                });
            }
            await workflowVersionRepository.update({
                id: workflowVersion.id
            }, {
                status: _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE
            }, queryRunner.manager);
            await this.enableAutomatedTrigger(workflowVersion, workspaceId, {
                entityManager: queryRunner.manager
            });
            await queryRunner.commitTransaction();
        } catch (error) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally{
            await queryRunner.release();
        }
        await this.emitStatusUpdateEvents(workflowVersion, _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE, workspaceId);
    }
    async performDeactivationSteps(workflowVersionId, workflowVersionRepository, workspaceId) {
        const workflowVersionNullable = await workflowVersionRepository.findOne({
            where: {
                id: workflowVersionId
            }
        });
        const workflowVersion = await this.workflowCommonWorkspaceService.getValidWorkflowVersionOrFail(workflowVersionNullable);
        if (workflowVersion.status !== _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE) {
            return;
        }
        await this.deleteCommandMenuItem(workflowVersion, workspaceId);
        const workspaceDataSource = await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource();
        const queryRunner = workspaceDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await workflowVersionRepository.update({
                id: workflowVersion.id
            }, {
                status: _workflowversionworkspaceentity.WorkflowVersionStatus.DEACTIVATED
            }, queryRunner.manager);
            await this.disableAutomatedTrigger(workflowVersion, workspaceId, {
                entityManager: queryRunner.manager
            });
            await queryRunner.commitTransaction();
        } catch (error) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally{
            await queryRunner.release();
        }
        await this.emitStatusUpdateEvents(workflowVersion, _workflowversionworkspaceentity.WorkflowVersionStatus.DEACTIVATED, workspaceId);
    }
    async resolveManualTriggerAvailability(trigger, workspaceId) {
        const availability = trigger.settings.availability;
        let availabilityType = _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL;
        let availabilityObjectMetadataId;
        if (availability) {
            switch(availability.type){
                case 'GLOBAL':
                    availabilityType = _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL;
                    break;
                case 'SINGLE_RECORD':
                case 'BULK_RECORDS':
                    {
                        availabilityType = _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.RECORD_SELECTION;
                        const { objectIdByNameSingular } = await this.workflowCommonWorkspaceService.getFlatEntityMaps(workspaceId);
                        const objectId = objectIdByNameSingular[availability.objectNameSingular];
                        if (!objectId) {
                            throw new _workflowtriggerexception.WorkflowTriggerException(`Object metadata not found for object: ${availability.objectNameSingular}`, _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION);
                        }
                        availabilityObjectMetadataId = objectId;
                        break;
                    }
            }
        }
        return {
            availabilityType,
            availabilityObjectMetadataId
        };
    }
    async createOrUpdateCommandMenuItem(workflow, workflowVersion, workspaceId) {
        (0, _assertworkflowversiontriggerisdefinedutil.assertWorkflowVersionTriggerIsDefined)(workflowVersion);
        if (workflowVersion.trigger.type !== _workflowtriggertype.WorkflowTriggerType.MANUAL) {
            return;
        }
        const trigger = workflowVersion.trigger;
        const { availabilityType, availabilityObjectMetadataId } = await this.resolveManualTriggerAvailability(trigger, workspaceId);
        const label = (0, _guards.isNonEmptyString)(workflow.name) ? workflow.name : 'Manual Trigger';
        const existingCommandMenuItem = await this.commandMenuItemService.findByWorkflowVersionId(workflowVersion.id, workspaceId);
        if (existingCommandMenuItem) {
            await this.commandMenuItemService.update({
                id: existingCommandMenuItem.id,
                label,
                shortLabel: label,
                icon: trigger.settings.icon,
                isPinned: trigger.settings.isPinned,
                availabilityType,
                availabilityObjectMetadataId
            }, workspaceId);
        } else {
            await this.commandMenuItemService.create({
                workflowVersionId: workflowVersion.id,
                engineComponentKey: _enginecomponentkeyenum.EngineComponentKey.TRIGGER_WORKFLOW_VERSION,
                label,
                shortLabel: label,
                icon: trigger.settings.icon,
                isPinned: trigger.settings.isPinned,
                availabilityType,
                availabilityObjectMetadataId
            }, workspaceId);
        }
    }
    async deleteCommandMenuItem(workflowVersion, workspaceId) {
        (0, _assertworkflowversiontriggerisdefinedutil.assertWorkflowVersionTriggerIsDefined)(workflowVersion);
        if (workflowVersion.trigger.type !== _workflowtriggertype.WorkflowTriggerType.MANUAL) {
            return;
        }
        const existingCommandMenuItem = await this.commandMenuItemService.findByWorkflowVersionId(workflowVersion.id, workspaceId);
        if (existingCommandMenuItem) {
            await this.commandMenuItemService.delete(existingCommandMenuItem.id, workspaceId);
        }
    }
    async enableAutomatedTrigger(workflowVersion, workspaceId, transactionContext) {
        (0, _assertworkflowversiontriggerisdefinedutil.assertWorkflowVersionTriggerIsDefined)(workflowVersion);
        switch(workflowVersion.trigger.type){
            case _workflowtriggertype.WorkflowTriggerType.MANUAL:
            case _workflowtriggertype.WorkflowTriggerType.WEBHOOK:
                return;
            case _workflowtriggertype.WorkflowTriggerType.DATABASE_EVENT:
                {
                    const settings = workflowVersion.trigger.settings;
                    await this.automatedTriggerWorkspaceService.addAutomatedTrigger({
                        workflowId: workflowVersion.workflowId,
                        type: _workflowautomatedtriggerworkspaceentity.AutomatedTriggerType.DATABASE_EVENT,
                        settings,
                        workspaceId,
                        entityManager: transactionContext?.entityManager
                    });
                    return;
                }
            case _workflowtriggertype.WorkflowTriggerType.CRON:
                {
                    const pattern = (0, _computecronpatternfromschedule.computeCronPatternFromSchedule)(workflowVersion.trigger);
                    await this.automatedTriggerWorkspaceService.addAutomatedTrigger({
                        workflowId: workflowVersion.workflowId,
                        type: _workflowautomatedtriggerworkspaceentity.AutomatedTriggerType.CRON,
                        settings: {
                            pattern
                        },
                        workspaceId,
                        entityManager: transactionContext?.entityManager
                    });
                    const cachedTrigger = {
                        workspaceId,
                        workflowId: workflowVersion.workflowId,
                        pattern
                    };
                    await this.cacheStorageService.hashSetIfExists({
                        key: _workflowcrontriggercachekeyconstant.WORKFLOW_CRON_TRIGGER_CACHE_KEY,
                        field: workflowVersion.workflowId,
                        value: JSON.stringify(cachedTrigger)
                    });
                    return;
                }
            default:
                (0, _assert.assertNever)(workflowVersion.trigger);
        }
    }
    async disableAutomatedTrigger(workflowVersion, workspaceId, transactionContext) {
        (0, _assertworkflowversiontriggerisdefinedutil.assertWorkflowVersionTriggerIsDefined)(workflowVersion);
        switch(workflowVersion.trigger.type){
            case _workflowtriggertype.WorkflowTriggerType.DATABASE_EVENT:
                await this.automatedTriggerWorkspaceService.deleteAutomatedTrigger({
                    workflowId: workflowVersion.workflowId,
                    workspaceId,
                    entityManager: transactionContext?.entityManager
                });
                return;
            case _workflowtriggertype.WorkflowTriggerType.CRON:
                await this.automatedTriggerWorkspaceService.deleteAutomatedTrigger({
                    workflowId: workflowVersion.workflowId,
                    workspaceId,
                    entityManager: transactionContext?.entityManager
                });
                await this.cacheStorageService.hashDelete({
                    key: _workflowcrontriggercachekeyconstant.WORKFLOW_CRON_TRIGGER_CACHE_KEY,
                    field: workflowVersion.workflowId
                });
                return;
            case _workflowtriggertype.WorkflowTriggerType.MANUAL:
            case _workflowtriggertype.WorkflowTriggerType.WEBHOOK:
                return;
            default:
                (0, _assert.assertNever)(workflowVersion.trigger);
        }
    }
    async emitStatusUpdateEvents(workflowVersion, newStatus, workspaceId) {
        this.workspaceEventEmitter.emitCustomBatchEvent(_workflowversionstatusupdatedconstants.WORKFLOW_VERSION_STATUS_UPDATED, [
            {
                workflowId: workflowVersion.workflowId,
                workflowVersionId: workflowVersion.id,
                previousStatus: workflowVersion.status,
                newStatus
            }
        ], workspaceId);
    }
    constructor(globalWorkspaceOrmManager, workflowCommonWorkspaceService, codeStepBuildService, workflowRunnerWorkspaceService, automatedTriggerWorkspaceService, workspaceEventEmitter, commandMenuItemService, cacheStorageService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
        this.codeStepBuildService = codeStepBuildService;
        this.workflowRunnerWorkspaceService = workflowRunnerWorkspaceService;
        this.automatedTriggerWorkspaceService = automatedTriggerWorkspaceService;
        this.workspaceEventEmitter = workspaceEventEmitter;
        this.commandMenuItemService = commandMenuItemService;
        this.cacheStorageService = cacheStorageService;
        this.logger = new _common.Logger(WorkflowTriggerWorkspaceService.name);
    }
};
WorkflowTriggerWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(7, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleWorkflow)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService,
        typeof _codestepbuildservice.CodeStepBuildService === "undefined" ? Object : _codestepbuildservice.CodeStepBuildService,
        typeof _workflowrunnerworkspaceservice.WorkflowRunnerWorkspaceService === "undefined" ? Object : _workflowrunnerworkspaceservice.WorkflowRunnerWorkspaceService,
        typeof _automatedtriggerworkspaceservice.AutomatedTriggerWorkspaceService === "undefined" ? Object : _automatedtriggerworkspaceservice.AutomatedTriggerWorkspaceService,
        typeof _workspaceeventemitter.WorkspaceEventEmitter === "undefined" ? Object : _workspaceeventemitter.WorkspaceEventEmitter,
        typeof _commandmenuitemservice.CommandMenuItemService === "undefined" ? Object : _commandmenuitemservice.CommandMenuItemService,
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService
    ])
], WorkflowTriggerWorkspaceService);

//# sourceMappingURL=workflow-trigger.workspace-service.js.map