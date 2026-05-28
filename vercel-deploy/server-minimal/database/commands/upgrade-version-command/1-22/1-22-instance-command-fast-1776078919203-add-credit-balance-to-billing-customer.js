"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddCreditBalanceToBillingCustomerFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddCreditBalanceToBillingCustomerFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddCreditBalanceToBillingCustomerFastInstanceCommand = class AddCreditBalanceToBillingCustomerFastInstanceCommand {
    async up(queryRunner) {
        const tableExists = await queryRunner.query(`SELECT 1 FROM pg_tables WHERE schemaname = 'core' AND tablename = 'billingCustomer'`);
        if (tableExists.length === 0) {
            return;
        }
        await queryRunner.query(`ALTER TABLE "core"."billingCustomer" ADD COLUMN IF NOT EXISTS "creditBalanceMicro" bigint NOT NULL DEFAULT 0`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."billingCustomer" DROP COLUMN IF EXISTS "creditBalanceMicro"`);
    }
};
AddCreditBalanceToBillingCustomerFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.22.0', 1776078919203)
], AddCreditBalanceToBillingCustomerFastInstanceCommand);

//# sourceMappingURL=1-22-instance-command-fast-1776078919203-add-credit-balance-to-billing-customer.js.map