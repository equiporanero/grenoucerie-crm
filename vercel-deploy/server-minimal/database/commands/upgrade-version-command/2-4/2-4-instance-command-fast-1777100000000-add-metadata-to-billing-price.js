"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddMetadataToBillingPriceFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddMetadataToBillingPriceFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddMetadataToBillingPriceFastInstanceCommand = class AddMetadataToBillingPriceFastInstanceCommand {
    async up(queryRunner) {
        const tableExists = await queryRunner.query(`SELECT 1 FROM pg_tables WHERE schemaname = 'core' AND tablename = 'billingPrice'`);
        if (tableExists.length === 0) {
            return;
        }
        await queryRunner.query(`ALTER TABLE "core"."billingPrice" ADD COLUMN IF NOT EXISTS "metadata" jsonb NOT NULL DEFAULT '{}'`);
    }
    async down(queryRunner) {
        const tableExists = await queryRunner.query(`SELECT 1 FROM pg_tables WHERE schemaname = 'core' AND tablename = 'billingPrice'`);
        if (tableExists.length === 0) {
            return;
        }
        await queryRunner.query(`ALTER TABLE "core"."billingPrice" DROP COLUMN IF EXISTS "metadata"`);
    }
};
AddMetadataToBillingPriceFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.4.0', 1777100000000)
], AddMetadataToBillingPriceFastInstanceCommand);

//# sourceMappingURL=2-4-instance-command-fast-1777100000000-add-metadata-to-billing-price.js.map