"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findPageLayoutTabIdInCreatePageLayoutContext", {
    enumerable: true,
    get: function() {
        return findPageLayoutTabIdInCreatePageLayoutContext;
    }
});
const _utils = require("twenty-shared/utils");
const findPageLayoutTabIdInCreatePageLayoutContext = ({ universalIdentifier, tabIdByUniversalIdentifier, flatPageLayoutTabMaps })=>{
    const providedId = tabIdByUniversalIdentifier?.[universalIdentifier];
    if ((0, _utils.isDefined)(providedId)) {
        return providedId;
    }
    const existingTab = flatPageLayoutTabMaps.byUniversalIdentifier[universalIdentifier];
    return existingTab?.id ?? null;
};

//# sourceMappingURL=find-page-layout-tab-id-in-create-page-layout-context.util.js.map