"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RenameRouteToRouteTrigger1759418198310", {
    enumerable: true,
    get: function() {
        return RenameRouteToRouteTrigger1759418198310;
    }
});
let RenameRouteToRouteTrigger1759418198310 = class RenameRouteToRouteTrigger1759418198310 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."route" RENAME TO "routeTrigger"`);
        await queryRunner.query(`ALTER TYPE "core"."route_httpmethod_enum" RENAME TO "routeTrigger_httpmethod_enum"`);
        await queryRunner.query(`ALTER INDEX "core"."IDX_1c39502392dd9cbb186deba158" RENAME TO "IDX_e9c53b9ac5035d3202a8737020"`);
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" DROP CONSTRAINT "FK_c63b1110bbf09051be2f495d0be"`);
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" DROP CONSTRAINT "IDX_ROUTE_PATH_HTTP_METHOD_WORKSPACE_ID_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" ADD CONSTRAINT "IDX_ROUTE_TRIGGER_PATH_HTTP_METHOD_WORKSPACE_ID_UNIQUE" UNIQUE ("path", "httpMethod", "workspaceId")`);
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" ADD CONSTRAINT "FK_c89ed9d929873119478fc0d9cc5" FOREIGN KEY ("serverlessFunctionId") REFERENCES "core"."serverlessFunction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" DROP CONSTRAINT "FK_c89ed9d929873119478fc0d9cc5"`);
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" DROP CONSTRAINT "IDX_ROUTE_TRIGGER_PATH_HTTP_METHOD_WORKSPACE_ID_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" ADD CONSTRAINT "IDX_ROUTE_PATH_HTTP_METHOD_WORKSPACE_ID_UNIQUE" UNIQUE ("path", "httpMethod", "workspaceId")`);
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" ADD CONSTRAINT "FK_c63b1110bbf09051be2f495d0be" FOREIGN KEY ("serverlessFunctionId") REFERENCES "core"."serverlessFunction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER INDEX "core"."IDX_e9c53b9ac5035d3202a8737020" RENAME TO "IDX_1c39502392dd9cbb186deba158"`);
        await queryRunner.query(`ALTER TYPE "core"."routeTrigger_httpmethod_enum" RENAME TO "route_httpmethod_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."routeTrigger" RENAME TO "route"`);
    }
    constructor(){
        this.name = 'RenameRouteToRouteTrigger1759418198310';
    }
};

//# sourceMappingURL=1759418198310-renameRouteToRouteTrigger.js.map