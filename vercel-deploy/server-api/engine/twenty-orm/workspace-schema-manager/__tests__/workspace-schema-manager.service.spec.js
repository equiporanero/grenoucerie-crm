"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _workspaceschemacolumnmanagerservice = require("../services/workspace-schema-column-manager.service");
const _workspaceschemaenummanagerservice = require("../services/workspace-schema-enum-manager.service");
const _workspaceschemaforeignkeymanagerservice = require("../services/workspace-schema-foreign-key-manager.service");
const _workspaceschemaindexmanagerservice = require("../services/workspace-schema-index-manager.service");
const _workspaceschematablemanagerservice = require("../services/workspace-schema-table-manager.service");
const _workspaceschemamanagerservice = require("../workspace-schema-manager.service");
describe('WorkspaceSchemaManager', ()=>{
    let service;
    let mockQueryRunner;
    let tableManager;
    let columnManager;
    let indexManager;
    let enumManager;
    let foreignKeyManager;
    beforeEach(async ()=>{
        // Prepare
        tableManager = {
            createTable: jest.fn(),
            dropTable: jest.fn(),
            renameTable: jest.fn(),
            tableExists: jest.fn()
        };
        columnManager = {
            addColumns: jest.fn(),
            dropColumn: jest.fn(),
            renameColumn: jest.fn(),
            columnExists: jest.fn()
        };
        indexManager = {
            createIndex: jest.fn(),
            dropIndex: jest.fn(),
            indexExists: jest.fn()
        };
        enumManager = {
            createEnum: jest.fn(),
            dropEnum: jest.fn(),
            alterEnumValues: jest.fn()
        };
        foreignKeyManager = {
            createForeignKey: jest.fn(),
            dropForeignKey: jest.fn()
        };
        mockQueryRunner = {
            query: jest.fn(),
            connect: jest.fn(),
            startTransaction: jest.fn(),
            commitTransaction: jest.fn(),
            rollbackTransaction: jest.fn(),
            release: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workspaceschemamanagerservice.WorkspaceSchemaManagerService,
                {
                    provide: _workspaceschematablemanagerservice.WorkspaceSchemaTableManagerService,
                    useValue: tableManager
                },
                {
                    provide: _workspaceschemacolumnmanagerservice.WorkspaceSchemaColumnManagerService,
                    useValue: columnManager
                },
                {
                    provide: _workspaceschemaindexmanagerservice.WorkspaceSchemaIndexManagerService,
                    useValue: indexManager
                },
                {
                    provide: _workspaceschemaenummanagerservice.WorkspaceSchemaEnumManagerService,
                    useValue: enumManager
                },
                {
                    provide: _workspaceschemaforeignkeymanagerservice.WorkspaceSchemaForeignKeyManagerService,
                    useValue: foreignKeyManager
                }
            ]
        }).compile();
        service = module.get(_workspaceschemamanagerservice.WorkspaceSchemaManagerService);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('constructor', ()=>{
        it('should be defined', ()=>{
            expect(service).toBeDefined();
        });
        it('should initialize all managers', ()=>{
            expect(service.tableManager).toBe(tableManager);
            expect(service.columnManager).toBe(columnManager);
            expect(service.indexManager).toBe(indexManager);
            expect(service.enumManager).toBe(enumManager);
            expect(service.foreignKeyManager).toBe(foreignKeyManager);
        });
    });
    describe('manager access', ()=>{
        it('should provide access to table manager', ()=>{
            // Act & Assert
            expect(service.tableManager).toBeInstanceOf(Object);
            expect(service.tableManager.createTable).toBeDefined();
        });
        it('should provide access to column manager', ()=>{
            // Act & Assert
            expect(service.columnManager).toBeInstanceOf(Object);
            expect(service.columnManager.addColumns).toBeDefined();
        });
        it('should provide access to index manager', ()=>{
            // Act & Assert
            expect(service.indexManager).toBeInstanceOf(Object);
            expect(service.indexManager.createIndex).toBeDefined();
        });
        it('should provide access to enum manager', ()=>{
            // Act & Assert
            expect(service.enumManager).toBeInstanceOf(Object);
            expect(service.enumManager.createEnum).toBeDefined();
        });
        it('should provide access to foreign key manager', ()=>{
            // Act & Assert
            expect(service.foreignKeyManager).toBeInstanceOf(Object);
            expect(service.foreignKeyManager.createForeignKey).toBeDefined();
        });
    });
    describe('integration scenarios', ()=>{
        it('should support creating a complete table structure', async ()=>{
            // Prepare
            const schemaName = 'workspace_test';
            const tableName = 'users';
            // Act
            await service.tableManager.createTable({
                queryRunner: mockQueryRunner,
                schemaName,
                tableName,
                columnDefinitions: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'status',
                        type: 'varchar'
                    }
                ]
            });
            await service.enumManager.createEnum({
                queryRunner: mockQueryRunner,
                schemaName,
                enumName: 'user_status_enum',
                values: [
                    'ACTIVE',
                    'INACTIVE'
                ]
            });
            await service.indexManager.createIndex({
                queryRunner: mockQueryRunner,
                schemaName,
                tableName,
                index: {
                    name: 'idx_users_name',
                    columns: [
                        'name'
                    ]
                }
            });
            // Assert
            expect(tableManager.createTable).toHaveBeenCalled();
            expect(enumManager.createEnum).toHaveBeenCalled();
            expect(indexManager.createIndex).toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=workspace-schema-manager.service.spec.js.map