"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddViewFieldGroupIdIndexOnViewFieldFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddViewFieldGroupIdIndexOnViewFieldFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddViewFieldGroupIdIndexOnViewFieldFastInstanceCommand = class AddViewFieldGroupIdIndexOnViewFieldFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_VIEW_FIELD_VIEW_FIELD_GROUP_ID" ON "core"."viewField" ("viewFieldGroupId")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS "core"."IDX_VIEW_FIELD_VIEW_FIELD_GROUP_ID"`);
    }
};
AddViewFieldGroupIdIndexOnViewFieldFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.21.0', 1775129420309)
], AddViewFieldGroupIdIndexOnViewFieldFastInstanceCommand);

//# sourceMappingURL=1-21-instance-command-fast-1775129420309-add-view-field-group-id-index-on-view-field.js.map