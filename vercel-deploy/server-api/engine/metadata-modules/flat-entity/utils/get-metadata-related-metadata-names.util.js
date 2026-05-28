"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMetadataRelatedMetadataNames", {
    enumerable: true,
    get: function() {
        return getMetadataRelatedMetadataNames;
    }
});
const _getmetadatamanytoonerelatednamesutil = require("./get-metadata-many-to-one-related-names.util");
const _getmetadataonetomanyrelatednamesutil = require("./get-metadata-one-to-many-related-names.util");
const getMetadataRelatedMetadataNames = (metadataName)=>{
    const manyToOneMetadataNames = (0, _getmetadatamanytoonerelatednamesutil.getMetadataManyToOneRelatedNames)(metadataName);
    const oneToManyMetadataNames = (0, _getmetadataonetomanyrelatednamesutil.getMetadataOneToManyRelatedNames)(metadataName);
    return [
        ...new Set([
            ...manyToOneMetadataNames,
            ...oneToManyMetadataNames
        ])
    ];
};

//# sourceMappingURL=get-metadata-related-metadata-names.util.js.map