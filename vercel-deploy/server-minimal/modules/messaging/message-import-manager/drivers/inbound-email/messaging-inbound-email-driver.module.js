"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingInboundEmailDriverModule", {
    enumerable: true,
    get: function() {
        return MessagingInboundEmailDriverModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _twentyconfigmodule = require("../../../../../engine/core-modules/twenty-config/twenty-config.module");
const _connectedaccountentity = require("../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _workspacedatasourcemodule = require("../../../../../engine/workspace-datasource/workspace-datasource.module");
const _inboundemails3clientprovider = require("./providers/inbound-email-s3-client.provider");
const _inboundemailparserservice = require("./services/inbound-email-parser.service");
const _inboundemailstorageservice = require("./services/inbound-email-storage.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingInboundEmailDriverModule = class MessagingInboundEmailDriverModule {
};
MessagingInboundEmailDriverModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _twentyconfigmodule.TwentyConfigModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _typeorm.TypeOrmModule.forFeature([
                _messagechannelentity.MessageChannelEntity,
                _connectedaccountentity.ConnectedAccountEntity
            ])
        ],
        providers: [
            _inboundemails3clientprovider.InboundEmailS3ClientProvider,
            _inboundemailstorageservice.InboundEmailStorageService,
            _inboundemailparserservice.InboundEmailParserService
        ],
        exports: [
            _inboundemails3clientprovider.InboundEmailS3ClientProvider,
            _inboundemailstorageservice.InboundEmailStorageService,
            _inboundemailparserservice.InboundEmailParserService
        ]
    })
], MessagingInboundEmailDriverModule);

//# sourceMappingURL=messaging-inbound-email-driver.module.js.map