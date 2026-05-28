"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isFlatFieldMetadataNameSyncedWithLabel", {
    enumerable: true,
    get: function() {
        return isFlatFieldMetadataNameSyncedWithLabel;
    }
});
const _metadata = require("twenty-shared/metadata");
const _iscallertwentystandardapputil = require("../../utils/is-caller-twenty-standard-app.util");
const isFlatFieldMetadataNameSyncedWithLabel = ({ flatFieldMetadata, buildOptions })=>{
    const computedName = (0, _metadata.computeMetadataNameFromLabel)({
        label: flatFieldMetadata.label,
        applyCustomSuffix: !(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions)
    });
    return flatFieldMetadata.name === computedName;
};

//# sourceMappingURL=is-flat-field-metadata-name-synced-with-label.util.js.map