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
    get connectionSource () {
        return connectionSource;
    },
    get typeORMCoreModuleOptions () {
        return typeORMCoreModuleOptions;
    }
});
const _dotenv = require("dotenv");
const _typeorm = require("typeorm");
(0, _dotenv.config)({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    override: true
});
const isRunningCommand = ()=>{
    const scriptPath = process.argv[1] || '';
    return scriptPath.includes('/command/command.');
};
const getLoggingConfig = ()=>{
    if (process.env.NODE_ENV === 'test') {
        return [];
    }
    const ormQueryLogging = process.env.ORM_QUERY_LOGGING || 'disabled';
    switch(ormQueryLogging){
        case 'disabled':
            return [
                'error'
            ];
        case 'server-only':
            if (isRunningCommand()) {
                return [
                    'error'
                ];
            }
            return [
                'query',
                'error'
            ];
        case 'always':
            return [
                'query',
                'error'
            ];
        default:
            return [
                'error'
            ];
    }
};
const isJest = process.argv.some((arg)=>arg.includes('jest'));
const typeORMCoreModuleOptions = {
    url: process.env.PG_DATABASE_URL,
    type: 'postgres',
    logging: getLoggingConfig(),
    schema: 'core',
    entities: process.env.IS_BILLING_ENABLED === 'true' ? [
        `${isJest ? 'src/' : 'dist/'}engine/core-modules/**/*.entity{.ts,.js}`,
        `${isJest ? 'src/' : 'dist/'}engine/metadata-modules/**/*.entity{.ts,.js}`
    ] : [
        `${isJest ? 'src/' : 'dist/'}engine/core-modules/**/!(billing-*).entity.{ts,js}`,
        `${isJest ? 'src/' : 'dist/'}engine/metadata-modules/**/*.entity{.ts,.js}`
    ],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: '_typeorm_migrations',
    metadataTableName: '_typeorm_generated_columns_and_materialized_views',
    migrations: process.env.IS_BILLING_ENABLED === 'true' ? [
        `${isJest ? 'src/' : 'dist/'}database/typeorm/core/migrations/common/*{.ts,.js}`,
        `${isJest ? 'src/' : 'dist/'}database/typeorm/core/migrations/billing/*{.ts,.js}`
    ] : [
        `${isJest ? 'src/' : 'dist/'}database/typeorm/core/migrations/common/*{.ts,.js}`
    ],
    ssl: process.env.PG_SSL_ALLOW_SELF_SIGNED === 'true' ? {
        rejectUnauthorized: false
    } : undefined,
    extra: {
        query_timeout: Number(process.env.PG_DATABASE_PRIMARY_TIMEOUT_MS ?? 10000),
        idleTimeoutMillis: Number(process.env.PG_POOL_IDLE_TIMEOUT_MS ?? 600000),
        allowExitOnIdle: process.env.PG_POOL_ALLOW_EXIT_ON_IDLE === 'true'
    }
};
const connectionSource = new _typeorm.DataSource(typeORMCoreModuleOptions);

//# sourceMappingURL=core.datasource.js.map