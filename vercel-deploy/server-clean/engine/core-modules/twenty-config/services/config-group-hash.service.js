"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigGroupHashService", {
    enumerable: true,
    get: function() {
        return ConfigGroupHashService;
    }
});
const _common = require("@nestjs/common");
const _crypto = require("crypto");
const _configvariables = require("../config-variables");
const _twentyconfigservice = require("../twenty-config.service");
const _typedreflect = require("../../../../utils/typed-reflect");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ConfigGroupHashService = class ConfigGroupHashService {
    computeHash(group) {
        const groupVariables = this.getConfigVariablesByGroup(group);
        const configValues = groupVariables.map((key)=>`${key}=${JSON.stringify(this.twentyConfigService.get(key))}`).sort().join('|');
        return (0, _crypto.createHash)('sha256').update(configValues).digest('hex').substring(0, 16);
    }
    getConfigVariablesByGroup(group) {
        const metadata = _typedreflect.TypedReflect.getMetadata('config-variables', _configvariables.ConfigVariables) ?? {};
        return Object.keys(metadata).filter((key)=>metadata[key]?.group === group).map((key)=>key);
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
    }
};
ConfigGroupHashService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], ConfigGroupHashService);

//# sourceMappingURL=config-group-hash.service.js.map