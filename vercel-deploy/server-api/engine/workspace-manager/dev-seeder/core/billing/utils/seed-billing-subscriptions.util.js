"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seedBillingSubscriptions", {
    enumerable: true,
    get: function() {
        return seedBillingSubscriptions;
    }
});
const tableName = 'billingSubscription';
const seedBillingSubscriptions = async ({ queryRunner, schemaName, workspaceId })=>{
    await queryRunner.manager.createQueryBuilder().insert().into(`${schemaName}.${tableName}`, [
        'workspaceId',
        'stripeCustomerId',
        'stripeSubscriptionId',
        'status',
        'metadata'
    ]).orIgnore().values([
        {
            workspaceId,
            stripeCustomerId: 'cus_default0',
            stripeSubscriptionId: 'sub_default0',
            status: 'active',
            metadata: {
                workspaceId
            }
        }
    ]).execute();
};

//# sourceMappingURL=seed-billing-subscriptions.util.js.map