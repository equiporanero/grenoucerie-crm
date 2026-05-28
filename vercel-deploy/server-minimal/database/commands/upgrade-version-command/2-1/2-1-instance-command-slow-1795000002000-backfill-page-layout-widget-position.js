"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackfillPageLayoutWidgetPositionSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return BackfillPageLayoutWidgetPositionSlowInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let BackfillPageLayoutWidgetPositionSlowInstanceCommand = class BackfillPageLayoutWidgetPositionSlowInstanceCommand {
    async runDataMigration(dataSource) {
        await dataSource.query(`UPDATE "core"."pageLayoutWidget"
          SET "position" = jsonb_build_object(
            'layoutMode',  'GRID',
            'row',         "gridPosition"->'row',
            'column',      "gridPosition"->'column',
            'rowSpan',     "gridPosition"->'rowSpan',
            'columnSpan',  "gridPosition"->'columnSpan'
          )
        WHERE "position" IS NULL
          AND "gridPosition" IS NOT NULL`);
    }
    async up(_queryRunner) {
        return;
    }
    async down(_queryRunner) {
        return;
    }
};
BackfillPageLayoutWidgetPositionSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.1.0', 1795000002000, {
        type: 'slow'
    })
], BackfillPageLayoutWidgetPositionSlowInstanceCommand);

//# sourceMappingURL=2-1-instance-command-slow-1795000002000-backfill-page-layout-widget-position.js.map