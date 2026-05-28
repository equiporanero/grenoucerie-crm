"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddHandlerToServerlessFunction1761210191095", {
    enumerable: true,
    get: function() {
        return AddHandlerToServerlessFunction1761210191095;
    }
});
let AddHandlerToServerlessFunction1761210191095 = class AddHandlerToServerlessFunction1761210191095 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "handlerPath" character varying NOT NULL DEFAULT 'src/index.ts'`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" ADD "handlerName" character varying NOT NULL DEFAULT 'main'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "handlerName"`);
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" DROP COLUMN "handlerPath"`);
    }
    constructor(){
        this.name = 'AddHandlerToServerlessFunction1761210191095';
    }
};

//# sourceMappingURL=1761210191095-addHandlerToServerlessFunction.js.map