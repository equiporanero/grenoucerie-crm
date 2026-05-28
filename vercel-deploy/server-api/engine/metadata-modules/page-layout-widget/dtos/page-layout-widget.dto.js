"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get GridPositionDTO () {
        return GridPositionDTO;
    },
    get PageLayoutWidgetDTO () {
        return PageLayoutWidgetDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _pagelayoutwidgetpositionunion = require("./page-layout-widget-position.union");
const _widgetconfigurationinterface = require("./widget-configuration.interface");
const _widgettypeenum = require("../enums/widget-type.enum");
const _allpagelayoutwidgetconfigurationtype = require("../types/all-page-layout-widget-configuration.type");
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
(0, _graphql.registerEnumType)(_widgettypeenum.WidgetType, {
    name: 'WidgetType'
});
let GridPositionDTO = class GridPositionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], GridPositionDTO.prototype, "row", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], GridPositionDTO.prototype, "column", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], GridPositionDTO.prototype, "rowSpan", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], GridPositionDTO.prototype, "columnSpan", void 0);
GridPositionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('GridPosition')
], GridPositionDTO);
let PageLayoutWidgetDTO = class PageLayoutWidgetDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], PageLayoutWidgetDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], PageLayoutWidgetDTO.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], PageLayoutWidgetDTO.prototype, "pageLayoutTabId", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], PageLayoutWidgetDTO.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_widgettypeenum.WidgetType, {
        nullable: false
    }),
    _ts_metadata("design:type", typeof _widgettypeenum.WidgetType === "undefined" ? Object : _widgettypeenum.WidgetType)
], PageLayoutWidgetDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PageLayoutWidgetDTO.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>GridPositionDTO, {
        nullable: false,
        deprecationReason: 'Use `position` instead. Will be removed in a future release.'
    }),
    _ts_metadata("design:type", typeof GridPositionDTO === "undefined" ? Object : GridPositionDTO)
], PageLayoutWidgetDTO.prototype, "gridPosition", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_pagelayoutwidgetpositionunion.PageLayoutWidgetPositionUnion, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PageLayoutWidgetDTO.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_widgetconfigurationinterface.WidgetConfiguration, {
        nullable: false
    }),
    _ts_metadata("design:type", typeof _allpagelayoutwidgetconfigurationtype.AllPageLayoutWidgetConfiguration === "undefined" ? Object : _allpagelayoutwidgetconfigurationtype.AllPageLayoutWidgetConfiguration)
], PageLayoutWidgetDTO.prototype, "configuration", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PageLayoutWidgetDTO.prototype, "conditionalDisplay", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PageLayoutWidgetDTO.prototype, "conditionalAvailabilityExpression", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutWidgetDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutWidgetDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], PageLayoutWidgetDTO.prototype, "isActive", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutWidgetDTO.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        deprecationReason: 'isOverridden is deprecated'
    }),
    _ts_metadata("design:type", Boolean)
], PageLayoutWidgetDTO.prototype, "isOverridden", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", Object)
], PageLayoutWidgetDTO.prototype, "overrides", void 0);
PageLayoutWidgetDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PageLayoutWidget')
], PageLayoutWidgetDTO);

//# sourceMappingURL=page-layout-widget.dto.js.map