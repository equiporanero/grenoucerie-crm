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
    get KeyValuePairEntity () {
        return KeyValuePairEntity;
    },
    get KeyValuePairType () {
        return KeyValuePairType;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _typeorm = require("typeorm");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _userentity = require("../user/user.entity");
const _workspaceentity = require("../workspace/workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var KeyValuePairType = /*#__PURE__*/ function(KeyValuePairType) {
    KeyValuePairType["USER_VARIABLE"] = "USER_VARIABLE";
    KeyValuePairType["FEATURE_FLAG"] = "FEATURE_FLAG";
    KeyValuePairType["CONFIG_VARIABLE"] = "CONFIG_VARIABLE";
    return KeyValuePairType;
}({});
let KeyValuePairEntity = class KeyValuePairEntity {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], KeyValuePairEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.UserEntity, (user)=>user.keyValuePairs, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'userId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], KeyValuePairEntity.prototype, "user", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], KeyValuePairEntity.prototype, "userId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_workspaceentity.WorkspaceEntity, (workspace)=>workspace.keyValuePairs, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], KeyValuePairEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], KeyValuePairEntity.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], KeyValuePairEntity.prototype, "key", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>JSON, {
        nullable: true
    }),
    (0, _typeorm.Column)('jsonb', {
        nullable: true
    }),
    _ts_metadata("design:type", typeof JSON === "undefined" ? Object : JSON)
], KeyValuePairEntity.prototype, "value", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], KeyValuePairEntity.prototype, "textValueDeprecated", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>KeyValuePairType),
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(KeyValuePairType),
        nullable: false,
        default: "USER_VARIABLE"
    }),
    _ts_metadata("design:type", String)
], KeyValuePairEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], KeyValuePairEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], KeyValuePairEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], KeyValuePairEntity.prototype, "deletedAt", void 0);
KeyValuePairEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'keyValuePair',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('KeyValuePair'),
    (0, _typeorm.Unique)('IDX_KEY_VALUE_PAIR_KEY_USER_ID_WORKSPACE_ID_UNIQUE', [
        'key',
        'userId',
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_KEY_VALUE_PAIR_KEY_WORKSPACE_ID_NULL_USER_ID_UNIQUE', [
        'key',
        'workspaceId'
    ], {
        unique: true,
        where: '"userId" is NULL'
    }),
    (0, _typeorm.Index)('IDX_KEY_VALUE_PAIR_KEY_USER_ID_NULL_WORKSPACE_ID_UNIQUE', [
        'key',
        'userId'
    ], {
        unique: true,
        where: '"workspaceId" is NULL'
    }),
    (0, _typeorm.Index)('IDX_KEY_VALUE_PAIR_KEY_NULL_USER_ID_NULL_WORKSPACE_ID_UNIQUE', [
        'key'
    ], {
        unique: true,
        where: '"userId" is NULL AND "workspaceId" is NULL'
    })
], KeyValuePairEntity);

//# sourceMappingURL=key-value-pair.entity.js.map