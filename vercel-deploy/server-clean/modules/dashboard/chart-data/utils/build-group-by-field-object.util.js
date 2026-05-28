"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildGroupByFieldObject", {
    enumerable: true,
    get: function() {
        return buildGroupByFieldObject;
    }
});
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _iscompositefieldmetadatatypeutil = require("../../../../engine/metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../engine/metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _graphdefaultdategranularityconstant = require("../constants/graph-default-date-granularity.constant");
const buildDateGroupByObject = ({ dateGranularity, firstDayOfTheWeek, timeZone })=>{
    const usedDateGranularity = dateGranularity ?? _graphdefaultdategranularityconstant.GRAPH_DEFAULT_DATE_GRANULARITY;
    const shouldHaveTimeZone = _constants.GROUP_BY_DATE_GRANULARITY_THAT_REQUIRE_TIME_ZONE.includes(usedDateGranularity);
    const result = {
        granularity: usedDateGranularity
    };
    if (shouldHaveTimeZone) {
        if (!(0, _utils.isDefined)(timeZone)) {
            throw new Error(`Date group by should have a time zone.`);
        }
        result.timeZone = timeZone;
    }
    const shouldIncludeWeekStartDay = usedDateGranularity === _types.ObjectRecordGroupByDateGranularity.WEEK || usedDateGranularity === _types.ObjectRecordGroupByDateGranularity.DAY_OF_THE_WEEK;
    if (shouldIncludeWeekStartDay && (0, _utils.isDefined)(firstDayOfTheWeek) && firstDayOfTheWeek !== _constants.CalendarStartDay.SYSTEM) {
        const weekStartDay = (0, _utils.convertCalendarStartDayNonIsoNumberToFirstDayOfTheWeek)(firstDayOfTheWeek, _types.FirstDayOfTheWeek.MONDAY);
        result.weekStartDay = weekStartDay;
    }
    return result;
};
const buildGroupByFieldObject = ({ fieldMetadata, subFieldName, dateGranularity, firstDayOfTheWeek, isNestedDateField, timeZone, shouldUnnest })=>{
    const isRelation = (0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata);
    const isComposite = (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type);
    const isDateField = (0, _utils.isFieldMetadataDateKind)(fieldMetadata.type);
    if (isRelation) {
        if (!(0, _utils.isDefined)(subFieldName)) {
            return {
                [`${fieldMetadata.name}Id`]: true
            };
        }
        const parts = subFieldName.split('.');
        const nestedFieldName = parts[0];
        const nestedSubFieldName = parts[1];
        if (isNestedDateField === true) {
            const dateGroupByObject = buildDateGroupByObject({
                dateGranularity,
                firstDayOfTheWeek,
                timeZone
            });
            return {
                [fieldMetadata.name]: {
                    [nestedFieldName]: dateGroupByObject
                }
            };
        }
        if ((0, _utils.isDefined)(nestedSubFieldName)) {
            return {
                [fieldMetadata.name]: {
                    [nestedFieldName]: {
                        [nestedSubFieldName]: true
                    }
                }
            };
        }
        return {
            [fieldMetadata.name]: {
                [nestedFieldName]: true
            }
        };
    }
    if (isComposite) {
        if (!(0, _utils.isDefined)(subFieldName)) {
            throw new Error(`Composite field ${fieldMetadata.name} requires a subfield to be specified`);
        }
        return {
            [fieldMetadata.name]: {
                [subFieldName]: true
            }
        };
    }
    if (isDateField) {
        const dateGroupByObject = buildDateGroupByObject({
            dateGranularity,
            firstDayOfTheWeek,
            timeZone
        });
        return {
            [fieldMetadata.name]: dateGroupByObject
        };
    }
    if (shouldUnnest) {
        return {
            [fieldMetadata.name]: {
                unnest: true
            }
        };
    }
    return {
        [fieldMetadata.name]: true
    };
};

//# sourceMappingURL=build-group-by-field-object.util.js.map