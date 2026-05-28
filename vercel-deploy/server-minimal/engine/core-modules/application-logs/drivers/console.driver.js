"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConsoleApplicationLogDriver", {
    enumerable: true,
    get: function() {
        return ConsoleApplicationLogDriver;
    }
});
const _common = require("@nestjs/common");
let ConsoleApplicationLogDriver = class ConsoleApplicationLogDriver {
    async writeLogs(entries) {
        for (const entry of entries){
            const context = `${entry.logicFunctionName}:${entry.executionId}`;
            switch(entry.level){
                case 'ERROR':
                    this.logger.error(entry.message, undefined, context);
                    break;
                case 'WARN':
                    this.logger.warn(entry.message, context);
                    break;
                case 'DEBUG':
                    this.logger.debug(entry.message, context);
                    break;
                default:
                    this.logger.log(entry.message, context);
                    break;
            }
        }
    }
    constructor(){
        this.logger = new _common.Logger(ConsoleApplicationLogDriver.name);
    }
};

//# sourceMappingURL=console.driver.js.map