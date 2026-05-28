"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildFlatPageLayoutWidgetCommonProperties", {
    enumerable: true,
    get: function() {
        return buildFlatPageLayoutWidgetCommonProperties;
    }
});
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const buildFlatPageLayoutWidgetCommonProperties = ({ widgetInput, flatPageLayoutTabMaps, flatObjectMetadataMaps })=>{
    const { pageLayoutTabUniversalIdentifier, objectMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'pageLayoutWidget',
        foreignKeyValues: {
            pageLayoutTabId: widgetInput.pageLayoutTabId,
            objectMetadataId: widgetInput.objectMetadataId
        },
        flatEntityMaps: {
            flatPageLayoutTabMaps,
            flatObjectMetadataMaps
        }
    });
    return {
        pageLayoutTabId: widgetInput.pageLayoutTabId,
        pageLayoutTabUniversalIdentifier,
        title: widgetInput.title,
        type: widgetInput.type,
        objectMetadataId: widgetInput.objectMetadataId ?? null,
        objectMetadataUniversalIdentifier,
        gridPosition: widgetInput.gridPosition,
        position: widgetInput.position ?? null
    };
};

//# sourceMappingURL=build-flat-page-layout-widget-common-properties.util.js.map