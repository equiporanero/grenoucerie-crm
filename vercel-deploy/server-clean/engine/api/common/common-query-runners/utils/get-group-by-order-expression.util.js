"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getGroupByOrderExpression", {
    enumerable: true,
    get: function() {
        return getGroupByOrderExpression;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _getgroupbyexpressionutil = require("./get-group-by-expression.util");
const _isgroupbydatefieldutil = require("./is-group-by-date-field.util");
const _isgroupbyrelationfieldutil = require("./is-group-by-relation-field.util");
const DAYS_OF_WEEK = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
const getDayOfWeekOrderExpression = (groupByExpression, weekStartDay)=>{
    const startDay = weekStartDay ?? _types.FirstDayOfTheWeek.MONDAY;
    const startIndex = startDay === _types.FirstDayOfTheWeek.SUNDAY ? 6 : startDay === _types.FirstDayOfTheWeek.SATURDAY ? 5 : 0;
    const orderedDays = [
        ...DAYS_OF_WEEK.slice(startIndex),
        ...DAYS_OF_WEEK.slice(0, startIndex)
    ];
    const caseConditions = orderedDays.map((day, index)=>`WHEN '${day}' THEN ${index + 1}`).join(' ');
    return `CASE ${groupByExpression} ${caseConditions} END`;
};
const getGroupByOrderExpression = ({ groupByField, columnNameWithQuotes })=>{
    if (!((0, _isgroupbydatefieldutil.isGroupByDateField)(groupByField) || (0, _isgroupbyrelationfieldutil.isGroupByRelationField)(groupByField))) {
        return (0, _getgroupbyexpressionutil.getGroupByExpression)({
            groupByField,
            columnNameWithQuotes
        });
    }
    const dateGranularity = groupByField.dateGranularity;
    if (!(0, _utils.isDefined)(dateGranularity)) {
        return (0, _getgroupbyexpressionutil.getGroupByExpression)({
            groupByField,
            columnNameWithQuotes
        });
    }
    const groupByExpression = (0, _getgroupbyexpressionutil.getGroupByExpression)({
        groupByField,
        columnNameWithQuotes
    });
    switch(dateGranularity){
        case _types.ObjectRecordGroupByDateGranularity.DAY_OF_THE_WEEK:
            return getDayOfWeekOrderExpression(groupByExpression, groupByField.weekStartDay);
        case _types.ObjectRecordGroupByDateGranularity.MONTH_OF_THE_YEAR:
            return `CASE ${groupByExpression} WHEN 'January' THEN 1 WHEN 'February' THEN 2 WHEN 'March' THEN 3 WHEN 'April' THEN 4 WHEN 'May' THEN 5 WHEN 'June' THEN 6 WHEN 'July' THEN 7 WHEN 'August' THEN 8 WHEN 'September' THEN 9 WHEN 'October' THEN 10 WHEN 'November' THEN 11 WHEN 'December' THEN 12 END`;
        default:
            return groupByExpression;
    }
};

//# sourceMappingURL=get-group-by-order-expression.util.js.map