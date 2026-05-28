"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionLayerEntity", {
    enumerable: true,
    get: function() {
        return LogicFunctionLayerEntity;
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
let LogicFunctionLayerEntity = class LogicFunctionLayerEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], LogicFunctionLayerEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: false
    }),
    _ts_metadata("design:type", typeof PackageJson === "undefined" ? Object : PackageJson)
], LogicFunctionLayerEntity.prototype, "packageJson", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], LogicFunctionLayerEntity.prototype, "yarnLock", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LogicFunctionLayerEntity.prototype, "packageJsonChecksum", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], LogicFunctionLayerEntity.prototype, "yarnLockChecksum", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: false,
        default: {}
    }),
    _ts_metadata("design:type", typeof Record === "undefined" ? Object : Record)
], LogicFunctionLayerEntity.prototype, "availablePackages", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LogicFunctionLayerEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LogicFunctionLayerEntity.prototype, "updatedAt", void 0);
LogicFunctionLayerEntity = _ts_decorate([
    (0, _typeorm.Entity)('logicFunctionLayer')
], LogicFunctionLayerEntity);

//# sourceMappingURL=logic-function-layer.entity.js.map