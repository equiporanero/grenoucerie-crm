"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get validateOperationIsPermittedOrThrow () {
        return validateOperationIsPermittedOrThrow;
    },
    get validateQueryIsPermittedOrThrow () {
        return validateQueryIsPermittedOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _lodashisempty = /*#__PURE__*/ _interop_require_default(require("lodash.isempty"));
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _processaggregatehelper = require("../../api/graphql/graphql-query-runner/helpers/process-aggregate.helper");
const _graphqlerrorsutil = require("../../core-modules/graphql/utils/graphql-errors.util");
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
const _getcolumnnametofieldmetadataidutil = require("../utils/get-column-name-to-field-metadata-id.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const WORKSPACE_MEMBER_OBJECT_UNIVERSAL_IDENTIFIER = _metadata.STANDARD_OBJECTS.workspaceMember.universalIdentifier;
const getTargetEntityAndOperationType = (expressionMap)=>{
    const isSubQuery = expressionMap.aliases[0].subQuery;
    if (isSubQuery) {
        return {
            isSubQuery: true
        };
    }
    const mainEntity = expressionMap.aliases[0].metadata.name;
    const operationType = expressionMap.queryType;
    return {
        mainEntity,
        operationType
    };
};
const validateOperationIsPermittedOrThrow = ({ entityName, operationType, objectsPermissions, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular, selectedColumns, allFieldsSelected, updatedColumns })=>{
    const objectMetadataIdForEntity = objectIdByNameSingular[entityName];
    if (!(0, _guards.isNonEmptyString)(objectMetadataIdForEntity)) {
        throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
    }
    const objectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: objectMetadataIdForEntity,
        flatEntityMaps: flatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(objectMetadata)) {
        throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
    }
    const objectMetadataIsSystem = objectMetadata.isSystem === true;
    const isWorkspaceMemberObject = objectMetadata.universalIdentifier === WORKSPACE_MEMBER_OBJECT_UNIVERSAL_IDENTIFIER;
    // TODO: this should be improved, we may have more complex permission configuration for is system objects
    if (objectMetadataIsSystem && !isWorkspaceMemberObject) {
        return;
    }
    const columnNameToFieldMetadataIdMap = (0, _getcolumnnametofieldmetadataidutil.getColumnNameToFieldMetadataIdMap)(objectMetadata, flatFieldMetadataMaps);
    const permissionsForEntity = objectsPermissions[objectMetadataIdForEntity];
    switch(operationType){
        case 'select':
            if (!permissionsForEntity?.canReadObjectRecords) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
            }
            validateReadFieldPermissionOrThrow({
                restrictedFields: permissionsForEntity.restrictedFields,
                selectedColumns,
                columnNameToFieldMetadataIdMap,
                allFieldsSelected
            });
            break;
        case 'insert':
            if (!permissionsForEntity?.canUpdateObjectRecords) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
            }
            validateReadFieldPermissionOrThrow({
                restrictedFields: permissionsForEntity.restrictedFields,
                selectedColumns,
                columnNameToFieldMetadataIdMap
            });
            if (updatedColumns.length > 0) {
                const rlsFieldMetadataIds = new Set(permissionsForEntity.rowLevelPermissionPredicates.map((predicate)=>predicate.fieldMetadataId));
                const updatedColumnsWithoutRlsFields = updatedColumns.filter((column)=>!rlsFieldMetadataIds.has(columnNameToFieldMetadataIdMap[column]));
                if (updatedColumnsWithoutRlsFields.length > 0) {
                    validateUpdateFieldPermissionOrThrow({
                        restrictedFields: permissionsForEntity.restrictedFields,
                        updatedColumns: updatedColumnsWithoutRlsFields,
                        columnNameToFieldMetadataIdMap
                    });
                }
            }
            break;
        case 'update':
            if (!permissionsForEntity?.canUpdateObjectRecords) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
            }
            validateReadFieldPermissionOrThrow({
                restrictedFields: permissionsForEntity.restrictedFields,
                selectedColumns,
                columnNameToFieldMetadataIdMap
            });
            if (updatedColumns.length > 0) {
                validateUpdateFieldPermissionOrThrow({
                    restrictedFields: permissionsForEntity.restrictedFields,
                    updatedColumns,
                    columnNameToFieldMetadataIdMap
                });
            }
            break;
        case 'delete':
            if (!permissionsForEntity?.canDestroyObjectRecords) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
            }
            validateReadFieldPermissionOrThrow({
                restrictedFields: permissionsForEntity.restrictedFields,
                selectedColumns,
                columnNameToFieldMetadataIdMap
            });
            break;
        case 'restore':
        case 'soft-delete':
            if (!permissionsForEntity?.canSoftDeleteObjectRecords) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
            }
            validateReadFieldPermissionOrThrow({
                restrictedFields: permissionsForEntity.restrictedFields,
                selectedColumns,
                columnNameToFieldMetadataIdMap
            });
            break;
        default:
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.UNKNOWN_OPERATION_NAME, _permissionsexception.PermissionsExceptionCode.UNKNOWN_OPERATION_NAME);
    }
    if ((0, _lodashisempty.default)(permissionsForEntity.restrictedFields)) {
        return;
    }
};
const validateQueryIsPermittedOrThrow = ({ expressionMap, objectsPermissions, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular, shouldBypassPermissionChecks })=>{
    if (shouldBypassPermissionChecks) {
        return;
    }
    const { mainEntity, operationType, isSubQuery } = getTargetEntityAndOperationType(expressionMap);
    if (isSubQuery) {
        return;
    }
    let expressionMapSelectsOnMainEntity = expressionMap.selects;
    if (!(0, _lodashisempty.default)(expressionMap.joinAttributes)) {
        const { selectsWithoutJoinedAliases } = validatePermissionsForJoinsAndReturnSelectsWithoutJoins({
            expressionMap,
            objectsPermissions,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            objectIdByNameSingular
        });
        expressionMapSelectsOnMainEntity = selectsWithoutJoinedAliases;
    }
    const allFieldsSelected = expressionMapSelectsOnMainEntity.some((select)=>select.selection === mainEntity);
    let selectedColumns = [];
    let updatedColumns = [];
    selectedColumns = getSelectedColumnsFromExpressionMap({
        operationType,
        expressionMapReturning: expressionMap.returning,
        expressionMapSelects: expressionMapSelectsOnMainEntity,
        allFieldsSelected
    });
    if (operationType !== 'select') {
        const valuesSet = expressionMap.valuesSet;
        if (Array.isArray(valuesSet)) {
            updatedColumns = valuesSet.reduce((acc, value)=>{
                const keys = Object.keys(value);
                keys.forEach((key)=>{
                    if (!acc.includes(key)) {
                        acc.push(key);
                    }
                });
                return acc;
            }, []);
        } else {
            updatedColumns = Object.keys(valuesSet ?? {});
        }
    }
    validateOperationIsPermittedOrThrow({
        entityName: mainEntity,
        operationType: operationType,
        objectsPermissions,
        flatObjectMetadataMaps,
        flatFieldMetadataMaps,
        objectIdByNameSingular,
        selectedColumns,
        allFieldsSelected,
        updatedColumns
    });
};
const validatePermissionsForJoinsAndReturnSelectsWithoutJoins = ({ expressionMap, objectsPermissions, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular })=>{
    const joinAttributesAliases = new Set(expressionMap.joinAttributes.map((join)=>join.alias.name));
    const indexesOfSelectsForJoinedAlias = [];
    for (const [_index, joinedAlias] of joinAttributesAliases.entries()){
        const entity = expressionMap.aliases.find((alias)=>alias.type === 'join' && alias.name === joinedAlias)?.metadata;
        if ((0, _utils.isDefined)(entity)) {
            for (const [index, select] of expressionMap.selects.entries()){
                const regex = /"(\w+)"\."(\w+)"/;
                const extractedAlias = select.selection.match(regex)?.[1]; // "person"."name" -> "person"
                if ((0, _utils.isDefined)(extractedAlias) && extractedAlias === joinedAlias) {
                    indexesOfSelectsForJoinedAlias.push(index);
                    const selectedColumns = getSelectedColumnsFromExpressionMap({
                        operationType: 'select',
                        expressionMapSelects: expressionMap.selects.filter((_select, indexOfSelect)=>indexOfSelect === index),
                        allFieldsSelected: false
                    });
                    validateOperationIsPermittedOrThrow({
                        entityName: entity.name,
                        operationType: 'select',
                        objectsPermissions,
                        flatObjectMetadataMaps,
                        flatFieldMetadataMaps,
                        objectIdByNameSingular,
                        selectedColumns,
                        allFieldsSelected: false,
                        updatedColumns: []
                    });
                }
            }
        }
    }
    const selectsWithoutJoinedAliases = expressionMap.selects.filter((_select, index)=>!indexesOfSelectsForJoinedAlias.includes(index));
    return {
        selectsWithoutJoinedAliases
    };
};
const validateReadFieldPermissionOrThrow = ({ restrictedFields, selectedColumns, columnNameToFieldMetadataIdMap, allFieldsSelected })=>{
    const noReadRestrictions = (0, _lodashisempty.default)(restrictedFields) || Object.values(restrictedFields).every((field)=>field.canRead !== false);
    if (noReadRestrictions) {
        return;
    }
    if (allFieldsSelected || selectedColumns === '*') {
        throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
    }
    for (const column of selectedColumns){
        const fieldMetadataId = columnNameToFieldMetadataIdMap[column];
        if (!fieldMetadataId) {
            throw new _graphqlerrorsutil.InternalServerError(`Field metadata id not found for column name ${column}`);
        }
        if (restrictedFields[fieldMetadataId]?.canRead === false) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
        }
    }
};
const validateUpdateFieldPermissionOrThrow = ({ restrictedFields, updatedColumns, columnNameToFieldMetadataIdMap })=>{
    if ((0, _lodashisempty.default)(restrictedFields)) {
        return;
    }
    for (const column of updatedColumns){
        const fieldMetadataId = columnNameToFieldMetadataIdMap[column];
        if (!fieldMetadataId) {
            throw new _graphqlerrorsutil.InternalServerError(`Field metadata id not found for column name ${column}`);
        }
        if (restrictedFields[fieldMetadataId]?.canUpdate === false) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
        }
    }
};
const getSelectedColumnsFromExpressionMap = ({ operationType, expressionMapReturning, expressionMapSelects, allFieldsSelected })=>{
    let selectedColumns = [];
    if ([
        'update',
        'insert',
        'delete',
        'soft-delete',
        'restore'
    ].includes(operationType)) {
        if (!(0, _utils.isDefined)(expressionMapReturning)) {
            throw new _graphqlerrorsutil.InternalServerError('Returning columns are not set for update query');
        }
        selectedColumns = expressionMapReturning === '*' ? '*' : [
            expressionMapReturning
        ].flat();
    } else if (!allFieldsSelected) {
        selectedColumns = getSelectedColumnsFromExpressionMapSelects(expressionMapSelects);
    }
    return selectedColumns;
};
const getSelectedColumnsFromExpressionMapSelects = (selects)=>{
    return selects?.map((select)=>{
        const columnsFromAggregateExpression = _processaggregatehelper.ProcessAggregateHelper.extractColumnNamesFromAggregateExpression(select.selection);
        if (columnsFromAggregateExpression) {
            return columnsFromAggregateExpression;
        }
        const parts = select.selection.split('.');
        return parts[parts.length - 1];
    }).flat();
};

//# sourceMappingURL=permissions.utils.js.map