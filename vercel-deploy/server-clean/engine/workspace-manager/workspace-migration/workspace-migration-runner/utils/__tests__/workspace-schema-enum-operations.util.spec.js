"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getflatfieldmetadatamock = require("../../../../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _workspacemigrationactionexecutionexception = require("../../exceptions/workspace-migration-action-execution.exception");
const _workspaceschemaenumoperationsutil = require("../workspace-schema-enum-operations.util");
describe('WorkspaceSchemaEnumOperations', ()=>{
    let mockSchemaManagerService;
    let mockQueryRunner;
    beforeEach(()=>{
        mockSchemaManagerService = {
            enumManager: {
                createEnum: jest.fn(),
                dropEnum: jest.fn(),
                renameEnum: jest.fn(),
                alterEnumValues: jest.fn()
            }
        };
        mockQueryRunner = {};
    });
    describe('Batch Operation Atomicity', ()=>{
        it('should fail fast when any enum operation fails to preserve transaction integrity', async ()=>{
            const enumOperations = [
                {
                    operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE,
                    enumName: 'enum1',
                    values: [
                        'A',
                        'B'
                    ]
                },
                {
                    operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE,
                    enumName: 'enum2',
                    values: [
                        'X',
                        'Y'
                    ]
                },
                {
                    operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE,
                    enumName: 'enum3',
                    values: [
                        'P',
                        'Q'
                    ]
                }
            ];
            // Simulate failure on second enum
            mockSchemaManagerService.enumManager.createEnum.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('Enum collision')).mockResolvedValueOnce(undefined);
            await expect((0, _workspaceschemaenumoperationsutil.executeBatchEnumOperations)({
                enumOperations,
                queryRunner: mockQueryRunner,
                schemaName: 'test_schema',
                workspaceSchemaManagerService: mockSchemaManagerService
            })).rejects.toThrow(_workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionException);
            // All operations should be attempted in parallel despite failure
            expect(mockSchemaManagerService.enumManager.createEnum).toHaveBeenCalledTimes(3);
        });
        it('should handle empty operations without unnecessary database calls', async ()=>{
            await (0, _workspaceschemaenumoperationsutil.executeBatchEnumOperations)({
                enumOperations: [],
                queryRunner: mockQueryRunner,
                schemaName: 'test_schema',
                workspaceSchemaManagerService: mockSchemaManagerService
            });
            expect(mockSchemaManagerService.enumManager.createEnum).not.toHaveBeenCalled();
        });
    });
    describe('Enum Collection for SELECT Fields', ()=>{
        it('should collect enum operations for simple SELECT fields', ()=>{
            const selectField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'status',
                objectMetadataId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
                type: _types.FieldMetadataType.SELECT,
                name: 'status',
                options: [
                    {
                        id: '1',
                        value: 'ACTIVE',
                        label: 'Active',
                        color: 'green',
                        position: 0
                    },
                    {
                        id: '2',
                        value: 'INACTIVE',
                        label: 'Inactive',
                        color: 'red',
                        position: 1
                    }
                ]
            });
            const enumOps = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForField)({
                flatFieldMetadata: selectField,
                tableName: 'contacts',
                operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE
            });
            expect(enumOps).toMatchObject([
                {
                    enumName: expect.stringContaining('contacts_status_enum'),
                    values: [
                        'ACTIVE',
                        'INACTIVE'
                    ]
                }
            ]);
        });
        it('should collect enum operations for MULTI_SELECT fields', ()=>{
            const multiSelectField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'tags',
                objectMetadataId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
                type: _types.FieldMetadataType.MULTI_SELECT,
                name: 'tags',
                options: [
                    {
                        id: '1',
                        value: 'URGENT',
                        label: 'Urgent',
                        color: 'red',
                        position: 0
                    },
                    {
                        id: '2',
                        value: 'LOW_PRIORITY',
                        label: 'Low Priority',
                        color: 'blue',
                        position: 1
                    }
                ]
            });
            const enumOps = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForField)({
                flatFieldMetadata: multiSelectField,
                tableName: 'tasks',
                operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE
            });
            expect(enumOps).toMatchObject([
                {
                    enumName: expect.stringContaining('tasks_tags_enum'),
                    values: [
                        'URGENT',
                        'LOW_PRIORITY'
                    ]
                }
            ]);
        });
        it('should handle field renaming with proper enum name mapping', ()=>{
            const selectField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'status',
                objectMetadataId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
                type: _types.FieldMetadataType.SELECT,
                name: 'oldStatus'
            });
            const enumOps = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForField)({
                flatFieldMetadata: selectField,
                tableName: 'contacts',
                operation: _workspaceschemaenumoperationsutil.EnumOperation.RENAME,
                options: {
                    newFieldName: 'newStatus'
                }
            });
            expect(enumOps).toMatchObject([
                {
                    fromName: expect.stringContaining('contacts_oldStatus_enum'),
                    toName: expect.stringContaining('contacts_newStatus_enum')
                }
            ]);
        });
    });
    describe('Composite Field Enum Handling', ()=>{
        it('should handle composite fields that do not currently generate enum operations', ()=>{
            const addressField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'address',
                objectMetadataId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
                type: _types.FieldMetadataType.ADDRESS,
                name: 'primaryAddress'
            });
            const enumOps = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForField)({
                flatFieldMetadata: addressField,
                tableName: 'contacts',
                operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE
            });
            // Current implementation doesn't handle composite enum fields
            expect(enumOps).toEqual([]);
        });
        it('should skip relation properties in composite types', ()=>{
            const relationField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'relation',
                objectMetadataId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
                type: _types.FieldMetadataType.RELATION,
                name: 'company'
            });
            const enumOps = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForField)({
                flatFieldMetadata: relationField,
                tableName: 'contacts',
                operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE
            });
            // Relation fields should not generate enum operations
            expect(enumOps).toEqual([]);
        });
    });
    describe('Non-Enum Field Safety', ()=>{
        it('should return empty operations for non-enum fields', ()=>{
            const textField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                universalIdentifier: 'description',
                objectMetadataId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
                type: _types.FieldMetadataType.TEXT,
                name: 'description'
            });
            const enumOps = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForField)({
                flatFieldMetadata: textField,
                tableName: 'contacts',
                operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE
            });
            expect(enumOps).toEqual([]);
        });
    });
});

//# sourceMappingURL=workspace-schema-enum-operations.util.spec.js.map