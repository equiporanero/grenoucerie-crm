"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seedApiKeys", {
    enumerable: true,
    get: function() {
        return seedApiKeys;
    }
});
const _apikeydataseedsconstant = require("../../data/constants/api-key-data-seeds.constant");
const tableName = 'apiKey';
const seedApiKeys = async ({ queryRunner, schemaName, workspaceId })=>{
    await queryRunner.manager.createQueryBuilder().insert().into(`${schemaName}.${tableName}`, [
        'id',
        'name',
        'expiresAt',
        'workspaceId'
    ]).orIgnore().values([
        {
            id: _apikeydataseedsconstant.API_KEY_DATA_SEED_IDS.ID_1,
            name: 'My api key',
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 100).toISOString(),
            workspaceId: workspaceId
        }
    ]).execute();
};

//# sourceMappingURL=seed-api-keys.util.js.map