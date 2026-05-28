"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddPayloadToCommandMenuItem1775129635528", {
    enumerable: true,
    get: function() {
        return AddPayloadToCommandMenuItem1775129635528;
    }
});
const _1775129635528addpayloadtocommandmenuitemutil = require("../utils/1775129635528-add-payload-to-command-menu-item.util");
let AddPayloadToCommandMenuItem1775129635528 = class AddPayloadToCommandMenuItem1775129635528 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ADD "payload" jsonb`);
        const savepointName = 'sp_add_payload_check_constraint_to_command_menu_item';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1775129635528addpayloadtocommandmenuitemutil.addPayloadCheckConstraintToCommandMenuItem)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in AddPayloadToCommandMenuItem1775129635528', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing AddPayloadToCommandMenuItem1775129635528 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" DROP CONSTRAINT IF EXISTS "CHK_CMD_MENU_ITEM_ENGINE_KEY_COHERENCE"`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ADD CONSTRAINT "CHK_CMD_MENU_ITEM_ENGINE_KEY_COHERENCE" CHECK (("engineComponentKey" = 'TRIGGER_WORKFLOW_VERSION' AND "workflowVersionId" IS NOT NULL AND "frontComponentId" IS NULL) OR ("engineComponentKey" = 'FRONT_COMPONENT_RENDERER' AND "frontComponentId" IS NOT NULL AND "workflowVersionId" IS NULL) OR ("engineComponentKey" NOT IN ('TRIGGER_WORKFLOW_VERSION', 'FRONT_COMPONENT_RENDERER') AND "workflowVersionId" IS NULL AND "frontComponentId" IS NULL))`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" DROP COLUMN "payload"`);
    }
    constructor(){
        this.name = 'AddPayloadToCommandMenuItem1775129635528';
    }
};

//# sourceMappingURL=1775129635528-addPayloadToCommandMenuItem.js.map