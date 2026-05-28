"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceScopedRepository", {
    enumerable: true,
    get: function() {
        return WorkspaceScopedRepository;
    }
});
let WorkspaceScopedRepository = class WorkspaceScopedRepository {
    findOne(workspaceId, options) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.findOne({
            ...options,
            where: this.mergeWorkspaceIdIntoWhere(workspaceId, options.where)
        });
    }
    findOneOrFail(workspaceId, options) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.findOneOrFail({
            ...options,
            where: this.mergeWorkspaceIdIntoWhere(workspaceId, options.where)
        });
    }
    find(workspaceId, options) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.find({
            ...options,
            where: this.mergeWorkspaceIdIntoWhere(workspaceId, options?.where)
        });
    }
    count(workspaceId, options) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.count({
            ...options,
            where: this.mergeWorkspaceIdIntoWhere(workspaceId, options?.where)
        });
    }
    update(workspaceId, criteria, partialEntity) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.update(this.mergeWorkspaceIdIntoCriteria(workspaceId, criteria), partialEntity);
    }
    delete(workspaceId, criteria) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.delete(this.mergeWorkspaceIdIntoCriteria(workspaceId, criteria));
    }
    softDelete(workspaceId, criteria) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.softDelete(this.mergeWorkspaceIdIntoCriteria(workspaceId, criteria));
    }
    insert(workspaceId, entity) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.insert(this.stampWorkspaceIdOnEntities(workspaceId, entity));
    }
    upsert(workspaceId, entity, conflictPathsOrOptions) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.upsert(this.stampWorkspaceIdOnEntities(workspaceId, entity), conflictPathsOrOptions);
    }
    save(workspaceId, entity, options) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.save({
            ...entity,
            workspaceId
        }, options);
    }
    saveMany(workspaceId, entities, options) {
        this.assertWorkspaceId(workspaceId);
        return this.repository.save(entities.map((entity)=>({
                ...entity,
                workspaceId
            })), options);
    }
    // Escape hatch. Caller MUST add the workspaceId predicate themselves.
    createQueryBuilder(alias) {
        return this.repository.createQueryBuilder(alias);
    }
    // Returns a wrapper bound to the given EntityManager (transactions).
    withManager(manager) {
        return new WorkspaceScopedRepository(manager.getRepository(this.repository.target));
    }
    // TypeORM drops `undefined` values from WHERE, which would emit an
    // unscoped query. Reject falsy workspaceId at the boundary.
    assertWorkspaceId(workspaceId) {
        if (workspaceId === undefined || workspaceId === null || workspaceId === '') {
            throw new Error('WorkspaceScopedRepository: workspaceId must be a non-empty string.');
        }
    }
    mergeWorkspaceIdIntoWhere(workspaceId, where) {
        if (where === undefined) {
            return {
                workspaceId
            };
        }
        if (Array.isArray(where)) {
            return where.map((clause)=>this.prependWorkspaceId(workspaceId, clause));
        }
        return this.prependWorkspaceId(workspaceId, where);
    }
    mergeWorkspaceIdIntoCriteria(workspaceId, criteria) {
        return this.prependWorkspaceId(workspaceId, criteria);
    }
    prependWorkspaceId(workspaceId, clause) {
        if ('workspaceId' in clause) {
            throw new Error('WorkspaceScopedRepository: do not include `workspaceId` in the WHERE clause — it is provided as the first argument and merged automatically.');
        }
        return {
            workspaceId,
            ...clause
        };
    }
    stampWorkspaceIdOnEntities(workspaceId, entity) {
        if (Array.isArray(entity)) {
            return entity.map((item)=>({
                    ...item,
                    workspaceId
                }));
        }
        return {
            ...entity,
            workspaceId
        };
    }
    constructor(repository){
        this.repository = repository;
    }
};

//# sourceMappingURL=workspace-scoped-repository.js.map