"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingCursorService", {
    enumerable: true,
    get: function() {
        return MessagingCursorService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _messagefolderentity = require("../../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
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
let MessagingCursorService = class MessagingCursorService {
    async updateCursor(messageChannel, nextSyncCursor, workspaceId, folderId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            if (!folderId) {
                await this.messageChannelRepository.update({
                    id: messageChannel.id,
                    workspaceId
                }, {
                    throttleFailureCount: 0,
                    throttleRetryAfter: null,
                    syncStageStartedAt: null,
                    syncCursor: !messageChannel.syncCursor || nextSyncCursor > messageChannel.syncCursor ? nextSyncCursor : messageChannel.syncCursor
                });
            } else {
                await this.messageFolderRepository.update({
                    id: folderId,
                    workspaceId
                }, {
                    syncCursor: nextSyncCursor
                });
                await this.messageChannelRepository.update({
                    id: messageChannel.id,
                    workspaceId
                }, {
                    throttleFailureCount: 0,
                    throttleRetryAfter: null,
                    syncStageStartedAt: null
                });
            }
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, messageChannelRepository, messageFolderRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.messageFolderRepository = messageFolderRepository;
    }
};
MessagingCursorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_messagefolderentity.MessageFolderEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], MessagingCursorService);

//# sourceMappingURL=messaging-cursor.service.js.map