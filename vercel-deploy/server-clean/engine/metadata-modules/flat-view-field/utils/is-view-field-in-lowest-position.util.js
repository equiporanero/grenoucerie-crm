"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isViewFieldInLowestPosition", {
    enumerable: true,
    get: function() {
        return isViewFieldInLowestPosition;
    }
});
const isViewFieldInLowestPosition = ({ flatViewField, otherFlatViewFields })=>{
    if (otherFlatViewFields.length === 0) {
        return true;
    }
    const positions = otherFlatViewFields.map(({ position })=>position);
    const lowestPosition = Math.min(...positions);
    return flatViewField.position < lowestPosition;
};

//# sourceMappingURL=is-view-field-in-lowest-position.util.js.map