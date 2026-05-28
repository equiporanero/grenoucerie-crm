"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RenameServerless1769556947746", {
    enumerable: true,
    get: function() {
        return RenameServerless1769556947746;
    }
});
let RenameServerless1769556947746 = class RenameServerless1769556947746 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunctionLayer" RENAME TO "logicFunctionLayer"`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" RENAME TO "logicFunction"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" RENAME COLUMN "serverlessFunctionLayerId" TO "logicFunctionLayerId"`);
        await queryRunner.query(`ALTER TABLE "core"."application" RENAME COLUMN "serverlessFunctionLayerId" TO "logicFunctionLayerId"`);
        await queryRunner.query(`ALTER TABLE "core"."application" RENAME COLUMN "defaultServerlessFunctionRoleId" TO "defaultLogicFunctionRoleId"`);
        await queryRunner.query(`ALTER INDEX "core"."IDX_SERVERLESS_FUNCTION_ID_DELETED_AT" RENAME TO "IDX_LOGIC_FUNCTION_ID_DELETED_AT"`);
        await queryRunner.query(`ALTER INDEX "core"."IDX_SERVERLESS_FUNCTION_LAYER_ID" RENAME TO "IDX_LOGIC_FUNCTION_LAYER_ID"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER INDEX "core"."IDX_LOGIC_FUNCTION_LAYER_ID" RENAME TO "IDX_SERVERLESS_FUNCTION_LAYER_ID"`);
        await queryRunner.query(`ALTER INDEX "core"."IDX_LOGIC_FUNCTION_ID_DELETED_AT" RENAME TO "IDX_SERVERLESS_FUNCTION_ID_DELETED_AT"`);
        await queryRunner.query(`ALTER TABLE "core"."application" RENAME COLUMN "defaultLogicFunctionRoleId" TO "defaultServerlessFunctionRoleId"`);
        await queryRunner.query(`ALTER TABLE "core"."application" RENAME COLUMN "logicFunctionLayerId" TO "serverlessFunctionLayerId"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" RENAME COLUMN "logicFunctionLayerId" TO "serverlessFunctionLayerId"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" RENAME TO "serverlessFunction"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunctionLayer" RENAME TO "serverlessFunctionLayer"`);
    }
    constructor(){
        this.name = 'RenameServerless1769556947746';
    }
};

//# sourceMappingURL=1769556947746-renameServerless.js.map