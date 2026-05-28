"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RenameHandlerPathToSourceHandlerPath1769091641000", {
    enumerable: true,
    get: function() {
        return RenameHandlerPathToSourceHandlerPath1769091641000;
    }
});
let RenameHandlerPathToSourceHandlerPath1769091641000 = class RenameHandlerPathToSourceHandlerPath1769091641000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" RENAME COLUMN "handlerPath" TO "sourceHandlerPath"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."serverlessFunction" RENAME COLUMN "sourceHandlerPath" TO "handlerPath"`);
    }
    constructor(){
        this.name = 'RenameHandlerPathToSourceHandlerPath1769091641000';
    }
};

//# sourceMappingURL=1769091641000-renameHandlerPathToSourceHandlerPath.js.map