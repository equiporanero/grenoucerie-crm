"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddRelationTargetFieldMetadataIdToViewFilterEarly2_4FastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddRelationTargetFieldMetadataIdToViewFilterEarly2_4FastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddRelationTargetFieldMetadataIdToViewFilterEarly2_4FastInstanceCommand = class AddRelationTargetFieldMetadataIdToViewFilterEarly2_4FastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" ADD COLUMN IF NOT EXISTS "relationTargetFieldMetadataId" uuid`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" DROP COLUMN IF EXISTS "relationTargetFieldMetadataId"`);
    }
};
AddRelationTargetFieldMetadataIdToViewFilterEarly2_4FastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.4.0', 1747234400000)
], AddRelationTargetFieldMetadataIdToViewFilterEarly2_4FastInstanceCommand);

//# sourceMappingURL=2-4-instance-command-fast-1747234400000-add-relation-target-field-metadata-id-to-view-filter.js.map