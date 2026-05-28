"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddSsoBypassFlag1761651107128", {
    enumerable: true,
    get: function() {
        return AddSsoBypassFlag1761651107128;
    }
});
let AddSsoBypassFlag1761651107128 = class AddSsoBypassFlag1761651107128 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "isGoogleAuthBypassEnabled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "isPasswordAuthBypassEnabled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "isMicrosoftAuthBypassEnabled" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "isMicrosoftAuthBypassEnabled"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "isPasswordAuthBypassEnabled"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "isGoogleAuthBypassEnabled"`);
    }
    constructor(){
        this.name = 'AddSsoBypassFlag1761651107128';
    }
};

//# sourceMappingURL=1761651107128-addSsoBypassFlag.js.map