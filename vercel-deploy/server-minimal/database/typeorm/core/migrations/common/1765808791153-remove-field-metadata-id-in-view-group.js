"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveFieldMetadataIdInViewGroup1765808791153", {
    enumerable: true,
    get: function() {
        return RemoveFieldMetadataIdInViewGroup1765808791153;
    }
});
let RemoveFieldMetadataIdInViewGroup1765808791153 = class RemoveFieldMetadataIdInViewGroup1765808791153 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewGroup" DROP CONSTRAINT "FK_b3aa7ec58cdd9e83729f2232591"`);
        await queryRunner.query(`ALTER TABLE "core"."viewGroup" DROP COLUMN "fieldMetadataId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewGroup" ADD "fieldMetadataId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."viewGroup" ADD CONSTRAINT "FK_b3aa7ec58cdd9e83729f2232591" FOREIGN KEY ("fieldMetadataId") REFERENCES "core"."fieldMetadata"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'RemoveFieldMetadataIdInViewGroup1765808791153';
    }
};

//# sourceMappingURL=1765808791153-remove-field-metadata-id-in-view-group.js.map