"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddFileSettingsColumnOnFileTable1769434782880", {
    enumerable: true,
    get: function() {
        return AddFileSettingsColumnOnFileTable1769434782880;
    }
});
let AddFileSettingsColumnOnFileTable1769434782880 = class AddFileSettingsColumnOnFileTable1769434782880 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."file" ADD "settings" jsonb`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."file" DROP COLUMN "settings"`);
    }
    constructor(){
        this.name = 'AddFileSettingsColumnOnFileTable1769434782880';
    }
};

//# sourceMappingURL=1769434782880-add-file-settings-column-on-file-table.js.map