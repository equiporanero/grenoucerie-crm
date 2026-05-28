"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceUpdateQueryBuilder", {
    enumerable: true,
    get: function() {
        return WorkspaceUpdateQueryBuilder;
    }
});
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _databaseeventaction = require("../../api/graphql/graphql-query-runner/enums/database-event-action");
const _computetwentyormexception = require("../error-handling/compute-twenty-orm-exception");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const _filesfieldsync = require("../field-operations/files-field-sync/files-field-sync");
const _relationnestedqueries = require("../field-operations/relation-nested-queries/relation-nested-queries");
const _permissionsutils = require("./permissions.utils");
const _workspaceselectquerybuilder = require("./workspace-select-query-builder");
const _applyrowlevelpermissionpredicatesutil = require("../utils/apply-row-level-permission-predicates.util");
const _applytablealiasonwherecondition = require("../utils/apply-table-alias-on-where-condition");
const _computeeventselectquerybuilderutil = require("../utils/compute-event-select-query-builder.util");
const _formatdatautil = require("../utils/format-data.util");
const _formatresultutil = require("../utils/format-result.util");
const _formattwentyormeventtodatabasebatcheventutil = require("../utils/format-twenty-orm-event-to-database-batch-event.util");
const _getobjectmetadatafromentitytargetutil = require("../utils/get-object-metadata-from-entity-target.util");
const _validaterlspredicatesforrecordsutil = require("../utils/validate-rls-predicates-for-records.util");
const _computetablenameutil = require("../../utils/compute-table-name.util");
let WorkspaceUpdateQueryBuilder = class WorkspaceUpdateQueryBuilder extends _typeorm.UpdateQueryBuilder {
    get relationNestedQueries() {
        return this._relationNestedQueries ??= new _relationnestedqueries.RelationNestedQueries(this.internalContext);
    }
    get filesFieldSync() {
        return this._filesFieldSync ??= new _filesfieldsync.FilesFieldSync(this.internalContext);
    }
    clone() {
        const clonedQueryBuilder = super.clone();
        const workspaceUpdateQueryBuilder = new WorkspaceUpdateQueryBuilder(clonedQueryBuilder, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
        return workspaceUpdateQueryBuilder;
    }
    async execute() {
        try {
            if (this.manyInputs) {
                return this.executeMany();
            }
            (0, _permissionsutils.validateQueryIsPermittedOrThrow)({
                expressionMap: this.expressionMap,
                objectsPermissions: this.objectRecordsPermissions,
                flatObjectMetadataMaps: this.internalContext.flatObjectMetadataMaps,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                objectIdByNameSingular: this.internalContext.objectIdByNameSingular,
                shouldBypassPermissionChecks: this.shouldBypassPermissionChecks
            });
            const mainAliasTarget = this.getMainAliasTarget();
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
            const eventSelectQueryBuilder = (0, _computeeventselectquerybuilderutil.computeEventSelectQueryBuilder)({
                queryBuilder: this,
                authContext: this.authContext,
                internalContext: this.internalContext,
                featureFlagMap: this.featureFlagMap,
                expressionMap: this.expressionMap,
                objectRecordsPermissions: this.objectRecordsPermissions
            });
            const tableName = (0, _computetablenameutil.computeTableName)(objectMetadata.nameSingular, objectMetadata.isCustom);
            const before = await eventSelectQueryBuilder.getMany({
                noFormatting: true
            });
            if (before.length > _constants.QUERY_MAX_RECORDS) {
                throw new _twentyormexception.TwentyORMException(`Cannot update more than ${_constants.QUERY_MAX_RECORDS} records at once`, _twentyormexception.TwentyORMExceptionCode.TOO_MANY_RECORDS_TO_UPDATE, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "4ysDL0",
                        message: "You can only update up to {QUERY_MAX_RECORDS} records at once.",
                        values: {
                            QUERY_MAX_RECORDS: _constants.QUERY_MAX_RECORDS
                        }
                    }
                });
            }
            this.expressionMap.wheres = (0, _applytablealiasonwherecondition.applyTableAliasOnWhereCondition)({
                condition: this.expressionMap.wheres,
                tableName,
                aliasName: objectMetadata.nameSingular
            });
            const nestedRelationQueryBuilder = new _workspaceselectquerybuilder.WorkspaceSelectQueryBuilder(this, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
            const formattedBefore = (0, _formatresultutil.formatResult)(before, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            let filesFieldDiffByEntityIndex = null;
            let filesFieldFileIds = null;
            const updatePayload = Array.isArray(this.expressionMap.valuesSet) ? this.expressionMap.valuesSet[0] ?? {} : this.expressionMap.valuesSet ?? {};
            filesFieldDiffByEntityIndex = this.filesFieldSync.computeFilesFieldDiffBeforeUpdateOne(updatePayload, mainAliasTarget, formattedBefore);
            if ((0, _utils.isDefined)(filesFieldDiffByEntityIndex)) {
                const entities = formattedBefore.map(()=>updatePayload);
                const result = await this.filesFieldSync.enrichFilesFields({
                    entities,
                    filesFieldDiffByEntityIndex,
                    workspaceId: this.internalContext.workspaceId,
                    target: mainAliasTarget
                });
                filesFieldFileIds = result.fileIds;
                this.expressionMap.valuesSet = result.entities[0];
            }
            if ((0, _utils.isDefined)(this.relationNestedConfig)) {
                const updatedValues = await this.relationNestedQueries.processRelationNestedQueries({
                    entities: this.expressionMap.valuesSet,
                    relationNestedConfig: this.relationNestedConfig,
                    queryBuilder: nestedRelationQueryBuilder
                });
                this.expressionMap.valuesSet = updatedValues.length === 1 ? updatedValues[0] : updatedValues;
            }
            this.applyRowLevelPermissionPredicates();
            const valuesSet = this.expressionMap.valuesSet ?? {};
            const updatedRecords = before.map((record, index)=>({
                    ...record,
                    ...Array.isArray(valuesSet) ? valuesSet[index] ?? valuesSet[0] ?? {} : valuesSet
                }));
            this.validateRLSPredicatesForUpdate({
                updatedRecords
            });
            const result = await super.execute();
            if ((0, _utils.isDefined)(filesFieldFileIds)) {
                await this.filesFieldSync.updateFileEntityRecords(filesFieldFileIds);
            }
            const after = await eventSelectQueryBuilder.getMany({
                noFormatting: true
            });
            const formattedAfter = (0, _formatresultutil.formatResult)(after, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                action: _databaseeventaction.DatabaseEventAction.UPDATED,
                objectMetadataItem: objectMetadata,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                workspaceId: this.internalContext.workspaceId,
                recordsAfter: formattedAfter,
                recordsBefore: formattedBefore,
                authContext: this.authContext
            }));
            this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                action: _databaseeventaction.DatabaseEventAction.UPSERTED,
                objectMetadataItem: objectMetadata,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                workspaceId: this.internalContext.workspaceId,
                recordsAfter: formattedAfter,
                recordsBefore: formattedBefore,
                authContext: this.authContext
            }));
            const formattedResult = (0, _formatresultutil.formatResult)(result.raw, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            return {
                raw: result.raw,
                generatedMaps: formattedResult,
                affected: result.affected
            };
        } catch (error) {
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(this.getMainAliasTarget(), this.internalContext);
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error, objectMetadata, this.connection.manager, this.internalContext);
        }
    }
    async executeMany() {
        try {
            for (const input of this.manyInputs){
                const fakeExpressionMapToValidatePermissions = Object.assign({}, this.expressionMap, {
                    wheres: input.criteria,
                    valuesSet: input.partialEntity
                });
                (0, _permissionsutils.validateQueryIsPermittedOrThrow)({
                    expressionMap: fakeExpressionMapToValidatePermissions,
                    objectsPermissions: this.objectRecordsPermissions,
                    flatObjectMetadataMaps: this.internalContext.flatObjectMetadataMaps,
                    flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                    objectIdByNameSingular: this.internalContext.objectIdByNameSingular,
                    shouldBypassPermissionChecks: this.shouldBypassPermissionChecks
                });
            }
            const mainAliasTarget = this.getMainAliasTarget();
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
            const eventSelectQueryBuilder = (0, _computeeventselectquerybuilderutil.computeEventSelectQueryBuilder)({
                queryBuilder: this,
                authContext: this.authContext,
                internalContext: this.internalContext,
                featureFlagMap: this.featureFlagMap,
                expressionMap: this.expressionMap,
                objectRecordsPermissions: this.objectRecordsPermissions
            });
            eventSelectQueryBuilder.whereInIds(this.manyInputs.map((input)=>input.criteria));
            const beforeRecords = await eventSelectQueryBuilder.getMany({
                noFormatting: true
            });
            const formattedBefore = (0, _formatresultutil.formatResult)(beforeRecords, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            const results = [];
            const nestedRelationQueryBuilder = new _workspaceselectquerybuilder.WorkspaceSelectQueryBuilder(this, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
            this.relationNestedConfig = this.relationNestedQueries.prepareNestedRelationQueries(this.manyInputs.map((input)=>input.partialEntity), mainAliasTarget);
            let filesFieldDiffByEntityIndex = null;
            let filesFieldFileIds = null;
            const entities = this.manyInputs.map((input)=>input.partialEntity);
            filesFieldDiffByEntityIndex = this.filesFieldSync.computeFilesFieldDiffBeforeUpdate(entities, mainAliasTarget, formattedBefore);
            if ((0, _utils.isDefined)(filesFieldDiffByEntityIndex)) {
                const result = await this.filesFieldSync.enrichFilesFields({
                    entities,
                    filesFieldDiffByEntityIndex,
                    workspaceId: this.internalContext.workspaceId,
                    target: mainAliasTarget
                });
                filesFieldFileIds = result.fileIds;
                this.manyInputs = result.entities.map((updatedEntity, index)=>({
                        criteria: this.manyInputs[index].criteria,
                        partialEntity: updatedEntity
                    }));
            }
            if ((0, _utils.isDefined)(this.relationNestedConfig)) {
                const updatedValues = await this.relationNestedQueries.processRelationNestedQueries({
                    entities: this.manyInputs.map((input)=>input.partialEntity),
                    relationNestedConfig: this.relationNestedConfig,
                    queryBuilder: nestedRelationQueryBuilder
                });
                this.manyInputs = updatedValues.map((updatedValue, index)=>({
                        criteria: this.manyInputs[index].criteria,
                        partialEntity: updatedValue
                    }));
            }
            const beforeRecordById = new Map();
            for (const beforeRecord of formattedBefore){
                if ((0, _utils.isDefined)(beforeRecord.id)) {
                    beforeRecordById.set(beforeRecord.id, beforeRecord);
                }
            }
            for (const input of this.manyInputs){
                this.expressionMap.valuesSet = input.partialEntity;
                this.where({
                    id: input.criteria
                });
                this.applyRowLevelPermissionPredicates();
                const beforeRecord = beforeRecordById.get(input.criteria);
                const updatedRecords = beforeRecord ? [
                    {
                        ...beforeRecord,
                        ...input.partialEntity
                    }
                ] : [];
                this.validateRLSPredicatesForUpdate({
                    updatedRecords
                });
                const result = await super.execute();
                results.push(result);
            }
            if ((0, _utils.isDefined)(filesFieldFileIds)) {
                await this.filesFieldSync.updateFileEntityRecords(filesFieldFileIds);
            }
            const afterRecords = await eventSelectQueryBuilder.getMany({
                noFormatting: true
            });
            const formattedAfter = (0, _formatresultutil.formatResult)(afterRecords, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                action: _databaseeventaction.DatabaseEventAction.UPDATED,
                objectMetadataItem: objectMetadata,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                workspaceId: this.internalContext.workspaceId,
                recordsAfter: formattedAfter,
                recordsBefore: formattedBefore,
                authContext: this.authContext
            }));
            this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                action: _databaseeventaction.DatabaseEventAction.UPSERTED,
                objectMetadataItem: objectMetadata,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                workspaceId: this.internalContext.workspaceId,
                recordsAfter: formattedAfter,
                recordsBefore: formattedBefore,
                authContext: this.authContext
            }));
            const formattedResults = (0, _formatresultutil.formatResult)(results.flatMap((result)=>result.raw), objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            return {
                raw: results.flatMap((result)=>result.raw),
                generatedMaps: formattedResults,
                affected: results.length
            };
        } catch (error) {
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(this.getMainAliasTarget(), this.internalContext);
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error, objectMetadata, this.connection.manager, this.internalContext);
        }
    }
    set(_values) {
        const mainAliasTarget = this.getMainAliasTarget();
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
        const extendedValues = _values;
        this.relationNestedConfig = this.relationNestedQueries.prepareNestedRelationQueries(extendedValues, mainAliasTarget);
        const formattedUpdateSet = (0, _formatdatautil.formatData)(_values, objectMetadata, this.internalContext.flatFieldMetadataMaps);
        return super.set(formattedUpdateSet);
    }
    select() {
        throw new _twentyormexception.TwentyORMException('This builder cannot morph into a select builder', _twentyormexception.TwentyORMExceptionCode.METHOD_NOT_ALLOWED);
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
    getMainAliasTarget() {
        const mainAliasTarget = this.expressionMap.mainAlias?.target;
        if (!mainAliasTarget) {
            throw new _twentyormexception.TwentyORMException('Main alias target is missing', _twentyormexception.TwentyORMExceptionCode.MISSING_MAIN_ALIAS_TARGET);
        }
        return mainAliasTarget;
    }
    setManyInputs(inputs) {
        const mainAliasTarget = this.getMainAliasTarget();
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
        this.manyInputs = inputs.map((input)=>({
                criteria: input.criteria,
                partialEntity: (0, _formatdatautil.formatData)(input.partialEntity, objectMetadata, this.internalContext.flatFieldMetadataMaps)
            }));
        return this;
    }
    applyRowLevelPermissionPredicates() {
        if (this.shouldBypassPermissionChecks) {
            return;
        }
        const mainAliasTarget = this.getMainAliasTarget();
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
        (0, _applyrowlevelpermissionpredicatesutil.applyRowLevelPermissionPredicates)({
            queryBuilder: this,
            objectMetadata,
            internalContext: this.internalContext,
            authContext: this.authContext,
            featureFlagMap: this.featureFlagMap
        });
    }
    validateRLSPredicatesForUpdate({ updatedRecords }) {
        const mainAliasTarget = this.getMainAliasTarget();
        const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
        const updatedRecordsFormatted = (0, _formatresultutil.formatResult)(updatedRecords, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
        (0, _validaterlspredicatesforrecordsutil.validateRLSPredicatesForRecords)({
            records: updatedRecordsFormatted,
            objectMetadata,
            internalContext: this.internalContext,
            authContext: this.authContext,
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            errorMessage: 'Updated record does not satisfy row-level security constraints of your current role'
        });
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

//# sourceMappingURL=workspace-update-query-builder.js.map