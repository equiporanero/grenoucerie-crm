"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUniversalIdentifierToServerlessFunction1758793689363", {
    enumerable: true,
    get: function() {
        return AddUniversalIdentifierToServerlessFunction1758793689363;
    }
});
let AddUniversalIdentifierToServerlessFunction1758793689363 = class AddUniversalIdentifierToServerlessFunction1758793689363 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "universalIdentifier" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "applicationId" uuid`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5b43e65e322d516c9307bed97a" ON "core"."serverlessFunction" ("workspaceId", "universalIdentifier") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "core"."IDX_5b43e65e322d516c9307bed97a"`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "applicationId"`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "universalIdentifier"`);
    }
    constructor(){
        this.name = 'AddUniversalIdentifierToServerlessFunction1758793689363';
    }
};

//# sourceMappingURL=1758793689363-addUniversalIdentifierToServerlessFunction.js.map