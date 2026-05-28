"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddRelationTargetFieldMetadataIdToViewFilterEarlyFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddRelationTargetFieldMetadataIdToViewFilterEarlyFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddRelationTargetFieldMetadataIdToViewFilterEarlyFastInstanceCommand = class AddRelationTargetFieldMetadataIdToViewFilterEarlyFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" ADD COLUMN IF NOT EXISTS "relationTargetFieldMetadataId" uuid`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" DROP COLUMN IF EXISTS "relationTargetFieldMetadataId"`);
    }
};
AddRelationTargetFieldMetadataIdToViewFilterEarlyFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.3.0', 1747234300000)
], AddRelationTargetFieldMetadataIdToViewFilterEarlyFastInstanceCommand);

//# sourceMappingURL=2-3-instance-command-fast-1747234300000-add-relation-target-field-metadata-id-to-view-filter.js.map