"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutTabDTO", {
    enumerable: true,
    get: function() {
        return PageLayoutTabDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _pagelayoutwidgetdto = require("../../page-layout-widget/dtos/page-layout-widget.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_types.PageLayoutTabLayoutMode, {
    name: 'PageLayoutTabLayoutMode'
});
let PageLayoutTabDTO = class PageLayoutTabDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], PageLayoutTabDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], PageLayoutTabDTO.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], PageLayoutTabDTO.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: false,
        defaultValue: 0
    }),
    _ts_metadata("design:type", Number)
], PageLayoutTabDTO.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], PageLayoutTabDTO.prototype, "pageLayoutId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _pagelayoutwidgetdto.PageLayoutWidgetDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PageLayoutTabDTO.prototype, "widgets", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PageLayoutTabDTO.prototype, "icon", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.PageLayoutTabLayoutMode, {
        nullable: true,
        defaultValue: _types.PageLayoutTabLayoutMode.GRID
    }),
    _ts_metadata("design:type", typeof _types.PageLayoutTabLayoutMode === "undefined" ? Object : _types.PageLayoutTabLayoutMode)
], PageLayoutTabDTO.prototype, "layoutMode", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutTabDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutTabDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], PageLayoutTabDTO.prototype, "isActive", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PageLayoutTabDTO.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        deprecationReason: 'isOverridden is deprecated'
    }),
    _ts_metadata("design:type", Boolean)
], PageLayoutTabDTO.prototype, "isOverridden", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", Object)
], PageLayoutTabDTO.prototype, "overrides", void 0);
PageLayoutTabDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PageLayoutTab')
], PageLayoutTabDTO);

//# sourceMappingURL=page-layout-tab.dto.js.map