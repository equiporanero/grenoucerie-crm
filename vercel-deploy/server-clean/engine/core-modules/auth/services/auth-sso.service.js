"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthSsoService", {
    enumerable: true,
    get: function() {
        return AuthSsoService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _workspacetype = require("../../workspace/types/workspace.type");
const _workspaceentity = require("../../workspace/workspace.entity");
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
let AuthSsoService = class AuthSsoService {
    getAuthProviderColumnNameByProvider(authProvider) {
        if (authProvider === _workspacetype.AuthProviderEnum.Google) {
            return 'isGoogleAuthEnabled';
        }
        if (authProvider === _workspacetype.AuthProviderEnum.Microsoft) {
            return 'isMicrosoftAuthEnabled';
        }
        if (authProvider === _workspacetype.AuthProviderEnum.Password) {
            return 'isPasswordAuthEnabled';
        }
        throw new Error(`${authProvider} is not a valid auth provider.`);
    }
    async findWorkspaceFromWorkspaceIdOrAuthProvider({ authProvider, email }, workspaceId) {
        if (this.twentyConfigService.get('IS_MULTIWORKSPACE_ENABLED') && !workspaceId) {
            // Multi-workspace enable mode but on non workspace url.
            // so get the first workspace with the current auth method enable
            const workspace = await this.workspaceRepository.findOne({
                where: {
                    [this.getAuthProviderColumnNameByProvider(authProvider)]: true,
                    workspaceUsers: {
                        user: {
                            email
                        }
                    }
                },
                relations: [
                    'workspaceUsers',
                    'workspaceUsers.user',
                    'approvedAccessDomains'
                ]
            });
            return workspace ?? undefined;
        }
        return await this.workspaceRepository.findOne({
            where: {
                id: workspaceId
            },
            relations: [
                'approvedAccessDomains'
            ]
        });
    }
    constructor(workspaceRepository, twentyConfigService){
        this.workspaceRepository = workspaceRepository;
        this.twentyConfigService = twentyConfigService;
    }
};
AuthSsoService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], AuthSsoService);

//# sourceMappingURL=auth-sso.service.js.map