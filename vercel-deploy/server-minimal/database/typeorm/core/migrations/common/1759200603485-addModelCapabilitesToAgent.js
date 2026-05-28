"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddNativeCapabilitesToAgent1759200603485", {
    enumerable: true,
    get: function() {
        return AddNativeCapabilitesToAgent1759200603485;
    }
});
let AddNativeCapabilitesToAgent1759200603485 = class AddNativeCapabilitesToAgent1759200603485 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agent" ADD "modelConfiguration" jsonb`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agent" DROP COLUMN "modelConfiguration"`);
    }
    constructor(){
        this.name = 'AddNativeCapabilitesToAgent1759200603485';
    }
};

//# sourceMappingURL=1759200603485-addModelCapabilitesToAgent.js.map