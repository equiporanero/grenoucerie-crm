"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFlatRecordPageFieldsViewToCreate", {
    enumerable: true,
    get: function() {
        return computeFlatRecordPageFieldsViewToCreate;
    }
});
const _types = require("twenty-shared/types");
const _uuid = require("uuid");
const computeFlatRecordPageFieldsViewToCreate = ({ objectMetadata, flatApplication })=>{
    const createdAt = new Date().toISOString();
    return {
        id: (0, _uuid.v4)(),
        objectMetadataUniversalIdentifier: objectMetadata.universalIdentifier,
        name: `${objectMetadata.labelSingular} Record Page Fields`,
        key: null,
        icon: 'IconList',
        type: _types.ViewType.FIELDS_WIDGET,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        isCustom: true,
        anyFieldFilterValue: null,
        calendarFieldMetadataUniversalIdentifier: null,
        calendarLayout: null,
        isCompact: false,
        shouldHideEmptyGroups: false,
        kanbanAggregateOperation: null,
        kanbanAggregateOperationFieldMetadataUniversalIdentifier: null,
        mainGroupByFieldMetadataUniversalIdentifier: null,
        openRecordIn: _types.ViewOpenRecordIn.SIDE_PANEL,
        position: 0,
        universalIdentifier: (0, _uuid.v4)(),
        visibility: _types.ViewVisibility.WORKSPACE,
        createdByUserWorkspaceId: null,
        viewFieldUniversalIdentifiers: [],
        viewFieldGroupUniversalIdentifiers: [],
        viewFilterUniversalIdentifiers: [],
        viewGroupUniversalIdentifiers: [],
        viewFilterGroupUniversalIdentifiers: [],
        viewSortUniversalIdentifiers: [],
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=compute-flat-record-page-fields-view-to-create.util.js.map