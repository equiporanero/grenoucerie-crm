"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddLogicFunctionIsBuildUpToDateColumn1770725043111", {
    enumerable: true,
    get: function() {
        return AddLogicFunctionIsBuildUpToDateColumn1770725043111;
    }
});
let AddLogicFunctionIsBuildUpToDateColumn1770725043111 = class AddLogicFunctionIsBuildUpToDateColumn1770725043111 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ADD "isBuildUpToDate" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ALTER COLUMN "sourceHandlerPath" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ALTER COLUMN "builtHandlerPath" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ALTER COLUMN "handlerName" DROP DEFAULT`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ALTER COLUMN "handlerName" SET DEFAULT 'main'`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ALTER COLUMN "builtHandlerPath" SET DEFAULT 'src/index.mjs'`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ALTER COLUMN "sourceHandlerPath" SET DEFAULT 'src/index.ts'`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" DROP COLUMN "isBuildUpToDate"`);
    }
    constructor(){
        this.name = 'AddLogicFunctionIsBuildUpToDateColumn1770725043111';
    }
};

//# sourceMappingURL=1770725043111-addLogicFunctionIsBuildUpToDateColumn.js.map