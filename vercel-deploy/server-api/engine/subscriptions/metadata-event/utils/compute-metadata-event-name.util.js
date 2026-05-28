"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeMetadataEventName", {
    enumerable: true,
    get: function() {
        return computeMetadataEventName;
    }
});
const computeMetadataEventName = ({ metadataName, type })=>`metadata.${metadataName}.${type}`;

//# sourceMappingURL=compute-metadata-event-name.util.js.map