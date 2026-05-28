"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddToolSchemaToServerlessFunction1767364430164", {
    enumerable: true,
    get: function() {
        return AddToolSchemaToServerlessFunction1767364430164;
    }
});
let AddToolSchemaToServerlessFunction1767364430164 = class AddToolSchemaToServerlessFunction1767364430164 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "toolInputSchema" jsonb`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "isTool" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "isTool"`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "toolInputSchema"`);
    }
    constructor(){
        this.name = 'AddToolSchemaToServerlessFunction1767364430164';
    }
};

//# sourceMappingURL=1767364430164-add-tool-schema-to-serverless-function.js.map