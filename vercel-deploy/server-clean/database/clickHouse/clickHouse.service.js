"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClickHouseService", {
    enumerable: true,
    get: function() {
        return ClickHouseService;
    }
});
const _common = require("@nestjs/common");
const _client = require("@clickhouse/client");
const _twentyconfigservice = require("../../engine/core-modules/twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ClickHouseService = class ClickHouseService {
    getMainClient() {
        return this.mainClient;
    }
    async connectToClient(clientId, url) {
        if (!this.twentyConfigService.get('CLICKHOUSE_URL')) {
            return undefined;
        }
        // Wait for a bit before trying again if another initialization is in progress
        while(this.isClientInitializing.get(clientId)){
            await new Promise((resolve)=>setTimeout(resolve, 10));
        }
        if (this.clients.has(clientId)) {
            return this.clients.get(clientId);
        }
        this.isClientInitializing.set(clientId, true);
        try {
            const clientInstance = await this.createAndInitializeClient(url);
            this.clients.set(clientId, clientInstance);
            return clientInstance;
        } catch (err) {
            this.logger.error(`Error connecting to ClickHouse client ${clientId}`, err);
            return undefined;
        } finally{
            this.isClientInitializing.delete(clientId);
        }
    }
    async createAndInitializeClient(url) {
        const client = (0, _client.createClient)({
            url: url ?? this.twentyConfigService.get('CLICKHOUSE_URL'),
            compression: {
                response: true,
                request: true
            },
            clickhouse_settings: {
                async_insert: 1,
                wait_for_async_insert: 1
            },
            application: 'twenty',
            log: {
                level: _client.ClickHouseLogLevel.OFF
            }
        });
        // Ping to check connection
        await client.ping();
        return client;
    }
    async disconnectFromClient(clientId) {
        if (!this.clients.has(clientId)) {
            return;
        }
        const client = this.clients.get(clientId);
        if (client) {
            await client.close();
        }
        this.clients.delete(clientId);
    }
    async onModuleInit() {
        if (this.mainClient) {
            // Just ping to verify the connection
            try {
                await this.mainClient.ping();
            } catch (err) {
                this.logger.error('Error connecting to ClickHouse', err);
            }
        }
    }
    async onModuleDestroy() {
        // Close main client
        if (this.mainClient) {
            await this.mainClient.close();
        }
        // Close all other clients
        for (const [, client] of this.clients){
            await client.close();
        }
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    async insert(table, values, clientId) {
        try {
            const client = clientId ? await this.connectToClient(clientId) : this.mainClient;
            if (!client) {
                return {
                    success: false
                };
            }
            await this.insertInChunks(client, table, values, {
                chunkSize: 1000,
                maxMemoryMB: 4
            });
            return {
                success: true
            };
        } catch (err) {
            this.logger.error('Error inserting data into ClickHouse', err);
            return {
                success: false
            };
        }
    }
    // Method to execute a select query
    async select(query, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    params, clientId) {
        try {
            const client = clientId ? await this.connectToClient(clientId) : this.mainClient;
            if (!client) {
                return [];
            }
            const resultSet = await client.query({
                query,
                format: 'JSONEachRow',
                query_params: params
            });
            const result = await resultSet.json();
            return Array.isArray(result) ? result : [];
        } catch (err) {
            this.logger.error('Error executing select query in ClickHouse', err);
            return [];
        }
    }
    async createDatabase(databaseName) {
        try {
            if (!this.mainClient) {
                return false;
            }
            await this.mainClient.exec({
                query: `CREATE DATABASE IF NOT EXISTS ${databaseName}`
            });
            return true;
        } catch (err) {
            this.logger.error('Error creating database in ClickHouse', err);
            return false;
        }
    }
    async dropDatabase(databaseName) {
        try {
            if (!this.mainClient) {
                return false;
            }
            await this.mainClient.exec({
                query: `DROP DATABASE IF EXISTS ${databaseName}`
            });
            return true;
        } catch (err) {
            this.logger.error('Error dropping database in ClickHouse', err);
            return false;
        }
    }
    async executeCommand(query, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    params, clientId) {
        try {
            const client = clientId ? await this.connectToClient(clientId) : this.mainClient;
            if (!client) {
                return false;
            }
            await client.command({
                query,
                query_params: params
            });
            return true;
        } catch (err) {
            this.logger.error('Error executing command in ClickHouse', err);
            return false;
        }
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    async insertInChunks(client, table, values, options = {}) {
        const chunkSize = options.chunkSize ?? 1000;
        const maxMemoryMB = options.maxMemoryMB;
        let chunk = [];
        let currentSizeBytes = 0;
        const flush = async ()=>{
            if (chunk.length === 0) return;
            await client.insert({
                table,
                values: chunk,
                format: 'JSONEachRow'
            });
            chunk = [];
            currentSizeBytes = 0;
        };
        for (const row of values){
            const rowSize = Buffer.byteLength(JSON.stringify(row));
            chunk.push(row);
            currentSizeBytes += rowSize;
            const currentSizeMB = currentSizeBytes / 1024 / 1024;
            if (chunk.length >= chunkSize || maxMemoryMB !== undefined && currentSizeMB >= maxMemoryMB) {
                await flush();
            }
        }
        await flush();
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
        this.clients = new Map();
        this.isClientInitializing = new Map();
        this.logger = new _common.Logger(ClickHouseService.name);
        if (this.twentyConfigService.get('CLICKHOUSE_URL')) {
            this.mainClient = (0, _client.createClient)({
                url: this.twentyConfigService.get('CLICKHOUSE_URL'),
                compression: {
                    response: true,
                    request: true
                },
                clickhouse_settings: {
                    async_insert: 1,
                    wait_for_async_insert: 1
                },
                application: 'twenty',
                log: {
                    level: _client.ClickHouseLogLevel.OFF
                }
            });
        }
    }
};
ClickHouseService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], ClickHouseService);

//# sourceMappingURL=clickHouse.service.js.map