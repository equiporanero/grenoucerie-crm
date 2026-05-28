"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SearchHelpCenterInputZodSchema", {
    enumerable: true,
    get: function() {
        return SearchHelpCenterInputZodSchema;
    }
});
const _zod = require("zod");
const SearchHelpCenterInputZodSchema = _zod.z.object({
    query: _zod.z.string().describe('The search query to find relevant help articles about Twenty')
});

//# sourceMappingURL=search-help-center-tool.schema.js.map