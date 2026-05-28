"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "KanbanFieldMetadataIdentifierView1760965667836", {
    enumerable: true,
    get: function() {
        return KanbanFieldMetadataIdentifierView1760965667836;
    }
});
let KanbanFieldMetadataIdentifierView1760965667836 = class KanbanFieldMetadataIdentifierView1760965667836 {
    async up(queryRunner) {
        // Swallowing any exceptions here
        // 1-10-clean-orphaned-kanban-aggregate-operation-field-metadata-id.command.ts upgrade command handles fallback for existing workspaces
        try {
            await queryRunner.query(`ALTER TABLE "core"."view" ADD CONSTRAINT "FK_b3cc95732479f7a1337350c398f" FOREIGN KEY ("kanbanAggregateOperationFieldMetadataId") REFERENCES "core"."fieldMetadata"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        } catch (error) {
            // oxlint-disable-next-line no-console
            console.error(`Swallowing KanbanFieldMetadataIdentifierView1760965667836 error: ${error.message}. Upgrade:1-10:clean-orphaned-kanban-aggregate-operation-field-metadata-id upgrade command will handle fallback`);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."view" DROP CONSTRAINT "FK_b3cc95732479f7a1337350c398f"`);
    }
    constructor(){
        this.name = 'KanbanFieldMetadataIdentifierView1760965667836';
    }
};

//# sourceMappingURL=1760965667836-kanbanFieldMetadataIdentifierView.js.map