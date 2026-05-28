"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageQueueMetadataAccessor", {
    enumerable: true,
    get: function() {
        return MessageQueueMetadataAccessor;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _messagequeueconstants = require("./message-queue.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessageQueueMetadataAccessor = class MessageQueueMetadataAccessor {
    isProcessor(target) {
        if (!target) {
            return false;
        }
        return !!this.reflector.get(_messagequeueconstants.PROCESSOR_METADATA, target);
    }
    isProcess(target) {
        if (!target) {
            return false;
        }
        return !!this.reflector.get(_messagequeueconstants.PROCESS_METADATA, target);
    }
    getProcessorMetadata(target) {
        return this.reflector.get(_messagequeueconstants.PROCESSOR_METADATA, target);
    }
    getProcessMetadata(target) {
        const metadata = this.reflector.get(_messagequeueconstants.PROCESS_METADATA, target);
        return metadata;
    }
    constructor(reflector){
        this.reflector = reflector;
    }
};
MessageQueueMetadataAccessor = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _core.Reflector === "undefined" ? Object : _core.Reflector
    ])
], MessageQueueMetadataAccessor);

//# sourceMappingURL=message-queue-metadata.accessor.js.map