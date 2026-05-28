"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateViewInputToFlatViewToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateViewInputToFlatViewToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _types = require("twenty-shared/types");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _computeflatviewgroupsonviewcreateutil = require("../../flat-view-group/utils/compute-flat-view-groups-on-view-create.util");
const fromCreateViewInputToFlatViewToCreate = ({ createViewInput: rawCreateViewInput, createdByUserWorkspaceId, flatApplication, flatFieldMetadataMaps, flatObjectMetadataMaps })=>{
    const { objectMetadataId, ...createViewInput } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreateViewInput, [
        'id',
        'name',
        'objectMetadataId'
    ]);
    const createdAt = new Date().toISOString();
    const viewId = createViewInput.id ?? (0, _uuid.v4)();
    const { objectMetadataUniversalIdentifier, calendarFieldMetadataUniversalIdentifier, kanbanAggregateOperationFieldMetadataUniversalIdentifier, mainGroupByFieldMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'view',
        foreignKeyValues: {
            objectMetadataId,
            calendarFieldMetadataId: createViewInput.calendarFieldMetadataId,
            kanbanAggregateOperationFieldMetadataId: createViewInput.kanbanAggregateOperationFieldMetadataId,
            mainGroupByFieldMetadataId: createViewInput.mainGroupByFieldMetadataId
        },
        flatEntityMaps: {
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        }
    });
    const mainGroupByFieldMetadataId = createViewInput.mainGroupByFieldMetadataId ?? null;
    const flatViewToCreate = {
        id: viewId,
        objectMetadataUniversalIdentifier,
        name: createViewInput.name,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        isCustom: true,
        anyFieldFilterValue: createViewInput.anyFieldFilterValue ?? null,
        calendarFieldMetadataUniversalIdentifier,
        calendarLayout: createViewInput.calendarLayout ?? null,
        icon: createViewInput.icon,
        isCompact: createViewInput.isCompact ?? false,
        shouldHideEmptyGroups: createViewInput.shouldHideEmptyGroups ?? false,
        kanbanAggregateOperation: createViewInput.kanbanAggregateOperation ?? null,
        kanbanAggregateOperationFieldMetadataUniversalIdentifier,
        mainGroupByFieldMetadataUniversalIdentifier,
        key: createViewInput.key ?? null,
        openRecordIn: createViewInput.openRecordIn ?? _types.ViewOpenRecordIn.SIDE_PANEL,
        position: createViewInput.position ?? 0,
        type: createViewInput.type ?? _types.ViewType.TABLE,
        universalIdentifier: createViewInput.universalIdentifier ?? (0, _uuid.v4)(),
        visibility: createViewInput.visibility ?? _types.ViewVisibility.WORKSPACE,
        createdByUserWorkspaceId: createdByUserWorkspaceId ?? null,
        viewFieldUniversalIdentifiers: [],
        viewFilterUniversalIdentifiers: [],
        viewGroupUniversalIdentifiers: [],
        viewFieldGroupUniversalIdentifiers: [],
        viewFilterGroupUniversalIdentifiers: [],
        viewSortUniversalIdentifiers: [],
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
    let flatViewGroupsToCreate = [];
    if ((0, _utils.isDefined)(mainGroupByFieldMetadataId)) {
        flatViewGroupsToCreate = (0, _computeflatviewgroupsonviewcreateutil.computeFlatViewGroupsOnViewCreate)({
            flatViewToCreateUniversalIdentifier: flatViewToCreate.universalIdentifier,
            mainGroupByFieldMetadataId,
            flatFieldMetadataMaps
        });
    }
    return {
        flatViewToCreate,
        flatViewGroupsToCreate
    };
};

//# sourceMappingURL=from-create-view-input-to-flat-view-to-create.util.js.map