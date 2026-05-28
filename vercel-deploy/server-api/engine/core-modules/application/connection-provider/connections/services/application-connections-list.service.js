"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationConnectionsListService", {
    enumerable: true,
    get: function() {
        return ApplicationConnectionsListService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _connectionproviderentity = require("../../connection-provider.entity");
const _connectedaccountentity = require("../../../../../metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionservice = require("../../../../../metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _connectedaccountrefreshtokensservice = require("../../../../../../modules/connected-account/refresh-tokens-manager/services/connected-account-refresh-tokens.service");
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
let ApplicationConnectionsListService = class ApplicationConnectionsListService {
    async list({ applicationId, workspaceId, requestUserWorkspaceId, filter }) {
        const providers = await this.oauthProviderRepository.find({
            where: {
                applicationId,
                workspaceId
            }
        });
        const providerById = new Map(providers.map((p)=>[
                p.id,
                p
            ]));
        let providerIds;
        if ((0, _utils.isDefined)(filter.providerName)) {
            const matching = providers.find((p)=>p.name === filter.providerName);
            if (!matching) {
                return [];
            }
            providerIds = [
                matching.id
            ];
        }
        const baseWhere = {
            applicationId,
            workspaceId,
            provider: _types.ConnectedAccountProvider.APP,
            ...(0, _utils.isDefined)(providerIds) ? {
                connectionProviderId: (0, _typeorm1.In)(providerIds)
            } : {},
            ...(0, _utils.isDefined)(filter.userWorkspaceId) ? {
                userWorkspaceId: filter.userWorkspaceId
            } : {}
        };
        const accounts = await this.connectedAccountRepository.find({
            where: this.buildPrivacyWhere(baseWhere, requestUserWorkspaceId, filter.visibility)
        });
        const refreshed = await Promise.all(accounts.map((account)=>this.refreshAndMap(account, workspaceId, providerById)));
        return refreshed.filter(_utils.isDefined);
    }
    async getOne({ applicationId, workspaceId, requestUserWorkspaceId, id }) {
        const account = await this.connectedAccountRepository.findOne({
            where: {
                id,
                applicationId,
                workspaceId,
                provider: _types.ConnectedAccountProvider.APP
            }
        });
        if (!(0, _utils.isDefined)(account)) {
            throw new _common.NotFoundException(`Connection ${id} not found`);
        }
        // Same privacy rule as list(): a request-user can only see their own
        // user-visibility credentials. Workspace-shared ones are visible to
        // anyone in the workspace. Cron has no request user — sees all.
        if ((0, _utils.isDefined)(requestUserWorkspaceId) && account.visibility === 'user' && account.userWorkspaceId !== requestUserWorkspaceId) {
            throw new _common.NotFoundException(`Connection ${id} not found`);
        }
        if (!(0, _utils.isDefined)(account.connectionProviderId)) {
            throw new _common.NotFoundException(`Connection ${id} has no provider`);
        }
        const provider = await this.oauthProviderRepository.findOneByOrFail({
            id: account.connectionProviderId,
            workspaceId
        });
        const dto = await this.refreshAndMap(account, workspaceId, new Map([
            [
                provider.id,
                provider
            ]
        ]));
        if (!(0, _utils.isDefined)(dto)) {
            throw new _common.NotFoundException(`Connection ${id} could not be refreshed; ask the user to reconnect`);
        }
        return dto;
    }
    buildPrivacyWhere(baseWhere, requestUserWorkspaceId, visibilityFilter) {
        if (!(0, _utils.isDefined)(requestUserWorkspaceId)) {
            return (0, _utils.isDefined)(visibilityFilter) ? {
                ...baseWhere,
                visibility: visibilityFilter
            } : baseWhere;
        }
        if (visibilityFilter === 'user') {
            return {
                ...baseWhere,
                visibility: 'user',
                userWorkspaceId: requestUserWorkspaceId
            };
        }
        if (visibilityFilter === 'workspace') {
            return {
                ...baseWhere,
                visibility: 'workspace'
            };
        }
        return [
            {
                ...baseWhere,
                visibility: 'workspace'
            },
            {
                ...baseWhere,
                visibility: 'user',
                userWorkspaceId: requestUserWorkspaceId
            }
        ];
    }
    async refreshAndMap(account, workspaceId, providerById) {
        const provider = (0, _utils.isDefined)(account.connectionProviderId) ? providerById.get(account.connectionProviderId) : undefined;
        // Connections without a resolvable provider can't be refreshed and the
        // app has no way to use them — drop them from the response so the dev
        // doesn't see ghost rows. The upstream cleanup happens via the FK
        // ON DELETE CASCADE when the provider is removed.
        if (!(0, _utils.isDefined)(provider)) {
            this.logger.warn(`Connection ${account.id} references missing provider ${account.connectionProviderId}`);
            return null;
        }
        try {
            const encryptedTokens = await this.refreshTokensService.resolveTokens(account, workspaceId);
            return {
                id: account.id,
                providerName: provider.name,
                name: account.name ?? account.handle,
                handle: account.handle,
                visibility: account.visibility,
                userWorkspaceId: account.userWorkspaceId,
                accessToken: this.connectedAccountTokenEncryptionService.decrypt({
                    ciphertext: encryptedTokens.accessToken,
                    workspaceId
                }),
                scopes: account.scopes ?? provider.oauthConfig?.scopes ?? [],
                authFailedAt: account.authFailedAt?.toISOString() ?? null
            };
        } catch (error) {
            this.logger.warn(`Failed to refresh tokens for connection ${account.id}: ${error.message}`);
            return null;
        }
    }
    constructor(refreshTokensService, connectedAccountTokenEncryptionService, connectedAccountRepository, oauthProviderRepository){
        this.refreshTokensService = refreshTokensService;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
        this.connectedAccountRepository = connectedAccountRepository;
        this.oauthProviderRepository = oauthProviderRepository;
        this.logger = new _common.Logger(ApplicationConnectionsListService.name);
    }
};
ApplicationConnectionsListService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_connectionproviderentity.ConnectionProviderEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _connectedaccountrefreshtokensservice.ConnectedAccountRefreshTokensService === "undefined" ? Object : _connectedaccountrefreshtokensservice.ConnectedAccountRefreshTokensService,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ApplicationConnectionsListService);

//# sourceMappingURL=application-connections-list.service.js.map