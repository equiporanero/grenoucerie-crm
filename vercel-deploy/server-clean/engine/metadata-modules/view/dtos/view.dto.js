"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewDTO", {
    enumerable: true,
    get: function() {
        return ViewDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _viewfieldgroupdto = require("../../view-field-group/dtos/view-field-group.dto");
const _viewfielddto = require("../../view-field/dtos/view-field.dto");
const _viewfiltergroupdto = require("../../view-filter-group/dtos/view-filter-group.dto");
const _viewfilterdto = require("../../view-filter/dtos/view-filter.dto");
const _viewgroupdto = require("../../view-group/dtos/view-group.dto");
const _viewsortdto = require("../../view-sort/dtos/view-sort.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_types.ViewOpenRecordIn, {
    name: 'ViewOpenRecordIn'
});
(0, _graphql.registerEnumType)(_types.ViewType, {
    name: 'ViewType'
});
(0, _graphql.registerEnumType)(_types.ViewKey, {
    name: 'ViewKey'
});
(0, _graphql.registerEnumType)(_types.ViewCalendarLayout, {
    name: 'ViewCalendarLayout'
});
(0, _graphql.registerEnumType)(_types.ViewVisibility, {
    name: 'ViewVisibility'
});
let ViewDTO = class ViewDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ViewDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewDTO.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.ViewType, {
        nullable: false,
        defaultValue: _types.ViewType.TABLE
    }),
    _ts_metadata("design:type", typeof _types.ViewType === "undefined" ? Object : _types.ViewType)
], ViewDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.ViewKey, {
        nullable: true,
        defaultValue: _types.ViewKey.INDEX
    }),
    _ts_metadata("design:type", Object)
], ViewDTO.prototype, "key", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewDTO.prototype, "icon", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: 0
    }),
    _ts_metadata("design:type", Number)
], ViewDTO.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: false
    }),
    _ts_metadata("design:type", Boolean)
], ViewDTO.prototype, "isCompact", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: false
    }),
    _ts_metadata("design:type", Boolean)
], ViewDTO.prototype, "isCustom", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.ViewOpenRecordIn, {
        nullable: false,
        defaultValue: _types.ViewOpenRecordIn.SIDE_PANEL
    }),
    _ts_metadata("design:type", typeof _types.ViewOpenRecordIn === "undefined" ? Object : _types.ViewOpenRecordIn)
], ViewDTO.prototype, "openRecordIn", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.AggregateOperations, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewDTO.prototype, "kanbanAggregateOperation", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewDTO.prototype, "kanbanAggregateOperationFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewDTO.prototype, "mainGroupByFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: false
    }),
    _ts_metadata("design:type", Boolean)
], ViewDTO.prototype, "shouldHideEmptyGroups", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewDTO.prototype, "calendarFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewDTO.prototype, "anyFieldFilterValue", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.ViewCalendarLayout, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewDTO.prototype, "calendarLayout", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewDTO.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewfielddto.ViewFieldDTO
        ]),
    _ts_metadata("design:type", Array)
], ViewDTO.prototype, "viewFields", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewfilterdto.ViewFilterDTO
        ]),
    _ts_metadata("design:type", Array)
], ViewDTO.prototype, "viewFilters", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewfiltergroupdto.ViewFilterGroupDTO
        ]),
    _ts_metadata("design:type", Array)
], ViewDTO.prototype, "viewFilterGroups", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewsortdto.ViewSortDTO
        ]),
    _ts_metadata("design:type", Array)
], ViewDTO.prototype, "viewSorts", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewgroupdto.ViewGroupDTO
        ]),
    _ts_metadata("design:type", Array)
], ViewDTO.prototype, "viewGroups", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewfieldgroupdto.ViewFieldGroupDTO
        ]),
    _ts_metadata("design:type", Array)
], ViewDTO.prototype, "viewFieldGroups", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.ViewVisibility, {
        nullable: false
    }),
    _ts_metadata("design:type", typeof _types.ViewVisibility === "undefined" ? Object : _types.ViewVisibility)
], ViewDTO.prototype, "visibility", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewDTO.prototype, "createdByUserWorkspaceId", void 0);
ViewDTO = _ts_decorate([
    (0, _graphql.ObjectType)('View')
], ViewDTO);

//# sourceMappingURL=view.dto.js.map