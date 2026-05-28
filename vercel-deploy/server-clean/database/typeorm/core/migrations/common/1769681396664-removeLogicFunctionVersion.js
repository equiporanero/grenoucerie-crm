"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveLogicFunctionVersion1769681396664", {
    enumerable: true,
    get: function() {
        return RemoveLogicFunctionVersion1769681396664;
    }
});
let RemoveLogicFunctionVersion1769681396664 = class RemoveLogicFunctionVersion1769681396664 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" DROP COLUMN "latestVersion"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" DROP COLUMN "publishedVersions"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ADD "publishedVersions" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ADD "latestVersion" character varying`);
    }
    constructor(){
        this.name = 'RemoveLogicFunctionVersion1769681396664';
    }
};

//# sourceMappingURL=1769681396664-removeLogicFunctionVersion.js.map