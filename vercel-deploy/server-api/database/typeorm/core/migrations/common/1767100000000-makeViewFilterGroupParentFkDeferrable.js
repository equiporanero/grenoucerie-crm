"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeViewFilterGroupParentFkDeferrable1767100000000", {
    enumerable: true,
    get: function() {
        return MakeViewFilterGroupParentFkDeferrable1767100000000;
    }
});
let MakeViewFilterGroupParentFkDeferrable1767100000000 = class MakeViewFilterGroupParentFkDeferrable1767100000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFilterGroup" DROP CONSTRAINT IF EXISTS "FK_6aa17342705ae5526de377bf7ed"`);
        // Recreate parentViewFilterGroupId FK as DEFERRABLE INITIALLY DEFERRED
        // Needed because parent/child viewFilterGroups may be inserted in any order
        await queryRunner.query(`ALTER TABLE "core"."viewFilterGroup" ADD CONSTRAINT "FK_6aa17342705ae5526de377bf7ed" FOREIGN KEY ("parentViewFilterGroupId") REFERENCES "core"."viewFilterGroup"("id") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFilterGroup" DROP CONSTRAINT IF EXISTS "FK_6aa17342705ae5526de377bf7ed"`);
        await queryRunner.query(`ALTER TABLE "core"."viewFilterGroup" ADD CONSTRAINT "FK_6aa17342705ae5526de377bf7ed" FOREIGN KEY ("parentViewFilterGroupId") REFERENCES "core"."viewFilterGroup"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'MakeViewFilterGroupParentFkDeferrable1767100000000';
    }
};

//# sourceMappingURL=1767100000000-makeViewFilterGroupParentFkDeferrable.js.map