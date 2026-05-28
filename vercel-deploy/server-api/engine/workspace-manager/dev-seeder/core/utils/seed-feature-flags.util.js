"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get deleteFeatureFlags () {
        return deleteFeatureFlags;
    },
    get seedFeatureFlags () {
        return seedFeatureFlags;
    }
});
const _types = require("twenty-shared/types");
const tableName = 'featureFlag';
const seedFeatureFlags = async ({ queryRunner, schemaName, workspaceId })=>{
    await queryRunner.manager.createQueryBuilder().insert().into(`${schemaName}.${tableName}`, [
        'key',
        'workspaceId',
        'value'
    ]).orIgnore().values([
        {
            key: _types.FeatureFlagKey.IS_UNIQUE_INDEXES_ENABLED,
            workspaceId: workspaceId,
            value: false
        },
        {
            key: _types.FeatureFlagKey.IS_PUBLIC_DOMAIN_ENABLED,
            workspaceId: workspaceId,
            value: true
        },
        {
            key: _types.FeatureFlagKey.IS_EMAIL_GROUP_ENABLED,
            workspaceId: workspaceId,
            value: true
        },
        {
            key: _types.FeatureFlagKey.IS_JUNCTION_RELATIONS_ENABLED,
            workspaceId: workspaceId,
            value: true
        },
        {
            key: _types.FeatureFlagKey.IS_MARKETPLACE_SETTING_TAB_VISIBLE,
            workspaceId: workspaceId,
            value: true
        }
    ]).execute();
};
const deleteFeatureFlags = async ({ queryRunner, schemaName, workspaceId })=>{
    await queryRunner.manager.createQueryBuilder().delete().from(`${schemaName}.${tableName}`).where(`"${tableName}"."workspaceId" = :workspaceId`, {
        workspaceId
    }).execute();
};

//# sourceMappingURL=seed-feature-flags.util.js.map