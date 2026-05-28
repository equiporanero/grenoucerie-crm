"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NullableApplicationServerlessFunctionLayer1762333916255", {
    enumerable: true,
    get: function() {
        return NullableApplicationServerlessFunctionLayer1762333916255;
    }
});
let NullableApplicationServerlessFunctionLayer1762333916255 = class NullableApplicationServerlessFunctionLayer1762333916255 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" ALTER COLUMN "serverlessFunctionLayerId" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" ALTER COLUMN "serverlessFunctionLayerId" SET NOT NULL`);
    }
    constructor(){
        this.name = 'NullableApplicationServerlessFunctionLayer1762333916255';
    }
};

//# sourceMappingURL=1762333916255-nullable-application-serverless-function-layer.js.map