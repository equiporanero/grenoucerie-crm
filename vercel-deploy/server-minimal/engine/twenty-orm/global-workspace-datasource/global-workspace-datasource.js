"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GlobalWorkspaceDataSource", {
    enumerable: true,
    get: function() {
        return GlobalWorkspaceDataSource;
    }
});
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _EntityManagerFactory = require("typeorm/entity-manager/EntityManagerFactory");
const _EntityMetadataNotFoundError = require("typeorm/error/EntityMetadataNotFoundError");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
const _workspaceentitymanager = require("../entity-manager/workspace-entity-manager");
const _ormworkspacecontextstorage = require("../storage/orm-workspace-context.storage");
let GlobalWorkspaceDataSource = class GlobalWorkspaceDataSource extends _typeorm.DataSource {
    get authContext() {
        const context = (0, _ormworkspacecontextstorage.getWorkspaceContext)();
        return context.authContext;
    }
    get featureFlagMap() {
        const context = (0, _ormworkspacecontextstorage.getWorkspaceContext)();
        return context.featureFlagsMap;
    }
    get permissionsPerRoleId() {
        const context = (0, _ormworkspacecontextstorage.getWorkspaceContext)();
        return context.permissionsPerRoleId;
    }
    getRepository(target, permissionOptions) {
        const manager = this.createEntityManager();
        return manager.getRepository(target, permissionOptions, this.authContext);
    }
    findMetadata(target) {
        const context = (0, _ormworkspacecontextstorage.getWorkspaceContext)();
        const { entityMetadatas } = context;
        return entityMetadatas.find((metadata)=>metadata.target === target);
    }
    getMetadata(target) {
        const metadata = this.findMetadata(target);
        if (!metadata) {
            throw new _EntityMetadataNotFoundError.EntityMetadataNotFoundError(target);
        }
        return metadata;
    }
    createEntityManager(queryRunner) {
        if (this._isConstructing !== false) {
            return super.createEntityManager(queryRunner);
        }
        return new _workspaceentitymanager.WorkspaceEntityManager(this, queryRunner);
    }
    createQueryRunner(mode = 'master') {
        const queryRunner = this.driver.createQueryRunner(mode);
        const manager = this.createEntityManager(queryRunner);
        Object.assign(queryRunner, {
            manager: manager
        });
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        return queryRunner;
    }
    // Do not use, only for specific permission-related purpose
    createQueryRunnerForEntityPersistExecutor(mode = 'master') {
        if (this.dataSourceWithOverridenCreateQueryBuilder) {
            const queryRunner = this.driver.createQueryRunner(mode);
            const manager = new _EntityManagerFactory.EntityManagerFactory().create(this.dataSourceWithOverridenCreateQueryBuilder, queryRunner);
            Object.assign(queryRunner, {
                manager: manager
            });
            return queryRunner;
        }
        const dataSourceWithOverridenCreateQueryBuilder = Object.assign(Object.create(Object.getPrototypeOf(this)), this, {
            createQueryBuilder: (entityOrRunner, alias, queryRunner)=>{
                if ((0, _utils.isDefined)(alias) && typeof alias === 'string') {
                    const entity = entityOrRunner;
                    return this.createQueryBuilder(entity, alias, queryRunner, {
                        calledByWorkspaceEntityManager: true
                    });
                } else {
                    const runner = entityOrRunner;
                    return this.createQueryBuilder(runner, {
                        calledByWorkspaceEntityManager: true
                    });
                }
            }
        });
        const queryRunner = this.driver.createQueryRunner(mode);
        const manager = new _EntityManagerFactory.EntityManagerFactory().create(dataSourceWithOverridenCreateQueryBuilder, queryRunner);
        Object.assign(queryRunner, {
            manager: manager
        });
        return queryRunner;
    }
    // Only callable from workspaceEntityManager to guarantee a permission check was run
    createQueryBuilder(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    queryRunnerOrEntityClass, aliasOrOptions, queryRunner, options) {
        let calledByWorkspaceEntityManager;
        const isCalledWithEntityTarget = (0, _utils.isDefined)(aliasOrOptions) && typeof aliasOrOptions === 'string';
        if (isCalledWithEntityTarget) {
            calledByWorkspaceEntityManager = options?.calledByWorkspaceEntityManager;
        } else {
            calledByWorkspaceEntityManager = aliasOrOptions?.calledByWorkspaceEntityManager;
        }
        if (!(calledByWorkspaceEntityManager === true)) {
            throw new _permissionsexception.PermissionsException('Method not allowed because permissions are not implemented at datasource level.', _permissionsexception.PermissionsExceptionCode.METHOD_NOT_ALLOWED);
        }
        if (isCalledWithEntityTarget) {
            // oxlint-disable-next-line @typescripttypescript/no-explicit-any
            const entityClass = queryRunnerOrEntityClass;
            return super.createQueryBuilder(entityClass, aliasOrOptions, queryRunner);
        } else {
            const queryRunner = queryRunnerOrEntityClass;
            return super.createQueryBuilder(queryRunner);
        }
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    query(query, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    parameters, queryRunner, options) {
        if (!options?.shouldBypassPermissionChecks) {
            throw new _permissionsexception.PermissionsException('Method not allowed because permissions are not implemented at datasource level.', _permissionsexception.PermissionsExceptionCode.METHOD_NOT_ALLOWED);
        }
        return super.query(query, parameters, queryRunner);
    }
    constructor(options, eventEmitterService, coreDataSource){
        super(options), this._isConstructing = true;
        this.eventEmitterService = eventEmitterService;
        this.coreDataSource = coreDataSource;
        this._isConstructing = false;
        Object.defineProperty(this, 'manager', {
            get: ()=>this.createEntityManager()
        });
    }
};

//# sourceMappingURL=global-workspace-datasource.js.map