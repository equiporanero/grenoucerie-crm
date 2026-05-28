"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateViewFieldInputToFlatViewFieldToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateViewFieldInputToFlatViewFieldToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _defaultviewfieldsizeconstant = require("../constants/default-view-field-size.constant");
const fromCreateViewFieldInputToFlatViewFieldToCreate = ({ createViewFieldInput: rawCreateViewFieldInput, flatApplication, flatFieldMetadataMaps, flatViewMaps, flatViewFieldGroupMaps })=>{
    const { fieldMetadataId, viewId, viewFieldGroupId, ...createViewFieldInput } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreateViewFieldInput, [
        'aggregateOperation',
        'fieldMetadataId',
        'id',
        'viewId',
        'viewFieldGroupId'
    ]);
    const createdAt = new Date().toISOString();
    const viewFieldId = createViewFieldInput.id ?? (0, _uuid.v4)();
    const { fieldMetadataUniversalIdentifier, viewUniversalIdentifier, viewFieldGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'viewField',
        foreignKeyValues: {
            fieldMetadataId,
            viewId,
            viewFieldGroupId
        },
        flatEntityMaps: {
            flatFieldMetadataMaps,
            flatViewMaps,
            flatViewFieldGroupMaps
        }
    });
    return {
        id: viewFieldId,
        fieldMetadataUniversalIdentifier,
        viewUniversalIdentifier,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: createViewFieldInput.universalIdentifier ?? (0, _uuid.v4)(),
        isVisible: createViewFieldInput.isVisible ?? true,
        size: createViewFieldInput.size ?? _defaultviewfieldsizeconstant.DEFAULT_VIEW_FIELD_SIZE,
        position: createViewFieldInput.position ?? 0,
        aggregateOperation: createViewFieldInput.aggregateOperation ?? null,
        isActive: true,
        universalOverrides: null,
        viewFieldGroupUniversalIdentifier,
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=from-create-view-field-input-to-flat-view-field-to-create.util.js.map