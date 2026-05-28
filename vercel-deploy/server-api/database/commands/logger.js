"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CommandLogger () {
        return CommandLogger;
    },
    get isCommandLogger () {
        return isCommandLogger;
    }
});
const _common = require("@nestjs/common");
const isCommandLogger = (logger)=>{
    // @ts-expect-error legacy noImplicitAny
    return typeof logger['setVerbose'] === 'function';
};
let CommandLogger = class CommandLogger {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    log(message, ...optionalParams) {
        this.logger.log(message, ...optionalParams);
    }
    error(message, stack, context) {
        this.logger.error(message, stack, context);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    warn(message, ...optionalParams) {
        this.logger.warn(message, ...optionalParams);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    debug(message, ...optionalParams) {
        this.logger.debug(message, ...optionalParams);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    verbose(message, ...optionalParams) {
        if (this.verboseFlag) {
            this.logger.log(message, ...optionalParams);
        }
    }
    setVerbose(flag) {
        this.verboseFlag = flag;
    }
    constructor(options){
        this.logger = new _common.Logger(options.constructorName);
        this.verboseFlag = options.verbose ?? false;
    }
};

//# sourceMappingURL=logger.js.map