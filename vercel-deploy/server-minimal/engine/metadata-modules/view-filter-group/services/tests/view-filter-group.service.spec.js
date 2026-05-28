"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _applicationservice = require("../../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _viewfiltergroupentity = require("../../entities/view-filter-group.entity");
const _viewfiltergroupservice = require("../view-filter-group.service");
const _workspacemigrationvalidatebuildandrunservice = require("../../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
describe('ViewFilterGroupService', ()=>{
    let viewFilterGroupService;
    let viewFilterGroupRepository;
    const mockViewFilterGroup = {
        id: 'view-filter-group-id',
        viewId: 'view-id',
        workspaceId: 'workspace-id',
        logicalOperator: _types.ViewFilterGroupLogicalOperator.AND,
        positionInViewFilterGroup: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _viewfiltergroupservice.ViewFilterGroupService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_viewfiltergroupentity.ViewFilterGroupEntity),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        softDelete: jest.fn(),
                        delete: jest.fn()
                    }
                },
                {
                    provide: _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
                    useValue: {
                        validateBuildAndRunWorkspaceMigration: jest.fn()
                    }
                },
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: {
                        getOrRecomputeManyOrAllFlatEntityMaps: jest.fn(),
                        invalidateFlatEntityMaps: jest.fn()
                    }
                },
                {
                    provide: _applicationservice.ApplicationService,
                    useValue: {
                        findWorkspaceTwentyStandardAndCustomApplicationOrThrow: jest.fn()
                    }
                }
            ]
        }).compile();
        viewFilterGroupService = module.get(_viewfiltergroupservice.ViewFilterGroupService);
        viewFilterGroupRepository = module.get((0, _typeorm.getRepositoryToken)(_viewfiltergroupentity.ViewFilterGroupEntity));
    });
    it('should be defined', ()=>{
        expect(viewFilterGroupService).toBeDefined();
    });
    describe('findByWorkspaceId', ()=>{
        it('should return view filter groups for a workspace', async ()=>{
            const workspaceId = 'workspace-id';
            const expectedViewFilterGroups = [
                mockViewFilterGroup
            ];
            jest.spyOn(viewFilterGroupRepository, 'find').mockResolvedValue(expectedViewFilterGroups);
            const result = await viewFilterGroupService.findByWorkspaceId(workspaceId);
            expect(viewFilterGroupRepository.find).toHaveBeenCalledWith({
                where: {
                    workspaceId,
                    deletedAt: expect.anything()
                },
                order: {
                    positionInViewFilterGroup: 'ASC'
                },
                relations: [
                    'workspace',
                    'view',
                    'viewFilters',
                    'parentViewFilterGroup',
                    'childViewFilterGroups'
                ]
            });
            expect(result).toEqual(expectedViewFilterGroups);
        });
    });
    describe('findByViewId', ()=>{
        it('should return view filter groups for a view', async ()=>{
            const workspaceId = 'workspace-id';
            const viewId = 'view-id';
            const expectedViewFilterGroups = [
                mockViewFilterGroup
            ];
            jest.spyOn(viewFilterGroupRepository, 'find').mockResolvedValue(expectedViewFilterGroups);
            const result = await viewFilterGroupService.findByViewId(workspaceId, viewId);
            expect(viewFilterGroupRepository.find).toHaveBeenCalledWith({
                where: {
                    workspaceId,
                    viewId,
                    deletedAt: expect.anything()
                },
                order: {
                    positionInViewFilterGroup: 'ASC'
                },
                relations: [
                    'workspace',
                    'view',
                    'viewFilters',
                    'parentViewFilterGroup',
                    'childViewFilterGroups'
                ]
            });
            expect(result).toEqual(expectedViewFilterGroups);
        });
    });
    describe('findById', ()=>{
        it('should return a view filter group by id', async ()=>{
            const id = 'view-filter-group-id';
            const workspaceId = 'workspace-id';
            jest.spyOn(viewFilterGroupRepository, 'findOne').mockResolvedValue(mockViewFilterGroup);
            const result = await viewFilterGroupService.findById(id, workspaceId);
            expect(viewFilterGroupRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id,
                    workspaceId,
                    deletedAt: expect.anything()
                },
                relations: [
                    'workspace',
                    'view',
                    'viewFilters',
                    'parentViewFilterGroup',
                    'childViewFilterGroups'
                ]
            });
            expect(result).toEqual(mockViewFilterGroup);
        });
        it('should return null when view filter group is not found', async ()=>{
            const id = 'non-existent-id';
            const workspaceId = 'workspace-id';
            jest.spyOn(viewFilterGroupRepository, 'findOne').mockResolvedValue(null);
            const result = await viewFilterGroupService.findById(id, workspaceId);
            expect(result).toBeNull();
        });
    });
});

//# sourceMappingURL=view-filter-group.service.spec.js.map