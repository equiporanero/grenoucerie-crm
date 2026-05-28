"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceRepository", {
    enumerable: true,
    get: function() {
        return WorkspaceRepository;
    }
});
const _typeorm = require("typeorm");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
const _workspaceselectquerybuilder = require("./workspace-select-query-builder");
const _formatdatautil = require("../utils/format-data.util");
const _getobjectmetadatafromentitytargetutil = require("../utils/get-object-metadata-from-entity-target.util");
let WorkspaceRepository = class WorkspaceRepository extends _typeorm.Repository {
    get internalContext() {
        return this.manager.internalContext;
    }
    createQueryBuilder(alias, queryRunner) {
        const queryBuilder = super.createQueryBuilder(alias, queryRunner);
        if (!this.objectRecordsPermissions) {
            throw new Error('Object records permissions are required');
        }
        return new _workspaceselectquerybuilder.WorkspaceSelectQueryBuilder(queryBuilder, this.objectRecordsPermissions, this.internalContext, this.shouldBypassPermissionChecks, this.authContext ?? {}, this.featureFlagMap);
    }
    /**
   * FIND METHODS
   */ async find(options, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions(options);
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const result = await manager.find(this.target, computedOptions, permissionOptions);
        return result;
    }
    async findBy(where, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions({
            where
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const result = await manager.findBy(this.target, computedOptions.where, permissionOptions);
        return result;
    }
    async findAndCount(options, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions(options);
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const result = await manager.findAndCount(this.target, computedOptions, permissionOptions);
        return result;
    }
    async findAndCountBy(where, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions({
            where
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const result = await manager.findAndCountBy(this.target, computedOptions.where, permissionOptions);
        return result;
    }
    async findOne(options, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions(options);
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const result = await manager.findOne(this.target, computedOptions, permissionOptions);
        return result;
    }
    async findOneBy(where, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions({
            where
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const result = await manager.findOneBy(this.target, computedOptions.where, permissionOptions);
        return result;
    }
    async findOneOrFail(options, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions(options);
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const result = await manager.findOneOrFail(this.target, computedOptions, permissionOptions);
        return result;
    }
    async findOneByOrFail(where, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions({
            where
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const result = await manager.findOneByOrFail(this.target, computedOptions.where, permissionOptions);
        return result;
    }
    async save(entityOrEntities, options, entityManager) {
        const manager = entityManager || this.manager;
        let result;
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        // Needed because save method has multiple signature, otherwise we will need to do a type assertion
        if (Array.isArray(entityOrEntities)) {
            result = await manager.save(this.target, entityOrEntities, options, permissionOptions);
        } else {
            result = await manager.save(this.target, entityOrEntities, options, permissionOptions);
        }
        return result;
    }
    async remove(entityOrEntities, options, entityManager) {
        const manager = entityManager || this.manager;
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const result = await manager.remove(this.target, entityOrEntities, options, permissionOptions);
        return result;
    }
    async delete(criteria, entityManager, selectedColumns) {
        const manager = entityManager || this.manager;
        if (typeof criteria === 'object' && 'where' in criteria) {
            criteria = await this.transformOptions(criteria);
        }
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.delete(this.target, criteria, permissionOptions, selectedColumns);
    }
    async softRemove(entityOrEntities, options, entityManager) {
        const manager = entityManager || this.manager;
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        let result;
        // Needed because save method has multiple signature, otherwise we will need to do a type assertion
        if (Array.isArray(entityOrEntities)) {
            result = await manager.softRemove(this.target, entityOrEntities, options, permissionOptions);
        } else {
            result = await manager.softRemove(this.target, entityOrEntities, options, permissionOptions);
        }
        return result;
    }
    async softDelete(criteria, entityManager, selectedColumns) {
        const manager = entityManager || this.manager;
        if (typeof criteria === 'object' && 'where' in criteria) {
            criteria = await this.transformOptions(criteria);
        }
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.softDelete(this.target, criteria, permissionOptions, selectedColumns);
    }
    async recover(entityOrEntities, options, entityManager) {
        const manager = entityManager || this.manager;
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        let result;
        // Needed because save method has multiple signature, otherwise we will need to do a type assertion
        if (Array.isArray(entityOrEntities)) {
            result = await manager.recover(this.target, entityOrEntities, options, permissionOptions);
        } else {
            result = await manager.recover(this.target, entityOrEntities, options, permissionOptions);
        }
        return result;
    }
    async restore(criteria, entityManager, selectedColumns) {
        const manager = entityManager || this.manager;
        if (typeof criteria === 'object' && 'where' in criteria) {
            criteria = await this.transformOptions(criteria);
        }
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.restore(this.target, criteria, permissionOptions, selectedColumns);
    }
    /**
   * INSERT METHODS
   */ async insert(entity, entityManager, selectedColumns) {
        const manager = entityManager || this.manager;
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.insert(this.target, entity, selectedColumns, permissionOptions, this.authContext);
    }
    /**
   * UPDATE METHODS
   */ async update(criteria, partialEntity, entityManager, selectedColumns) {
        const manager = entityManager || this.manager;
        if (typeof criteria === 'object' && 'where' in criteria) {
            criteria = await this.transformOptions(criteria);
        }
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.update(this.target, criteria, partialEntity, permissionOptions, selectedColumns);
    }
    // Experimental method to allow batch update and batch event emission
    async updateMany(inputs, entityManager, selectedColumns) {
        const manager = entityManager || this.manager;
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const results = await manager.updateMany(this.target, inputs, permissionOptions, selectedColumns);
        return results;
    }
    async upsert(entityOrEntities, conflictPathsOrOptions, entityManager, selectedColumns = []) {
        const manager = entityManager || this.manager;
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        const result = await manager.upsert(this.target, entityOrEntities, conflictPathsOrOptions, permissionOptions, selectedColumns);
        return {
            raw: result.raw,
            generatedMaps: result.generatedMaps,
            identifiers: result.identifiers
        };
    }
    /**
   * EXIST METHODS
   */ async exists(options, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions(options);
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.exists(this.target, computedOptions, permissionOptions);
    }
    async existsBy(where, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions({
            where
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.existsBy(this.target, computedOptions.where, permissionOptions);
    }
    /**
   * COUNT METHODS
   */ async count(options, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions(options);
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.count(this.target, computedOptions, permissionOptions);
    }
    async countBy(where, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions({
            where
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.countBy(this.target, computedOptions.where, permissionOptions);
    }
    /**
   * MATH METHODS
   */ async sum(columnName, where, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions({
            where
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.sum(this.target, columnName, computedOptions.where, permissionOptions);
    }
    async average(columnName, where, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions({
            where
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.average(this.target, columnName, computedOptions.where, permissionOptions);
    }
    async minimum(columnName, where, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions({
            where
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.minimum(this.target, columnName, computedOptions.where, permissionOptions);
    }
    async maximum(columnName, where, entityManager) {
        const manager = entityManager || this.manager;
        const computedOptions = await this.transformOptions({
            where
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.maximum(this.target, columnName, computedOptions.where, permissionOptions);
    }
    async increment(conditions, propertyPath, value, entityManager, selectedColumns) {
        const manager = entityManager || this.manager;
        const computedConditions = await this.transformOptions({
            where: conditions
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.increment(this.target, computedConditions.where, propertyPath, value, permissionOptions, selectedColumns);
    }
    async decrement(conditions, propertyPath, value, entityManager, selectedColumns) {
        const manager = entityManager || this.manager;
        const computedConditions = await this.transformOptions({
            where: conditions
        });
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.decrement(this.target, computedConditions.where, propertyPath, value, permissionOptions, selectedColumns);
    }
    /**
   * PRELOAD METHOD
   */ async preload(entityLike, entityManager) {
        const manager = entityManager || this.manager;
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.preload(this.target, entityLike, permissionOptions);
    }
    /**
   * CLEAR METHOD
   */ async clear(entityManager) {
        const manager = entityManager || this.manager;
        const permissionOptions = {
            shouldBypassPermissionChecks: this.shouldBypassPermissionChecks,
            objectRecordsPermissions: this.objectRecordsPermissions
        };
        return manager.clear(this.target, permissionOptions);
    }
    /**
   * DEPRECATED AND RESTRICTED METHODS
   */ async query() {
        throw new _permissionsexception.PermissionsException('Method not allowed.', _permissionsexception.PermissionsExceptionCode.RAW_SQL_NOT_ALLOWED);
    }
    async findByIds() {
        throw new Error('findByIds is deprecated. Please use findBy with In operator instead.');
    }
    async findOneById() {
        throw new Error('findOneById is deprecated. Please use findOneBy with id condition instead.');
    }
    async exist() {
        throw new Error('exist is deprecated. Please use exists method instead.');
    }
    /**
   * PRIVATE METHODS
   */ async getObjectMetadataFromTarget() {
        return (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(this.target, this.internalContext);
    }
    async transformOptions(options) {
        if (!options) {
            return options;
        }
        const transformedOptions = {
            ...options
        };
        transformedOptions.where = await this.formatData(options.where);
        if (options.withDeleted) {
            transformedOptions.withDeleted = true;
        }
        return transformedOptions;
    }
    async formatData(data) {
        const objectMetadata = await this.getObjectMetadataFromTarget();
        return (0, _formatdatautil.formatData)(data, objectMetadata, this.internalContext.flatFieldMetadataMaps);
    }
    constructor(target, manager, featureFlagMap, queryRunner, objectRecordsPermissions, shouldBypassPermissionChecks = false, authContext){
        super(target, manager, queryRunner);
        this.featureFlagMap = featureFlagMap;
        this.objectRecordsPermissions = objectRecordsPermissions;
        this.shouldBypassPermissionChecks = shouldBypassPermissionChecks;
        this.manager = manager;
        this.authContext = authContext;
    }
};

//# sourceMappingURL=workspace.repository.js.map