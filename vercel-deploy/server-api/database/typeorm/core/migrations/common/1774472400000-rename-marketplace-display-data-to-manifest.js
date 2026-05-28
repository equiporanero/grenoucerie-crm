"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RenameMarketplaceDisplayDataToManifest1774472400000", {
    enumerable: true,
    get: function() {
        return RenameMarketplaceDisplayDataToManifest1774472400000;
    }
});
let RenameMarketplaceDisplayDataToManifest1774472400000 = class RenameMarketplaceDisplayDataToManifest1774472400000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" RENAME COLUMN "marketplaceDisplayData" TO "manifest"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP COLUMN IF EXISTS "description"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP COLUMN IF EXISTS "logoUrl"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP COLUMN IF EXISTS "author"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP COLUMN IF EXISTS "websiteUrl"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP COLUMN IF EXISTS "termsUrl"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD "termsUrl" text`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD "websiteUrl" text`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD "author" text`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD "logoUrl" text`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" RENAME COLUMN "manifest" TO "marketplaceDisplayData"`);
    }
    constructor(){
        this.name = 'RenameMarketplaceDisplayDataToManifest1774472400000';
    }
};

//# sourceMappingURL=1774472400000-rename-marketplace-display-data-to-manifest.js.map