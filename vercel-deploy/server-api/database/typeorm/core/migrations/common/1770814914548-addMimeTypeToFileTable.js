"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddMimeTypeToFileTable1770814914548", {
    enumerable: true,
    get: function() {
        return AddMimeTypeToFileTable1770814914548;
    }
});
let AddMimeTypeToFileTable1770814914548 = class AddMimeTypeToFileTable1770814914548 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."file" ADD "mimeType" character varying NOT NULL DEFAULT 'application/octet-stream'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."file" DROP COLUMN "mimeType"`);
    }
    constructor(){
        this.name = 'AddMimeTypeToFileTable1770814914548';
    }
};

//# sourceMappingURL=1770814914548-addMimeTypeToFileTable.js.map