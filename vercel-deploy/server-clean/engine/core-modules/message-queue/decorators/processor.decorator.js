"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Processor", {
    enumerable: true,
    get: function() {
        return Processor;
    }
});
const _common = require("@nestjs/common");
const _constants = require("@nestjs/common/constants");
const _messagequeueconstants = require("../message-queue.constants");
function Processor(queueNameOrOptions) {
    const options = typeof queueNameOrOptions === 'object' ? queueNameOrOptions : {
        queueName: queueNameOrOptions
    };
    return (target)=>{
        (0, _common.SetMetadata)(_constants.SCOPE_OPTIONS_METADATA, options)(target);
        (0, _common.SetMetadata)(_messagequeueconstants.PROCESSOR_METADATA, options)(target);
    };
}

//# sourceMappingURL=processor.decorator.js.map