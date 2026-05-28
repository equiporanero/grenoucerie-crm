"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _twentyconfigservice = require("../../engine/core-modules/twenty-config/twenty-config.service");
const _clickHouseservice = require("./clickHouse.service");
// Mock the createClient function from @clickhouse/client
jest.mock('@clickhouse/client', ()=>({
        createClient: jest.fn().mockReturnValue({
            insert: jest.fn().mockResolvedValue({}),
            query: jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue([
                    {
                        test: 'data'
                    }
                ])
            }),
            ping: jest.fn().mockResolvedValue({
                success: true
            }),
            close: jest.fn().mockResolvedValue({}),
            exec: jest.fn().mockResolvedValue({})
        }),
        ClickHouseLogLevel: {
            OFF: 'OFF'
        }
    }));
describe('ClickHouseService', ()=>{
    let service;
    let twentyConfigService;
    let mockClickHouseClient;
    let loggerErrorSpy;
    beforeEach(async ()=>{
        jest.clearAllMocks();
        mockClickHouseClient = {
            insert: jest.fn().mockResolvedValue({}),
            query: jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue([
                    {
                        test: 'data'
                    }
                ])
            }),
            ping: jest.fn().mockResolvedValue({
                success: true
            }),
            close: jest.fn().mockResolvedValue({}),
            exec: jest.fn().mockResolvedValue({})
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _clickHouseservice.ClickHouseService,
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn((key)=>{
                            if (key === 'CLICKHOUSE_URL') return 'http://localhost:8123';
                            return undefined;
                        })
                    }
                }
            ]
        }).compile();
        service = module.get(_clickHouseservice.ClickHouseService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
        // Mock logger error method to avoid polluting test output
        loggerErrorSpy = jest.spyOn(service.logger, 'error').mockImplementation();
        // Set the mock client
        service.mainClient = mockClickHouseClient;
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('constructor', ()=>{
        it('should not initialize clickhouse client when clickhouse is disabled', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                if (key === 'CLICKHOUSE_URL') return '';
                return undefined;
            });
            const newModule = await _testing.Test.createTestingModule({
                providers: [
                    _clickHouseservice.ClickHouseService,
                    {
                        provide: _twentyconfigservice.TwentyConfigService,
                        useValue: twentyConfigService
                    }
                ]
            }).compile();
            const newService = newModule.get(_clickHouseservice.ClickHouseService);
            expect(newService.mainClient).toBeUndefined();
        });
    });
    describe('insert', ()=>{
        it('should insert data into clickhouse and return success', async ()=>{
            const testData = [
                {
                    id: 1,
                    name: 'test'
                }
            ];
            const result = await service.insert('test_table', testData);
            expect(result).toEqual({
                success: true
            });
            expect(mockClickHouseClient.insert).toHaveBeenCalledWith({
                table: 'test_table',
                values: testData,
                format: 'JSONEachRow'
            });
        });
        it('should return failure when clickhouse client is not defined', async ()=>{
            service.mainClient = undefined;
            const testData = [
                {
                    id: 1,
                    name: 'test'
                }
            ];
            const result = await service.insert('test_table', testData);
            expect(result).toEqual({
                success: false
            });
        });
        it('should handle errors and return failure', async ()=>{
            const testError = new Error('Test error');
            mockClickHouseClient.insert.mockRejectedValueOnce(testError);
            const testData = [
                {
                    id: 1,
                    name: 'test'
                }
            ];
            const result = await service.insert('test_table', testData);
            expect(result).toEqual({
                success: false
            });
            expect(loggerErrorSpy).toHaveBeenCalledWith('Error inserting data into ClickHouse', testError);
        });
    });
    describe('select', ()=>{
        it('should execute a query and return results', async ()=>{
            const query = 'SELECT * FROM test_table WHERE id = {id:Int32}';
            const params = {
                id: 1
            };
            mockClickHouseClient.query.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce([
                    {
                        id: 1,
                        name: 'test'
                    }
                ])
            });
            const result = await service.select(query, params);
            expect(result).toEqual([
                {
                    id: 1,
                    name: 'test'
                }
            ]);
            expect(mockClickHouseClient.query).toHaveBeenCalledWith({
                query,
                format: 'JSONEachRow',
                query_params: params
            });
        });
        it('should return empty array when clickhouse client is not defined', async ()=>{
            service.mainClient = undefined;
            const query = 'SELECT * FROM test_table';
            const result = await service.select(query);
            expect(result).toEqual([]);
        });
        it('should handle errors and return empty array', async ()=>{
            const testError = new Error('Test error');
            mockClickHouseClient.query.mockRejectedValueOnce(testError);
            const query = 'SELECT * FROM test_table';
            const result = await service.select(query);
            expect(result).toEqual([]);
            expect(loggerErrorSpy).toHaveBeenCalledWith('Error executing select query in ClickHouse', testError);
        });
    });
    describe('createDatabase', ()=>{
        it('should create a database and return true', async ()=>{
            const result = await service.createDatabase('test_db');
            expect(result).toBe(true);
            expect(mockClickHouseClient.exec).toHaveBeenCalledWith({
                query: 'CREATE DATABASE IF NOT EXISTS test_db'
            });
        });
        it('should return false when clickhouse client is not defined', async ()=>{
            service.mainClient = undefined;
            const result = await service.createDatabase('test_db');
            expect(result).toBe(false);
        });
    });
    describe('dropDatabase', ()=>{
        it('should drop a database and return true', async ()=>{
            const result = await service.dropDatabase('test_db');
            expect(result).toBe(true);
            expect(mockClickHouseClient.exec).toHaveBeenCalledWith({
                query: 'DROP DATABASE IF EXISTS test_db'
            });
        });
        it('should return false when clickhouse client is not defined', async ()=>{
            service.mainClient = undefined;
            const result = await service.dropDatabase('test_db');
            expect(result).toBe(false);
        });
    });
    describe('connectToClient', ()=>{
        it('should connect to a client and return it', async ()=>{
            jest.spyOn(service, 'connectToClient').mockResolvedValueOnce(mockClickHouseClient);
            const result = await service.connectToClient('test-client');
            expect(result).toBe(mockClickHouseClient);
        });
        it('should reuse an existing client if available', async ()=>{
            // Set up a client in the map
            service.clients.set('test-client', mockClickHouseClient);
            const result = await service.connectToClient('test-client');
            expect(result).toBe(mockClickHouseClient);
        });
    });
    describe('disconnectFromClient', ()=>{
        it('should disconnect from a client', async ()=>{
            // Set up a client in the map
            service.clients.set('test-client', mockClickHouseClient);
            await service.disconnectFromClient('test-client');
            expect(mockClickHouseClient.close).toHaveBeenCalled();
            expect(service.clients.has('test-client')).toBe(false);
        });
        it('should do nothing if client does not exist', async ()=>{
            await service.disconnectFromClient('non-existent-client');
            expect(mockClickHouseClient.close).not.toHaveBeenCalled();
        });
    });
    describe('lifecycle hooks', ()=>{
        it('should ping server on module init', async ()=>{
            await service.onModuleInit();
            expect(mockClickHouseClient.ping).toHaveBeenCalled();
        });
        it('should close all clients on module destroy', async ()=>{
            // Set up a couple of clients
            service.clients.set('client1', mockClickHouseClient);
            service.clients.set('client2', mockClickHouseClient);
            await service.onModuleDestroy();
            // One for mainClient, and two for the clients in the map
            expect(mockClickHouseClient.close).toHaveBeenCalledTimes(3);
        });
    });
});

//# sourceMappingURL=clickHouse.service.spec.js.map