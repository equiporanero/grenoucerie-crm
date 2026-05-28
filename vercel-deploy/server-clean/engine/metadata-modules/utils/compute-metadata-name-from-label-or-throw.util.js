"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeMetadataNameFromLabelOrThrow", {
    enumerable: true,
    get: function() {
        return computeMetadataNameFromLabelOrThrow;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _invalidmetadataexception = require("./exceptions/invalid-metadata.exception");
const computeMetadataNameFromLabelOrThrow = (label)=>{
    if (!(0, _utils.isDefined)(label)) {
        throw new _invalidmetadataexception.InvalidMetadataException('Label is required', _invalidmetadataexception.InvalidMetadataExceptionCode.LABEL_REQUIRED);
    }
    try {
        return (0, _metadata.computeMetadataNameFromLabel)({
            label
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new _invalidmetadataexception.InvalidMetadataException(error.message, _invalidmetadataexception.InvalidMetadataExceptionCode.INVALID_LABEL);
        }
        throw error;
    }
};

//# sourceMappingURL=compute-metadata-name-from-label-or-throw.util.js.map