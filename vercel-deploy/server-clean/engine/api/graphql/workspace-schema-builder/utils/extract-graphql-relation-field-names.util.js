"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractGraphQLRelationFieldNames", {
    enumerable: true,
    get: function() {
        return extractGraphQLRelationFieldNames;
    }
});
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const extractGraphQLRelationFieldNames = (fieldMetadata)=>{
    const fieldMetadataName = fieldMetadata.name;
    const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
        name: fieldMetadataName
    });
    return {
        joinColumnName,
        fieldMetadataName
    };
};

//# sourceMappingURL=extract-graphql-relation-field-names.util.js.map