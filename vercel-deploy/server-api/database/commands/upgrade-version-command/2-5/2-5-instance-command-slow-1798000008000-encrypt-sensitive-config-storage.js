"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EncryptSensitiveConfigStorageSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return EncryptSensitiveConfigStorageSlowInstanceCommand;
    }
});
const _utils = require("twenty-shared/utils");
const _keyvaluepairentity = require("../../../../engine/core-modules/key-value-pair/key-value-pair.entity");
const _secretencryptionconstant = require("../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const _secretencryptionservice = require("../../../../engine/core-modules/secret-encryption/secret-encryption.service");
const _configvariables = require("../../../../engine/core-modules/twenty-config/config-variables");
const _configvariabletypeenum = require("../../../../engine/core-modules/twenty-config/enums/config-variable-type.enum");
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
const _typedreflect = require("../../../../utils/typed-reflect");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EncryptSensitiveConfigStorageSlowInstanceCommand = class EncryptSensitiveConfigStorageSlowInstanceCommand {
    // ConfigStorage shares the `keyValuePair.value` (jsonb) column with
    // user/feature-flag entries and with non-sensitive config — so a CHECK
    // constraint cannot be added column-wide. The backfill walks only the
    // CONFIG_VARIABLE rows whose key is declared `isSensitive` + STRING in
    // the ConfigVariables metadata, decrypts the legacy CTR ciphertext, and
    // re-encrypts it into the instance-scoped versioned envelope. Idempotent:
    // already-v2 rows are left untouched.
    async runDataMigration(dataSource) {
        const sensitiveStringKeys = this.collectSensitiveStringConfigKeys();
        if (sensitiveStringKeys.length === 0) {
            return;
        }
        for (const key of sensitiveStringKeys){
            const rows = await dataSource.query(`SELECT id, value
           FROM "core"."keyValuePair"
          WHERE type = $1
            AND "userId" IS NULL
            AND "workspaceId" IS NULL
            AND key = $2`, [
                _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
                key
            ]);
            for (const row of rows){
                const rawValue = row.value;
                if (typeof rawValue !== 'string') {
                    continue;
                }
                if (rawValue === '' || rawValue.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX)) {
                    continue;
                }
                const plaintext = this.secretEncryptionService.decryptVersioned(rawValue);
                if (!(0, _utils.isDefined)(plaintext)) {
                    continue;
                }
                const encrypted = this.secretEncryptionService.encryptVersioned(plaintext);
                await dataSource.query(`UPDATE "core"."keyValuePair"
              SET value = to_jsonb($1::text)
            WHERE id = $2`, [
                    encrypted,
                    row.id
                ]);
            }
        }
    }
    // No CHECK constraint: the jsonb `value` column is heterogeneous (it
    // stores booleans, numbers, strings, JSON for both sensitive and
    // non-sensitive config plus unrelated user/feature-flag rows), so no
    // single CHECK can usefully constrain it.
    async up(_queryRunner) {
        return;
    }
    async down(_queryRunner) {
        return;
    }
    collectSensitiveStringConfigKeys() {
        const metadata = _typedreflect.TypedReflect.getMetadata('config-variables', _configvariables.ConfigVariables.prototype.constructor);
        if (!(0, _utils.isDefined)(metadata)) {
            return [];
        }
        return Object.entries(metadata).filter(([, descriptor])=>descriptor?.isSensitive === true && descriptor?.type === _configvariabletypeenum.ConfigVariableType.STRING).map(([key])=>key);
    }
    constructor(secretEncryptionService){
        this.secretEncryptionService = secretEncryptionService;
    }
};
EncryptSensitiveConfigStorageSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.5.0', 1798000008000, {
        type: 'slow'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], EncryptSensitiveConfigStorageSlowInstanceCommand);

//# sourceMappingURL=2-5-instance-command-slow-1798000008000-encrypt-sensitive-config-storage.js.map