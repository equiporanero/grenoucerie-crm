"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SigningKeyEntity", {
    enumerable: true,
    get: function() {
        return SigningKeyEntity;
    }
});
const _typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SigningKeyEntity = class SigningKeyEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], SigningKeyEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar'
    }),
    _ts_metadata("design:type", String)
], SigningKeyEntity.prototype, "publicKey", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], SigningKeyEntity.prototype, "privateKey", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], SigningKeyEntity.prototype, "isCurrent", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], SigningKeyEntity.prototype, "revokedAt", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], SigningKeyEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], SigningKeyEntity.prototype, "updatedAt", void 0);
SigningKeyEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'signingKey',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_SIGNING_KEY_IS_CURRENT_UNIQUE', [
        'isCurrent'
    ], {
        unique: true,
        where: '"isCurrent" = true'
    }),
    (0, _typeorm.Check)('CHK_signingKey_privateKey_encrypted', `"privateKey" IS NULL OR "privateKey" LIKE 'enc:v2:%'`)
], SigningKeyEntity);

//# sourceMappingURL=signing-key.entity.js.map