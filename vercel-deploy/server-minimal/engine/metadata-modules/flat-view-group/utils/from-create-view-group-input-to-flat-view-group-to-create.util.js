"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateViewGroupInputToFlatViewGroupToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateViewGroupInputToFlatViewGroupToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateViewGroupInputToFlatViewGroupToCreate = ({ createViewGroupInput: rawCreateViewGroupInput, flatApplication, flatViewMaps })=>{
    const { viewId, ...createViewGroupInput } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreateViewGroupInput, [
        'fieldValue',
        'id',
        'viewId'
    ]);
    const createdAt = new Date().toISOString();
    const viewGroupId = createViewGroupInput.id ?? (0, _uuid.v4)();
    const { viewUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'viewGroup',
        foreignKeyValues: {
            viewId
        },
        flatEntityMaps: {
            flatViewMaps
        }
    });
    return {
        id: viewGroupId,
        viewUniversalIdentifier,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: createViewGroupInput.universalIdentifier ?? (0, _uuid.v4)(),
        isVisible: createViewGroupInput.isVisible ?? true,
        fieldValue: createViewGroupInput.fieldValue,
        position: createViewGroupInput.position ?? 0,
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=from-create-view-group-input-to-flat-view-group-to-create.util.js.map