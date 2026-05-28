"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddWorkspaceForeignKeyToSearchFieldMetadata1757809958470", {
    enumerable: true,
    get: function() {
        return AddWorkspaceForeignKeyToSearchFieldMetadata1757809958470;
    }
});
let AddWorkspaceForeignKeyToSearchFieldMetadata1757809958470 = class AddWorkspaceForeignKeyToSearchFieldMetadata1757809958470 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."searchFieldMetadata" ADD CONSTRAINT "FK_5f10e00da471e19f52513f47d8b" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."searchFieldMetadata" DROP CONSTRAINT "FK_5f10e00da471e19f52513f47d8b"`);
    }
    constructor(){
        this.name = 'AddWorkspaceForeignKeyToSearchFieldMetadata1757809958470';
    }
};

//# sourceMappingURL=1757809958470-addWorkspaceForeignKeyToSearchFieldMetadata.js.map