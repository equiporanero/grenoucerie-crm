"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SearchRecordDTO", {
    enumerable: true,
    get: function() {
        return SearchRecordDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SearchRecordDTO = class SearchRecordDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], SearchRecordDTO.prototype, "recordId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], SearchRecordDTO.prototype, "objectNameSingular", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], SearchRecordDTO.prototype, "objectLabelSingular", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], SearchRecordDTO.prototype, "label", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], SearchRecordDTO.prototype, "imageUrl", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    (0, _classvalidator.IsNumber)(),
    _ts_metadata("design:type", Number)
], SearchRecordDTO.prototype, "tsRankCD", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    (0, _classvalidator.IsNumber)(),
    _ts_metadata("design:type", Number)
], SearchRecordDTO.prototype, "tsRank", void 0);
SearchRecordDTO = _ts_decorate([
    (0, _graphql.ObjectType)('SearchRecord')
], SearchRecordDTO);

//# sourceMappingURL=search-record.dto.js.map