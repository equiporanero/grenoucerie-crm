"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddFrontComponentColumns1770309316193", {
    enumerable: true,
    get: function() {
        return AddFrontComponentColumns1770309316193;
    }
});
let AddFrontComponentColumns1770309316193 = class AddFrontComponentColumns1770309316193 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" ADD "sourceComponentPath" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" ADD "builtComponentPath" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" ADD "componentName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" ADD "builtComponentChecksum" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" DROP COLUMN "builtComponentChecksum"`);
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" DROP COLUMN "componentName"`);
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" DROP COLUMN "builtComponentPath"`);
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" DROP COLUMN "sourceComponentPath"`);
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" DROP COLUMN "description"`);
    }
    constructor(){
        this.name = 'AddFrontComponentColumns1770309316193';
    }
};

//# sourceMappingURL=1770309316193-add-front-component-columns.js.map