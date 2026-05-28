"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardViewFieldGroupFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardViewFieldGroupFlatMetadata;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardViewFieldGroupFlatMetadata = ({ workspaceId, objectName, context: { viewName, viewFieldGroupName, name, position, isVisible }, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, now })=>{
    // @ts-expect-error ignore
    const viewDefinition = _metadata.STANDARD_OBJECTS[objectName].views[viewName];
    const viewFieldGroupDefinition = viewDefinition.viewFieldGroups[viewFieldGroupName];
    if (!(0, _utils.isDefined)(viewFieldGroupDefinition)) {
        throw new Error(`Invalid configuration ${objectName} ${viewName.toString()} ${String(viewFieldGroupName)}`);
    }
    return {
        id: standardObjectMetadataRelatedEntityIds[objectName].views[viewName].viewFieldGroups[viewFieldGroupName].id,
        viewFieldIds: [],
        viewFieldUniversalIdentifiers: [],
        universalIdentifier: viewFieldGroupDefinition.universalIdentifier,
        applicationId: twentyStandardApplicationId,
        isActive: true,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        viewId: standardObjectMetadataRelatedEntityIds[objectName].views[viewName].id,
        viewUniversalIdentifier: viewDefinition.universalIdentifier,
        name,
        position,
        isVisible,
        overrides: null,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=create-standard-view-field-group-flat-metadata.util.js.map