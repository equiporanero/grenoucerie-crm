"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigateAppInputZodSchema", {
    enumerable: true,
    get: function() {
        return NavigateAppInputZodSchema;
    }
});
const _zod = require("zod");
const NavigateAppInputZodSchema = _zod.z.discriminatedUnion('type', [
    _zod.z.object({
        type: _zod.z.literal('navigateToView').describe('Navigate to a specific view by name. ONLY use this type when the user explicitly mentions the word "view" (e.g. "go to the My Companies view", "open view All People"). Do NOT use this for general navigation requests.'),
        viewName: _zod.z.string().describe('The name of the view to navigate to (e.g. "My Companies", "All People")')
    }),
    _zod.z.object({
        type: _zod.z.literal('navigateToObject').describe('Navigate to the default view for an object. This is the PREFERRED and DEFAULT type for all navigation requests unless the user explicitly mentions the word "view".'),
        objectNameSingular: _zod.z.string().describe('The singular name of the object to navigate to (e.g. "company", "person", "opportunity")')
    }),
    _zod.z.object({
        type: _zod.z.literal('navigateToRecord').describe('Navigate to a specific record page. Use this when the user wants to go to a particular record by name (e.g. "go to the company Acme", "open the person John Doe", "show me the deal Enterprise Plan").'),
        objectNameSingular: _zod.z.string().describe('The singular name of the object type (e.g. "company", "person", "opportunity")'),
        recordName: _zod.z.string().describe('The name or label of the record to navigate to (e.g. "Acme", "John Doe", "Enterprise Plan")')
    }),
    _zod.z.object({
        type: _zod.z.literal('wait').describe('Wait for a specified duration in milliseconds before continuing. Useful when you need the page to fully load after a navigation before taking further actions (e.g. 2000 for 2 seconds).'),
        durationMs: _zod.z.number().int().min(0).max(30000).describe('The duration in milliseconds to wait (e.g. 2000 for 2 seconds). Maximum 30000 (30 seconds).')
    })
]);

//# sourceMappingURL=navigate-app-tool.schema.js.map