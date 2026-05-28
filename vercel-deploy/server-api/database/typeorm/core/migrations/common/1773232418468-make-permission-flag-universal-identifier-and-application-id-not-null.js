"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakePermissionFlagUniversalIdentifierAndApplicationIdNotNull1773232418468", {
    enumerable: true,
    get: function() {
        return MakePermissionFlagUniversalIdentifierAndApplicationIdNotNull1773232418468;
    }
});
const _1773232418467makepermissionflaguniversalidentifierandapplicationidnotnullutil = require("../utils/1773232418467-make-permission-flag-universal-identifier-and-application-id-not-null.util");
let MakePermissionFlagUniversalIdentifierAndApplicationIdNotNull1773232418468 = class MakePermissionFlagUniversalIdentifierAndApplicationIdNotNull1773232418468 {
    async up(queryRunner) {
        const savepointName = 'sp_make_permission_flag_universal_identifier_and_application_id_not_null';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1773232418467makepermissionflaguniversalidentifierandapplicationidnotnullutil.makePermissionFlagUniversalIdentifierAndApplicationIdNotNullQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in MakePermissionFlagUniversalIdentifierAndApplicationIdNotNull1773232418468', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing MakePermissionFlagUniversalIdentifierAndApplicationIdNotNull1773232418468 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."permissionFlag" DROP CONSTRAINT IF EXISTS "FK_b26a9d39a88d0e72373c677c6c5"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "core"."IDX_da8ffd3c24b4a819430a861067"`);
        await queryRunner.query(`ALTER TABLE "core"."permissionFlag" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."permissionFlag" ALTER COLUMN "universalIdentifier" DROP NOT NULL`);
    }
    constructor(){
        this.name = 'MakePermissionFlagUniversalIdentifierAndApplicationIdNotNull1773232418468';
    }
};

//# sourceMappingURL=1773232418468-make-permission-flag-universal-identifier-and-application-id-not-null.js.map