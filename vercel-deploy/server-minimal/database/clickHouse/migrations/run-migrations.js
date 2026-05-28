/* oxlint-disable no-console */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _client = require("@clickhouse/client");
const _dotenv = require("dotenv");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _dotenv.config)({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    override: true
});
const clickHouseUrl = ()=>{
    const url = process.env.CLICKHOUSE_URL;
    if (url) return url;
    throw new Error('CLICKHOUSE_URL environment variable is not set. Please set it to the ClickHouse URL.');
};
async function ensureDatabaseExists() {
    const [url, database] = clickHouseUrl().split(/\/(?=[^/]*$)/);
    const client = (0, _client.createClient)({
        url,
        log: {
            level: _client.ClickHouseLogLevel.OFF
        }
    });
    try {
        await client.command({
            query: `CREATE DATABASE IF NOT EXISTS "${database}"`
        });
    } catch  {
    // It may fail due to permissions, but the database already exists
    } finally{
        await client.close();
    }
}
async function ensureMigrationTable(client) {
    await client.command({
        query: `
        CREATE TABLE IF NOT EXISTS _migration (
          filename String,
          applied_at DateTime DEFAULT now()
        ) ENGINE = MergeTree()
      ORDER BY filename;
    `
    });
}
async function hasMigrationBeenRun(filename, client) {
    const resultSet = await client.query({
        query: `SELECT count() as count FROM _migration WHERE filename = {filename:String}`,
        query_params: {
            filename
        },
        format: 'JSON'
    });
    const result = await resultSet.json();
    return result.data[0].count > 0;
}
async function recordMigration(filename, client) {
    await client.insert({
        table: '_migration',
        values: [
            {
                filename
            }
        ],
        format: 'JSONEachRow'
    });
}
async function runMigrations() {
    const dir = _path.default.join(__dirname);
    const files = _fs.default.readdirSync(dir).filter((f)=>f.endsWith('.sql'));
    await ensureDatabaseExists();
    const client = (0, _client.createClient)({
        url: clickHouseUrl(),
        clickhouse_settings: {
            allow_experimental_json_type: 1
        },
        log: {
            level: _client.ClickHouseLogLevel.OFF
        }
    });
    await ensureMigrationTable(client);
    for (const file of files){
        const alreadyRun = await hasMigrationBeenRun(file, client);
        if (alreadyRun) {
            console.log(`✔︎ Skipping already applied migration: ${file}`);
            continue;
        }
        const sql = _fs.default.readFileSync(_path.default.join(dir, file), 'utf8');
        console.log(`⚡ Running ${file}...`);
        // Split by semicolons and filter out empty statements/comments
        const statements = sql.split(';').map((stmt)=>stmt.trim()).filter((stmt)=>stmt.length > 0 && !stmt.startsWith('--') && !stmt.match(/^[\s-]*$/));
        for (const statement of statements){
            // Skip comment-only blocks
            const cleanedStatement = statement.split('\n').filter((line)=>!line.trim().startsWith('--')).join('\n').trim();
            if (cleanedStatement.length > 0) {
                await client.command({
                    query: cleanedStatement
                });
            }
        }
        await recordMigration(file, client);
    }
    console.log('✅ All migrations applied.');
    await client.close();
}
runMigrations().catch((err)=>{
    console.error('Migration error:', err);
    process.exit(1);
});

//# sourceMappingURL=run-migrations.js.map