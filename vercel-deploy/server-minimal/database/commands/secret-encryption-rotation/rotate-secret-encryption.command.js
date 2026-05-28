"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RotateSecretEncryptionCommand", {
    enumerable: true,
    get: function() {
        return RotateSecretEncryptionCommand;
    }
});
const _nestcommander = require("nest-commander");
const _logger = require("../logger");
const _secretencryptionrotationsitenameconstant = require("./constants/secret-encryption-rotation-site-name.constant");
const _secretencryptionrotationrunnerservice = require("./services/secret-encryption-rotation-runner.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const DEFAULT_BATCH_SIZE = 200;
const MAX_BATCH_SIZE = 5000;
const KNOWN_SITE_NAMES = Object.values(_secretencryptionrotationsitenameconstant.SECRET_ENCRYPTION_ROTATION_SITE_NAME).join(', ');
let RotateSecretEncryptionCommand = class RotateSecretEncryptionCommand extends _nestcommander.CommandRunner {
    parseSite(value) {
        return value;
    }
    parseBatchSize(value) {
        const parsed = Number(value);
        if (!Number.isInteger(parsed) || parsed <= 0) {
            throw new Error(`Invalid --batch-size value: ${value}`);
        }
        return Math.min(parsed, MAX_BATCH_SIZE);
    }
    parseDryRun() {
        return true;
    }
    async run(_passedParams, options) {
        const summary = await this.secretEncryptionRotationRunnerService.run({
            site: options.site,
            batchSize: options.batchSize ?? DEFAULT_BATCH_SIZE,
            dryRun: options.dryRun ?? false
        });
        const totalErrors = summary.results.reduce((sum, result)=>sum + result.errors, 0);
        if (totalErrors > 0) {
            throw new Error(`secret-encryption:rotate completed with ${totalErrors} error(s) — see logs above.`);
        }
    }
    constructor(secretEncryptionRotationRunnerService){
        super(), this.secretEncryptionRotationRunnerService = secretEncryptionRotationRunnerService;
        this.logger = new _logger.CommandLogger({
            verbose: false,
            constructorName: this.constructor.name
        });
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-s, --site <site>',
        description: `Limit rotation to a single site. Omit to run all sites. Known sites: ${KNOWN_SITE_NAMES}.`,
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], RotateSecretEncryptionCommand.prototype, "parseSite", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-b, --batch-size <batchSize>',
        description: `Number of rows fetched per batch (default ${DEFAULT_BATCH_SIZE}, capped at ${MAX_BATCH_SIZE}).`,
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Number)
], RotateSecretEncryptionCommand.prototype, "parseBatchSize", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-d, --dry-run',
        description: 'Decrypt + re-encrypt rows in memory but skip the UPDATE. Useful for sizing a rotation before pulling the trigger.',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], RotateSecretEncryptionCommand.prototype, "parseDryRun", null);
RotateSecretEncryptionCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'secret-encryption:rotate',
        description: 'Re-encrypts every at-rest secret stored in an enc:v2 envelope using the current ENCRYPTION_KEY. Idempotent: rows already on the current key are skipped via a SQL filter, so the command is safe to interrupt and re-run. Requires FALLBACK_ENCRYPTION_KEY to be set to the previous key when rotating to a fresh ENCRYPTION_KEY.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _secretencryptionrotationrunnerservice.SecretEncryptionRotationRunnerService === "undefined" ? Object : _secretencryptionrotationrunnerservice.SecretEncryptionRotationRunnerService
    ])
], RotateSecretEncryptionCommand);

//# sourceMappingURL=rotate-secret-encryption.command.js.map