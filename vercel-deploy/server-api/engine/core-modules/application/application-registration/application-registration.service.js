"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationService", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _bcrypt = /*#__PURE__*/ _interop_require_wildcard(require("bcrypt"));
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _oauthscopes = require("../application-oauth/constants/oauth-scopes");
const _applicationregistrationentity = require("./application-registration.entity");
const _twentycliapplicationregistrationconstant = require("../../../workspace-manager/twenty-standard-application/constants/twenty-cli-application-registration.constant");
const _applicationregistrationexception = require("./application-registration.exception");
const _applicationregistrationsourcetypeenum = require("./enums/application-registration-source-type.enum");
const _applicationentity = require("../application.entity");
const _validateredirecturiutil = require("../../auth/utils/validate-redirect-uri.util");
const _workspaceentity = require("../../workspace/workspace.entity");
const _applicationregistrationvariableservice = require("../application-registration-variable/application-registration-variable.service");
const _marketplacecuratedapplicationsconstant = require("../application-marketplace/constants/marketplace-curated-applications.constant");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const BCRYPT_SALT_ROUNDS = 10;
let ApplicationRegistrationService = class ApplicationRegistrationService {
    async findMany(ownerWorkspaceId) {
        return this.applicationRegistrationRepository.find({
            where: {
                ownerWorkspaceId
            },
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async findAll() {
        return this.applicationRegistrationRepository.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async findOneById(id, ownerWorkspaceId) {
        const registration = await this.applicationRegistrationRepository.findOne({
            where: {
                id,
                ownerWorkspaceId
            }
        });
        if (!registration) {
            throw new _applicationregistrationexception.ApplicationRegistrationException(`Application registration with id ${id} not found`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.APPLICATION_REGISTRATION_NOT_FOUND);
        }
        return registration;
    }
    async findOneByIdGlobal(id) {
        const registration = await this.applicationRegistrationRepository.findOne({
            where: {
                id
            }
        });
        if (!registration) {
            throw new _applicationregistrationexception.ApplicationRegistrationException(`Application registration with id ${id} not found`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.APPLICATION_REGISTRATION_NOT_FOUND);
        }
        return registration;
    }
    // Global lookup — used by OAuth flow (no workspace scoping)
    async findOneByClientId(clientId) {
        return this.applicationRegistrationRepository.findOne({
            where: {
                oAuthClientId: clientId
            }
        });
    }
    // Global lookup — used by OAuth authorize page (no workspace scoping)
    async findPublicByClientId(clientId) {
        const registration = await this.applicationRegistrationRepository.findOne({
            where: {
                oAuthClientId: clientId
            },
            select: [
                'id',
                'name',
                'manifest',
                'oAuthScopes'
            ]
        });
        if (!registration) {
            return null;
        }
        return {
            id: registration.id,
            name: registration.name,
            logoUrl: registration.manifest?.application?.logoUrl ?? null,
            websiteUrl: registration.manifest?.application?.websiteUrl ?? null,
            oAuthScopes: registration.oAuthScopes
        };
    }
    async findOneByUniversalIdentifier(universalIdentifier) {
        return this.applicationRegistrationRepository.findOne({
            where: {
                universalIdentifier
            }
        });
    }
    async create(input, ownerWorkspaceId, createdByUserId) {
        const universalIdentifier = input.universalIdentifier ?? (0, _uuid.v4)();
        const existingByUid = await this.findOneByUniversalIdentifier(universalIdentifier);
        if (existingByUid) {
            throw new _applicationregistrationexception.ApplicationRegistrationException(`Universal identifier ${universalIdentifier} is already claimed`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.UNIVERSAL_IDENTIFIER_ALREADY_CLAIMED);
        }
        if ((0, _utils.isDefined)(input.oAuthRedirectUris)) {
            this.validateRedirectUris(input.oAuthRedirectUris);
        }
        if ((0, _utils.isDefined)(input.oAuthScopes)) {
            this.validateScopes(input.oAuthScopes);
        }
        const clientId = (0, _uuid.v4)();
        const { clientSecret, clientSecretHash } = await this.generateClientSecret();
        const applicationRegistration = this.applicationRegistrationRepository.create({
            universalIdentifier,
            name: input.name,
            oAuthClientId: clientId,
            oAuthClientSecretHash: clientSecretHash,
            oAuthRedirectUris: input.oAuthRedirectUris ?? [],
            oAuthScopes: input.oAuthScopes ?? [],
            createdByUserId,
            ownerWorkspaceId
        });
        const saved = await this.applicationRegistrationRepository.save(applicationRegistration);
        return {
            applicationRegistration: saved,
            clientSecret
        };
    }
    async update(input, ownerWorkspaceId) {
        const { id, update } = input;
        await this.findOneById(id, ownerWorkspaceId);
        if ((0, _utils.isDefined)(update.oAuthRedirectUris)) {
            this.validateRedirectUris(update.oAuthRedirectUris);
        }
        if ((0, _utils.isDefined)(update.oAuthScopes)) {
            this.validateScopes(update.oAuthScopes);
        }
        const updateData = {};
        if ((0, _utils.isDefined)(update.name)) updateData.name = update.name;
        if ((0, _utils.isDefined)(update.oAuthRedirectUris)) updateData.oAuthRedirectUris = update.oAuthRedirectUris;
        if ((0, _utils.isDefined)(update.oAuthScopes)) updateData.oAuthScopes = update.oAuthScopes;
        if ((0, _utils.isDefined)(update.isListed)) updateData.isListed = update.isListed;
        if (Object.keys(updateData).length > 0) {
            await this.applicationRegistrationRepository.update(id, updateData);
        }
        return this.findOneById(id, ownerWorkspaceId);
    }
    async updateFromManifest({ applicationRegistrationId, manifest, sourceType }) {
        const existing = await this.applicationRegistrationRepository.findOneOrFail({
            where: {
                id: applicationRegistrationId
            }
        });
        await this.applicationRegistrationRepository.save({
            ...existing,
            name: manifest.application.displayName,
            manifest,
            ...sourceType !== undefined && {
                sourceType
            }
        });
    }
    async delete(id, ownerWorkspaceId) {
        await this.findOneById(id, ownerWorkspaceId);
        await this.applicationRegistrationRepository.softDelete(id);
        return true;
    }
    async rotateClientSecret(id, ownerWorkspaceId) {
        await this.findOneById(id, ownerWorkspaceId);
        const { clientSecret, clientSecretHash } = await this.generateClientSecret();
        await this.applicationRegistrationRepository.update(id, {
            oAuthClientSecretHash: clientSecretHash
        });
        return clientSecret;
    }
    async verifyClientSecret(registration, clientSecret) {
        if (!registration.oAuthClientSecretHash) {
            return false;
        }
        return _bcrypt.compare(clientSecret, registration.oAuthClientSecretHash);
    }
    async upsertFromCatalog(params) {
        const existing = await this.findOneByUniversalIdentifier(params.universalIdentifier);
        const curatedIdentifiers = new Set(_marketplacecuratedapplicationsconstant.MARKETPLACE_CURATED_APPLICATIONS.map((entry)=>entry.universalIdentifier));
        const isFeatured = curatedIdentifiers.has(params.universalIdentifier);
        if ((0, _utils.isDefined)(existing)) {
            await this.applicationRegistrationRepository.save({
                ...existing,
                name: params.name,
                sourceType: params.sourceType,
                sourcePackage: params.sourcePackage,
                latestAvailableVersion: params.latestAvailableVersion,
                manifest: params.manifest,
                isFeatured
            });
        } else {
            const registration = this.applicationRegistrationRepository.create({
                universalIdentifier: params.universalIdentifier,
                name: params.name,
                sourceType: params.sourceType,
                sourcePackage: params.sourcePackage,
                latestAvailableVersion: params.latestAvailableVersion,
                isListed: true,
                isFeatured,
                manifest: params.manifest,
                oAuthClientId: (0, _uuid.v4)(),
                oAuthRedirectUris: [],
                oAuthScopes: [],
                ownerWorkspaceId: null
            });
            await this.applicationRegistrationRepository.save(registration);
        }
        if (!(0, _utils.isDefined)(params.manifest?.application?.serverVariables)) {
            return;
        }
        const registration = await this.findOneByUniversalIdentifier(params.universalIdentifier);
        if (!(0, _utils.isDefined)(registration)) {
            return;
        }
        await this.applicationRegistrationVariableService.syncVariableSchemas(registration.id, params.manifest.application.serverVariables);
    }
    async createCliRegistrationIfNotExists() {
        const existing = await this.findOneByUniversalIdentifier(_twentycliapplicationregistrationconstant.TWENTY_CLI_APPLICATION_REGISTRATION.universalIdentifier);
        if ((0, _utils.isDefined)(existing)) {
            return null;
        }
        const registration = this.applicationRegistrationRepository.create({
            universalIdentifier: _twentycliapplicationregistrationconstant.TWENTY_CLI_APPLICATION_REGISTRATION.universalIdentifier,
            name: _twentycliapplicationregistrationconstant.TWENTY_CLI_APPLICATION_REGISTRATION.name,
            oAuthClientId: (0, _uuid.v4)(),
            oAuthClientSecretHash: null,
            oAuthRedirectUris: [],
            oAuthScopes: _twentycliapplicationregistrationconstant.TWENTY_CLI_APPLICATION_REGISTRATION.oAuthScopes,
            ownerWorkspaceId: null,
            sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.OAUTH_ONLY,
            createdByUserId: null
        });
        return this.applicationRegistrationRepository.save(registration);
    }
    async findManyListed() {
        return this.applicationRegistrationRepository.find({
            where: {
                isListed: true,
                sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.NPM
            }
        });
    }
    async getStats(applicationRegistrationId, ownerWorkspaceId) {
        await this.findOneById(applicationRegistrationId, ownerWorkspaceId);
        const versionDistribution = await this.applicationRepository.createQueryBuilder('application').select("COALESCE(application.version, 'unknown')", 'version').addSelect('COUNT(*)::int', 'count').where('application."applicationRegistrationId" = :applicationRegistrationId', {
            applicationRegistrationId
        }).andWhere('application."deletedAt" IS NULL').groupBy('version').orderBy('count', 'DESC').getRawMany();
        const activeInstalls = versionDistribution.reduce((sum, entry)=>sum + entry.count, 0);
        const mostInstalledVersion = versionDistribution[0]?.version ?? null;
        return {
            activeInstalls,
            mostInstalledVersion,
            versionDistribution
        };
    }
    async transferOwnership(params) {
        const registration = await this.findOneById(params.applicationRegistrationId, params.currentOwnerWorkspaceId);
        const targetWorkspace = await this.workspaceRepository.findOne({
            where: {
                subdomain: params.targetWorkspaceSubdomain
            }
        });
        if (!(0, _utils.isDefined)(targetWorkspace)) {
            throw new _applicationregistrationexception.ApplicationRegistrationException(`No workspace found with subdomain "${params.targetWorkspaceSubdomain}"`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.APPLICATION_REGISTRATION_NOT_FOUND);
        }
        if (targetWorkspace.id === params.currentOwnerWorkspaceId) {
            throw new _applicationregistrationexception.ApplicationRegistrationException('Cannot transfer ownership to the same workspace', _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_INPUT);
        }
        await this.applicationRegistrationRepository.update(registration.id, {
            ownerWorkspaceId: targetWorkspace.id
        });
        return this.applicationRegistrationRepository.findOneOrFail({
            where: {
                id: registration.id
            }
        });
    }
    async generateClientSecret() {
        const clientSecret = _crypto.default.randomBytes(32).toString('hex');
        const clientSecretHash = await _bcrypt.hash(clientSecret, BCRYPT_SALT_ROUNDS);
        return {
            clientSecret,
            clientSecretHash
        };
    }
    validateRedirectUris(uris) {
        for (const uri of uris){
            const result = (0, _validateredirecturiutil.validateRedirectUri)(uri);
            if (!result.valid) {
                throw new _applicationregistrationexception.ApplicationRegistrationException(result.reason, _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_REDIRECT_URI);
            }
        }
    }
    validateScopes(scopes) {
        const validScopes = _oauthscopes.ALL_OAUTH_SCOPES;
        const invalidScopes = scopes.filter((scope)=>!validScopes.includes(scope));
        if (invalidScopes.length > 0) {
            throw new _applicationregistrationexception.ApplicationRegistrationException(`Invalid scopes: ${invalidScopes.join(', ')}`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_SCOPE);
        }
    }
    constructor(applicationRegistrationRepository, applicationRepository, workspaceRepository, applicationRegistrationVariableService){
        this.applicationRegistrationRepository = applicationRegistrationRepository;
        this.applicationRepository = applicationRepository;
        this.workspaceRepository = workspaceRepository;
        this.applicationRegistrationVariableService = applicationRegistrationVariableService;
    }
};
ApplicationRegistrationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_applicationregistrationentity.ApplicationRegistrationEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof _applicationregistrationvariableservice.ApplicationRegistrationVariableService === "undefined" ? Object : _applicationregistrationvariableservice.ApplicationRegistrationVariableService
    ])
], ApplicationRegistrationService);

//# sourceMappingURL=application-registration.service.js.map