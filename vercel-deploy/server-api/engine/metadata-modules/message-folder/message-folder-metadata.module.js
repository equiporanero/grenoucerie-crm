"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageFolderMetadataModule", {
    enumerable: true,
    get: function() {
        return MessageFolderMetadataModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _connectedaccountmetadatamodule = require("../connected-account/connected-account-metadata.module");
const _messagechannelmetadatamodule = require("../message-channel/message-channel-metadata.module");
const _messagefolderentity = require("./entities/message-folder.entity");
const _messagefoldergraphqlapiexceptioninterceptor = require("./interceptors/message-folder-graphql-api-exception.interceptor");
const _messagefoldermetadataservice = require("./message-folder-metadata.service");
const _messagefolderresolver = require("./resolvers/message-folder.resolver");
const _permissionsmodule = require("../permissions/permissions.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessageFolderMetadataModule = class MessageFolderMetadataModule {
};
MessageFolderMetadataModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _messagefolderentity.MessageFolderEntity
            ]),
            _permissionsmodule.PermissionsModule,
            _featureflagmodule.FeatureFlagModule,
            _connectedaccountmetadatamodule.ConnectedAccountMetadataModule,
            _messagechannelmetadatamodule.MessageChannelMetadataModule
        ],
        providers: [
            _messagefoldermetadataservice.MessageFolderMetadataService,
            _messagefolderresolver.MessageFolderResolver,
            _messagefoldergraphqlapiexceptioninterceptor.MessageFolderGraphqlApiExceptionInterceptor
        ],
        exports: [
            _messagefoldermetadataservice.MessageFolderMetadataService
        ]
    })
], MessageFolderMetadataModule);

//# sourceMappingURL=message-folder-metadata.module.js.map