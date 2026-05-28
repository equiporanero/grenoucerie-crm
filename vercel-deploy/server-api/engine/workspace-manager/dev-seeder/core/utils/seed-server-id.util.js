"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seedServerId", {
    enumerable: true,
    get: function() {
        return seedServerId;
    }
});
const _uuid = require("uuid");
const seedServerId = async ({ queryRunner, schemaName })=>{
    await queryRunner.manager.createQueryBuilder().insert().into(`${schemaName}.keyValuePair`, [
        'key',
        'value',
        'type'
    ]).orIgnore().values([
        {
            key: 'SERVER_ID',
            type: 'CONFIG_VARIABLE',
            value: (0, _uuid.v4)()
        }
    ]).execute();
};

//# sourceMappingURL=seed-server-id.util.js.map