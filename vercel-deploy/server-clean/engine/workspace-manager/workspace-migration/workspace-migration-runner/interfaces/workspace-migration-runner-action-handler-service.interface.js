"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get BaseWorkspaceMigrationRunnerActionHandlerService () {
        return BaseWorkspaceMigrationRunnerActionHandlerService;
    },
    get WorkspaceMigrationRunnerActionHandler () {
        return WorkspaceMigrationRunnerActionHandler;
    }
});
const _common = require("@nestjs/common");
const _loggerservice = require("../../../../core-modules/logger/logger.service");
const _allmetadataentitybymetadatanameconstant = require("../../../../metadata-modules/flat-entity/constant/all-metadata-entity-by-metadata-name.constant");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _sanitizeuniversalflatentityupdateutil = require("../../universal-flat-entity/utils/sanitize-universal-flat-entity-update.util");
const _workspacemigrationactioncommon = require("../../workspace-migration-builder/types/workspace-migration-action-common");
const _workspacemigrationactionhandlermetadatakeyconstant = require("../constants/workspace-migration-action-handler-metadata-key.constant");
const _workspacemigrationrunnerexception = require("../exceptions/workspace-migration-runner.exception");
const _derivemetadataeventsfromcreateactionutil = require("../utils/derive-metadata-events-from-create-action.util");
const _derivemetadataeventsfromdeleteactionutil = require("../utils/derive-metadata-events-from-delete-action.util");
const _derivemetadataeventsfromupdateactionutil = require("../utils/derive-metadata-events-from-update-action.util");
const _flatentitytoscalarflatentityutil = require("../utils/flat-entity-to-scalar-flat-entity.util");
const _optimisticallyapplycreateactiononallflatentitymapsutil = require("../utils/optimistically-apply-create-action-on-all-flat-entity-maps.util");
const _optimisticallyapplydeleteactiononallflatentitymapsutil = require("../utils/optimistically-apply-delete-action-on-all-flat-entity-maps.util");
const _optimisticallyapplyupdateactiononallflatentitymapsutil = require("../utils/optimistically-apply-update-action-on-all-flat-entity-maps.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BaseWorkspaceMigrationRunnerActionHandlerService = class BaseWorkspaceMigrationRunnerActionHandlerService {
    async insertFlatEntitiesInRepository({ flatEntities, queryRunner }) {
        const metadataEntity = _allmetadataentitybymetadatanameconstant.ALL_METADATA_ENTITY_BY_METADATA_NAME[this.metadataName];
        const repository = queryRunner.manager.getRepository(metadataEntity);
        const scalarFlatEntities = flatEntities.map((flatEntity)=>(0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                flatEntity,
                metadataName: this.metadataName
            }));
        await repository.insert(scalarFlatEntities);
    }
    transpileUniversalDeleteActionToFlatDeleteAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatEntityMaps = allFlatEntityMaps[(0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(action.metadataName)];
        const flatEntity = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps,
            universalIdentifier: action.universalIdentifier
        });
        return {
            type: 'delete',
            metadataName: this.metadataName,
            entityId: flatEntity.id
        };
    }
    executeForMetadata(_context) {
        return Promise.resolve();
    }
    executeForWorkspaceSchema(_context) {
        return Promise.resolve();
    }
    optimisticallyApplyActionOnAllFlatEntityMaps({ flatAction, allFlatEntityMaps }) {
        switch(flatAction.type){
            case 'create':
                {
                    return (0, _optimisticallyapplycreateactiononallflatentitymapsutil.optimisticallyApplyCreateActionOnAllFlatEntityMaps)({
                        flatAction,
                        allFlatEntityMaps
                    });
                }
            case 'delete':
                {
                    return (0, _optimisticallyapplydeleteactiononallflatentitymapsutil.optimisticallyApplyDeleteActionOnAllFlatEntityMaps)({
                        flatAction,
                        allFlatEntityMaps
                    });
                }
            case 'update':
                {
                    return (0, _optimisticallyapplyupdateactiononallflatentitymapsutil.optimisticallyApplyUpdateActionOnAllFlatEntityMaps)({
                        flatAction,
                        allFlatEntityMaps
                    });
                }
        }
    }
    deriveMetadataEventsFromFlatAction({ flatAction, allFlatEntityMaps }) {
        switch(flatAction.type){
            case 'create':
                {
                    return (0, _derivemetadataeventsfromcreateactionutil.deriveMetadataEventsFromCreateAction)(flatAction);
                }
            case 'delete':
                {
                    return (0, _derivemetadataeventsfromdeleteactionutil.deriveMetadataEventsFromDeleteAction)({
                        flatAction,
                        allFlatEntityMaps
                    });
                }
            case 'update':
                {
                    return (0, _derivemetadataeventsfromupdateactionutil.deriveMetadataEventsFromUpdateAction)({
                        flatAction,
                        allFlatEntityMaps
                    });
                }
        }
    }
    rollbackForMetadata(_context) {
        return Promise.resolve();
    }
    sanitizeUniversalAction(universalAction) {
        if (universalAction.type === 'update') {
            const sanitizedFlatEntityUpdate = (0, _sanitizeuniversalflatentityupdateutil.sanitizeUniversalFlatEntityUpdate)({
                metadataName: universalAction.metadataName,
                flatEntityUpdate: universalAction.update
            });
            return {
                ...universalAction,
                update: sanitizedFlatEntityUpdate
            };
        }
        return universalAction;
    }
    async transpileUniversalActionToFlatActionOrThrow(context) {
        try {
            const sanitizedUniversalAction = this.sanitizeUniversalAction(context.action);
            return await this.transpileUniversalActionToFlatAction({
                ...context,
                action: sanitizedUniversalAction
            });
        } catch (error) {
            throw new _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException({
                action: context.action,
                errors: {
                    actionTranspilation: error
                },
                code: _workspacemigrationrunnerexception.WorkspaceMigrationRunnerExceptionCode.EXECUTION_FAILED
            });
        }
    }
    async execute(context) {
        const flatAction = await this.transpileUniversalActionToFlatActionOrThrow(context);
        const [metadataResult, workspaceSchemaResult] = await Promise.allSettled([
            this.asyncMethodPerformanceMetricWrapper({
                label: 'executeForMetadata',
                method: async ()=>this.executeForMetadata({
                        ...context,
                        flatAction
                    })
            }),
            this.asyncMethodPerformanceMetricWrapper({
                label: 'executeForWorkspaceSchema',
                method: async ()=>this.executeForWorkspaceSchema({
                        ...context,
                        flatAction
                    })
            })
        ]);
        const hasMetadataError = metadataResult.status === 'rejected';
        const hasWorkspaceSchemaError = workspaceSchemaResult.status === 'rejected';
        if (hasMetadataError || hasWorkspaceSchemaError) {
            throw new _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException({
                action: context.action,
                errors: {
                    ...hasMetadataError && {
                        metadata: metadataResult.reason
                    },
                    ...hasWorkspaceSchemaError && {
                        workspaceSchema: workspaceSchemaResult.reason
                    }
                },
                code: _workspacemigrationrunnerexception.WorkspaceMigrationRunnerExceptionCode.EXECUTION_FAILED
            });
        }
        const metadataEvents = this.deriveMetadataEventsFromFlatAction({
            flatAction,
            allFlatEntityMaps: context.allFlatEntityMaps
        });
        const partialOptimisticCache = this.optimisticallyApplyActionOnAllFlatEntityMaps({
            flatAction,
            allFlatEntityMaps: context.allFlatEntityMaps
        });
        return {
            partialOptimisticCache,
            metadataEvents
        };
    }
    async rollback(context) {
        try {
            await this.rollbackForMetadata(context);
        } catch (error) {
            this.logger.error(`Failed to rollback ${context.action.type} action for ${context.action.metadataName}: ${error instanceof Error ? error.message : String(error)}`, 'BaseWorkspaceMigrationRunnerActionHandlerService');
        }
    }
    async asyncMethodPerformanceMetricWrapper({ label, method }) {
        this.logger.time('BaseWorkspaceMigrationRunnerActionHandlerService', `${this.actionType}_${this.metadataName} ${label}`);
        await method();
        this.logger.timeEnd('BaseWorkspaceMigrationRunnerActionHandlerService', `${this.actionType}_${this.metadataName} ${label}`);
    }
};
_ts_decorate([
    (0, _common.Inject)(_loggerservice.LoggerService),
    _ts_metadata("design:type", typeof _loggerservice.LoggerService === "undefined" ? Object : _loggerservice.LoggerService)
], BaseWorkspaceMigrationRunnerActionHandlerService.prototype, "logger", void 0);
function WorkspaceMigrationRunnerActionHandler(actionType, metadataName) {
    let ActionHandlerService = class ActionHandlerService extends BaseWorkspaceMigrationRunnerActionHandlerService {
        constructor(...args){
            super(...args), this.actionType = actionType, this.metadataName = metadataName;
        }
    };
    (0, _common.SetMetadata)(_workspacemigrationactionhandlermetadatakeyconstant.WORKSPACE_MIGRATION_ACTION_HANDLER_METADATA_KEY, (0, _workspacemigrationactioncommon.buildActionHandlerKey)(actionType, metadataName))(ActionHandlerService);
    return ActionHandlerService;
}

//# sourceMappingURL=workspace-migration-runner-action-handler-service.interface.js.map