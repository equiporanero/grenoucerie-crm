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
    get AppTokenEntity () {
        return AppTokenEntity;
    },
    get AppTokenType () {
        return AppTokenType;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _beforecreateoneapptokenhook = require("./hooks/before-create-one-app-token.hook");
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
var AppTokenType = /*#__PURE__*/ function(AppTokenType) {
    AppTokenType["RefreshToken"] = "REFRESH_TOKEN";
    AppTokenType["CodeChallenge"] = "CODE_CHALLENGE";
    AppTokenType["AuthorizationCode"] = "AUTHORIZATION_CODE";
    AppTokenType["PasswordResetToken"] = "PASSWORD_RESET_TOKEN";
    AppTokenType["InvitationToken"] = "INVITATION_TOKEN";
    AppTokenType["EmailVerificationToken"] = "EMAIL_VERIFICATION_TOKEN";
    AppTokenType["EnterpriseValidityToken"] = "ENTERPRISE_VALIDITY_TOKEN";
    return AppTokenType;
}({});
let AppTokenEntity = class AppTokenEntity {
    formatEmail() {
        if ((0, _utils.isDefined)(this.context?.email)) {
            this.context.email = this.context.email.toLowerCase();
        }
    }
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], AppTokenEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.UserEntity, (user)=>user.appTokens, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'userId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AppTokenEntity.prototype, "user", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AppTokenEntity.prototype, "userId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_workspaceentity.WorkspaceEntity, (workspace)=>workspace.appTokens, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AppTokenEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], AppTokenEntity.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text',
        default: "REFRESH_TOKEN"
    }),
    _ts_metadata("design:type", String)
], AppTokenEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], AppTokenEntity.prototype, "value", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AppTokenEntity.prototype, "expiresAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], AppTokenEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], AppTokenEntity.prototype, "revokedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AppTokenEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AppTokenEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.BeforeInsert)(),
    (0, _typeorm.BeforeUpdate)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], AppTokenEntity.prototype, "formatEmail", null);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], AppTokenEntity.prototype, "context", void 0);
AppTokenEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'appToken',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('AppToken'),
    (0, _nestjsquerygraphql.BeforeCreateOne)(_beforecreateoneapptokenhook.BeforeCreateOneAppToken)
], AppTokenEntity);

//# sourceMappingURL=app-token.entity.js.map