"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileWithSignedUrlDTO", {
    enumerable: true,
    get: function() {
        return FileWithSignedUrlDTO;
    }
});
const _graphql = require("@nestjs/graphql");
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
let FileWithSignedUrlDTO = class FileWithSignedUrlDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], FileWithSignedUrlDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], FileWithSignedUrlDTO.prototype, "path", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], FileWithSignedUrlDTO.prototype, "size", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: false
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FileWithSignedUrlDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], FileWithSignedUrlDTO.prototype, "url", void 0);
FileWithSignedUrlDTO = _ts_decorate([
    (0, _graphql.ObjectType)('FileWithSignedUrl')
], FileWithSignedUrlDTO);

//# sourceMappingURL=file-with-sign-url.dto.js.map