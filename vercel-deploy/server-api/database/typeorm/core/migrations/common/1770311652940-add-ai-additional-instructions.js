"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddAiAdditionalInstructions1770311652940", {
    enumerable: true,
    get: function() {
        return AddAiAdditionalInstructions1770311652940;
    }
});
let AddAiAdditionalInstructions1770311652940 = class AddAiAdditionalInstructions1770311652940 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "aiAdditionalInstructions" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "aiAdditionalInstructions"`);
    }
    constructor(){
        this.name = 'AddAiAdditionalInstructions1770311652940';
    }
};

//# sourceMappingURL=1770311652940-add-ai-additional-instructions.js.map