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
    get createStandardNavigationMenuItemFolderFlatMetadata () {
        return createStandardNavigationMenuItemFolderFlatMetadata;
    },
    get createStandardNavigationMenuItemFolderItemFlatMetadata () {
        return createStandardNavigationMenuItemFolderItemFlatMetadata;
    }
});
const _navigationmenuitemtypeenum = require("../../../../metadata-modules/navigation-menu-item/enums/navigation-menu-item-type.enum");
const _findflatentitybyuniversalidentifierutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardNavigationMenuItemFolderFlatMetadata = ({ universalIdentifier, name, icon, position, navigationMenuItemId, workspaceId, twentyStandardApplicationId, now })=>({
        id: navigationMenuItemId,
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.FOLDER,
        universalIdentifier,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        userWorkspaceId: null,
        targetRecordId: null,
        targetObjectMetadataId: null,
        targetObjectMetadataUniversalIdentifier: null,
        viewId: null,
        viewUniversalIdentifier: null,
        folderId: null,
        folderUniversalIdentifier: null,
        pageLayoutId: null,
        pageLayoutUniversalIdentifier: null,
        name,
        link: null,
        icon: icon ?? null,
        color: 'orange',
        position,
        createdAt: now,
        updatedAt: now
    });
const createStandardNavigationMenuItemFolderItemFlatMetadata = ({ universalIdentifier, viewUniversalIdentifier, folderId, folderUniversalIdentifier, position, navigationMenuItemId, workspaceId, twentyStandardApplicationId, dependencyFlatEntityMaps: { flatViewMaps }, now })=>{
    const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        flatEntityMaps: flatViewMaps,
        universalIdentifier: viewUniversalIdentifier
    });
    if (!flatView) {
        throw new Error(`View not found for universal identifier ${viewUniversalIdentifier}`);
    }
    return {
        id: navigationMenuItemId,
        type: _navigationmenuitemtypeenum.NavigationMenuItemType.OBJECT,
        universalIdentifier,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        userWorkspaceId: null,
        targetRecordId: null,
        targetObjectMetadataId: flatView.objectMetadataId,
        targetObjectMetadataUniversalIdentifier: flatView.objectMetadataUniversalIdentifier,
        viewId: null,
        viewUniversalIdentifier: null,
        folderId,
        folderUniversalIdentifier,
        pageLayoutId: null,
        pageLayoutUniversalIdentifier: null,
        name: null,
        link: null,
        icon: null,
        color: 'gray',
        position,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=create-standard-navigation-menu-item-folder-flat-metadata.util.js.map