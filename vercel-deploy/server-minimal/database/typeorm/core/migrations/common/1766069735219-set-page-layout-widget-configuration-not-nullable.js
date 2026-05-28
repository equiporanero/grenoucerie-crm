"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CoreMigrationCheck1766069735219", {
    enumerable: true,
    get: function() {
        return CoreMigrationCheck1766069735219;
    }
});
let CoreMigrationCheck1766069735219 = class CoreMigrationCheck1766069735219 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "configuration" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "configuration" DROP NOT NULL`);
    }
    constructor(){
        this.name = 'CoreMigrationCheck1766069735219';
    }
};

//# sourceMappingURL=1766069735219-set-page-layout-widget-configuration-not-nullable.js.map