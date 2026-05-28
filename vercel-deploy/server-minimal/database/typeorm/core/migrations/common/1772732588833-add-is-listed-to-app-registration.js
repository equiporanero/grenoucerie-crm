"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddIsListedToAppRegistration1772732588833", {
    enumerable: true,
    get: function() {
        return AddIsListedToAppRegistration1772732588833;
    }
});
let AddIsListedToAppRegistration1772732588833 = class AddIsListedToAppRegistration1772732588833 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD "isListed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ALTER COLUMN "workspaceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP CONSTRAINT IF EXISTS "FK_applicationRegistration_workspaceId"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD CONSTRAINT "FK_applicationRegistration_workspaceId" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE SET NULL`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP CONSTRAINT "FK_applicationRegistration_workspaceId"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP CONSTRAINT "FK_94ab20372e448d45088357f884e"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ALTER COLUMN "workspaceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD CONSTRAINT "FK_94ab20372e448d45088357f884e" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD CONSTRAINT "FK_applicationRegistration_workspaceId" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP CONSTRAINT "FK_94ab20372e448d45088357f884e"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ALTER COLUMN "workspaceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD CONSTRAINT "FK_94ab20372e448d45088357f884e" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP CONSTRAINT IF EXISTS "FK_applicationRegistration_workspaceId"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD CONSTRAINT "FK_applicationRegistration_workspaceId" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ALTER COLUMN "workspaceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP COLUMN "isListed"`);
    }
    constructor(){
        this.name = 'AddIsListedToAppRegistration1772732588833';
    }
};

//# sourceMappingURL=1772732588833-add-is-listed-to-app-registration.js.map