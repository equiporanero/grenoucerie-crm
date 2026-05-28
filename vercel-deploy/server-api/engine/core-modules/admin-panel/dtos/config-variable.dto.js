"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigVariableDTO", {
    enumerable: true,
    get: function() {
        return ConfigVariableDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _types = require("twenty-shared/types");
const _configsourceenum = require("../../twenty-config/enums/config-source.enum");
const _configvariabletypeenum = require("../../twenty-config/enums/config-variable-type.enum");
const _configvariableoptionstype = require("../../twenty-config/types/config-variable-options.type");
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
(0, _graphql.registerEnumType)(_configsourceenum.ConfigSource, {
    name: 'ConfigSource'
});
(0, _graphql.registerEnumType)(_configvariabletypeenum.ConfigVariableType, {
    name: 'ConfigVariableType'
});
let ConfigVariableDTO = class ConfigVariableDTO {
};
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ConfigVariableDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ConfigVariableDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.ConfigVariableValue === "undefined" ? Object : _types.ConfigVariableValue)
], ConfigVariableDTO.prototype, "value", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], ConfigVariableDTO.prototype, "isSensitive", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof _configsourceenum.ConfigSource === "undefined" ? Object : _configsourceenum.ConfigSource)
], ConfigVariableDTO.prototype, "source", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], ConfigVariableDTO.prototype, "isEnvOnly", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_configvariabletypeenum.ConfigVariableType),
    _ts_metadata("design:type", typeof _configvariabletypeenum.ConfigVariableType === "undefined" ? Object : _configvariabletypeenum.ConfigVariableType)
], ConfigVariableDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _configvariableoptionstype.ConfigVariableOptions === "undefined" ? Object : _configvariableoptionstype.ConfigVariableOptions)
], ConfigVariableDTO.prototype, "options", void 0);
ConfigVariableDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ConfigVariable')
], ConfigVariableDTO);

//# sourceMappingURL=config-variable.dto.js.map