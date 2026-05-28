"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformPageLayoutTabEntityToFlatPageLayoutTab", {
    enumerable: true,
    get: function() {
        return transformPageLayoutTabEntityToFlatPageLayoutTab;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const transformPageLayoutTabEntityToFlatPageLayoutTab = ({ entity: pageLayoutTabEntity, applicationIdToUniversalIdentifierMap, pageLayoutIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(pageLayoutTabEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${pageLayoutTabEntity.applicationId} not found for pageLayoutTab ${pageLayoutTabEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const pageLayoutUniversalIdentifier = pageLayoutIdToUniversalIdentifierMap.get(pageLayoutTabEntity.pageLayoutId);
    if (!(0, _utils.isDefined)(pageLayoutUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`PageLayout with id ${pageLayoutTabEntity.pageLayoutId} not found for pageLayoutTab ${pageLayoutTabEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        createdAt: pageLayoutTabEntity.createdAt.toISOString(),
        deletedAt: pageLayoutTabEntity.deletedAt?.toISOString() ?? null,
        updatedAt: pageLayoutTabEntity.updatedAt.toISOString(),
        id: pageLayoutTabEntity.id,
        title: pageLayoutTabEntity.title,
        position: pageLayoutTabEntity.position,
        isActive: pageLayoutTabEntity.isActive,
        pageLayoutId: pageLayoutTabEntity.pageLayoutId,
        workspaceId: pageLayoutTabEntity.workspaceId,
        universalIdentifier: pageLayoutTabEntity.universalIdentifier,
        applicationId: pageLayoutTabEntity.applicationId,
        widgetIds: pageLayoutTabEntity.widgets.map((widget)=>widget.id),
        icon: pageLayoutTabEntity.icon,
        layoutMode: pageLayoutTabEntity.layoutMode,
        applicationUniversalIdentifier,
        pageLayoutUniversalIdentifier,
        widgetUniversalIdentifiers: pageLayoutTabEntity.widgets.map((widget)=>widget.universalIdentifier),
        overrides: pageLayoutTabEntity.overrides ?? null
    };
};

//# sourceMappingURL=transform-page-layout-tab-entity-to-flat-page-layout-tab.util.js.map