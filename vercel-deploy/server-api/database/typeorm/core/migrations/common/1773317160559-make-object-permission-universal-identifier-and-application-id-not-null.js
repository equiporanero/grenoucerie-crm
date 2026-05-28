"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeObjectPermissionUniversalIdentifierAndApplicationIdNotNull1773317160559", {
    enumerable: true,
    get: function() {
        return MakeObjectPermissionUniversalIdentifierAndApplicationIdNotNull1773317160559;
    }
});
const _1773317160558makeobjectpermissionuniversalidentifierandapplicationidnotnullutil = require("../utils/1773317160558-make-object-permission-universal-identifier-and-application-id-not-null.util");
let MakeObjectPermissionUniversalIdentifierAndApplicationIdNotNull1773317160559 = class MakeObjectPermissionUniversalIdentifierAndApplicationIdNotNull1773317160559 {
    async up(queryRunner) {
        const savepointName = 'sp_make_object_permission_universal_identifier_and_application_id_not_null';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1773317160558makeobjectpermissionuniversalidentifierandapplicationidnotnullutil.makeObjectPermissionUniversalIdentifierAndApplicationIdNotNullQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in MakeObjectPermissionUniversalIdentifierAndApplicationIdNotNull1773317160559', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing MakeObjectPermissionUniversalIdentifierAndApplicationIdNotNull1773317160559 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."objectPermission" DROP CONSTRAINT IF EXISTS "FK_f2ecee1066fd43800dbc85f87e4"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "core"."IDX_c5ea53618b32558fe24e495f21"`);
        await queryRunner.query(`ALTER TABLE "core"."objectPermission" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."objectPermission" ALTER COLUMN "universalIdentifier" DROP NOT NULL`);
    }
    constructor(){
        this.name = 'MakeObjectPermissionUniversalIdentifierAndApplicationIdNotNull1773317160559';
    }
};

//# sourceMappingURL=1773317160559-make-object-permission-universal-identifier-and-application-id-not-null.js.map