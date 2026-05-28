"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewPermissionsModule", {
    enumerable: true,
    get: function() {
        return ViewPermissionsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _i18nmodule = require("../../core-modules/i18n/i18n.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _viewfieldentity = require("../view-field/entities/view-field.entity");
const _viewfiltergroupentity = require("../view-filter-group/entities/view-filter-group.entity");
const _viewfilterentity = require("../view-filter/entities/view-filter.entity");
const _viewgroupentity = require("../view-group/entities/view-group.entity");
const _createviewfieldpermissionguard = require("./guards/create-view-field-permission.guard");
const _createviewfiltergrouppermissionguard = require("./guards/create-view-filter-group-permission.guard");
const _createviewfilterpermissionguard = require("./guards/create-view-filter-permission.guard");
const _createviewgrouppermissionguard = require("./guards/create-view-group-permission.guard");
const _createviewpermissionguard = require("./guards/create-view-permission.guard");
const _createviewsortpermissionguard = require("./guards/create-view-sort-permission.guard");
const _deleteviewfieldpermissionguard = require("./guards/delete-view-field-permission.guard");
const _deleteviewfiltergrouppermissionguard = require("./guards/delete-view-filter-group-permission.guard");
const _deleteviewfilterpermissionguard = require("./guards/delete-view-filter-permission.guard");
const _deleteviewgrouppermissionguard = require("./guards/delete-view-group-permission.guard");
const _deleteviewpermissionguard = require("./guards/delete-view-permission.guard");
const _deleteviewsortpermissionguard = require("./guards/delete-view-sort-permission.guard");
const _destroyviewfieldpermissionguard = require("./guards/destroy-view-field-permission.guard");
const _destroyviewfiltergrouppermissionguard = require("./guards/destroy-view-filter-group-permission.guard");
const _destroyviewfilterpermissionguard = require("./guards/destroy-view-filter-permission.guard");
const _destroyviewgrouppermissionguard = require("./guards/destroy-view-group-permission.guard");
const _destroyviewpermissionguard = require("./guards/destroy-view-permission.guard");
const _destroyviewsortpermissionguard = require("./guards/destroy-view-sort-permission.guard");
const _updateviewfieldpermissionguard = require("./guards/update-view-field-permission.guard");
const _updateviewfiltergrouppermissionguard = require("./guards/update-view-filter-group-permission.guard");
const _updateviewfilterpermissionguard = require("./guards/update-view-filter-permission.guard");
const _updateviewgrouppermissionguard = require("./guards/update-view-group-permission.guard");
const _updateviewpermissionguard = require("./guards/update-view-permission.guard");
const _updateviewsortpermissionguard = require("./guards/update-view-sort-permission.guard");
const _viewaccessservice = require("./services/view-access.service");
const _viewentitylookupservice = require("./services/view-entity-lookup.service");
const _viewsortentity = require("../view-sort/entities/view-sort.entity");
const _viewentity = require("../view/entities/view.entity");
const _viewservice = require("../view/services/view.service");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ViewPermissionsModule = class ViewPermissionsModule {
};
ViewPermissionsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _viewentity.ViewEntity,
                _viewfieldentity.ViewFieldEntity,
                _viewfilterentity.ViewFilterEntity,
                _viewfiltergroupentity.ViewFilterGroupEntity,
                _viewgroupentity.ViewGroupEntity,
                _viewsortentity.ViewSortEntity
            ]),
            _applicationmodule.ApplicationModule,
            _i18nmodule.I18nModule,
            _permissionsmodule.PermissionsModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule
        ],
        providers: [
            _viewservice.ViewService,
            _viewentitylookupservice.ViewEntityLookupService,
            _viewaccessservice.ViewAccessService,
            _createviewpermissionguard.CreateViewPermissionGuard,
            _updateviewpermissionguard.UpdateViewPermissionGuard,
            _deleteviewpermissionguard.DeleteViewPermissionGuard,
            _destroyviewpermissionguard.DestroyViewPermissionGuard,
            _createviewfieldpermissionguard.CreateViewFieldPermissionGuard,
            _updateviewfieldpermissionguard.UpdateViewFieldPermissionGuard,
            _deleteviewfieldpermissionguard.DeleteViewFieldPermissionGuard,
            _destroyviewfieldpermissionguard.DestroyViewFieldPermissionGuard,
            _createviewfilterpermissionguard.CreateViewFilterPermissionGuard,
            _updateviewfilterpermissionguard.UpdateViewFilterPermissionGuard,
            _deleteviewfilterpermissionguard.DeleteViewFilterPermissionGuard,
            _destroyviewfilterpermissionguard.DestroyViewFilterPermissionGuard,
            _createviewfiltergrouppermissionguard.CreateViewFilterGroupPermissionGuard,
            _updateviewfiltergrouppermissionguard.UpdateViewFilterGroupPermissionGuard,
            _deleteviewfiltergrouppermissionguard.DeleteViewFilterGroupPermissionGuard,
            _destroyviewfiltergrouppermissionguard.DestroyViewFilterGroupPermissionGuard,
            _createviewgrouppermissionguard.CreateViewGroupPermissionGuard,
            _updateviewgrouppermissionguard.UpdateViewGroupPermissionGuard,
            _deleteviewgrouppermissionguard.DeleteViewGroupPermissionGuard,
            _destroyviewgrouppermissionguard.DestroyViewGroupPermissionGuard,
            _createviewsortpermissionguard.CreateViewSortPermissionGuard,
            _updateviewsortpermissionguard.UpdateViewSortPermissionGuard,
            _deleteviewsortpermissionguard.DeleteViewSortPermissionGuard,
            _destroyviewsortpermissionguard.DestroyViewSortPermissionGuard
        ],
        exports: [
            _viewservice.ViewService,
            _viewentitylookupservice.ViewEntityLookupService,
            _viewaccessservice.ViewAccessService,
            _createviewpermissionguard.CreateViewPermissionGuard,
            _updateviewpermissionguard.UpdateViewPermissionGuard,
            _deleteviewpermissionguard.DeleteViewPermissionGuard,
            _destroyviewpermissionguard.DestroyViewPermissionGuard,
            _createviewfieldpermissionguard.CreateViewFieldPermissionGuard,
            _updateviewfieldpermissionguard.UpdateViewFieldPermissionGuard,
            _deleteviewfieldpermissionguard.DeleteViewFieldPermissionGuard,
            _destroyviewfieldpermissionguard.DestroyViewFieldPermissionGuard,
            _createviewfilterpermissionguard.CreateViewFilterPermissionGuard,
            _updateviewfilterpermissionguard.UpdateViewFilterPermissionGuard,
            _deleteviewfilterpermissionguard.DeleteViewFilterPermissionGuard,
            _destroyviewfilterpermissionguard.DestroyViewFilterPermissionGuard,
            _createviewfiltergrouppermissionguard.CreateViewFilterGroupPermissionGuard,
            _updateviewfiltergrouppermissionguard.UpdateViewFilterGroupPermissionGuard,
            _deleteviewfiltergrouppermissionguard.DeleteViewFilterGroupPermissionGuard,
            _destroyviewfiltergrouppermissionguard.DestroyViewFilterGroupPermissionGuard,
            _createviewgrouppermissionguard.CreateViewGroupPermissionGuard,
            _updateviewgrouppermissionguard.UpdateViewGroupPermissionGuard,
            _deleteviewgrouppermissionguard.DeleteViewGroupPermissionGuard,
            _destroyviewgrouppermissionguard.DestroyViewGroupPermissionGuard,
            _createviewsortpermissionguard.CreateViewSortPermissionGuard,
            _updateviewsortpermissionguard.UpdateViewSortPermissionGuard,
            _deleteviewsortpermissionguard.DeleteViewSortPermissionGuard,
            _destroyviewsortpermissionguard.DestroyViewSortPermissionGuard
        ]
    })
], ViewPermissionsModule);

//# sourceMappingURL=view-permissions.module.js.map