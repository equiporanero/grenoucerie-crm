"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingQueryHookModule", {
    enumerable: true,
    get: function() {
        return MessagingQueryHookModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _messagefolderentity = require("../../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _applymessagesvisibilityrestrictionsservice = require("./message/apply-messages-visibility-restrictions.service");
const _messagefindmanypostqueryhook = require("./message/message-find-many.post-query.hook");
const _messagefindonepostqueryhook = require("./message/message-find-one.post-query.hook");
const _messagingimportmanagermodule = require("../../message-import-manager/messaging-import-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingQueryHookModule = class MessagingQueryHookModule {
};
MessagingQueryHookModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _messagingimportmanagermodule.MessagingImportManagerModule,
            _typeorm.TypeOrmModule.forFeature([
                _connectedaccountentity.ConnectedAccountEntity,
                _messagechannelentity.MessageChannelEntity,
                _messagefolderentity.MessageFolderEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ])
        ],
        providers: [
            _applymessagesvisibilityrestrictionsservice.ApplyMessagesVisibilityRestrictionsService,
            _messagefindonepostqueryhook.MessageFindOnePostQueryHook,
            _messagefindmanypostqueryhook.MessageFindManyPostQueryHook
        ]
    })
], MessagingQueryHookModule);

//# sourceMappingURL=messaging-query-hook.module.js.map