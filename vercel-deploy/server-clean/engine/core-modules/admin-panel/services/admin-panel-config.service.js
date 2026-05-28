"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelConfigService", {
    enumerable: true,
    get: function() {
        return AdminPanelConfigService;
    }
});
const _common = require("@nestjs/common");
const _configvariablesgroupmetadata = require("../../twenty-config/constants/config-variables-group-metadata");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminPanelConfigService = class AdminPanelConfigService {
    getConfigVariablesGrouped() {
        const rawEnvVars = this.twentyConfigService.getAll();
        const groupedData = new Map();
        for (const [varName, { value, metadata, source }] of Object.entries(rawEnvVars)){
            const { group, description } = metadata;
            if (metadata.isHiddenInAdminPanel) {
                continue;
            }
            const envVar = {
                name: varName,
                description,
                value: value ?? null,
                isSensitive: metadata.isSensitive ?? false,
                isEnvOnly: metadata.isEnvOnly ?? false,
                type: metadata.type,
                options: metadata.options,
                source
            };
            if (!groupedData.has(group)) {
                groupedData.set(group, []);
            }
            groupedData.get(group)?.push(envVar);
        }
        const groups = Array.from(groupedData.entries()).filter(([name])=>!_configvariablesgroupmetadata.CONFIG_VARIABLES_GROUP_METADATA[name].isHiddenInAdminPanel).sort((a, b)=>{
            const positionA = _configvariablesgroupmetadata.CONFIG_VARIABLES_GROUP_METADATA[a[0]].position;
            const positionB = _configvariablesgroupmetadata.CONFIG_VARIABLES_GROUP_METADATA[b[0]].position;
            return positionA - positionB;
        }).map(([name, variables])=>({
                name,
                description: _configvariablesgroupmetadata.CONFIG_VARIABLES_GROUP_METADATA[name].description,
                isHiddenOnLoad: _configvariablesgroupmetadata.CONFIG_VARIABLES_GROUP_METADATA[name].isHiddenOnLoad,
                variables: variables.sort((a, b)=>a.name.localeCompare(b.name))
            }));
        return {
            groups
        };
    }
    getConfigVariable(key) {
        const variableWithMetadata = this.twentyConfigService.getVariableWithMetadata(key);
        if (!variableWithMetadata) {
            throw new Error(`Config variable ${key} not found`);
        }
        const { value, metadata, source } = variableWithMetadata;
        return {
            name: key,
            description: metadata.description ?? '',
            value: value ?? null,
            isSensitive: metadata.isSensitive ?? false,
            isEnvOnly: metadata.isEnvOnly ?? false,
            type: metadata.type,
            options: metadata.options,
            source
        };
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
    }
};
AdminPanelConfigService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], AdminPanelConfigService);

//# sourceMappingURL=admin-panel-config.service.js.map