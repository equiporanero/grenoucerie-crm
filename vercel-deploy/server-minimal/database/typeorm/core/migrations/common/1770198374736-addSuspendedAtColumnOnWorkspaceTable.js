"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddSuspendedAtColumnOnWorkspaceTable1770198374736", {
    enumerable: true,
    get: function() {
        return AddSuspendedAtColumnOnWorkspaceTable1770198374736;
    }
});
let AddSuspendedAtColumnOnWorkspaceTable1770198374736 = class AddSuspendedAtColumnOnWorkspaceTable1770198374736 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "suspendedAt" TIMESTAMP WITH TIME ZONE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "suspendedAt"`);
    }
    constructor(){
        this.name = 'AddSuspendedAtColumnOnWorkspaceTable1770198374736';
    }
};

//# sourceMappingURL=1770198374736-addSuspendedAtColumnOnWorkspaceTable.js.map