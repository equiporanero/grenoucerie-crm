"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromPageLayoutWidgetEntityToFlatPageLayoutWidget", {
    enumerable: true,
    get: function() {
        return fromPageLayoutWidgetEntityToFlatPageLayoutWidget;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const _frompagelayoutwidgetconfigurationtouniversalconfigurationutil = require("./from-page-layout-widget-configuration-to-universal-configuration.util");
const _frompagelayoutwidgetoverridestouniversaloverridesutil = require("./from-page-layout-widget-overrides-to-universal-overrides.util");
const fromPageLayoutWidgetEntityToFlatPageLayoutWidget = ({ entity: pageLayoutWidgetEntity, applicationIdToUniversalIdentifierMap, pageLayoutTabIdToUniversalIdentifierMap, objectMetadataIdToUniversalIdentifierMap, fieldMetadataUniversalIdentifierById, frontComponentUniversalIdentifierById, viewFieldGroupUniversalIdentifierById, viewUniversalIdentifierById })=>{
    const pageLayoutWidgetEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(pageLayoutWidgetEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('pageLayoutWidget'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(pageLayoutWidgetEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${pageLayoutWidgetEntity.applicationId} not found for pageLayoutWidget ${pageLayoutWidgetEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const pageLayoutTabUniversalIdentifier = pageLayoutTabIdToUniversalIdentifierMap.get(pageLayoutWidgetEntity.pageLayoutTabId);
    if (!(0, _utils.isDefined)(pageLayoutTabUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`PageLayoutTab with id ${pageLayoutWidgetEntity.pageLayoutTabId} not found for pageLayoutWidget ${pageLayoutWidgetEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let objectMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(pageLayoutWidgetEntity.objectMetadataId)) {
        objectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(pageLayoutWidgetEntity.objectMetadataId) ?? null;
        if (!(0, _utils.isDefined)(objectMetadataUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`ObjectMetadata with id ${pageLayoutWidgetEntity.objectMetadataId} not found for pageLayoutWidget ${pageLayoutWidgetEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    const configurationWithUniversalIdentifiers = (0, _frompagelayoutwidgetconfigurationtouniversalconfigurationutil.fromPageLayoutWidgetConfigurationToUniversalConfiguration)({
        configuration: pageLayoutWidgetEntityWithoutRelations.configuration,
        fieldMetadataUniversalIdentifierById,
        frontComponentUniversalIdentifierById,
        viewFieldGroupUniversalIdentifierById,
        viewUniversalIdentifierById
    });
    const pageLayoutTabUniversalIdentifierById = Object.fromEntries(pageLayoutTabIdToUniversalIdentifierMap.entries());
    const universalOverrides = (0, _utils.isDefined)(pageLayoutWidgetEntity.overrides) ? (0, _frompagelayoutwidgetoverridestouniversaloverridesutil.fromPageLayoutWidgetOverridesToUniversalOverrides)({
        overrides: pageLayoutWidgetEntity.overrides,
        pageLayoutTabUniversalIdentifierById,
        shouldThrowOnMissingIdentifier: false
    }) : null;
    return {
        ...pageLayoutWidgetEntityWithoutRelations,
        createdAt: pageLayoutWidgetEntity.createdAt.toISOString(),
        updatedAt: pageLayoutWidgetEntity.updatedAt.toISOString(),
        deletedAt: pageLayoutWidgetEntity.deletedAt?.toISOString() ?? null,
        universalIdentifier: pageLayoutWidgetEntityWithoutRelations.universalIdentifier,
        applicationId: pageLayoutWidgetEntityWithoutRelations.applicationId,
        applicationUniversalIdentifier,
        pageLayoutTabUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        universalConfiguration: configurationWithUniversalIdentifiers,
        universalOverrides
    };
};

//# sourceMappingURL=from-page-layout-widget-entity-to-flat-page-layout-widget.util.js.map