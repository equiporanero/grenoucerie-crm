"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddMainGroupByFieldMetadataId1764680275312", {
    enumerable: true,
    get: function() {
        return AddMainGroupByFieldMetadataId1764680275312;
    }
});
let AddMainGroupByFieldMetadataId1764680275312 = class AddMainGroupByFieldMetadataId1764680275312 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."view" ADD "mainGroupByFieldMetadataId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."view" ADD CONSTRAINT "FK_d1fa625016e36ec6f79fb13e824" FOREIGN KEY ("mainGroupByFieldMetadataId") REFERENCES "core"."fieldMetadata"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."view" DROP CONSTRAINT "FK_d1fa625016e36ec6f79fb13e824"`);
        await queryRunner.query(`ALTER TABLE "core"."view" DROP COLUMN "mainGroupByFieldMetadataId"`);
    }
    constructor(){
        this.name = 'AddMainGroupByFieldMetadataId1764680275312';
    }
};

//# sourceMappingURL=1764680275312-addMainGroupByFieldMetadataId.js.map