"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceCustomApplicationIdForeignKey1762437814771", {
    enumerable: true,
    get: function() {
        return WorkspaceCustomApplicationIdForeignKey1762437814771;
    }
});
let WorkspaceCustomApplicationIdForeignKey1762437814771 = class WorkspaceCustomApplicationIdForeignKey1762437814771 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD CONSTRAINT "FK_3b1acb13a5dac9956d1a4b32755" FOREIGN KEY ("workspaceCustomApplicationId") REFERENCES "core"."application"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP CONSTRAINT "FK_3b1acb13a5dac9956d1a4b32755"`);
    }
    constructor(){
        this.name = 'WorkspaceCustomApplicationIdForeignKey1762437814771';
    }
};

//# sourceMappingURL=1762437814771-workspace-custom-application-id-foreign-key.js.map