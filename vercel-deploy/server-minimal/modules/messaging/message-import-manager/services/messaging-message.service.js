"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMessageService", {
    enumerable: true,
    get: function() {
        return MessagingMessageService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _uuid = require("uuid");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessagingMessageService = class MessagingMessageService {
    async saveMessagesWithinTransaction(messages, messageChannelId, transactionManager, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageChannelMessageAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociation');
            const messageRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'message');
            const messageThreadRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageThread');
            const messageAccumulatorMap = new Map();
            const existingMessagesInDB = await messageRepository.find({
                where: {
                    headerMessageId: (0, _typeorm.In)(messages.map((message)=>message.headerMessageId))
                }
            });
            const messageChannelMessageAssociationsReferencingMessageThread = await messageChannelMessageAssociationRepository.find({
                where: {
                    messageThreadExternalId: (0, _typeorm.In)(messages.map((message)=>message.messageThreadExternalId)),
                    messageChannelId
                },
                relations: [
                    'message'
                ]
            }, transactionManager);
            const existingMessageChannelMessageAssociations = await messageChannelMessageAssociationRepository.find({
                where: {
                    messageId: (0, _typeorm.In)(existingMessagesInDB.map((message)=>message.id)),
                    messageChannelId
                }
            });
            await this.enrichMessageAccumulatorWithExistingMessages(messages, messageAccumulatorMap, existingMessagesInDB);
            await this.enrichMessageAccumulatorWithExistingMessageThreadIds(messages, messageAccumulatorMap, messageChannelMessageAssociationsReferencingMessageThread, workspaceId);
            await this.enrichMessageAccumulatorWithExistingMessageChannelMessageAssociations(messages, messageAccumulatorMap, existingMessageChannelMessageAssociations);
            await this.enrichMessageAccumulatorWithMessageThreadToCreate(messages, messageAccumulatorMap);
            for (const message of messages){
                const messageAccumulator = messageAccumulatorMap.get(message.externalId);
                if (!(0, _utils.isDefined)(messageAccumulator)) {
                    throw new Error(`Message accumulator should reference the message, this should never happen`);
                }
                const messageThreadId = messageAccumulator.threadToCreate?.id ?? messageAccumulator.existingThreadInDB?.id;
                if (!(0, _utils.isDefined)(messageThreadId)) {
                    throw new Error(`Message thread id should be defined, either in the threadToCreate or existingThreadInDB`);
                }
                let newOrExistingMessageId;
                if (!(0, _utils.isDefined)(messageAccumulator.existingMessageInDB)) {
                    newOrExistingMessageId = (0, _uuid.v4)();
                    const messageToCreate = {
                        id: newOrExistingMessageId,
                        headerMessageId: message.headerMessageId,
                        subject: message.subject,
                        receivedAt: message.receivedAt,
                        text: message.text,
                        messageThreadId
                    };
                    messageAccumulator.messageToCreate = messageToCreate;
                } else {
                    newOrExistingMessageId = messageAccumulator.existingMessageInDB.id;
                }
                if (!(0, _utils.isDefined)(messageAccumulator.existingMessageChannelMessageAssociationInDB)) {
                    messageAccumulator.messageChannelMessageAssociationToCreate = {
                        id: (0, _uuid.v4)(),
                        messageChannelId,
                        messageId: newOrExistingMessageId,
                        messageExternalId: message.externalId,
                        messageThreadExternalId: message.messageThreadExternalId,
                        direction: message.direction
                    };
                }
                messageAccumulatorMap.set(message.externalId, messageAccumulator);
            }
            const messageThreadsToCreate = Array.from(messageAccumulatorMap.values()).map((accumulator)=>accumulator.threadToCreate).filter(_utils.isDefined);
            const threadSubjectUpdates = new Map();
            for (const message of messages){
                const messageAccumulator = messageAccumulatorMap.get(message.externalId);
                if (!(0, _utils.isDefined)(messageAccumulator)) {
                    continue;
                }
                if ((0, _utils.isDefined)(messageAccumulator.existingThreadInDB) && (0, _utils.isDefined)(messageAccumulator.messageToCreate) && (0, _utils.isDefined)(message.subject)) {
                    const threadId = messageAccumulator.existingThreadInDB.id;
                    const existing = threadSubjectUpdates.get(threadId);
                    const receivedAt = message.receivedAt?.getTime() ?? 0;
                    if (!(0, _utils.isDefined)(existing) || receivedAt > existing.receivedAt) {
                        threadSubjectUpdates.set(threadId, {
                            subject: message.subject,
                            receivedAt
                        });
                    }
                }
            }
            if (messageThreadsToCreate.length > 0) {
                await messageThreadRepository.insert(messageThreadsToCreate, transactionManager);
            }
            if (threadSubjectUpdates.size > 0) {
                await messageThreadRepository.upsert(Array.from(threadSubjectUpdates.entries()).map(([id, { subject }])=>({
                        id,
                        subject
                    })), [
                    'id'
                ], transactionManager);
            }
            const messagesToCreate = Array.from(messageAccumulatorMap.values()).map((accumulator)=>accumulator.messageToCreate).filter(_utils.isDefined);
            await messageRepository.insert(messagesToCreate, transactionManager);
            const messageChannelMessageAssociationsToCreate = Array.from(messageAccumulatorMap.values()).map((accumulator)=>accumulator.messageChannelMessageAssociationToCreate).filter(_utils.isDefined);
            await messageChannelMessageAssociationRepository.insert(messageChannelMessageAssociationsToCreate, transactionManager);
            const messageExternalIdsAndIdsMap = new Map();
            const messageExternalIdToMessageChannelMessageAssociationIdMap = new Map();
            for (const [externalId, accumulator] of messageAccumulatorMap.entries()){
                if ((0, _utils.isDefined)(accumulator.messageToCreate)) {
                    messageExternalIdsAndIdsMap.set(externalId, accumulator.messageToCreate.id);
                }
                if ((0, _utils.isDefined)(accumulator.existingMessageInDB)) {
                    messageExternalIdsAndIdsMap.set(externalId, accumulator.existingMessageInDB.id);
                }
                const createdAssociationId = accumulator.messageChannelMessageAssociationToCreate?.id;
                const existingAssociationId = accumulator.existingMessageChannelMessageAssociationInDB?.id;
                const associationId = createdAssociationId ?? existingAssociationId;
                if ((0, _utils.isDefined)(associationId)) {
                    messageExternalIdToMessageChannelMessageAssociationIdMap.set(externalId, associationId);
                }
            }
            return {
                createdMessages: messagesToCreate,
                messageExternalIdsAndIdsMap,
                messageExternalIdToMessageChannelMessageAssociationIdMap
            };
        }, authContext, {
            lite: true
        });
    }
    async enrichMessageAccumulatorWithExistingMessages(messages, messageAccumulatorMap, existingMessagesInDB) {
        for (const message of messages){
            const existingMessage = existingMessagesInDB.find((existingMessage)=>existingMessage.headerMessageId === message.headerMessageId);
            if (!(0, _utils.isDefined)(existingMessage)) {
                messageAccumulatorMap.set(message.externalId, {});
                continue;
            }
            messageAccumulatorMap.set(message.externalId, {
                existingMessageInDB: existingMessage
            });
        }
    }
    async enrichMessageAccumulatorWithExistingMessageThreadIds(messages, messageAccumulatorMap, messageChannelMessageAssociationsReferencingMessageThread, workspaceId) {
        for (const message of messages){
            const messageAccumulator = messageAccumulatorMap.get(message.externalId);
            if (!(0, _utils.isDefined)(messageAccumulator)) {
                throw new Error(`Message accumulator should reference the message, this should never happen`);
            }
            const messageChannelMessageAssociationReferencingMessageThread = messageChannelMessageAssociationsReferencingMessageThread.find((association)=>association.messageThreadExternalId === message.messageThreadExternalId);
            const existingThreadIdInDBIfMessageIsExistingInDB = messageAccumulator.existingMessageInDB?.messageThreadId;
            const existingThreadIdInDBIfMessageIsReferencedInMessageChannelMessageAssociation = messageChannelMessageAssociationReferencingMessageThread?.message?.messageThreadId;
            if ((0, _utils.isDefined)(existingThreadIdInDBIfMessageIsExistingInDB)) {
                messageAccumulator.existingThreadInDB = {
                    id: existingThreadIdInDBIfMessageIsExistingInDB
                };
            }
            if ((0, _utils.isDefined)(existingThreadIdInDBIfMessageIsReferencedInMessageChannelMessageAssociation)) {
                messageAccumulator.existingThreadInDB = {
                    id: existingThreadIdInDBIfMessageIsReferencedInMessageChannelMessageAssociation
                };
            }
            if ((0, _utils.isDefined)(existingThreadIdInDBIfMessageIsExistingInDB) && (0, _utils.isDefined)(existingThreadIdInDBIfMessageIsReferencedInMessageChannelMessageAssociation) && existingThreadIdInDBIfMessageIsExistingInDB !== existingThreadIdInDBIfMessageIsReferencedInMessageChannelMessageAssociation) {
                this.logger.warn(`
          WorkspaceId: ${workspaceId} /
          Message ExternalId: ${message.externalId} /
          Message HeaderId: ${message.headerMessageId} /
          Message Thread ExternalId: ${message.messageThreadExternalId} /
          Message Thread Id in DB: ${existingThreadIdInDBIfMessageIsExistingInDB} /
          Message Thread Id in Message Channel Message Association: ${existingThreadIdInDBIfMessageIsReferencedInMessageChannelMessageAssociation} /
          Message Subject: ${message.subject} /
          Message Received At: ${message.receivedAt} /
          Thread inter channel detected`);
            }
            messageAccumulatorMap.set(message.externalId, messageAccumulator);
        }
    }
    async enrichMessageAccumulatorWithExistingMessageChannelMessageAssociations(messages, messageAccumulatorMap, existingMessageChannelMessageAssociations) {
        for (const message of messages){
            const messageAccumulator = messageAccumulatorMap.get(message.externalId);
            if (!(0, _utils.isDefined)(messageAccumulator)) {
                throw new Error(`Message accumulator should reference the message, this should never happen`);
            }
            const existingMessage = messageAccumulator.existingMessageInDB;
            if (!(0, _utils.isDefined)(existingMessage)) {
                continue;
            }
            const existingMessageChannelMessageAssociation = existingMessageChannelMessageAssociations.find((association)=>association.messageId === existingMessage.id);
            if (existingMessageChannelMessageAssociation) {
                messageAccumulator.existingMessageChannelMessageAssociationInDB = existingMessageChannelMessageAssociation;
            }
        }
    }
    async enrichMessageAccumulatorWithMessageThreadToCreate(messages, messageAccumulatorMap) {
        for (const [index, message] of messages.entries()){
            const messageAccumulator = messageAccumulatorMap.get(message.externalId);
            if (!(0, _utils.isDefined)(messageAccumulator)) {
                throw new Error(`Message accumulator should reference the message, this should never happen`);
            }
            const previousMessageWithSameThreadExternalId = messages.find((otherMessage, otherMessageIndex)=>otherMessage.messageThreadExternalId === message.messageThreadExternalId && otherMessageIndex < index);
            let newOrExistingMessageThreadId;
            if ((0, _utils.isDefined)(messageAccumulator.existingThreadInDB)) {
                newOrExistingMessageThreadId = messageAccumulator.existingThreadInDB.id;
            }
            if ((0, _utils.isDefined)(previousMessageWithSameThreadExternalId)) {
                const previousMessageAccumulator = messageAccumulatorMap.get(previousMessageWithSameThreadExternalId.externalId);
                const previousMessageThreadId = previousMessageAccumulator?.threadToCreate?.id ?? previousMessageAccumulator?.existingThreadInDB?.id;
                if (!(0, _utils.isDefined)(previousMessageThreadId)) {
                    throw new Error(`Previous message should have a thread id, either in the messageToCreate or existingMessageInDB`);
                }
                newOrExistingMessageThreadId = previousMessageThreadId;
                messageAccumulator.existingThreadInDB = {
                    id: previousMessageThreadId
                };
            }
            if (!(0, _utils.isDefined)(newOrExistingMessageThreadId)) {
                newOrExistingMessageThreadId = (0, _uuid.v4)();
                messageAccumulator.threadToCreate = {
                    id: newOrExistingMessageThreadId,
                    subject: message.subject
                };
            }
            messageAccumulatorMap.set(message.externalId, messageAccumulator);
        }
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logger = new _common.Logger(MessagingMessageService.name);
    }
};
MessagingMessageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], MessagingMessageService);

//# sourceMappingURL=messaging-message.service.js.map