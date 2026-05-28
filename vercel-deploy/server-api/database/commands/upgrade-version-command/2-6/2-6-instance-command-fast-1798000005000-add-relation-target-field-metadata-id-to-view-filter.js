"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddRelationTargetFieldMetadataIdToViewFilterFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddRelationTargetFieldMetadataIdToViewFilterFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddRelationTargetFieldMetadataIdToViewFilterFastInstanceCommand = class AddRelationTargetFieldMetadataIdToViewFilterFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" ADD COLUMN IF NOT EXISTS "relationTargetFieldMetadataId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_VIEW_FILTER_RELATION_TARGET_FIELD_METADATA_ID" ON "core"."viewFilter" ("relationTargetFieldMetadataId") WHERE "relationTargetFieldMetadataId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" ADD CONSTRAINT "FK_dbe259395cbd9a54c1c17d12b0b" FOREIGN KEY ("relationTargetFieldMetadataId") REFERENCES "core"."fieldMetadata"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" DROP CONSTRAINT "FK_dbe259395cbd9a54c1c17d12b0b"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_VIEW_FILTER_RELATION_TARGET_FIELD_METADATA_ID"`);
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" DROP COLUMN IF EXISTS "relationTargetFieldMetadataId"`);
    }
};
AddRelationTargetFieldMetadataIdToViewFilterFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.6.0', 1798000005000)
], AddRelationTargetFieldMetadataIdToViewFilterFastInstanceCommand);

//# sourceMappingURL=2-6-instance-command-fast-1798000005000-add-relation-target-field-metadata-id-to-view-filter.js.map