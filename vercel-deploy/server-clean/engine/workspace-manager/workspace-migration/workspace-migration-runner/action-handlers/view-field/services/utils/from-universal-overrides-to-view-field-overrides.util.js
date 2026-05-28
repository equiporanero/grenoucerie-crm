"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUniversalOverridesToViewFieldOverrides", {
    enumerable: true,
    get: function() {
        return fromUniversalOverridesToViewFieldOverrides;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const fromUniversalOverridesToViewFieldOverrides = ({ universalOverrides, flatViewFieldGroupMaps })=>{
    const { viewFieldGroupUniversalIdentifier, ...scalarOverrides } = universalOverrides;
    if (!(0, _utils.isDefined)(viewFieldGroupUniversalIdentifier)) {
        return {
            ...scalarOverrides,
            ...viewFieldGroupUniversalIdentifier === null ? {
                viewFieldGroupId: null
            } : {}
        };
    }
    const flatViewFieldGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        flatEntityMaps: flatViewFieldGroupMaps,
        universalIdentifier: viewFieldGroupUniversalIdentifier
    });
    return {
        ...scalarOverrides,
        viewFieldGroupId: flatViewFieldGroup?.id ?? null
    };
};

//# sourceMappingURL=from-universal-overrides-to-view-field-overrides.util.js.map