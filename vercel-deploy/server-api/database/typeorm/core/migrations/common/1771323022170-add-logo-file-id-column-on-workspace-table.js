"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddLogoFileIdColumnOnWorkspaceTable1771323022170", {
    enumerable: true,
    get: function() {
        return AddLogoFileIdColumnOnWorkspaceTable1771323022170;
    }
});
let AddLogoFileIdColumnOnWorkspaceTable1771323022170 = class AddLogoFileIdColumnOnWorkspaceTable1771323022170 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "logoFileId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD CONSTRAINT "UQ_282123b2f32e927b6003311e33a" UNIQUE ("logoFileId")`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD CONSTRAINT "FK_282123b2f32e927b6003311e33a" FOREIGN KEY ("logoFileId") REFERENCES "core"."file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP CONSTRAINT "FK_282123b2f32e927b6003311e33a"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP CONSTRAINT "UQ_282123b2f32e927b6003311e33a"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "logoFileId"`);
    }
    constructor(){
        this.name = 'AddLogoFileIdColumnOnWorkspaceTable1771323022170';
    }
};

//# sourceMappingURL=1771323022170-add-logo-file-id-column-on-workspace-table.js.map