"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateNullable", {
    enumerable: true,
    get: function() {
        return generateNullable;
    }
});
function generateNullable(inputNullableValue, isRemoteCreation) {
    if (isRemoteCreation) {
        return true;
    }
    return inputNullableValue ?? true;
}

//# sourceMappingURL=generate-nullable.js.map