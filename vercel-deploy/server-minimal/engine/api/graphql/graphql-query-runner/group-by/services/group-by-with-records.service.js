"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GroupByWithRecordsService", {
    enumerable: true,
    get: function() {
        return GroupByWithRecordsService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _lodashisempty = /*#__PURE__*/ _interop_require_default(require("lodash.isempty"));
const _utils = require("twenty-shared/utils");
const _processnestedrelationshelper = require("../../../../common/common-nested-relations-processor/process-nested-relations.helper");
const _getobjectaliasforgroupbyutil = require("../../../../common/common-query-runners/utils/get-object-alias-for-group-by.util");
const _commonresultgettersservice = require("../../../../common/common-result-getters/common-result-getters.service");
const _graphqlqueryparser = require("../../graphql-query-parsers/graphql-query.parser");
const _addrelationjoinaliasutil = require("../../graphql-query-parsers/utils/add-relation-join-alias.util");
const _formatresultwithgroupbydimensionvaluesutil = require("../resolvers/utils/format-result-with-group-by-dimension-values.util");
const _getgrouplimitutil = require("../utils/get-group-limit.util");
const _buildcolumnstoselect = require("../../utils/build-columns-to-select");
const _applyrowlevelpermissionpredicatesutil = require("../../../../../twenty-orm/utils/apply-row-level-permission-predicates.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const RECORDS_PER_GROUP_LIMIT = 10;
const RELATIONS_PER_RECORD_LIMIT = 5;
const SUB_QUERY_PREFIX = 'sub_query_';
let GroupByWithRecordsService = class GroupByWithRecordsService {
    async resolveWithRecords({ queryBuilderWithGroupBy, queryBuilderWithFiltersAndWithoutGroupBy, groupByDefinitions, selectedFieldsResult, queryRunnerContext, orderByForRecords, groupLimit, offsetForRecords }) {
        const effectiveGroupLimit = (0, _getgrouplimitutil.getGroupLimit)(groupLimit);
        const groupsResult = await queryBuilderWithGroupBy.limit(effectiveGroupLimit).getRawMany();
        if (groupsResult.length === 0) {
            return [];
        }
        const { authContext, workspaceDataSource, rolePermissionConfig, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, repository } = queryRunnerContext;
        const columnsToSelect = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select: selectedFieldsResult.select,
            relations: selectedFieldsResult.relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        (0, _applyrowlevelpermissionpredicatesutil.applyRowLevelPermissionPredicates)({
            queryBuilder: queryBuilderWithFiltersAndWithoutGroupBy,
            objectMetadata: flatObjectMetadata,
            internalContext: queryBuilderWithFiltersAndWithoutGroupBy.internalContext,
            authContext: queryBuilderWithFiltersAndWithoutGroupBy.authContext,
            featureFlagMap: queryBuilderWithFiltersAndWithoutGroupBy.featureFlagMap
        });
        const queryBuilderWithPartitionBy = this.addPartitionByToQueryBuilder({
            queryBuilderForSubQuery: queryBuilderWithFiltersAndWithoutGroupBy,
            columnsToSelect,
            groupsResult,
            groupByDefinitions,
            repository,
            orderByForRecords,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            offsetForRecords
        });
        const recordsResult = await queryBuilderWithPartitionBy.getRawMany();
        const allRecords = recordsResult.flatMap((group)=>group.records).filter(_utils.isDefined);
        if (!(0, _lodashisempty.default)(selectedFieldsResult.relations)) {
            await this.processNestedRelationsHelper.processNestedRelations({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                parentObjectMetadataItem: flatObjectMetadata,
                parentObjectRecords: allRecords,
                parentObjectRecordsAggregatedValues: {},
                relations: selectedFieldsResult.relations,
                aggregate: selectedFieldsResult.aggregate,
                limit: RELATIONS_PER_RECORD_LIMIT,
                authContext,
                workspaceDataSource,
                rolePermissionConfig,
                selectedFields: selectedFieldsResult.select
            });
        }
        return await (0, _formatresultwithgroupbydimensionvaluesutil.formatResultWithGroupByDimensionValues)({
            groupsResult,
            recordsResult,
            groupByDefinitions,
            aggregateFieldNames: Object.keys(selectedFieldsResult.aggregate),
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            processRecord: (record)=>this.commonResultGettersService.processRecord(record, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext.workspace.id)
        });
    }
    addPartitionByToQueryBuilder({ queryBuilderForSubQuery, columnsToSelect, groupsResult, groupByDefinitions, repository, orderByForRecords, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, offsetForRecords = 0 }) {
        const groupByAliases = groupByDefinitions.map((def)=>`"${def.alias}"`).join(', ');
        const groupConditions = this.buildGroupConditions(groupsResult, groupByDefinitions, queryBuilderForSubQuery);
        const objectAlias = (0, _getobjectaliasforgroupbyutil.getObjectAlias)(flatObjectMetadata);
        const recordSelectWithAlias = Object.keys(columnsToSelect).map((col)=>`"${objectAlias}"."${col}" as "${SUB_QUERY_PREFIX}${col}"`).join(', ');
        const groupBySelectWithAlias = groupByDefinitions.map((def)=>`${def.expression} as "${def.alias}"`).join(', ');
        const subQuery = queryBuilderForSubQuery.select(recordSelectWithAlias).addSelect(groupBySelectWithAlias).andWhere(groupConditions);
        this.applyPartitionByToBuilder({
            groupByDefinitions,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            orderByForRecords,
            queryBuilder: subQuery
        });
        let mainQueryQueryBuilder = repository.createQueryBuilder();
        const pageStart = offsetForRecords;
        const pageEnd = offsetForRecords + RECORDS_PER_GROUP_LIMIT;
        const mainQuery = mainQueryQueryBuilder.from(`(${subQuery.getQuery()})`, 'ranked_records').setParameters(queryBuilderForSubQuery.expressionMap.parameters).select(groupByAliases).addSelect(`JSON_AGG(
        CASE WHEN record_row_number > ${pageStart} AND record_row_number <= ${pageEnd} THEN
          JSON_BUILD_OBJECT(
            ${[
            ...Object.keys(columnsToSelect).map((col)=>`'${col}', "${SUB_QUERY_PREFIX}${col}"`),
            ...groupByDefinitions.map((def)=>`'${def.alias}', "${def.alias}"`)
        ].join(',\n              ')}
          )
        END
      ) FILTER (WHERE record_row_number > ${pageStart} AND record_row_number <= ${pageEnd})`, 'records').groupBy(groupByAliases);
        // Remove initial "from" condition (typeOrm limitation)
        mainQuery.expressionMap.aliases = mainQuery.expressionMap.aliases.filter((alias)=>(0, _utils.isDefined)(alias.subQuery));
        return mainQuery;
    }
    applyPartitionByToBuilder({ groupByDefinitions, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, orderByForRecords, queryBuilder }) {
        const groupByExpressions = groupByDefinitions.map((def)=>def.expression).join(', ');
        const hasOrderByForRecords = !(0, _lodashisempty.default)(orderByForRecords);
        if (hasOrderByForRecords) {
            const graphqlQueryParser = new _graphqlqueryparser.GraphqlQueryParser(flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps);
            const { orderByRawSQL, relationJoins } = graphqlQueryParser.getOrderByRawSQL(orderByForRecords, flatObjectMetadata.nameSingular);
            if ((0, _guards.isNonEmptyString)(orderByRawSQL)) {
                for (const joinInfo of relationJoins){
                    (0, _addrelationjoinaliasutil.addRelationJoinAliasToQueryBuilder)({
                        queryBuilder,
                        parentAlias: flatObjectMetadata.nameSingular,
                        relationName: joinInfo.joinAlias
                    });
                }
                return queryBuilder.addSelect(`ROW_NUMBER() OVER (PARTITION BY ${groupByExpressions} ${orderByRawSQL})`, 'record_row_number');
            }
        }
        return queryBuilder.addSelect(`ROW_NUMBER() OVER (PARTITION BY ${groupByExpressions})`, 'record_row_number');
    }
    buildGroupConditions(groupsResult, groupByDefinitions, queryBuilder) {
        const groupConditions = groupsResult.map((group, groupIndex)=>{
            const conditions = groupByDefinitions.map((def, defIndex)=>{
                const paramName = `groupValue_${groupIndex}_${defIndex}`;
                const paramValue = group[def.alias];
                if (!(0, _utils.isDefined)(paramValue)) {
                    return `${def.expression} IS NULL`;
                }
                queryBuilder.setParameter(paramName, paramValue);
                return `${def.expression} = :${paramName}`;
            }).join(' AND ');
            return `(${conditions})`;
        });
        return `(${groupConditions.join(' OR ')})`;
    }
    constructor(){}
};
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _processnestedrelationshelper.ProcessNestedRelationsHelper === "undefined" ? Object : _processnestedrelationshelper.ProcessNestedRelationsHelper)
], GroupByWithRecordsService.prototype, "processNestedRelationsHelper", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _commonresultgettersservice.CommonResultGettersService === "undefined" ? Object : _commonresultgettersservice.CommonResultGettersService)
], GroupByWithRecordsService.prototype, "commonResultGettersService", void 0);
GroupByWithRecordsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], GroupByWithRecordsService);

//# sourceMappingURL=group-by-with-records.service.js.map