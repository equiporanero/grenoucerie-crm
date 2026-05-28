"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildActionHandlerKey", {
    enumerable: true,
    get: function() {
        return buildActionHandlerKey;
    }
});
const buildActionHandlerKey = (actionType, metadataName)=>`${actionType}_${metadataName}`;

//# sourceMappingURL=workspace-migration-action-common.js.map