"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddPageLayoutIdToCommandMenuItemFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddPageLayoutIdToCommandMenuItemFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddPageLayoutIdToCommandMenuItemFastInstanceCommand = class AddPageLayoutIdToCommandMenuItemFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."commandMenuItem" ADD "pageLayoutId" uuid');
        await queryRunner.query('CREATE INDEX "IDX_COMMAND_MENU_ITEM_PAGE_LAYOUT_ID_WORKSPACE_ID" ON "core"."commandMenuItem" ("pageLayoutId", "workspaceId") ');
        await queryRunner.query('ALTER TABLE "core"."commandMenuItem" ADD CONSTRAINT "FK_8577be6253969364b6725b807b4" FOREIGN KEY ("pageLayoutId") REFERENCES "core"."pageLayout"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."commandMenuItem" DROP CONSTRAINT "FK_8577be6253969364b6725b807b4"');
        await queryRunner.query('DROP INDEX "core"."IDX_COMMAND_MENU_ITEM_PAGE_LAYOUT_ID_WORKSPACE_ID"');
        await queryRunner.query('ALTER TABLE "core"."commandMenuItem" DROP COLUMN "pageLayoutId"');
    }
};
AddPageLayoutIdToCommandMenuItemFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.23.0', 1776168404836)
], AddPageLayoutIdToCommandMenuItemFastInstanceCommand);

//# sourceMappingURL=1-23-instance-command-fast-1776168404836-add-page-layout-id-to-command-menu-item.js.map