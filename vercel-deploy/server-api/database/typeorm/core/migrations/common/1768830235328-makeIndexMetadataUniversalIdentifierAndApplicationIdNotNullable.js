"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeIndexMetadataUniversalIdentifierAndApplicationIdNotNullable1768830235328", {
    enumerable: true,
    get: function() {
        return MakeIndexMetadataUniversalIdentifierAndApplicationIdNotNullable1768830235328;
    }
});
const _1768830235328makeIndexMetadataUniversalIdentifierAndApplicationIdNotNullableutil = require("../utils/1768830235328-makeIndexMetadataUniversalIdentifierAndApplicationIdNotNullable.util");
let MakeIndexMetadataUniversalIdentifierAndApplicationIdNotNullable1768830235328 = class MakeIndexMetadataUniversalIdentifierAndApplicationIdNotNullable1768830235328 {
    async up(queryRunner) {
        const savepointName = 'sp_make_index_metadata_universal_identifier_and_application_id_not_nullable';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1768830235328makeIndexMetadataUniversalIdentifierAndApplicationIdNotNullableutil.makeIndexMetadataUniversalIdentifierAndApplicationIdNotNullableQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in MakeIndexMetadataUniversalIdentifierAndApplicationIdNotNullable1768830235328', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing MakeIndexMetadataUniversalIdentifierAndApplicationIdNotNullable1768830235328 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" DROP CONSTRAINT "FK_056363e1599f5b9a0e33323d9da"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_b27c681286ac581f81498c5d4b"`);
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" ALTER COLUMN "universalIdentifier" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b27c681286ac581f81498c5d4b" ON "core"."indexMetadata" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" ADD CONSTRAINT "FK_056363e1599f5b9a0e33323d9da" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'MakeIndexMetadataUniversalIdentifierAndApplicationIdNotNullable1768830235328';
    }
};

//# sourceMappingURL=1768830235328-makeIndexMetadataUniversalIdentifierAndApplicationIdNotNullable.js.map