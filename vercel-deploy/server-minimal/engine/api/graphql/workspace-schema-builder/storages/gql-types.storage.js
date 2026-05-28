"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GqlTypesStorage", {
    enumerable: true,
    get: function() {
        return GqlTypesStorage;
    }
});
let GqlTypesStorage = class GqlTypesStorage {
    addGqlType(key, type) {
        this.gqlTypes.set(key, type);
    }
    getGqlTypeByKey(key) {
        return this.gqlTypes.get(key);
    }
    getAllGqlTypesExcept(keysToExclude) {
        return Array.from(this.gqlTypes.entries()).filter(([key])=>!keysToExclude.includes(key)).map(([, value])=>value);
    }
    constructor(){
        this.gqlTypes = new Map();
    }
};

//# sourceMappingURL=gql-types.storage.js.map