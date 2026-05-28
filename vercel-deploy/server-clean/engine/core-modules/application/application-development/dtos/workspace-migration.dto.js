"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationDTO", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
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
let WorkspaceMigrationDTO = class WorkspaceMigrationDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], WorkspaceMigrationDTO.prototype, "applicationUniversalIdentifier", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default),
    _ts_metadata("design:type", Array)
], WorkspaceMigrationDTO.prototype, "actions", void 0);
WorkspaceMigrationDTO = _ts_decorate([
    (0, _graphql.ObjectType)('WorkspaceMigration')
], WorkspaceMigrationDTO);

//# sourceMappingURL=workspace-migration.dto.js.map