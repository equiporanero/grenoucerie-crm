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
    get createStandardPageLayoutFlatMetadata () {
        return createStandardPageLayoutFlatMetadata;
    },
    get findObjectNameByUniversalIdentifier () {
        return findObjectNameByUniversalIdentifier;
    }
});
const _utils = require("twenty-shared/utils");
const _metadata = require("twenty-shared/metadata");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const _standardpagelayoutconstant = require("../../constants/standard-page-layout.constant");
const findObjectNameByUniversalIdentifier = (objectUniversalIdentifier)=>{
    for (const [objectName, objectConfig] of Object.entries(_metadata.STANDARD_OBJECTS)){
        if (objectConfig.universalIdentifier === objectUniversalIdentifier) {
            return objectName;
        }
    }
    throw new Error(`Object with universal identifier ${objectUniversalIdentifier} not found`);
};
const findTabKeyByUniversalIdentifier = (layoutName, tabUniversalIdentifier)=>{
    const layout = _standardpagelayoutconstant.STANDARD_PAGE_LAYOUTS[layoutName];
    if (!(0, _utils.isDefined)(layout)) {
        throw new Error(`Layout with name ${layoutName} not found`);
    }
    for (const [tabKey, tab] of Object.entries(layout.tabs)){
        if (tab.universalIdentifier === tabUniversalIdentifier) {
            return tabKey;
        }
    }
    throw new Error(`Tab with universal identifier ${tabUniversalIdentifier} not found`);
};
const createStandardPageLayoutFlatMetadata = ({ context: { layoutName, name, type, objectUniversalIdentifier, defaultTabUniversalIdentifier }, workspaceId, twentyStandardApplicationId, standardObjectMetadataRelatedEntityIds, standardPageLayoutMetadataRelatedEntityIds, now })=>{
    const layout = _standardpagelayoutconstant.STANDARD_PAGE_LAYOUTS[layoutName];
    const universalIdentifier = layout.universalIdentifier;
    const layoutIds = standardPageLayoutMetadataRelatedEntityIds[layoutName];
    let objectMetadataId = null;
    if (objectUniversalIdentifier) {
        const objectName = findObjectNameByUniversalIdentifier(objectUniversalIdentifier);
        if ((0, _utils.isDefined)(objectName)) {
            objectMetadataId = standardObjectMetadataRelatedEntityIds[objectName]?.id ?? null;
        }
    }
    let defaultTabToFocusOnMobileAndSidePanelId = null;
    if (defaultTabUniversalIdentifier) {
        const tabKey = findTabKeyByUniversalIdentifier(layoutName, defaultTabUniversalIdentifier);
        if ((0, _utils.isDefined)(tabKey)) {
            defaultTabToFocusOnMobileAndSidePanelId = layoutIds.tabs[tabKey].id;
        }
    }
    return {
        id: layoutIds.id,
        universalIdentifier,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        name,
        type,
        objectMetadataId,
        objectMetadataUniversalIdentifier: objectUniversalIdentifier,
        tabIds: [],
        tabUniversalIdentifiers: [],
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        defaultTabToFocusOnMobileAndSidePanelId,
        defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier: defaultTabUniversalIdentifier
    };
};

//# sourceMappingURL=create-standard-page-layout-flat-metadata.util.js.map