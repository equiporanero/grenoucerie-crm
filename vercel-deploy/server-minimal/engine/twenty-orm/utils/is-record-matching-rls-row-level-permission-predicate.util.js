/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isRecordMatchingRLSRowLevelPermissionPredicate", {
    enumerable: true,
    get: function() {
        return isRecordMatchingRLSRowLevelPermissionPredicate;
    }
});
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _getflatfieldsforflatobjectmetadatautil = require("../../api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const isLeafFilter = (filter)=>{
    return !isAndFilter(filter) && !isOrFilter(filter) && !isNotFilter(filter);
};
const isAndFilter = (filter)=>'and' in filter && !!filter.and;
const isImplicitAndFilter = (filter)=>Object.keys(filter).length > 1;
const isOrFilter = (filter)=>'or' in filter && !!filter.or;
const isNotFilter = (filter)=>'not' in filter && !!filter.not;
const isRecordMatchingRLSRowLevelPermissionPredicate = ({ record, filter, flatObjectMetadata, flatFieldMetadataMaps, shouldIgnoreSoftDeleteDefaultFilter })=>{
    if (Object.keys(filter).length === 0 && record.deletedAt === null) {
        return true;
    }
    if (isImplicitAndFilter(filter)) {
        return Object.entries(filter).every(([filterKey, value])=>isRecordMatchingRLSRowLevelPermissionPredicate({
                record,
                filter: {
                    [filterKey]: value
                },
                flatObjectMetadata,
                flatFieldMetadataMaps,
                shouldIgnoreSoftDeleteDefaultFilter
            }));
    }
    if (isAndFilter(filter)) {
        const filterValue = filter.and;
        if (!Array.isArray(filterValue)) {
            throw new Error('Unexpected value for "and" filter : ' + JSON.stringify(filterValue));
        }
        return filterValue.length === 0 || filterValue.every((andFilter)=>isRecordMatchingRLSRowLevelPermissionPredicate({
                record,
                filter: andFilter,
                flatObjectMetadata,
                flatFieldMetadataMaps,
                shouldIgnoreSoftDeleteDefaultFilter
            }));
    }
    if (isOrFilter(filter)) {
        const filterValue = filter.or;
        if (Array.isArray(filterValue)) {
            return filterValue.length === 0 || filterValue.some((orFilter)=>isRecordMatchingRLSRowLevelPermissionPredicate({
                    record,
                    filter: orFilter,
                    flatObjectMetadata,
                    flatFieldMetadataMaps,
                    shouldIgnoreSoftDeleteDefaultFilter
                }));
        }
        if ((0, _guards.isObject)(filterValue)) {
            // The API considers "or" with an object as an "and"
            return isRecordMatchingRLSRowLevelPermissionPredicate({
                record,
                filter: filterValue,
                flatObjectMetadata,
                flatFieldMetadataMaps,
                shouldIgnoreSoftDeleteDefaultFilter
            });
        }
        throw new Error('Unexpected value for "or" filter : ' + filterValue);
    }
    if (isNotFilter(filter)) {
        const filterValue = filter.not;
        if (!(0, _utils.isDefined)(filterValue)) {
            throw new Error('Unexpected value for "not" filter : ' + filterValue);
        }
        return (0, _utils.isEmptyObject)(filterValue) || !isRecordMatchingRLSRowLevelPermissionPredicate({
            record,
            filter: filterValue,
            flatObjectMetadata,
            flatFieldMetadataMaps,
            shouldIgnoreSoftDeleteDefaultFilter
        });
    }
    const shouldTakeDeletedAtIntoAccount = shouldIgnoreSoftDeleteDefaultFilter !== true;
    const shouldRejectMatchingBecauseRecordIsSoftDeleted = isLeafFilter(filter) && shouldTakeDeletedAtIntoAccount && (0, _utils.isDefined)(record.deletedAt);
    if (shouldRejectMatchingBecauseRecordIsSoftDeleted) {
        return false;
    }
    const objectFields = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps);
    return Object.entries(filter).every(([filterKey, filterValue])=>{
        if (!(0, _utils.isDefined)(filterValue)) {
            throw new Error('Unexpected value for filter key "' + filterKey + '" : ' + filterValue);
        }
        if ((0, _utils.isEmptyObject)(filterValue)) return true;
        const objectMetadataField = objectFields.find((field)=>field.name === filterKey) ?? objectFields.find((field)=>field.type === _types.FieldMetadataType.RELATION && (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                name: field.name
            }) === filterKey);
        if (!(0, _utils.isDefined)(objectMetadataField)) {
            throw new Error('Field metadata item "' + filterKey + '" not found for object metadata item ' + flatObjectMetadata.nameSingular);
        }
        const recordFieldValue = record[filterKey];
        if (!(0, _utils.isDefined)(recordFieldValue)) {
            if ((0, _guards.isObject)(filterValue)) {
                return filterValue?.is === 'NULL';
            }
            return false;
        }
        switch(objectMetadataField.type){
            case _types.FieldMetadataType.RATING:
                return (0, _utils.isMatchingRatingFilter)({
                    ratingFilter: filterValue,
                    value: recordFieldValue
                });
            case _types.FieldMetadataType.TEXT:
                {
                    return (0, _utils.isMatchingStringFilter)({
                        stringFilter: filterValue,
                        value: recordFieldValue
                    });
                }
            case _types.FieldMetadataType.RICH_TEXT:
                {
                    return (0, _utils.isMatchingRichTextFilter)({
                        richTextFilter: filterValue,
                        value: recordFieldValue
                    });
                }
            case _types.FieldMetadataType.SELECT:
                return (0, _utils.isMatchingSelectFilter)({
                    selectFilter: filterValue,
                    value: recordFieldValue
                });
            case _types.FieldMetadataType.MULTI_SELECT:
                return (0, _utils.isMatchingMultiSelectFilter)({
                    multiSelectFilter: filterValue,
                    value: recordFieldValue
                });
            case _types.FieldMetadataType.ARRAY:
                {
                    return (0, _utils.isMatchingArrayFilter)({
                        arrayFilter: filterValue,
                        value: recordFieldValue
                    });
                }
            case _types.FieldMetadataType.RAW_JSON:
                {
                    return (0, _utils.isMatchingRawJsonFilter)({
                        rawJsonFilter: filterValue,
                        value: recordFieldValue
                    });
                }
            case _types.FieldMetadataType.FULL_NAME:
                {
                    const fullNameFilter = filterValue;
                    return (fullNameFilter.firstName === undefined || (0, _utils.isMatchingStringFilter)({
                        stringFilter: fullNameFilter.firstName,
                        value: recordFieldValue.firstName
                    })) && (fullNameFilter.lastName === undefined || (0, _utils.isMatchingStringFilter)({
                        stringFilter: fullNameFilter.lastName,
                        value: recordFieldValue.lastName
                    }));
                }
            case _types.FieldMetadataType.ADDRESS:
                {
                    const addressFilter = filterValue;
                    const keys = [
                        'addressStreet1',
                        'addressStreet2',
                        'addressCity',
                        'addressState',
                        'addressCountry',
                        'addressPostcode'
                    ];
                    return keys.some((key)=>{
                        const value = addressFilter[key];
                        if (value === undefined) {
                            return false;
                        }
                        return (0, _utils.isMatchingStringFilter)({
                            stringFilter: value,
                            value: recordFieldValue[key]
                        });
                    });
                }
            case _types.FieldMetadataType.LINKS:
                {
                    const linksFilter = filterValue;
                    const keys = [
                        'primaryLinkLabel',
                        'primaryLinkUrl'
                    ];
                    return keys.some((key)=>{
                        const value = linksFilter[key];
                        if (value === undefined) {
                            return false;
                        }
                        return (0, _utils.isMatchingStringFilter)({
                            stringFilter: value,
                            value: recordFieldValue[key]
                        });
                    });
                }
            case _types.FieldMetadataType.DATE:
            case _types.FieldMetadataType.DATE_TIME:
                {
                    return (0, _utils.isMatchingDateFilter)({
                        dateFilter: filterValue,
                        value: recordFieldValue
                    });
                }
            case _types.FieldMetadataType.NUMBER:
            case _types.FieldMetadataType.NUMERIC:
                {
                    return (0, _utils.isMatchingFloatFilter)({
                        floatFilter: filterValue,
                        value: recordFieldValue
                    });
                }
            case _types.FieldMetadataType.UUID:
                {
                    return (0, _utils.isMatchingUUIDFilter)({
                        uuidFilter: filterValue,
                        value: recordFieldValue
                    });
                }
            case _types.FieldMetadataType.BOOLEAN:
                {
                    return (0, _utils.isMatchingBooleanFilter)({
                        booleanFilter: filterValue,
                        value: recordFieldValue
                    });
                }
            case _types.FieldMetadataType.CURRENCY:
                {
                    return (0, _utils.isMatchingCurrencyFilter)({
                        currencyFilter: filterValue,
                        value: recordFieldValue
                    });
                }
            case _types.FieldMetadataType.ACTOR:
                {
                    const actorFilter = filterValue;
                    if ((0, _utils.isDefined)(actorFilter.source)) {
                        return (0, _utils.isMatchingSelectFilter)({
                            selectFilter: actorFilter.source,
                            value: recordFieldValue.source
                        });
                    }
                    return actorFilter.name === undefined || (0, _utils.isMatchingStringFilter)({
                        stringFilter: actorFilter.name,
                        value: recordFieldValue.name
                    });
                }
            case _types.FieldMetadataType.EMAILS:
                {
                    const emailsFilter = filterValue;
                    if (emailsFilter.primaryEmail === undefined) {
                        return false;
                    }
                    return (0, _utils.isMatchingStringFilter)({
                        stringFilter: emailsFilter.primaryEmail,
                        value: recordFieldValue.primaryEmail
                    });
                }
            case _types.FieldMetadataType.PHONES:
                {
                    const phonesFilter = filterValue;
                    const keys = [
                        'primaryPhoneNumber'
                    ];
                    return keys.some((key)=>{
                        const value = phonesFilter[key];
                        if (value === undefined) {
                            return false;
                        }
                        return (0, _utils.isMatchingStringFilter)({
                            stringFilter: value,
                            value: recordFieldValue[key]
                        });
                    });
                }
            case _types.FieldMetadataType.RELATION:
                {
                    const isJoinColumn = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                        name: objectMetadataField.name
                    }) === filterKey;
                    if (isJoinColumn) {
                        return (0, _utils.isMatchingUUIDFilter)({
                            uuidFilter: filterValue,
                            value: recordFieldValue
                        });
                    }
                    throw new Error(`Not implemented yet, use UUID filter instead on the corresponding "${filterKey}Id" field`);
                }
            case _types.FieldMetadataType.TS_VECTOR:
                {
                    return (0, _utils.isMatchingTSVectorFilter)({
                        tsVectorFilter: filterValue,
                        value: recordFieldValue
                    });
                }
            default:
                {
                    throw new Error(`Not implemented yet for field type "${objectMetadataField.type}"`);
                }
        }
    });
};

//# sourceMappingURL=is-record-matching-rls-row-level-permission-predicate.util.js.map