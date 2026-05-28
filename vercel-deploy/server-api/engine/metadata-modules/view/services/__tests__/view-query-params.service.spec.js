"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _workspacemanyorallflatentitymapscacheservice = require("../../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _viewqueryparamsservice = require("../view-query-params.service");
const _viewservice = require("../view.service");
const _globalworkspaceormmanager = require("../../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
describe('ViewQueryParamsService', ()=>{
    let viewQueryParamsService;
    let viewService;
    let flatEntityMapsCacheService;
    const mockWorkspaceId = 'workspace-id';
    const mockViewId = 'view-id';
    const mockObjectMetadataId = 'object-metadata-id';
    const mockFieldMetadataId = 'field-metadata-id';
    const mockFlatObjectMetadataMaps = {
        byUniversalIdentifier: {
            'object-universal-id': {
                id: mockObjectMetadataId,
                nameSingular: 'company',
                namePlural: 'companies',
                labelSingular: 'Company',
                labelPlural: 'Companies',
                universalIdentifier: 'object-universal-id'
            }
        },
        universalIdentifierById: {
            [mockObjectMetadataId]: 'object-universal-id'
        },
        universalIdentifiersByApplicationId: {}
    };
    const mockFlatFieldMetadataMaps = {
        byUniversalIdentifier: {
            'field-universal-id': {
                id: mockFieldMetadataId,
                name: 'name',
                type: _types.FieldMetadataType.TEXT,
                label: 'Name',
                options: null,
                universalIdentifier: 'field-universal-id'
            }
        },
        universalIdentifierById: {
            [mockFieldMetadataId]: 'field-universal-id'
        },
        universalIdentifiersByApplicationId: {}
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _viewqueryparamsservice.ViewQueryParamsService,
                {
                    provide: _viewservice.ViewService,
                    useValue: {
                        findByIdWithRelations: jest.fn()
                    }
                },
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: {
                        getOrRecomputeManyOrAllFlatEntityMaps: jest.fn()
                    }
                },
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: {
                        getRepository: jest.fn()
                    }
                }
            ]
        }).compile();
        viewQueryParamsService = module.get(_viewqueryparamsservice.ViewQueryParamsService);
        viewService = module.get(_viewservice.ViewService);
        flatEntityMapsCacheService = module.get(_workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService);
    });
    it('should be defined', ()=>{
        expect(viewQueryParamsService).toBeDefined();
    });
    describe('resolveViewToQueryParams', ()=>{
        it('should throw error when view is not found', async ()=>{
            viewService.findByIdWithRelations.mockResolvedValue(null);
            await expect(viewQueryParamsService.resolveViewToQueryParams(mockViewId, mockWorkspaceId)).rejects.toThrow(`View with id ${mockViewId} not found`);
        });
        it('should return query params for a view without filters or sorts', async ()=>{
            const mockView = {
                id: mockViewId,
                name: 'All Companies',
                objectMetadataId: mockObjectMetadataId,
                type: _types.ViewType.TABLE,
                visibility: _types.ViewVisibility.WORKSPACE,
                viewFilters: [],
                viewFilterGroups: [],
                viewSorts: []
            };
            viewService.findByIdWithRelations.mockResolvedValue(mockView);
            flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: mockFlatObjectMetadataMaps,
                flatFieldMetadataMaps: mockFlatFieldMetadataMaps
            });
            const result = await viewQueryParamsService.resolveViewToQueryParams(mockViewId, mockWorkspaceId);
            expect(result.objectNameSingular).toBe('company');
            expect(result.filter).toEqual({});
            expect(result.orderBy).toEqual([]);
            expect(result.viewName).toBe('All Companies');
            expect(result.viewType).toBe(_types.ViewType.TABLE);
        });
        it('should return query params with filters', async ()=>{
            const mockFilterGroupId = 'filter-group-id';
            const mockView = {
                id: mockViewId,
                name: 'Companies with Name',
                objectMetadataId: mockObjectMetadataId,
                type: _types.ViewType.TABLE,
                visibility: _types.ViewVisibility.WORKSPACE,
                viewFilters: [
                    {
                        id: 'filter-id',
                        fieldMetadataId: mockFieldMetadataId,
                        operand: _types.ViewFilterOperand.CONTAINS,
                        value: 'Acme',
                        viewFilterGroupId: mockFilterGroupId,
                        subFieldName: null
                    }
                ],
                viewFilterGroups: [
                    {
                        id: mockFilterGroupId,
                        parentViewFilterGroupId: null,
                        logicalOperator: _types.ViewFilterGroupLogicalOperator.AND
                    }
                ],
                viewSorts: []
            };
            viewService.findByIdWithRelations.mockResolvedValue(mockView);
            flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: mockFlatObjectMetadataMaps,
                flatFieldMetadataMaps: mockFlatFieldMetadataMaps
            });
            const result = await viewQueryParamsService.resolveViewToQueryParams(mockViewId, mockWorkspaceId);
            expect(result.objectNameSingular).toBe('company');
            expect(result.viewName).toBe('Companies with Name');
            expect(result.filter).toBeDefined();
        });
        it('should return query params with sorts', async ()=>{
            const mockView = {
                id: mockViewId,
                name: 'Companies Sorted',
                objectMetadataId: mockObjectMetadataId,
                type: _types.ViewType.TABLE,
                visibility: _types.ViewVisibility.WORKSPACE,
                viewFilters: [],
                viewFilterGroups: [],
                viewSorts: [
                    {
                        id: 'sort-id',
                        fieldMetadataId: mockFieldMetadataId,
                        direction: _types.ViewSortDirection.DESC
                    }
                ]
            };
            viewService.findByIdWithRelations.mockResolvedValue(mockView);
            flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: mockFlatObjectMetadataMaps,
                flatFieldMetadataMaps: mockFlatFieldMetadataMaps
            });
            const result = await viewQueryParamsService.resolveViewToQueryParams(mockViewId, mockWorkspaceId);
            expect(result.objectNameSingular).toBe('company');
            expect(result.orderBy).toHaveLength(1);
            expect(result.orderBy[0]).toHaveProperty('name');
        });
        it('should skip filters for deleted fields', async ()=>{
            const deletedFieldId = 'deleted-field-id';
            const mockFilterGroupId = 'filter-group-id';
            const mockView = {
                id: mockViewId,
                name: 'View with deleted field filter',
                objectMetadataId: mockObjectMetadataId,
                type: _types.ViewType.TABLE,
                visibility: _types.ViewVisibility.WORKSPACE,
                viewFilters: [
                    {
                        id: 'filter-id',
                        fieldMetadataId: deletedFieldId,
                        operand: _types.ViewFilterOperand.CONTAINS,
                        value: 'test',
                        viewFilterGroupId: mockFilterGroupId,
                        subFieldName: null
                    }
                ],
                viewFilterGroups: [
                    {
                        id: mockFilterGroupId,
                        parentViewFilterGroupId: null,
                        logicalOperator: _types.ViewFilterGroupLogicalOperator.AND
                    }
                ],
                viewSorts: []
            };
            viewService.findByIdWithRelations.mockResolvedValue(mockView);
            flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: mockFlatObjectMetadataMaps,
                flatFieldMetadataMaps: mockFlatFieldMetadataMaps
            });
            const result = await viewQueryParamsService.resolveViewToQueryParams(mockViewId, mockWorkspaceId);
            // Filter should be effectively empty because the field was deleted
            expect(result.filter).toEqual({
                and: []
            });
        });
        it('should resolve relation-traversal filters against the target field', async ()=>{
            const relationFieldId = 'relation-field-id';
            const targetFieldId = 'target-field-id';
            const mockFilterGroupId = 'filter-group-id';
            const flatFieldMetadataMapsWithRelation = {
                byUniversalIdentifier: {
                    'relation-universal-id': {
                        id: relationFieldId,
                        name: 'company',
                        type: _types.FieldMetadataType.RELATION,
                        label: 'Company',
                        options: null,
                        universalIdentifier: 'relation-universal-id'
                    },
                    'target-universal-id': {
                        id: targetFieldId,
                        name: 'name',
                        type: _types.FieldMetadataType.TEXT,
                        label: 'Name',
                        options: null,
                        universalIdentifier: 'target-universal-id'
                    }
                },
                universalIdentifierById: {
                    [relationFieldId]: 'relation-universal-id',
                    [targetFieldId]: 'target-universal-id'
                },
                universalIdentifiersByApplicationId: {}
            };
            const mockView = {
                id: mockViewId,
                name: 'People at Acme',
                objectMetadataId: mockObjectMetadataId,
                type: _types.ViewType.TABLE,
                visibility: _types.ViewVisibility.WORKSPACE,
                viewFilters: [
                    {
                        id: 'filter-id',
                        fieldMetadataId: relationFieldId,
                        operand: _types.ViewFilterOperand.CONTAINS,
                        value: 'Acme',
                        viewFilterGroupId: mockFilterGroupId,
                        subFieldName: null,
                        relationTargetFieldMetadataId: targetFieldId
                    }
                ],
                viewFilterGroups: [
                    {
                        id: mockFilterGroupId,
                        parentViewFilterGroupId: null,
                        logicalOperator: _types.ViewFilterGroupLogicalOperator.AND
                    }
                ],
                viewSorts: []
            };
            viewService.findByIdWithRelations.mockResolvedValue(mockView);
            flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: mockFlatObjectMetadataMaps,
                flatFieldMetadataMaps: flatFieldMetadataMapsWithRelation
            });
            const result = await viewQueryParamsService.resolveViewToQueryParams(mockViewId, mockWorkspaceId);
            // Filter is nested under the relation field name, not flattened
            // against the FK column.
            expect(result.filter).toEqual({
                and: [
                    {
                        company: {
                            name: {
                                ilike: '%Acme%'
                            }
                        }
                    }
                ]
            });
        });
    });
});

//# sourceMappingURL=view-query-params.service.spec.js.map