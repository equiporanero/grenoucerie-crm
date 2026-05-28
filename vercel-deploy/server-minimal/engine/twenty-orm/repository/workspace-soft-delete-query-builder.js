"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceSoftDeleteQueryBuilder", {
    enumerable: true,
    get: function() {
        return WorkspaceSoftDeleteQueryBuilder;
    }
});
const _SoftDeleteQueryBuilder = require("typeorm/query-builder/SoftDeleteQueryBuilder");
const _databaseeventaction = require("../../api/graphql/graphql-query-runner/enums/database-event-action");
const _computetwentyormexception = require("../error-handling/compute-twenty-orm-exception");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const _permissionsutils = require("./permissions.utils");
const _applyrowlevelpermissionpredicatesutil = require("../utils/apply-row-level-permission-predicates.util");
const _applytablealiasonwherecondition = require("../utils/apply-table-alias-on-where-condition");
const _computeeventselectquerybuilderutil = require("../utils/compute-event-select-query-builder.util");
const _formatresultutil = require("../utils/format-result.util");
const _formattwentyormeventtodatabasebatcheventutil = require("../utils/format-twenty-orm-event-to-database-batch-event.util");
const _getobjectmetadatafromentitytargetutil = require("../utils/get-object-metadata-from-entity-target.util");
const _computetablenameutil = require("../../utils/compute-table-name.util");
let WorkspaceSoftDeleteQueryBuilder = class WorkspaceSoftDeleteQueryBuilder extends _SoftDeleteQueryBuilder.SoftDeleteQueryBuilder {
    clone() {
        const clonedQueryBuilder = super.clone();
        const workspaceSoftDeleteQueryBuilder = new WorkspaceSoftDeleteQueryBuilder(clonedQueryBuilder, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
        return workspaceSoftDeleteQueryBuilder;
    }
    async execute() {
        try {
            this.applyRowLevelPermissionPredicates();
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
            const beforeEventSelectQueryBuilder = (0, _computeeventselectquerybuilderutil.computeEventSelectQueryBuilder)({
                queryBuilder: this,
                authContext: this.authContext,
                internalContext: this.internalContext,
                featureFlagMap: this.featureFlagMap,
                expressionMap: this.expressionMap,
                objectRecordsPermissions: this.objectRecordsPermissions
            });
            const tableName = (0, _computetablenameutil.computeTableName)(objectMetadata.nameSingular, objectMetadata.isCustom);
            const before = await beforeEventSelectQueryBuilder.getMany({
                noFormatting: true
            });
            this.expressionMap.wheres = (0, _applytablealiasonwherecondition.applyTableAliasOnWhereCondition)({
                condition: this.expressionMap.wheres,
                tableName,
                aliasName: objectMetadata.nameSingular
            });
            const typeORMSoftRemoveResultWithOnlyIdColumn = await super.execute();
            const afterWithAllFields = await beforeEventSelectQueryBuilder.getMany({
                noFormatting: true
            });
            const formattedAfter = (0, _formatresultutil.formatResult)(afterWithAllFields, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            const formattedBefore = (0, _formatresultutil.formatResult)(before, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                action: this.expressionMap.queryType === 'restore' ? _databaseeventaction.DatabaseEventAction.RESTORED : _databaseeventaction.DatabaseEventAction.DELETED,
                objectMetadataItem: objectMetadata,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                workspaceId: this.internalContext.workspaceId,
                recordsBefore: formattedBefore,
                recordsAfter: formattedAfter,
                authContext: this.authContext
            }));
            return {
                raw: typeORMSoftRemoveResultWithOnlyIdColumn.raw,
                generatedMaps: formattedAfter,
                affected: typeORMSoftRemoveResultWithOnlyIdColumn.affected
            };
        } catch (error) {
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error);
        }
    }
    select() {
        throw new _twentyormexception.TwentyORMException('This builder cannot morph into a select builder', _twentyormexception.TwentyORMExceptionCode.METHOD_NOT_ALLOWED);
    }
    update() {
        throw new _twentyormexception.TwentyORMException('This builder cannot morph into an update builder', _twentyormexception.TwentyORMExceptionCode.METHOD_NOT_ALLOWED);
    }
    insert() {
        throw new _twentyormexception.TwentyORMException('This builder cannot morph into an insert builder', _twentyormexception.TwentyORMExceptionCode.METHOD_NOT_ALLOWED);
    }
    delete() {
        throw new _twentyormexception.TwentyORMException('This builder cannot morph into a delete builder', _twentyormexception.TwentyORMExceptionCode.METHOD_NOT_ALLOWED);
    }
    getMainAliasTarget() {
        const mainAliasTarget = this.expressionMap.mainAlias?.target;
        if (!mainAliasTarget) {
            throw new _twentyormexception.TwentyORMException('Main alias target is missing', _twentyormexception.TwentyORMExceptionCode.MISSING_MAIN_ALIAS_TARGET);
        }
        return mainAliasTarget;
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
    constructor(queryBuilder, objectRecordsPermissions, internalContext, shouldBypassPermissionChecks, authContext, featureFlagMap){
        super(queryBuilder);
        this.objectRecordsPermissions = objectRecordsPermissions;
        this.internalContext = internalContext;
        this.shouldBypassPermissionChecks = shouldBypassPermissionChecks;
        this.authContext = authContext;
        this.featureFlagMap = featureFlagMap;
    }
};

//# sourceMappingURL=workspace-soft-delete-query-builder.js.map