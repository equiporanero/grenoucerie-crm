"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _barchartgroupmodeenum = require("../../../../../engine/metadata-modules/page-layout-widget/enums/bar-chart-group-mode.enum");
const _barchartlayoutenum = require("../../../../../engine/metadata-modules/page-layout-widget/enums/bar-chart-layout.enum");
const _widgetconfigurationtypetype = require("../../../../../engine/metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _barchartmaximumnumberofbarsconstant = require("../../constants/bar-chart-maximum-number-of-bars.constant");
const _barchartdataservice = require("../bar-chart-data.service");
const _chartdataqueryservice = require("../chart-data-query.service");
describe('BarChartDataService', ()=>{
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
    const mockAggregateField = {
        id: 'aggregate-field-id',
        name: 'amount',
        label: 'Amount',
        type: _types.FieldMetadataType.NUMBER
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
                    'aggregate-field-universal-id': {
                        ...mockAggregateField,
                        universalIdentifier: 'aggregate-field-universal-id'
                    },
                    'select-field-universal-id': {
                        ...mockSelectField,
                        universalIdentifier: 'select-field-universal-id'
                    }
                },
                universalIdentifierById: {
                    [mockGroupByField.id]: 'group-by-field-universal-id',
                    [mockAggregateField.id]: 'aggregate-field-universal-id',
                    [mockSelectField.id]: 'select-field-universal-id'
                },
                universalIdentifiersByApplicationId: {}
            }
        });
        const module = await _testing.Test.createTestingModule({
            providers: [
                _barchartdataservice.BarChartDataService,
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
        service = module.get(_barchartdataservice.BarChartDataService);
    });
    describe('getBarChartData - One dimensional', ()=>{
        const baseConfiguration = {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
            primaryAxisGroupByFieldMetadataId: mockGroupByField.id,
            aggregateFieldMetadataId: mockAggregateField.id,
            aggregateOperation: _types.AggregateOperations.COUNT,
            layout: _barchartlayoutenum.BarChartLayout.VERTICAL
        };
        it('should transform simple one-dimensional bar chart data', async ()=>{
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
            const result = await service.getBarChartData({
                workspaceId,
                objectMetadataId,
                configuration: baseConfiguration,
                authContext: mockAuthContext
            });
            expect(result.data).toHaveLength(2);
            expect(result.data[0]).toEqual({
                status: 'Active',
                amount: 10
            });
            expect(result.data[1]).toEqual({
                status: 'Inactive',
                amount: 5
            });
            expect(result.indexBy).toBe('status');
            expect(result.keys).toEqual([
                'amount'
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
            const result = await service.getBarChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...baseConfiguration,
                    isCumulative: true
                },
                authContext: mockAuthContext
            });
            expect(result.data).toHaveLength(3);
            expect(result.data[0].amount).toBe(10);
            expect(result.data[1].amount).toBe(30);
            expect(result.data[2].amount).toBe(60);
        });
        it('should handle null values when omitNullValues is true', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        null
                    ],
                    aggregateValue: 5
                },
                {
                    groupByDimensionValues: [
                        'Active'
                    ],
                    aggregateValue: 10
                }
            ]);
            const result = await service.getBarChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...baseConfiguration,
                    omitNullValues: true
                },
                authContext: mockAuthContext
            });
            expect(result.data).toHaveLength(1);
            expect(result.data[0].status).toBe('Active');
        });
        it('should format null values as "Not Set" when not omitting', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        null
                    ],
                    aggregateValue: 5
                },
                {
                    groupByDimensionValues: [
                        'Active'
                    ],
                    aggregateValue: 10
                }
            ]);
            const result = await service.getBarChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...baseConfiguration,
                    omitNullValues: false
                },
                authContext: mockAuthContext
            });
            expect(result.data).toHaveLength(2);
            expect(result.data[0].status).toBe('Not Set');
        });
        it('should detect too many groups', async ()=>{
            const manyResults = Array.from({
                length: _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS + 5
            }, (_, i)=>({
                    groupByDimensionValues: [
                        `Group ${i}`
                    ],
                    aggregateValue: i
                }));
            mockExecuteGroupByQuery.mockResolvedValue(manyResults);
            const result = await service.getBarChartData({
                workspaceId,
                objectMetadataId,
                configuration: baseConfiguration,
                authContext: mockAuthContext
            });
            expect(result.hasTooManyGroups).toBe(true);
            expect(result.data.length).toBeLessThanOrEqual(_barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS);
        });
    });
    describe('getBarChartData - Two dimensional', ()=>{
        const twoDimConfiguration = {
            configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
            primaryAxisGroupByFieldMetadataId: mockGroupByField.id,
            secondaryAxisGroupByFieldMetadataId: mockSelectField.id,
            aggregateFieldMetadataId: mockAggregateField.id,
            aggregateOperation: _types.AggregateOperations.SUM,
            layout: _barchartlayoutenum.BarChartLayout.VERTICAL,
            groupMode: _barchartgroupmodeenum.BarChartGroupMode.STACKED
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
                        'group-by-field-universal-id': {
                            ...mockGroupByField,
                            universalIdentifier: 'group-by-field-universal-id'
                        },
                        'aggregate-field-universal-id': {
                            ...mockAggregateField,
                            universalIdentifier: 'aggregate-field-universal-id'
                        },
                        'select-field-universal-id': {
                            ...mockSelectField,
                            universalIdentifier: 'select-field-universal-id'
                        }
                    },
                    universalIdentifierById: {
                        [mockGroupByField.id]: 'group-by-field-universal-id',
                        [mockAggregateField.id]: 'aggregate-field-universal-id',
                        [mockSelectField.id]: 'select-field-universal-id'
                    },
                    universalIdentifiersByApplicationId: {}
                }
            });
        });
        it('should transform two-dimensional bar chart data', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'Jan',
                        'open'
                    ],
                    aggregateValue: 100
                },
                {
                    groupByDimensionValues: [
                        'Jan',
                        'closed'
                    ],
                    aggregateValue: 50
                },
                {
                    groupByDimensionValues: [
                        'Feb',
                        'open'
                    ],
                    aggregateValue: 150
                },
                {
                    groupByDimensionValues: [
                        'Feb',
                        'closed'
                    ],
                    aggregateValue: 75
                }
            ]);
            const result = await service.getBarChartData({
                workspaceId,
                objectMetadataId,
                configuration: twoDimConfiguration,
                authContext: mockAuthContext
            });
            expect(result.data).toHaveLength(2);
            expect(result.keys).toContain('Open');
            expect(result.keys).toContain('Closed');
            expect(result.series).toHaveLength(2);
        });
        it('should apply cumulative transform to two-dimensional data', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'Jan',
                        'open'
                    ],
                    aggregateValue: 10
                },
                {
                    groupByDimensionValues: [
                        'Jan',
                        'closed'
                    ],
                    aggregateValue: 10
                },
                {
                    groupByDimensionValues: [
                        'Feb',
                        'open'
                    ],
                    aggregateValue: 20
                },
                {
                    groupByDimensionValues: [
                        'Feb',
                        'closed'
                    ],
                    aggregateValue: 20
                },
                {
                    groupByDimensionValues: [
                        'Mar',
                        'open'
                    ],
                    aggregateValue: 30
                },
                {
                    groupByDimensionValues: [
                        'Mar',
                        'closed'
                    ],
                    aggregateValue: 30
                }
            ]);
            const result = await service.getBarChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    ...twoDimConfiguration,
                    isCumulative: true
                },
                authContext: mockAuthContext
            });
            expect(result.data).toHaveLength(3);
            expect(result.data[0]['Open']).toBe(10);
            expect(result.data[0]['Closed']).toBe(10);
            expect(result.data[1]['Open']).toBe(30);
            expect(result.data[1]['Closed']).toBe(30);
            expect(result.data[2]['Open']).toBe(60);
            expect(result.data[2]['Closed']).toBe(60);
        });
        it('should order keys correctly despite unordered raw results', async ()=>{
            mockExecuteGroupByQuery.mockResolvedValue([
                {
                    groupByDimensionValues: [
                        'Oct 16',
                        'open'
                    ],
                    aggregateValue: 100
                },
                {
                    groupByDimensionValues: [
                        'Oct 17',
                        'closed'
                    ],
                    aggregateValue: 200
                },
                {
                    groupByDimensionValues: [
                        'Oct 21',
                        'open'
                    ],
                    aggregateValue: 150
                },
                {
                    groupByDimensionValues: [
                        'Oct 21',
                        'closed'
                    ],
                    aggregateValue: 50
                }
            ]);
            const result = await service.getBarChartData({
                workspaceId,
                objectMetadataId,
                configuration: twoDimConfiguration,
                authContext: mockAuthContext
            });
            expect(result.keys).toContain('Open');
            expect(result.keys).toContain('Closed');
            expect(result.data).toHaveLength(3);
        });
    });
    describe('Error handling', ()=>{
        it('should throw when object metadata is not found', async ()=>{
            mockGetOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: {
                    byId: {}
                },
                flatFieldMetadataMaps: {
                    byId: {}
                }
            });
            await expect(service.getBarChartData({
                workspaceId,
                objectMetadataId: 'non-existent-id',
                configuration: {
                    configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                    primaryAxisGroupByFieldMetadataId: mockGroupByField.id,
                    aggregateFieldMetadataId: mockAggregateField.id,
                    aggregateOperation: _types.AggregateOperations.COUNT
                },
                authContext: mockAuthContext
            })).rejects.toThrow();
        });
        it('should throw when field metadata is not found', async ()=>{
            mockGetOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectMetadataMaps: {
                    byId: {
                        [objectMetadataId]: mockObjectMetadata
                    }
                },
                flatFieldMetadataMaps: {
                    byId: {}
                }
            });
            await expect(service.getBarChartData({
                workspaceId,
                objectMetadataId,
                configuration: {
                    configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART,
                    primaryAxisGroupByFieldMetadataId: 'non-existent-field',
                    aggregateFieldMetadataId: mockAggregateField.id,
                    aggregateOperation: _types.AggregateOperations.COUNT
                },
                authContext: mockAuthContext
            })).rejects.toThrow();
        });
    });
});

//# sourceMappingURL=bar-chart-data.service.spec.js.map