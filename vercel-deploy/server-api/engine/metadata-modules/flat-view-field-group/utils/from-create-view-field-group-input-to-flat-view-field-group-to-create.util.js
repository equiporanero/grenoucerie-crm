"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateViewFieldGroupInputToFlatViewFieldGroupToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateViewFieldGroupInputToFlatViewFieldGroupToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateViewFieldGroupInputToFlatViewFieldGroupToCreate = ({ createViewFieldGroupInput: rawCreateViewFieldGroupInput, flatApplication, flatViewMaps })=>{
    const { viewId, ...createViewFieldGroupInput } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreateViewFieldGroupInput, [
        'id',
        'name',
        'viewId'
    ]);
    const createdAt = new Date().toISOString();
    const viewFieldGroupId = createViewFieldGroupInput.id ?? (0, _uuid.v4)();
    const { viewUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'viewFieldGroup',
        foreignKeyValues: {
            viewId
        },
        flatEntityMaps: {
            flatViewMaps
        }
    });
    return {
        id: viewFieldGroupId,
        name: createViewFieldGroupInput.name,
        viewUniversalIdentifier,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: createViewFieldGroupInput.universalIdentifier ?? (0, _uuid.v4)(),
        position: createViewFieldGroupInput.position ?? 0,
        isVisible: createViewFieldGroupInput.isVisible ?? true,
        isActive: true,
        overrides: null,
        viewFieldUniversalIdentifiers: [],
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=from-create-view-field-group-input-to-flat-view-field-group-to-create.util.js.map