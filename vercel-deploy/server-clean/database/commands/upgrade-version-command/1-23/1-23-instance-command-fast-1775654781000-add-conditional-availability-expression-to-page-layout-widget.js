"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddConditionalAvailabilityExpressionToPageLayoutWidgetFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddConditionalAvailabilityExpressionToPageLayoutWidgetFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddConditionalAvailabilityExpressionToPageLayoutWidgetFastInstanceCommand = class AddConditionalAvailabilityExpressionToPageLayoutWidgetFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ADD COLUMN IF NOT EXISTS "conditionalAvailabilityExpression" varchar`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" DROP COLUMN IF EXISTS "conditionalAvailabilityExpression"`);
    }
};
AddConditionalAvailabilityExpressionToPageLayoutWidgetFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.23.0', 1775654781000)
], AddConditionalAvailabilityExpressionToPageLayoutWidgetFastInstanceCommand);

//# sourceMappingURL=1-23-instance-command-fast-1775654781000-add-conditional-availability-expression-to-page-layout-widget.js.map