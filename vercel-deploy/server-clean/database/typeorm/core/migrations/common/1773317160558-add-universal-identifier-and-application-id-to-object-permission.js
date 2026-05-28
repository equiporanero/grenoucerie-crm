"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUniversalIdentifierAndApplicationIdToObjectPermission1773317160558", {
    enumerable: true,
    get: function() {
        return AddUniversalIdentifierAndApplicationIdToObjectPermission1773317160558;
    }
});
let AddUniversalIdentifierAndApplicationIdToObjectPermission1773317160558 = class AddUniversalIdentifierAndApplicationIdToObjectPermission1773317160558 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."objectPermission" ADD "universalIdentifier" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."objectPermission" ADD "applicationId" uuid`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."objectPermission" DROP COLUMN IF EXISTS "applicationId"`);
        await queryRunner.query(`ALTER TABLE "core"."objectPermission" DROP COLUMN IF EXISTS "universalIdentifier"`);
    }
    constructor(){
        this.name = 'AddUniversalIdentifierAndApplicationIdToObjectPermission1773317160558';
    }
};

//# sourceMappingURL=1773317160558-add-universal-identifier-and-application-id-to-object-permission.js.map