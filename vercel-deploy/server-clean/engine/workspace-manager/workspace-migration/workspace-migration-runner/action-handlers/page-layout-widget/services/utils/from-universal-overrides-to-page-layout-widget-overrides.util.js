"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUniversalOverridesToPageLayoutWidgetOverrides", {
    enumerable: true,
    get: function() {
        return fromUniversalOverridesToPageLayoutWidgetOverrides;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const fromUniversalOverridesToPageLayoutWidgetOverrides = ({ universalOverrides, flatPageLayoutTabMaps })=>{
    const { pageLayoutTabUniversalIdentifier, ...scalarOverrides } = universalOverrides;
    if (!(0, _utils.isDefined)(pageLayoutTabUniversalIdentifier)) {
        return {
            ...scalarOverrides
        };
    }
    const flatPageLayoutTab = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
        flatEntityMaps: flatPageLayoutTabMaps,
        universalIdentifier: pageLayoutTabUniversalIdentifier
    });
    return {
        ...scalarOverrides,
        pageLayoutTabId: flatPageLayoutTab.id
    };
};

//# sourceMappingURL=from-universal-overrides-to-page-layout-widget-overrides.util.js.map