"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveObjectMetadataStandardId1770040351718", {
    enumerable: true,
    get: function() {
        return RemoveObjectMetadataStandardId1770040351718;
    }
});
let RemoveObjectMetadataStandardId1770040351718 = class RemoveObjectMetadataStandardId1770040351718 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."objectMetadata" DROP COLUMN "standardId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."objectMetadata" ADD "standardId" uuid`);
    }
    constructor(){
        this.name = 'RemoveObjectMetadataStandardId1770040351718';
    }
};

//# sourceMappingURL=1770040351718-remove-object-metadata-standard-id.js.map