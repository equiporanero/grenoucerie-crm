"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _databaseeventaction = require("../../../api/graphql/graphql-query-runner/enums/database-event-action");
const _twentyormexception = require("../../exceptions/twenty-orm.exception");
const _formattwentyormeventtodatabasebatcheventutil = require("../format-twenty-orm-event-to-database-batch-event.util");
describe('formatTwentyOrmEventToDatabaseBatchEvent', ()=>{
    const workspaceId = 'workspace-id';
    const objectMetadataId = 'object-id';
    const createMockField = (overrides)=>({
            workspaceId,
            objectMetadataId,
            isNullable: true,
            isLabelSyncedWithName: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            universalIdentifier: overrides.id,
            viewFieldIds: [],
            viewFilterIds: [],
            viewGroupIds: [],
            kanbanAggregateOperationViewIds: [],
            calendarViewIds: [],
            applicationId: null,
            label: overrides.name,
            ...overrides
        });
    const nameField = createMockField({
        id: 'name-id',
        type: _types.FieldMetadataType.TEXT,
        name: 'name',
        label: 'Name'
    });
    const flatFieldMetadataMaps = {
        byUniversalIdentifier: {
            'name-id': nameField
        },
        universalIdentifierById: {
            'name-id': 'name-id'
        },
        universalIdentifiersByApplicationId: {}
    };
    const flatObjectMetadata = {
        id: objectMetadataId,
        workspaceId,
        nameSingular: 'person',
        namePlural: 'people',
        labelSingular: 'Person',
        labelPlural: 'People',
        isCustom: false,
        isRemote: false,
        isActive: true,
        isSystem: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        universalIdentifier: objectMetadataId,
        fieldIds: [
            'name-id'
        ],
        indexMetadataIds: [],
        objectPermissionIds: [],
        fieldPermissionIds: [],
        viewIds: [],
        applicationId: null
    };
    const mockWorkspaceId = 'workspace-id';
    const mockAuthContext = {
        user: {
            id: 'user-id'
        },
        workspaceMemberId: 'workspace-member-id'
    };
    describe('UPDATED action', ()=>{
        it('should throw TwentyORMException when no matching before entity is found in array of beforeEntities', ()=>{
            const afterEntities = [
                {
                    id: 'record-1',
                    name: 'John Doe Updated'
                },
                {
                    id: 'record-2',
                    name: 'Jane Doe Updated'
                }
            ];
            const beforeEntities = [
                {
                    id: 'record-1',
                    name: 'John Doe'
                },
                {
                    id: 'record-3',
                    name: 'Bob Smith'
                }
            ];
            try {
                (0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                    action: _databaseeventaction.DatabaseEventAction.UPDATED,
                    objectMetadataItem: flatObjectMetadata,
                    flatFieldMetadataMaps,
                    workspaceId: mockWorkspaceId,
                    authContext: mockAuthContext,
                    recordsAfter: afterEntities,
                    recordsBefore: beforeEntities
                });
            } catch (error) {
                expect(error).toBeInstanceOf(_twentyormexception.TwentyORMException);
                expect(error.code).toBe(_twentyormexception.TwentyORMExceptionCode.ORM_EVENT_DATA_CORRUPTED);
                expect(error.message).toBe('Record mismatch detected while computing event data for UPDATED action');
            }
        });
        it('should successfully create update events when matching before entities are found and in the right order', ()=>{
            const afterEntities = [
                {
                    id: 'record-1',
                    name: 'John Doe Updated'
                },
                {
                    id: 'record-2',
                    name: 'Jane Doe Updated'
                }
            ];
            const beforeEntities = [
                {
                    id: 'record-2',
                    name: 'Jane Doe'
                },
                {
                    id: 'record-1',
                    name: 'John Doe'
                }
            ];
            const result = (0, _formattwentyormeventtodatabasebatcheventutil.formatTwentyOrmEventToDatabaseBatchEvent)({
                action: _databaseeventaction.DatabaseEventAction.UPDATED,
                objectMetadataItem: flatObjectMetadata,
                flatFieldMetadataMaps,
                workspaceId: mockWorkspaceId,
                authContext: mockAuthContext,
                recordsAfter: afterEntities,
                recordsBefore: beforeEntities
            });
            expect(result).toBeDefined();
            expect(result?.action).toBe(_databaseeventaction.DatabaseEventAction.UPDATED);
            expect(result?.events).toHaveLength(2);
            const updateEvent1 = result?.events[0];
            const updateEvent2 = result?.events[1];
            expect(updateEvent1.recordId).toBe('record-1');
            expect(updateEvent2.recordId).toBe('record-2');
            expect(updateEvent1.properties?.before?.name).toBe('John Doe');
            expect(updateEvent1.properties?.after?.name).toBe('John Doe Updated');
            expect(updateEvent2.properties?.before?.name).toBe('Jane Doe');
            expect(updateEvent2.properties?.after?.name).toBe('Jane Doe Updated');
        });
    });
});

//# sourceMappingURL=format-twenty-orm-event-to-database-batch-event.util.spec.js.map