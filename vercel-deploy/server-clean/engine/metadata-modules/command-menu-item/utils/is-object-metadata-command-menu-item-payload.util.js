"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isObjectMetadataCommandMenuItemPayload", {
    enumerable: true,
    get: function() {
        return isObjectMetadataCommandMenuItemPayload;
    }
});
const _utils = require("twenty-shared/utils");
const isObjectMetadataCommandMenuItemPayload = (payload)=>(0, _utils.isDefined)(payload) && 'objectMetadataItemId' in payload;

//# sourceMappingURL=is-object-metadata-command-menu-item-payload.util.js.map