"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UniqueFieldMetadataNameForWorkspaceObjectMetadata1756976545860", {
    enumerable: true,
    get: function() {
        return UniqueFieldMetadataNameForWorkspaceObjectMetadata1756976545860;
    }
});
let UniqueFieldMetadataNameForWorkspaceObjectMetadata1756976545860 = class UniqueFieldMetadataNameForWorkspaceObjectMetadata1756976545860 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."fieldMetadata" ADD CONSTRAINT "IDX_FIELD_METADATA_NAME_OBJECT_METADATA_ID_WORKSPACE_ID_UNIQUE" UNIQUE ("name", "objectMetadataId", "workspaceId")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."fieldMetadata" DROP CONSTRAINT "IDX_FIELD_METADATA_NAME_OBJECT_METADATA_ID_WORKSPACE_ID_UNIQUE"`);
    }
    constructor(){
        this.name = 'UniqueFieldMetadataNameForWorkspaceObjectMetadata1756976545860';
    }
};

//# sourceMappingURL=1756976545860-unique-field-metadata-name-for-workspace-object-metadata.js.map