"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingDeleteGroupEmailMessagesService", {
    enumerable: true,
    get: function() {
        return MessagingDeleteGroupEmailMessagesService;
    }
});
const _common = require("@nestjs/common");
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagingmessagecleanerservice = require("../../message-cleaner/services/messaging-message-cleaner.service");
const _isgroupemail = require("../utils/is-group-email");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_BATCH_SIZE = 500;
let MessagingDeleteGroupEmailMessagesService = class MessagingDeleteGroupEmailMessagesService {
    async deleteGroupEmailMessages(workspaceId, messageChannelId) {
        this.logger.log(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannelId} - Deleting messages from group email addresses`);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageChannelMessageAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociation');
            const firstRecord = await messageChannelMessageAssociationRepository.findOne({
                where: {
                    messageChannelId
                },
                order: {
                    id: 'ASC'
                }
            });
            if (!firstRecord) {
                this.logger.debug(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannelId} - No message associations found`);
                return 0;
            }
            let cursorId = firstRecord.id;
            let totalDeletedCount = 0;
            while((0, _utils.isDefined)(cursorId)){
                const batch = await messageChannelMessageAssociationRepository.createQueryBuilder('mcma').select('mcma.id', 'mcmaId').addSelect('mcma.messageId', 'messageId').addSelect('mcma.messageExternalId', 'messageExternalId').addSelect('participant.handle', 'participantHandle').innerJoin('mcma.message', 'message').innerJoin('message.messageParticipants', 'participant', 'participant.role = :role', {
                    role: _types.MessageParticipantRole.FROM
                }).where('mcma.messageChannelId = :messageChannelId', {
                    messageChannelId
                }).andWhere('mcma.id >= :cursorId', {
                    cursorId
                }).orderBy('mcma.id', 'ASC').take(MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_BATCH_SIZE).getRawMany();
                if (batch.length === 0) {
                    break;
                }
                const groupEmailRecords = batch.filter((record)=>(0, _utils.isDefined)(record.participantHandle) && (0, _isgroupemail.isGroupEmail)(record.participantHandle));
                if (groupEmailRecords.length > 0) {
                    const uniqueMessageIds = new Set(groupEmailRecords.map((r)=>r.messageId));
                    const messageExternalIdsToDelete = batch.filter((record)=>uniqueMessageIds.has(record.messageId)).map((record)=>record.messageExternalId).filter(_utils.isDefined);
                    if (messageExternalIdsToDelete.length > 0) {
                        const messageExternalIdsChunks = (0, _lodashchunk.default)(messageExternalIdsToDelete, 200);
                        for (const messageExternalIdsChunk of messageExternalIdsChunks){
                            await this.messagingMessageCleanerService.deleteMessagesChannelMessageAssociationsAndRelatedOrphans({
                                workspaceId,
                                messageExternalIds: messageExternalIdsChunk,
                                messageChannelId
                            });
                            totalDeletedCount += messageExternalIdsChunk.length;
                            this.logger.debug(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannelId} - Deleted ${messageExternalIdsChunk.length} group email messages`);
                        }
                    }
                }
                if (batch.length < MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_BATCH_SIZE) {
                    break;
                }
                cursorId = batch[batch.length - 1].mcmaId;
            }
            this.logger.log(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannelId} - Completed deleting ${totalDeletedCount} group email messages`);
            return totalDeletedCount;
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, messagingMessageCleanerService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messagingMessageCleanerService = messagingMessageCleanerService;
        this.logger = new _common.Logger(MessagingDeleteGroupEmailMessagesService.name);
    }
};
MessagingDeleteGroupEmailMessagesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _messagingmessagecleanerservice.MessagingMessageCleanerService === "undefined" ? Object : _messagingmessagecleanerservice.MessagingMessageCleanerService
    ])
], MessagingDeleteGroupEmailMessagesService);

//# sourceMappingURL=messaging-delete-group-email-messages.service.js.map