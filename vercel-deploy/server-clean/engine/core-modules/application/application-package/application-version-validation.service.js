"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationVersionValidationService", {
    enumerable: true,
    get: function() {
        return ApplicationVersionValidationService;
    }
});
const _common = require("@nestjs/common");
const _semver = /*#__PURE__*/ _interop_require_default(require("semver"));
const _utils = require("twenty-shared/utils");
const _upgrademigrationservice = require("../../upgrade/services/upgrade-migration.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ApplicationVersionValidationService = class ApplicationVersionValidationService {
    async validateServerCompatibility(requiredServerVersion) {
        if (!(0, _utils.isDefined)(requiredServerVersion)) {
            return {
                compatible: true
            };
        }
        if (!(0, _utils.isDefined)(_semver.default.validRange(requiredServerVersion))) {
            return {
                compatible: false,
                reason: 'INVALID_REQUIRED_VERSION',
                message: `App manifest declares invalid engines.twenty value "${requiredServerVersion}". Must be a valid semver range.`
            };
        }
        const inferredServerVersion = await this.upgradeMigrationService.getInferredVersion();
        if (!(0, _utils.isDefined)(inferredServerVersion) || !(0, _utils.isDefined)(_semver.default.valid(inferredServerVersion))) {
            return {
                compatible: false,
                reason: 'INVALID_SERVER_VERSION',
                message: `Cannot verify server compatibility: inferred server version "${inferredServerVersion ?? 'undefined'}" is not a valid semver version.`
            };
        }
        if (!_semver.default.satisfies(inferredServerVersion, requiredServerVersion)) {
            return {
                compatible: false,
                reason: 'INCOMPATIBLE',
                message: `App requires Twenty server ${requiredServerVersion} but this server is ${inferredServerVersion}.`
            };
        }
        return {
            compatible: true
        };
    }
    constructor(upgradeMigrationService){
        this.upgradeMigrationService = upgradeMigrationService;
    }
};
ApplicationVersionValidationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _upgrademigrationservice.UpgradeMigrationService === "undefined" ? Object : _upgrademigrationservice.UpgradeMigrationService
    ])
], ApplicationVersionValidationService);

//# sourceMappingURL=application-version-validation.service.js.map