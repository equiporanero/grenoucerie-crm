"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMetadataNameFromFlatEntityMapsKey", {
    enumerable: true,
    get: function() {
        return getMetadataNameFromFlatEntityMapsKey;
    }
});
const _utils = require("twenty-shared/utils");
const getMetadataNameFromFlatEntityMapsKey = (flatEntityMapsKey)=>{
    const withoutPrefix = flatEntityMapsKey.replace(/^flat/, '');
    const withoutSuffix = withoutPrefix.replace(/Maps$/, '');
    return (0, _utils.uncapitalize)(withoutSuffix);
};

//# sourceMappingURL=get-metadata-name-from-flat-entity-maps-key.util.js.map