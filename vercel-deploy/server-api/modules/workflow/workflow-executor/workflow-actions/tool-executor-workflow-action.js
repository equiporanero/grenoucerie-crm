"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ToolExecutorWorkflowAction", {
    enumerable: true,
    get: function() {
        return ToolExecutorWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _draftemailtool = require("../../../../engine/core-modules/tool/tools/email-tool/draft-email-tool");
const _renderrichtexttohtmlutil = require("../../../../engine/core-modules/tool/tools/email-tool/utils/render-rich-text-to-html.util");
const _httptool = require("../../../../engine/core-modules/tool/tools/http-tool/http-tool");
const _sendemailtool = require("../../../../engine/core-modules/tool/tools/email-tool/send-email-tool");
const _workflowstepexecutorexception = require("../exceptions/workflow-step-executor.exception");
const _workflowactiontype = require("./types/workflow-action.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ToolExecutorWorkflowAction = class ToolExecutorWorkflowAction {
    async resolveEmailBody(body, context) {
        const bodyWithResolvedVariables = (0, _utils.resolveRichTextVariables)(body, context);
        const tipTapDocument = (0, _utils.isDefined)(bodyWithResolvedVariables) ? (0, _utils.parseJson)(bodyWithResolvedVariables) : null;
        if ((0, _utils.isDefined)(tipTapDocument) && tipTapDocument.type === 'doc') {
            return (0, _renderrichtexttohtmlutil.renderRichTextToHtml)(tipTapDocument);
        }
        return bodyWithResolvedVariables ?? body;
    }
    async execute({ currentStepId, steps, context, runInfo }) {
        const step = steps.find((step)=>step.id === currentStepId);
        if (!step) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step not found', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.STEP_NOT_FOUND);
        }
        const tool = this.toolsByActionType.get(step.type);
        if (!tool) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException(`No tool found for workflow action type: ${step.type}`, _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        let toolInput = step.settings.input;
        if (step.type === _workflowactiontype.WorkflowActionType.SEND_EMAIL || step.type === _workflowactiontype.WorkflowActionType.DRAFT_EMAIL) {
            const emailInput = toolInput;
            if ((0, _utils.isDefined)(emailInput.body)) {
                const emailBody = await this.resolveEmailBody(emailInput.body, context);
                toolInput = {
                    ...emailInput,
                    body: emailBody
                };
            }
        }
        toolInput = (0, _utils.resolveInput)(toolInput, context);
        const toolOutput = await tool.execute(toolInput, {
            workspaceId: runInfo.workspaceId
        });
        return {
            result: toolOutput.result,
            error: toolOutput.error
        };
    }
    constructor(httpTool, sendEmailTool, draftEmailTool){
        this.httpTool = httpTool;
        this.sendEmailTool = sendEmailTool;
        this.draftEmailTool = draftEmailTool;
        this.toolsByActionType = new Map([
            [
                _workflowactiontype.WorkflowActionType.HTTP_REQUEST,
                this.httpTool
            ],
            [
                _workflowactiontype.WorkflowActionType.SEND_EMAIL,
                this.sendEmailTool
            ],
            [
                _workflowactiontype.WorkflowActionType.DRAFT_EMAIL,
                this.draftEmailTool
            ]
        ]);
    }
};
ToolExecutorWorkflowAction = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httptool.HttpTool === "undefined" ? Object : _httptool.HttpTool,
        typeof _sendemailtool.SendEmailTool === "undefined" ? Object : _sendemailtool.SendEmailTool,
        typeof _draftemailtool.DraftEmailTool === "undefined" ? Object : _draftemailtool.DraftEmailTool
    ])
], ToolExecutorWorkflowAction);

//# sourceMappingURL=tool-executor-workflow-action.js.map