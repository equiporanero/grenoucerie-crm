"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMessageFolderAssociationService", {
    enumerable: true,
    get: function() {
        return MessagingMessageFolderAssociationService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
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
let MessagingMessageFolderAssociationService = class MessagingMessageFolderAssociationService {
    async saveMessageFolderAssociations(associations, workspaceId, transactionManager) {
        if (associations.length === 0) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const repository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociationMessageFolder');
            const records = associations.flatMap((association)=>association.messageFolderIds.map((folderId)=>({
                        messageChannelMessageAssociationId: association.messageChannelMessageAssociationId,
                        messageFolderId: folderId
                    })));
            if (records.length === 0) {
                return;
            }
            const associationIds = [
                ...new Set(records.map((record)=>record.messageChannelMessageAssociationId))
            ];
            const existingRecords = await repository.find({
                where: {
                    messageChannelMessageAssociationId: (0, _typeorm.In)(associationIds)
                }
            }, transactionManager);
            const existingKeys = new Set(existingRecords.map((record)=>`${record.messageChannelMessageAssociationId}:${record.messageFolderId}`));
            const recordsToInsert = records.filter((record)=>!existingKeys.has(`${record.messageChannelMessageAssociationId}:${record.messageFolderId}`));
            if (recordsToInsert.length > 0) {
                await repository.insert(recordsToInsert, transactionManager);
            }
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
MessagingMessageFolderAssociationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], MessagingMessageFolderAssociationService);

//# sourceMappingURL=messaging-message-folder-association.service.js.map