"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddConditionalAvailabilityExpressionToCommandMenuItem1772267875870", {
    enumerable: true,
    get: function() {
        return AddConditionalAvailabilityExpressionToCommandMenuItem1772267875870;
    }
});
let AddConditionalAvailabilityExpressionToCommandMenuItem1772267875870 = class AddConditionalAvailabilityExpressionToCommandMenuItem1772267875870 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ADD "conditionalAvailabilityExpression" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" DROP COLUMN "conditionalAvailabilityExpression"`);
    }
    constructor(){
        this.name = 'AddConditionalAvailabilityExpressionToCommandMenuItem1772267875870';
    }
};

//# sourceMappingURL=1772267875870-add-conditional-availability-expression-to-command-menu-item.js.map