/* oxlint-disable no-console */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _client = require("@clickhouse/client");
const _dotenv = require("dotenv");
const _fixtures = require("./fixtures");
(0, _dotenv.config)({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    override: true
});
const client = (0, _client.createClient)({
    url: process.env.CLICKHOUSE_URL,
    log: {
        level: _client.ClickHouseLogLevel.OFF
    }
});
async function seedEvents() {
    try {
        console.log(`⚡ Seeding ${_fixtures.workspaceEventFixtures.length} workspace events...`);
        await client.insert({
            table: 'workspaceEvent',
            values: _fixtures.workspaceEventFixtures,
            format: 'JSONEachRow'
        });
        console.log(`⚡ Seeding ${_fixtures.objectEventFixtures.length} object events...`);
        await client.insert({
            table: 'objectEvent',
            values: _fixtures.objectEventFixtures,
            format: 'JSONEachRow'
        });
        console.log(`⚡ Seeding ${_fixtures.usageEventFixtures.length} usage events...`);
        await client.insert({
            table: 'usageEvent',
            values: _fixtures.usageEventFixtures,
            format: 'JSONEachRow'
        });
        console.log('✅ All events seeded successfully');
    } catch (error) {
        console.error('Error seeding events:', error);
        throw error;
    } finally{
        await client.close();
    }
}
seedEvents().catch((err)=>{
    console.error('Seeding error:', err);
    process.exit(1);
});

//# sourceMappingURL=run-seeds.js.map