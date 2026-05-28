/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnterprisePlanService", {
    enumerable: true,
    get: function() {
        return EnterprisePlanService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _crypto = /*#__PURE__*/ _interop_require_wildcard(require("crypto"));
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../app-token/app-token.entity");
const _enterprisepublickeyconstant = require("../constants/enterprise-public-key.constant");
const _nodeenvironmentinterface = require("../../twenty-config/interfaces/node-environment.interface");
const _twentyconfigexception = require("../../twenty-config/twenty-config.exception");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let EnterprisePlanService = class EnterprisePlanService {
    async onModuleInit() {
        this.refreshKeyPayload();
        await this.loadValidityToken();
    }
    refreshKeyPayload() {
        const enterpriseKey = this.twentyConfigService.get('ENTERPRISE_KEY');
        if (!enterpriseKey) {
            this.cachedKeyPayload = null;
            return;
        }
        const payload = this.verifyJwt(enterpriseKey);
        this.cachedKeyPayload = payload;
    }
    async loadValidityToken() {
        try {
            const dbToken = await this.appTokenRepository.findOne({
                where: {
                    type: _apptokenentity.AppTokenType.EnterpriseValidityToken,
                    userId: (0, _typeorm1.IsNull)(),
                    workspaceId: (0, _typeorm1.IsNull)(),
                    revokedAt: (0, _typeorm1.IsNull)()
                },
                order: {
                    createdAt: 'DESC'
                }
            });
            const tokenValue = dbToken?.value ?? this.twentyConfigService.get('ENTERPRISE_VALIDITY_TOKEN');
            if (!tokenValue) {
                this.cachedValidityPayload = null;
                return;
            }
            const payload = this.verifyJwt(tokenValue);
            if (payload && payload.status === 'valid') {
                this.cachedValidityPayload = payload;
            } else {
                this.cachedValidityPayload = null;
            }
        } catch (error) {
            this.logger.warn(`Failed to load validity token: ${error instanceof Error ? error.message : 'Unknown error'}`);
            this.cachedValidityPayload = null;
        }
    }
    async saveNewValidityTokenToDb(token) {
        const payload = this.verifyJwt(token);
        if (!(0, _utils.isDefined)(payload)) {
            return;
        }
        await this.appTokenRepository.manager.transaction(async (transactionalEntityManager)=>{
            await transactionalEntityManager.update(this.appTokenRepository.target, {
                type: _apptokenentity.AppTokenType.EnterpriseValidityToken,
                userId: (0, _typeorm1.IsNull)(),
                workspaceId: (0, _typeorm1.IsNull)(),
                revokedAt: (0, _typeorm1.IsNull)()
            }, {
                revokedAt: new Date()
            });
            await transactionalEntityManager.save(this.appTokenRepository.target, {
                type: _apptokenentity.AppTokenType.EnterpriseValidityToken,
                value: token,
                userId: null,
                workspaceId: null,
                expiresAt: new Date(payload.exp * 1000)
            });
        });
    }
    hasValidSignedEnterpriseKey() {
        this.refreshKeyPayload();
        return (0, _utils.isDefined)(this.cachedKeyPayload);
    }
    hasValidEnterpriseValidityToken() {
        if ((0, _utils.isDefined)(this.cachedValidityPayload)) {
            const now = Math.floor(Date.now() / 1000);
            return this.cachedValidityPayload.exp > now;
        }
        return false;
    }
    isValid() {
        return this.hasValidEnterpriseValidityToken();
    }
    isValidEnterpriseKeyFormat(key) {
        return this.verifyJwt(key) !== null;
    }
    async getLicenseInfo() {
        this.refreshKeyPayload();
        await this.loadValidityToken();
        if ((0, _utils.isDefined)(this.cachedValidityPayload)) {
            const now = Math.floor(Date.now() / 1000);
            return {
                isValid: this.cachedValidityPayload.exp > now,
                licensee: this.cachedKeyPayload?.licensee ?? null,
                expiresAt: new Date(this.cachedValidityPayload.exp * 1000),
                subscriptionId: this.cachedValidityPayload.sub
            };
        }
        return {
            isValid: false,
            licensee: null,
            expiresAt: null,
            subscriptionId: null
        };
    }
    async setEnterpriseKey(enterpriseKey) {
        try {
            await this.twentyConfigService.set('ENTERPRISE_KEY', enterpriseKey);
        } catch (error) {
            if (error instanceof _twentyconfigexception.ConfigVariableException && error.code === _twentyconfigexception.ConfigVariableExceptionCode.DATABASE_CONFIG_DISABLED) {
                throw new _twentyconfigexception.ConfigVariableException('IS_CONFIG_VARIABLES_IN_DB_ENABLED is false on your server. ' + 'Please add ENTERPRISE_KEY to your .env file manually.', _twentyconfigexception.ConfigVariableExceptionCode.DATABASE_CONFIG_DISABLED);
            }
            throw error;
        }
    }
    async refreshValidityToken() {
        const enterpriseKey = this.twentyConfigService.get('ENTERPRISE_KEY');
        if (!enterpriseKey) {
            this.logger.warn('No ENTERPRISE_KEY configured, skipping refresh');
            return false;
        }
        this.refreshKeyPayload();
        if (!(0, _utils.isDefined)(this.cachedKeyPayload)) {
            this.logger.warn('ENTERPRISE_KEY is not a valid signed JWT, skipping refresh');
            return false;
        }
        const apiUrl = this.twentyConfigService.get('ENTERPRISE_API_URL');
        const validateUrl = `${apiUrl}/validate`;
        try {
            const response = await fetch(validateUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    enterpriseKey
                })
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                this.logger.warn(`Enterprise refresh failed with status ${response.status}: ${errorData.error ?? 'Unknown error'}`);
                return false;
            }
            const data = await response.json();
            if (!data.validityToken) {
                this.logger.warn('Enterprise refresh response missing validityToken');
                return false;
            }
            await this.saveNewValidityTokenToDb(data.validityToken);
            await this.loadValidityToken();
            this.logger.log('Enterprise validity token refreshed successfully');
            return true;
        } catch (error) {
            this.logger.warn(`Enterprise refresh failed: ${error instanceof Error ? error.message : 'Network error'}. Current validity token will continue to work until expiration.`);
            return false;
        }
    }
    async reportSeats(seatCount) {
        const enterpriseKey = this.twentyConfigService.get('ENTERPRISE_KEY');
        if (!enterpriseKey) {
            return false;
        }
        if (!(0, _utils.isDefined)(this.cachedKeyPayload)) {
            return false;
        }
        const apiUrl = this.twentyConfigService.get('ENTERPRISE_API_URL');
        const seatsUrl = `${apiUrl}/seats`;
        try {
            const response = await fetch(seatsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    enterpriseKey,
                    seatCount
                })
            });
            if (!response.ok) {
                this.logger.warn(`Seat reporting failed with status ${response.status}`);
                return false;
            }
            this.logger.log(`Reported ${seatCount} seats to enterprise API`);
            return true;
        } catch (error) {
            this.logger.warn(`Seat reporting failed: ${error instanceof Error ? error.message : 'Network error'}`);
            return false;
        }
    }
    async getSubscriptionStatus() {
        this.refreshKeyPayload();
        const enterpriseKey = this.twentyConfigService.get('ENTERPRISE_KEY');
        if (!enterpriseKey || !(0, _utils.isDefined)(this.cachedKeyPayload)) {
            return null;
        }
        const licenseInfo = await this.getLicenseInfo();
        const apiUrl = this.twentyConfigService.get('ENTERPRISE_API_URL');
        const statusUrl = `${apiUrl}/status`;
        try {
            const response = await fetch(statusUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    enterpriseKey
                })
            });
            if (!response.ok) {
                this.logger.warn(`Enterprise status request failed with status ${response.status}`);
                return null;
            }
            const data = await response.json();
            return {
                status: data.status,
                licensee: licenseInfo.licensee,
                expiresAt: licenseInfo.expiresAt,
                cancelAt: data.cancelAt ? new Date(data.cancelAt * 1000) : null,
                currentPeriodEnd: data.currentPeriodEnd ? new Date(data.currentPeriodEnd * 1000) : null,
                isCancellationScheduled: data.isCancellationScheduled ?? false
            };
        } catch (error) {
            this.logger.warn(`Enterprise status request failed: ${error instanceof Error ? error.message : 'Network error'}`);
            return null;
        }
    }
    async getPortalUrl(returnUrl) {
        const apiUrl = this.twentyConfigService.get('ENTERPRISE_API_URL');
        if (!apiUrl) {
            return null;
        }
        this.refreshKeyPayload();
        const enterpriseKey = this.twentyConfigService.get('ENTERPRISE_KEY');
        if (enterpriseKey && (0, _utils.isDefined)(this.cachedKeyPayload)) {
            return this.requestPortalUrlWithKey(apiUrl, enterpriseKey, returnUrl);
        }
        return null;
    }
    async requestPortalUrlWithKey(apiUrl, enterpriseKey, returnUrl) {
        const portalUrl = `${apiUrl}/portal`;
        try {
            const response = await fetch(portalUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    enterpriseKey,
                    returnUrl
                })
            });
            if (!response.ok) {
                this.logger.warn(`Enterprise portal request failed with status ${response.status}`);
                return null;
            }
            const data = await response.json();
            return data.url ?? null;
        } catch (error) {
            this.logger.warn(`Enterprise portal request failed: ${error instanceof Error ? error.message : 'Network error'}`);
            return null;
        }
    }
    async getCheckoutUrl(billingInterval = 'monthly', seatCount) {
        const apiUrl = this.twentyConfigService.get('ENTERPRISE_API_URL');
        if (!apiUrl) {
            return null;
        }
        const checkoutUrl = `${apiUrl}/checkout`;
        try {
            const response = await fetch(checkoutUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    billingInterval,
                    seatCount
                })
            });
            if (!response.ok) {
                this.logger.warn(`Enterprise checkout request failed with status ${response.status}`);
                return null;
            }
            const data = await response.json();
            return data.url ?? null;
        } catch (error) {
            this.logger.warn(`Enterprise checkout request failed: ${error instanceof Error ? error.message : 'Network error'}`);
            return null;
        }
    }
    // In development and Jest integration tests, try both keys so production keys
    // work locally
    getPublicKeysToTry() {
        const nodeEnv = this.twentyConfigService.get('NODE_ENV');
        if (nodeEnv === _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT || nodeEnv === _nodeenvironmentinterface.NodeEnvironment.TEST) {
            return [
                _enterprisepublickeyconstant.ENTERPRISE_JWT_PUBLIC_KEY,
                _enterprisepublickeyconstant.ENTERPRISE_JWT_DEV_PUBLIC_KEY
            ];
        }
        return [
            _enterprisepublickeyconstant.ENTERPRISE_JWT_PUBLIC_KEY
        ];
    }
    verifyJwt(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                return null;
            }
            const [encodedHeader, encodedPayload, signature] = parts;
            const signingInput = `${encodedHeader}.${encodedPayload}`;
            const signatureBuffer = Buffer.from(signature.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - signature.length % 4) % 4), 'base64');
            const publicKeys = this.getPublicKeysToTry();
            for (const publicKey of publicKeys){
                const isValid = _crypto.verify('sha256', Buffer.from(signingInput), {
                    key: publicKey,
                    padding: _crypto.constants.RSA_PKCS1_PADDING
                }, signatureBuffer);
                if (isValid) {
                    const payloadStr = Buffer.from(encodedPayload.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - encodedPayload.length % 4) % 4), 'base64').toString('utf-8');
                    return JSON.parse(payloadStr);
                }
            }
            return null;
        } catch  {
            return null;
        }
    }
    constructor(twentyConfigService, appTokenRepository){
        this.twentyConfigService = twentyConfigService;
        this.appTokenRepository = appTokenRepository;
        this.logger = new _common.Logger(EnterprisePlanService.name);
        this.cachedValidityPayload = null;
        this.cachedKeyPayload = null;
    }
};
EnterprisePlanService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_apptokenentity.AppTokenEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], EnterprisePlanService);

//# sourceMappingURL=enterprise-plan.service.js.map