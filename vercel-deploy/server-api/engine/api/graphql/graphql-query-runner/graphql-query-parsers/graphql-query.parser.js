"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphqlQueryParser", {
    enumerable: true,
    get: function() {
        return GraphqlQueryParser;
    }
});
const _guards = require("@sniptt/guards");
const _classvalidator = require("class-validator");
const _graphqlqueryfilterconditionparser = require("./graphql-query-filter/graphql-query-filter-condition.parser");
const _graphqlqueryordergroupbyparser = require("./graphql-query-order/graphql-query-order-group-by.parser");
const _graphqlqueryorderparser = require("./graphql-query-order/graphql-query-order.parser");
const _graphqlselectedfieldsparser = require("./graphql-query-selected-fields/graphql-selected-fields.parser");
const _addrelationjoinaliasutil = require("./utils/add-relation-join-alias.util");
let GraphqlQueryParser = class GraphqlQueryParser {
    applyFilterToBuilder(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    queryBuilder, objectNameSingular, recordFilter) {
        return this.filterConditionParser.parse(queryBuilder, objectNameSingular, recordFilter);
    }
    applyDeletedAtToBuilder(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    queryBuilder, recordFilter) {
        if (this.checkForDeletedAtFilter(recordFilter)) {
            queryBuilder.withDeleted();
        }
        return queryBuilder;
    }
    applyOrderToBuilder(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    queryBuilder, orderBy, objectNameSingular, isForwardPagination = true) {
        const parseResult = this.orderFieldParser.parse(orderBy, objectNameSingular, isForwardPagination);
        for (const joinInfo of parseResult.relationJoins){
            (0, _addrelationjoinaliasutil.addRelationJoinAliasToQueryBuilder)({
                queryBuilder,
                parentAlias: objectNameSingular,
                relationName: joinInfo.joinAlias
            });
        }
        queryBuilder.orderBy(parseResult.orderBy);
        // Return parsed orderBy so caller can add relation columns after setFindOptions
        return parseResult.orderBy;
    }
    addRelationOrderColumnsToBuilder(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    queryBuilder, parsedOrderBy, objectNameSingular, columnsToSelect) {
        // Add ORDER BY columns with underscore alias for DISTINCT compatibility
        // This must be called AFTER setFindOptions because setFindOptions clears addSelect
        // We need to add columns that are in orderBy but NOT in the selected columns
        for (const orderByKey of Object.keys(parsedOrderBy)){
            const parts = orderByKey.split('.');
            if (parts.length === 2) {
                const [alias, column] = parts;
                // For relation columns: always add (they're never in columnsToSelect)
                // For main entity columns: only add if NOT already in columnsToSelect
                const isMainEntity = alias === objectNameSingular;
                const isAlreadySelected = isMainEntity && columnsToSelect[column];
                if (!isAlreadySelected) {
                    queryBuilder.addSelect(`"${alias}"."${column}"`, `${alias}_${column}`);
                }
            }
        }
    }
    getOrderByRawSQL(orderBy, objectNameSingular, isForwardPagination = true) {
        const parseResult = this.orderFieldParser.parse(orderBy, objectNameSingular, isForwardPagination);
        const orderByRawSQLClauseArray = Object.entries(parseResult.orderBy).map(([orderByField, orderByCondition])=>{
            const nullsCondition = (0, _classvalidator.isDefined)(orderByCondition.nulls) ? ` ${orderByCondition.nulls}` : '';
            // Convert "alias.column" to quoted SQL identifier "alias"."column"
            const parts = orderByField.split('.');
            const quotedColumn = parts.length === 2 ? `"${parts[0]}"."${parts[1]}"` : `"${orderByField}"`;
            // Build column expression with optional ::text cast and LOWER()
            let columnExpr = quotedColumn;
            if (orderByCondition.castToText) {
                columnExpr = `${columnExpr}::text`;
            }
            if (orderByCondition.useLower) {
                columnExpr = `LOWER(${columnExpr})`;
            }
            return `${columnExpr} ${orderByCondition.order}${nullsCondition}`;
        });
        const orderByRawSQLString = orderByRawSQLClauseArray.join(', ');
        const orderByRawSQL = (0, _guards.isNonEmptyString)(orderByRawSQLString) ? `ORDER BY ${orderByRawSQLString}` : '';
        return {
            orderByRawSQL,
            relationJoins: parseResult.relationJoins
        };
    }
    applyGroupByOrderToBuilder(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    queryBuilder, orderBy, groupByFields) {
        const parsedOrderBys = this.orderGroupByParser.parse({
            orderBy,
            groupByFields
        });
        parsedOrderBys.forEach((orderByField, index)=>{
            Object.entries(orderByField).forEach(([expression, direction])=>{
                if (index === 0) {
                    queryBuilder.orderBy(expression, direction.order, direction.nulls);
                } else {
                    queryBuilder.addOrderBy(expression, direction.order, direction.nulls);
                }
            });
        });
        return queryBuilder;
    }
    parseSelectedFields(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    graphqlSelectedFields) {
        const selectedFieldsParser = new _graphqlselectedfieldsparser.GraphqlQuerySelectedFieldsParser(this.flatObjectMetadataMaps, this.flatFieldMetadataMaps);
        return selectedFieldsParser.parse(graphqlSelectedFields, this.flatObjectMetadata);
    }
    constructor(flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps){
        this.checkForDeletedAtFilter = (filter)=>{
            if (Array.isArray(filter)) {
                return filter.some((subFilter)=>this.checkForDeletedAtFilter(subFilter));
            }
            for (const [key, value] of Object.entries(filter)){
                if (key === 'deletedAt') {
                    return true;
                }
                // Only recurse into boolean-operator wrappers (and / or / not) — those
                // are transparent w.r.t. which entity owns a deletedAt. Composite
                // sub-field and relation-traversal nesting refers to a different
                // entity's deletedAt, which must not widen the root query.
                if ((key === 'and' || key === 'or' || key === 'not') && typeof value === 'object' && value !== null && this.checkForDeletedAtFilter(value)) {
                    return true;
                }
            }
            return false;
        };
        this.flatObjectMetadata = flatObjectMetadata;
        this.flatObjectMetadataMaps = flatObjectMetadataMaps;
        this.flatFieldMetadataMaps = flatFieldMetadataMaps;
        this.filterConditionParser = new _graphqlqueryfilterconditionparser.GraphqlQueryFilterConditionParser(this.flatObjectMetadata, this.flatFieldMetadataMaps, this.flatObjectMetadataMaps);
        this.orderFieldParser = new _graphqlqueryorderparser.GraphqlQueryOrderFieldParser(this.flatObjectMetadata, this.flatObjectMetadataMaps, this.flatFieldMetadataMaps);
        this.orderGroupByParser = new _graphqlqueryordergroupbyparser.GraphqlQueryOrderGroupByParser(this.flatObjectMetadata, this.flatObjectMetadataMaps, this.flatFieldMetadataMaps);
    }
};

//# sourceMappingURL=graphql-query.parser.js.map