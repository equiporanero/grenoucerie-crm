"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddGlobalKeyValuePairUniqueIndex1774700000000", {
    enumerable: true,
    get: function() {
        return AddGlobalKeyValuePairUniqueIndex1774700000000;
    }
});
const _1774700000000addglobalkeyvaluepairuniqueindexutil = require("../utils/1774700000000-add-global-key-value-pair-unique-index.util");
let AddGlobalKeyValuePairUniqueIndex1774700000000 = class AddGlobalKeyValuePairUniqueIndex1774700000000 {
    async up(queryRunner) {
        const savepointName = 'sp_add_global_key_value_pair_unique_index';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1774700000000addglobalkeyvaluepairuniqueindexutil.addGlobalKeyValuePairUniqueIndexQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in AddGlobalKeyValuePairUniqueIndex1774700000000', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing AddGlobalKeyValuePairUniqueIndex1774700000000 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "core"."IDX_KEY_VALUE_PAIR_KEY_NULL_USER_ID_NULL_WORKSPACE_ID_UNIQUE"`);
    }
    constructor(){
        this.name = 'AddGlobalKeyValuePairUniqueIndex1774700000000';
    }
};

//# sourceMappingURL=1774700000000-add-global-key-value-pair-unique-index.js.map