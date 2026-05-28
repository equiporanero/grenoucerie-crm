"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RenameApplicationColumn1759433496458", {
    enumerable: true,
    get: function() {
        return RenameApplicationColumn1759433496458;
    }
});
let RenameApplicationColumn1759433496458 = class RenameApplicationColumn1759433496458 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" RENAME COLUMN "label" TO "name"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" RENAME COLUMN "name" TO "label"`);
    }
    constructor(){
        this.name = 'RenameApplicationColumn1759433496458';
    }
};

//# sourceMappingURL=1759433496458-renameApplicationColumn.js.map