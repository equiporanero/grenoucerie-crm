"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddPhasesToBillingSubscription1756912860000", {
    enumerable: true,
    get: function() {
        return AddPhasesToBillingSubscription1756912860000;
    }
});
let AddPhasesToBillingSubscription1756912860000 = class AddPhasesToBillingSubscription1756912860000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."billingSubscription" ADD "phases" jsonb NOT NULL DEFAULT '[]'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."billingSubscription" DROP COLUMN "phases"`);
    }
    constructor(){
        this.name = 'AddPhasesToBillingSubscription1756912860000';
    }
};

//# sourceMappingURL=1756912860000-addPhasesToBillingSubscription.js.map