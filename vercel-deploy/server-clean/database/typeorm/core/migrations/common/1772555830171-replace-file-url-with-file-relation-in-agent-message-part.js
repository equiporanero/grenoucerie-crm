"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReplaceFileUrlWithFileRelationInAgentMessagePart1772555830171", {
    enumerable: true,
    get: function() {
        return ReplaceFileUrlWithFileRelationInAgentMessagePart1772555830171;
    }
});
let ReplaceFileUrlWithFileRelationInAgentMessagePart1772555830171 = class ReplaceFileUrlWithFileRelationInAgentMessagePart1772555830171 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentMessagePart" DROP COLUMN "fileUrl"`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessagePart" DROP COLUMN "fileMediaType"`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessagePart" ADD "fileId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessagePart" ADD CONSTRAINT "FK_f3865544cee5742b5f5dd7340ef" FOREIGN KEY ("fileId") REFERENCES "core"."file"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentMessagePart" DROP CONSTRAINT "FK_f3865544cee5742b5f5dd7340ef"`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessagePart" DROP COLUMN "fileId"`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessagePart" ADD "fileMediaType" character varying`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessagePart" ADD "fileUrl" character varying`);
    }
    constructor(){
        this.name = 'ReplaceFileUrlWithFileRelationInAgentMessagePart1772555830171';
    }
};

//# sourceMappingURL=1772555830171-replace-file-url-with-file-relation-in-agent-message-part.js.map