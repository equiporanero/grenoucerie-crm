"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentEntity", {
    enumerable: true,
    get: function() {
        return AgentEntity;
    }
});
const _typeorm = require("typeorm");
const _constants = require("twenty-shared/constants");
const _syncableentityinterface = require("../../../../workspace-manager/types/syncable-entity.interface");
const _jsonbpropertytype = require("../../../../workspace-manager/workspace-migration/universal-flat-entity/types/jsonb-property.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AgentEntity = class AgentEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], AgentEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], AgentEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], AgentEntity.prototype, "label", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], AgentEntity.prototype, "icon", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], AgentEntity.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], AgentEntity.prototype, "prompt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'varchar',
        default: _constants.AUTO_SELECT_SMART_MODEL_ID
    }),
    _ts_metadata("design:type", typeof ModelId === "undefined" ? Object : ModelId)
], AgentEntity.prototype, "modelId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb',
        default: {
            type: 'text'
        }
    }),
    _ts_metadata("design:type", typeof _jsonbpropertytype.JsonbProperty === "undefined" ? Object : _jsonbpropertytype.JsonbProperty)
], AgentEntity.prototype, "responseFormat", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], AgentEntity.prototype, "isCustom", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], AgentEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], AgentEntity.prototype, "modelConfiguration", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        array: true,
        default: '{}'
    }),
    _ts_metadata("design:type", Array)
], AgentEntity.prototype, "evaluationInputs", void 0);
AgentEntity = _ts_decorate([
    (0, _typeorm.Entity)('agent'),
    (0, _typeorm.Index)('IDX_AGENT_ID_DELETED_AT', [
        'id',
        'deletedAt'
    ]),
    (0, _typeorm.Index)('IDX_AGENT_NAME_WORKSPACE_ID_UNIQUE', [
        'name',
        'workspaceId'
    ], {
        unique: true,
        where: '"deletedAt" IS NULL'
    })
], AgentEntity);

//# sourceMappingURL=agent.entity.js.map