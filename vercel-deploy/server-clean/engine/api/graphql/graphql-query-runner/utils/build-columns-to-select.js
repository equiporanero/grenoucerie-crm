"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildColumnsToSelect", {
    enumerable: true,
    get: function() {
        return buildColumnsToSelect;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _relationtypeinterface = require("../../../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _isflatfieldmetadataoftypeutil = require("../../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const buildColumnsToSelect = ({ select, relations, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps })=>{
    const requiredRelationColumns = getRequiredRelationColumns(relations, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps);
    const fieldsToSelect = Object.entries(select).filter(([_columnName, value])=>value === true && typeof value !== 'object').reduce((acc, [columnName])=>({
            ...acc,
            [columnName]: true
        }), {});
    for (const columnName of requiredRelationColumns){
        fieldsToSelect[columnName] = true;
    }
    const result = {
        ...fieldsToSelect,
        id: true
    };
    return result;
};
const getRequiredRelationColumns = (relations, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps)=>{
    const requiredColumns = [];
    for (const fieldId of flatObjectMetadata.fieldIds){
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: fieldId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(fieldMetadata, _types.FieldMetadataType.RELATION)) {
            const relationValue = relations[fieldMetadata.name];
            if (!(0, _utils.isDefined)(relationValue) || fieldMetadata.settings?.relationType !== _relationtypeinterface.RelationType.MANY_TO_ONE) {
                continue;
            }
            requiredColumns.push((0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                name: fieldMetadata.name
            }));
        }
        if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(fieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
            const targetObjectMetadata = fieldMetadata.relationTargetObjectMetadataId ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
                flatEntityMaps: flatObjectMetadataMaps
            }) : undefined;
            if (fieldMetadata.settings?.relationType !== _relationtypeinterface.RelationType.MANY_TO_ONE || !(0, _utils.isDefined)(targetObjectMetadata)) {
                continue;
            }
            const relationValue = relations[fieldMetadata.name];
            if (!(0, _utils.isDefined)(relationValue)) {
                continue;
            }
            requiredColumns.push((0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                name: fieldMetadata.name
            }));
        }
    }
    return requiredColumns;
};

//# sourceMappingURL=build-columns-to-select.js.map