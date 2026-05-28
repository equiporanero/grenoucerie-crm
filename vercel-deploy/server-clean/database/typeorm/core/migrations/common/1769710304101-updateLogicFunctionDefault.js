"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateLogicFunctionDefault1769710304101", {
    enumerable: true,
    get: function() {
        return UpdateLogicFunctionDefault1769710304101;
    }
});
let UpdateLogicFunctionDefault1769710304101 = class UpdateLogicFunctionDefault1769710304101 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ALTER COLUMN "builtHandlerPath" SET DEFAULT 'src/index.mjs'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ALTER COLUMN "builtHandlerPath" SET DEFAULT 'index.mjs'`);
    }
    constructor(){
        this.name = 'UpdateLogicFunctionDefault1769710304101';
    }
};

//# sourceMappingURL=1769710304101-updateLogicFunctionDefault.js.map