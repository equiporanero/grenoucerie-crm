"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceManyOrAllFlatEntityMapsCacheModule", {
    enumerable: true,
    get: function() {
        return WorkspaceManyOrAllFlatEntityMapsCacheModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _workspacemanyorallflatentitymapscacheservice = require("./workspace-many-or-all-flat-entity-maps-cache.service");
const _workspaceflatfieldmetadatamapcacheservice = require("../../flat-field-metadata/services/workspace-flat-field-metadata-map-cache.service");
const _workspaceflatfieldpermissionmapcacheservice = require("../../flat-field-permission/services/workspace-flat-field-permission-map-cache.service");
const _workspaceflatindexmapcacheservice = require("../../flat-index-metadata/services/workspace-flat-index-map-cache.service");
const _workspaceflatobjectmetadatamapcacheservice = require("../../flat-object-metadata/services/workspace-flat-object-metadata-map-cache.service");
const _workspaceflatobjectpermissionmapcacheservice = require("../../flat-object-permission/services/workspace-flat-object-permission-map-cache.service");
const _workspaceflatpagelayouttabmapcacheservice = require("../../flat-page-layout-tab/services/workspace-flat-page-layout-tab-map-cache.service");
const _workspaceflatpagelayoutwidgetmapcacheservice = require("../../flat-page-layout-widget/services/workspace-flat-page-layout-widget-map-cache.service");
const _workspaceflatpagelayoutmapcacheservice = require("../../flat-page-layout/services/workspace-flat-page-layout-map-cache.service");
const _workspaceflatpermissionflagmapcacheservice = require("../../flat-permission-flag/services/workspace-flat-permission-flag-map-cache.service");
const _workspaceflatrolepermissionflagmapcacheservice = require("../../flat-role-permission-flag/services/workspace-flat-role-permission-flag-map-cache.service");
const _workspaceflatrowlevelpermissionpredicategroupmapcacheservice = require("../../flat-row-level-permission-predicate/services/workspace-flat-row-level-permission-predicate-group-map-cache.service");
const _workspaceflatrowlevelpermissionpredicatemapcacheservice = require("../../flat-row-level-permission-predicate/services/workspace-flat-row-level-permission-predicate-map-cache.service");
const _workspaceflatviewfieldgroupmapcacheservice = require("../../flat-view-field-group/services/workspace-flat-view-field-group-map-cache.service");
const _workspaceflatviewfieldmapcacheservice = require("../../flat-view-field/services/workspace-flat-view-field-map-cache.service");
const _workspaceflatviewfiltergroupmapcacheservice = require("../../flat-view-filter-group/services/workspace-flat-view-filter-group-map-cache.service");
const _workspaceflatviewfiltermapcacheservice = require("../../flat-view-filter/services/workspace-flat-view-filter-map-cache.service");
const _workspaceflatviewgroupmapcacheservice = require("../../flat-view-group/services/workspace-flat-view-group-map-cache.service");
const _workspaceflatviewsortmapcacheservice = require("../../flat-view-sort/services/workspace-flat-view-sort-map-cache.service");
const _workspaceflatviewmapcacheservice = require("../../flat-view/services/workspace-flat-view-map-cache.service");
const _frontcomponententity = require("../../front-component/entities/front-component.entity");
const _indexfieldmetadataentity = require("../../index-metadata/index-field-metadata.entity");
const _indexmetadataentity = require("../../index-metadata/index-metadata.entity");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _fieldpermissionentity = require("../../object-permission/field-permission/field-permission.entity");
const _objectpermissionentity = require("../../object-permission/object-permission.entity");
const _pagelayouttabentity = require("../../page-layout-tab/entities/page-layout-tab.entity");
const _pagelayoutwidgetentity = require("../../page-layout-widget/entities/page-layout-widget.entity");
const _pagelayoutentity = require("../../page-layout/entities/page-layout.entity");
const _permissionflagentity = require("../../permission-flag/permission-flag.entity");
const _rolepermissionflagentity = require("../../role-permission-flag/role-permission-flag.entity");
const _roleentity = require("../../role/role.entity");
const _rowlevelpermissionpredicategroupentity = require("../../row-level-permission-predicate/entities/row-level-permission-predicate-group.entity");
const _rowlevelpermissionpredicateentity = require("../../row-level-permission-predicate/entities/row-level-permission-predicate.entity");
const _viewfieldgroupentity = require("../../view-field-group/entities/view-field-group.entity");
const _viewfieldentity = require("../../view-field/entities/view-field.entity");
const _viewfiltergroupentity = require("../../view-filter-group/entities/view-filter-group.entity");
const _viewfilterentity = require("../../view-filter/entities/view-filter.entity");
const _viewgroupentity = require("../../view-group/entities/view-group.entity");
const _viewsortentity = require("../../view-sort/entities/view-sort.entity");
const _viewentity = require("../../view/entities/view.entity");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceManyOrAllFlatEntityMapsCacheModule = class WorkspaceManyOrAllFlatEntityMapsCacheModule {
};
WorkspaceManyOrAllFlatEntityMapsCacheModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacecachemodule.WorkspaceCacheModule,
            _typeorm.TypeOrmModule.forFeature([
                _viewentity.ViewEntity,
                _viewfieldentity.ViewFieldEntity,
                _viewfieldgroupentity.ViewFieldGroupEntity,
                _viewfilterentity.ViewFilterEntity,
                _viewfiltergroupentity.ViewFilterGroupEntity,
                _viewgroupentity.ViewGroupEntity,
                _viewsortentity.ViewSortEntity,
                _indexmetadataentity.IndexMetadataEntity,
                _indexfieldmetadataentity.IndexFieldMetadataEntity,
                _fieldmetadataentity.FieldMetadataEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _objectpermissionentity.ObjectPermissionEntity,
                _fieldpermissionentity.FieldPermissionEntity,
                _pagelayoutentity.PageLayoutEntity,
                _pagelayouttabentity.PageLayoutTabEntity,
                _pagelayoutwidgetentity.PageLayoutWidgetEntity,
                _rolepermissionflagentity.RolePermissionFlagEntity,
                _permissionflagentity.PermissionFlagEntity,
                _rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity,
                _rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity,
                _applicationentity.ApplicationEntity,
                _roleentity.RoleEntity,
                _frontcomponententity.FrontComponentEntity
            ])
        ],
        providers: [
            _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
            _workspaceflatobjectmetadatamapcacheservice.WorkspaceFlatObjectMetadataMapCacheService,
            _workspaceflatviewmapcacheservice.WorkspaceFlatViewMapCacheService,
            _workspaceflatviewfieldmapcacheservice.WorkspaceFlatViewFieldMapCacheService,
            _workspaceflatviewfieldgroupmapcacheservice.WorkspaceFlatViewFieldGroupMapCacheService,
            _workspaceflatviewfiltermapcacheservice.WorkspaceFlatViewFilterMapCacheService,
            _workspaceflatviewfiltergroupmapcacheservice.WorkspaceFlatViewFilterGroupMapCacheService,
            _workspaceflatindexmapcacheservice.WorkspaceFlatIndexMapCacheService,
            _workspaceflatfieldmetadatamapcacheservice.WorkspaceFlatFieldMetadataMapCacheService,
            _workspaceflatviewgroupmapcacheservice.WorkspaceFlatViewGroupMapCacheService,
            _workspaceflatobjectpermissionmapcacheservice.WorkspaceFlatObjectPermissionMapCacheService,
            _workspaceflatfieldpermissionmapcacheservice.WorkspaceFlatFieldPermissionMapCacheService,
            _workspaceflatrolepermissionflagmapcacheservice.WorkspaceFlatRolePermissionFlagMapCacheService,
            _workspaceflatpermissionflagmapcacheservice.WorkspaceFlatPermissionFlagMapCacheService,
            _workspaceflatviewsortmapcacheservice.WorkspaceFlatViewSortMapCacheService,
            _workspaceflatpagelayoutmapcacheservice.WorkspaceFlatPageLayoutMapCacheService,
            _workspaceflatpagelayouttabmapcacheservice.WorkspaceFlatPageLayoutTabMapCacheService,
            _workspaceflatpagelayoutwidgetmapcacheservice.WorkspaceFlatPageLayoutWidgetMapCacheService,
            _workspaceflatrowlevelpermissionpredicatemapcacheservice.WorkspaceFlatRowLevelPermissionPredicateMapCacheService,
            _workspaceflatrowlevelpermissionpredicategroupmapcacheservice.WorkspaceFlatRowLevelPermissionPredicateGroupMapCacheService
        ],
        exports: [
            _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
            _workspaceflatobjectmetadatamapcacheservice.WorkspaceFlatObjectMetadataMapCacheService,
            _workspaceflatviewmapcacheservice.WorkspaceFlatViewMapCacheService,
            _workspaceflatviewfieldmapcacheservice.WorkspaceFlatViewFieldMapCacheService,
            _workspaceflatviewfieldgroupmapcacheservice.WorkspaceFlatViewFieldGroupMapCacheService,
            _workspaceflatviewfiltermapcacheservice.WorkspaceFlatViewFilterMapCacheService,
            _workspaceflatviewfiltergroupmapcacheservice.WorkspaceFlatViewFilterGroupMapCacheService,
            _workspaceflatindexmapcacheservice.WorkspaceFlatIndexMapCacheService,
            _workspaceflatfieldmetadatamapcacheservice.WorkspaceFlatFieldMetadataMapCacheService,
            _workspaceflatviewgroupmapcacheservice.WorkspaceFlatViewGroupMapCacheService,
            _workspaceflatobjectpermissionmapcacheservice.WorkspaceFlatObjectPermissionMapCacheService,
            _workspaceflatfieldpermissionmapcacheservice.WorkspaceFlatFieldPermissionMapCacheService,
            _workspaceflatrolepermissionflagmapcacheservice.WorkspaceFlatRolePermissionFlagMapCacheService,
            _workspaceflatpermissionflagmapcacheservice.WorkspaceFlatPermissionFlagMapCacheService,
            _workspaceflatviewsortmapcacheservice.WorkspaceFlatViewSortMapCacheService,
            _workspaceflatpagelayoutmapcacheservice.WorkspaceFlatPageLayoutMapCacheService,
            _workspaceflatpagelayouttabmapcacheservice.WorkspaceFlatPageLayoutTabMapCacheService,
            _workspaceflatpagelayoutwidgetmapcacheservice.WorkspaceFlatPageLayoutWidgetMapCacheService,
            _workspaceflatrowlevelpermissionpredicatemapcacheservice.WorkspaceFlatRowLevelPermissionPredicateMapCacheService,
            _workspaceflatrowlevelpermissionpredicategroupmapcacheservice.WorkspaceFlatRowLevelPermissionPredicateGroupMapCacheService
        ]
    })
], WorkspaceManyOrAllFlatEntityMapsCacheModule);

//# sourceMappingURL=workspace-many-or-all-flat-entity-maps-cache.module.js.map