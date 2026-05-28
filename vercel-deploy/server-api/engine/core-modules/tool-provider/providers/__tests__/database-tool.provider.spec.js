"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _databasetoolprovider = require("../database-tool.provider");
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _getflatobjectmetadatamock = require("../../../../metadata-modules/flat-object-metadata/__mocks__/get-flat-object-metadata.mock");
const roleId = 'role-id';
const workspaceId = 'workspace-id';
const allObjectPermissions = {
    canReadObjectRecords: true,
    canUpdateObjectRecords: true,
    canSoftDeleteObjectRecords: true,
    canDestroyObjectRecords: true,
    restrictedFields: {},
    rowLevelPermissionPredicates: [],
    rowLevelPermissionPredicateGroups: []
};
const createFlatObject = (overrides)=>(0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
        universalIdentifier: overrides.nameSingular,
        labelSingular: overrides.nameSingular,
        labelPlural: overrides.namePlural,
        ...overrides
    });
describe('DatabaseToolProvider', ()=>{
    const generateDescriptorNames = async (objects)=>{
        const flatObjectMetadataMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const object of objects){
            flatObjectMetadataMaps.byUniversalIdentifier[object.universalIdentifier] = object;
            flatObjectMetadataMaps.universalIdentifierById[object.id] = object.universalIdentifier;
        }
        const workspaceCacheService = {
            getOrRecompute: jest.fn().mockResolvedValue({
                rolesPermissions: {
                    [roleId]: Object.fromEntries(objects.map((object)=>[
                            object.id,
                            allObjectPermissions
                        ]))
                }
            })
        };
        const flatEntityMapsCacheService = {
            getOrRecomputeManyOrAllFlatEntityMaps: jest.fn().mockResolvedValue({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)()
            })
        };
        const provider = new _databasetoolprovider.DatabaseToolProvider(workspaceCacheService, flatEntityMapsCacheService);
        const descriptors = await provider.generateDescriptors({
            workspaceId,
            roleId,
            rolePermissionConfig: {
                unionOf: [
                    roleId
                ]
            }
        }, {
            includeSchemas: false
        });
        return descriptors.map((descriptor)=>descriptor.name);
    };
    it('advertises write tools for join/system objects allowed by automation', async ()=>{
        const descriptorNames = await generateDescriptorNames([
            createFlatObject({
                nameSingular: 'noteTarget',
                namePlural: 'noteTargets',
                isSystem: true
            }),
            createFlatObject({
                nameSingular: 'taskTarget',
                namePlural: 'taskTargets',
                isSystem: true
            }),
            createFlatObject({
                nameSingular: 'attachment',
                namePlural: 'attachments',
                isSystem: true
            }),
            createFlatObject({
                nameSingular: 'timelineActivity',
                namePlural: 'timelineActivities',
                isSystem: true
            }),
            createFlatObject({
                nameSingular: 'person',
                namePlural: 'people'
            })
        ]);
        expect(descriptorNames).toEqual(expect.arrayContaining([
            'create_note_target',
            'create_many_note_targets',
            'update_note_target',
            'update_many_note_targets',
            'delete_note_target',
            'create_task_target',
            'create_attachment',
            'create_timeline_activity',
            'create_person'
        ]));
    });
    it('does not advertise write tools for objects blocked from automation', async ()=>{
        const descriptorNames = await generateDescriptorNames([
            createFlatObject({
                nameSingular: 'workspaceMember',
                namePlural: 'workspaceMembers',
                isSystem: true
            }),
            createFlatObject({
                nameSingular: 'message',
                namePlural: 'messages',
                isSystem: true
            }),
            createFlatObject({
                nameSingular: 'calendarEvent',
                namePlural: 'calendarEvents',
                isSystem: true
            }),
            createFlatObject({
                nameSingular: 'dashboard',
                namePlural: 'dashboards'
            })
        ]);
        expect(descriptorNames).toEqual(expect.arrayContaining([
            'find_workspace_members',
            'find_messages',
            'find_calendar_events',
            'find_dashboards'
        ]));
        expect(descriptorNames).toEqual(expect.not.arrayContaining([
            'create_workspace_member',
            'update_workspace_member',
            'delete_workspace_member',
            'create_message',
            'update_message',
            'delete_message',
            'create_calendar_event',
            'update_calendar_event',
            'delete_calendar_event',
            'create_dashboard',
            'update_dashboard',
            'delete_dashboard'
        ]));
    });
});

//# sourceMappingURL=database-tool.provider.spec.js.map