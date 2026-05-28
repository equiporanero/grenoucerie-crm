"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewFieldOverridesToUniversalOverrides", {
    enumerable: true,
    get: function() {
        return fromViewFieldOverridesToUniversalOverrides;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromViewFieldOverridesToUniversalOverrides = ({ overrides, viewFieldGroupUniversalIdentifierById, shouldThrowOnMissingIdentifier = true })=>{
    const { viewFieldGroupId, ...scalarOverrides } = overrides;
    if (!(0, _utils.isDefined)(viewFieldGroupId)) {
        return {
            ...scalarOverrides,
            ...viewFieldGroupId === null ? {
                viewFieldGroupUniversalIdentifier: null
            } : {}
        };
    }
    const viewFieldGroupUniversalIdentifier = viewFieldGroupUniversalIdentifierById[viewFieldGroupId];
    if (!(0, _utils.isDefined)(viewFieldGroupUniversalIdentifier)) {
        if (shouldThrowOnMissingIdentifier) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`ViewFieldGroup universal identifier not found for id: ${viewFieldGroupId}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND);
        }
        return {
            ...scalarOverrides,
            viewFieldGroupUniversalIdentifier: null
        };
    }
    return {
        ...scalarOverrides,
        viewFieldGroupUniversalIdentifier
    };
};

//# sourceMappingURL=from-view-field-overrides-to-universal-overrides.util.js.map