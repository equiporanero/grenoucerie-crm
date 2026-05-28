"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateViewFilterGroupInputToFlatViewFilterGroupToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateViewFilterGroupInputToFlatViewFilterGroupToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _types = require("twenty-shared/types");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateViewFilterGroupInputToFlatViewFilterGroupToCreate = ({ createViewFilterGroupInput: rawCreateViewFilterGroupInput, flatApplication, flatViewMaps, flatViewFilterGroupMaps })=>{
    const { viewId, ...createViewFilterGroupInput } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreateViewFilterGroupInput, [
        'id',
        'viewId',
        'parentViewFilterGroupId'
    ]);
    const createdAt = new Date().toISOString();
    const viewFilterGroupId = createViewFilterGroupInput.id ?? (0, _uuid.v4)();
    const { viewUniversalIdentifier, parentViewFilterGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'viewFilterGroup',
        foreignKeyValues: {
            viewId,
            parentViewFilterGroupId: createViewFilterGroupInput.parentViewFilterGroupId
        },
        flatEntityMaps: {
            flatViewMaps,
            flatViewFilterGroupMaps
        }
    });
    return {
        id: viewFilterGroupId,
        viewUniversalIdentifier,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: viewFilterGroupId,
        logicalOperator: createViewFilterGroupInput.logicalOperator ?? _types.ViewFilterGroupLogicalOperator.AND,
        parentViewFilterGroupUniversalIdentifier,
        positionInViewFilterGroup: createViewFilterGroupInput.positionInViewFilterGroup ?? null,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        viewFilterUniversalIdentifiers: [],
        childViewFilterGroupUniversalIdentifiers: []
    };
};

//# sourceMappingURL=from-create-view-filter-group-input-to-flat-view-filter-group-to-create.util.js.map