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
    get GROUP_BY_DATE_GRANULARITY_INPUT_KEY () {
        return GROUP_BY_DATE_GRANULARITY_INPUT_KEY;
    },
    get GroupByDateGranularityInputTypeGenerator () {
        return GroupByDateGranularityInputTypeGenerator;
    },
    get ORDER_BY_DATE_GRANULARITY_INPUT_KEY () {
        return ORDER_BY_DATE_GRANULARITY_INPUT_KEY;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _enum = require("../../../graphql-types/enum");
const _gqltypesstorage = require("../../../storages/gql-types.storage");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const GROUP_BY_DATE_GRANULARITY_INPUT_KEY = 'GroupByDateGranularityInput';
const ORDER_BY_DATE_GRANULARITY_INPUT_KEY = 'OrderByDateGranularityInput';
let GroupByDateGranularityInputTypeGenerator = class GroupByDateGranularityInputTypeGenerator {
    buildAndStore() {
        this.gqlTypesStorage.addGqlType('DateGranularityEnum', new _graphql.GraphQLEnumType({
            name: 'DateGranularityEnum',
            values: Object.entries(_types.ObjectRecordGroupByDateGranularity).reduce((acc, [key, value])=>{
                acc[key] = {
                    value
                };
                return acc;
            }, {}),
            description: 'Date granularity (e.g. day, month, quarter, year, week, day of the week, quarter of the year, month of the year)'
        }));
        const dateGranularityEnum = this.gqlTypesStorage.getGqlTypeByKey('DateGranularityEnum');
        if (!(0, _utils.isDefined)(dateGranularityEnum)) {
            throw new Error('DateGranularityEnum not found');
        }
        const firstDayOfWeekEnum = new _graphql.GraphQLEnumType({
            name: 'FirstDayOfTheWeek',
            values: Object.values(_types.FirstDayOfTheWeek).reduce((acc, option)=>{
                acc[option] = {
                    value: option
                };
                return acc;
            }, {}),
            description: 'First day of the week (MONDAY, SUNDAY, SATURDAY)'
        });
        this.gqlTypesStorage.addGqlType('FirstDayOfTheWeek', firstDayOfWeekEnum);
        const groupByDateField = new _graphql.GraphQLInputObjectType({
            name: GROUP_BY_DATE_GRANULARITY_INPUT_KEY,
            fields: {
                granularity: {
                    type: dateGranularityEnum,
                    description: 'Date granularity (e.g. day, month, quarter, year, week, day of the week, quarter of the year, month of the year)'
                },
                weekStartDay: {
                    type: firstDayOfWeekEnum,
                    description: 'First day of the week (only applicable when granularity is WEEK). Defaults to MONDAY if not specified.'
                },
                timeZone: {
                    type: _graphql.GraphQLString,
                    description: 'Timezone used to compute the aggregate value and in which is expressed the granular period, for example a day in UTC-12 is not the same period as a day in UTC+3, the requester needs to precise this otherwise the server will assume a timezone and the requester cannot know in which timezone the aggregate values are computed.'
                }
            }
        });
        this.gqlTypesStorage.addGqlType(GROUP_BY_DATE_GRANULARITY_INPUT_KEY, groupByDateField);
        const orderByDateField = new _graphql.GraphQLInputObjectType({
            name: ORDER_BY_DATE_GRANULARITY_INPUT_KEY,
            fields: {
                orderBy: {
                    type: _enum.OrderByDirectionType
                },
                granularity: {
                    type: dateGranularityEnum
                }
            }
        });
        this.gqlTypesStorage.addGqlType(ORDER_BY_DATE_GRANULARITY_INPUT_KEY, orderByDateField);
    }
    constructor(gqlTypesStorage){
        this.gqlTypesStorage = gqlTypesStorage;
    }
};
GroupByDateGranularityInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], GroupByDateGranularityInputTypeGenerator);

//# sourceMappingURL=group-by-date-granularity-gql-input-type.generator.js.map