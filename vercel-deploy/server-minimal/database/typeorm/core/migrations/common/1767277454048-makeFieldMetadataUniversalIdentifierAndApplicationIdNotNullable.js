"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeFieldMetadataUniversalIdentifierAndApplicationIdNotNullable1767277454048", {
    enumerable: true,
    get: function() {
        return MakeFieldMetadataUniversalIdentifierAndApplicationIdNotNullable1767277454048;
    }
});
const _1767277454048makeFieldMetadataUniversalIdentifierAndApplicationIdNotNullableutil = require("../utils/1767277454048-makeFieldMetadataUniversalIdentifierAndApplicationIdNotNullable.util");
let MakeFieldMetadataUniversalIdentifierAndApplicationIdNotNullable1767277454048 = class MakeFieldMetadataUniversalIdentifierAndApplicationIdNotNullable1767277454048 {
    async up(queryRunner) {
        const savepointName = 'sp_make_field_metadata_universal_identifier_and_application_id_not_nullable';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1767277454048makeFieldMetadataUniversalIdentifierAndApplicationIdNotNullableutil.makeFieldMetadataUniversalIdentifierAndApplicationIdNotNullableQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in MakeFieldMetadataUniversalIdentifierAndApplicationIdNotNullable1767277454048', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing MakeFieldMetadataUniversalIdentifierAndApplicationIdNotNullable1767277454048 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."fieldMetadata" DROP CONSTRAINT "FK_05453a954e458e3d91f2ff5043f"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_f1c88fdfc3ad8910b17fc1fd73"`);
        await queryRunner.query(`ALTER TABLE "core"."fieldMetadata" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."fieldMetadata" ALTER COLUMN "universalIdentifier" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f1c88fdfc3ad8910b17fc1fd73" ON "core"."fieldMetadata" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`ALTER TABLE "core"."fieldMetadata" ADD CONSTRAINT "FK_05453a954e458e3d91f2ff5043f" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'MakeFieldMetadataUniversalIdentifierAndApplicationIdNotNullable1767277454048';
    }
};

//# sourceMappingURL=1767277454048-makeFieldMetadataUniversalIdentifierAndApplicationIdNotNullable.js.map