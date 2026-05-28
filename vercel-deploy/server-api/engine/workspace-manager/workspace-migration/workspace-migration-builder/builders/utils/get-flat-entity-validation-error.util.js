"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getEmptyFlatEntityValidationError", {
    enumerable: true,
    get: function() {
        return getEmptyFlatEntityValidationError;
    }
});
const getEmptyFlatEntityValidationError = ({ metadataName, flatEntityMinimalInformation, type })=>{
    return {
        errors: [],
        flatEntityMinimalInformation,
        metadataName,
        type
    };
};

//# sourceMappingURL=get-flat-entity-validation-error.util.js.map