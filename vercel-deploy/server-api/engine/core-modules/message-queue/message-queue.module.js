"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageQueueModule", {
    enumerable: true,
    get: function() {
        return MessageQueueModule;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _messagequeuecoremodule = require("./message-queue-core.module");
const _messagequeuemetadataaccessor = require("./message-queue-metadata.accessor");
const _messagequeueexplorer = require("./message-queue.explorer");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessageQueueModule = class MessageQueueModule {
    static register(options) {
        return {
            module: MessageQueueModule,
            imports: [
                _messagequeuecoremodule.MessageQueueCoreModule.register(options)
            ]
        };
    }
    static registerExplorer() {
        return {
            module: MessageQueueModule,
            imports: [
                _core.DiscoveryModule
            ],
            providers: [
                _messagequeueexplorer.MessageQueueExplorer,
                _messagequeuemetadataaccessor.MessageQueueMetadataAccessor
            ]
        };
    }
    static registerAsync(options) {
        return {
            module: MessageQueueModule,
            imports: [
                _messagequeuecoremodule.MessageQueueCoreModule.registerAsync(options)
            ]
        };
    }
};
MessageQueueModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({})
], MessageQueueModule);

//# sourceMappingURL=message-queue.module.js.map