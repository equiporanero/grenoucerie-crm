"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workspacescopedrepository = require("../workspace-scoped-repository");
const WORKSPACE_ID = 'workspace-1';
const OTHER_WORKSPACE_ID = 'workspace-2';
const createMockRepository = ()=>({
        findOne: jest.fn().mockResolvedValue(null),
        findOneOrFail: jest.fn(),
        find: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
        update: jest.fn(),
        delete: jest.fn(),
        softDelete: jest.fn(),
        insert: jest.fn(),
        upsert: jest.fn(),
        save: jest.fn(),
        createQueryBuilder: jest.fn()
    });
describe('WorkspaceScopedRepository', ()=>{
    let repository;
    let scoped;
    beforeEach(()=>{
        repository = createMockRepository();
        scoped = new _workspacescopedrepository.WorkspaceScopedRepository(repository);
    });
    describe('workspaceId guard', ()=>{
        // TypeORM drops `undefined` values from WHERE/criteria, so a
        // missing workspaceId would otherwise produce an unscoped query.
        // Each public method must trip before reaching the repository.
        it.each([
            [
                'findOne',
                ()=>scoped.findOne(undefined, {
                        where: {}
                    })
            ],
            [
                'findOneOrFail',
                ()=>scoped.findOneOrFail(undefined, {
                        where: {}
                    })
            ],
            [
                'find',
                ()=>scoped.find(undefined)
            ],
            [
                'count',
                ()=>scoped.count(undefined)
            ],
            [
                'update',
                ()=>scoped.update(undefined, {}, {})
            ],
            [
                'delete',
                ()=>scoped.delete(undefined, {})
            ],
            [
                'softDelete',
                ()=>scoped.softDelete(undefined, {})
            ],
            [
                'insert',
                ()=>scoped.insert(undefined, {})
            ],
            [
                'upsert',
                ()=>scoped.upsert(undefined, {}, [
                        'id'
                    ])
            ],
            [
                'save',
                ()=>scoped.save(undefined, {})
            ],
            [
                'saveMany',
                ()=>scoped.saveMany(undefined, [
                        {}
                    ])
            ]
        ])('%s throws when workspaceId is undefined', (_name, call)=>{
            expect(call).toThrow(/workspaceId must be a non-empty string/);
        });
        it.each([
            null,
            ''
        ])('throws when workspaceId is %p', (badWorkspaceId)=>{
            expect(()=>scoped.findOne(badWorkspaceId, {
                    where: {}
                })).toThrow(/workspaceId must be a non-empty string/);
        });
    });
    describe('findOne', ()=>{
        it('merges workspaceId into a plain where clause', async ()=>{
            await scoped.findOne(WORKSPACE_ID, {
                where: {
                    id: 'a'
                }
            });
            expect(repository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 'a',
                    workspaceId: WORKSPACE_ID
                }
            });
        });
        it('merges workspaceId into every clause of an OR (array) where', async ()=>{
            await scoped.findOne(WORKSPACE_ID, {
                where: [
                    {
                        id: 'a'
                    },
                    {
                        status: 'queued'
                    }
                ]
            });
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    {
                        id: 'a',
                        workspaceId: WORKSPACE_ID
                    },
                    {
                        status: 'queued',
                        workspaceId: WORKSPACE_ID
                    }
                ]
            });
        });
        it('throws if the caller includes workspaceId in the WHERE clause', ()=>{
            expect(()=>scoped.findOne(WORKSPACE_ID, {
                    where: {
                        id: 'a',
                        workspaceId: OTHER_WORKSPACE_ID
                    }
                })).toThrow(/do not include `workspaceId`/);
            expect(repository.findOne).not.toHaveBeenCalled();
        });
        it('throws if any clause of an array WHERE includes workspaceId', ()=>{
            expect(()=>scoped.findOne(WORKSPACE_ID, {
                    where: [
                        {
                            id: 'a'
                        },
                        {
                            id: 'b',
                            workspaceId: OTHER_WORKSPACE_ID
                        }
                    ]
                })).toThrow(/do not include `workspaceId`/);
        });
        it('places workspaceId first in the merged WHERE clause', async ()=>{
            await scoped.findOne(WORKSPACE_ID, {
                where: {
                    id: 'a',
                    status: 'queued'
                }
            });
            const callArg = repository.findOne.mock.calls[0][0];
            const whereKeys = Object.keys(callArg.where);
            expect(whereKeys[0]).toBe('workspaceId');
        });
        it('preserves relations and other options', async ()=>{
            await scoped.findOne(WORKSPACE_ID, {
                where: {
                    id: 'a'
                },
                relations: [
                    'messages'
                ],
                select: [
                    'id'
                ]
            });
            expect(repository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 'a',
                    workspaceId: WORKSPACE_ID
                },
                relations: [
                    'messages'
                ],
                select: [
                    'id'
                ]
            });
        });
    });
    describe('find', ()=>{
        it('adds workspaceId when no where is provided', async ()=>{
            await scoped.find(WORKSPACE_ID);
            expect(repository.find).toHaveBeenCalledWith({
                where: {
                    workspaceId: WORKSPACE_ID
                }
            });
        });
        it('merges workspaceId into provided where', async ()=>{
            await scoped.find(WORKSPACE_ID, {
                where: {
                    status: 'queued'
                }
            });
            expect(repository.find).toHaveBeenCalledWith({
                where: {
                    status: 'queued',
                    workspaceId: WORKSPACE_ID
                }
            });
        });
    });
    describe('update', ()=>{
        it('merges workspaceId into the criteria, not the patch', async ()=>{
            await scoped.update(WORKSPACE_ID, {
                id: 'a'
            }, {
                status: 'completed'
            });
            expect(repository.update).toHaveBeenCalledWith({
                id: 'a',
                workspaceId: WORKSPACE_ID
            }, {
                status: 'completed'
            });
        });
        it('throws if the caller includes workspaceId in the criteria', ()=>{
            expect(()=>scoped.update(WORKSPACE_ID, {
                    id: 'a',
                    workspaceId: OTHER_WORKSPACE_ID
                }, {
                    status: 'completed'
                })).toThrow(/do not include `workspaceId`/);
            expect(repository.update).not.toHaveBeenCalled();
        });
    });
    describe('delete and softDelete', ()=>{
        it('delete merges workspaceId into criteria', async ()=>{
            await scoped.delete(WORKSPACE_ID, {
                id: 'a'
            });
            expect(repository.delete).toHaveBeenCalledWith({
                id: 'a',
                workspaceId: WORKSPACE_ID
            });
        });
        it('softDelete merges workspaceId into criteria', async ()=>{
            await scoped.softDelete(WORKSPACE_ID, {
                id: 'a'
            });
            expect(repository.softDelete).toHaveBeenCalledWith({
                id: 'a',
                workspaceId: WORKSPACE_ID
            });
        });
    });
    describe('insert', ()=>{
        it('stamps workspaceId on a single entity', async ()=>{
            await scoped.insert(WORKSPACE_ID, {
                id: 'a',
                status: 'queued'
            });
            expect(repository.insert).toHaveBeenCalledWith({
                id: 'a',
                status: 'queued',
                workspaceId: WORKSPACE_ID
            });
        });
        it('stamps workspaceId on each entity in an array', async ()=>{
            await scoped.insert(WORKSPACE_ID, [
                {
                    id: 'a',
                    status: 'queued'
                },
                {
                    id: 'b',
                    status: 'sent'
                }
            ]);
            expect(repository.insert).toHaveBeenCalledWith([
                {
                    id: 'a',
                    status: 'queued',
                    workspaceId: WORKSPACE_ID
                },
                {
                    id: 'b',
                    status: 'sent',
                    workspaceId: WORKSPACE_ID
                }
            ]);
        });
        it('overrides caller-supplied workspaceId on the entity', async ()=>{
            await scoped.insert(WORKSPACE_ID, {
                id: 'a',
                workspaceId: OTHER_WORKSPACE_ID
            });
            expect(repository.insert).toHaveBeenCalledWith({
                id: 'a',
                workspaceId: WORKSPACE_ID
            });
        });
    });
    describe('upsert', ()=>{
        it('stamps workspaceId on a single entity and forwards conflict opts', async ()=>{
            await scoped.upsert(WORKSPACE_ID, {
                id: 'a',
                status: 'queued'
            }, [
                'id'
            ]);
            expect(repository.upsert).toHaveBeenCalledWith({
                id: 'a',
                status: 'queued',
                workspaceId: WORKSPACE_ID
            }, [
                'id'
            ]);
        });
        it('stamps workspaceId on each entity in an array', async ()=>{
            await scoped.upsert(WORKSPACE_ID, [
                {
                    id: 'a',
                    status: 'queued'
                },
                {
                    id: 'b',
                    status: 'sent'
                }
            ], {
                conflictPaths: [
                    'id'
                ]
            });
            expect(repository.upsert).toHaveBeenCalledWith([
                {
                    id: 'a',
                    status: 'queued',
                    workspaceId: WORKSPACE_ID
                },
                {
                    id: 'b',
                    status: 'sent',
                    workspaceId: WORKSPACE_ID
                }
            ], {
                conflictPaths: [
                    'id'
                ]
            });
        });
    });
    describe('save', ()=>{
        it('stamps workspaceId on the entity passed to save', async ()=>{
            await scoped.save(WORKSPACE_ID, {
                id: 'a',
                status: 'queued'
            });
            expect(repository.save).toHaveBeenCalledWith({
                id: 'a',
                status: 'queued',
                workspaceId: WORKSPACE_ID
            }, undefined);
        });
        it('saveMany stamps workspaceId on each entity', async ()=>{
            await scoped.saveMany(WORKSPACE_ID, [
                {
                    id: 'a',
                    status: 'queued'
                },
                {
                    id: 'b',
                    status: 'sent'
                }
            ]);
            expect(repository.save).toHaveBeenCalledWith([
                {
                    id: 'a',
                    status: 'queued',
                    workspaceId: WORKSPACE_ID
                },
                {
                    id: 'b',
                    status: 'sent',
                    workspaceId: WORKSPACE_ID
                }
            ], undefined);
        });
        it('overrides caller-supplied workspaceId on the entity', async ()=>{
            await scoped.save(WORKSPACE_ID, {
                id: 'a',
                workspaceId: OTHER_WORKSPACE_ID
            });
            expect(repository.save).toHaveBeenCalledWith({
                id: 'a',
                workspaceId: WORKSPACE_ID
            }, undefined);
        });
    });
    describe('count', ()=>{
        it('merges workspaceId into where', async ()=>{
            await scoped.count(WORKSPACE_ID, {
                where: {
                    status: 'queued'
                }
            });
            expect(repository.count).toHaveBeenCalledWith({
                where: {
                    status: 'queued',
                    workspaceId: WORKSPACE_ID
                }
            });
        });
        it('adds workspaceId when no options are provided', async ()=>{
            await scoped.count(WORKSPACE_ID);
            expect(repository.count).toHaveBeenCalledWith({
                where: {
                    workspaceId: WORKSPACE_ID
                }
            });
        });
    });
    describe('createQueryBuilder', ()=>{
        it('returns the underlying QueryBuilder unchanged (escape hatch)', ()=>{
            scoped.createQueryBuilder('t');
            expect(repository.createQueryBuilder).toHaveBeenCalledWith('t');
        });
    });
    describe('withManager', ()=>{
        it('returns a new wrapper bound to the manager-provided repository', async ()=>{
            const txRepository = createMockRepository();
            const manager = {
                getRepository: jest.fn().mockReturnValue(txRepository)
            };
            repository.target = 'FakeEntity';
            const tx = scoped.withManager(manager);
            expect(tx).not.toBe(scoped);
            expect(manager.getRepository).toHaveBeenCalledWith('FakeEntity');
            await tx.findOne(WORKSPACE_ID, {
                where: {
                    id: 'a'
                }
            });
            expect(txRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 'a',
                    workspaceId: WORKSPACE_ID
                }
            });
            expect(repository.findOne).not.toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=workspace-scoped-repository.spec.js.map