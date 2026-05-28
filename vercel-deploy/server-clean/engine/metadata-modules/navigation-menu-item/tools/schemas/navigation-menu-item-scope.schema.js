"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "navigationMenuItemScopeSchema", {
    enumerable: true,
    get: function() {
        return navigationMenuItemScopeSchema;
    }
});
const _zod = require("zod");
const navigationMenuItemScopeSchema = _zod.z.enum([
    'workspace',
    'user'
]).describe("'user' creates a personal favorite, visible only to the current user. " + "'workspace' creates a shared navigation menu item visible to everyone (requires the LAYOUTS permission). " + 'Twenty has no separate Favorites concept — favorites are just navigation menu items with scope=user.');

//# sourceMappingURL=navigation-menu-item-scope.schema.js.map