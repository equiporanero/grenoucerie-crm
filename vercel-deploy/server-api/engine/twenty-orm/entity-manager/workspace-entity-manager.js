"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceEntityManager", {
    enumerable: true,
    get: function() {
        return WorkspaceEntityManager;
    }
});
const _lodashisempty = /*#__PURE__*/ _interop_require_default(require("lodash.isempty"));
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _EntityNotFoundError = require("typeorm/error/EntityNotFoundError");
const _FindOptionsUtils = require("typeorm/find-options/FindOptionsUtils");
const _EntityPersistExecutor = require("typeorm/persistence/EntityPersistExecutor");
const _PlainObjectToDatabaseEntityTransformer = require("typeorm/query-builder/transformer/PlainObjectToDatabaseEntityTransformer");
const _InstanceChecker = require("typeorm/util/InstanceChecker");
const _databaseeventaction = require("../../api/graphql/graphql-query-runner/enums/database-event-action");
const _graphqlerrorsutil = require("../../core-modules/graphql/utils/graphql-errors.util");
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
const _getentitytarget = require("./utils/get-entity-target");
const _computetwentyormexception = require("../error-handling/compute-twenty-orm-exception");
const _filesfieldsync = require("../field-operations/files-field-sync/files-field-sync");
const _relationnestedqueries = require("../field-operations/relation-nested-queries/relation-nested-queries");
const _permissionsutils = require("../repository/permissions.utils");
const _workspaceselectquerybuilder = require("../repository/workspace-select-query-builder");
const _workspacerepository = require("../repository/workspace.repository");
const _ormworkspacecontextstorage = require("../storage/orm-workspace-context.storage");
const _computepermissionintersectionutil = require("../utils/compute-permission-intersection.util");
const _formatdatautil = require("../utils/format-data.util");
const _formatresultutil = require("../utils/format-result.util");
const _formattwentyormeventtodatabasebatcheventutil = require("../utils/format-twenty-orm-event-to-database-batch-event.util");
const _getobjectmetadatafromentitytargetutil = require("../utils/get-object-metadata-from-entity-target.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let WorkspaceEntityManager = class WorkspaceEntityManager extends _typeorm.EntityManager {
    get eventEmitterService() {
        return this.connection.eventEmitterService;
    }
    get authContext() {
        const context = (0, _ormworkspacecontextstorage.getWorkspaceContext)();
        return context.authContext;
    }
    get internalContext() {
        const context = (0, _ormworkspacecontextstorage.getWorkspaceContext)();
        return {
            workspaceId: context.authContext.workspace.id,
            flatObjectMetadataMaps: context.flatObjectMetadataMaps,
            flatFieldMetadataMaps: context.flatFieldMetadataMaps,
            flatIndexMaps: context.flatIndexMaps,
            flatRowLevelPermissionPredicateMaps: context.flatRowLevelPermissionPredicateMaps,
            flatRowLevelPermissionPredicateGroupMaps: context.flatRowLevelPermissionPredicateGroupMaps,
            objectIdByNameSingular: context.objectIdByNameSingular,
            featureFlagsMap: context.featureFlagsMap,
            userWorkspaceRoleMap: context.userWorkspaceRoleMap,
            eventEmitterService: this.eventEmitterService,
            coreDataSource: this.connection.coreDataSource
        };
    }
    getFeatureFlagMap() {
        return this.connection.featureFlagMap;
    }
    getPermissionsForRole(roleId, permissionsPerRoleId) {
        if (!(0, _utils.isDefined)(permissionsPerRoleId?.[roleId])) {
            throw new _permissionsexception.PermissionsException(`No permissions found for role in datasource (roleId: ${roleId})`, _permissionsexception.PermissionsExceptionCode.NO_PERMISSIONS_FOUND_IN_DATASOURCE);
        }
        return permissionsPerRoleId[roleId];
    }
    getRepository(target, rolePermissionConfig, authContext) {
        const dataSource = this.connection;
        let objectPermissions = {};
        let shouldBypassPermissionChecks = false;
        const objectPermissionsByRoleId = dataSource.permissionsPerRoleId;
        if (rolePermissionConfig && 'shouldBypassPermissionChecks' in rolePermissionConfig) {
            shouldBypassPermissionChecks = rolePermissionConfig.shouldBypassPermissionChecks;
        }
        if (rolePermissionConfig && 'unionOf' in rolePermissionConfig) {
            if (rolePermissionConfig.unionOf.length === 1) {
                objectPermissions = this.getPermissionsForRole(rolePermissionConfig.unionOf[0], objectPermissionsByRoleId);
            } else {
                // TODO: Implement union logic for combining permissions across multiple roles
                throw new Error('Union permission logic for multiple roles not yet implemented');
            }
        }
        if (rolePermissionConfig && 'intersectionOf' in rolePermissionConfig) {
            const allRolePermissions = rolePermissionConfig.intersectionOf.map((roleId)=>this.getPermissionsForRole(roleId, objectPermissionsByRoleId));
            objectPermissions = (0, _computepermissionintersectionutil.computePermissionIntersection)(allRolePermissions);
        }
        const newRepository = new _workspacerepository.WorkspaceRepository(target, this, dataSource.featureFlagMap, this.queryRunner, objectPermissions, shouldBypassPermissionChecks, authContext);
        return newRepository;
    }
    createQueryBuilder(entityClassOrQueryRunner, alias, queryRunner, options = {
        shouldBypassPermissionChecks: false,
        objectRecordsPermissions: {}
    }) {
        let queryBuilder;
        if (alias) {
            queryBuilder = this.connection.createQueryBuilder(entityClassOrQueryRunner, alias, queryRunner, {
                calledByWorkspaceEntityManager: true
            });
        } else {
            queryBuilder = this.connection.createQueryBuilder(entityClassOrQueryRunner, {
                calledByWorkspaceEntityManager: true
            });
        }
        return new _workspaceselectquerybuilder.WorkspaceSelectQueryBuilder(queryBuilder, options?.objectRecordsPermissions ?? {}, this.internalContext, options?.shouldBypassPermissionChecks ?? false, this.authContext, this.getFeatureFlagMap());
    }
    async insert(target, entity, selectedColumns = '*', permissionOptions, authContext) {
        const metadata = this.connection.getMetadata(target);
        return this.createQueryBuilder(target, metadata.name, undefined, permissionOptions).insert().setWorkspaceAuthContext(authContext ?? {}).values(entity).returning(selectedColumns).execute();
    }
    upsert(target, entityOrEntities, conflictPathsOrOptions, permissionOptions, selectedColumns = '*') {
        const metadata = this.connection.getMetadata(target);
        let options;
        if (Array.isArray(conflictPathsOrOptions)) {
            options = {
                conflictPaths: conflictPathsOrOptions
            };
        } else {
            options = conflictPathsOrOptions;
        }
        let entities;
        if (!Array.isArray(entityOrEntities)) {
            entities = [
                entityOrEntities
            ];
        } else {
            entities = entityOrEntities;
        }
        const conflictColumns = metadata.mapPropertyPathsToColumns(Array.isArray(options.conflictPaths) ? options.conflictPaths : Object.keys(options.conflictPaths));
        const overwriteColumns = metadata.columns.filter((col)=>!conflictColumns.includes(col) && entities.some((entity)=>typeof col.getEntityValue(entity) !== 'undefined'));
        const overwrites = [
            ...conflictColumns,
            ...overwriteColumns
        ].map((col)=>col.databaseName);
        const conflictTargets = conflictColumns.map((col)=>col.databaseName);
        const upsertOptions = {
            skipUpdateIfNoValuesChanged: options.skipUpdateIfNoValuesChanged,
            indexPredicate: options.indexPredicate,
            upsertType: options.upsertType || this.connection.driver.supportedUpsertTypes[0]
        };
        const queryBuilder = this.createQueryBuilder(undefined, undefined, undefined, permissionOptions).insert().into(target).values(entities).orUpdate(overwrites, conflictTargets, upsertOptions).returning(selectedColumns);
        return queryBuilder.execute();
    }
    update(target, criteria, partialEntity, permissionOptions, selectedColumns = '*') {
        const metadata = this.connection.getMetadata(target);
        if (criteria === undefined || criteria === null || criteria === '' || Array.isArray(criteria) && criteria.length === 0) {
            return Promise.reject(new _typeorm.TypeORMError(`Empty criteria(s) are not allowed for the update method.`));
        }
        if (typeof criteria === 'string' || typeof criteria === 'number' || criteria instanceof Date || Array.isArray(criteria)) {
            return this.createQueryBuilder(target, metadata.name, undefined, permissionOptions).update().set(partialEntity).whereInIds(criteria).returning(selectedColumns).execute();
        } else {
            return this.createQueryBuilder(target, metadata.name, undefined, permissionOptions).update().set(partialEntity).where(criteria).returning(selectedColumns).execute();
        }
    }
    updateMany(target, inputs, permissionOptions, selectedColumns = '*') {
        const metadata = this.connection.getMetadata(target);
        return this.createQueryBuilder(target, metadata.name, undefined, permissionOptions).update().setManyInputs(inputs).returning(selectedColumns ?? []).execute();
    }
    increment(target, criteria, propertyPath, value, permissionOptions, selectedColumns = '*') {
        const metadata = this.connection.getMetadata(target);
        const column = metadata.findColumnWithPropertyPath(propertyPath);
        if (!column) throw new _typeorm.TypeORMError(`Column ${propertyPath} was not found in ${metadata.targetName} entity.`);
        if (isNaN(Number(value))) throw new _typeorm.TypeORMError(`Value "${value}" is not a number.`);
        // convert possible embeded path "social.likes" into object { social: { like: () => value } }
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        const values = propertyPath.split('.').reduceRight((value, key)=>({
                [key]: value
            }), ()=>this.connection.driver.escape(column.databaseName) + ' + ' + value);
        return this.update(target, criteria, values, permissionOptions, selectedColumns);
    }
    validatePermissions({ target, operationType, permissionOptions, selectedColumns, updatedColumns = [] }) {
        if (permissionOptions?.shouldBypassPermissionChecks === true) {
            return;
        }
        const entityName = typeof target === 'function' || typeof target === 'string' ? this.extractTargetNameSingularFromEntityTarget(target) : this.extractTargetNameSingularFromEntity(target);
        (0, _permissionsutils.validateOperationIsPermittedOrThrow)({
            entityName,
            operationType,
            objectsPermissions: permissionOptions?.objectRecordsPermissions ?? {},
            flatObjectMetadataMaps: this.internalContext.flatObjectMetadataMaps,
            flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
            objectIdByNameSingular: this.internalContext.objectIdByNameSingular,
            selectedColumns,
            allFieldsSelected: false,
            updatedColumns
        });
    }
    extractTargetNameSingularFromEntityTarget(target) {
        return this.connection.getMetadata(target).name;
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    extractTargetNameSingularFromEntity(entity) {
        return this.connection.getMetadata(entity.constructor).name;
    }
    find(entityClass, options, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        return this.createQueryBuilder(entityClass, _FindOptionsUtils.FindOptionsUtils.extractFindManyOptionsAlias(options) || metadata.name, this.queryRunner, permissionOptions).setFindOptions(options || {}).getMany();
    }
    findBy(entityClass, where, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        return this.createQueryBuilder(entityClass, metadata.name, this.queryRunner, permissionOptions).setFindOptions({
            where: where
        }).getMany();
    }
    findOne(entityClass, options, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        // prepare alias for built query
        let alias = metadata.name;
        if (options && options.join) {
            alias = options.join.alias;
        }
        if (!options.where) {
            throw new Error(`You must provide selection conditions in order to find a single row.`);
        }
        // create query builder and apply find options
        return this.createQueryBuilder(entityClass, alias, this.queryRunner, permissionOptions).setFindOptions({
            ...options,
            take: 1
        }).getOne();
    }
    findOneBy(entityClass, where, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        // create query builder and apply find options
        return this.createQueryBuilder(entityClass, metadata.name, this.queryRunner, permissionOptions).setFindOptions({
            where,
            take: 1
        }).getOne();
    }
    findAndCount(entityClass, options, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        return this.createQueryBuilder(entityClass, _FindOptionsUtils.FindOptionsUtils.extractFindManyOptionsAlias(options) || metadata.name, this.queryRunner, permissionOptions).setFindOptions(options || {}).getManyAndCount();
    }
    findAndCountBy(entityClass, where, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        return this.createQueryBuilder(entityClass, metadata.name, this.queryRunner, permissionOptions).setFindOptions({
            where
        }).getManyAndCount();
    }
    findOneOrFail(entityClass, options, permissionOptions) {
        return this.findOne(entityClass, options, permissionOptions).then((value)=>{
            if (value === null) {
                return Promise.reject(new _EntityNotFoundError.EntityNotFoundError(entityClass, options));
            }
            return Promise.resolve(value);
        });
    }
    findOneByOrFail(entityClass, where, permissionOptions) {
        return this.findOneBy(entityClass, where, permissionOptions).then((value)=>{
            if (value === null) {
                return Promise.reject(new _EntityNotFoundError.EntityNotFoundError(entityClass, where));
            }
            return Promise.resolve(value);
        });
    }
    delete(targetOrEntity, criteria, permissionOptions, selectedColumns = '*') {
        if (criteria === undefined || criteria === null || criteria === '' || Array.isArray(criteria) && criteria.length === 0) {
            return Promise.reject(new _typeorm.TypeORMError(`Empty criteria(s) are not allowed for the delete method.`));
        }
        if (typeof criteria === 'string' || typeof criteria === 'number' || criteria instanceof Date || Array.isArray(criteria)) {
            return this.createQueryBuilder(undefined, undefined, undefined, permissionOptions).delete().from(targetOrEntity).whereInIds(criteria).returning(selectedColumns).execute();
        } else {
            return this.createQueryBuilder(undefined, undefined, undefined, permissionOptions).delete().from(targetOrEntity).where(criteria).returning(selectedColumns).execute();
        }
    }
    softDelete(targetOrEntity, criteria, permissionOptions, selectedColumns = '*') {
        // if user passed empty criteria or empty list of criterias, then throw an error
        if (criteria === undefined || criteria === null || criteria === '' || Array.isArray(criteria) && criteria.length === 0) {
            return Promise.reject(new _typeorm.TypeORMError(`Empty criteria(s) are not allowed for the softDelete method.`));
        }
        if (typeof criteria === 'string' || typeof criteria === 'number' || criteria instanceof Date || Array.isArray(criteria)) {
            return this.createQueryBuilder(undefined, undefined, this.queryRunner, permissionOptions).softDelete().from(targetOrEntity).whereInIds(criteria).returning(selectedColumns).execute();
        } else {
            return this.createQueryBuilder(undefined, undefined, this.queryRunner, permissionOptions).softDelete().from(targetOrEntity).where(criteria).returning(selectedColumns).execute();
        }
    }
    restore(targetOrEntity, criteria, permissionOptions, selectedColumns = '*') {
        // if user passed empty criteria or empty list of criterias, then throw an error
        if (criteria === undefined || criteria === null || criteria === '' || Array.isArray(criteria) && criteria.length === 0) {
            return Promise.reject(new _typeorm.TypeORMError(`Empty criteria(s) are not allowed for the restore method.`));
        }
        if (typeof criteria === 'string' || typeof criteria === 'number' || criteria instanceof Date || Array.isArray(criteria)) {
            return this.createQueryBuilder(undefined, undefined, this.queryRunner, permissionOptions).restore().from(targetOrEntity).whereInIds(criteria).returning(selectedColumns).execute();
        } else {
            return this.createQueryBuilder(undefined, undefined, this.queryRunner, permissionOptions).restore().from(targetOrEntity).where(criteria).returning(selectedColumns).execute();
        }
    }
    exists(entityClass, options, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        return this.createQueryBuilder(entityClass, _FindOptionsUtils.FindOptionsUtils.extractFindManyOptionsAlias(options) || metadata.name, this.queryRunner, permissionOptions).setFindOptions(options || {}).select('id').limit(1).getRawOne().then((result)=>(0, _utils.isDefined)(result));
    }
    existsBy(entityClass, where, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        return this.createQueryBuilder(entityClass, metadata.name, this.queryRunner, permissionOptions).setFindOptions({
            where
        }).select('id').limit(1).getRawOne().then((result)=>(0, _utils.isDefined)(result));
    }
    count(entityClass, options, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        return this.createQueryBuilder(entityClass, _FindOptionsUtils.FindOptionsUtils.extractFindManyOptionsAlias(options) || metadata.name, this.queryRunner, permissionOptions).setFindOptions(options || {}).getCount();
    }
    countBy(entityClass, where, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        return this.createQueryBuilder(entityClass, metadata.name, this.queryRunner, permissionOptions).setFindOptions({
            where
        }).getCount();
    }
    async callAggregateFunCustom(entityClass, fnName, columnName, where = {}, permissionOptions) {
        const metadata = this.connection.getMetadata(entityClass);
        const column = metadata.columns.find((item)=>item.propertyPath === columnName);
        if (!column) {
            throw new _typeorm.TypeORMError(`Column "${columnName}" was not found in table "${metadata.name}"`);
        }
        const result = await this.createQueryBuilder(entityClass, metadata.name, this.queryRunner, permissionOptions).setFindOptions({
            where
        }).select(`${fnName}(${this.connection.driver.escape(column.databaseName)})`, fnName).getRawOne();
        return result[fnName] === null ? null : parseFloat(result[fnName]);
    }
    sum(entityClass, columnName, where, permissionOptions) {
        return this.callAggregateFunCustom(entityClass, 'SUM', columnName, where, permissionOptions);
    }
    average(entityClass, columnName, where, permissionOptions) {
        return this.callAggregateFunCustom(entityClass, 'AVG', columnName, where, permissionOptions);
    }
    minimum(entityClass, columnName, where, permissionOptions) {
        return this.callAggregateFunCustom(entityClass, 'MIN', columnName, where, permissionOptions);
    }
    maximum(entityClass, columnName, where, permissionOptions) {
        return this.callAggregateFunCustom(entityClass, 'MAX', columnName, where, permissionOptions);
    }
    clear(entityClass, permissionOptions) {
        this.validatePermissions({
            target: entityClass,
            operationType: 'delete',
            permissionOptions,
            selectedColumns: []
        });
        return super.clear(entityClass);
    }
    async preload(entityClass, entityLike, permissionOptions) {
        const objectMetadataItem = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(entityClass, this.internalContext);
        const formattedEntityLike = (0, _formatdatautil.formatData)(entityLike, objectMetadataItem, this.internalContext.flatFieldMetadataMaps);
        const managerWithPermissionOptions = Object.assign(Object.create(Object.getPrototypeOf(this)), this, {
            findByIds: (entityClass, ids)=>{
                return this.findByIds(entityClass, ids, permissionOptions);
            }
        });
        const metadata = this.connection.getMetadata(entityClass);
        const plainObjectToDatabaseEntityTransformer = new _PlainObjectToDatabaseEntityTransformer.PlainObjectToDatabaseEntityTransformer(managerWithPermissionOptions);
        const transformedEntity = await plainObjectToDatabaseEntityTransformer.transform(formattedEntityLike, metadata);
        if (transformedEntity) return this.merge(entityClass, transformedEntity, formattedEntityLike);
        return undefined;
    }
    decrement(target, criteria, propertyPath, value, permissionOptions, selectedColumns = '*') {
        const metadata = this.connection.getMetadata(target);
        const column = metadata.findColumnWithPropertyPath(propertyPath);
        if (!column) throw new _typeorm.TypeORMError(`Column ${propertyPath} was not found in ${metadata.targetName} entity.`);
        if (isNaN(Number(value))) throw new _typeorm.TypeORMError(`Value "${value}" is not a number.`);
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        const values = propertyPath.split('.').reduceRight((value, key)=>({
                [key]: value
            }), ()=>this.connection.driver.escape(column.databaseName) + ' - ' + value);
        return this.update(target, criteria, values, permissionOptions, selectedColumns);
    }
    async findByIds(entityClass, ids, permissionOptions) {
        if (!ids.length) return Promise.resolve([]);
        const metadata = this.connection.getMetadata(entityClass);
        return this.createQueryBuilder(entityClass, metadata.name, undefined, permissionOptions).andWhereInIds(ids).getMany();
    }
    async save(targetOrEntity, entityOrMaybeOptions, maybeOptionsOrMaybePermissionOptions, permissionOptions) {
        try {
            const permissionOptionsFromArgs = maybeOptionsOrMaybePermissionOptions && ('shouldBypassPermissionChecks' in maybeOptionsOrMaybePermissionOptions || 'objectRecordsPermissions' in maybeOptionsOrMaybePermissionOptions) ? maybeOptionsOrMaybePermissionOptions : permissionOptions;
            let target = arguments.length > 1 && (typeof targetOrEntity === 'function' || _InstanceChecker.InstanceChecker.isEntitySchema(targetOrEntity) || typeof targetOrEntity === 'string') ? targetOrEntity : undefined;
            const entity = target ? entityOrMaybeOptions : targetOrEntity;
            const options = target ? maybeOptionsOrMaybePermissionOptions : entityOrMaybeOptions;
            if (_InstanceChecker.InstanceChecker.isEntitySchema(target)) target = target.options.name;
            if (Array.isArray(entity) && entity.length === 0) return Promise.resolve(entity);
            const queryRunnerForEntityPersistExecutor = this.connection.createQueryRunnerForEntityPersistExecutor();
            const isEntityArray = Array.isArray(entity);
            const entityTarget = target ?? (isEntityArray ? entity[0]?.constructor : entity.constructor);
            const entityArray = isEntityArray ? entity : [
                entity
            ];
            const relationNestedQueries = new _relationnestedqueries.RelationNestedQueries(this.internalContext);
            const relationNestedConfig = relationNestedQueries.prepareNestedRelationQueries(entityArray, entityTarget);
            const entityWithConnectedRelations = (0, _utils.isDefined)(relationNestedConfig) ? await relationNestedQueries.processRelationNestedQueries({
                entities: entityArray,
                relationNestedConfig,
                queryBuilder: this.createQueryBuilder(undefined, undefined, undefined, permissionOptions)
            }) : entityArray;
            const entityIds = entityArray.map((entity)=>entity.id).filter(_utils.isDefined);
            const beforeUpdate = await this.find(entityTarget, {
                where: {
                    id: (0, _typeorm.In)(entityIds)
                }
            }, {
                shouldBypassPermissionChecks: true
            });
            const beforeUpdateMapById = beforeUpdate.reduce((acc, e)=>{
                acc[e.id] = e;
                return acc;
            }, {});
            const filesFieldSync = new _filesfieldsync.FilesFieldSync(this.internalContext);
            let filesFieldDiffByEntityIndex = null;
            let filesFieldFileIds = null;
            filesFieldDiffByEntityIndex = filesFieldSync.computeFilesFieldDiffBeforeUpsert(entityWithConnectedRelations, entityTarget, beforeUpdateMapById);
            if ((0, _utils.isDefined)(filesFieldDiffByEntityIndex)) {
                const result = await filesFieldSync.enrichFilesFields({
                    entities: entityWithConnectedRelations,
                    filesFieldDiffByEntityIndex,
                    workspaceId: this.internalContext.workspaceId,
                    target: entityTarget
                });
                filesFieldFileIds = result.fileIds;
                entityWithConnectedRelations.splice(0, entityWithConnectedRelations.length, ...result.entities);
            }
            const objectMetadataItem = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(entityTarget, this.internalContext);
            const formattedEntityOrEntities = (0, _formatdatautil.formatData)(entityWithConnectedRelations, objectMetadataItem, this.internalContext.flatFieldMetadataMaps);
            const updatedColumns = formattedEntityOrEntities.map((e)=>Object.keys(e)).flat();
            this.validatePermissions({
                target: targetOrEntity,
                operationType: 'update',
                permissionOptions: permissionOptionsFromArgs,
                selectedColumns: [],
                updatedColumns
            });
            const result = await new _EntityPersistExecutor.EntityPersistExecutor(this.connection, queryRunnerForEntityPersistExecutor, 'save', target, formattedEntityOrEntities, options).execute().then(()=>formattedEntityOrEntities)// oxlint-disable-next-line @typescripttypescript/no-misused-promises
            .finally(()=>queryRunnerForEntityPersistExecutor.release());
            if ((0, _utils.isDefined)(filesFieldFileIds)) {
                await filesFieldSync.updateFileEntityRecords(filesFieldFileIds);
            }
            const resultArray = Array.isArray(result) ? result : [
                result
            ];
            let formattedResult = (0, _formatresultutil.formatResult)(resultArray, objectMetadataItem, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
            const updatedEntities = formattedResult.filter((entity)=>beforeUpdateMapById[entity.id]);
            const createdEntities = formattedResult.filter((entity)=>!beforeUpdateMapById[entity.id]);
            this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                action: _databaseeventaction.DatabaseEventAction.UPDATED,
                objectMetadataItem,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                workspaceId: this.internalContext.workspaceId,
                recordsAfter: updatedEntities,
                recordsBefore: updatedEntities.map((entity)=>beforeUpdateMapById[entity.id])
            }));
            this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                action: _databaseeventaction.DatabaseEventAction.CREATED,
                objectMetadataItem,
                flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
                workspaceId: this.internalContext.workspaceId,
                recordsAfter: createdEntities
            }));
            const permissionCheckApplies = permissionOptionsFromArgs?.shouldBypassPermissionChecks !== true && objectMetadataItem.isSystem !== true;
            if (permissionCheckApplies) {
                formattedResult = this.getFormattedResultWithoutNonReadableFields({
                    formattedResult,
                    objectMetadataItem,
                    permissionOptionsFromArgs
                });
            }
            return isEntityArray ? formattedResult : formattedResult[0];
        } catch (error) {
            const objectMetadataItem = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)((0, _getentitytarget.getEntityTarget)(targetOrEntity, entityOrMaybeOptions), this.internalContext);
            throw await (0, _computetwentyormexception.computeTwentyORMException)(error, objectMetadataItem, this, this.internalContext);
        }
    }
    getFormattedResultWithoutNonReadableFields({ formattedResult, objectMetadataItem, permissionOptionsFromArgs }) {
        if (permissionOptionsFromArgs?.shouldBypassPermissionChecks === true) {
            return formattedResult;
        }
        const restrictedFields = permissionOptionsFromArgs?.objectRecordsPermissions?.[objectMetadataItem.id].restrictedFields;
        if (!restrictedFields) {
            throw new _graphqlerrorsutil.InternalServerError('Restricted fields not found');
        }
        if ((0, _lodashisempty.default)(restrictedFields)) {
            return formattedResult;
        }
        const restrictedFieldNames = new Set(Object.entries(restrictedFields).filter(([_, fieldPermissions])=>fieldPermissions.canRead === false).map(([fieldMetadataId])=>{
            const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldMetadataId,
                flatEntityMaps: this.internalContext.flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(fieldMetadata)) {
                throw new _graphqlerrorsutil.InternalServerError(`Field metadata not found for field ${fieldMetadataId}`);
            }
            return fieldMetadata.name;
        }));
        const filteredResult = formattedResult.map((individualFormattedResult)=>{
            return Object.fromEntries(Object.entries(individualFormattedResult).filter(([key])=>!restrictedFieldNames.has(key)));
        });
        return filteredResult;
    }
    async remove(targetOrEntity, entityOrMaybeOptions, maybeOptionsOrMaybePermissionOptions, permissionOptions) {
        const permissionOptionsFromArgs = maybeOptionsOrMaybePermissionOptions && ('shouldBypassPermissionChecks' in maybeOptionsOrMaybePermissionOptions || 'objectRecordsPermissions' in maybeOptionsOrMaybePermissionOptions) ? maybeOptionsOrMaybePermissionOptions : permissionOptions;
        this.validatePermissions({
            target: targetOrEntity,
            operationType: 'delete',
            permissionOptions: permissionOptionsFromArgs,
            selectedColumns: []
        });
        const target = arguments.length > 1 && (typeof targetOrEntity === 'function' || _InstanceChecker.InstanceChecker.isEntitySchema(targetOrEntity) || typeof targetOrEntity === 'string') ? targetOrEntity : undefined;
        const entity = target ? entityOrMaybeOptions : targetOrEntity;
        const options = target ? maybeOptionsOrMaybePermissionOptions : entityOrMaybeOptions;
        const isEntityArray = Array.isArray(entity);
        if (isEntityArray && entity.length === 0) return Promise.resolve(entity);
        const queryRunnerForEntityPersistExecutor = this.connection.createQueryRunnerForEntityPersistExecutor();
        const entityTarget = target ?? (isEntityArray ? entity[0]?.constructor : entity.constructor);
        const objectMetadataItem = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(entityTarget, this.internalContext);
        const formattedEntity = (0, _formatdatautil.formatData)(entity, objectMetadataItem, this.internalContext.flatFieldMetadataMaps);
        const result = new _EntityPersistExecutor.EntityPersistExecutor(this.connection, queryRunnerForEntityPersistExecutor, 'remove', target, formattedEntity, options).execute().then(()=>formattedEntity)// oxlint-disable-next-line @typescripttypescript/no-misused-promises
        .finally(()=>queryRunnerForEntityPersistExecutor.release());
        const formattedResult = (0, _formatresultutil.formatResult)(result, objectMetadataItem, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
        const recordsBefore = Array.isArray(formattedResult) ? formattedResult : [
            formattedResult
        ];
        this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
            action: _databaseeventaction.DatabaseEventAction.DESTROYED,
            objectMetadataItem,
            flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
            workspaceId: this.internalContext.workspaceId,
            recordsBefore
        }));
        return isEntityArray ? formattedResult : formattedResult[0];
    }
    async softRemove(targetOrEntityOrEntities, entitiesOrMaybeOptions, maybeOptionsOrMaybePermissionOptions, permissionOptions) {
        const permissionOptionsFromArgs = maybeOptionsOrMaybePermissionOptions && ('shouldBypassPermissionChecks' in maybeOptionsOrMaybePermissionOptions || 'objectRecordsPermissions' in maybeOptionsOrMaybePermissionOptions) ? maybeOptionsOrMaybePermissionOptions : permissionOptions;
        this.validatePermissions({
            target: targetOrEntityOrEntities,
            operationType: 'soft-delete',
            permissionOptions: permissionOptionsFromArgs,
            selectedColumns: []
        });
        let target = arguments.length > 1 && (typeof targetOrEntityOrEntities === 'function' || _InstanceChecker.InstanceChecker.isEntitySchema(targetOrEntityOrEntities) || typeof targetOrEntityOrEntities === 'string') ? targetOrEntityOrEntities : undefined;
        const entity = target ? entitiesOrMaybeOptions : targetOrEntityOrEntities;
        const options = target ? maybeOptionsOrMaybePermissionOptions : entitiesOrMaybeOptions;
        if (_InstanceChecker.InstanceChecker.isEntitySchema(target)) target = target.options.name;
        if (Array.isArray(entity) && entity.length === 0) return Promise.resolve(entity);
        const queryRunnerForEntityPersistExecutor = this.connection.createQueryRunnerForEntityPersistExecutor();
        const isEntityArray = Array.isArray(entity);
        const entityTarget = target ?? (isEntityArray ? entity[0]?.constructor : entity.constructor);
        const entityArray = isEntityArray ? entity : [
            entity
        ];
        const entityIds = entityArray.map((entity)=>entity.id).filter(_utils.isDefined);
        const recordsBeforeFindResult = await this.find(entityTarget, {
            where: {
                id: (0, _typeorm.In)(entityIds)
            }
        }, {
            shouldBypassPermissionChecks: true
        });
        const beforeUpdateMapById = recordsBeforeFindResult.reduce((acc, e)=>{
            acc[e.id] = e;
            return acc;
        }, {});
        const objectMetadataItem = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(entityTarget, this.internalContext);
        const formattedEntity = (0, _formatdatautil.formatData)(entity, objectMetadataItem, this.internalContext.flatFieldMetadataMaps);
        const result = new _EntityPersistExecutor.EntityPersistExecutor(this.connection, queryRunnerForEntityPersistExecutor, 'soft-remove', target, formattedEntity, options).execute().then(()=>formattedEntity)// oxlint-disable-next-line @typescripttypescript/no-misused-promises
        .finally(()=>queryRunnerForEntityPersistExecutor.release());
        const formattedResult = (0, _formatresultutil.formatResult)(result, objectMetadataItem, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
        const recordsAfter = Array.isArray(formattedResult) ? formattedResult : [
            formattedResult
        ];
        const recordsBefore = recordsAfter.map((record)=>beforeUpdateMapById[record.id]);
        this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
            action: _databaseeventaction.DatabaseEventAction.DELETED,
            objectMetadataItem,
            flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
            workspaceId: this.internalContext.workspaceId,
            recordsAfter,
            recordsBefore
        }));
        return isEntityArray ? formattedResult : formattedResult[0];
    }
    async recover(targetOrEntityOrEntities, entityOrEntitiesOrMaybeOptions, maybeOptionsOrMaybePermissionOptions, permissionOptions) {
        const permissionOptionsFromArgs = maybeOptionsOrMaybePermissionOptions && ('shouldBypassPermissionChecks' in maybeOptionsOrMaybePermissionOptions || 'objectRecordsPermissions' in maybeOptionsOrMaybePermissionOptions) ? maybeOptionsOrMaybePermissionOptions : permissionOptions;
        this.validatePermissions({
            target: targetOrEntityOrEntities,
            operationType: 'restore',
            permissionOptions: permissionOptionsFromArgs,
            selectedColumns: []
        });
        let target = arguments.length > 1 && (typeof targetOrEntityOrEntities === 'function' || _InstanceChecker.InstanceChecker.isEntitySchema(targetOrEntityOrEntities) || typeof targetOrEntityOrEntities === 'string') ? targetOrEntityOrEntities : undefined;
        const entity = target ? entityOrEntitiesOrMaybeOptions : targetOrEntityOrEntities;
        const options = target ? maybeOptionsOrMaybePermissionOptions : entityOrEntitiesOrMaybeOptions;
        if (_InstanceChecker.InstanceChecker.isEntitySchema(target)) target = target.options.name;
        const isEntityArray = Array.isArray(entity);
        if (isEntityArray && entity.length === 0) return Promise.resolve(entity);
        const queryRunnerForEntityPersistExecutor = this.connection.createQueryRunnerForEntityPersistExecutor();
        const entityTarget = target ?? (isEntityArray ? entity[0]?.constructor : entity.constructor);
        const entityArray = isEntityArray ? entity : [
            entity
        ];
        const entityIds = entityArray.map((entity)=>entity.id).filter(_utils.isDefined);
        const recordsBeforeFindResult = await this.find(entityTarget, {
            where: {
                id: (0, _typeorm.In)(entityIds)
            }
        }, {
            shouldBypassPermissionChecks: true
        });
        const beforeUpdateMapById = recordsBeforeFindResult.reduce((acc, e)=>{
            acc[e.id] = e;
            return acc;
        }, {});
        const objectMetadataItem = (0, _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget)(entityTarget, this.internalContext);
        const formattedEntity = (0, _formatdatautil.formatData)(entity, objectMetadataItem, this.internalContext.flatFieldMetadataMaps);
        const result = new _EntityPersistExecutor.EntityPersistExecutor(this.connection, queryRunnerForEntityPersistExecutor, 'recover', target, formattedEntity, options).execute().then(()=>formattedEntity)// oxlint-disable-next-line @typescripttypescript/no-misused-promises
        .finally(()=>queryRunnerForEntityPersistExecutor.release());
        const formattedResult = (0, _formatresultutil.formatResult)(result, objectMetadataItem, this.internalContext.flatObjectMetadataMaps, this.internalContext.flatFieldMetadataMaps);
        const recordsAfter = Array.isArray(formattedResult) ? formattedResult : [
            formattedResult
        ];
        const recordsBefore = recordsAfter.map((record)=>beforeUpdateMapById[record.id]);
        this.internalContext.eventEmitterService.emitDatabaseBatchEvent((0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
            action: _databaseeventaction.DatabaseEventAction.RESTORED,
            objectMetadataItem,
            flatFieldMetadataMaps: this.internalContext.flatFieldMetadataMaps,
            workspaceId: this.internalContext.workspaceId,
            recordsAfter,
            recordsBefore
        }));
        return isEntityArray ? formattedResult : formattedResult[0];
    }
    // Forbidden methods
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    query(_query, _parameters) {
        throw new _permissionsexception.PermissionsException('Method not allowed.', _permissionsexception.PermissionsExceptionCode.RAW_SQL_NOT_ALLOWED);
    }
    constructor(connection, queryRunner){
        super(connection, queryRunner);
        this.repositories = new Map();
    }
};

//# sourceMappingURL=workspace-entity-manager.js.map