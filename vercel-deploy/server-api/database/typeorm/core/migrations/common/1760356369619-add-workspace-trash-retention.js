"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddWorkspaceTrashRetention1760356369619", {
    enumerable: true,
    get: function() {
        return AddWorkspaceTrashRetention1760356369619;
    }
});
let AddWorkspaceTrashRetention1760356369619 = class AddWorkspaceTrashRetention1760356369619 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "trashRetentionDays" integer NOT NULL DEFAULT '14'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "trashRetentionDays"`);
    }
    constructor(){
        this.name = 'AddWorkspaceTrashRetention1760356369619';
    }
};

//# sourceMappingURL=1760356369619-add-workspace-trash-retention.js.map