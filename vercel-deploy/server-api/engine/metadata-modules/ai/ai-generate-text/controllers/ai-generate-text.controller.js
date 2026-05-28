"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiGenerateTextController", {
    enumerable: true,
    get: function() {
        return AiGenerateTextController;
    }
});
const _common = require("@nestjs/common");
const _ai = require("ai");
const _constants = require("twenty-shared/constants");
const _restapiexceptionfilter = require("../../../../api/rest/rest-api-exception.filter");
const _billingusageservice = require("../../../../core-modules/billing/services/billing-usage.service");
const _usageoperationtypeenum = require("../../../../core-modules/usage/enums/usage-operation-type.enum");
const _authuserworkspaceiddecorator = require("../../../../decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../../../decorators/auth/auth-workspace.decorator");
const _jwtauthguard = require("../../../../guards/jwt-auth.guard");
const _settingspermissionguard = require("../../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../../guards/workspace-auth.guard");
const _aiexception = require("../../ai.exception");
const _aibillingservice = require("../../ai-billing/services/ai-billing.service");
const _aiapiexceptionfilter = require("../../filters/ai-api-exception.filter");
const _generatetextinput = require("../dtos/generate-text.input");
const _aimodelregistryservice = require("../../ai-models/services/ai-model-registry.service");
const _permissionsrestapiexceptionfilter = require("../../../permissions/utils/permissions-rest-api-exception.filter");
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
let AiGenerateTextController = class AiGenerateTextController {
    async handleGenerateText(body, workspace, userWorkspaceId) {
        if (this.aiModelRegistryService.getAvailableModels().length === 0) {
            throw new _aiexception.AiException('No AI models are available. Please configure at least one AI provider API key.', _aiexception.AiExceptionCode.API_KEY_NOT_CONFIGURED);
        }
        await this.billingUsageService.hasAvailableCreditsOrThrow(workspace.id);
        const resolvedModelId = body.modelId ?? workspace.fastModel;
        this.aiModelRegistryService.validateModelAvailability(resolvedModelId, workspace);
        const registeredModel = await this.aiModelRegistryService.resolveModelForAgent({
            modelId: resolvedModelId
        });
        let result;
        try {
            result = await (0, _ai.generateText)({
                model: registeredModel.model,
                system: body.systemPrompt,
                prompt: body.userPrompt
            });
            return {
                text: result.text,
                usage: {
                    inputTokens: result.usage?.inputTokens ?? 0,
                    outputTokens: result.usage?.outputTokens ?? 0
                }
            };
        } finally{
            if (result) {
                void this.aiBillingService.calculateAndBillUsage(resolvedModelId, {
                    usage: result.usage,
                    cacheCreationTokens: result.usage.inputTokenDetails?.cacheWriteTokens ?? 0
                }, workspace.id, _usageoperationtypeenum.UsageOperationType.AI_WORKFLOW_TOKEN, null, userWorkspaceId);
            }
        }
    }
    constructor(aiModelRegistryService, aiBillingService, billingUsageService){
        this.aiModelRegistryService = aiModelRegistryService;
        this.aiBillingService = aiBillingService;
        this.billingUsageService = billingUsageService;
    }
};
_ts_decorate([
    (0, _common.Post)('generate-text'),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.AI)),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _generatetextinput.GenerateTextInput === "undefined" ? Object : _generatetextinput.GenerateTextInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AiGenerateTextController.prototype, "handleGenerateText", null);
AiGenerateTextController = _ts_decorate([
    (0, _common.Controller)('rest/ai'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseFilters)(_permissionsrestapiexceptionfilter.PermissionsRestApiExceptionFilter, _aiapiexceptionfilter.AiRestApiExceptionFilter, _restapiexceptionfilter.RestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _aimodelregistryservice.AiModelRegistryService === "undefined" ? Object : _aimodelregistryservice.AiModelRegistryService,
        typeof _aibillingservice.AiBillingService === "undefined" ? Object : _aibillingservice.AiBillingService,
        typeof _billingusageservice.BillingUsageService === "undefined" ? Object : _billingusageservice.BillingUsageService
    ])
], AiGenerateTextController);

//# sourceMappingURL=ai-generate-text.controller.js.map