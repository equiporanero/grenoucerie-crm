"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "areFlatObjectMetadataNamesSyncedWithLabels", {
    enumerable: true,
    get: function() {
        return areFlatObjectMetadataNamesSyncedWithLabels;
    }
});
const _metadata = require("twenty-shared/metadata");
const _iscallertwentystandardapputil = require("../../utils/is-caller-twenty-standard-app.util");
const areFlatObjectMetadataNamesSyncedWithLabels = ({ flatObjectMetadata, buildOptions })=>{
    const { nameSingular: computedSingularName, namePlural: computedPluralName } = (0, _metadata.computeMetadataNamesFromLabelsOrThrow)({
        labelSingular: flatObjectMetadata.labelSingular,
        labelPlural: flatObjectMetadata.labelPlural,
        applyCustomSuffix: !(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions)
    });
    return flatObjectMetadata.nameSingular === computedSingularName && flatObjectMetadata.namePlural === computedPluralName;
};

//# sourceMappingURL=are-flat-object-metadata-names-synced-with-labels.util.js.map