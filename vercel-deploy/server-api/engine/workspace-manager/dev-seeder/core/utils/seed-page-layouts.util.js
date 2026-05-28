"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seedPageLayouts", {
    enumerable: true,
    get: function() {
        return seedPageLayouts;
    }
});
const _getnavigationmenuitemdataseedsutil = require("./get-navigation-menu-item-data-seeds.util");
const _getpagelayoutdataseedsutil = require("./get-page-layout-data-seeds.util");
const _getpagelayouttabdataseedsutil = require("./get-page-layout-tab-data-seeds.util");
const _getpagelayoutwidgetdataseedsutil = require("./get-page-layout-widget-data-seeds.util");
const _workspacemigrationbuilderexception = require("../../../workspace-migration/exceptions/workspace-migration-builder-exception");
const seedPageLayouts = async ({ workspaceId, flatApplication, objectMetadataItems, workspaceMigrationValidateBuildAndRunService })=>{
    const pageLayouts = (0, _getpagelayoutdataseedsutil.getPageLayoutFlatEntitySeeds)({
        workspaceId,
        flatApplication
    });
    const pageLayoutTabs = (0, _getpagelayouttabdataseedsutil.getPageLayoutTabFlatEntitySeeds)({
        workspaceId,
        flatApplication
    });
    const pageLayoutWidgets = (0, _getpagelayoutwidgetdataseedsutil.getPageLayoutWidgetFlatEntitySeeds)({
        workspaceId,
        flatApplication,
        objectMetadataItems
    });
    const navigationMenuItems = (0, _getnavigationmenuitemdataseedsutil.getNavigationMenuItemFlatEntitySeeds)({
        workspaceId,
        flatApplication
    });
    const result = await workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
        allFlatEntityOperationByMetadataName: {
            pageLayout: {
                flatEntityToCreate: pageLayouts,
                flatEntityToDelete: [],
                flatEntityToUpdate: []
            },
            pageLayoutTab: {
                flatEntityToCreate: pageLayoutTabs,
                flatEntityToDelete: [],
                flatEntityToUpdate: []
            },
            pageLayoutWidget: {
                flatEntityToCreate: pageLayoutWidgets,
                flatEntityToDelete: [],
                flatEntityToUpdate: []
            },
            navigationMenuItem: {
                flatEntityToCreate: navigationMenuItems,
                flatEntityToDelete: [],
                flatEntityToUpdate: []
            }
        },
        workspaceId,
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    });
    if (result.status === 'fail') {
        throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(result, 'Failed to seed page layouts, tabs, widgets, and navigation menu items');
    }
};

//# sourceMappingURL=seed-page-layouts.util.js.map