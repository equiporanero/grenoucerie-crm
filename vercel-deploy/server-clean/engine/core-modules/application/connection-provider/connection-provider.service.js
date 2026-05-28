"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectionProviderService", {
    enumerable: true,
    get: function() {
        return ConnectionProviderService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _connectionproviderentity = require("./connection-provider.entity");
const _connectionproviderexceptioncodeenum = require("./connection-provider-exception-code.enum");
const _connectionproviderexception = require("./connection-provider.exception");
const _assertoauthproviderutil = require("./utils/assert-oauth-provider.util");
const _applicationregistrationvariableentity = require("../application-registration-variable/application-registration-variable.entity");
const _applicationentity = require("../application.entity");
const _secretencryptionservice = require("../../secret-encryption/secret-encryption.service");
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
let ConnectionProviderService = class ConnectionProviderService {
    async getClientCredentials(provider) {
        (0, _assertoauthproviderutil.assertOAuthProvider)(provider);
        const application = await this.applicationRepository.findOneBy({
            id: provider.applicationId
        });
        if (!(0, _utils.isDefined)(application?.applicationRegistrationId)) {
            throw new _connectionproviderexception.ConnectionProviderException(`Application ${provider.applicationId} has no registration; OAuth client credentials cannot be resolved`, _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.CLIENT_CREDENTIALS_NOT_CONFIGURED);
        }
        const { clientIdVariable, clientSecretVariable } = provider.oauthConfig;
        const variables = await this.registrationVariableRepository.find({
            where: {
                applicationRegistrationId: application.applicationRegistrationId,
                key: (0, _typeorm1.In)([
                    clientIdVariable,
                    clientSecretVariable
                ])
            }
        });
        const valuesByKey = new Map(variables.map((v)=>[
                v.key,
                v.encryptedValue ? this.secretEncryptionService.decryptVersioned(v.encryptedValue) : ''
            ]));
        const clientId = valuesByKey.get(clientIdVariable) ?? '';
        const clientSecret = valuesByKey.get(clientSecretVariable) ?? '';
        if (!clientId || !clientSecret) {
            throw new _connectionproviderexception.ConnectionProviderException(`OAuth client credentials are not configured for provider "${provider.name}". The server administrator needs to fill in "${clientIdVariable}" and "${clientSecretVariable}" on the application registration.`, _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.CLIENT_CREDENTIALS_NOT_CONFIGURED);
        }
        return {
            clientId,
            clientSecret
        };
    }
    async areClientCredentialsConfigured(provider) {
        const result = await this.areClientCredentialsConfiguredBatch([
            provider
        ]);
        return result.get(provider.id) ?? false;
    }
    async areClientCredentialsConfiguredBatch(providers) {
        const result = new Map();
        if (providers.length === 0) {
            return result;
        }
        const oauthProviders = providers.filter((p)=>p.type === 'oauth' && (0, _utils.isDefined)(p.oauthConfig));
        for (const provider of providers){
            result.set(provider.id, false);
        }
        if (oauthProviders.length === 0) {
            return result;
        }
        const applicationIds = [
            ...new Set(oauthProviders.map((p)=>p.applicationId))
        ];
        const applications = await this.applicationRepository.find({
            where: {
                id: (0, _typeorm1.In)(applicationIds)
            }
        });
        const registrationIdByApplicationId = new Map(applications.map((app)=>[
                app.id,
                app.applicationRegistrationId
            ]));
        const registrationIds = [
            ...new Set(applications.map((app)=>app.applicationRegistrationId).filter(_utils.isDefined))
        ];
        if (registrationIds.length === 0) {
            return result;
        }
        const allKeys = oauthProviders.flatMap((p)=>[
                p.oauthConfig.clientIdVariable,
                p.oauthConfig.clientSecretVariable
            ]);
        const variables = await this.registrationVariableRepository.find({
            where: {
                applicationRegistrationId: (0, _typeorm1.In)(registrationIds),
                key: (0, _typeorm1.In)(allKeys)
            }
        });
        const filledKeysByRegistrationId = new Map();
        for (const variable of variables){
            if (variable.encryptedValue === '') continue;
            const set = filledKeysByRegistrationId.get(variable.applicationRegistrationId) ?? new Set();
            set.add(variable.key);
            filledKeysByRegistrationId.set(variable.applicationRegistrationId, set);
        }
        for (const provider of oauthProviders){
            const registrationId = registrationIdByApplicationId.get(provider.applicationId);
            if (!(0, _utils.isDefined)(registrationId)) {
                continue;
            }
            const filled = filledKeysByRegistrationId.get(registrationId);
            const { clientIdVariable, clientSecretVariable } = provider.oauthConfig;
            result.set(provider.id, filled?.has(clientIdVariable) === true && filled?.has(clientSecretVariable) === true);
        }
        return result;
    }
    async findOneByApplicationAndName({ applicationId, name }) {
        return this.connectionProviderRepository.findOne({
            where: {
                applicationId,
                name
            }
        });
    }
    async findOneByIdOrThrow(id) {
        const provider = await this.connectionProviderRepository.findOne({
            where: {
                id
            }
        });
        if (!(0, _utils.isDefined)(provider)) {
            throw new _connectionproviderexception.ConnectionProviderException(`Connection provider with id "${id}" not found`, _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.PROVIDER_NOT_FOUND);
        }
        return provider;
    }
    async findManyByApplication({ applicationId, workspaceId }) {
        return this.connectionProviderRepository.find({
            where: {
                applicationId,
                workspaceId
            }
        });
    }
    constructor(connectionProviderRepository, applicationRepository, registrationVariableRepository, secretEncryptionService){
        this.connectionProviderRepository = connectionProviderRepository;
        this.applicationRepository = applicationRepository;
        this.registrationVariableRepository = registrationVariableRepository;
        this.secretEncryptionService = secretEncryptionService;
    }
};
ConnectionProviderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_connectionproviderentity.ConnectionProviderEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_applicationregistrationvariableentity.ApplicationRegistrationVariableEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], ConnectionProviderService);

//# sourceMappingURL=connection-provider.service.js.map