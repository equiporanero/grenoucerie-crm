/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyRowLevelPermissionPredicates", {
    enumerable: true,
    get: function() {
        return applyRowLevelPermissionPredicates;
    }
});
const _typeorm = require("typeorm");
const _graphqlqueryfilterfieldparser = require("../../api/graphql/graphql-query-runner/graphql-query-parsers/graphql-query-filter/graphql-query-filter-field.parser");
const _isuserauthcontextguard = require("../../core-modules/auth/guards/is-user-auth-context.guard");
const _buildrowlevelpermissionrecordfilterutil = require("./build-row-level-permission-record-filter.util");
const applyRowLevelPermissionPredicates = ({ queryBuilder, objectMetadata, internalContext, authContext, featureFlagMap: _featureFlagMap })=>{
    const userWorkspaceId = (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.userWorkspaceId : undefined;
    const roleId = userWorkspaceId ? internalContext.userWorkspaceRoleMap[userWorkspaceId] : undefined;
    const recordFilter = (0, _buildrowlevelpermissionrecordfilterutil.buildRowLevelPermissionRecordFilter)({
        flatRowLevelPermissionPredicateMaps: internalContext.flatRowLevelPermissionPredicateMaps,
        flatRowLevelPermissionPredicateGroupMaps: internalContext.flatRowLevelPermissionPredicateGroupMaps,
        flatFieldMetadataMaps: internalContext.flatFieldMetadataMaps,
        objectMetadata,
        roleId,
        workspaceMember: (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.workspaceMember : undefined
    });
    if (!recordFilter || Object.keys(recordFilter).length === 0) {
        return;
    }
    const isUpdateOrDeleteQuery = queryBuilder.expressionMap.queryType === 'update' || queryBuilder.expressionMap.queryType === 'soft-delete' || queryBuilder.expressionMap.queryType === 'delete';
    applyObjectRecordFilterToQueryBuilder({
        queryBuilder,
        objectNameSingular: objectMetadata.nameSingular,
        recordFilter,
        fieldParser: new _graphqlqueryfilterfieldparser.GraphqlQueryFilterFieldParser(objectMetadata, internalContext.flatFieldMetadataMaps),
        useDirectTableReference: isUpdateOrDeleteQuery
    });
};
const applyObjectRecordFilterToQueryBuilder = ({ queryBuilder, objectNameSingular, recordFilter, fieldParser, useDirectTableReference = false })=>{
    if (!recordFilter || Object.keys(recordFilter).length === 0) {
        return;
    }
    // parseKeyFilter only uses the join surface, so widen back to ObjectLiteral
    // here rather than threading the concrete T through every recursive call.
    const outerQueryBuilderAsObjectLiteral = queryBuilder;
    const whereCondition = new _typeorm.Brackets((qb)=>{
        Object.entries(recordFilter).forEach(([key, value], index)=>{
            parseKeyFilter({
                queryBuilder: qb,
                outerQueryBuilder: outerQueryBuilderAsObjectLiteral,
                objectNameSingular,
                key,
                value,
                isFirst: index === 0,
                fieldParser,
                useDirectTableReference
            });
        });
    });
    if (queryBuilder.expressionMap.wheres.length === 0) {
        queryBuilder.where(whereCondition);
    } else {
        queryBuilder.andWhere(whereCondition);
    }
};
const parseKeyFilter = ({ queryBuilder, outerQueryBuilder, objectNameSingular, key, value, isFirst, fieldParser, useDirectTableReference = false })=>{
    switch(key){
        case 'and':
            {
                const andWhereCondition = new _typeorm.Brackets((qb)=>{
                    value.forEach((filter, index)=>{
                        const whereCondition = new _typeorm.Brackets((qb2)=>{
                            Object.entries(filter).forEach(([subFilterKey, subFilterValue], subIndex)=>{
                                parseKeyFilter({
                                    queryBuilder: qb2,
                                    outerQueryBuilder,
                                    objectNameSingular,
                                    key: subFilterKey,
                                    value: subFilterValue,
                                    isFirst: subIndex === 0,
                                    fieldParser,
                                    useDirectTableReference
                                });
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
                            Object.entries(filter).forEach(([subFilterKey, subFilterValue], subIndex)=>{
                                parseKeyFilter({
                                    queryBuilder: qb2,
                                    outerQueryBuilder,
                                    objectNameSingular,
                                    key: subFilterKey,
                                    value: subFilterValue,
                                    isFirst: subIndex === 0,
                                    fieldParser,
                                    useDirectTableReference
                                });
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
                    Object.entries(value).forEach(([subFilterKey, subFilterValue], subIndex)=>{
                        parseKeyFilter({
                            queryBuilder: qb,
                            outerQueryBuilder,
                            objectNameSingular,
                            key: subFilterKey,
                            value: subFilterValue,
                            isFirst: subIndex === 0,
                            fieldParser,
                            useDirectTableReference
                        });
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
            fieldParser.parse(queryBuilder, outerQueryBuilder, objectNameSingular, key, value, isFirst, useDirectTableReference);
            break;
    }
};

//# sourceMappingURL=apply-row-level-permission-predicates.util.js.map