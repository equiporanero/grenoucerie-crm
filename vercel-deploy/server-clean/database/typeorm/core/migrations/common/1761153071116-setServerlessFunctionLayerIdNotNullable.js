"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SetServerlessFunctionLayerIdNotNullable1761153071116", {
    enumerable: true,
    get: function() {
        return SetServerlessFunctionLayerIdNotNullable1761153071116;
    }
});
let SetServerlessFunctionLayerIdNotNullable1761153071116 = class SetServerlessFunctionLayerIdNotNullable1761153071116 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP CONSTRAINT "FK_4b9625a4babf7f4fa942fd26514"`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ALTER COLUMN "serverlessFunctionLayerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD CONSTRAINT "FK_4b9625a4babf7f4fa942fd26514" FOREIGN KEY ("serverlessFunctionLayerId") REFERENCES "core"."serverlessFunctionLayer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP CONSTRAINT "FK_4b9625a4babf7f4fa942fd26514"`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ALTER COLUMN "serverlessFunctionLayerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD CONSTRAINT "FK_4b9625a4babf7f4fa942fd26514" FOREIGN KEY ("serverlessFunctionLayerId") REFERENCES "core"."serverlessFunctionLayer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'SetServerlessFunctionLayerIdNotNullable1761153071116';
    }
};

//# sourceMappingURL=1761153071116-setServerlessFunctionLayerIdNotNullable.js.map