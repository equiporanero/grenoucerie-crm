"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveCanBeAssignedToApplications1766077618558", {
    enumerable: true,
    get: function() {
        return RemoveCanBeAssignedToApplications1766077618558;
    }
});
let RemoveCanBeAssignedToApplications1766077618558 = class RemoveCanBeAssignedToApplications1766077618558 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."role" DROP COLUMN "canBeAssignedToApplications"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."role" ADD "canBeAssignedToApplications" boolean NOT NULL DEFAULT true`);
    }
    constructor(){
        this.name = 'RemoveCanBeAssignedToApplications1766077618558';
    }
};

//# sourceMappingURL=1766077618558-removeCanBeAssignedToApplications.js.map