"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddIsHeadlessToFrontComponent1771509478665", {
    enumerable: true,
    get: function() {
        return AddIsHeadlessToFrontComponent1771509478665;
    }
});
let AddIsHeadlessToFrontComponent1771509478665 = class AddIsHeadlessToFrontComponent1771509478665 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" ADD "isHeadless" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."frontComponent" DROP COLUMN "isHeadless"`);
    }
    constructor(){
        this.name = 'AddIsHeadlessToFrontComponent1771509478665';
    }
};

//# sourceMappingURL=1771509478665-add-is-headless-to-front-component.js.map