"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemDeletionService", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemDeletionService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _fromdeletenavigationmenuiteminputtoflatnavigationmenuitemorthrowutil = require("../../flat-navigation-menu-item/utils/from-delete-navigation-menu-item-input-to-flat-navigation-menu-item-or-throw.util");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const isNavigationMenuItemForDeletedRecord = (item, deletedIdsSet)=>(0, _utils.isDefined)(item.targetRecordId) && !(0, _utils.isDefined)(item.viewId) && deletedIdsSet.has(item.targetRecordId);
const isNavigationMenuItemForDeletedView = (item, deletedIdsSet)=>(0, _utils.isDefined)(item.viewId) && deletedIdsSet.has(item.viewId);
let NavigationMenuItemDeletionService = class NavigationMenuItemDeletionService {
    async deleteNavigationMenuItemsForDeletedRecords(deletedRecordIds, workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatNavigationMenuItemMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatNavigationMenuItemMaps'
            ]
        });
        const deletedRecordIdsSet = new Set(deletedRecordIds);
        const navigationMenuItemsToDelete = Object.values(flatNavigationMenuItemMaps.byUniversalIdentifier).filter((item)=>(0, _utils.isDefined)(item) && (isNavigationMenuItemForDeletedRecord(item, deletedRecordIdsSet) || isNavigationMenuItemForDeletedView(item, deletedRecordIdsSet)));
        if (navigationMenuItemsToDelete.length === 0) {
            return;
        }
        const flatNavigationMenuItemsToDelete = navigationMenuItemsToDelete.map((item)=>(0, _fromdeletenavigationmenuiteminputtoflatnavigationmenuitemorthrowutil.fromDeleteNavigationMenuItemInputToFlatNavigationMenuItemOrThrow)({
                flatNavigationMenuItemMaps,
                navigationMenuItemId: item.id
            }));
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                navigationMenuItem: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: flatNavigationMenuItemsToDelete,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting navigation menu items for deleted records');
        }
    }
    constructor(workspaceManyOrAllFlatEntityMapsCacheService, workspaceMigrationValidateBuildAndRunService, applicationService){
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.applicationService = applicationService;
    }
};
NavigationMenuItemDeletionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], NavigationMenuItemDeletionService);

//# sourceMappingURL=navigation-menu-item-deletion.service.js.map