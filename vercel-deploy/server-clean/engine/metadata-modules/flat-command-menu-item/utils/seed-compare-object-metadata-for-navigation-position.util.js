"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seedCompareObjectMetadataForNavigationPosition", {
    enumerable: true,
    get: function() {
        return seedCompareObjectMetadataForNavigationPosition;
    }
});
const seedCompareObjectMetadataForNavigationPosition = (a, b)=>{
    if (a.isSystem !== b.isSystem) {
        return a.isSystem ? 1 : -1;
    }
    return 0;
};

//# sourceMappingURL=seed-compare-object-metadata-for-navigation-position.util.js.map