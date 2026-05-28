"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "graphQLBuildFragmentMap", {
    enumerable: true,
    get: function() {
        return graphQLBuildFragmentMap;
    }
});
const _graphql = require("graphql");
const graphQLBuildFragmentMap = (document)=>{
    const map = new Map();
    for (const definition of document.definitions){
        if (definition.kind === _graphql.Kind.FRAGMENT_DEFINITION) {
            map.set(definition.name.value, definition);
        }
    }
    return map;
};

//# sourceMappingURL=graphql-build-fragment-map.util.js.map