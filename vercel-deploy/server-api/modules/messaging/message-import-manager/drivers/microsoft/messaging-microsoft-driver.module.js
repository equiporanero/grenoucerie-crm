"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMicrosoftDriverModule", {
    enumerable: true,
    get: function() {
        return MessagingMicrosoftDriverModule;
    }
});
const _common = require("@nestjs/common");
const _featureflagmodule = require("../../../../../engine/core-modules/feature-flag/feature-flag.module");
const _twentyconfigmodule = require("../../../../../engine/core-modules/twenty-config/twenty-config.module");
const _objectmetadatarepositorymodule = require("../../../../../engine/object-metadata-repository/object-metadata-repository.module");
const _workspacedatasourcemodule = require("../../../../../engine/workspace-datasource/workspace-datasource.module");
const _oauth2clientmanagermodule = require("../../../../connected-account/oauth2-client-manager/oauth2-client-manager.module");
const _messagingcommonmodule = require("../../../common/messaging-common.module");
const _microsoftfetchbybatchservice = require("./services/microsoft-fetch-by-batch.service");
const _microsoftgetmessagesservice = require("./services/microsoft-get-messages.service");
const _microsoftmessagelistfetcherrorhandlerservice = require("./services/microsoft-message-list-fetch-error-handler.service");
const _microsoftmessagesimporterrorhandlerservice = require("./services/microsoft-messages-import-error-handler.service");
const _microsoftnetworkerrorhandlerservice = require("./services/microsoft-network-error-handler.service");
const _microsoftgetmessagelistservice = require("./services/microsoft-get-message-list.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingMicrosoftDriverModule = class MessagingMicrosoftDriverModule {
};
MessagingMicrosoftDriverModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _twentyconfigmodule.TwentyConfigModule,
            _messagingcommonmodule.MessagingCommonModule,
            _featureflagmodule.FeatureFlagModule,
            _oauth2clientmanagermodule.OAuth2ClientManagerModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _objectmetadatarepositorymodule.ObjectMetadataRepositoryModule
        ],
        providers: [
            _microsoftgetmessagelistservice.MicrosoftGetMessageListService,
            _microsoftgetmessagesservice.MicrosoftGetMessagesService,
            _microsoftfetchbybatchservice.MicrosoftFetchByBatchService,
            _microsoftnetworkerrorhandlerservice.MicrosoftNetworkErrorHandler,
            _microsoftmessagelistfetcherrorhandlerservice.MicrosoftMessageListFetchErrorHandler,
            _microsoftmessagesimporterrorhandlerservice.MicrosoftMessagesImportErrorHandler
        ],
        exports: [
            _microsoftgetmessagelistservice.MicrosoftGetMessageListService,
            _microsoftgetmessagesservice.MicrosoftGetMessagesService,
            _microsoftmessagelistfetcherrorhandlerservice.MicrosoftMessageListFetchErrorHandler,
            _microsoftmessagesimporterrorhandlerservice.MicrosoftMessagesImportErrorHandler
        ]
    })
], MessagingMicrosoftDriverModule);

//# sourceMappingURL=messaging-microsoft-driver.module.js.map