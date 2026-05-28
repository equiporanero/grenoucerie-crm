"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seedBillingCustomers", {
    enumerable: true,
    get: function() {
        return seedBillingCustomers;
    }
});
const tableName = 'billingCustomer';
const seedBillingCustomers = async ({ queryRunner, schemaName, workspaceId })=>{
    await queryRunner.manager.createQueryBuilder().insert().into(`${schemaName}.${tableName}`, [
        'workspaceId',
        'stripeCustomerId'
    ]).orIgnore().values([
        {
            workspaceId,
            stripeCustomerId: 'cus_default0'
        }
    ]).execute();
};

//# sourceMappingURL=seed-billing-customers.util.js.map