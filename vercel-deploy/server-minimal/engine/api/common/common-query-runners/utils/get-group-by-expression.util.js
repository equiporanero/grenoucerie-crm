"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getGroupByExpression", {
    enumerable: true,
    get: function() {
        return getGroupByExpression;
    }
});
const _guards = require("@sniptt/guards");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _commonqueryrunnerexception = require("../errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../errors/standard-error-message.constant");
const _isgroupbydatefieldutil = require("./is-group-by-date-field.util");
const _isgroupbyrelationfieldutil = require("./is-group-by-relation-field.util");
const VALID_IANA_TIMEZONES = new Set(_constants.IANA_TIME_ZONES);
const getGroupByExpression = ({ groupByField, columnNameWithQuotes })=>{
    if (!((0, _isgroupbydatefieldutil.isGroupByDateField)(groupByField) || (0, _isgroupbyrelationfieldutil.isGroupByRelationField)(groupByField))) {
        if ('shouldUnnest' in groupByField && groupByField.shouldUnnest) {
            return `UNNEST(CASE WHEN CARDINALITY(${columnNameWithQuotes}) > 0 THEN ${columnNameWithQuotes} ELSE ARRAY[${columnNameWithQuotes}[1]] END)`;
        }
        return columnNameWithQuotes;
    }
    const dateGranularity = groupByField.dateGranularity;
    if (!(0, _utils.isDefined)(dateGranularity)) {
        return columnNameWithQuotes;
    }
    const shouldUseTimeZone = _constants.GROUP_BY_DATE_GRANULARITY_THAT_REQUIRE_TIME_ZONE.includes(dateGranularity) && groupByField.fieldMetadata.type === _types.FieldMetadataType.DATE_TIME;
    const timeZoneIsNotProvided = !(0, _guards.isNonEmptyString)(groupByField.timeZone);
    if (shouldUseTimeZone && timeZoneIsNotProvided) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException('Time zone should be specified for a group by date on Day, Week, Month, Quarter or Year', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.MISSING_TIMEZONE_FOR_DATE_GROUP_BY, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if (shouldUseTimeZone && !timeZoneIsNotProvided && !VALID_IANA_TIMEZONES.has(groupByField.timeZone)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid timezone: ${groupByField.timeZone}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_TIMEZONE, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const timeZoneAsDateTruncParameter = shouldUseTimeZone ? `, '${groupByField.timeZone}'` : '';
    const timeZoneAsToCharParameter = shouldUseTimeZone ? ` AT TIME ZONE '${groupByField.timeZone}'` : '';
    switch(dateGranularity){
        case _types.ObjectRecordGroupByDateGranularity.NONE:
            return columnNameWithQuotes;
        case _types.ObjectRecordGroupByDateGranularity.DAY_OF_THE_WEEK:
            return `TRIM(TO_CHAR(${columnNameWithQuotes}, 'TMDay'))`;
        case _types.ObjectRecordGroupByDateGranularity.MONTH_OF_THE_YEAR:
            return `TRIM(TO_CHAR(${columnNameWithQuotes}, 'TMMonth'))`;
        case _types.ObjectRecordGroupByDateGranularity.QUARTER_OF_THE_YEAR:
            return `TRIM(TO_CHAR(${columnNameWithQuotes}, '"Q"Q'))`;
        case _types.ObjectRecordGroupByDateGranularity.WEEK:
            {
                const weekStartDay = groupByField.weekStartDay;
                let shiftedExpression = `DATE_TRUNC('week', ${columnNameWithQuotes}${timeZoneAsDateTruncParameter})`;
                if ((0, _utils.isDefined)(weekStartDay)) {
                    if (weekStartDay === 'SUNDAY') {
                        shiftedExpression = `(DATE_TRUNC('week', ${columnNameWithQuotes} + INTERVAL '1 day'${timeZoneAsDateTruncParameter}) - INTERVAL '1 day')`;
                    } else if (weekStartDay === 'SATURDAY') {
                        shiftedExpression = `(DATE_TRUNC('week', ${columnNameWithQuotes} + INTERVAL '2 days'${timeZoneAsDateTruncParameter}) - INTERVAL '2 days')`;
                    }
                }
                return `TO_CHAR(${shiftedExpression}${timeZoneAsToCharParameter}, 'YYYY-MM-DD')`;
            }
        case _types.ObjectRecordGroupByDateGranularity.DAY:
        case _types.ObjectRecordGroupByDateGranularity.MONTH:
        case _types.ObjectRecordGroupByDateGranularity.QUARTER:
        case _types.ObjectRecordGroupByDateGranularity.YEAR:
            return `TO_CHAR(DATE_TRUNC('${dateGranularity}', ${columnNameWithQuotes}${timeZoneAsDateTruncParameter})${timeZoneAsToCharParameter}, 'YYYY-MM-DD')`;
        default:
            (0, _utils.assertUnreachable)(dateGranularity);
    }
};

//# sourceMappingURL=get-group-by-expression.util.js.map