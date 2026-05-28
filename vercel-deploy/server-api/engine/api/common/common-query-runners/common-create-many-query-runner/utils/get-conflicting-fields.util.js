"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getConflictingFields", {
    enumerable: true,
    get: function() {
        return getConflictingFields;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _getflatfieldsforflatobjectmetadatautil = require("../../../../graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const getConflictingFields = (flatObjectMetadata, flatFieldMetadataMaps)=>{
    return (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps).filter((field)=>field.isUnique || field.name === 'id').map((field)=>{
        const compositeType = _types.compositeTypeDefinitions.get(field.type);
        if (!compositeType) {
            return {
                baseField: field.name,
                conflictingProperties: [
                    {
                        fullPath: field.name,
                        column: field.name
                    }
                ]
            };
        }
        const conflictingProperties = compositeType.properties.filter((prop)=>prop.isIncludedInUniqueConstraint).map((property)=>({
                fullPath: `${field.name}.${property.name}`,
                column: `${field.name}${(0, _utils.capitalize)(property.name)}`
            }));
        return {
            baseField: field.name,
            conflictingProperties
        };
    }).filter((group)=>group.conflictingProperties.length > 0);
};

//# sourceMappingURL=get-conflicting-fields.util.js.map