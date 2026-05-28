"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformPageLayoutEntityToFlatPageLayout", {
    enumerable: true,
    get: function() {
        return transformPageLayoutEntityToFlatPageLayout;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const transformPageLayoutEntityToFlatPageLayout = ({ entity: pageLayoutEntity, applicationIdToUniversalIdentifierMap, objectMetadataIdToUniversalIdentifierMap, pageLayoutTabIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(pageLayoutEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${pageLayoutEntity.applicationId} not found for pageLayout ${pageLayoutEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let objectMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(pageLayoutEntity.objectMetadataId)) {
        objectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(pageLayoutEntity.objectMetadataId) ?? null;
        if (!(0, _utils.isDefined)(objectMetadataUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`ObjectMetadata with id ${pageLayoutEntity.objectMetadataId} not found for pageLayout ${pageLayoutEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    let defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier = null;
    if ((0, _utils.isDefined)(pageLayoutEntity.defaultTabToFocusOnMobileAndSidePanelId)) {
        defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier = pageLayoutTabIdToUniversalIdentifierMap.get(pageLayoutEntity.defaultTabToFocusOnMobileAndSidePanelId) ?? null;
        if (!(0, _utils.isDefined)(defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`PageLayoutTab with id ${pageLayoutEntity.defaultTabToFocusOnMobileAndSidePanelId} not found for pageLayout ${pageLayoutEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    return {
        createdAt: pageLayoutEntity.createdAt.toISOString(),
        deletedAt: pageLayoutEntity.deletedAt?.toISOString() ?? null,
        updatedAt: pageLayoutEntity.updatedAt.toISOString(),
        id: pageLayoutEntity.id,
        name: pageLayoutEntity.name,
        type: pageLayoutEntity.type,
        objectMetadataId: pageLayoutEntity.objectMetadataId,
        workspaceId: pageLayoutEntity.workspaceId,
        universalIdentifier: pageLayoutEntity.universalIdentifier,
        applicationId: pageLayoutEntity.applicationId,
        tabIds: pageLayoutEntity.tabs.map((tab)=>tab.id),
        defaultTabToFocusOnMobileAndSidePanelId: pageLayoutEntity.defaultTabToFocusOnMobileAndSidePanelId,
        applicationUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        tabUniversalIdentifiers: pageLayoutEntity.tabs.map((tab)=>tab.universalIdentifier),
        defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier
    };
};

//# sourceMappingURL=transform-page-layout-entity-to-flat-page-layout.util.js.map