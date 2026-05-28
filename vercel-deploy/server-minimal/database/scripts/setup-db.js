"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _rawdatasource = require("../typeorm/raw/raw.datasource");
const _setupdbutils = require("./setup-db-utils");
_rawdatasource.rawDataSource.initialize().then(async ()=>{
    await (0, _setupdbutils.performQuery)('CREATE SCHEMA IF NOT EXISTS "public"', 'create schema "public"');
    await (0, _setupdbutils.performQuery)('CREATE SCHEMA IF NOT EXISTS "core"', 'create schema "core"');
    await (0, _setupdbutils.performQuery)('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"', 'create extension "uuid-ossp"');
    await (0, _setupdbutils.performQuery)('CREATE EXTENSION IF NOT EXISTS "unaccent"', 'create extension "unaccent"');
    await (0, _setupdbutils.performQuery)(`CREATE OR REPLACE FUNCTION public.unaccent_immutable(input text)
    RETURNS text
    LANGUAGE sql
    IMMUTABLE
AS $$
SELECT public.unaccent('public.unaccent'::regdictionary, input)
$$;`, 'create immutable unaccent wrapper function');
    // We paused the work on FDW
    if (process.env.IS_FDW_ENABLED !== 'true') {
        return;
    }
    await (0, _setupdbutils.performQuery)('CREATE EXTENSION IF NOT EXISTS "postgres_fdw"', 'create extension "postgres_fdw"');
    await (0, _setupdbutils.performQuery)('CREATE EXTENSION IF NOT EXISTS "wrappers"', 'create extension "wrappers"');
    await (0, _setupdbutils.performQuery)('CREATE EXTENSION IF NOT EXISTS "mysql_fdw"', 'create extension "mysql_fdw"');
    const supabaseWrappers = [
        'airtable',
        'bigQuery',
        'clickHouse',
        'firebase',
        'logflare',
        's3',
        'stripe'
    ]; // See https://supabase.github.io/wrappers/
    for (const wrapper of supabaseWrappers){
        if (await checkForeignDataWrapperExists(`${wrapper.toLowerCase()}_fdw`)) {
            continue;
        }
        await (0, _setupdbutils.performQuery)(`
          CREATE FOREIGN DATA WRAPPER "${wrapper.toLowerCase()}_fdw"
          HANDLER "${(0, _setupdbutils.camelToSnakeCase)(wrapper)}_fdw_handler"
          VALIDATOR "${(0, _setupdbutils.camelToSnakeCase)(wrapper)}_fdw_validator";
          `, `create ${wrapper} "wrappers"`, true, true);
    }
}).catch((err)=>{
    // oxlint-disable-next-line no-console
    console.error('Error during Data Source initialization:', err);
});
async function checkForeignDataWrapperExists(wrapperName) {
    const result = await _rawdatasource.rawDataSource.query(`SELECT 1 FROM pg_foreign_data_wrapper WHERE fdwname = $1`, [
        wrapperName
    ]);
    return result.length > 0;
}

//# sourceMappingURL=setup-db.js.map