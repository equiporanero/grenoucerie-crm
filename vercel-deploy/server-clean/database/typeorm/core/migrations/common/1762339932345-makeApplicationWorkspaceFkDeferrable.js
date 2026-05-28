"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeApplicationWorkspaceFkDeferrable1762339932345", {
    enumerable: true,
    get: function() {
        return MakeApplicationWorkspaceFkDeferrable1762339932345;
    }
});
let MakeApplicationWorkspaceFkDeferrable1762339932345 = class MakeApplicationWorkspaceFkDeferrable1762339932345 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" DROP CONSTRAINT IF EXISTS "FK_08d1d5e33c2a3ce7c140e9b335b"`);
        // Recreate application.workspaceId FK as DEFERRABLE INITIALLY DEFERRED
        // This is the ONLY deferrable constraint - needed because we create application before workspace
        await queryRunner.query(`ALTER TABLE "core"."application" ADD CONSTRAINT "FK_08d1d5e33c2a3ce7c140e9b335b" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" DROP CONSTRAINT IF EXISTS "FK_08d1d5e33c2a3ce7c140e9b335b"`);
        await queryRunner.query(`ALTER TABLE "core"."application" ADD CONSTRAINT "FK_08d1d5e33c2a3ce7c140e9b335b" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'MakeApplicationWorkspaceFkDeferrable1762339932345';
    }
};

//# sourceMappingURL=1762339932345-makeApplicationWorkspaceFkDeferrable.js.map