"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveMessageIdFromFileTable1759378531410", {
    enumerable: true,
    get: function() {
        return RemoveMessageIdFromFileTable1759378531410;
    }
});
let RemoveMessageIdFromFileTable1759378531410 = class RemoveMessageIdFromFileTable1759378531410 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."file" DROP CONSTRAINT "FK_a78a68c3f577a485dd4c741909f"`);
        await queryRunner.query(`ALTER TABLE "core"."file" DROP COLUMN "messageId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."file" ADD "messageId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."file" ADD CONSTRAINT "FK_a78a68c3f577a485dd4c741909f" FOREIGN KEY ("messageId") REFERENCES "core"."agentChatMessage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'RemoveMessageIdFromFileTable1759378531410';
    }
};

//# sourceMappingURL=1759378531410-removeMessageIdFromFileTable.js.map