"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddForwardedRequestHeadersInRouteTriggers1768399525609", {
    enumerable: true,
    get: function() {
        return AddForwardedRequestHeadersInRouteTriggers1768399525609;
    }
});
let AddForwardedRequestHeadersInRouteTriggers1768399525609 = class AddForwardedRequestHeadersInRouteTriggers1768399525609 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" ADD "forwardedRequestHeaders" jsonb NOT NULL DEFAULT '[]'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" DROP COLUMN "forwardedRequestHeaders"`);
    }
    constructor(){
        this.name = 'AddForwardedRequestHeadersInRouteTriggers1768399525609';
    }
};

//# sourceMappingURL=1768399525609-addForwardedRequestHeadersInRouteTriggers.js.map