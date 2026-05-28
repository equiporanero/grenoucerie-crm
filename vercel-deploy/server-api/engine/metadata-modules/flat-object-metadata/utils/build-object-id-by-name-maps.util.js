"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildObjectIdByNameMaps", {
    enumerable: true,
    get: function() {
        return buildObjectIdByNameMaps;
    }
});
const _utils = require("twenty-shared/utils");
const buildObjectIdByNameMaps = (flatObjectMetadataMaps)=>{
    const idByNameSingular = {};
    const idByNamePlural = {};
    for (const objectMetadata of Object.values(flatObjectMetadataMaps.byUniversalIdentifier)){
        if (!(0, _utils.isDefined)(objectMetadata)) {
            continue;
        }
        idByNameSingular[objectMetadata.nameSingular] = objectMetadata.id;
        idByNamePlural[objectMetadata.namePlural] = objectMetadata.id;
    }
    return {
        idByNameSingular,
        idByNamePlural
    };
};

//# sourceMappingURL=build-object-id-by-name-maps.util.js.map