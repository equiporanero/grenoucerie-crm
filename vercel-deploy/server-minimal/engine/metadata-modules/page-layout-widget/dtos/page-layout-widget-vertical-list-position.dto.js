"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutWidgetVerticalListPositionDTO", {
    enumerable: true,
    get: function() {
        return PageLayoutWidgetVerticalListPositionDTO;
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
let PageLayoutWidgetVerticalListPositionDTO = class PageLayoutWidgetVerticalListPositionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_types.PageLayoutTabLayoutMode),
    (0, _classvalidator.IsIn)([
        _types.PageLayoutTabLayoutMode.VERTICAL_LIST
    ]),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.PageLayoutTabLayoutMode === "undefined" || typeof _types.PageLayoutTabLayoutMode.VERTICAL_LIST === "undefined" ? Object : _types.PageLayoutTabLayoutMode.VERTICAL_LIST)
], PageLayoutWidgetVerticalListPositionDTO.prototype, "layoutMode", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    (0, _classvalidator.IsInt)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], PageLayoutWidgetVerticalListPositionDTO.prototype, "index", void 0);
PageLayoutWidgetVerticalListPositionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PageLayoutWidgetVerticalListPosition')
], PageLayoutWidgetVerticalListPositionDTO);

//# sourceMappingURL=page-layout-widget-vertical-list-position.dto.js.map