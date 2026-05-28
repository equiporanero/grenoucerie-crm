"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoggerService", {
    enumerable: true,
    get: function() {
        return LoggerService;
    }
});
const _common = require("@nestjs/common");
const _loggerconstants = require("./logger.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let LoggerService = class LoggerService {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    log(message, category, ...optionalParams) {
        this.driver.log.apply(this.driver, [
            message,
            category,
            ...optionalParams
        ]);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    error(message, category, ...optionalParams) {
        this.driver.error.apply(this.driver, [
            message,
            category,
            ...optionalParams
        ]);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    warn(message, category, ...optionalParams) {
        this.driver.warn.apply(this.driver, [
            message,
            category,
            ...optionalParams
        ]);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    debug(message, category, ...optionalParams) {
        this.driver.debug?.apply(this.driver, [
            message,
            category,
            ...optionalParams
        ]);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    verbose(message, category, ...optionalParams) {
        this.driver.verbose?.apply(this.driver, [
            message,
            category,
            ...optionalParams
        ]);
    }
    setLogLevels(levels) {
        this.driver.setLogLevels?.apply(this.driver, [
            levels
        ]);
    }
    time(category, label) {
        if (this.driver.options.logLevels?.includes('debug')) {
            // oxlint-disable-next-line no-console
            console.time(`[${category}] ${label}`);
        }
    }
    timeEnd(category, label) {
        if (this.driver.options.logLevels?.includes('debug')) {
            // oxlint-disable-next-line no-console
            console.timeEnd(`[${category}] ${label}`);
        }
    }
    constructor(driver){
        this.driver = driver;
    }
};
LoggerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_loggerconstants.LOGGER_DRIVER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof LoggerDriverType === "undefined" ? Object : LoggerDriverType
    ])
], LoggerService);

//# sourceMappingURL=logger.service.js.map