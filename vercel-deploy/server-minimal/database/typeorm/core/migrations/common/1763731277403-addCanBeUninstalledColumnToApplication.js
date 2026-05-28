"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddCanBeUninstalledColumnToApplication1763731277403", {
    enumerable: true,
    get: function() {
        return AddCanBeUninstalledColumnToApplication1763731277403;
    }
});
let AddCanBeUninstalledColumnToApplication1763731277403 = class AddCanBeUninstalledColumnToApplication1763731277403 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" ADD "canBeUninstalled" boolean NOT NULL DEFAULT true`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" DROP COLUMN "canBeUninstalled"`);
    }
    constructor(){
        this.name = 'AddCanBeUninstalledColumnToApplication1763731277403';
    }
};

//# sourceMappingURL=1763731277403-addCanBeUninstalledColumnToApplication.js.map