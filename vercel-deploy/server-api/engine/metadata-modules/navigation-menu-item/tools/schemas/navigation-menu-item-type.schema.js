"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "navigationMenuItemTypeSchema", {
    enumerable: true,
    get: function() {
        return navigationMenuItemTypeSchema;
    }
});
const _types = require("twenty-shared/types");
const _zod = require("zod");
const navigationMenuItemTypeSchema = _zod.z.enum([
    _types.NavigationMenuItemType.FOLDER,
    _types.NavigationMenuItemType.LINK,
    _types.NavigationMenuItemType.OBJECT,
    _types.NavigationMenuItemType.VIEW,
    _types.NavigationMenuItemType.RECORD,
    _types.NavigationMenuItemType.PAGE_LAYOUT
]);

//# sourceMappingURL=navigation-menu-item-type.schema.js.map