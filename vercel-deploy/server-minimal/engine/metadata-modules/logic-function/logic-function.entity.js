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
    get LogicFunctionEntity () {
        return LogicFunctionEntity;
    },
    get LogicFunctionRuntime () {
        return LogicFunctionRuntime;
    }
});
const _typeorm = require("typeorm");
const _syncableentityinterface = require("../../workspace-manager/types/syncable-entity.interface");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const DEFAULT_LOGIC_FUNCTION_TIMEOUT_SECONDS = 300; // 5 minutes
var LogicFunctionRuntime = /*#__PURE__*/ function(LogicFunctionRuntime) {
    LogicFunctionRuntime["NODE18"] = "nodejs18.x";
    LogicFunctionRuntime["NODE22"] = "nodejs22.x";
    return LogicFunctionRuntime;
}({});
let LogicFunctionEntity = class LogicFunctionEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], LogicFunctionEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], LogicFunctionEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], LogicFunctionEntity.prototype, "sourceHandlerPath", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], LogicFunctionEntity.prototype, "builtHandlerPath", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], LogicFunctionEntity.prototype, "handlerName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], LogicFunctionEntity.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: "nodejs22.x"
    }),
    _ts_metadata("design:type", String)
], LogicFunctionEntity.prototype, "runtime", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: DEFAULT_LOGIC_FUNCTION_TIMEOUT_SECONDS
    }),
    (0, _typeorm.Check)(`"timeoutSeconds" >= 1 AND "timeoutSeconds" <= 900`),
    _ts_metadata("design:type", Number)
], LogicFunctionEntity.prototype, "timeoutSeconds", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], LogicFunctionEntity.prototype, "checksum", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'boolean',
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], LogicFunctionEntity.prototype, "isBuildUpToDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], LogicFunctionEntity.prototype, "cronTriggerSettings", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], LogicFunctionEntity.prototype, "databaseEventTriggerSettings", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], LogicFunctionEntity.prototype, "httpRouteTriggerSettings", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], LogicFunctionEntity.prototype, "toolTriggerSettings", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], LogicFunctionEntity.prototype, "workflowActionTriggerSettings", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LogicFunctionEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LogicFunctionEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], LogicFunctionEntity.prototype, "deletedAt", void 0);
LogicFunctionEntity = _ts_decorate([
    (0, _typeorm.Entity)('logicFunction'),
    (0, _typeorm.Index)('IDX_LOGIC_FUNCTION_ID_DELETED_AT', [
        'id',
        'deletedAt'
    ])
], LogicFunctionEntity);

//# sourceMappingURL=logic-function.entity.js.map