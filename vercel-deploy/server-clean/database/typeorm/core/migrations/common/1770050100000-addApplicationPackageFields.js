"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddApplicationPackageFields1770050100000", {
    enumerable: true,
    get: function() {
        return AddApplicationPackageFields1770050100000;
    }
});
let AddApplicationPackageFields1770050100000 = class AddApplicationPackageFields1770050100000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" ADD "packageJsonChecksum" text`);
        await queryRunner.query(`ALTER TABLE "core"."application" ADD "packageJsonFileId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."application" ADD "yarnLockChecksum" text`);
        await queryRunner.query(`ALTER TABLE "core"."application" ADD "yarnLockFileId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."application" ADD "availablePackages" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "core"."application" ADD CONSTRAINT "UQ_3818380258798f9ffa9963b6dc4" UNIQUE ("packageJsonFileId")`);
        await queryRunner.query(`ALTER TABLE "core"."application" ADD CONSTRAINT "UQ_28f20711184b3c3318a8e44d117" UNIQUE ("yarnLockFileId")`);
        await queryRunner.query(`ALTER TABLE "core"."application" ADD CONSTRAINT "FK_3818380258798f9ffa9963b6dc4" FOREIGN KEY ("packageJsonFileId") REFERENCES "core"."file"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."application" ADD CONSTRAINT "FK_28f20711184b3c3318a8e44d117" FOREIGN KEY ("yarnLockFileId") REFERENCES "core"."file"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" DROP CONSTRAINT "FK_28f20711184b3c3318a8e44d117"`);
        await queryRunner.query(`ALTER TABLE "core"."application" DROP CONSTRAINT "FK_3818380258798f9ffa9963b6dc4"`);
        await queryRunner.query(`ALTER TABLE "core"."application" DROP CONSTRAINT "UQ_28f20711184b3c3318a8e44d117"`);
        await queryRunner.query(`ALTER TABLE "core"."application" DROP CONSTRAINT "UQ_3818380258798f9ffa9963b6dc4"`);
        await queryRunner.query(`ALTER TABLE "core"."application" DROP COLUMN "availablePackages"`);
        await queryRunner.query(`ALTER TABLE "core"."application" DROP COLUMN "yarnLockFileId"`);
        await queryRunner.query(`ALTER TABLE "core"."application" DROP COLUMN "yarnLockChecksum"`);
        await queryRunner.query(`ALTER TABLE "core"."application" DROP COLUMN "packageJsonFileId"`);
        await queryRunner.query(`ALTER TABLE "core"."application" DROP COLUMN "packageJsonChecksum"`);
    }
    constructor(){
        this.name = 'AddApplicationPackageFields1770050100000';
    }
};

//# sourceMappingURL=1770050100000-addApplicationPackageFields.js.map