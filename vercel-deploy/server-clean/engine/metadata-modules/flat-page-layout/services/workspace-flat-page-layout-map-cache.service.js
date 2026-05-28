"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatPageLayoutMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatPageLayoutMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _transformpagelayoutentitytoflatpagelayoututil = require("../utils/transform-page-layout-entity-to-flat-page-layout.util");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _pagelayouttabentity = require("../../page-layout-tab/entities/page-layout-tab.entity");
const _pagelayoutentity = require("../../page-layout/entities/page-layout.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _createidtouniversalidentifiermaputil = require("../../../workspace-cache/utils/create-id-to-universal-identifier-map.util");
const _regroupentitiesbyrelatedentityid = require("../../../workspace-cache/utils/regroup-entities-by-related-entity-id");
const _addflatentitytoflatentitymapsthroughmutationorthrowutil = require("../../../workspace-manager/workspace-migration/utils/add-flat-entity-to-flat-entity-maps-through-mutation-or-throw.util");
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
let WorkspaceFlatPageLayoutMapCacheService = class WorkspaceFlatPageLayoutMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [pageLayouts, pageLayoutTabs, applications, objectMetadatas] = await Promise.all([
            this.pageLayoutRepository.find({
                where: {
                    workspaceId
                },
                withDeleted: true
            }),
            this.pageLayoutTabRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'pageLayoutId'
                ],
                withDeleted: true
            }),
            this.applicationRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            }),
            this.objectMetadataRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            })
        ]);
        const [pageLayoutTabsByPageLayoutId] = [
            {
                entities: pageLayoutTabs,
                foreignKey: 'pageLayoutId'
            }
        ].map(_regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const objectMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(objectMetadatas);
        const pageLayoutTabIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(pageLayoutTabs);
        const flatPageLayoutMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const pageLayoutEntity of pageLayouts){
            const flatPageLayout = (0, _transformpagelayoutentitytoflatpagelayoututil.transformPageLayoutEntityToFlatPageLayout)({
                entity: {
                    ...pageLayoutEntity,
                    tabs: pageLayoutTabsByPageLayoutId.get(pageLayoutEntity.id) || []
                },
                applicationIdToUniversalIdentifierMap,
                objectMetadataIdToUniversalIdentifierMap,
                pageLayoutTabIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatPageLayout,
                flatEntityMapsToMutate: flatPageLayoutMaps
            });
        }
        return flatPageLayoutMaps;
    }
    constructor(pageLayoutRepository, pageLayoutTabRepository, applicationRepository, objectMetadataRepository){
        super(), this.pageLayoutRepository = pageLayoutRepository, this.pageLayoutTabRepository = pageLayoutTabRepository, this.applicationRepository = applicationRepository, this.objectMetadataRepository = objectMetadataRepository;
    }
};
WorkspaceFlatPageLayoutMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatPageLayoutMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_pagelayoutentity.PageLayoutEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_pagelayouttabentity.PageLayoutTabEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatPageLayoutMapCacheService);

//# sourceMappingURL=workspace-flat-page-layout-map-cache.service.js.map