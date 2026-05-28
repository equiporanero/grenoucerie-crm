"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileEntity", {
    enumerable: true,
    get: function() {
        return FileEntity;
    }
});
const _typeorm = require("typeorm");
const _workspacerelatedentity = require("../../../workspace-manager/types/workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FileEntity = class FileEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], FileEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], FileEntity.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('ApplicationEntity', {
        onDelete: 'RESTRICT'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'applicationId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], FileEntity.prototype, "application", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], FileEntity.prototype, "path", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'bigint'
    }),
    _ts_metadata("design:type", Number)
], FileEntity.prototype, "size", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FileEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FileEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], FileEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], FileEntity.prototype, "isStaticAsset", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], FileEntity.prototype, "settings", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'varchar',
        default: 'application/octet-stream'
    }),
    _ts_metadata("design:type", String)
], FileEntity.prototype, "mimeType", void 0);
FileEntity = _ts_decorate([
    (0, _typeorm.Entity)('file'),
    (0, _typeorm.Index)('IDX_FILE_WORKSPACE_ID', [
        'workspaceId'
    ]),
    (0, _typeorm.Unique)('IDX_APPLICATION_PATH_WORKSPACE_ID_APPLICATION_ID_UNIQUE', [
        'workspaceId',
        'applicationId',
        'path'
    ])
], FileEntity);

//# sourceMappingURL=file.entity.js.map