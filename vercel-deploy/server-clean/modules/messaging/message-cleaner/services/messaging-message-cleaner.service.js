"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMessageCleanerService", {
    enumerable: true,
    get: function() {
        return MessagingMessageCleanerService;
    }
});
const _common = require("@nestjs/common");
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _typeorm = require("typeorm");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _deleteusingpaginationutil = require("../utils/delete-using-pagination.util");
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
let MessagingMessageCleanerService = class MessagingMessageCleanerService {
    async deleteMessagesChannelMessageAssociationsAndRelatedOrphans({ workspaceId, messageExternalIds, messageChannelId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'message');
            const messageChannelMessageAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociation');
            const messageThreadRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageThread');
            const messageExternalIdsChunks = (0, _lodashchunk.default)(messageExternalIds, 500);
            for (const messageExternalIdsChunk of messageExternalIdsChunks){
                const messageChannelMessageAssociationsToDelete = await messageChannelMessageAssociationRepository.find({
                    where: {
                        messageExternalId: (0, _typeorm.In)(messageExternalIdsChunk),
                        messageChannelId
                    }
                });
                if (messageChannelMessageAssociationsToDelete.length <= 0) {
                    continue;
                }
                await messageChannelMessageAssociationRepository.delete(messageChannelMessageAssociationsToDelete.map(({ id })=>id));
                this.logger.log(`WorkspaceId: ${workspaceId} Deleting ${messageChannelMessageAssociationsToDelete.length} message channel message associations`);
                const orphanMessages = await messageRepository.find({
                    where: {
                        id: (0, _typeorm.In)(messageChannelMessageAssociationsToDelete.map(({ messageId })=>messageId)),
                        messageChannelMessageAssociations: {
                            id: (0, _typeorm.IsNull)()
                        }
                    }
                });
                if (orphanMessages.length <= 0) {
                    continue;
                }
                this.logger.debug(`WorkspaceId: ${workspaceId} Deleting ${orphanMessages.length} orphan messages`);
                await messageRepository.delete(orphanMessages.map(({ id })=>id));
                const orphanMessageThreads = await messageThreadRepository.find({
                    where: {
                        id: (0, _typeorm.In)(orphanMessages.map(({ messageThreadId })=>messageThreadId)),
                        messages: {
                            id: (0, _typeorm.IsNull)()
                        }
                    }
                });
                if (orphanMessageThreads.length <= 0) {
                    continue;
                }
                this.logger.debug(`WorkspaceId: ${workspaceId} Deleting ${orphanMessageThreads.length} orphan message threads`);
                await messageThreadRepository.delete(orphanMessageThreads.map(({ id })=>id));
            }
        }, authContext, {
            lite: true
        });
    }
    async deleteMessageChannelMessageAssociationsByChannelId({ workspaceId, messageChannelId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageChannelMessageAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociation');
            const workspaceDataSource = await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource();
            await workspaceDataSource.transaction(async (manager)=>{
                const transactionManager = manager;
                await (0, _deleteusingpaginationutil.deleteUsingPagination)(workspaceId, 500, async (limit, offset, _workspaceId, transactionManager)=>{
                    const associations = await messageChannelMessageAssociationRepository.find({
                        where: {
                            messageChannelId
                        },
                        take: limit,
                        skip: offset
                    }, transactionManager);
                    return associations.map(({ id })=>id);
                }, async (ids, workspaceId, transactionManager)=>{
                    this.logger.log(`WorkspaceId: ${workspaceId} Deleting ${ids.length} message channel message associations for channel ${messageChannelId}`);
                    await messageChannelMessageAssociationRepository.delete(ids, transactionManager);
                }, transactionManager);
            });
        }, authContext, {
            lite: true
        });
    }
    async cleanOrphanMessagesAndThreads(workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageThreadRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageThread');
            const messageRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'message');
            const workspaceDataSource = await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource();
            await workspaceDataSource.transaction(async (transactionManager)=>{
                await (0, _deleteusingpaginationutil.deleteUsingPagination)(workspaceId, 500, async (limit, offset, _workspaceId, transactionManager)=>{
                    const nonAssociatedMessages = await messageRepository.find({
                        where: {
                            messageChannelMessageAssociations: {
                                id: (0, _typeorm.IsNull)()
                            }
                        },
                        take: limit,
                        skip: offset,
                        relations: [
                            'messageChannelMessageAssociations'
                        ]
                    }, transactionManager);
                    return nonAssociatedMessages.map(({ id })=>id);
                }, async (ids, workspaceId, transactionManager)=>{
                    this.logger.debug(`WorkspaceId: ${workspaceId} Deleting ${ids.length} messages from message cleaner`);
                    await messageRepository.delete(ids, transactionManager);
                }, transactionManager);
                await (0, _deleteusingpaginationutil.deleteUsingPagination)(workspaceId, 500, async (limit, offset, _workspaceId, transactionManager)=>{
                    const orphanThreads = await messageThreadRepository.find({
                        where: {
                            messages: {
                                id: (0, _typeorm.IsNull)()
                            }
                        },
                        take: limit,
                        skip: offset
                    }, transactionManager);
                    return orphanThreads.map(({ id })=>id);
                }, async (ids, _workspaceId, transactionManager)=>{
                    await messageThreadRepository.delete(ids, transactionManager);
                }, transactionManager);
            });
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logger = new _common.Logger(MessagingMessageCleanerService.name);
    }
};
MessagingMessageCleanerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], MessagingMessageCleanerService);

//# sourceMappingURL=messaging-message-cleaner.service.js.map