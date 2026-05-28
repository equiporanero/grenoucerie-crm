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
    get STREAM_AGENT_CHAT_JOB_NAME () {
        return _streamagentchatjobnameconstant.STREAM_AGENT_CHAT_JOB_NAME;
    },
    get StreamAgentChatJob () {
        return StreamAgentChatJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _ai = require("ai");
const _typeorm1 = require("typeorm");
const _injectworkspacescopedrepositorydecorator = require("../../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _processdecorator = require("../../../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../core-modules/message-queue/message-queue.constants");
const _todisplaycreditsutil = require("../../../../core-modules/usage/utils/to-display-credits.util");
const _workspaceentity = require("../../../../core-modules/workspace/workspace.entity");
const _agentmessageentity = require("../../ai-agent-execution/entities/agent-message.entity");
const _computecostbreakdownutil = require("../../ai-billing/utils/compute-cost-breakdown.util");
const _convertdollarstobillingcreditsutil = require("../../ai-billing/utils/convert-dollars-to-billing-credits.util");
const _extractcachecreationtokensutil = require("../../ai-billing/utils/extract-cache-creation-tokens.util");
const _agentchatthreadentity = require("../entities/agent-chat-thread.entity");
const _agentchatcancelsubscriberservice = require("../services/agent-chat-cancel-subscriber.service");
const _agentchateventpublisherservice = require("../services/agent-chat-event-publisher.service");
const _agentchatstreamingservice = require("../services/agent-chat-streaming.service");
const _agentchatservice = require("../services/agent-chat.service");
const _chatexecutionservice = require("../services/chat-execution.service");
const _getcancelchannelutil = require("../utils/get-cancel-channel.util");
const _streamagentchatjobnameconstant = require("./stream-agent-chat-job-name.constant");
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
let StreamAgentChatJob = class StreamAgentChatJob {
    async handle(data) {
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: data.workspaceId
            }
        });
        if (!workspace) {
            this.logger.error(`Workspace ${data.workspaceId} not found`);
            await this.eventPublisherService.publish({
                threadId: data.threadId,
                workspaceId: data.workspaceId,
                event: {
                    type: 'stream-error',
                    code: 'WORKSPACE_NOT_FOUND',
                    message: `Workspace ${data.workspaceId} not found`
                }
            });
            return;
        }
        const abortController = new AbortController();
        const cancelChannel = (0, _getcancelchannelutil.getCancelChannel)(data.threadId);
        await this.cancelSubscriberService.subscribe(cancelChannel, ()=>{
            abortController.abort();
        });
        try {
            await this.executeStream(data, workspace, abortController.signal);
        } catch (error) {
            this.logger.error(`Stream ${data.streamId} failed: ${error instanceof Error ? error.message : String(error)}`);
            await this.eventPublisherService.publish({
                threadId: data.threadId,
                workspaceId: data.workspaceId,
                event: {
                    type: 'stream-error',
                    code: 'STREAM_EXECUTION_FAILED',
                    message: error instanceof Error ? error.message : 'Stream execution failed'
                }
            }).catch(()=>{});
            throw error;
        } finally{
            await this.cancelSubscriberService.unsubscribe(cancelChannel);
            await this.threadRepository.update(data.workspaceId, {
                id: data.threadId,
                activeStreamId: data.streamId
            }, {
                activeStreamId: null
            }).catch(()=>{});
            if (!abortController.signal.aborted) {
                await this.agentChatStreamingService.flushNextQueuedMessage(data.threadId, data.userWorkspaceId, data.workspaceId, data.hasTitle).catch((error)=>{
                    this.logger.error(`Failed to flush queued message for thread ${data.threadId}: ${error instanceof Error ? error.message : String(error)}`);
                });
            }
        }
    }
    async executeStream(data, workspace, abortSignal) {
        // When processing a promoted queued message, the user message already
        // exists in the DB with a turn — skip persisting it again.
        const userMessagePromise = data.existingTurnId ? Promise.resolve({
            turnId: data.existingTurnId
        }) : this.agentChatService.addMessage({
            threadId: data.threadId,
            uiMessage: {
                role: _agentmessageentity.AgentMessageRole.USER,
                parts: data.lastUserMessageParts.filter((part)=>part.type === 'text' || part.type === 'file')
            },
            workspaceId: data.workspaceId
        });
        userMessagePromise.catch(()=>{});
        const titlePromise = data.hasTitle ? Promise.resolve(null) : this.agentChatService.generateTitleIfNeeded({
            threadId: data.threadId,
            messageContent: data.lastUserMessageText,
            workspaceId: data.workspaceId
        }).catch(()=>null);
        await this.buildAndPublishStream({
            workspace,
            data,
            userMessagePromise,
            titlePromise,
            abortSignal
        });
    }
    async buildAndPublishStream({ workspace, data, userMessagePromise, titlePromise, abortSignal }) {
        return new Promise((resolve, reject)=>{
            let streamUsage = {
                inputTokens: 0,
                outputTokens: 0,
                inputCredits: 0,
                outputCredits: 0,
                cacheReadTokens: 0
            };
            let lastStepConversationSize = 0;
            let totalCacheCreationTokens = 0;
            let streamError;
            let checkHasNoMoreAvailableCredits = ()=>false;
            // onFinish fires before the uiStream is fully drained. We use this
            // promise to coordinate: the IIFE waits for DB persist to complete
            // before publishing message-persisted (after all chunks).
            let resolveStreamFinished;
            const streamFinishedPromise = new Promise((res)=>{
                resolveStreamFinished = res;
            });
            abortSignal.addEventListener('abort', ()=>resolve(), {
                once: true
            });
            const uiStream = (0, _ai.createUIMessageStream)({
                execute: async ({ writer })=>{
                    const onCodeExecutionUpdate = (codeExecutionData)=>{
                        writer.write({
                            type: 'data-code-execution',
                            id: `code-execution-${codeExecutionData.executionId}`,
                            data: codeExecutionData
                        });
                    };
                    const onCompaction = ()=>{
                        writer.write({
                            type: 'data-compaction',
                            id: `compaction-${data.threadId}`,
                            data: {}
                        });
                    };
                    const { stream, modelConfig, hasNoMoreAvailableCredits } = await this.chatExecutionService.streamChat({
                        workspace,
                        userWorkspaceId: data.userWorkspaceId,
                        messages: data.messages,
                        browsingContext: data.browsingContext,
                        modelId: data.modelId,
                        onCodeExecutionUpdate,
                        onCompaction,
                        abortSignal,
                        conversationSizeTokens: data.conversationSizeTokens
                    });
                    checkHasNoMoreAvailableCredits = hasNoMoreAvailableCredits;
                    const titleWritePromise = titlePromise.then((generatedTitle)=>{
                        if (generatedTitle) {
                            writer.write({
                                type: 'data-thread-title',
                                id: `thread-title-${data.threadId}`,
                                data: {
                                    title: generatedTitle
                                }
                            });
                        }
                    });
                    writer.merge(stream.toUIMessageStream({
                        onError: (error)=>{
                            streamError = error;
                            return error instanceof Error ? error.message : String(error);
                        },
                        sendStart: false,
                        messageMetadata: ({ part })=>{
                            return this.computeMessageMetadata({
                                part,
                                modelConfig,
                                lastStepConversationSize,
                                totalCacheCreationTokens,
                                onUpdateUsage: (usage)=>{
                                    streamUsage = usage;
                                },
                                onUpdateConversationSize: (size)=>{
                                    lastStepConversationSize = size;
                                },
                                onUpdateCacheCreationTokens: (tokens)=>{
                                    totalCacheCreationTokens = tokens;
                                }
                            });
                        },
                        onFinish: async ({ responseMessage })=>{
                            try {
                                await this.handleStreamFinish({
                                    responseMessage,
                                    threadId: data.threadId,
                                    workspaceId: data.workspaceId,
                                    userWorkspaceId: data.userWorkspaceId,
                                    streamUsage,
                                    lastStepConversationSize,
                                    totalCacheCreationTokens,
                                    modelConfig,
                                    userMessagePromise
                                });
                                await titleWritePromise;
                                resolveStreamFinished();
                            } catch (error) {
                                reject(error);
                            }
                        },
                        sendReasoning: true
                    }));
                }
            });
            // Publish all chunks first, then signal completion. This guarantees
            // message-persisted arrives after every stream-chunk on the client.
            void (async ()=>{
                try {
                    for await (const chunk of uiStream){
                        await this.eventPublisherService.publish({
                            threadId: data.threadId,
                            workspaceId: data.workspaceId,
                            event: {
                                type: 'stream-chunk',
                                chunk: chunk
                            }
                        });
                    }
                    await streamFinishedPromise;
                    if (streamError) {
                        reject(streamError);
                    } else if (checkHasNoMoreAvailableCredits()) {
                        await this.eventPublisherService.publish({
                            threadId: data.threadId,
                            workspaceId: data.workspaceId,
                            event: {
                                type: 'credits-exhausted'
                            }
                        });
                        resolve();
                    } else {
                        await this.eventPublisherService.publish({
                            threadId: data.threadId,
                            workspaceId: data.workspaceId,
                            event: {
                                type: 'message-persisted',
                                messageId: data.threadId
                            }
                        });
                        resolve();
                    }
                } catch (error) {
                    reject(error);
                }
            })();
        });
    }
    computeMessageMetadata({ part, modelConfig, lastStepConversationSize, totalCacheCreationTokens, onUpdateUsage, onUpdateConversationSize, onUpdateCacheCreationTokens }) {
        if (part.type === 'finish-step') {
            const stepInput = part.usage?.inputTokens ?? 0;
            const stepCached = part.usage?.inputTokenDetails?.cacheReadTokens ?? 0;
            const stepCacheCreation = (0, _extractcachecreationtokensutil.extractCacheCreationTokens)(part.providerMetadata);
            onUpdateCacheCreationTokens(totalCacheCreationTokens + stepCacheCreation);
            onUpdateConversationSize(stepInput + stepCached + stepCacheCreation);
        }
        if (part.type === 'finish') {
            const breakdown = (0, _computecostbreakdownutil.computeCostBreakdown)(modelConfig, {
                inputTokens: part.totalUsage?.inputTokens,
                outputTokens: part.totalUsage?.outputTokens,
                cachedInputTokens: part.totalUsage?.inputTokenDetails?.cacheReadTokens,
                reasoningTokens: part.totalUsage?.outputTokenDetails?.reasoningTokens,
                cacheCreationTokens: totalCacheCreationTokens
            });
            const inputCredits = Math.round((0, _convertdollarstobillingcreditsutil.convertDollarsToBillingCredits)(breakdown.inputCostInDollars));
            const outputCredits = Math.round((0, _convertdollarstobillingcreditsutil.convertDollarsToBillingCredits)(breakdown.outputCostInDollars));
            onUpdateUsage({
                inputTokens: breakdown.tokenCounts.totalInputTokens,
                outputTokens: part.totalUsage?.outputTokens ?? 0,
                inputCredits,
                outputCredits,
                cacheReadTokens: breakdown.tokenCounts.cachedInputTokens
            });
            return {
                createdAt: new Date().toISOString(),
                usage: {
                    inputTokens: breakdown.tokenCounts.totalInputTokens,
                    outputTokens: part.totalUsage?.outputTokens ?? 0,
                    cachedInputTokens: breakdown.tokenCounts.cachedInputTokens,
                    inputCredits: (0, _todisplaycreditsutil.toDisplayCredits)(inputCredits),
                    outputCredits: (0, _todisplaycreditsutil.toDisplayCredits)(outputCredits),
                    conversationSize: lastStepConversationSize
                },
                model: {
                    contextWindowTokens: modelConfig.contextWindowTokens
                }
            };
        }
        return undefined;
    }
    async handleStreamFinish({ responseMessage, threadId, workspaceId, userWorkspaceId, streamUsage, lastStepConversationSize, totalCacheCreationTokens, modelConfig, userMessagePromise }) {
        if (responseMessage.parts.length === 0) {
            return;
        }
        const threadStatus = await this.threadRepository.findOne(workspaceId, {
            where: {
                id: threadId
            },
            select: [
                'id',
                'deletedAt'
            ]
        });
        if (!threadStatus || threadStatus.deletedAt) {
            return;
        }
        const userMessage = await userMessagePromise;
        await this.agentChatService.addMessage({
            threadId,
            uiMessage: responseMessage,
            turnId: userMessage.turnId ?? undefined,
            workspaceId
        });
        await this.threadRepository.update(workspaceId, {
            id: threadId
        }, {
            totalInputTokens: ()=>`"totalInputTokens" + ${streamUsage.inputTokens}`,
            totalOutputTokens: ()=>`"totalOutputTokens" + ${streamUsage.outputTokens}`,
            totalInputCredits: ()=>`"totalInputCredits" + ${streamUsage.inputCredits}`,
            totalOutputCredits: ()=>`"totalOutputCredits" + ${streamUsage.outputCredits}`,
            totalCacheReadTokens: ()=>`"totalCacheReadTokens" + ${streamUsage.cacheReadTokens}`,
            totalCacheCreationTokens: ()=>`"totalCacheCreationTokens" + ${totalCacheCreationTokens}`,
            contextWindowTokens: modelConfig.contextWindowTokens,
            conversationSize: lastStepConversationSize
        });
        await this.agentChatService.notifyThreadUsageUpdated({
            threadId,
            userWorkspaceId,
            workspaceId
        });
    }
    constructor(threadRepository, workspaceRepository, agentChatService, chatExecutionService, eventPublisherService, cancelSubscriberService, agentChatStreamingService){
        this.threadRepository = threadRepository;
        this.workspaceRepository = workspaceRepository;
        this.agentChatService = agentChatService;
        this.chatExecutionService = chatExecutionService;
        this.eventPublisherService = eventPublisherService;
        this.cancelSubscriberService = cancelSubscriberService;
        this.agentChatStreamingService = agentChatStreamingService;
        this.logger = new _common.Logger(StreamAgentChatJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(_streamagentchatjobnameconstant.STREAM_AGENT_CHAT_JOB_NAME),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof StreamAgentChatJobData === "undefined" ? Object : StreamAgentChatJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], StreamAgentChatJob.prototype, "handle", null);
StreamAgentChatJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.aiStreamQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentchatthreadentity.AgentChatThreadEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _agentchatservice.AgentChatService === "undefined" ? Object : _agentchatservice.AgentChatService,
        typeof _chatexecutionservice.ChatExecutionService === "undefined" ? Object : _chatexecutionservice.ChatExecutionService,
        typeof _agentchateventpublisherservice.AgentChatEventPublisherService === "undefined" ? Object : _agentchateventpublisherservice.AgentChatEventPublisherService,
        typeof _agentchatcancelsubscriberservice.AgentChatCancelSubscriberService === "undefined" ? Object : _agentchatcancelsubscriberservice.AgentChatCancelSubscriberService,
        typeof _agentchatstreamingservice.AgentChatStreamingService === "undefined" ? Object : _agentchatstreamingservice.AgentChatStreamingService
    ])
], StreamAgentChatJob);

//# sourceMappingURL=stream-agent-chat.job.js.map