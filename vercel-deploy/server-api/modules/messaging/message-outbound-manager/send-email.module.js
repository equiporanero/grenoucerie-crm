"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SendEmailModule", {
    enumerable: true,
    get: function() {
        return SendEmailModule;
    }
});
const _common = require("@nestjs/common");
const _fileemailattachmentmodule = require("../../../engine/core-modules/file/file-email-attachment/file-email-attachment.module");
const _toolmodule = require("../../../engine/core-modules/tool/tool.module");
const _connectedaccountmetadatamodule = require("../../../engine/metadata-modules/connected-account/connected-account-metadata.module");
const _permissionsmodule = require("../../../engine/metadata-modules/permissions/permissions.module");
const _sendemailresolver = require("./resolvers/send-email.resolver");
const _messagingsendmanagermodule = require("./messaging-send-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let SendEmailModule = class SendEmailModule {
};
SendEmailModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _fileemailattachmentmodule.FileEmailAttachmentModule,
            _toolmodule.ToolModule,
            _messagingsendmanagermodule.MessagingSendManagerModule,
            _connectedaccountmetadatamodule.ConnectedAccountMetadataModule,
            _permissionsmodule.PermissionsModule
        ],
        providers: [
            _sendemailresolver.SendEmailResolver
        ]
    })
], SendEmailModule);

//# sourceMappingURL=send-email.module.js.map