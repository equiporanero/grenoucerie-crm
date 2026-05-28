"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SetServerlessFunctionLayerNotNullable1759931071049", {
    enumerable: true,
    get: function() {
        return SetServerlessFunctionLayerNotNullable1759931071049;
    }
});
let SetServerlessFunctionLayerNotNullable1759931071049 = class SetServerlessFunctionLayerNotNullable1759931071049 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "layerVersion"`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "latestVersionInputSchema"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction"
        ADD "latestVersionInputSchema" jsonb`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction"
        ADD "layerVersion" integer`);
    }
    constructor(){
        this.name = 'SetServerlessFunctionLayerNotNullable1759931071049';
    }
};

//# sourceMappingURL=1759931071049-setServerlessFunctionLayerNotNullable.js.map