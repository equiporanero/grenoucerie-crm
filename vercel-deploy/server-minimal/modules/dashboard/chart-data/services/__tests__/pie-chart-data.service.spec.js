"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _widgetconfigurationtypetype = require("../../../../../engine/metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _piechartmaximumnumberofslicesconstant = require("../../constants/pie-chart-maximum-number-of-slices.constant");
const _chartdataqueryservice = require("../chart-data-query.service");
const _piechartdataservice = require("../pie-chart-data.service");
describe('PieChartDataService', ()=>{
    let service;
    let mockExecuteGroupByQuery;
    let mockGetOrRecomputeManyOrAllFlatEntityMaps;
    const workspaceId = 'test-workspace-id';
    const mockAuthContext = {
        type: 'system',
        workspace: {
            id: workspaceId
        }
    };
    const objectMetadataId = 'test-object-id';
    const mockGroupByField = {
        id: 'group-by-field-id',
        name: 'status',
        label: 'Status',
        type: _types.FieldMetadataType.TEXT
    };
    const mockSelectField = {
        id: 'select-field-id',
        name: 'stage',
        label: 'Stage',
        type: _types.FieldMetadataType.SELECT,
        options: [
            {
                value: 'open',
                label: 'Open',
                color: 'green',
                position: 0
            },
            {
                value: 'closed',
                label: 'Closed',
                color: 'red',
                position: 1
            }
        ]
    };
    const mockAggregateField = {
        id: 'aggregate-field-id',
        name: 'id',
        label: 'Id',
        type: _types.FieldMetadataType.UUID
    };
    const mockObjectMetadata = {
        id: objectMetadataId,
        nameSingular: 'company',
        namePlural: 'companies'
    };
    beforeEach(async ()=>{
        mockExecuteGroupByQuery = jest.fn();
        mockGetOrRecomputeManyOrAllFlatEntityMaps = jest.fn().mockResolvedValue({
            flatObjectMetadataMaps: {
                byUniversalIdentifier: {
                    'test-object-universal-id': {
                        ...mockObjectMetadata,
                        universalIdentifier: 'test-object-universal-id'
                    }
                },
                universalIdentifierById: {
                    [objectMetadataId]: 'test-object-universal-id'
                },
                universalIdentifiersByApplicationId: {}
            },
            flatFieldMetadataMaps: {
                byUniversalIdentifier: {
                    'group-by-field-universal-id': {
                        ...mockGroupByField,
                        universalIdentifier: 'group-by-field-universal-id'
                    },
                    'select-field-universal-id': {
                        ...mockSelectField,
                        universalIdentifier: 'select-field-universal-id'
                    },
                    'aggregate-field-universal-id': {
                        ...mockAggregateField,
                        universalIdentifier: 'aggregate-field-universal-id'
                    }
                },
                universalIdentifierById: {
                    [mockGroupByField.id]: 'group-by-field-universal-id',
                    [mockSelectField.id]: 'select-field-universal-id',
                    [mockAggregateField.id]: 'aggregate-field-universal-id'
                },
                universalIdentifiersByApplicationId: {}
            }
        });
        const module = await _testing.Test.createTestingModule({
            providers: [
                _piechartdataservice.PieChartDataService,
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: {
                        getOrRecomputeManyOrAllFlatEntityMaps: mockGetOrRecomputeManyOrAllFlatEntityMaps
                    }
                },
                {
                    provide: _chartdataqueryservice.ChartDataQueryService,
                    useValue: {
                        executeGroupByQuery: mockExecuteGroupByQuery
                    }
                }
            ]
        }).compile();
        service = module.get(_piechartdataservice.PieChartDataService);
    });
    describe('getPieChartData', ()=>{
        const baseConfiguration = {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART,
            groupByFieldMetadataId: mockGroupByField.id,
            aggregateFieldMetadataId: mockAggregateField.id,
            aggregateOperation: _types.AggregateOperations.COUNT,
            displayLegend: true
        };
        it('should transform simple pie chart data', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'Active'
                    ],
                    aggregateValue: 10
                },
                {
                    groupByDimensionValues: [
                        'Inactive'
                    ],
                    aggregateValue: 5
                }
            ]);
            const result = await service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: baseConfiguration,
                authContext: mockAuthContext
            });
            expect(result.data).toHaveLength(2);
            expect(result.data[0]).toEqual({
                id: 'Active',
                value: 10
            });
            expect(result.data[1]).toEqual({
                id: 'Inactive',
                value: 5
            });
            expect(result.showLegend).toBe(true);
            expect(result.hasTooManyGroups).toBe(false);
        });
        it('should keep null group buckets aligned with their aggregate values', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        null
                    ],
                    aggregateValue: 2
                },
                {
                    groupByDimensionValues: [
                        'Active'
                    ],
                    aggregateValue: 5
                }
            ]);
            const result = await service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: baseConfiguration,
                authContext: mockAuthContext
            });
            expect(result.data).toEqual([
                {
                    id: 'Not Set',
                    value: 2
                },
                {
                    id: 'Active',
                    value: 5
                }
            ]);
            expect(result.formattedToRawLookup?.['Not Set']).toBeUndefined();
            expect(result.formattedToRawLookup?.['Active']).toBe('Active');
        });
        it('should hide empty category when hideEmptyCategory is true', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        null
                    ],
                    aggregateValue: 2
                },
                {
                    groupByDimensionValues: [
                        'Active'
                    ],
                    aggregateValue: 5
                }
            ]);
            const result = await service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...baseConfiguration,
                    hideEmptyCategory: true
                },
                authContext: mockAuthContext
            });
            expect(result.data).toHaveLength(1);
            expect(result.data[0].id).toBe('Active');
        });
        it('should flag too many groups and limit slices', async ()=>{
            const manyResults = Array.from({
                length: _piechartmaximumnumberofslicesconstant.PIE_CHART_MAXIMUM_NUMBER_OF_SLICES + 5
            }, (_, index)=>({
                    groupByDimensionValues: [
                        `Group ${index}`
                    ],
                    aggregateValue: index + 1
                }));
            mockExecuteGroupByQuery.mockResolvedValue(manyResults);
            const result = await service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: baseConfiguration,
                authContext: mockAuthContext
            });
            expect(result.hasTooManyGroups).toBe(true);
            expect(result.data).toHaveLength(_piechartmaximumnumberofslicesconstant.PIE_CHART_MAXIMUM_NUMBER_OF_SLICES);
        });
        it('should respect displayLegend configuration', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'Active'
                    ],
                    aggregateValue: 10
                }
            ]);
            const result = await service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...baseConfiguration,
                    displayLegend: false
                },
                authContext: mockAuthContext
            });
            expect(result.showLegend).toBe(false);
        });
        it('should respect displayDataLabel configuration', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'Active'
                    ],
                    aggregateValue: 10
                }
            ]);
            const result = await service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...baseConfiguration,
                    displayDataLabel: true
                },
                authContext: mockAuthContext
            });
            expect(result.showDataLabels).toBe(true);
        });
        it('should respect showCenterMetric configuration', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'Active'
                    ],
                    aggregateValue: 10
                }
            ]);
            const result = await service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...baseConfiguration,
                    showCenterMetric: false
                },
                authContext: mockAuthContext
            });
            expect(result.showCenterMetric).toBe(false);
        });
        it('should format select field values using option labels', async ()=>{
            mockGetOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: {
                    byUniversalIdentifier: {
                        'test-object-universal-id': {
                            ...mockObjectMetadata,
                            universalIdentifier: 'test-object-universal-id'
                        }
                    },
                    universalIdentifierById: {
                        [objectMetadataId]: 'test-object-universal-id'
                    },
                    universalIdentifiersByApplicationId: {}
                },
                flatFieldMetadataMaps: {
                    byUniversalIdentifier: {
                        'select-field-universal-id': {
                            ...mockSelectField,
                            universalIdentifier: 'select-field-universal-id'
                        },
                        'aggregate-field-universal-id': {
                            ...mockAggregateField,
                            universalIdentifier: 'aggregate-field-universal-id'
                        }
                    },
                    universalIdentifierById: {
                        [mockSelectField.id]: 'select-field-universal-id',
                        [mockAggregateField.id]: 'aggregate-field-universal-id'
                    },
                    universalIdentifiersByApplicationId: {}
                }
            });
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'open'
                    ],
                    aggregateValue: 10
                },
                {
                    groupByDimensionValues: [
                        'closed'
                    ],
                    aggregateValue: 5
                }
            ]);
            const result = await service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...baseConfiguration,
                    groupByFieldMetadataId: mockSelectField.id
                },
                authContext: mockAuthContext
            });
            expect(result.data[0].id).toBe('Open');
            expect(result.data[1].id).toBe('Closed');
        });
    });
    describe('Error handling', ()=>{
        it('should throw when configuration type is not PIE_CHART', async ()=>{
            await expect(service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                    groupByFieldMetadataId: mockGroupByField.id,
                    aggregateFieldMetadataId: mockAggregateField.id,
                    aggregateOperation: _types.AggregateOperations.COUNT
                },
                authContext: mockAuthContext
            })).rejects.toThrow();
        });
        it('should throw when object metadata is not found', async ()=>{
            mockGetOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: {
                    byUniversalIdentifier: {},
                    universalIdentifierById: {},
                    universalIdentifiersByApplicationId: {}
                },
                flatFieldMetadataMaps: {
                    byUniversalIdentifier: {},
                    universalIdentifierById: {},
                    universalIdentifiersByApplicationId: {}
                }
            });
            await expect(service.getPieChartData({
                workspaceId,
                objectMetadataId: 'non-existent-id',
                configuration: {
                    configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART,
                    groupByFieldMetadataId: mockGroupByField.id,
                    aggregateFieldMetadataId: mockAggregateField.id,
                    aggregateOperation: _types.AggregateOperations.COUNT
                },
                authContext: mockAuthContext
            })).rejects.toThrow();
        });
        it('should throw when field metadata is not found', async ()=>{
            mockGetOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: {
                    byUniversalIdentifier: {
                        'test-object-universal-id': {
                            ...mockObjectMetadata,
                            universalIdentifier: 'test-object-universal-id'
                        }
                    },
                    universalIdentifierById: {
                        [objectMetadataId]: 'test-object-universal-id'
                    },
                    universalIdentifiersByApplicationId: {}
                },
                flatFieldMetadataMaps: {
                    byUniversalIdentifier: {},
                    universalIdentifierById: {},
                    universalIdentifiersByApplicationId: {}
                }
            });
            await expect(service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART,
                    groupByFieldMetadataId: 'non-existent-field',
                    aggregateFieldMetadataId: mockAggregateField.id,
                    aggregateOperation: _types.AggregateOperations.COUNT
                },
                authContext: mockAuthContext
            })).rejects.toThrow();
        });
    });
    describe('Boolean field formatting', ()=>{
        const booleanField = {
            id: 'boolean-field-id',
            name: 'isActive',
            label: 'Is Active',
            type: _types.FieldMetadataType.BOOLEAN
        };
        beforeEach(()=>{
            mockGetOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: {
                    byUniversalIdentifier: {
                        'test-object-universal-id': {
                            ...mockObjectMetadata,
                            universalIdentifier: 'test-object-universal-id'
                        }
                    },
                    universalIdentifierById: {
                        [objectMetadataId]: 'test-object-universal-id'
                    },
                    universalIdentifiersByApplicationId: {}
                },
                flatFieldMetadataMaps: {
                    byUniversalIdentifier: {
                        'boolean-field-universal-id': {
                            ...booleanField,
                            universalIdentifier: 'boolean-field-universal-id'
                        },
                        'aggregate-field-universal-id': {
                            ...mockAggregateField,
                            universalIdentifier: 'aggregate-field-universal-id'
                        }
                    },
                    universalIdentifierById: {
                        [booleanField.id]: 'boolean-field-universal-id',
                        [mockAggregateField.id]: 'aggregate-field-universal-id'
                    },
                    universalIdentifiersByApplicationId: {}
                }
            });
        });
        it('should format boolean values as Yes/No', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        true
                    ],
                    aggregateValue: 10
                },
                {
                    groupByDimensionValues: [
                        false
                    ],
                    aggregateValue: 5
                }
            ]);
            const result = await service.getPieChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART,
                    groupByFieldMetadataId: booleanField.id,
                    aggregateFieldMetadataId: mockAggregateField.id,
                    aggregateOperation: _types.AggregateOperations.COUNT
                },
                authContext: mockAuthContext
            });
            expect(result.data[0].id).toBe('Yes');
            expect(result.data[1].id).toBe('No');
        });
    });
});

//# sourceMappingURL=pie-chart-data.service.spec.js.map