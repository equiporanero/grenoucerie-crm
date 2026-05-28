"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardViewFieldFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardViewFieldFlatMetadata;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardViewFieldFlatMetadata = ({ workspaceId, objectName, context: { viewName, viewFieldName, fieldName, position, isVisible, size, aggregateOperation = null, viewFieldGroupName = null }, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, now })=>{
    const objectDefinition = _metadata.STANDARD_OBJECTS[objectName];
    const viewDefinition = objectDefinition.views[viewName];
    const viewFieldDefinition = viewDefinition.viewFields[viewFieldName];
    const fieldDefinition = objectDefinition.fields[fieldName];
    if (!(0, _utils.isDefined)(viewFieldDefinition)) {
        throw new Error(`Invalid configuration ${objectName} ${viewName.toString()} ${viewFieldName}`);
    }
    let viewFieldGroupId = null;
    let viewFieldGroupUniversalIdentifier = null;
    if ((0, _utils.isDefined)(viewFieldGroupName)) {
        const viewFieldGroupDefinition = viewDefinition.viewFieldGroups?.[viewFieldGroupName];
        if (!(0, _utils.isDefined)(viewFieldGroupDefinition)) {
            throw new Error(`Invalid view field group ${objectName} ${viewName.toString()} ${String(viewFieldGroupName)}`);
        }
        viewFieldGroupUniversalIdentifier = viewFieldGroupDefinition.universalIdentifier;
        viewFieldGroupId = standardObjectMetadataRelatedEntityIds[objectName].views[viewName].viewFieldGroups[viewFieldGroupName].id;
    }
    return {
        id: (0, _uuid.v4)(),
        universalIdentifier: viewFieldDefinition.universalIdentifier,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        viewId: standardObjectMetadataRelatedEntityIds[objectName].views[viewName].id,
        viewUniversalIdentifier: viewDefinition.universalIdentifier,
        fieldMetadataId: standardObjectMetadataRelatedEntityIds[objectName].fields[fieldName].id,
        fieldMetadataUniversalIdentifier: fieldDefinition.universalIdentifier,
        viewFieldGroupId,
        viewFieldGroupUniversalIdentifier,
        position,
        isVisible,
        size,
        aggregateOperation,
        isActive: true,
        overrides: null,
        universalOverrides: null,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=create-standard-view-field-flat-metadata.util.js.map