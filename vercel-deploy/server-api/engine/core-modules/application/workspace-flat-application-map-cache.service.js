"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatApplicationMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatApplicationMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("./application.entity");
const _fromapplicationentitytoflatapplicationutil = require("./utils/from-application-entity-to-flat-application.util");
const _workspacecachedecorator = require("../../workspace-cache/decorators/workspace-cache.decorator");
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
let WorkspaceFlatApplicationMapCacheService = class WorkspaceFlatApplicationMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const applicationEntities = await this.applicationRepository.find({
            where: {
                workspaceId
            },
            withDeleted: true
        });
        const flatApplicationMaps = {
            byId: {},
            idByUniversalIdentifier: {}
        };
        for (const applicationEntity of applicationEntities){
            const flatApplication = (0, _fromapplicationentitytoflatapplicationutil.fromApplicationEntityToFlatApplication)(applicationEntity);
            flatApplicationMaps.byId[flatApplication.id] = flatApplication;
            flatApplicationMaps.idByUniversalIdentifier[flatApplication.universalIdentifier] = flatApplication.id;
        }
        return flatApplicationMaps;
    }
    constructor(applicationRepository){
        super(), this.applicationRepository = applicationRepository;
    }
};
WorkspaceFlatApplicationMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatApplicationMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatApplicationMapCacheService);

//# sourceMappingURL=workspace-flat-application-map-cache.service.js.map