"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddFrontComponentIdToCommandMenuItem1769654418252", {
    enumerable: true,
    get: function() {
        return AddFrontComponentIdToCommandMenuItem1769654418252;
    }
});
let AddFrontComponentIdToCommandMenuItem1769654418252 = class AddFrontComponentIdToCommandMenuItem1769654418252 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ADD "frontComponentId" uuid`);
        await queryRunner.query(`DROP INDEX "core"."IDX_COMMAND_MENU_ITEM_WORKFLOW_VERSION_ID_WORKSPACE_ID"`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "workflowVersionId" DROP NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_COMMAND_MENU_ITEM_FRONT_COMPONENT_ID_WORKSPACE_ID" ON "core"."commandMenuItem" ("frontComponentId", "workspaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_COMMAND_MENU_ITEM_WORKFLOW_VERSION_ID_WORKSPACE_ID" ON "core"."commandMenuItem" ("workflowVersionId", "workspaceId") `);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ADD CONSTRAINT "CHK_command_menu_item_workflow_or_front_component" CHECK (("workflowVersionId" IS NOT NULL AND "frontComponentId" IS NULL) OR ("workflowVersionId" IS NULL AND "frontComponentId" IS NOT NULL))`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ADD CONSTRAINT "FK_342086f37d44e726a359ed6fd7d" FOREIGN KEY ("frontComponentId") REFERENCES "core"."frontComponent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" DROP CONSTRAINT "FK_342086f37d44e726a359ed6fd7d"`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" DROP CONSTRAINT "CHK_command_menu_item_workflow_or_front_component"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_COMMAND_MENU_ITEM_WORKFLOW_VERSION_ID_WORKSPACE_ID"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_COMMAND_MENU_ITEM_FRONT_COMPONENT_ID_WORKSPACE_ID"`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "workflowVersionId" SET NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_COMMAND_MENU_ITEM_WORKFLOW_VERSION_ID_WORKSPACE_ID" ON "core"."commandMenuItem" ("workflowVersionId", "workspaceId")`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" DROP COLUMN "frontComponentId"`);
    }
    constructor(){
        this.name = 'AddFrontComponentIdToCommandMenuItem1769654418252';
    }
};

//# sourceMappingURL=1769654418252-add-front-component-id-to-command-menu-item.js.map