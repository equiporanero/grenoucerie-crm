"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CodeStepBuildService", {
    enumerable: true,
    get: function() {
        return CodeStepBuildService;
    }
});
const _common = require("@nestjs/common");
const _logicfunction = require("twenty-shared/logic-function");
const _utils = require("twenty-shared/utils");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _logicfunctionfromsourceservice = require("../../../../../../engine/metadata-modules/logic-function/services/logic-function-from-source.service");
const _workflowactiontype = require("../../../../workflow-executor/workflow-actions/types/workflow-action.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CodeStepBuildService = class CodeStepBuildService {
    async createCodeStepLogicFunction({ logicFunctionId, workspaceId }) {
        return await this.logicFunctionFromSourceService.createOneFromSource({
            input: {
                id: logicFunctionId,
                name: 'A Code Step',
                description: '',
                workflowActionTriggerSettings: _logicfunction.SEED_WORKFLOW_ACTION_TRIGGER_SETTINGS
            },
            workspaceId
        });
    }
    async duplicateCodeStepLogicFunction({ existingLogicFunctionId, workspaceId }) {
        return this.logicFunctionFromSourceService.duplicateOneWithSource({
            existingLogicFunctionId,
            workspaceId
        });
    }
    async buildCodeStepsFromSourceForSteps({ workspaceId, steps }) {
        const codeSteps = steps.filter((step)=>step.type === _workflowactiontype.WorkflowActionType.CODE && (0, _utils.isDefined)(step.settings?.input?.logicFunctionId));
        if (codeSteps.length === 0) {
            return;
        }
        const { flatLogicFunctionMaps, flatApplicationMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatLogicFunctionMaps',
                'flatApplicationMaps'
            ]
        });
        for (const step of codeSteps){
            const logicFunctionId = step.settings.input.logicFunctionId;
            const flatLogicFunction = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: logicFunctionId,
                flatEntityMaps: flatLogicFunctionMaps
            });
            if (!(0, _utils.isDefined)(flatLogicFunction) || flatLogicFunction.deletedAt || flatLogicFunction.isBuildUpToDate) {
                continue;
            }
            const applicationUniversalIdentifier = (0, _utils.isDefined)(flatLogicFunction.applicationId) ? flatApplicationMaps.byId[flatLogicFunction.applicationId]?.universalIdentifier : undefined;
            if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
                continue;
            }
            await this.logicFunctionFromSourceService.buildOneFromSource({
                workspaceId,
                id: logicFunctionId
            });
        }
    }
    constructor(workspaceManyOrAllFlatEntityMapsCacheService, logicFunctionFromSourceService){
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.logicFunctionFromSourceService = logicFunctionFromSourceService;
    }
};
CodeStepBuildService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _logicfunctionfromsourceservice.LogicFunctionFromSourceService === "undefined" ? Object : _logicfunctionfromsourceservice.LogicFunctionFromSourceService
    ])
], CodeStepBuildService);

//# sourceMappingURL=code-step-build.service.js.map