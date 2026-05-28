"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationVariableEntity", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationVariableEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _typeorm = require("typeorm");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _applicationregistrationentity = require("../application-registration/application-registration.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ApplicationRegistrationVariableEntity = class ApplicationRegistrationVariableEntity {
    get isFilled() {
        return this.encryptedValue !== '';
    }
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ApplicationRegistrationVariableEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], ApplicationRegistrationVariableEntity.prototype, "key", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text',
        default: ''
    }),
    _ts_metadata("design:type", String)
], ApplicationRegistrationVariableEntity.prototype, "encryptedValue", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text',
        default: ''
    }),
    _ts_metadata("design:type", String)
], ApplicationRegistrationVariableEntity.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'boolean',
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], ApplicationRegistrationVariableEntity.prototype, "isSecret", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'boolean',
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], ApplicationRegistrationVariableEntity.prototype, "isRequired", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean),
    _ts_metadata("design:paramtypes", [])
], ApplicationRegistrationVariableEntity.prototype, "isFilled", null);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ApplicationRegistrationVariableEntity.prototype, "applicationRegistrationId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_applicationregistrationentity.ApplicationRegistrationEntity, (applicationRegistration)=>applicationRegistration.variables, {
        onDelete: 'CASCADE',
        nullable: false
    }),
    (0, _typeorm.JoinColumn)({
        name: 'applicationRegistrationId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ApplicationRegistrationVariableEntity.prototype, "applicationRegistration", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApplicationRegistrationVariableEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApplicationRegistrationVariableEntity.prototype, "updatedAt", void 0);
ApplicationRegistrationVariableEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'applicationRegistrationVariable',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('ApplicationRegistrationVariable'),
    (0, _typeorm.Unique)('IDX_APP_REG_VAR_KEY_APP_REGISTRATION_ID_UNIQUE', [
        'key',
        'applicationRegistrationId'
    ]),
    (0, _typeorm.Index)('IDX_APP_REG_VAR_APP_REGISTRATION_ID', [
        'applicationRegistrationId'
    ]),
    (0, _typeorm.Check)('CHK_applicationRegistrationVariable_encryptedValue_encrypted', `"encryptedValue" = '' OR "encryptedValue" LIKE 'enc:v2:%'`)
], ApplicationRegistrationVariableEntity);

//# sourceMappingURL=application-registration-variable.entity.js.map