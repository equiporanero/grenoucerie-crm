"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _trashcleanupservice = require("../trash-cleanup.service");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
describe('TrashCleanupService', ()=>{
    let service;
    let mockFlatEntityMapsCacheService;
    let mockGlobalWorkspaceOrmManager;
    beforeEach(async ()=>{
        mockFlatEntityMapsCacheService = {
            getOrRecomputeManyOrAllFlatEntityMaps: jest.fn()
        };
        mockGlobalWorkspaceOrmManager = {
            getRepository: jest.fn(),
            executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _trashcleanupservice.TrashCleanupService,
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: mockFlatEntityMapsCacheService
                },
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: mockGlobalWorkspaceOrmManager
                }
            ]
        }).compile();
        service = module.get(_trashcleanupservice.TrashCleanupService);
        // Suppress logger output in tests
        jest.spyOn(service['logger'], 'log').mockImplementation();
        jest.spyOn(service['logger'], 'error').mockImplementation();
        jest.clearAllMocks();
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('cleanupWorkspaceTrash', ()=>{
        const createRepositoryMock = (name, initialCount)=>{
            let remaining = initialCount;
            let counter = 0;
            return {
                find: jest.fn().mockImplementation(({ take })=>{
                    const amount = Math.min(take ?? remaining, remaining);
                    const records = Array.from({
                        length: amount
                    }, ()=>({
                            id: `${name}-${counter++}`
                        }));
                    remaining -= amount;
                    return Promise.resolve(records);
                }),
                delete: jest.fn().mockResolvedValue(undefined)
            };
        };
        const setObjectMetadataCache = (entries)=>{
            const byUniversalIdentifier = entries.reduce((acc, { id, nameSingular, universalIdentifier })=>{
                acc[universalIdentifier] = {
                    id,
                    nameSingular,
                    universalIdentifier
                };
                return acc;
            }, {});
            const universalIdentifierById = entries.reduce((acc, { id, universalIdentifier })=>{
                acc[id] = universalIdentifier;
                return acc;
            }, {});
            mockFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: {
                    byUniversalIdentifier,
                    universalIdentifierById,
                    universalIdentifiersByApplicationId: {}
                }
            });
        };
        it('should return deleted count when cleanup succeeds', async ()=>{
            setObjectMetadataCache([
                {
                    id: 'obj-company',
                    nameSingular: 'company',
                    universalIdentifier: 'uni-company'
                },
                {
                    id: 'obj-person',
                    nameSingular: 'person',
                    universalIdentifier: 'uni-person'
                }
            ]);
            const companyRepository = createRepositoryMock('company', 2);
            const personRepository = createRepositoryMock('person', 1);
            mockGlobalWorkspaceOrmManager.getRepository.mockResolvedValueOnce(companyRepository).mockResolvedValueOnce(personRepository);
            const result = await service.cleanupWorkspaceTrash({
                workspaceId: 'workspace-id',
                trashRetentionDays: 14
            });
            expect(result).toEqual(3);
            expect(companyRepository.find).toHaveBeenCalled();
            expect(personRepository.find).toHaveBeenCalled();
            expect(companyRepository.delete).toHaveBeenCalledTimes(1);
            expect(personRepository.delete).toHaveBeenCalledTimes(1);
            const findArgs = companyRepository.find.mock.calls[0][0];
            expect(findArgs.withDeleted).toBe(true);
            expect(findArgs.order).toEqual({
                deletedAt: 'ASC'
            });
        });
        it('should return zero when no objects are found', async ()=>{
            setObjectMetadataCache([]);
            const result = await service.cleanupWorkspaceTrash({
                workspaceId: 'workspace-id',
                trashRetentionDays: 14
            });
            expect(result).toEqual(0);
            expect(mockGlobalWorkspaceOrmManager.getRepository).not.toHaveBeenCalled();
        });
        it('should respect max records limit across objects', async ()=>{
            service.maxRecordsPerWorkspace = 3;
            service.batchSize = 3;
            setObjectMetadataCache([
                {
                    id: 'obj-company',
                    nameSingular: 'company',
                    universalIdentifier: 'uni-company'
                },
                {
                    id: 'obj-person',
                    nameSingular: 'person',
                    universalIdentifier: 'uni-person'
                }
            ]);
            const companyRepository = createRepositoryMock('company', 2);
            const personRepository = createRepositoryMock('person', 5);
            mockGlobalWorkspaceOrmManager.getRepository.mockResolvedValueOnce(companyRepository).mockResolvedValueOnce(personRepository);
            const result = await service.cleanupWorkspaceTrash({
                workspaceId: 'workspace-id',
                trashRetentionDays: 14
            });
            expect(result).toEqual(3);
            expect(companyRepository.delete).toHaveBeenCalledTimes(1);
            expect(personRepository.delete).toHaveBeenCalledTimes(1);
            const personDeleteArgs = personRepository.delete.mock.calls[0][0];
            const deletedIds = personDeleteArgs.id._value ?? personDeleteArgs.id.value;
            expect(deletedIds).toHaveLength(1);
            expect(personRepository.find).toHaveBeenCalledTimes(1);
        });
        it('should ignore objects without soft deleted records', async ()=>{
            setObjectMetadataCache([
                {
                    id: 'obj-company',
                    nameSingular: 'company',
                    universalIdentifier: 'uni-company'
                }
            ]);
            const companyRepository = createRepositoryMock('company', 0);
            mockGlobalWorkspaceOrmManager.getRepository.mockResolvedValueOnce(companyRepository);
            const result = await service.cleanupWorkspaceTrash({
                workspaceId: 'workspace-id',
                trashRetentionDays: 14
            });
            expect(result).toEqual(0);
            expect(companyRepository.delete).not.toHaveBeenCalled();
        });
        it('should delete records across multiple batches', async ()=>{
            setObjectMetadataCache([
                {
                    id: 'obj-company',
                    nameSingular: 'company',
                    universalIdentifier: 'uni-company'
                }
            ]);
            const companyRepository = createRepositoryMock('company', 5);
            mockGlobalWorkspaceOrmManager.getRepository.mockResolvedValueOnce(companyRepository);
            service.batchSize = 2;
            service.maxRecordsPerWorkspace = 10;
            const result = await service.cleanupWorkspaceTrash({
                workspaceId: 'workspace-id',
                trashRetentionDays: 14
            });
            expect(result).toEqual(5);
            expect(companyRepository.find).toHaveBeenCalledTimes(4);
            expect(companyRepository.delete).toHaveBeenCalledTimes(3);
        });
    });
});

//# sourceMappingURL=trash-cleanup.service.spec.js.map