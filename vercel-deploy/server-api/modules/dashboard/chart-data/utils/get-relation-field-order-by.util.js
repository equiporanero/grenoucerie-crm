"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRelationFieldOrderBy", {
    enumerable: true,
    get: function() {
        return getRelationFieldOrderBy;
    }
});
const _utils = require("twenty-shared/utils");
const _graphdefaultdategranularityconstant = require("../constants/graph-default-date-granularity.constant");
const getRelationFieldOrderBy = (groupByFieldMetadata, groupBySubFieldName, direction, dateGranularity, isNestedDateField)=>{
    if (!(0, _utils.isDefined)(groupBySubFieldName)) {
        return {
            [`${groupByFieldMetadata.name}Id`]: direction
        };
    }
    const [nestedFieldName, nestedSubFieldName] = groupBySubFieldName.split('.');
    if (isNestedDateField === true || (0, _utils.isDefined)(dateGranularity)) {
        return {
            [groupByFieldMetadata.name]: {
                [nestedFieldName]: {
                    orderBy: direction,
                    granularity: dateGranularity ?? _graphdefaultdategranularityconstant.GRAPH_DEFAULT_DATE_GRANULARITY
                }
            }
        };
    }
    if (!(0, _utils.isDefined)(nestedSubFieldName)) {
        return {
            [groupByFieldMetadata.name]: {
                [nestedFieldName]: direction
            }
        };
    }
    return {
        [groupByFieldMetadata.name]: {
            [nestedFieldName]: {
                [nestedSubFieldName]: direction
            }
        }
    };
};

//# sourceMappingURL=get-relation-field-order-by.util.js.map