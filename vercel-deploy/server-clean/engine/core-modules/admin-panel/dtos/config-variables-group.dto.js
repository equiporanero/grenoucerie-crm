"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigVariablesGroupDataDTO", {
    enumerable: true,
    get: function() {
        return ConfigVariablesGroupDataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _configvariabledto = require("./config-variable.dto");
const _configvariablesgroupenum = require("../../twenty-config/enums/config-variables-group.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_configvariablesgroupenum.ConfigVariablesGroup, {
    name: 'ConfigVariablesGroup'
});
let ConfigVariablesGroupDataDTO = class ConfigVariablesGroupDataDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _configvariabledto.ConfigVariableDTO
        ]),
    _ts_metadata("design:type", Array)
], ConfigVariablesGroupDataDTO.prototype, "variables", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_configvariablesgroupenum.ConfigVariablesGroup),
    _ts_metadata("design:type", typeof _configvariablesgroupenum.ConfigVariablesGroup === "undefined" ? Object : _configvariablesgroupenum.ConfigVariablesGroup)
], ConfigVariablesGroupDataDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        defaultValue: ''
    }),
    _ts_metadata("design:type", String)
], ConfigVariablesGroupDataDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        defaultValue: false
    }),
    _ts_metadata("design:type", Boolean)
], ConfigVariablesGroupDataDTO.prototype, "isHiddenOnLoad", void 0);
ConfigVariablesGroupDataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ConfigVariablesGroupData')
], ConfigVariablesGroupDataDTO);

//# sourceMappingURL=config-variables-group.dto.js.map