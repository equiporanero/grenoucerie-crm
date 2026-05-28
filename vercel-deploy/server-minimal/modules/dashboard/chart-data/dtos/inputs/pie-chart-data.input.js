"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PieChartDataInput", {
    enumerable: true,
    get: function() {
        return PieChartDataInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = require("graphql-type-json");
const _scalars = require("../../../../../engine/api/graphql/workspace-schema-builder/graphql-types/scalars");
const _piechartconfigurationdto = require("../../../../../engine/metadata-modules/page-layout-widget/dtos/pie-chart-configuration.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PieChartDataInput = class PieChartDataInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], PieChartDataInput.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON),
    (0, _classvalidator.ValidateNested)(),
    (0, _classtransformer.Type)(()=>_piechartconfigurationdto.PieChartConfigurationDTO),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _piechartconfigurationdto.PieChartConfigurationDTO === "undefined" ? Object : _piechartconfigurationdto.PieChartConfigurationDTO)
], PieChartDataInput.prototype, "configuration", void 0);
PieChartDataInput = _ts_decorate([
    (0, _graphql.InputType)()
], PieChartDataInput);

//# sourceMappingURL=pie-chart-data.input.js.map