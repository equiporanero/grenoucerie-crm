"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Process", {
    enumerable: true,
    get: function() {
        return Process;
    }
});
const _common = require("@nestjs/common");
const _messagequeueconstants = require("../message-queue.constants");
function Process(jobName) {
    return (0, _common.SetMetadata)(_messagequeueconstants.PROCESS_METADATA, {
        jobName
    });
}

//# sourceMappingURL=process.decorator.js.map