"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubdomainManagerService", {
    enumerable: true,
    get: function() {
        return SubdomainManagerService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _generaterandomsubdomainutil = require("../utils/generate-random-subdomain.util");
const _getsubdomainfromemailutil = require("../utils/get-subdomain-from-email.util");
const _getsubdomainnamefromdisplaynameutil = require("../utils/get-subdomain-name-from-display-name.util");
const _issubdomainvalidutil = require("../utils/is-subdomain-valid.util");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _workspaceentity = require("../../../workspace/workspace.entity");
const _workspaceexception = require("../../../workspace/workspace.exception");
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
let SubdomainManagerService = class SubdomainManagerService {
    async generateSubdomain({ userEmail, workspaceDisplayName }) {
        const subdomainFromUserEmail = (0, _getsubdomainfromemailutil.getSubdomainFromEmail)(userEmail);
        const subdomainFromWorkspaceDisplayName = (0, _getsubdomainnamefromdisplaynameutil.getSubdomainNameFromDisplayName)(workspaceDisplayName);
        const extractedSubdomain = subdomainFromUserEmail || subdomainFromWorkspaceDisplayName;
        const isExtractedSubdomainValid = (0, _utils.isDefined)(extractedSubdomain) ? (0, _issubdomainvalidutil.isSubdomainValid)(extractedSubdomain) : false;
        const subdomain = isExtractedSubdomainValid ? extractedSubdomain : (0, _generaterandomsubdomainutil.generateRandomSubdomain)();
        const existingWorkspaceCount = await this.workspaceRepository.count({
            where: {
                subdomain
            },
            withDeleted: true
        });
        return `${subdomain}${existingWorkspaceCount > 0 ? `-${Math.random().toString(36).substring(2, 10)}` : ''}`;
    }
    async isSubdomainAvailable(subdomain) {
        const existingWorkspace = await this.workspaceRepository.findOne({
            where: {
                subdomain: subdomain
            },
            withDeleted: true
        });
        return !existingWorkspace;
    }
    async validateSubdomainOrThrow(subdomain) {
        const isValid = (0, _issubdomainvalidutil.isSubdomainValid)(subdomain);
        if (!isValid) {
            throw new _workspaceexception.WorkspaceException('Subdomain is not valid', _workspaceexception.WorkspaceExceptionCode.SUBDOMAIN_NOT_VALID);
        }
        const isAvailable = await this.isSubdomainAvailable(subdomain);
        if (!isAvailable || this.twentyConfigService.get('DEFAULT_SUBDOMAIN') === subdomain) {
            throw new _workspaceexception.WorkspaceException('Subdomain already taken', _workspaceexception.WorkspaceExceptionCode.SUBDOMAIN_ALREADY_TAKEN);
        }
    }
    constructor(workspaceRepository, twentyConfigService){
        this.workspaceRepository = workspaceRepository;
        this.twentyConfigService = twentyConfigService;
    }
};
SubdomainManagerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], SubdomainManagerService);

//# sourceMappingURL=subdomain-manager.service.js.map