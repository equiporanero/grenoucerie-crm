"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUniversalIdentifierAndApplicationIdToPermissionFlag1773232418467", {
    enumerable: true,
    get: function() {
        return AddUniversalIdentifierAndApplicationIdToPermissionFlag1773232418467;
    }
});
let AddUniversalIdentifierAndApplicationIdToPermissionFlag1773232418467 = class AddUniversalIdentifierAndApplicationIdToPermissionFlag1773232418467 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."permissionFlag" ADD "universalIdentifier" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."permissionFlag" ADD "applicationId" uuid`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."permissionFlag" DROP COLUMN IF EXISTS "applicationId"`);
        await queryRunner.query(`ALTER TABLE "core"."permissionFlag" DROP COLUMN IF EXISTS "universalIdentifier"`);
    }
    constructor(){
        this.name = 'AddUniversalIdentifierAndApplicationIdToPermissionFlag1773232418467';
    }
};

//# sourceMappingURL=1773232418467-add-universal-identifier-and-application-id-to-permission-flag.js.map