"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sortMetadataNamesChildrenFirst", {
    enumerable: true,
    get: function() {
        return sortMetadataNamesChildrenFirst;
    }
});
const _metadata = require("twenty-shared/metadata");
const _getmetadatamanytoonerelatednamesutil = require("./get-metadata-many-to-one-related-names.util");
const _getmetadataonetomanyrelatednamesutil = require("./get-metadata-one-to-many-related-names.util");
const computeDependencyScore = (metadataName)=>{
    const manyToOneCount = (0, _getmetadatamanytoonerelatednamesutil.getMetadataManyToOneRelatedNames)(metadataName).length;
    const oneToManyCount = (0, _getmetadataonetomanyrelatednamesutil.getMetadataOneToManyRelatedNames)(metadataName).length;
    return manyToOneCount - oneToManyCount;
};
const sortMetadataNamesChildrenFirst = ()=>{
    const metadataNames = Object.keys(_metadata.ALL_METADATA_NAME);
    return metadataNames.sort((metadataNameA, metadataNameB)=>{
        const scoreA = computeDependencyScore(metadataNameA);
        const scoreB = computeDependencyScore(metadataNameB);
        if (scoreA !== scoreB) {
            return scoreB - scoreA;
        }
        return metadataNameA.localeCompare(metadataNameB);
    });
};

//# sourceMappingURL=sort-metadata-names-children-first.util.js.map