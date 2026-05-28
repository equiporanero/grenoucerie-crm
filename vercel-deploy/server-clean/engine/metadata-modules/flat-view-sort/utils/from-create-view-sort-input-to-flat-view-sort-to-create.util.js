"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateViewSortInputToFlatViewSortToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateViewSortInputToFlatViewSortToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _types = require("twenty-shared/types");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateViewSortInputToFlatViewSortToCreate = ({ createViewSortInput: rawCreateViewSortInput, flatApplication, flatFieldMetadataMaps, flatViewMaps })=>{
    const { viewId, fieldMetadataId, ...createViewSortInput } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreateViewSortInput, [
        'fieldMetadataId',
        'id',
        'viewId'
    ]);
    const createdAt = new Date().toISOString();
    const viewSortId = createViewSortInput.id ?? (0, _uuid.v4)();
    const { fieldMetadataUniversalIdentifier, viewUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'viewSort',
        foreignKeyValues: {
            fieldMetadataId,
            viewId
        },
        flatEntityMaps: {
            flatFieldMetadataMaps,
            flatViewMaps
        }
    });
    return {
        id: viewSortId,
        fieldMetadataUniversalIdentifier,
        viewUniversalIdentifier,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: createViewSortInput.universalIdentifier ?? (0, _uuid.v4)(),
        direction: createViewSortInput.direction ?? _types.ViewSortDirection.ASC,
        subFieldName: createViewSortInput.subFieldName ?? null,
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=from-create-view-sort-input-to-flat-view-sort-to-create.util.js.map