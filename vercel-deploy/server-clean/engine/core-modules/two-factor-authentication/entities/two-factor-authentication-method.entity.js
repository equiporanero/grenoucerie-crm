"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwoFactorAuthenticationMethodEntity", {
    enumerable: true,
    get: function() {
        return TwoFactorAuthenticationMethodEntity;
    }
});
const _types = require("twenty-shared/types");
const _typeorm = require("typeorm");
const _otpconstants = require("../strategies/otp/otp.constants");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TwoFactorAuthenticationMethodEntity = class TwoFactorAuthenticationMethodEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], TwoFactorAuthenticationMethodEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], TwoFactorAuthenticationMethodEntity.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('WorkspaceEntity', {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], TwoFactorAuthenticationMethodEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], TwoFactorAuthenticationMethodEntity.prototype, "userWorkspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userworkspaceentity.UserWorkspaceEntity, (userWorkspace)=>userWorkspace.twoFactorAuthenticationMethods, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'userWorkspaceId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], TwoFactorAuthenticationMethodEntity.prototype, "userWorkspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], TwoFactorAuthenticationMethodEntity.prototype, "secret", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _otpconstants.OTPStatus,
        nullable: false
    }),
    _ts_metadata("design:type", typeof _otpconstants.OTPStatus === "undefined" ? Object : _otpconstants.OTPStatus)
], TwoFactorAuthenticationMethodEntity.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.TwoFactorAuthenticationStrategy
    }),
    _ts_metadata("design:type", typeof _types.TwoFactorAuthenticationStrategy === "undefined" ? Object : _types.TwoFactorAuthenticationStrategy)
], TwoFactorAuthenticationMethodEntity.prototype, "strategy", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], TwoFactorAuthenticationMethodEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], TwoFactorAuthenticationMethodEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], TwoFactorAuthenticationMethodEntity.prototype, "deletedAt", void 0);
TwoFactorAuthenticationMethodEntity = _ts_decorate([
    (0, _typeorm.Index)([
        'userWorkspaceId',
        'strategy'
    ], {
        unique: true
    }),
    (0, _typeorm.Entity)({
        name: 'twoFactorAuthenticationMethod',
        schema: 'core'
    }),
    (0, _typeorm.Check)('CHK_twoFactorAuthenticationMethod_secret_encrypted', `"secret" LIKE 'enc:v2:%'`)
], TwoFactorAuthenticationMethodEntity);

//# sourceMappingURL=two-factor-authentication-method.entity.js.map