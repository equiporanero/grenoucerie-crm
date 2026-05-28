"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageChannelMetadataModule", {
    enumerable: true,
    get: function() {
        return MessageChannelMetadataModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _connectedaccountmetadatamodule = require("../connected-account/connected-account-metadata.module");
const _messagechannelentity = require("./entities/message-channel.entity");
const _messagechannelgraphqlapiexceptioninterceptor = require("./interceptors/message-channel-graphql-api-exception.interceptor");
const _messagechannelmetadataservice = require("./message-channel-metadata.service");
const _messagechannelresolver = require("./resolvers/message-channel.resolver");
const _messagefolderentity = require("../message-folder/entities/message-folder.entity");
const _permissionsmodule = require("../permissions/permissions.module");
const _messagingimportmanagermodule = require("../../../modules/messaging/message-import-manager/messaging-import-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessageChannelMetadataModule = class MessageChannelMetadataModule {
};
MessageChannelMetadataModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _messagechannelentity.MessageChannelEntity,
                _messagefolderentity.MessageFolderEntity
            ]),
            _permissionsmodule.PermissionsModule,
            _connectedaccountmetadatamodule.ConnectedAccountMetadataModule,
            _messagingimportmanagermodule.MessagingImportManagerModule
        ],
        providers: [
            _messagechannelmetadataservice.MessageChannelMetadataService,
            _messagechannelresolver.MessageChannelResolver,
            _messagechannelgraphqlapiexceptioninterceptor.MessageChannelGraphqlApiExceptionInterceptor
        ],
        exports: [
            _messagechannelmetadataservice.MessageChannelMetadataService
        ]
    })
], MessageChannelMetadataModule);

//# sourceMappingURL=message-channel-metadata.module.js.map