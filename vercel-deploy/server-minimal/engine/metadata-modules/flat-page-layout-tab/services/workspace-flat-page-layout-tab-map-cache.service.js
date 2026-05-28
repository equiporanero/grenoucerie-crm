"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatPageLayoutTabMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatPageLayoutTabMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _transformpagelayouttabentitytoflatpagelayouttabutil = require("../utils/transform-page-layout-tab-entity-to-flat-page-layout-tab.util");
const _pagelayouttabentity = require("../../page-layout-tab/entities/page-layout-tab.entity");
const _pagelayoutwidgetentity = require("../../page-layout-widget/entities/page-layout-widget.entity");
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
let WorkspaceFlatPageLayoutTabMapCacheService = class WorkspaceFlatPageLayoutTabMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [pageLayoutTabs, pageLayoutWidgets, applications, pageLayouts] = await Promise.all([
            this.pageLayoutTabRepository.find({
                where: {
                    workspaceId
                },
                withDeleted: true
            }),
            this.pageLayoutWidgetRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'pageLayoutTabId'
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
            this.pageLayoutRepository.find({
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
        const [pageLayoutWidgetsByPageLayoutTabId] = [
            {
                entities: pageLayoutWidgets,
                foreignKey: 'pageLayoutTabId'
            }
        ].map(_regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const pageLayoutIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(pageLayouts);
        const flatPageLayoutTabMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const pageLayoutTabEntity of pageLayoutTabs){
            const flatPageLayoutTab = (0, _transformpagelayouttabentitytoflatpagelayouttabutil.transformPageLayoutTabEntityToFlatPageLayoutTab)({
                entity: {
                    ...pageLayoutTabEntity,
                    widgets: pageLayoutWidgetsByPageLayoutTabId.get(pageLayoutTabEntity.id) || []
                },
                applicationIdToUniversalIdentifierMap,
                pageLayoutIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatPageLayoutTab,
                flatEntityMapsToMutate: flatPageLayoutTabMaps
            });
        }
        return flatPageLayoutTabMaps;
    }
    constructor(pageLayoutTabRepository, pageLayoutWidgetRepository, applicationRepository, pageLayoutRepository){
        super(), this.pageLayoutTabRepository = pageLayoutTabRepository, this.pageLayoutWidgetRepository = pageLayoutWidgetRepository, this.applicationRepository = applicationRepository, this.pageLayoutRepository = pageLayoutRepository;
    }
};
WorkspaceFlatPageLayoutTabMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatPageLayoutTabMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_pagelayouttabentity.PageLayoutTabEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_pagelayoutwidgetentity.PageLayoutWidgetEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_pagelayoutentity.PageLayoutEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatPageLayoutTabMapCacheService);

//# sourceMappingURL=workspace-flat-page-layout-tab-map-cache.service.js.map