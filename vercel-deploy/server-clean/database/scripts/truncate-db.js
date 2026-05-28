"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _rawdatasource = require("../typeorm/raw/raw.datasource");
const _setupdbutils = require("./setup-db-utils");
async function dropSchemasSequentially() {
    try {
        await _rawdatasource.rawDataSource.initialize();
        // Fetch all schemas excluding the ones we want to keep
        const schemas = await (0, _setupdbutils.performQuery)(`
      SELECT n.nspname AS "schema_name"
      FROM pg_catalog.pg_namespace n
      WHERE n.nspname !~ '^pg_'
        AND n.nspname <> 'information_schema'
        AND n.nspname NOT IN ('metric_helpers', 'user_management', 'public')
    `, 'Fetching schemas...') ?? [];
        const batchSize = 10;
        for(let i = 0; i < schemas.length; i += batchSize){
            const batch = schemas.slice(i, i + batchSize);
            await Promise.all(batch.map((schema)=>(0, _setupdbutils.performQuery)(`DROP SCHEMA IF EXISTS "${schema.schema_name}" CASCADE;`, `Dropping schema ${schema.schema_name}...`)));
        }
        // oxlint-disable-next-line no-console
        console.log('All schemas dropped successfully.');
    } catch (err) {
        // oxlint-disable-next-line no-console
        console.error('Error during schema dropping:', err);
    }
}
void dropSchemasSequentially();

//# sourceMappingURL=truncate-db.js.map