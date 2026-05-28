"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "graphQLBuildPartialResolveInfo", {
    enumerable: true,
    get: function() {
        return graphQLBuildPartialResolveInfo;
    }
});
const graphQLBuildPartialResolveInfo = (field, fragmentMap)=>({
        fieldNodes: [
            field
        ],
        fragments: Object.fromEntries(fragmentMap)
    });

//# sourceMappingURL=graphql-build-partial-resolve-info.util.js.map