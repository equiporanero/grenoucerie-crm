"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropStandardIdFromCoreEntities1770047816358", {
    enumerable: true,
    get: function() {
        return DropStandardIdFromCoreEntities1770047816358;
    }
});
let DropStandardIdFromCoreEntities1770047816358 = class DropStandardIdFromCoreEntities1770047816358 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agent" DROP COLUMN "standardId"`);
        await queryRunner.query(`ALTER TABLE "core"."role" DROP COLUMN "standardId"`);
        await queryRunner.query(`ALTER TABLE "core"."fieldMetadata" DROP COLUMN "standardId"`);
        await queryRunner.query(`ALTER TABLE "core"."skill" DROP COLUMN "standardId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."skill" ADD "standardId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."fieldMetadata" ADD "standardId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."role" ADD "standardId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."agent" ADD "standardId" uuid`);
    }
    constructor(){
        this.name = 'DropStandardIdFromCoreEntities1770047816358';
    }
};

//# sourceMappingURL=1770047816358-drop-standard-id-from-core-entities.js.map