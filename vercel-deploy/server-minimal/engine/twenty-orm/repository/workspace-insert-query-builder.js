"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceInsertQueryBuilder", {
    enumerable: true,
    get: function() {
        return WorkspaceInsertQueryBuilder;
    }
});
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _databaseeventaction = require("../../api/graphql/graphql-query-runner/enums/database-event-action");
const _computetwentyormexception = require("../error-handling/compute-twenty-orm-exception");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const _filesfieldsync = require("../field-operations/files-field-sync/files-field-sync");
const _relationnestedqueries = require("../field-operations/relation-nested-queries/relation-nested-queries");
const _permissionsutils = require("./permissions.utils");
const _workspaceselectquerybuilder = require("./workspace-select-query-builder");
const _formatdatautil = require("../utils/format-data.util");
const _formatresultutil = require("../utils/format-result.util");
const _formattwentyormeventtodatabasebatcheventutil = require("../utils/format-twenty-orm-event-to-database-batch-event.util");
const _getobjectmetadatafromentitytargetutil = require("../utils/get-object-metadata-from-entity-target.util");
const _validaterlspredicatesforrecordsutil = require("../utils/validate-rls-predicates-for-records.util");
let WorkspaceInsertQueryBuilder = class WorkspaceInsertQueryBuilder extends _typeorm.InsertQueryBuilder {
    get relationNestedQueries() {
        return this._relationNestedQueries ??= new _relationnestedqueries.RelationNestedQueries(this.internalContext);
    }
    get filesFieldSync() {
        return this._filesFieldSync ??= new _filesfieldsync.FilesFieldSync(this.internalContext);
    }
    clone() {
        const clonedQueryBuilder = super.clone();
        return new WorkspaceInsertQueryBuilder(clonedQueryBuilder, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
    }
    values(values) {
        const mainAliasTarget = this.getMainAliasTarget();
        this.relationNestedConfig = this.relationNestedQueries.prepareNestedRelationQueries(values, mainAliasTarget);
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
        const formattedValues = (0, _formatdatautil.formatData)(values, objectMetadata, this.internalContext.flatFieldMetadataMaps);
        return super.values(formattedValues);
    }
    async execute() {
        try {
            (0, _permissionsutils.validateQueryIsPermittedOrThrow)({
                expressionMap: this.expressionMap,
                objectsPermissions: this.objectRecordsPermissions,
                flatObjectMetadataMaps: this.internalContext.flatObjectMetadataMaps,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                objectIdByNameSingular: this.internalContext.objectIdByNameSingular,
                shouldBypassPermissionChecks: this.shouldBypassPermissionChecks
            });
            // Fix overwrites for composite fields - valuesSet contains formatted/flattened column names
            // but overwrites was computed before formatData, missing composite field columns
            if ((0, _utils.isDefined)(this.expressionMap.onUpdate?.overwrite) && (0, _utils.isDefined)(this.expressionMap.valuesSet)) {
                const valuesArray = Array.isArray(this.expressionMap.valuesSet) ? this.expressionMap.valuesSet : [
                    this.expressionMap.valuesSet
                ];
                const allValueKeys = new Set(valuesArray.flatMap((value)=>Object.keys(value)));
                const mainAliasMetadata = this.expressionMap.mainAlias?.metadata;
                if (mainAliasMetadata) {
                    const missingColumns = mainAliasMetadata.columns.filter((col)=>allValueKeys.has(col.databaseName) && !this.expressionMap.onUpdate.overwrite.includes(col.databaseName)).map((col)=>col.databaseName);
                    this.expressionMap.onUpdate.overwrite = [
                        ...this.expressionMap.onUpdate.overwrite,
                        ...missingColumns
                    ];
                }
            }
            const mainAliasTarget = this.getMainAliasTarget();
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
            let filesFieldFileIds = null;
            const entities = Array.isArray(this.expressionMap.valuesSet) ? this.expressionMap.valuesSet : [
                this.expressionMap.valuesSet
            ];
            const filesFieldDiffByEntityIndex = this.filesFieldSync.computeFilesFieldDiffBeforeInsert(entities, mainAliasTarget);
            if ((0, _utils.isDefined)(filesFieldDiffByEntityIndex)) {
                const result = await this.filesFieldSync.enrichFilesFields({
                    entities: entities,
                    filesFieldDiffByEntityIndex,
                    workspaceId: this.internalContext.workspaceId,
                    target: mainAliasTarget
                });
                filesFieldFileIds = result.fileIds;
                this.expressionMap.valuesSet = Array.isArray(this.expressionMap.valuesSet) ? result.entities : result.entities[0];
            }
            if ((0, _utils.isDefined)(this.relationNestedConfig)) {
                const nestedRelationQueryBuilder = new _workspaceselectquerybuilder.WorkspaceSelectQueryBuilder(this, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
                const updatedValues = await this.relationNestedQueries.processRelationNestedQueries({
                    entities: this.expressionMap.valuesSet,
                    relationNestedConfig: this.relationNestedConfig,
                    queryBuilder: nestedRelationQueryBuilder
                });
                this.expressionMap.valuesSet = updatedValues;
            }
            this.validateRLSPredicatesForInsert();
            const result = await super.execute();
            if ((0, _utils.isDefined)(filesFieldFileIds)) {
                await this.filesFieldSync.updateFileEntityRecords(filesFieldFileIds);
            }
            const eventSelectQueryBuilder = this.connection.manager.createQueryBuilder(mainAliasTarget, this.expressionMap.mainAlias?.metadata.name ?? '', undefined, {
                shouldBypassPermissionChecks: true
            });
            eventSelectQueryBuilder.whereInIds(result.identifiers.map((identifier)=>identifier.id));
            const afterResult = await eventSelectQueryBuilder.getMany({
                noFormatting: true
            });
            const formattedResultForEvent = (0, _formatresultutil.formatResult)(afterResult, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                action: _databaseeventaction.DatabaseEventAction.CREATED,
                objectMetadataItem: objectMetadata,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                workspaceId: this.internalContext.workspaceId,
                recordsAfter: formattedResultForEvent,
                authContext: this.authContext
            }));
            this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                action: _databaseeventaction.DatabaseEventAction.UPSERTED,
                objectMetadataItem: objectMetadata,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                workspaceId: this.internalContext.workspaceId,
                recordsAfter: formattedResultForEvent,
                authContext: this.authContext
            }));
            // TypeORM returns all entity columns for insertions
            const resultWithoutInsertionExtraColumns = !(0, _utils.isDefined)(result.raw) ? [] : result.raw.map((rawResult)=>Object.keys(rawResult).filter((key)=>this.expressionMap.returning.includes(key) || this.expressionMap.returning === '*').reduce((filtered, key)=>{
                    filtered[key] = rawResult[key];
                    return filtered;
                }, {}));
            const formattedResult = (0, _formatresultutil.formatResult)(resultWithoutInsertionExtraColumns, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            return {
                raw: resultWithoutInsertionExtraColumns,
                generatedMaps: formattedResult,
                identifiers: result.identifiers
            };
        } catch (error) {
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(this.getMainAliasTarget(), this.internalContext);
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error, objectMetadata, this.connection.manager, this.internalContext);
        }
    }
    validateRLSPredicatesForInsert() {
        const mainAliasTarget = this.getMainAliasTarget();
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
        const valuesToInsert = Array.isArray(this.expressionMap.valuesSet) ? this.expressionMap.valuesSet : [
            this.expressionMap.valuesSet
        ];
        const valuesToInsertFormatted = (0, _formatresultutil.formatResult)(valuesToInsert, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
        (0, _validaterlspredicatesforrecordsutil.validateRLSPredicatesForRecords)({
            records: valuesToInsertFormatted,
            objectMetadata,
            internalContext: this.internalContext,
            authContext: this.authContext,
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks
        });
    }
    getMainAliasTarget() {
        const mainAliasTarget = this.expressionMap.mainAlias?.target;
        if (!mainAliasTarget) {
            throw new _twentyormexception.TwentyORMException('Main alias target is missing', _twentyormexception.TwentyORMExceptionCode.MISSING_MAIN_ALIAS_TARGET);
        }
        return mainAliasTarget;
    }
    select() {
        throw new _twentyormexception.TwentyORMException('This builder cannot morph into a select builder', _twentyormexception.TwentyORMExceptionCode.METHOD_NOT_ALLOWED);
    }
    update() {
        throw new _twentyormexception.TwentyORMException('This builder cannot morph into an update builder', _twentyormexception.TwentyORMExceptionCode.METHOD_NOT_ALLOWED);
    }
    delete() {
        throw new _twentyormexception.TwentyORMException('This builder cannot morph into a delete builder', _twentyormexception.TwentyORMExceptionCode.METHOD_NOT_ALLOWED);
    }
    softDelete() {
        throw new _twentyormexception.TwentyORMException('This builder cannot morph into a soft delete builder', _twentyormexception.TwentyORMExceptionCode.METHOD_NOT_ALLOWED);
    }
    restore() {
        throw new _twentyormexception.TwentyORMException('This builder cannot morph into a soft delete builder', _twentyormexception.TwentyORMExceptionCode.METHOD_NOT_ALLOWED);
    }
    setWorkspaceAuthContext(authContext) {
        this.authContext = authContext;
        return this;
    }
    constructor(queryBuilder, objectRecordsPermissions, internalContext, shouldBypassPermissionChecks, authContext, featureFlagMap){
        super(queryBuilder);
        this.objectRecordsPermissions = objectRecordsPermissions;
        this.internalContext = internalContext;
        this.shouldBypassPermissionChecks = shouldBypassPermissionChecks;
        this.authContext = authContext;
        this.featureFlagMap = featureFlagMap;
    }
};

//# sourceMappingURL=workspace-insert-query-builder.js.map