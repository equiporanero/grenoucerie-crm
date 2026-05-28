"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddApplicationIdToObjectMetadata1758720905726", {
    enumerable: true,
    get: function() {
        return AddApplicationIdToObjectMetadata1758720905726;
    }
});
let AddApplicationIdToObjectMetadata1758720905726 = class AddApplicationIdToObjectMetadata1758720905726 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."objectMetadata" ADD "applicationId" uuid`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."objectMetadata" DROP COLUMN "applicationId"`);
    }
    constructor(){
        this.name = 'AddApplicationIdToObjectMetadata1758720905726';
    }
};

//# sourceMappingURL=1758720905726-addApplicationIdToObjectMetadata.js.map