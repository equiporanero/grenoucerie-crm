"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropFieldMetadataIsUniqueColumnFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return DropFieldMetadataIsUniqueColumnFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DropFieldMetadataIsUniqueColumnFastInstanceCommand = class DropFieldMetadataIsUniqueColumnFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."fieldMetadata" DROP COLUMN IF EXISTS "isUnique"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."fieldMetadata"
       ADD COLUMN IF NOT EXISTS "isUnique" boolean DEFAULT false`);
    }
};
DropFieldMetadataIsUniqueColumnFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.8.0', 1798300000000)
], DropFieldMetadataIsUniqueColumnFastInstanceCommand);

//# sourceMappingURL=2-8-instance-command-fast-1798300000000-drop-field-metadata-is-unique-column.js.map