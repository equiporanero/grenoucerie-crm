"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getStandardObjectMetadataRelatedEntityIds", {
    enumerable: true,
    get: function() {
        return getStandardObjectMetadataRelatedEntityIds;
    }
});
const _uuid = require("uuid");
const _metadata = require("twenty-shared/metadata");
const computeStandardViewObjectIds = ({ objectName })=>{
    const objectDefinition = _metadata.STANDARD_OBJECTS[objectName];
    if (!Object.prototype.hasOwnProperty.call(objectDefinition, 'views')) {
        return undefined;
    }
    const viewDefinitions = objectDefinition.views;
    const viewNames = Object.keys(viewDefinitions);
    const viewIds = {};
    for (const viewName of viewNames){
        const viewDefinition = viewDefinitions[viewName];
        const viewFieldNames = Object.keys(viewDefinition.viewFields);
        const viewFieldIds = {};
        for (const viewFieldName of viewFieldNames){
            viewFieldIds[viewFieldName] = {
                id: (0, _uuid.v4)()
            };
        }
        const viewGroupIds = {};
        if (Object.prototype.hasOwnProperty.call(viewDefinition, 'viewGroups')) {
            const viewGroupNames = Object.keys(viewDefinition.viewGroups);
            for (const viewGroupName of viewGroupNames){
                viewGroupIds[viewGroupName] = {
                    id: (0, _uuid.v4)()
                };
            }
        }
        const viewFieldGroupIds = {};
        if (Object.prototype.hasOwnProperty.call(viewDefinition, 'viewFieldGroups')) {
            const viewFieldGroupNames = Object.keys(viewDefinition.viewFieldGroups);
            for (const viewFieldGroupName of viewFieldGroupNames){
                viewFieldGroupIds[viewFieldGroupName] = {
                    id: (0, _uuid.v4)()
                };
            }
        }
        viewIds[viewName] = {
            id: (0, _uuid.v4)(),
            viewFields: viewFieldIds,
            viewGroups: viewGroupIds,
            viewFieldGroups: viewFieldGroupIds
        };
    }
    return viewIds;
};
const getStandardObjectMetadataRelatedEntityIds = ()=>{
    const result = {};
    for (const objectName of Object.keys(_metadata.STANDARD_OBJECTS)){
        const fieldNames = Object.keys(_metadata.STANDARD_OBJECTS[objectName].fields);
        const fieldIds = {};
        for (const fieldName of fieldNames){
            fieldIds[fieldName] = {
                id: (0, _uuid.v4)()
            };
        }
        const viewIds = computeStandardViewObjectIds({
            objectName
        });
        result[objectName] = {
            // @ts-expect-error ignore this
            fields: fieldIds,
            id: (0, _uuid.v4)(),
            // @ts-expect-error ignore this
            views: viewIds
        };
    }
    return result;
};

//# sourceMappingURL=get-standard-object-metadata-related-entity-ids.util.js.map