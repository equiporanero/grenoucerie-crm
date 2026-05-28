"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUniversalIdentifierAndApplicationIdToFieldPermission1773400000000", {
    enumerable: true,
    get: function() {
        return AddUniversalIdentifierAndApplicationIdToFieldPermission1773400000000;
    }
});
let AddUniversalIdentifierAndApplicationIdToFieldPermission1773400000000 = class AddUniversalIdentifierAndApplicationIdToFieldPermission1773400000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."fieldPermission" ADD "universalIdentifier" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."fieldPermission" ADD "applicationId" uuid`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."fieldPermission" DROP COLUMN IF EXISTS "applicationId"`);
        await queryRunner.query(`ALTER TABLE "core"."fieldPermission" DROP COLUMN IF EXISTS "universalIdentifier"`);
    }
    constructor(){
        this.name = 'AddUniversalIdentifierAndApplicationIdToFieldPermission1773400000000';
    }
};

//# sourceMappingURL=1773400000000-add-universal-identifier-and-application-id-to-field-permission.js.map