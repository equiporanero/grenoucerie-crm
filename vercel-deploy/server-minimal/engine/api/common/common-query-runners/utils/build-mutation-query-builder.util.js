"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildMutationQueryBuilder", {
    enumerable: true,
    get: function() {
        return buildMutationQueryBuilder;
    }
});
const buildMutationQueryBuilder = ({ repository, alias, filter, commonQueryParser })=>{
    const filteredQueryBuilder = repository.createQueryBuilder(alias);
    commonQueryParser.applyFilterToBuilder(filteredQueryBuilder, alias, filter);
    const hasRelationTraversal = filteredQueryBuilder.expressionMap.joinAttributes.length > 0;
    if (!hasRelationTraversal) {
        return filteredQueryBuilder;
    }
    // TypeORM auto-injects `deletedAt IS NULL` for SELECT-typed queries but
    // not for mutation-typed ones, so the subquery (a SELECT) must opt out to
    // mirror the semantics of the mutation it feeds — otherwise `restoreMany`
    // would never find soft-deleted rows.
    const idSubQueryBuilder = filteredQueryBuilder.select(`${alias}.id`).withDeleted();
    return repository.createQueryBuilder(alias).where(`"${alias}"."id" IN (${idSubQueryBuilder.getQuery()})`).setParameters(idSubQueryBuilder.expressionMap.parameters);
};

//# sourceMappingURL=build-mutation-query-builder.util.js.map