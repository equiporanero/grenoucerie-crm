"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropObjectMetadataDataSourceFkFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return DropObjectMetadataDataSourceFkFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DropObjectMetadataDataSourceFkFastInstanceCommand = class DropObjectMetadataDataSourceFkFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."objectMetadata" DROP CONSTRAINT "FK_0b19dd17369574578bc18c405b2"');
        await queryRunner.query('DROP INDEX "core"."IDX_OBJECT_METADATA_DATA_SOURCE_ID"');
        await queryRunner.query('ALTER TABLE "core"."objectMetadata" ALTER COLUMN "dataSourceId" DROP NOT NULL');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."objectMetadata" ALTER COLUMN "dataSourceId" SET NOT NULL');
        await queryRunner.query('CREATE INDEX "IDX_OBJECT_METADATA_DATA_SOURCE_ID" ON "core"."objectMetadata" ("dataSourceId")');
        await queryRunner.query('ALTER TABLE "core"."objectMetadata" ADD CONSTRAINT "FK_0b19dd17369574578bc18c405b2" FOREIGN KEY ("dataSourceId") REFERENCES "core"."dataSource"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }
};
DropObjectMetadataDataSourceFkFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.22.0', 1775804361516)
], DropObjectMetadataDataSourceFkFastInstanceCommand);

//# sourceMappingURL=1-22-instance-command-fast-1775804361516-drop-object-metadata-data-source-fk.js.map