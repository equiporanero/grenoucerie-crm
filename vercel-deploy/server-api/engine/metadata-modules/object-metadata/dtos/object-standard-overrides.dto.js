"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectStandardOverridesDTO", {
    enumerable: true,
    get: function() {
        return ObjectStandardOverridesDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = require("graphql-type-json");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectStandardOverridesDTO = class ObjectStandardOverridesDTO {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ObjectStandardOverridesDTO.prototype, "labelSingular", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ObjectStandardOverridesDTO.prototype, "labelPlural", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ObjectStandardOverridesDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ObjectStandardOverridesDTO.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ObjectStandardOverridesDTO.prototype, "color", void 0);
_ts_decorate([
    (0, _classvalidator.IsJSON)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ObjectStandardOverridesDTO.prototype, "translations", void 0);
ObjectStandardOverridesDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ObjectStandardOverrides')
], ObjectStandardOverridesDTO);

//# sourceMappingURL=object-standard-overrides.dto.js.map