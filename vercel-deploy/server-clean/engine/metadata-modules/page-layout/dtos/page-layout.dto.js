"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutDTO", {
    enumerable: true,
    get: function() {
        return PageLayoutDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _pagelayouttabdto = require("../../page-layout-tab/dtos/page-layout-tab.dto");
const _pagelayouttypeenum = require("../enums/page-layout-type.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_pagelayouttypeenum.PageLayoutType, {
    name: 'PageLayoutType'
});
let PageLayoutDTO = class PageLayoutDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], PageLayoutDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], PageLayoutDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_pagelayouttypeenum.PageLayoutType, {
        nullable: false,
        defaultValue: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE
    }),
    _ts_metadata("design:type", typeof _pagelayouttypeenum.PageLayoutType === "undefined" ? Object : _pagelayouttypeenum.PageLayoutType)
], PageLayoutDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PageLayoutDTO.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _pagelayouttabdto.PageLayoutTabDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PageLayoutDTO.prototype, "tabs", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.SerializedRelation === "undefined" ? Object : _types.SerializedRelation)
], PageLayoutDTO.prototype, "defaultTabToFocusOnMobileAndSidePanelId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], PageLayoutDTO.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PageLayoutDTO.prototype, "deletedAt", void 0);
PageLayoutDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PageLayout')
], PageLayoutDTO);

//# sourceMappingURL=page-layout.dto.js.map