"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigVariablesDTO", {
    enumerable: true,
    get: function() {
        return ConfigVariablesDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _configvariablesgroupdto = require("./config-variables-group.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ConfigVariablesDTO = class ConfigVariablesDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _configvariablesgroupdto.ConfigVariablesGroupDataDTO
        ]),
    _ts_metadata("design:type", Array)
], ConfigVariablesDTO.prototype, "groups", void 0);
ConfigVariablesDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ConfigVariables')
], ConfigVariablesDTO);

//# sourceMappingURL=config-variables.dto.js.map