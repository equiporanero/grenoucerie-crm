"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonGroupByQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonGroupByQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _commonbasequeryrunnerservice = require("./common-base-query-runner.service");
const _commonqueryrunnerexception = require("./errors/common-query-runner.exception");
const _standarderrormessageconstant = require("./errors/standard-error-message.constant");
const _getgroupbydefinitionsutil = require("./utils/get-group-by-definitions.util");
const _getobjectaliasforgroupbyutil = require("./utils/get-object-alias-for-group-by.util");
const _isgroupbyrelationfieldutil = require("./utils/is-group-by-relation-field.util");
const _commonqueryargstype = require("../types/common-query-args.type");
const _formatresultwithgroupbydimensionvaluesutil = require("../../graphql/graphql-query-runner/group-by/resolvers/utils/format-result-with-group-by-dimension-values.util");
const _groupbywithrecordsservice = require("../../graphql/graphql-query-runner/group-by/services/group-by-with-records.service");
const _getgrouplimitutil = require("../../graphql/graphql-query-runner/group-by/utils/get-group-limit.util");
const _processaggregatehelper = require("../../graphql/graphql-query-runner/helpers/process-aggregate.helper");
const _getflatfieldsforflatobjectmetadatautil = require("../../graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _viewfiltergroupservice = require("../../../metadata-modules/view-filter-group/services/view-filter-group.service");
const _viewfilterservice = require("../../../metadata-modules/view-filter/services/view-filter.service");
const _viewservice = require("../../../metadata-modules/view/services/view.service");
const _formatcolumnnameforrelationfieldutil = require("../../../twenty-orm/utils/format-column-name-for-relation-field.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CommonGroupByQueryRunnerService = class CommonGroupByQueryRunnerService extends _commonbasequeryrunnerservice.CommonBaseQueryRunnerService {
    async run(args, queryRunnerContext) {
        const { repository, commonQueryParser, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext } = queryRunnerContext;
        const objectMetadataNameSingular = flatObjectMetadata.nameSingular;
        let queryBuilder = repository.createQueryBuilder(objectMetadataNameSingular);
        const groupByFields = this.groupByArgProcessor.validateAndTransformGroupByFieldsOrThrow({
            groupBy: args.groupBy,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        const objectAlias = (0, _getobjectaliasforgroupbyutil.getObjectAlias)(flatObjectMetadata);
        this.addJoinForGroupByOnRelationFields({
            queryBuilder,
            groupByFields,
            objectAlias
        });
        let appliedFilters = args.filter ?? {};
        await this.addFiltersToQueryBuilder({
            args,
            appliedFilters,
            queryBuilder,
            flatObjectMetadata,
            flatFieldMetadataMaps,
            workspaceId: authContext.workspace.id,
            commonQueryParser
        });
        const queryBuilderWithFiltersAndWithoutGroupBy = queryBuilder.clone();
        _processaggregatehelper.ProcessAggregateHelper.addSelectedAggregatedFieldsQueriesToQueryBuilder({
            selectedAggregatedFields: args.selectedFieldsResult.aggregate,
            queryBuilder,
            objectMetadataNameSingular
        });
        const groupByDefinitions = (0, _getgroupbydefinitionsutil.getGroupByDefinitions)({
            groupByFields,
            objectMetadataNameSingular
        });
        groupByDefinitions.forEach((groupByColumn, index)=>{
            queryBuilder.addSelect(groupByColumn.expression, groupByColumn.alias);
            if (index === 0) {
                queryBuilder.groupBy(groupByColumn.expression);
            } else {
                queryBuilder.addGroupBy(groupByColumn.expression);
            }
        });
        commonQueryParser.applyGroupByOrderToBuilder(queryBuilder, args.orderBy ?? [], groupByFields);
        const shouldIncludeRecords = args.includeRecords ?? false;
        if (shouldIncludeRecords) {
            return this.groupByWithRecordsService.resolveWithRecords({
                queryBuilderWithFiltersAndWithoutGroupBy,
                queryBuilderWithGroupBy: queryBuilder,
                groupByDefinitions,
                selectedFieldsResult: args.selectedFieldsResult,
                queryRunnerContext,
                orderByForRecords: args.orderByForRecords ?? [],
                groupLimit: args.limit,
                offsetForRecords: args.offsetForRecords
            });
        }
        return this.resolveWithoutRecords({
            queryBuilder,
            groupByDefinitions,
            selectedFieldsResult: args.selectedFieldsResult,
            groupLimit: args.limit
        });
    }
    async processQueryResult(queryResult, _flatObjectMetadata, _flatObjectMetadataMaps, _flatFieldMetadataMaps, _authContext) {
        return queryResult;
    }
    async addFiltersFromView({ args, flatObjectMetadata, flatFieldMetadataMaps, appliedFilters, workspaceId }) {
        (0, _utils.assertIsDefinedOrThrow)(args.viewId);
        const viewFilters = await this.viewFilterService.findByViewId(workspaceId, args.viewId);
        const viewFilterGroups = await this.viewFilterGroupService.findByViewId(workspaceId, args.viewId);
        const recordFilters = viewFilters.map((viewFilter)=>{
            const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: viewFilter.fieldMetadataId,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!fieldMetadata) {
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Field metadata not found for field ${viewFilter.fieldMetadataId}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INTERNAL_SERVER_ERROR, {
                    userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                });
            }
            return {
                id: viewFilter.id,
                fieldMetadataId: viewFilter.fieldMetadataId,
                value: (0, _utils.convertViewFilterValueToString)(viewFilter.value),
                type: (0, _utils.getFilterTypeFromFieldType)(fieldMetadata.type),
                operand: viewFilter.operand,
                recordFilterGroupId: viewFilter.viewFilterGroupId,
                positionInRecordFilterGroup: viewFilter.positionInViewFilterGroup,
                subFieldName: viewFilter.subFieldName,
                relationTargetFieldMetadataId: viewFilter.relationTargetFieldMetadataId ?? null
            };
        });
        const recordFilterGroups = viewFilterGroups.map((viewFilterGroup)=>{
            return {
                id: viewFilterGroup.id,
                logicalOperator: viewFilterGroup.logicalOperator,
                parentRecordFilterGroupId: viewFilterGroup.parentViewFilterGroupId
            };
        });
        const fields = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps).map((field)=>({
                id: field.id,
                name: field.name,
                type: field.type,
                label: field.label,
                options: field.options
            }));
        const filtersFromView = (0, _utils.computeRecordGqlOperationFilter)({
            recordFilters,
            recordFilterGroups: recordFilterGroups,
            fieldMetadataItems: Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined),
            filterValueDependencies: {
                timeZone: 'UTC'
            }
        });
        const viewFromFilter = viewFilters[0]?.view;
        let viewAnyFieldFilterValue = viewFromFilter?.anyFieldFilterValue;
        if (!(0, _utils.isDefined)(viewFromFilter)) {
            const view = await this.viewService.findById(args.viewId, workspaceId);
            viewAnyFieldFilterValue = view?.anyFieldFilterValue ?? null;
        }
        const { recordGqlOperationFilter: anyFieldFilter } = (0, _utils.turnAnyFieldFilterIntoRecordGqlFilter)({
            fields,
            filterValue: viewAnyFieldFilterValue ?? ''
        });
        appliedFilters = (0, _utils.combineFilters)([
            appliedFilters,
            filtersFromView,
            anyFieldFilter
        ]);
        return appliedFilters;
    }
    async addFiltersToQueryBuilder({ args, appliedFilters, queryBuilder, flatObjectMetadata, flatFieldMetadataMaps, workspaceId, commonQueryParser }) {
        const objectMetadataNameSingular = flatObjectMetadata.nameSingular;
        if (args.viewId) {
            appliedFilters = await this.addFiltersFromView({
                args,
                flatObjectMetadata,
                flatFieldMetadataMaps,
                appliedFilters,
                workspaceId
            });
        }
        commonQueryParser.applyFilterToBuilder(queryBuilder, objectMetadataNameSingular, appliedFilters);
        commonQueryParser.applyDeletedAtToBuilder(queryBuilder, appliedFilters);
    }
    async resolveWithoutRecords({ queryBuilder, groupByDefinitions, selectedFieldsResult, groupLimit }) {
        const effectiveGroupLimit = (0, _getgrouplimitutil.getGroupLimit)(groupLimit);
        queryBuilder.limit(effectiveGroupLimit);
        const result = await queryBuilder.getRawMany();
        return (0, _formatresultwithgroupbydimensionvaluesutil.formatResultWithGroupByDimensionValues)({
            groupsResult: result,
            groupByDefinitions,
            aggregateFieldNames: Object.keys(selectedFieldsResult.aggregate)
        });
    }
    addJoinForGroupByOnRelationFields({ queryBuilder, groupByFields, objectAlias }) {
        const joinAliasSet = new Set();
        for (const groupByField of groupByFields){
            if ((0, _isgroupbyrelationfieldutil.isGroupByRelationField)(groupByField)) {
                const joinAlias = groupByField.fieldMetadata.name;
                if (!groupByField.fieldMetadata.settings || !(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(groupByField.fieldMetadata)) {
                    throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Field metadata settings are missing or invalid for field ${groupByField.fieldMetadata.name}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INTERNAL_SERVER_ERROR, {
                        userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                    });
                }
                const joinColumnName = (0, _formatcolumnnameforrelationfieldutil.formatColumnNameForRelationField)(groupByField.fieldMetadata.name, groupByField.fieldMetadata.settings);
                if (!joinAliasSet.has(joinAlias)) {
                    queryBuilder.leftJoin(`${objectAlias}.${joinAlias}`, `${joinAlias}`, `"${objectAlias}"."${joinColumnName}" = "${joinAlias}"."id"`);
                    joinAliasSet.add(joinAlias);
                }
            }
        }
    }
    async validate(args, queryRunnerContext) {
        const normalizedGroupBy = this.groupByArgProcessor.process({
            groupBy: args.groupBy
        });
        this.groupByArgProcessor.validateAndTransformGroupByFieldsOrThrow({
            groupBy: normalizedGroupBy,
            flatObjectMetadata: queryRunnerContext.flatObjectMetadata,
            flatObjectMetadataMaps: queryRunnerContext.flatObjectMetadataMaps,
            flatFieldMetadataMaps: queryRunnerContext.flatFieldMetadataMaps
        });
    }
    async computeArgs(args, queryRunnerContext) {
        const { flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps } = queryRunnerContext;
        return {
            ...args,
            groupBy: this.groupByArgProcessor.process({
                groupBy: args.groupBy
            }),
            orderBy: this.orderByWithGroupByArgProcessor.process({
                orderBy: args.orderBy
            }),
            orderByForRecords: this.orderByArgProcessor.process({
                orderBy: args.orderByForRecords
            }),
            filter: this.filterArgProcessor.process({
                filter: args.filter,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps
            })
        };
    }
    computeQueryComplexity(selectedFieldsResult, args, _queryRunnerContext) {
        const groupByQueryComplexity = 1;
        const simpleFieldsComplexity = 1;
        const selectedFieldsComplexity = simpleFieldsComplexity + (selectedFieldsResult.relationFieldsCount ?? 0);
        return args.includeRecords ?? false ? groupByQueryComplexity + selectedFieldsComplexity * (0, _getgrouplimitutil.getGroupLimit)(args.limit) : groupByQueryComplexity;
    }
    constructor(viewFilterService, viewFilterGroupService, viewService, groupByWithRecordsService){
        super(), this.viewFilterService = viewFilterService, this.viewFilterGroupService = viewFilterGroupService, this.viewService = viewService, this.groupByWithRecordsService = groupByWithRecordsService, this.operationName = _commonqueryargstype.CommonQueryNames.GROUP_BY, this.isReadOnly = true;
    }
};
CommonGroupByQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfilterservice.ViewFilterService === "undefined" ? Object : _viewfilterservice.ViewFilterService,
        typeof _viewfiltergroupservice.ViewFilterGroupService === "undefined" ? Object : _viewfiltergroupservice.ViewFilterGroupService,
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService,
        typeof _groupbywithrecordsservice.GroupByWithRecordsService === "undefined" ? Object : _groupbywithrecordsservice.GroupByWithRecordsService
    ])
], CommonGroupByQueryRunnerService);

//# sourceMappingURL=common-group-by-query-runner.service.js.map