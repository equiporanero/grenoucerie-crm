"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ToolModule", {
    enumerable: true,
    get: function() {
        return ToolModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../application/application.module");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _fileentity = require("../file/entities/file.entity");
const _filemodule = require("../file/file.module");
const _jwtmodule = require("../jwt/jwt.module");
const _securehttpclientmodule = require("../secure-http-client/secure-http-client.module");
const _codeinterpretertool = require("./tools/code-interpreter-tool/code-interpreter-tool");
const _draftemailtool = require("./tools/email-tool/draft-email-tool");
const _emailcomposerservice = require("./tools/email-tool/email-composer.service");
const _sendemailtool = require("./tools/email-tool/send-email-tool");
const _httptool = require("./tools/http-tool/http-tool");
const _navigateapptool = require("./tools/navigate-tool/navigate-app-tool");
const _searchhelpcentertool = require("./tools/search-help-center-tool/search-help-center-tool");
const _workspacemanyorallflatentitymapscachemodule = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _connectedaccountentity = require("../../metadata-modules/connected-account/entities/connected-account.entity");
const _navigationmenuitemmodule = require("../../metadata-modules/navigation-menu-item/navigation-menu-item.module");
const _objectmetadatamodule = require("../../metadata-modules/object-metadata/object-metadata.module");
const _viewmodule = require("../../metadata-modules/view/view.module");
const _messagingimportmanagermodule = require("../../../modules/messaging/message-import-manager/messaging-import-manager.module");
const _messagingsendmanagermodule = require("../../../modules/messaging/message-outbound-manager/messaging-send-manager.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ToolModule = class ToolModule {
};
ToolModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _messagingimportmanagermodule.MessagingImportManagerModule,
            _messagingsendmanagermodule.MessagingSendManagerModule,
            _typeorm.TypeOrmModule.forFeature([
                _fileentity.FileEntity,
                _connectedaccountentity.ConnectedAccountEntity
            ]),
            _applicationmodule.ApplicationModule,
            _featureflagmodule.FeatureFlagModule,
            _filemodule.FileModule,
            _jwtmodule.JwtModule,
            _securehttpclientmodule.SecureHttpClientModule,
            _objectmetadatamodule.ObjectMetadataModule,
            _viewmodule.ViewModule,
            _navigationmenuitemmodule.NavigationMenuItemModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _httptool.HttpTool,
            _sendemailtool.SendEmailTool,
            _draftemailtool.DraftEmailTool,
            _emailcomposerservice.EmailComposerService,
            _searchhelpcentertool.SearchHelpCenterTool,
            _codeinterpretertool.CodeInterpreterTool,
            _navigateapptool.NavigateAppTool,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_fileentity.FileEntity)
        ],
        exports: [
            _httptool.HttpTool,
            _sendemailtool.SendEmailTool,
            _draftemailtool.DraftEmailTool,
            _emailcomposerservice.EmailComposerService,
            _searchhelpcentertool.SearchHelpCenterTool,
            _codeinterpretertool.CodeInterpreterTool,
            _navigateapptool.NavigateAppTool
        ]
    })
], ToolModule);

//# sourceMappingURL=tool.module.js.map