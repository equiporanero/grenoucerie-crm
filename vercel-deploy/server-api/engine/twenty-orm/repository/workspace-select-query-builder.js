"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceSelectQueryBuilder", {
    enumerable: true,
    get: function() {
        return WorkspaceSelectQueryBuilder;
    }
});
const _typeorm = require("typeorm");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
const _computetwentyormexception = require("../error-handling/compute-twenty-orm-exception");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const _permissionsutils = require("./permissions.utils");
const _workspacedeletequerybuilder = require("./workspace-delete-query-builder");
const _workspaceinsertquerybuilder = require("./workspace-insert-query-builder");
const _workspacesoftdeletequerybuilder = require("./workspace-soft-delete-query-builder");
const _workspaceupdatequerybuilder = require("./workspace-update-query-builder");
const _applyrowlevelpermissionpredicatesutil = require("../utils/apply-row-level-permission-predicates.util");
const _formatresultutil = require("../utils/format-result.util");
const _getobjectmetadatafromentitytargetutil = require("../utils/get-object-metadata-from-entity-target.util");
let WorkspaceSelectQueryBuilder = class WorkspaceSelectQueryBuilder extends _typeorm.SelectQueryBuilder {
    getFindOptions() {
        return this.findOptions;
    }
    clone() {
        const clonedQueryBuilder = super.clone();
        const workspaceSelectQueryBuilder = new WorkspaceSelectQueryBuilder(clonedQueryBuilder, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
        return workspaceSelectQueryBuilder;
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    async execute() {
        try {
            this.validatePermissions();
            const mainAliasTarget = this.getMainAliasTarget();
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
            const result = await super.execute();
            const formattedResult = (0, _formatresultutil.formatResult)(result, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            return {
                raw: result,
                generatedMaps: formattedResult,
                identifiers: result.identifiers
            };
        } catch (error) {
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error);
        }
    }
    async getMany(options) {
        try {
            this.validatePermissions();
            const result = await super.getMany();
            if (options?.noFormatting === true) {
                return result;
            }
            const mainAliasTarget = this.getMainAliasTarget();
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
            const formattedResult = (0, _formatresultutil.formatResult)(result, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            return formattedResult;
        } catch (error) {
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error);
        }
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    async getRawOne() {
        try {
            this.validatePermissions();
            return super.getRawOne();
        } catch (error) {
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error);
        }
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    async getRawMany() {
        try {
            this.validatePermissions();
            return super.getRawMany();
        } catch (error) {
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error);
        }
    }
    async getOne(options) {
        try {
            this.validatePermissions();
            this.take(1);
            const result = await super.getOne();
            if (options?.noFormatting === true) {
                return result;
            }
            const mainAliasTarget = this.getMainAliasTarget();
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
            const formattedResult = (0, _formatresultutil.formatResult)(result, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            return formattedResult;
        } catch (error) {
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error);
        }
    }
    async getOneOrFail() {
        try {
            this.validatePermissions();
            const mainAliasTarget = this.getMainAliasTarget();
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
            const result = await super.getOneOrFail();
            const formattedResult = (0, _formatresultutil.formatResult)(result, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            return formattedResult[0];
        } catch (error) {
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error);
        }
    }
    async getCount() {
        try {
            this.validatePermissions();
            return super.getCount();
        } catch (error) {
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error);
        }
    }
    getExists() {
        throw new _permissionsexception.PermissionsException('getExists is not supported because it calls dataSource.createQueryBuilder()', _permissionsexception.PermissionsExceptionCode.METHOD_NOT_ALLOWED);
    }
    async getManyAndCount() {
        try {
            this.validatePermissions();
            const mainAliasTarget = this.getMainAliasTarget();
            const objectMetadata = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(mainAliasTarget, this.internalContext);
            const [result, count] = await super.getManyAndCount();
            const formattedResult = (0, _formatresultutil.formatResult)(result, objectMetadata, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            return [
                formattedResult,
                count
            ];
        } catch (error) {
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error);
        }
    }
    insert() {
        const insertQueryBuilder = super.insert();
        return new _workspaceinsertquerybuilder.WorkspaceInsertQueryBuilder(insertQueryBuilder, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
    }
    update(updateSet) {
        const updateQueryBuilder = updateSet ? super.update(updateSet) : super.update();
        return new _workspaceupdatequerybuilder.WorkspaceUpdateQueryBuilder(updateQueryBuilder, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
    }
    delete() {
        const deleteQueryBuilder = super.delete();
        return new _workspacedeletequerybuilder.WorkspaceDeleteQueryBuilder(deleteQueryBuilder, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
    }
    softDelete() {
        const softDeleteQueryBuilder = super.softDelete();
        return new _workspacesoftdeletequerybuilder.WorkspaceSoftDeleteQueryBuilder(softDeleteQueryBuilder, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
    }
    restore() {
        const restoreQueryBuilder = super.restore();
        return new _workspacesoftdeletequerybuilder.WorkspaceSoftDeleteQueryBuilder(restoreQueryBuilder, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext, this.featureFlagMap);
    }
    executeExistsQuery() {
        throw new _permissionsexception.PermissionsException('executeExistsQuery is not supported because it calls dataSource.createQueryBuilder()', _permissionsexception.PermissionsExceptionCode.METHOD_NOT_ALLOWED);
    }
    validatePermissions() {
        this.applyRowLevelPermissionPredicates();
        (0, _permissionsutils.validateQueryIsPermittedOrThrow)({
            expressionMap: this.expressionMap,
            objectsPermissions: this.objectRecordsPermissions,
            flatObjectMetadataMaps: this.internalContext.flatObjectMetadataMaps,
            flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
            objectIdByNameSingular: this.internalContext.objectIdByNameSingular,
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks
        });
    }
    getMainAliasTarget() {
        const mainAlias = this.expressionMap.mainAlias;
        const mainAliasTarget = mainAlias?.target;
        if (!mainAliasTarget) {
            throw new _twentyormexception.TwentyORMException('Main alias target is missing', _twentyormexception.TwentyORMExceptionCode.MISSING_MAIN_ALIAS_TARGET);
        }
        return mainAliasTarget;
    }
    applyRowLevelPermissionPredicates() {
        if (this.shouldBypassPermissionChecks) {
            return;
        }
        // Subqueries don't have entity metadata, skip permission predicates
        // Permissions are already applied on the original entity query
        if (this.expressionMap.mainAlias?.subQuery) {
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

//# sourceMappingURL=workspace-select-query-builder.js.map