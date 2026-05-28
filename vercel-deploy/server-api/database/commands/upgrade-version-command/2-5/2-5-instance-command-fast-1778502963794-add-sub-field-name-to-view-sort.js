"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddSubFieldNameToViewSortFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddSubFieldNameToViewSortFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddSubFieldNameToViewSortFastInstanceCommand = class AddSubFieldNameToViewSortFastInstanceCommand {
    // Idempotent so it can coexist with the early 2.3 instance command
    // `1747234200000-add-sub-field-name-to-view-sort` (see that file for context).
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewSort" ADD COLUMN IF NOT EXISTS "subFieldName" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewSort" DROP COLUMN IF EXISTS "subFieldName"`);
    }
};
AddSubFieldNameToViewSortFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.5.0', 1778502963794)
], AddSubFieldNameToViewSortFastInstanceCommand);

//# sourceMappingURL=2-5-instance-command-fast-1778502963794-add-sub-field-name-to-view-sort.js.map