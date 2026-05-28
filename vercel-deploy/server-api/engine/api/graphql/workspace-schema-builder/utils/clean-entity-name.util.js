"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cleanEntityName", {
    enumerable: true,
    get: function() {
        return cleanEntityName;
    }
});
const _camelcase = require("../../../../../utils/camel-case");
const cleanEntityName = (entityName)=>{
    // Remove all leading numbers
    let camelCasedEntityName = entityName.replace(/^[0-9]+/, '');
    // Trim the string
    camelCasedEntityName = camelCasedEntityName.trim();
    // Camel case the string
    camelCasedEntityName = (0, _camelcase.camelCase)(camelCasedEntityName);
    // Remove all special characters but keep alphabets and numbers
    camelCasedEntityName = camelCasedEntityName.replace(/[^a-zA-Z0-9]/g, '');
    return camelCasedEntityName;
};

//# sourceMappingURL=clean-entity-name.util.js.map