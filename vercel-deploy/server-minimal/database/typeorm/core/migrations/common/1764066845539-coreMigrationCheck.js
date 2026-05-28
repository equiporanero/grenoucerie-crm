"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CoreMigrationCheck1764066845539", {
    enumerable: true,
    get: function() {
        return CoreMigrationCheck1764066845539;
    }
});
let CoreMigrationCheck1764066845539 = class CoreMigrationCheck1764066845539 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "modelId" SET DEFAULT 'default-smart-model'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "modelId" SET DEFAULT 'auto'`);
    }
    constructor(){
        this.name = 'CoreMigrationCheck1764066845539';
    }
};

//# sourceMappingURL=1764066845539-coreMigrationCheck.js.map