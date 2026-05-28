"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutWidgetGridPositionDTO", {
    enumerable: true,
    get: function() {
        return PageLayoutWidgetGridPositionDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PageLayoutWidgetGridPositionDTO = class PageLayoutWidgetGridPositionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_types.PageLayoutTabLayoutMode),
    (0, _classvalidator.IsIn)([
        _types.PageLayoutTabLayoutMode.GRID
    ]),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.PageLayoutTabLayoutMode === "undefined" || typeof _types.PageLayoutTabLayoutMode.GRID === "undefined" ? Object : _types.PageLayoutTabLayoutMode.GRID)
], PageLayoutWidgetGridPositionDTO.prototype, "layoutMode", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], PageLayoutWidgetGridPositionDTO.prototype, "row", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], PageLayoutWidgetGridPositionDTO.prototype, "column", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], PageLayoutWidgetGridPositionDTO.prototype, "rowSpan", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(1),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], PageLayoutWidgetGridPositionDTO.prototype, "columnSpan", void 0);
PageLayoutWidgetGridPositionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PageLayoutWidgetGridPosition')
], PageLayoutWidgetGridPositionDTO);

//# sourceMappingURL=page-layout-widget-grid-position.dto.js.map