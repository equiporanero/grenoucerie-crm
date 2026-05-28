"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingModule", {
    enumerable: true,
    get: function() {
        return MessagingModule;
    }
});
const _common = require("@nestjs/common");
const _messagingblocklistmanagermodule = require("./blocklist-manager/messaging-blocklist-manager.module");
const _messagingmessagecleanermodule = require("./message-cleaner/messaging-message-cleaner.module");
const _messagingimportmanagermodule = require("./message-import-manager/messaging-import-manager.module");
const _messageparticipantmanagermodule = require("./message-participant-manager/message-participant-manager.module");
const _messagingmonitoringmodule = require("./monitoring/messaging-monitoring.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingModule = class MessagingModule {
};
MessagingModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _messagingimportmanagermodule.MessagingImportManagerModule,
            _messagingmessagecleanermodule.MessagingMessageCleanerModule,
            _messageparticipantmanagermodule.MessageParticipantManagerModule,
            _messagingblocklistmanagermodule.MessagingBlocklistManagerModule,
            _messagingmonitoringmodule.MessagingMonitoringModule
        ],
        providers: [],
        exports: [
            _messagingimportmanagermodule.MessagingImportManagerModule
        ]
    })
], MessagingModule);

//# sourceMappingURL=messaging.module.js.map