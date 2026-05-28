"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatNavigationMenuItemMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatNavigationMenuItemMaps;
    }
});
const _uuid = require("uuid");
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatnavigationmenuitemtomapsandupdateindexutil = require("../../../../metadata-modules/flat-navigation-menu-item/utils/add-flat-navigation-menu-item-to-maps-and-update-index.util");
const _standardnavigationmenuitemconstant = require("../../constants/standard-navigation-menu-item.constant");
const _createstandardnavigationmenuitemflatmetadatautil = require("./create-standard-navigation-menu-item-flat-metadata.util");
const _createstandardnavigationmenuitemfolderflatmetadatautil = require("./create-standard-navigation-menu-item-folder-flat-metadata.util");
const FLAT_NAVIGATION_MENU_ITEM_NAMES = [
    'allCompanies',
    'allDashboards',
    'allNotes',
    'allOpportunities',
    'allPeople',
    'allTasks'
];
const WORKFLOWS_FOLDER_ITEM_NAMES = [
    'workflowsFolderAllWorkflows',
    'workflowsFolderAllWorkflowRuns',
    'workflowsFolderAllWorkflowVersions'
];
const buildStandardFlatNavigationMenuItemMaps = ({ now, workspaceId, twentyStandardApplicationId, dependencyFlatEntityMaps: { flatViewMaps } })=>{
    const flatNavigationMenuItemMaps = {
        ...(0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)(),
        byUserWorkspaceIdAndFolderId: {}
    };
    for (const navigationMenuItemName of FLAT_NAVIGATION_MENU_ITEM_NAMES){
        const navigationMenuItemDefinition = _standardnavigationmenuitemconstant.STANDARD_NAVIGATION_MENU_ITEMS[navigationMenuItemName];
        const flatNavigationMenuItem = (0, _createstandardnavigationmenuitemflatmetadatautil.createStandardNavigationMenuItemFlatMetadata)({
            workspaceId,
            navigationMenuItemName,
            viewUniversalIdentifier: navigationMenuItemDefinition.viewUniversalIdentifier,
            position: navigationMenuItemDefinition.position,
            navigationMenuItemId: (0, _uuid.v4)(),
            dependencyFlatEntityMaps: {
                flatViewMaps
            },
            twentyStandardApplicationId,
            now
        });
        (0, _addflatnavigationmenuitemtomapsandupdateindexutil.addFlatNavigationMenuItemToMapsAndUpdateIndex)({
            flatNavigationMenuItem,
            flatNavigationMenuItemMaps
        });
    }
    const workflowsFolderDefinition = _standardnavigationmenuitemconstant.STANDARD_NAVIGATION_MENU_ITEMS.workflowsFolder;
    const workflowsFolderId = (0, _uuid.v4)();
    const workflowsFolder = (0, _createstandardnavigationmenuitemfolderflatmetadatautil.createStandardNavigationMenuItemFolderFlatMetadata)({
        universalIdentifier: workflowsFolderDefinition.universalIdentifier,
        name: workflowsFolderDefinition.name,
        icon: workflowsFolderDefinition.icon,
        position: workflowsFolderDefinition.position,
        navigationMenuItemId: workflowsFolderId,
        workspaceId,
        twentyStandardApplicationId,
        now
    });
    (0, _addflatnavigationmenuitemtomapsandupdateindexutil.addFlatNavigationMenuItemToMapsAndUpdateIndex)({
        flatNavigationMenuItem: workflowsFolder,
        flatNavigationMenuItemMaps
    });
    for (const folderItemName of WORKFLOWS_FOLDER_ITEM_NAMES){
        const folderItemDefinition = _standardnavigationmenuitemconstant.STANDARD_NAVIGATION_MENU_ITEMS[folderItemName];
        const folderItem = (0, _createstandardnavigationmenuitemfolderflatmetadatautil.createStandardNavigationMenuItemFolderItemFlatMetadata)({
            universalIdentifier: folderItemDefinition.universalIdentifier,
            viewUniversalIdentifier: folderItemDefinition.viewUniversalIdentifier,
            folderId: workflowsFolderId,
            folderUniversalIdentifier: folderItemDefinition.folderUniversalIdentifier,
            position: folderItemDefinition.position,
            navigationMenuItemId: (0, _uuid.v4)(),
            workspaceId,
            twentyStandardApplicationId,
            dependencyFlatEntityMaps: {
                flatViewMaps
            },
            now
        });
        (0, _addflatnavigationmenuitemtomapsandupdateindexutil.addFlatNavigationMenuItemToMapsAndUpdateIndex)({
            flatNavigationMenuItem: folderItem,
            flatNavigationMenuItemMaps
        });
    }
    return flatNavigationMenuItemMaps;
};

//# sourceMappingURL=build-standard-flat-navigation-menu-item-maps.util.js.map