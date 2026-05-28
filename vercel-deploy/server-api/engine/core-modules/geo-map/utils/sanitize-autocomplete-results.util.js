"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizeAutocompleteResults", {
    enumerable: true,
    get: function() {
        return sanitizeAutocompleteResults;
    }
});
const _utils = require("twenty-shared/utils");
const sanitizeAutocompleteResults = (autocompleteResults)=>{
    if (!(0, _utils.isNonEmptyArray)(autocompleteResults)) return [];
    return autocompleteResults.map((result)=>({
            text: result.description,
            placeId: result.place_id
        }));
};

//# sourceMappingURL=sanitize-autocomplete-results.util.js.map