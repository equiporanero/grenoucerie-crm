"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateFileTable1768572831179", {
    enumerable: true,
    get: function() {
        return UpdateFileTable1768572831179;
    }
});
const _1768572831179updateFileTableutil = require("../utils/1768572831179-updateFileTable.util");
let UpdateFileTable1768572831179 = class UpdateFileTable1768572831179 {
    async up(queryRunner) {
        const savepointName = 'sp_update_file_table';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1768572831179updateFileTableutil.updateFileTableQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in UpdateFileTable1768572831179', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing UpdateFileTable1768572831179 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."file" DROP CONSTRAINT "FK_413aaaf293284c3c0266d0bab3a"`);
        await queryRunner.query(`ALTER TABLE "core"."file" DROP COLUMN "isStaticAsset"`);
        await queryRunner.query(`ALTER TABLE "core"."file" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "core"."file" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "core"."file" DROP COLUMN "path"`);
        await queryRunner.query(`ALTER TABLE "core"."file" DROP COLUMN "applicationId"`);
        await queryRunner.query(`ALTER TABLE "core"."file" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."file" ADD "fullPath" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."file" ADD "name" character varying NOT NULL`);
    }
    constructor(){
        this.name = 'UpdateFileTable1768572831179';
    }
};

//# sourceMappingURL=1768572831179-updateFileTable.js.map