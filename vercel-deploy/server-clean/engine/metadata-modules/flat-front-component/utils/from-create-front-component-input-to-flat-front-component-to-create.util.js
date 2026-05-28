"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateFrontComponentInputToFlatFrontComponentToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateFrontComponentInputToFlatFrontComponentToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const fromCreateFrontComponentInputToFlatFrontComponentToCreate = ({ createFrontComponentInput, workspaceId, flatApplication })=>{
    const now = new Date().toISOString();
    const { name } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(createFrontComponentInput, [
        'name'
    ]);
    const id = createFrontComponentInput.id ?? (0, _uuid.v4)();
    const universalIdentifier = createFrontComponentInput.universalIdentifier ?? (0, _uuid.v4)();
    return {
        id,
        name: name ?? createFrontComponentInput.componentName,
        description: createFrontComponentInput.description ?? null,
        sourceComponentPath: createFrontComponentInput.sourceComponentPath,
        builtComponentPath: createFrontComponentInput.builtComponentPath,
        componentName: createFrontComponentInput.componentName,
        builtComponentChecksum: createFrontComponentInput.builtComponentChecksum,
        isHeadless: createFrontComponentInput.isHeadless ?? false,
        usesSdkClient: false,
        workspaceId,
        createdAt: now,
        updatedAt: now,
        universalIdentifier,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=from-create-front-component-input-to-flat-front-component-to-create.util.js.map