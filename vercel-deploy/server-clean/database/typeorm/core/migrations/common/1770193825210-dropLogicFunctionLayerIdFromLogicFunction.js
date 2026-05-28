"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropLogicFunctionLayerIdFromLogicFunction1770193825210", {
    enumerable: true,
    get: function() {
        return DropLogicFunctionLayerIdFromLogicFunction1770193825210;
    }
});
let DropLogicFunctionLayerIdFromLogicFunction1770193825210 = class DropLogicFunctionLayerIdFromLogicFunction1770193825210 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" DROP CONSTRAINT IF EXISTS "FK_87e3f7b8f23cd90709e127f60c5"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" DROP CONSTRAINT IF EXISTS "FK_4b9625a4babf7f4fa942fd26514"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "core"."IDX_LOGIC_FUNCTION_LAYER_ID"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" DROP COLUMN IF EXISTS "logicFunctionLayerId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ADD "logicFunctionLayerId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_LOGIC_FUNCTION_LAYER_ID" ON "core"."logicFunction" ("logicFunctionLayerId")`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ADD CONSTRAINT "FK_4b9625a4babf7f4fa942fd26514" FOREIGN KEY ("logicFunctionLayerId") REFERENCES "core"."logicFunctionLayer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'DropLogicFunctionLayerIdFromLogicFunction1770193825210';
    }
};

//# sourceMappingURL=1770193825210-dropLogicFunctionLayerIdFromLogicFunction.js.map