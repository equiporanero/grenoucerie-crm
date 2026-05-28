"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddBuiltHandlerPathToServerlessFunctions1769016869438", {
    enumerable: true,
    get: function() {
        return AddBuiltHandlerPathToServerlessFunctions1769016869438;
    }
});
let AddBuiltHandlerPathToServerlessFunctions1769016869438 = class AddBuiltHandlerPathToServerlessFunctions1769016869438 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "builtHandlerPath" character varying NOT NULL DEFAULT 'index.mjs'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "builtHandlerPath"`);
    }
    constructor(){
        this.name = 'AddBuiltHandlerPathToServerlessFunctions1769016869438';
    }
};

//# sourceMappingURL=1769016869438-addBuiltHandlerPathToServerlessFunctions.js.map