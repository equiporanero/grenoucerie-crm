"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateCompanyService", {
    enumerable: true,
    get: function() {
        return CreateCompanyService;
    }
});
const _common = require("@nestjs/common");
const _lodashuniqby = /*#__PURE__*/ _interop_require_default(require("lodash.uniqby"));
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _securehttpclientservice = require("../../../engine/core-modules/secure-http-client/secure-http-client.service");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _companyworkspaceentity = require("../../company/standard-objects/company.workspace-entity");
const _extractdomainfromlinkutil = require("../utils/extract-domain-from-link.util");
const _getcompanynamefromdomainnameutil = require("../utils/get-company-name-from-domain-name.util");
const _computedisplayname = require("../../../utils/compute-display-name");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
let CreateCompanyService = class CreateCompanyService {
    async createOrRestoreCompanies(companies, workspaceId) {
        if (companies.length === 0) {
            return {};
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const companyRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _companyworkspaceentity.CompanyWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            const companiesWithoutTrailingSlash = companies.map((company)=>({
                    ...company,
                    domainName: company.domainName ? (0, _utils.normalizeUrlOrigin)(company.domainName) : undefined
                }));
            const uniqueCompanies = (0, _lodashuniqby.default)(companiesWithoutTrailingSlash, 'domainName');
            const conditions = uniqueCompanies.map((companyToCreate)=>({
                    domainName: {
                        primaryLinkUrl: (0, _typeorm.ILike)(`%${companyToCreate.domainName}%`)
                    }
                }));
            const existingCompanies = await companyRepository.find({
                where: conditions,
                withDeleted: true
            });
            const existingCompanyIdsMap = this.createCompanyMap(existingCompanies);
            const newCompaniesToCreate = uniqueCompanies.filter((company)=>!existingCompanies.some((existingCompany)=>existingCompany.domainName && (0, _extractdomainfromlinkutil.extractDomainFromLink)(existingCompany.domainName.primaryLinkUrl) === company.domainName));
            const companiesToRestore = this.filterCompaniesToRestore(uniqueCompanies, existingCompanies);
            if (newCompaniesToCreate.length === 0 && companiesToRestore.length === 0) {
                return existingCompanyIdsMap;
            }
            let lastCompanyPosition = await this.getLastCompanyPosition(companyRepository);
            const newCompaniesData = await Promise.all(newCompaniesToCreate.map((company)=>this.prepareCompanyData(company, ++lastCompanyPosition)));
            const createdCompanies = await companyRepository.save(newCompaniesData);
            const restoredCompanies = await companyRepository.updateMany(companiesToRestore.map((company)=>{
                return {
                    criteria: company.id,
                    partialEntity: {
                        deletedAt: null
                    }
                };
            }), undefined, [
                'domainNamePrimaryLinkUrl',
                'id'
            ]);
            const formattedRestoredCompanies = restoredCompanies.raw.map((row)=>{
                return {
                    id: row.id,
                    domainName: {
                        primaryLinkUrl: row.domainNamePrimaryLinkUrl
                    }
                };
            });
            return {
                ...existingCompanyIdsMap,
                ...createdCompanies.length > 0 ? this.createCompanyMap(createdCompanies) : {},
                ...formattedRestoredCompanies.length > 0 ? this.createCompanyMap(formattedRestoredCompanies) : {}
            };
        }, authContext);
    }
    filterCompaniesToRestore(uniqueCompanies, existingCompanies) {
        return uniqueCompanies.map((company)=>{
            const existingCompany = existingCompanies.find((existingCompany)=>existingCompany.domainName && (0, _extractdomainfromlinkutil.extractDomainFromLink)(existingCompany.domainName.primaryLinkUrl) === company.domainName);
            return (0, _utils.isDefined)(existingCompany) ? {
                domainName: company.domainName,
                id: existingCompany.id,
                deletedAt: null
            } : undefined;
        }).filter(_utils.isDefined);
    }
    async prepareCompanyData(company, position) {
        const { name, city } = await this.getCompanyInfoFromDomainName(company.domainName);
        const createdByName = (0, _computedisplayname.computeDisplayName)(company.createdByWorkspaceMember?.name);
        return {
            domainName: {
                primaryLinkUrl: 'https://' + company.domainName
            },
            name,
            createdBy: {
                source: company.createdBySource,
                workspaceMemberId: company.createdByWorkspaceMember?.id,
                name: createdByName,
                context: {
                    provider: company.createdByContext.provider
                }
            },
            address: {
                addressCity: city
            },
            position
        };
    }
    createCompanyMap(companies) {
        return companies.reduce((acc, company)=>{
            if (!company.domainName?.primaryLinkUrl || !company.id) {
                return acc;
            }
            const key = (0, _extractdomainfromlinkutil.extractDomainFromLink)(company.domainName.primaryLinkUrl);
            acc[key] = company.id;
            return acc;
        }, {});
    }
    async getLastCompanyPosition(companyRepository) {
        const lastCompanyPosition = await companyRepository.maximum('position', undefined);
        return lastCompanyPosition ?? 0;
    }
    async getCompanyInfoFromDomainName(domainName) {
        try {
            const response = await this.httpService.get(`/${domainName}`);
            const data = response.data;
            return {
                name: data.name ?? (0, _getcompanynamefromdomainnameutil.getCompanyNameFromDomainName)(domainName ?? ''),
                city: data.city
            };
        } catch  {
            return {
                name: (0, _getcompanynamefromdomainnameutil.getCompanyNameFromDomainName)(domainName ?? ''),
                city: ''
            };
        }
    }
    constructor(globalWorkspaceOrmManager, secureHttpClientService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.secureHttpClientService = secureHttpClientService;
        this.httpService = this.secureHttpClientService.getHttpClient({
            baseURL: _constants.TWENTY_COMPANIES_BASE_URL
        });
    }
};
CreateCompanyService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], CreateCompanyService);

//# sourceMappingURL=create-company.service.js.map