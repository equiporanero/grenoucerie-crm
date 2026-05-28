"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildTimelineActivityRelatedMorphFieldMetadataName", {
    enumerable: true,
    get: function() {
        return buildTimelineActivityRelatedMorphFieldMetadataName;
    }
});
const _utils = require("twenty-shared/utils");
const buildTimelineActivityRelatedMorphFieldMetadataName = (name)=>{
    return `target${(0, _utils.capitalize)(name)}`;
};

//# sourceMappingURL=timeline-activity-related-morph-field-metadata-name-builder.util.js.map