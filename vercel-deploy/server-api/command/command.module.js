"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommandModule", {
    enumerable: true,
    get: function() {
        return CommandModule;
    }
});
const _common = require("@nestjs/common");
const _appmodule = require("../app.module");
const _databasecommandmodule = require("../database/commands/database-command.module");
const _fieldmetadatamodule = require("../engine/metadata-modules/field-metadata/field-metadata.module");
const _objectmetadatamodule = require("../engine/metadata-modules/object-metadata/object-metadata.module");
const _workspacecleanermodule = require("../engine/workspace-manager/workspace-cleaner/workspace-cleaner.module");
const _messagingmessagecleanermodule = require("../modules/messaging/message-cleaner/messaging-message-cleaner.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommandModule = class CommandModule {
};
CommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _appmodule.AppModule,
            _databasecommandmodule.DatabaseCommandModule,
            _messagingmessagecleanermodule.MessagingMessageCleanerModule,
            _objectmetadatamodule.ObjectMetadataModule,
            _fieldmetadatamodule.FieldMetadataModule,
            _workspacecleanermodule.WorkspaceCleanerModule
        ]
    })
], CommandModule);

//# sourceMappingURL=command.module.js.map