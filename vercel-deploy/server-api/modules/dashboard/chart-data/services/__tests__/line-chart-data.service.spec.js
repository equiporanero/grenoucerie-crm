"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _widgetconfigurationtypetype = require("../../../../../engine/metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _linechartmaximumnumberofdatapointsconstant = require("../../constants/line-chart-maximum-number-of-data-points.constant");
const _chartdataqueryservice = require("../chart-data-query.service");
const _linechartdataservice = require("../line-chart-data.service");
describe('LineChartDataService', ()=>{
    let service;
    let mockExecuteGroupByQuery;
    const workspaceId = 'test-workspace-id';
    const mockAuthContext = {
        type: 'system',
        workspace: {
            id: workspaceId
        }
    };
    const objectMetadataId = 'test-object-id';
    const mockGroupByFieldX = {
        id: 'group-by-field-id',
        name: 'createdAt',
        label: 'Created At',
        type: _types.FieldMetadataType.DATE_TIME
    };
    const mockGroupByFieldXText = {
        id: 'group-by-field-text-id',
        name: 'stage',
        label: 'Stage',
        type: _types.FieldMetadataType.TEXT
    };
    const mockGroupByFieldY = {
        id: 'secondary-field-id',
        name: 'stage',
        label: 'Stage',
        type: _types.FieldMetadataType.TEXT
    };
    const mockAggregateField = {
        id: 'aggregate-field-id',
        name: 'amount',
        label: 'Amount',
        type: _types.FieldMetadataType.NUMBER
    };
    const mockObjectMetadata = {
        id: objectMetadataId,
        nameSingular: 'opportunity',
        namePlural: 'opportunities'
    };
    beforeEach(async ()=>{
        mockExecuteGroupByQuery = jest.fn();
        const module = await _testing.Test.createTestingModule({
            providers: [
                _linechartdataservice.LineChartDataService,
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: {
                        getOrRecomputeManyOrAllFlatEntityMaps: jest.fn().mockResolvedValue({
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
                                    'group-by-field-x-universal-id': {
                                        ...mockGroupByFieldX,
                                        universalIdentifier: 'group-by-field-x-universal-id'
                                    },
                                    'group-by-field-x-text-universal-id': {
                                        ...mockGroupByFieldXText,
                                        universalIdentifier: 'group-by-field-x-text-universal-id'
                                    },
                                    'group-by-field-y-universal-id': {
                                        ...mockGroupByFieldY,
                                        universalIdentifier: 'group-by-field-y-universal-id'
                                    },
                                    'aggregate-field-universal-id': {
                                        ...mockAggregateField,
                                        universalIdentifier: 'aggregate-field-universal-id'
                                    }
                                },
                                universalIdentifierById: {
                                    [mockGroupByFieldX.id]: 'group-by-field-x-universal-id',
                                    [mockGroupByFieldXText.id]: 'group-by-field-x-text-universal-id',
                                    [mockGroupByFieldY.id]: 'group-by-field-y-universal-id',
                                    [mockAggregateField.id]: 'aggregate-field-universal-id'
                                },
                                universalIdentifiersByApplicationId: {}
                            }
                        })
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
        service = module.get(_linechartdataservice.LineChartDataService);
    });
    describe('getLineChartData - One dimensional', ()=>{
        const baseConfiguration = {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART,
            primaryAxisGroupByFieldMetadataId: mockGroupByFieldXText.id,
            aggregateFieldMetadataId: mockAggregateField.id,
            aggregateOperation: _types.AggregateOperations.SUM
        };
        it('should transform simple one-dimensional line chart data', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'Qualification'
                    ],
                    aggregateValue: 150000
                },
                {
                    groupByDimensionValues: [
                        'Proposal'
                    ],
                    aggregateValue: 280000
                },
                {
                    groupByDimensionValues: [
                        'Closed Won'
                    ],
                    aggregateValue: 450000
                }
            ]);
            const result = await service.getLineChartData({
                workspaceId,
                objectMetadataId,
                configuration: baseConfiguration,
                authContext: mockAuthContext
            });
            expect(result.series).toHaveLength(1);
            expect(result.series[0].data).toEqual([
                {
                    x: 'Qualification',
                    y: 150000
                },
                {
                    x: 'Proposal',
                    y: 280000
                },
                {
                    x: 'Closed Won',
                    y: 450000
                }
            ]);
            expect(result.hasTooManyGroups).toBe(false);
        });
        it('should apply cumulative transform when isCumulative is true', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'Jan'
                    ],
                    aggregateValue: 10
                },
                {
                    groupByDimensionValues: [
                        'Feb'
                    ],
                    aggregateValue: 20
                },
                {
                    groupByDimensionValues: [
                        'Mar'
                    ],
                    aggregateValue: 30
                }
            ]);
            const result = await service.getLineChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...baseConfiguration,
                    isCumulative: true
                },
                authContext: mockAuthContext
            });
            expect(result.series[0].data).toEqual([
                {
                    x: 'Jan',
                    y: 10
                },
                {
                    x: 'Feb',
                    y: 30
                },
                {
                    x: 'Mar',
                    y: 60
                }
            ]);
        });
        it('should handle null y values by keeping running total', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'a'
                    ],
                    aggregateValue: 10
                },
                {
                    groupByDimensionValues: [
                        'b'
                    ],
                    aggregateValue: 0
                },
                {
                    groupByDimensionValues: [
                        'c'
                    ],
                    aggregateValue: 20
                }
            ]);
            const result = await service.getLineChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...baseConfiguration,
                    isCumulative: true
                },
                authContext: mockAuthContext
            });
            expect(result.series[0].data).toEqual([
                {
                    x: 'a',
                    y: 10
                },
                {
                    x: 'b',
                    y: 10
                },
                {
                    x: 'c',
                    y: 30
                }
            ]);
        });
        it('should handle empty results', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([]);
            const result = await service.getLineChartData({
                workspaceId,
                objectMetadataId,
                configuration: baseConfiguration,
                authContext: mockAuthContext
            });
            expect(result.series).toHaveLength(1);
            expect(result.series[0].data).toEqual([]);
            expect(result.hasTooManyGroups).toBe(false);
        });
        it('should detect too many data points', async ()=>{
            const manyResults = Array.from({
                length: _linechartmaximumnumberofdatapointsconstant.LINE_CHART_MAXIMUM_NUMBER_OF_DATA_POINTS + 5
            }, (_, i)=>({
                    groupByDimensionValues: [
                        `Point ${i}`
                    ],
                    aggregateValue: i * 100
                }));
            mockExecuteGroupByQuery.mockResolvedValue(manyResults);
            const result = await service.getLineChartData({
                workspaceId,
                objectMetadataId,
                configuration: baseConfiguration,
                authContext: mockAuthContext
            });
            expect(result.hasTooManyGroups).toBe(true);
        });
    });
    describe('getLineChartData - Two dimensional', ()=>{
        const twoDimConfiguration = {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART,
            primaryAxisGroupByFieldMetadataId: mockGroupByFieldX.id,
            secondaryAxisGroupByFieldMetadataId: mockGroupByFieldY.id,
            aggregateFieldMetadataId: mockAggregateField.id,
            aggregateOperation: _types.AggregateOperations.SUM
        };
        it('should create multiple series from 2D groupBy results', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        '2024-01-01',
                        'Qualification'
                    ],
                    aggregateValue: 50000
                },
                {
                    groupByDimensionValues: [
                        '2024-01-01',
                        'Proposal'
                    ],
                    aggregateValue: 75000
                },
                {
                    groupByDimensionValues: [
                        '2024-02-01',
                        'Qualification'
                    ],
                    aggregateValue: 60000
                },
                {
                    groupByDimensionValues: [
                        '2024-02-01',
                        'Proposal'
                    ],
                    aggregateValue: 90000
                }
            ]);
            const result = await service.getLineChartData({
                workspaceId,
                objectMetadataId,
                configuration: twoDimConfiguration,
                authContext: mockAuthContext
            });
            expect(result.series).toHaveLength(2);
            expect(result.series.every((s)=>s.data.length === 2)).toBe(true);
            expect(result.hasTooManyGroups).toBe(false);
        });
        it('should normalize sparse data (fill missing x values with 0)', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        '2024-01-01',
                        'Stage A'
                    ],
                    aggregateValue: 100
                },
                {
                    groupByDimensionValues: [
                        '2024-02-01',
                        'Stage A'
                    ],
                    aggregateValue: 200
                },
                {
                    groupByDimensionValues: [
                        '2024-01-01',
                        'Stage B'
                    ],
                    aggregateValue: 150
                },
                {
                    groupByDimensionValues: [
                        '2024-03-01',
                        'Stage B'
                    ],
                    aggregateValue: 250
                }
            ]);
            const result = await service.getLineChartData({
                workspaceId,
                objectMetadataId,
                configuration: twoDimConfiguration,
                authContext: mockAuthContext
            });
            const stageA = result.series.find((s)=>s.label === 'Stage A');
            expect(stageA?.data).toHaveLength(3);
            expect(stageA?.data[0].y).toBe(100);
            expect(stageA?.data[1].y).toBe(200);
            expect(stageA?.data[2].y).toBe(0);
            const stageB = result.series.find((s)=>s.label === 'Stage B');
            expect(stageB?.data).toHaveLength(3);
            expect(stageB?.data[0].y).toBe(150);
            expect(stageB?.data[1].y).toBe(0);
            expect(stageB?.data[2].y).toBe(250);
        });
        it('should apply cumulative transform to each series independently', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        '2024-01-01',
                        'A'
                    ],
                    aggregateValue: 10
                },
                {
                    groupByDimensionValues: [
                        '2024-02-01',
                        'A'
                    ],
                    aggregateValue: 20
                },
                {
                    groupByDimensionValues: [
                        '2024-01-01',
                        'B'
                    ],
                    aggregateValue: 100
                },
                {
                    groupByDimensionValues: [
                        '2024-02-01',
                        'B'
                    ],
                    aggregateValue: 200
                }
            ]);
            const result = await service.getLineChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...twoDimConfiguration,
                    isCumulative: true
                },
                authContext: mockAuthContext
            });
            const seriesA = result.series.find((s)=>s.label === 'A');
            const seriesB = result.series.find((s)=>s.label === 'B');
            expect(seriesA?.data[0].y).toBe(10);
            expect(seriesA?.data[1].y).toBe(30);
            expect(seriesB?.data[0].y).toBe(100);
            expect(seriesB?.data[1].y).toBe(300);
        });
        it('should handle empty results', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([]);
            const result = await service.getLineChartData({
                workspaceId,
                objectMetadataId,
                configuration: twoDimConfiguration,
                authContext: mockAuthContext
            });
            expect(result.series).toEqual([]);
            expect(result.hasTooManyGroups).toBe(false);
        });
        it('should skip results with missing dimension values', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        '2024-01-01'
                    ],
                    aggregateValue: 100
                },
                {
                    groupByDimensionValues: [
                        '2024-02-01',
                        'Stage A'
                    ],
                    aggregateValue: 200
                }
            ]);
            const result = await service.getLineChartData({
                workspaceId,
                objectMetadataId,
                configuration: twoDimConfiguration,
                authContext: mockAuthContext
            });
            expect(result.series).toHaveLength(1);
            expect(result.series[0].data).toHaveLength(1);
        });
    });
});

//# sourceMappingURL=line-chart-data.service.spec.js.map