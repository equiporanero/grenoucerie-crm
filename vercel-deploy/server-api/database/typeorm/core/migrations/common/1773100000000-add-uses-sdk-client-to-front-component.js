"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUsesSdkClientToFrontComponent1773100000000", {
    enumerable: true,
    get: function() {
        return AddUsesSdkClientToFrontComponent1773100000000;
    }
});
let AddUsesSdkClientToFrontComponent1773100000000 = class AddUsesSdkClientToFrontComponent1773100000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" ADD "usesSdkClient" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" DROP COLUMN "usesSdkClient"`);
    }
    constructor(){
        this.name = 'AddUsesSdkClientToFrontComponent1773100000000';
    }
};

//# sourceMappingURL=1773100000000-add-uses-sdk-client-to-front-component.js.map