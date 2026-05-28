/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildRowLevelPermissionRecordFilter", {
    enumerable: true,
    get: function() {
        return buildRowLevelPermissionRecordFilter;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _iscompositefieldmetadatatypeutil = require("../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
const _validateenumvaluecompatibilityutil = require("./validate-enum-value-compatibility.util");
const buildRowLevelPermissionRecordFilter = ({ flatRowLevelPermissionPredicateMaps, flatRowLevelPermissionPredicateGroupMaps, flatFieldMetadataMaps, objectMetadata, roleId, workspaceMember })=>{
    if (!(0, _utils.isDefined)(roleId)) {
        return null;
    }
    const predicates = Object.values(flatRowLevelPermissionPredicateMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((predicate)=>predicate.roleId === roleId && predicate.objectMetadataId === objectMetadata.id && !(0, _utils.isDefined)(predicate.deletedAt));
    if (predicates.length === 0) {
        return null;
    }
    const recordFilters = predicates.map((predicate)=>{
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: predicate.fieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(fieldMetadata)) {
            throw new _permissionsexception.PermissionsException(`Field metadata not found for row level predicate ${predicate.id}`, _permissionsexception.PermissionsExceptionCode.FIELD_METADATA_NOT_FOUND);
        }
        const workspaceMemberFieldMetadataId = predicate.workspaceMemberFieldMetadataId;
        let predicateValue = predicate.value;
        if ((0, _utils.isDefined)(workspaceMemberFieldMetadataId)) {
            const workspaceMemberFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: workspaceMemberFieldMetadataId,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(workspaceMemberFieldMetadata)) {
                throw new _permissionsexception.PermissionsException(`Workspace member field metadata not found for row level predicate ${predicate.id}`, _permissionsexception.PermissionsExceptionCode.FIELD_METADATA_NOT_FOUND);
            }
            if (!(0, _utils.isDefined)(workspaceMember)) {
                return null;
            }
            const rawWorkspaceMemberValue = Object.entries(workspaceMember).find(([key])=>key === workspaceMemberFieldMetadata.name)?.[1];
            const workspaceMemberSubFieldName = predicate.workspaceMemberSubFieldName;
            if (!(0, _utils.isDefined)(rawWorkspaceMemberValue)) {
                return null;
            }
            if ((0, _utils.isDefined)(workspaceMemberSubFieldName) && (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(workspaceMemberFieldMetadata.type) && typeof rawWorkspaceMemberValue === 'object') {
                predicateValue = rawWorkspaceMemberValue[workspaceMemberSubFieldName];
            } else {
                predicateValue = rawWorkspaceMemberValue;
            }
            if (!(0, _utils.isDefined)(predicateValue)) {
                return null;
            }
            // Validate that workspace member enum value is compatible with target field enum options
            const isEnumValueCompatible = (0, _validateenumvaluecompatibilityutil.validateEnumValueCompatibility)({
                workspaceMemberFieldMetadata,
                targetFieldMetadata: fieldMetadata,
                predicateValue
            });
            if (!isEnumValueCompatible) {
                return null;
            }
            // When workspace member field is SELECT or MULTI_SELECT and value is a string,
            // wrap it in an array to match the frontend format (which uses multi-select UI)
            if ((workspaceMemberFieldMetadata.type === _types.FieldMetadataType.SELECT || workspaceMemberFieldMetadata.type === _types.FieldMetadataType.MULTI_SELECT) && typeof predicateValue === 'string') {
                predicateValue = [
                    predicateValue
                ];
            }
        }
        const effectiveSubFieldName = predicate.subFieldName;
        let filterValue = (0, _utils.convertViewFilterValueToString)(predicateValue);
        return {
            id: predicate.id,
            fieldMetadataId: predicate.fieldMetadataId,
            value: filterValue,
            type: (0, _utils.getFilterTypeFromFieldType)(fieldMetadata.type),
            operand: predicate.operand,
            recordFilterGroupId: predicate.rowLevelPermissionPredicateGroupId,
            subFieldName: effectiveSubFieldName
        };
    }).filter(_utils.isDefined);
    const relevantGroupIds = new Set();
    for (const predicate of predicates){
        if ((0, _utils.isDefined)(predicate.rowLevelPermissionPredicateGroupId)) {
            relevantGroupIds.add(predicate.rowLevelPermissionPredicateGroupId);
            let parentGroupId = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: predicate.rowLevelPermissionPredicateGroupId,
                flatEntityMaps: flatRowLevelPermissionPredicateGroupMaps
            })?.parentRowLevelPermissionPredicateGroupId;
            while((0, _utils.isDefined)(parentGroupId) && !relevantGroupIds.has(parentGroupId)){
                relevantGroupIds.add(parentGroupId);
                parentGroupId = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: parentGroupId,
                    flatEntityMaps: flatRowLevelPermissionPredicateGroupMaps
                })?.parentRowLevelPermissionPredicateGroupId;
            }
        }
    }
    const recordFilterGroups = [
        ...relevantGroupIds
    ].map((groupId)=>(0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: groupId,
            flatEntityMaps: flatRowLevelPermissionPredicateGroupMaps
        })).filter(_utils.isDefined).filter((predicateGroup)=>predicateGroup.roleId === roleId && !(0, _utils.isDefined)(predicateGroup.deletedAt)).map((predicateGroup)=>({
            id: predicateGroup.id,
            logicalOperator: predicateGroup.logicalOperator === _types.RowLevelPermissionPredicateGroupLogicalOperator.OR ? _types.RecordFilterGroupLogicalOperator.OR : _types.RecordFilterGroupLogicalOperator.AND,
            parentRecordFilterGroupId: predicateGroup.parentRowLevelPermissionPredicateGroupId
        }));
    return (0, _utils.computeRecordGqlOperationFilter)({
        recordFilters,
        recordFilterGroups,
        fieldMetadataItems: Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined),
        filterValueDependencies: {
            currentWorkspaceMemberId: workspaceMember?.id
        }
    });
};

//# sourceMappingURL=build-row-level-permission-record-filter.util.js.map