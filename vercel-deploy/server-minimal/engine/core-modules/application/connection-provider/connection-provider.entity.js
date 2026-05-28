"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectionProviderEntity", {
    enumerable: true,
    get: function() {
        return ConnectionProviderEntity;
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
let ConnectionProviderEntity = class ConnectionProviderEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ConnectionProviderEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'varchar'
    }),
    _ts_metadata("design:type", String)
], ConnectionProviderEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'varchar'
    }),
    _ts_metadata("design:type", String)
], ConnectionProviderEntity.prototype, "displayName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'varchar'
    }),
    _ts_metadata("design:type", typeof ConnectionProviderType === "undefined" ? Object : ConnectionProviderType)
], ConnectionProviderEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], ConnectionProviderEntity.prototype, "oauthConfig", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ConnectionProviderEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ConnectionProviderEntity.prototype, "updatedAt", void 0);
ConnectionProviderEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'connectionProvider',
        schema: 'core'
    }),
    (0, _typeorm.Unique)('IDX_CONNECTION_PROVIDER_NAME_APPLICATION_UNIQUE', [
        'name',
        'applicationId'
    ]),
    (0, _typeorm.Index)('IDX_CONNECTION_PROVIDER_APPLICATION_ID', [
        'applicationId'
    ])
], ConnectionProviderEntity);

//# sourceMappingURL=connection-provider.entity.js.map