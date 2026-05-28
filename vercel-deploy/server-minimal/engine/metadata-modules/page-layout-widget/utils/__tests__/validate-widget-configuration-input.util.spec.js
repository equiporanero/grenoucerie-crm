"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _widgetconfigurationtestdataconstants = require("test/integration/constants/widget-configuration-test-data.constants");
const _widgetconfigurationtypetype = require("../../enums/widget-configuration-type.type");
const _validatewidgetconfigurationinpututil = require("../validate-widget-configuration-input.util");
describe('validateWidgetConfigurationInput', ()=>{
    describe('IFRAME widget', ()=>{
        it('should not throw for valid iframe configuration', ()=>{
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: _widgetconfigurationtestdataconstants.TEST_IFRAME_CONFIG
                })).not.toThrow();
        });
        it('should throw error for invalid URL', ()=>{
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: {
                        ..._widgetconfigurationtestdataconstants.INVALID_IFRAME_CONFIG_BAD_URL,
                        configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.IFRAME
                    }
                })).toThrow(/url must be a URL address/);
        });
        it('should throw error for empty URL', ()=>{
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: {
                        ..._widgetconfigurationtestdataconstants.INVALID_IFRAME_CONFIG_EMPTY_URL,
                        configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.IFRAME
                    }
                })).toThrow(/url must be a URL address/);
        });
    });
    describe('STANDALONE_RICH_TEXT widget', ()=>{
        it('should not throw for valid standalone rich text configuration', ()=>{
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: _widgetconfigurationtestdataconstants.TEST_STANDALONE_RICH_TEXT_CONFIG
                })).not.toThrow();
        });
        it('should not throw for minimal standalone rich text configuration', ()=>{
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: _widgetconfigurationtestdataconstants.TEST_STANDALONE_RICH_TEXT_CONFIG_MINIMAL
                })).not.toThrow();
        });
        it('should throw error for missing body', ()=>{
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: {
                        ..._widgetconfigurationtestdataconstants.INVALID_STANDALONE_RICH_TEXT_CONFIG_MISSING_BODY,
                        configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT
                    }
                })).toThrow(/body/);
        });
        it('should throw error when body is wrong type', ()=>{
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: {
                        ..._widgetconfigurationtestdataconstants.INVALID_STANDALONE_RICH_TEXT_CONFIG_BODY_WRONG_TYPE,
                        configurationType: _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT
                    }
                })).toThrow();
        });
    });
    describe('GRAPH widget', ()=>{
        describe('AGGREGATE_CHART graph', ()=>{
            it('should not throw for full aggregate chart configuration', ()=>{
                expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                        configuration: _widgetconfigurationtestdataconstants.TEST_NUMBER_CHART_CONFIG
                    })).not.toThrow();
            });
            it('should not throw for minimal aggregate chart configuration', ()=>{
                expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                        configuration: _widgetconfigurationtestdataconstants.TEST_NUMBER_CHART_CONFIG_MINIMAL
                    })).not.toThrow();
            });
            it('should throw error for partial aggregate chart configuration with missing required fields', ()=>{
                expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                        configuration: _widgetconfigurationtestdataconstants.INVALID_NUMBER_CHART_CONFIG_MISSING_FIELDS
                    })).toThrow(/aggregateFieldMetadataId.*aggregateOperation/);
            });
            it('should throw error for invalid UUID', ()=>{
                expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                        configuration: _widgetconfigurationtestdataconstants.INVALID_NUMBER_CHART_CONFIG_BAD_UUID
                    })).toThrow(/aggregateFieldMetadataId must be a UUID/);
            });
        });
        describe('BAR_CHART graph', ()=>{
            describe('VERTICAL layout', ()=>{
                it('should not throw for full vertical bar chart configuration', ()=>{
                    expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                            configuration: _widgetconfigurationtestdataconstants.TEST_VERTICAL_BAR_CHART_CONFIG
                        })).not.toThrow();
                });
                it('should not throw for minimal vertical bar chart configuration', ()=>{
                    expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                            configuration: _widgetconfigurationtestdataconstants.TEST_VERTICAL_BAR_CHART_CONFIG_MINIMAL
                        })).not.toThrow();
                });
                it('should throw error for partial vertical bar chart configuration with missing required fields', ()=>{
                    expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                            configuration: _widgetconfigurationtestdataconstants.INVALID_VERTICAL_BAR_CHART_CONFIG_MISSING_GROUP_BY
                        })).toThrow(/primaryAxisGroupByFieldMetadataId/);
                });
            });
            describe('HORIZONTAL layout', ()=>{
                it('should not throw for full horizontal bar chart configuration', ()=>{
                    expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                            configuration: _widgetconfigurationtestdataconstants.TEST_HORIZONTAL_BAR_CHART_CONFIG
                        })).not.toThrow();
                });
                it('should not throw for minimal horizontal bar chart configuration', ()=>{
                    expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                            configuration: _widgetconfigurationtestdataconstants.TEST_HORIZONTAL_BAR_CHART_CONFIG_MINIMAL
                        })).not.toThrow();
                });
                it('should throw error for partial horizontal bar chart configuration with missing required fields', ()=>{
                    expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                            configuration: _widgetconfigurationtestdataconstants.INVALID_HORIZONTAL_BAR_CHART_CONFIG_MISSING_GROUP_BY
                        })).toThrow(/primaryAxisGroupByFieldMetadataId/);
                });
            });
        });
        describe('PIE_CHART graph', ()=>{
            it('should not throw for pie chart configuration', ()=>{
                expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                        configuration: _widgetconfigurationtestdataconstants.TEST_PIE_CHART_CONFIG
                    })).not.toThrow();
            });
        });
        describe('LINE_CHART graph', ()=>{
            it('should not throw for line chart configuration', ()=>{
                expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                        configuration: _widgetconfigurationtestdataconstants.TEST_LINE_CHART_CONFIG
                    })).not.toThrow();
            });
        });
        describe('GAUGE_CHART graph', ()=>{
            it('should not throw for gauge chart configuration', ()=>{
                expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                        configuration: _widgetconfigurationtestdataconstants.TEST_GAUGE_CHART_CONFIG
                    })).not.toThrow();
            });
        });
    });
    describe('Edge cases', ()=>{
        it('should throw error for null configuration', ()=>{
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: null
                })).toThrow('Invalid configuration: not an object');
        });
        it('should throw error for undefined configuration', ()=>{
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: undefined
                })).toThrow('Invalid configuration: not an object');
        });
        it('should throw error for non-object configuration', ()=>{
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: 'string'
                })).toThrow('Invalid configuration: not an object');
        });
        it('should throw error for missing configurationType', ()=>{
            const configuration = {
                someField: 'value'
            };
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: configuration
                })).toThrow('Invalid configuration: missing configuration type');
        });
        it('should throw error for unsupported configurationType', ()=>{
            const configuration = {
                configurationType: 'UNSUPPORTED_TYPE',
                someField: 'value'
            };
            expect(()=>(0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
                    configuration: configuration
                })).toThrow(/Invalid configuration type: UNSUPPORTED_TYPE/);
        });
    });
});

//# sourceMappingURL=validate-widget-configuration-input.util.spec.js.map