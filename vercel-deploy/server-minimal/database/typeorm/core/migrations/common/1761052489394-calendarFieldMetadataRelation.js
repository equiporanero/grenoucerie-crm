"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarFieldMetadataRelation1761052489394", {
    enumerable: true,
    get: function() {
        return CalendarFieldMetadataRelation1761052489394;
    }
});
let CalendarFieldMetadataRelation1761052489394 = class CalendarFieldMetadataRelation1761052489394 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."view" ADD CONSTRAINT "FK_5c0d21d6b8d5544a24ab9787114" FOREIGN KEY ("calendarFieldMetadataId") REFERENCES "core"."fieldMetadata"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."view" DROP CONSTRAINT "FK_5c0d21d6b8d5544a24ab9787114"`);
    }
    constructor(){
        this.name = 'CalendarFieldMetadataRelation1761052489394';
    }
};

//# sourceMappingURL=1761052489394-calendarFieldMetadataRelation.js.map