"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackfillRolePermissionFlagPermissionFlagIdSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return BackfillRolePermissionFlagPermissionFlagIdSlowInstanceCommand;
    }
});
const _application = require("twenty-shared/application");
const _constants = require("twenty-shared/constants");
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
const _standardpermissionflagdefinitionsconstant = require("../../../../engine/metadata-modules/permission-flag/constants/standard-permission-flag-definitions.constant");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const PERMISSION_FLAG_TYPES = Object.values(_constants.PermissionFlagType);
let BackfillRolePermissionFlagPermissionFlagIdSlowInstanceCommand = class BackfillRolePermissionFlagPermissionFlagIdSlowInstanceCommand {
    async runDataMigration(dataSource) {
        const unknownFlagRows = await dataSource.query(`SELECT DISTINCT "flag" FROM "core"."rolePermissionFlag"
       WHERE "flag" <> ALL($1::varchar[])`, [
            PERMISSION_FLAG_TYPES
        ]);
        if (unknownFlagRows.length > 0) {
            const unknownFlags = unknownFlagRows.map((row)=>row.flag).join(', ');
            throw new Error(`Cannot migrate: rolePermissionFlag rows reference unknown flag value(s): ${unknownFlags}`);
        }
        for (const definition of _standardpermissionflagdefinitionsconstant.STANDARD_PERMISSION_FLAG_DEFINITIONS){
            await dataSource.query(`INSERT INTO "core"."permissionFlag" (
          "id",
          "workspaceId",
          "applicationId",
          "universalIdentifier",
          "key",
          "label",
          "description",
          "icon",
          "permissionType",
          "createdAt",
          "updatedAt"
        )
        SELECT
          uuid_generate_v4(),
          workspace."id",
          standardApplication."id",
          $1::uuid,
          $2,
          $3,
          $4,
          $5,
          $6,
          now(),
          now()
        FROM "core"."workspace" workspace
        INNER JOIN "core"."application" standardApplication
          ON standardApplication."workspaceId" = workspace."id"
          AND standardApplication."universalIdentifier" = $7
          AND standardApplication."deletedAt" IS NULL
        ON CONFLICT ("key", "workspaceId") DO NOTHING`, [
                definition.universalIdentifier,
                definition.key,
                definition.label,
                definition.description,
                definition.icon,
                definition.permissionType,
                _application.TWENTY_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER
            ]);
        }
        await dataSource.query(`UPDATE "core"."rolePermissionFlag" rolePermissionFlag
       SET "permissionFlagId" = permissionFlag."id"
       FROM "core"."permissionFlag" permissionFlag
       WHERE permissionFlag."workspaceId" = rolePermissionFlag."workspaceId"
       AND permissionFlag."key" = rolePermissionFlag."flag"
       AND rolePermissionFlag."permissionFlagId" IS NULL`);
    }
    async up(_queryRunner) {}
    async down(_queryRunner) {}
};
BackfillRolePermissionFlagPermissionFlagIdSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.6.0', 1778235340023, {
        type: 'slow'
    })
], BackfillRolePermissionFlagPermissionFlagIdSlowInstanceCommand);

//# sourceMappingURL=2-6-instance-command-slow-1778235340023-backfill-role-permission-flag-permission-flag-id.js.map