"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _draftemailtool = require("../../../../../engine/core-modules/tool/tools/email-tool/draft-email-tool");
const _sendemailtool = require("../../../../../engine/core-modules/tool/tools/email-tool/send-email-tool");
const _httptool = require("../../../../../engine/core-modules/tool/tools/http-tool/http-tool");
const _toolexecutorworkflowaction = require("../tool-executor-workflow-action");
const _workflowactiontype = require("../types/workflow-action.type");
jest.mock('src/engine/core-modules/tool/tools/email-tool/utils/render-rich-text-to-html.util', ()=>({
        renderRichTextToHtml: jest.fn().mockResolvedValue('<p>rendered html</p>')
    }));
const { renderRichTextToHtml } = jest.requireMock('src/engine/core-modules/tool/tools/email-tool/utils/render-rich-text-to-html.util');
const baseSettings = {
    outputSchema: {},
    errorHandlingOptions: {
        retryOnFailure: {
            value: false
        },
        continueOnFailure: {
            value: false
        }
    },
    input: {}
};
const emailInput = {
    connectedAccountId: 'account-1',
    recipients: {
        to: 'test@example.com'
    },
    subject: 'Test'
};
const buildEmailStep = (type, input)=>({
        id: 'step-1',
        type: _workflowactiontype.WorkflowActionType[type],
        name: type === 'SEND_EMAIL' ? 'Send Email' : 'Draft Email',
        valid: true,
        settings: {
            ...baseSettings,
            input
        }
    });
describe('ToolExecutorWorkflowAction', ()=>{
    let action;
    let mockSendEmailTool;
    let mockDraftEmailTool;
    beforeEach(async ()=>{
        jest.clearAllMocks();
        const toolResult = {
            result: {
                success: true
            },
            error: undefined
        };
        mockSendEmailTool = {
            execute: jest.fn().mockResolvedValue(toolResult)
        };
        mockDraftEmailTool = {
            execute: jest.fn().mockResolvedValue(toolResult)
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _toolexecutorworkflowaction.ToolExecutorWorkflowAction,
                {
                    provide: _httptool.HttpTool,
                    useValue: {
                        execute: jest.fn()
                    }
                },
                {
                    provide: _sendemailtool.SendEmailTool,
                    useValue: mockSendEmailTool
                },
                {
                    provide: _draftemailtool.DraftEmailTool,
                    useValue: mockDraftEmailTool
                }
            ]
        }).compile();
        action = module.get(_toolexecutorworkflowaction.ToolExecutorWorkflowAction);
    });
    const executeWithBody = (body, type = 'SEND_EMAIL')=>action.execute({
            currentStepId: 'step-1',
            steps: [
                buildEmailStep(type, {
                    ...emailInput,
                    body
                })
            ],
            context: {
                trigger: {
                    name: 'John',
                    email: 'john@example.com'
                }
            },
            runInfo: {
                workspaceId: 'workspace-1',
                workflowRunId: 'run-1'
            }
        });
    describe('email body handling', ()=>{
        it('should render TipTap JSON body to HTML', async ()=>{
            const tipTapBody = JSON.stringify({
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'Hello world'
                            }
                        ]
                    }
                ]
            });
            await executeWithBody(tipTapBody);
            expect(renderRichTextToHtml).toHaveBeenCalledWith(JSON.parse(tipTapBody));
            expect(mockSendEmailTool.execute).toHaveBeenCalledWith(expect.objectContaining({
                body: '<p>rendered html</p>'
            }), expect.any(Object));
        });
        it('should resolve variableTag nodes inside TipTap JSON before rendering', async ()=>{
            const tipTapBodyWithVariable = JSON.stringify({
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'variableTag',
                                attrs: {
                                    variable: '{{trigger.name}}'
                                }
                            }
                        ]
                    }
                ]
            });
            await executeWithBody(tipTapBodyWithVariable);
            expect(renderRichTextToHtml).toHaveBeenCalledWith({
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: 'John'
                            }
                        ]
                    }
                ]
            });
        });
        it('should pass plain text body through without rendering', async ()=>{
            await executeWithBody('{{trigger.name}}\n{{trigger.email}}');
            expect(renderRichTextToHtml).not.toHaveBeenCalled();
            expect(mockSendEmailTool.execute).toHaveBeenCalledWith(expect.objectContaining({
                body: 'John\njohn@example.com'
            }), expect.any(Object));
        });
        it('should treat non-TipTap JSON as plain text', async ()=>{
            await executeWithBody('{"key":"value"}');
            expect(renderRichTextToHtml).not.toHaveBeenCalled();
            expect(mockSendEmailTool.execute).toHaveBeenCalledWith(expect.objectContaining({
                body: '{"key":"value"}'
            }), expect.any(Object));
        });
        it('should handle empty string body without crashing', async ()=>{
            await executeWithBody('');
            expect(renderRichTextToHtml).not.toHaveBeenCalled();
            expect(mockSendEmailTool.execute).toHaveBeenCalled();
        });
        it('should handle undefined body without crashing', async ()=>{
            await executeWithBody(undefined);
            expect(renderRichTextToHtml).not.toHaveBeenCalled();
            expect(mockSendEmailTool.execute).toHaveBeenCalled();
        });
        it('should apply the same body handling for DRAFT_EMAIL', async ()=>{
            await executeWithBody('{{trigger.name}}', 'DRAFT_EMAIL');
            expect(renderRichTextToHtml).not.toHaveBeenCalled();
            expect(mockDraftEmailTool.execute).toHaveBeenCalledWith(expect.objectContaining({
                body: 'John'
            }), expect.any(Object));
        });
    });
});

//# sourceMappingURL=tool-executor-workflow-action.spec.js.map