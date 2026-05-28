"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMetadataFlatEntityMapsKey", {
    enumerable: true,
    get: function() {
        return getMetadataFlatEntityMapsKey;
    }
});
const _utils = require("twenty-shared/utils");
const getMetadataFlatEntityMapsKey = (metadataName)=>`flat${(0, _utils.capitalize)(metadataName)}Maps`;

//# sourceMappingURL=get-metadata-flat-entity-maps-key.util.js.map