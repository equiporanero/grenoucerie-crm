"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatFrontComponentToFrontComponentDto", {
    enumerable: true,
    get: function() {
        return fromFlatFrontComponentToFrontComponentDto;
    }
});
const _utils = require("twenty-shared/utils");
const fromFlatFrontComponentToFrontComponentDto = (flatFrontComponent)=>({
        id: flatFrontComponent.id,
        name: flatFrontComponent.name,
        description: (0, _utils.isDefined)(flatFrontComponent.description) ? flatFrontComponent.description : undefined,
        sourceComponentPath: flatFrontComponent.sourceComponentPath,
        builtComponentPath: flatFrontComponent.builtComponentPath,
        componentName: flatFrontComponent.componentName,
        builtComponentChecksum: flatFrontComponent.builtComponentChecksum,
        universalIdentifier: (0, _utils.isDefined)(flatFrontComponent.universalIdentifier) ? flatFrontComponent.universalIdentifier : undefined,
        workspaceId: flatFrontComponent.workspaceId,
        applicationId: flatFrontComponent.applicationId,
        isHeadless: flatFrontComponent.isHeadless,
        usesSdkClient: flatFrontComponent.usesSdkClient,
        createdAt: new Date(flatFrontComponent.createdAt),
        updatedAt: new Date(flatFrontComponent.updatedAt)
    });

//# sourceMappingURL=from-flat-front-component-to-front-component-dto.util.js.map