"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationLogsService", {
    enumerable: true,
    get: function() {
        return ApplicationLogsService;
    }
});
const _common = require("@nestjs/common");
const _applicationlogsconstants = require("./application-logs.constants");
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
let ApplicationLogsService = class ApplicationLogsService {
    async writeLogs(entries) {
        return this.driver.writeLogs(entries);
    }
    constructor(driver){
        this.driver = driver;
    }
};
ApplicationLogsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_applicationlogsconstants.APPLICATION_LOG_DRIVER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof ApplicationLogDriverInterface === "undefined" ? Object : ApplicationLogDriverInterface
    ])
], ApplicationLogsService);

//# sourceMappingURL=application-logs.service.js.map