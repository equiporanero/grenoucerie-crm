"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphqlQueryFilterConditionParser", {
    enumerable: true,
    get: function() {
        return GraphqlQueryFilterConditionParser;
    }
});
const _typeorm = require("typeorm");
const _graphqlqueryfilterfieldparser = require("./graphql-query-filter-field.parser");
let GraphqlQueryFilterConditionParser = class GraphqlQueryFilterConditionParser {
    parse(queryBuilder, objectNameSingular, filter) {
        if (!filter || Object.keys(filter).length === 0) {
            return queryBuilder;
        }
        return queryBuilder.where(new _typeorm.Brackets((qb)=>{
            this.applyFilterEntriesToWhereBrackets(qb, queryBuilder, objectNameSingular, filter);
        }));
    }
    applyFilterEntriesToWhereBrackets(innerQueryBuilder, outerQueryBuilder, objectNameSingular, filter) {
        Object.entries(filter).forEach(([key, value], index)=>{
            this.parseKeyFilter(innerQueryBuilder, outerQueryBuilder, objectNameSingular, key, value, index === 0);
        });
    }
    parseKeyFilter(queryBuilder, outerQueryBuilder, objectNameSingular, key, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    value, isFirst = false) {
        switch(key){
            case 'and':
                {
                    const andWhereCondition = new _typeorm.Brackets((qb)=>{
                        value.forEach((filter, index)=>{
                            const whereCondition = new _typeorm.Brackets((qb2)=>{
                                Object.entries(filter).forEach(([subFilterkey, subFilterValue], index)=>{
                                    this.parseKeyFilter(qb2, outerQueryBuilder, objectNameSingular, subFilterkey, subFilterValue, index === 0);
                                });
                            });
                            if (index === 0) {
                                qb.where(whereCondition);
                            } else {
                                qb.andWhere(whereCondition);
                            }
                        });
                    });
                    if (isFirst) {
                        queryBuilder.where(andWhereCondition);
                    } else {
                        queryBuilder.andWhere(andWhereCondition);
                    }
                    break;
                }
            case 'or':
                {
                    const orWhereCondition = new _typeorm.Brackets((qb)=>{
                        value.forEach((filter, index)=>{
                            const whereCondition = new _typeorm.Brackets((qb2)=>{
                                Object.entries(filter).forEach(([subFilterkey, subFilterValue], index)=>{
                                    this.parseKeyFilter(qb2, outerQueryBuilder, objectNameSingular, subFilterkey, subFilterValue, index === 0);
                                });
                            });
                            if (index === 0) {
                                qb.where(whereCondition);
                            } else {
                                qb.orWhere(whereCondition);
                            }
                        });
                    });
                    if (isFirst) {
                        queryBuilder.where(orWhereCondition);
                    } else {
                        queryBuilder.andWhere(orWhereCondition);
                    }
                    break;
                }
            case 'not':
                {
                    const notWhereCondition = new _typeorm.NotBrackets((qb)=>{
                        Object.entries(value).forEach(([subFilterkey, subFilterValue], index)=>{
                            this.parseKeyFilter(qb, outerQueryBuilder, objectNameSingular, subFilterkey, subFilterValue, index === 0);
                        });
                    });
                    if (isFirst) {
                        queryBuilder.where(notWhereCondition);
                    } else {
                        queryBuilder.andWhere(notWhereCondition);
                    }
                    break;
                }
            default:
                this.queryFilterFieldParser.parse(queryBuilder, outerQueryBuilder, objectNameSingular, key, value, isFirst);
                break;
        }
    }
    constructor(flatObjectMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps, depth = 0){
        this.flatObjectMetadata = flatObjectMetadata;
        this.queryFilterFieldParser = new _graphqlqueryfilterfieldparser.GraphqlQueryFilterFieldParser(this.flatObjectMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps, depth);
    }
};

//# sourceMappingURL=graphql-query-filter-condition.parser.js.map