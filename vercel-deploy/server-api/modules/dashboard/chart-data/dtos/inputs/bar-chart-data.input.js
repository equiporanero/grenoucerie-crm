"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BarChartDataInput", {
    enumerable: true,
    get: function() {
        return BarChartDataInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = require("graphql-type-json");
const _scalars = require("../../../../../engine/api/graphql/workspace-schema-builder/graphql-types/scalars");
const _barchartconfigurationdto = require("../../../../../engine/metadata-modules/page-layout-widget/dtos/bar-chart-configuration.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BarChartDataInput = class BarChartDataInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], BarChartDataInput.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON),
    (0, _classvalidator.ValidateNested)(),
    (0, _classtransformer.Type)(()=>_barchartconfigurationdto.BarChartConfigurationDTO),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _barchartconfigurationdto.BarChartConfigurationDTO === "undefined" ? Object : _barchartconfigurationdto.BarChartConfigurationDTO)
], BarChartDataInput.prototype, "configuration", void 0);
BarChartDataInput = _ts_decorate([
    (0, _graphql.InputType)()
], BarChartDataInput);

//# sourceMappingURL=bar-chart-data.input.js.map