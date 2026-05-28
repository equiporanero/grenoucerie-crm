"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getNavigationMenuItemFlatEntitySeeds", {
    enumerable: true,
    get: function() {
        return getNavigationMenuItemFlatEntitySeeds;
    }
});
const _navigationmenuitemtypeenum = require("../../../../metadata-modules/navigation-menu-item/enums/navigation-menu-item-type.enum");
const _navigationmenuitemseedsconstant = require("../constants/navigation-menu-item-seeds.constant");
const _pagelayoutseedsconstant = require("../constants/page-layout-seeds.constant");
const _generateseedidutil = require("./generate-seed-id.util");
const getNavigationMenuItemFlatEntitySeeds = ({ workspaceId, flatApplication })=>{
    const now = new Date().toISOString();
    return [
        {
            id: (0, _generateseedidutil.generateSeedId)(workspaceId, _navigationmenuitemseedsconstant.NAVIGATION_MENU_ITEM_SEEDS.DOCUMENTATION_PAGE),
            universalIdentifier: (0, _generateseedidutil.generateSeedId)(workspaceId, _navigationmenuitemseedsconstant.NAVIGATION_MENU_ITEM_SEEDS.DOCUMENTATION_PAGE),
            applicationId: flatApplication.id,
            applicationUniversalIdentifier: flatApplication.universalIdentifier,
            workspaceId,
            type: _navigationmenuitemtypeenum.NavigationMenuItemType.PAGE_LAYOUT,
            name: 'Star History',
            icon: 'IconStar',
            color: 'yellow',
            position: 9999,
            link: null,
            userWorkspaceId: null,
            targetRecordId: null,
            targetObjectMetadataId: null,
            targetObjectMetadataUniversalIdentifier: null,
            viewId: null,
            viewUniversalIdentifier: null,
            folderId: null,
            folderUniversalIdentifier: null,
            pageLayoutId: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.DOCUMENTATION_STANDALONE_PAGE),
            pageLayoutUniversalIdentifier: (0, _generateseedidutil.generateSeedId)(workspaceId, _pagelayoutseedsconstant.PAGE_LAYOUT_SEEDS.DOCUMENTATION_STANDALONE_PAGE),
            createdAt: now,
            updatedAt: now
        }
    ];
};

//# sourceMappingURL=get-navigation-menu-item-data-seeds.util.js.map