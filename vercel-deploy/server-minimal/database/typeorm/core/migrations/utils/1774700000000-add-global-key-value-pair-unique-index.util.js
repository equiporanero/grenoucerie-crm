"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addGlobalKeyValuePairUniqueIndexQueries", {
    enumerable: true,
    get: function() {
        return addGlobalKeyValuePairUniqueIndexQueries;
    }
});
const addGlobalKeyValuePairUniqueIndexQueries = async (queryRunner)=>{
    await queryRunner.query(`DROP INDEX IF EXISTS "core"."IDX_KEY_VALUE_PAIR_KEY_NULL_USER_ID_NULL_WORKSPACE_ID_UNIQUE"`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_KEY_VALUE_PAIR_KEY_NULL_USER_ID_NULL_WORKSPACE_ID_UNIQUE" ON "core"."keyValuePair" ("key") WHERE "userId" is NULL AND "workspaceId" is NULL`);
};

//# sourceMappingURL=1774700000000-add-global-key-value-pair-unique-index.util.js.map