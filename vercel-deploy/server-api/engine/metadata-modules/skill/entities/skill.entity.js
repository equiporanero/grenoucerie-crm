"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SkillEntity", {
    enumerable: true,
    get: function() {
        return SkillEntity;
    }
});
const _typeorm = require("typeorm");
const _syncableentityinterface = require("../../../workspace-manager/types/syncable-entity.interface");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SkillEntity = class SkillEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], SkillEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], SkillEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], SkillEntity.prototype, "label", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], SkillEntity.prototype, "icon", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], SkillEntity.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], SkillEntity.prototype, "content", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], SkillEntity.prototype, "isCustom", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], SkillEntity.prototype, "isActive", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], SkillEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], SkillEntity.prototype, "updatedAt", void 0);
SkillEntity = _ts_decorate([
    (0, _typeorm.Entity)('skill'),
    (0, _typeorm.Index)('IDX_SKILL_ID_IS_ACTIVE', [
        'id',
        'isActive'
    ]),
    (0, _typeorm.Index)('IDX_SKILL_NAME_WORKSPACE_ID_UNIQUE', [
        'name',
        'workspaceId'
    ], {
        unique: true,
        where: '"isActive" = true'
    })
], SkillEntity);

//# sourceMappingURL=skill.entity.js.map