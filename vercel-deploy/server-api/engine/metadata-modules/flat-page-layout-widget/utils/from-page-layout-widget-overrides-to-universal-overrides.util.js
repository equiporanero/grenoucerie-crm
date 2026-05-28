"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromPageLayoutWidgetOverridesToUniversalOverrides", {
    enumerable: true,
    get: function() {
        return fromPageLayoutWidgetOverridesToUniversalOverrides;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromPageLayoutWidgetOverridesToUniversalOverrides = ({ overrides, pageLayoutTabUniversalIdentifierById, shouldThrowOnMissingIdentifier = true })=>{
    const { pageLayoutTabId, ...scalarOverrides } = overrides;
    if (!(0, _utils.isDefined)(pageLayoutTabId)) {
        return {
            ...scalarOverrides,
            ...pageLayoutTabId === null ? {
                pageLayoutTabUniversalIdentifier: null
            } : {}
        };
    }
    const pageLayoutTabUniversalIdentifier = pageLayoutTabUniversalIdentifierById[pageLayoutTabId];
    if (!(0, _utils.isDefined)(pageLayoutTabUniversalIdentifier)) {
        if (shouldThrowOnMissingIdentifier) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`PageLayoutTab universal identifier not found for id: ${pageLayoutTabId}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND);
        }
        return {
            ...scalarOverrides,
            pageLayoutTabUniversalIdentifier: null
        };
    }
    return {
        ...scalarOverrides,
        pageLayoutTabUniversalIdentifier
    };
};

//# sourceMappingURL=from-page-layout-widget-overrides-to-universal-overrides.util.js.map