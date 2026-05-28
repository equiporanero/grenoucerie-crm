"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateViewFilterInputToFlatViewFilterToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateViewFilterInputToFlatViewFilterToCreate;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _findflatentitybyuniversalidentifierutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _getdefaultviewfilteroperandutil = require("./get-default-view-filter-operand.util");
const fromCreateViewFilterInputToFlatViewFilterToCreate = ({ createViewFilterInput: rawCreateViewFilterInput, flatApplication, flatFieldMetadataMaps, flatViewMaps, flatViewFilterGroupMaps })=>{
    const { fieldMetadataId, viewId, value, ...createViewFilterInput } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreateViewFilterInput, [
        'fieldMetadataId',
        'id',
        'viewId',
        'viewFilterGroupId',
        'operand',
        'subFieldName',
        'relationTargetFieldMetadataId'
    ]);
    const createdAt = new Date().toISOString();
    const viewFilterId = createViewFilterInput.id ?? (0, _uuid.v4)();
    const { fieldMetadataUniversalIdentifier, viewUniversalIdentifier, viewFilterGroupUniversalIdentifier, relationTargetFieldMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'viewFilter',
        foreignKeyValues: {
            fieldMetadataId,
            viewId,
            viewFilterGroupId: createViewFilterInput.viewFilterGroupId,
            relationTargetFieldMetadataId: createViewFilterInput.relationTargetFieldMetadataId
        },
        flatEntityMaps: {
            flatFieldMetadataMaps,
            flatViewMaps,
            flatViewFilterGroupMaps
        }
    });
    const referencedFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        universalIdentifier: fieldMetadataUniversalIdentifier,
        flatEntityMaps: flatFieldMetadataMaps
    });
    const relationTargetFieldMetadata = (0, _utils.isDefined)(relationTargetFieldMetadataUniversalIdentifier) ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        universalIdentifier: relationTargetFieldMetadataUniversalIdentifier,
        flatEntityMaps: flatFieldMetadataMaps
    }) : undefined;
    const operand = createViewFilterInput.operand ?? ((0, _utils.isDefined)(referencedFieldMetadata) ? (0, _getdefaultviewfilteroperandutil.getDefaultViewFilterOperand)({
        fieldType: referencedFieldMetadata.type,
        subFieldName: createViewFilterInput.subFieldName,
        relationTargetFieldType: relationTargetFieldMetadata?.type
    }) : undefined) ?? _types.ViewFilterOperand.CONTAINS;
    return {
        id: viewFilterId,
        fieldMetadataUniversalIdentifier,
        viewUniversalIdentifier,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: createViewFilterInput.universalIdentifier ?? (0, _uuid.v4)(),
        operand,
        value,
        viewFilterGroupUniversalIdentifier,
        positionInViewFilterGroup: createViewFilterInput.positionInViewFilterGroup ?? null,
        subFieldName: createViewFilterInput.subFieldName ?? null,
        relationTargetFieldMetadataUniversalIdentifier,
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=from-create-view-filter-input-to-flat-view-filter-to-create.util.js.map