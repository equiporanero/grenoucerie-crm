"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DataSourceEntity", {
    enumerable: true,
    get: function() {
        return DataSourceEntity;
    }
});
const _typeorm = require("typeorm");
const _workspacerelatedentity = require("../../workspace-manager/types/workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DataSourceEntity = class DataSourceEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], DataSourceEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], DataSourceEntity.prototype, "label", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], DataSourceEntity.prototype, "url", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], DataSourceEntity.prototype, "schema", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: [
            'postgres'
        ],
        default: 'postgres'
    }),
    _ts_metadata("design:type", typeof DataSourceType === "undefined" ? Object : DataSourceType)
], DataSourceEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], DataSourceEntity.prototype, "isRemote", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DataSourceEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DataSourceEntity.prototype, "updatedAt", void 0);
DataSourceEntity = _ts_decorate([
    (0, _typeorm.Entity)('dataSource'),
    (0, _typeorm.Index)('IDX_DATA_SOURCE_WORKSPACE_ID_CREATED_AT', [
        'workspaceId',
        'createdAt'
    ])
], DataSourceEntity);

//# sourceMappingURL=data-source.entity.js.map