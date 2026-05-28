"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardViewFilterFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardViewFilterFlatMetadata;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardViewFilterFlatMetadata = ({ workspaceId, objectName, context: { viewName, viewFilterName, fieldName, operand, value, subFieldName = null, viewFilterGroupId = null, positionInViewFilterGroup = null }, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, now })=>{
    const objectDefinition = _metadata.STANDARD_OBJECTS[objectName];
    const viewDefinition = objectDefinition.views[viewName];
    const viewFilterDefinition = viewDefinition.viewFilters[viewFilterName];
    const fieldDefinition = objectDefinition.fields[fieldName];
    if (!(0, _utils.isDefined)(viewFilterDefinition)) {
        throw new Error(`Invalid configuration ${objectName} ${viewName.toString()} ${viewFilterName}`);
    }
    return {
        id: (0, _uuid.v4)(),
        universalIdentifier: viewFilterDefinition.universalIdentifier,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        viewId: standardObjectMetadataRelatedEntityIds[objectName].views[viewName].id,
        viewUniversalIdentifier: viewDefinition.universalIdentifier,
        fieldMetadataId: standardObjectMetadataRelatedEntityIds[objectName].fields[fieldName].id,
        fieldMetadataUniversalIdentifier: fieldDefinition.universalIdentifier,
        viewFilterGroupId,
        viewFilterGroupUniversalIdentifier: null,
        operand,
        value,
        subFieldName,
        relationTargetFieldMetadataId: null,
        relationTargetFieldMetadataUniversalIdentifier: null,
        positionInViewFilterGroup,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=create-standard-view-filter-flat-metadata.util.js.map