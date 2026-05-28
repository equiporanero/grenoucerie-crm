"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveSessionCookieSecretsOrThrow", {
    enumerable: true,
    get: function() {
        return resolveSessionCookieSecretsOrThrow;
    }
});
const _crypto = require("crypto");
const _guards = require("@sniptt/guards");
const _deriveinstancehmackeyutil = require("./derive-instance-hmac-key.util");
const SESSION_COOKIE_HMAC_PURPOSE = 'session-cookie';
const buildLegacySessionSecret = (appSecret)=>(0, _crypto.createHash)('sha256').update(`${appSecret}SESSION_STORE_SECRET`).digest('hex');
const resolveSessionCookieSecretsOrThrow = ({ twentyConfigService })=>{
    const encryptionKey = twentyConfigService.get('ENCRYPTION_KEY');
    const fallbackEncryptionKey = twentyConfigService.get('FALLBACK_ENCRYPTION_KEY');
    const appSecret = twentyConfigService.get('APP_SECRET');
    const rawPrimary = (0, _guards.isNonEmptyString)(encryptionKey) ? encryptionKey : appSecret;
    if (!(0, _guards.isNonEmptyString)(rawPrimary)) {
        throw new Error('Cannot derive session cookie secret: set ENCRYPTION_KEY (or APP_SECRET for legacy deployments).');
    }
    const secrets = [
        (0, _deriveinstancehmackeyutil.deriveInstanceHmacKey)({
            rawKey: rawPrimary,
            purpose: SESSION_COOKIE_HMAC_PURPOSE
        }).toString('hex')
    ];
    if ((0, _guards.isNonEmptyString)(fallbackEncryptionKey)) {
        secrets.push((0, _deriveinstancehmackeyutil.deriveInstanceHmacKey)({
            rawKey: fallbackEncryptionKey,
            purpose: SESSION_COOKIE_HMAC_PURPOSE
        }).toString('hex'));
    }
    if ((0, _guards.isNonEmptyString)(appSecret)) {
        secrets.push(buildLegacySessionSecret(appSecret));
    }
    return secrets;
};

//# sourceMappingURL=resolve-session-cookie-secrets.util.js.map