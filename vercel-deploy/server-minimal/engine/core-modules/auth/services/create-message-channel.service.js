"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateMessageChannelService", {
    enumerable: true,
    get: function() {
        return CreateMessageChannelService;
    }
});
const _common = require("@nestjs/common");
const _uuid = require("uuid");
const _types = require("twenty-shared/types");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
const _messagechannelentity = require("../../../metadata-modules/message-channel/entities/message-channel.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateMessageChannelService = class CreateMessageChannelService {
    async createMessageChannel(input) {
        const { workspaceId, connectedAccountId, handle, messageVisibility, skipMessageChannelConfiguration, transactionManager } = input;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageChannelRepo = transactionManager.getRepository(_messagechannelentity.MessageChannelEntity);
            const newMessageChannelId = (0, _uuid.v4)();
            await messageChannelRepo.save({
                id: newMessageChannelId,
                connectedAccountId,
                type: _types.MessageChannelType.EMAIL,
                handle,
                visibility: messageVisibility || _types.MessageChannelVisibility.SHARE_EVERYTHING,
                syncStatus: skipMessageChannelConfiguration ? _types.MessageChannelSyncStatus.ONGOING : _types.MessageChannelSyncStatus.NOT_SYNCED,
                syncStage: skipMessageChannelConfiguration ? _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_PENDING : _types.MessageChannelSyncStage.PENDING_CONFIGURATION,
                pendingGroupEmailsAction: _types.MessageChannelPendingGroupEmailsAction.NONE,
                workspaceId
            });
            return newMessageChannelId;
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
CreateMessageChannelService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], CreateMessageChannelService);

//# sourceMappingURL=create-message-channel.service.js.map