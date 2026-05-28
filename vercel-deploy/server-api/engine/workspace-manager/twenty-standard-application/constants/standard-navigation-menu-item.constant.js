"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get STANDARD_NAVIGATION_MENU_ITEMS () {
        return STANDARD_NAVIGATION_MENU_ITEMS;
    },
    get STANDARD_NAVIGATION_MENU_ITEM_DEFAULT_COLORS () {
        return STANDARD_NAVIGATION_MENU_ITEM_DEFAULT_COLORS;
    }
});
const _metadata = require("twenty-shared/metadata");
const _navigationmenuitemtypeenum = require("../../../metadata-modules/navigation-menu-item/enums/navigation-menu-item-type.enum");
const STANDARD_NAVIGATION_MENU_ITEMS = {
    allCompanies: {
        universalIdentifier: '20202020-b001-4b01-8b01-c0aba11c0001',
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
        viewUniversalIdentifier: _metadata.STANDARD_OBJECTS.company.views.allCompanies.universalIdentifier,
        position: 0
    },
    allPeople: {
        universalIdentifier: '20202020-b005-4b05-8b05-c0aba11c0005',
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
        viewUniversalIdentifier: _metadata.STANDARD_OBJECTS.person.views.allPeople.universalIdentifier,
        position: 1
    },
    allOpportunities: {
        universalIdentifier: '20202020-b004-4b04-8b04-c0aba11c0004',
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
        viewUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.views.allOpportunities.universalIdentifier,
        position: 2
    },
    allTasks: {
        universalIdentifier: '20202020-b006-4b06-8b06-c0aba11c0006',
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
        viewUniversalIdentifier: _metadata.STANDARD_OBJECTS.task.views.allTasks.universalIdentifier,
        position: 3
    },
    allNotes: {
        universalIdentifier: '20202020-b003-4b03-8b03-c0aba11c0003',
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
        viewUniversalIdentifier: _metadata.STANDARD_OBJECTS.note.views.allNotes.universalIdentifier,
        position: 4
    },
    allDashboards: {
        universalIdentifier: '20202020-b002-4b02-8b02-c0aba11c0002',
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
        viewUniversalIdentifier: _metadata.STANDARD_OBJECTS.dashboard.views.allDashboards.universalIdentifier,
        position: 5
    },
    workflowsFolder: {
        universalIdentifier: '20202020-b007-4b07-8b07-c0aba11c0007',
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.FOLDER,
        name: 'Workflows',
        icon: 'IconSettingsAutomation',
        position: 6
    },
    workflowsFolderAllWorkflows: {
        universalIdentifier: '20202020-b008-4b08-8b08-c0aba11c0008',
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
        viewUniversalIdentifier: _metadata.STANDARD_OBJECTS.workflow.views.allWorkflows.universalIdentifier,
        folderUniversalIdentifier: '20202020-b007-4b07-8b07-c0aba11c0007',
        position: 0
    },
    workflowsFolderAllWorkflowRuns: {
        universalIdentifier: '20202020-b009-4b09-8b09-c0aba11c0009',
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
        viewUniversalIdentifier: _metadata.STANDARD_OBJECTS.workflowRun.views.allWorkflowRuns.universalIdentifier,
        folderUniversalIdentifier: '20202020-b007-4b07-8b07-c0aba11c0007',
        position: 1
    },
    workflowsFolderAllWorkflowVersions: {
        universalIdentifier: '20202020-b00a-4b0a-8b0a-c0aba11c000a',
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
        viewUniversalIdentifier: _metadata.STANDARD_OBJECTS.workflowVersion.views.allWorkflowVersions.universalIdentifier,
        folderUniversalIdentifier: '20202020-b007-4b07-8b07-c0aba11c0007',
        position: 2
    }
};
const STANDARD_NAVIGATION_MENU_ITEM_DEFAULT_COLORS = {
    allCompanies: 'blue',
    allPeople: 'blue',
    allTasks: 'turquoise',
    allNotes: 'turquoise',
    allOpportunities: 'red',
    workflowsFolder: 'orange',
    allDashboards: 'gray',
    workflowsFolderAllWorkflows: 'gray',
    workflowsFolderAllWorkflowRuns: 'gray',
    workflowsFolderAllWorkflowVersions: 'gray'
};

//# sourceMappingURL=standard-navigation-menu-item.constant.js.map