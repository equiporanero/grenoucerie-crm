"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardViewGroupFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardViewGroupFlatMetadata;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardViewGroupFlatMetadata = ({ workspaceId, objectName, context: { viewName, viewGroupName, isVisible, fieldValue, position }, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, now })=>{
    // @ts-expect-error ignore
    const viewDefinition = _metadata.STANDARD_OBJECTS[objectName].views[viewName];
    const viewGroupDefinition = viewDefinition.viewGroups[viewGroupName];
    if (!(0, _utils.isDefined)(viewGroupDefinition)) {
        throw new Error(`Invalid configuration ${objectName} ${viewName.toString()} ${viewGroupName}`);
    }
    return {
        id: (0, _uuid.v4)(),
        universalIdentifier: viewGroupDefinition.universalIdentifier,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        viewId: standardObjectMetadataRelatedEntityIds[objectName].views[viewName].id,
        viewUniversalIdentifier: viewDefinition.universalIdentifier,
        isVisible,
        fieldValue,
        position,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=create-standard-view-group-flat-metadata.util.js.map