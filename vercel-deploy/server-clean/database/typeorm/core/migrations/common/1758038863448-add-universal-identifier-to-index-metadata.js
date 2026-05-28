"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUniversalIdentifierToIndexMetadata1758038863448", {
    enumerable: true,
    get: function() {
        return AddUniversalIdentifierToIndexMetadata1758038863448;
    }
});
let AddUniversalIdentifierToIndexMetadata1758038863448 = class AddUniversalIdentifierToIndexMetadata1758038863448 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" ADD "universalIdentifier" uuid`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b27c681286ac581f81498c5d4b" ON "core"."indexMetadata" ("workspaceId", "universalIdentifier") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "core"."IDX_b27c681286ac581f81498c5d4b"`);
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" DROP COLUMN "universalIdentifier"`);
    }
    constructor(){
        this.name = 'AddUniversalIdentifierToIndexMetadata1758038863448';
    }
};

//# sourceMappingURL=1758038863448-add-universal-identifier-to-index-metadata.js.map