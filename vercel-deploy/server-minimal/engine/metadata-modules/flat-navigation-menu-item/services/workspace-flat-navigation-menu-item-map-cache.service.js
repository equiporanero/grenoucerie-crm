"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatNavigationMenuItemMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatNavigationMenuItemMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatnavigationmenuitemtomapsandupdateindexutil = require("../utils/add-flat-navigation-menu-item-to-maps-and-update-index.util");
const _fromnavigationmenuitementitytoflatnavigationmenuitemutil = require("../utils/from-navigation-menu-item-entity-to-flat-navigation-menu-item.util");
const _navigationmenuitementity = require("../../navigation-menu-item/entities/navigation-menu-item.entity");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _pagelayoutentity = require("../../page-layout/entities/page-layout.entity");
const _viewentity = require("../../view/entities/view.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _createidtouniversalidentifiermaputil = require("../../../workspace-cache/utils/create-id-to-universal-identifier-map.util");
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
let WorkspaceFlatNavigationMenuItemMapCacheService = class WorkspaceFlatNavigationMenuItemMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [navigationMenuItems, applications, objectMetadatas, views, pageLayouts] = await Promise.all([
            this.navigationMenuItemRepository.find({
                where: {
                    workspaceId
                },
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
            }),
            this.viewRepository.find({
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
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const objectMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(objectMetadatas);
        const navigationMenuItemIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(navigationMenuItems);
        const viewIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(views);
        const pageLayoutIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(pageLayouts);
        const flatNavigationMenuItemMaps = {
            ...(0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)(),
            byUserWorkspaceIdAndFolderId: {}
        };
        for (const navigationMenuItemEntity of navigationMenuItems){
            const flatNavigationMenuItem = (0, _fromnavigationmenuitementitytoflatnavigationmenuitemutil.fromNavigationMenuItemEntityToFlatNavigationMenuItem)({
                entity: navigationMenuItemEntity,
                applicationIdToUniversalIdentifierMap,
                objectMetadataIdToUniversalIdentifierMap,
                navigationMenuItemIdToUniversalIdentifierMap,
                viewIdToUniversalIdentifierMap,
                pageLayoutIdToUniversalIdentifierMap
            });
            (0, _addflatnavigationmenuitemtomapsandupdateindexutil.addFlatNavigationMenuItemToMapsAndUpdateIndex)({
                flatNavigationMenuItem,
                flatNavigationMenuItemMaps
            });
        }
        return flatNavigationMenuItemMaps;
    }
    constructor(navigationMenuItemRepository, applicationRepository, objectMetadataRepository, viewRepository, pageLayoutRepository){
        super(), this.navigationMenuItemRepository = navigationMenuItemRepository, this.applicationRepository = applicationRepository, this.objectMetadataRepository = objectMetadataRepository, this.viewRepository = viewRepository, this.pageLayoutRepository = pageLayoutRepository;
    }
};
WorkspaceFlatNavigationMenuItemMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatNavigationMenuItemMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_navigationmenuitementity.NavigationMenuItemEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_viewentity.ViewEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_pagelayoutentity.PageLayoutEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatNavigationMenuItemMapCacheService);

//# sourceMappingURL=workspace-flat-navigation-menu-item-map-cache.service.js.map