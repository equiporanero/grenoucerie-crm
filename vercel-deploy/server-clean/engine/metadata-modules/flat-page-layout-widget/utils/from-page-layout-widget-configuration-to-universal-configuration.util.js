"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromPageLayoutWidgetConfigurationToUniversalConfiguration", {
    enumerable: true,
    get: function() {
        return fromPageLayoutWidgetConfigurationToUniversalConfiguration;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _widgetconfigurationtypetype = require("../../page-layout-widget/enums/widget-configuration-type.type");
const getFieldMetadataUniversalIdentifier = ({ fieldMetadataId, fieldMetadataUniversalIdentifierById, shouldThrowOnMissingIdentifier })=>{
    const universalIdentifier = fieldMetadataUniversalIdentifierById[fieldMetadataId];
    if (!(0, _utils.isDefined)(universalIdentifier)) {
        if (shouldThrowOnMissingIdentifier) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`Field metadata universal identifier not found for id: ${fieldMetadataId}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND);
        }
        return null;
    }
    return universalIdentifier;
};
const convertChartFilterToUniversalFilter = ({ filter, fieldMetadataUniversalIdentifierById })=>{
    if (!(0, _utils.isDefined)(filter)) {
        return undefined;
    }
    return {
        ...filter,
        recordFilters: filter.recordFilters?.map(({ fieldMetadataId, ...rest })=>({
                ...rest,
                fieldMetadataUniversalIdentifier: getFieldMetadataUniversalIdentifier({
                    fieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier: false
                })
            }))
    };
};
const fromPageLayoutWidgetConfigurationToUniversalConfiguration = ({ configuration, fieldMetadataUniversalIdentifierById, frontComponentUniversalIdentifierById = {}, viewFieldGroupUniversalIdentifierById: _viewFieldGroupUniversalIdentifierById = {}, viewUniversalIdentifierById = {}, shouldThrowOnMissingIdentifier = false })=>{
    switch(configuration.configurationType){
        case _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART:
            {
                const { aggregateFieldMetadataId, ratioAggregateConfig, filter, ...rest } = configuration;
                const aggregateFieldMetadataUniversalIdentifier = getFieldMetadataUniversalIdentifier({
                    fieldMetadataId: aggregateFieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                });
                const universalRatioAggregateConfig = (0, _utils.isDefined)(ratioAggregateConfig) ? {
                    optionValue: ratioAggregateConfig.optionValue,
                    fieldMetadataUniversalIdentifier: getFieldMetadataUniversalIdentifier({
                        fieldMetadataId: ratioAggregateConfig.fieldMetadataId,
                        fieldMetadataUniversalIdentifierById,
                        shouldThrowOnMissingIdentifier
                    })
                } : undefined;
                return {
                    ...rest,
                    aggregateFieldMetadataUniversalIdentifier,
                    ratioAggregateConfig: universalRatioAggregateConfig,
                    filter: convertChartFilterToUniversalFilter({
                        filter,
                        fieldMetadataUniversalIdentifierById,
                        shouldThrowOnMissingIdentifier
                    })
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.GAUGE_CHART:
            {
                const { aggregateFieldMetadataId, filter, ...rest } = configuration;
                const aggregateFieldMetadataUniversalIdentifier = getFieldMetadataUniversalIdentifier({
                    fieldMetadataId: aggregateFieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                });
                return {
                    ...rest,
                    aggregateFieldMetadataUniversalIdentifier,
                    filter: convertChartFilterToUniversalFilter({
                        filter,
                        fieldMetadataUniversalIdentifierById,
                        shouldThrowOnMissingIdentifier
                    })
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART:
            {
                const { aggregateFieldMetadataId, groupByFieldMetadataId, filter, ...rest } = configuration;
                const aggregateFieldMetadataUniversalIdentifier = getFieldMetadataUniversalIdentifier({
                    fieldMetadataId: aggregateFieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                });
                const groupByFieldMetadataUniversalIdentifier = getFieldMetadataUniversalIdentifier({
                    fieldMetadataId: groupByFieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                });
                return {
                    ...rest,
                    aggregateFieldMetadataUniversalIdentifier,
                    groupByFieldMetadataUniversalIdentifier,
                    filter: convertChartFilterToUniversalFilter({
                        filter,
                        fieldMetadataUniversalIdentifierById,
                        shouldThrowOnMissingIdentifier
                    })
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART:
            {
                const { aggregateFieldMetadataId, primaryAxisGroupByFieldMetadataId, secondaryAxisGroupByFieldMetadataId, filter, ...rest } = configuration;
                const aggregateFieldMetadataUniversalIdentifier = getFieldMetadataUniversalIdentifier({
                    fieldMetadataId: aggregateFieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                });
                const primaryAxisGroupByFieldMetadataUniversalIdentifier = getFieldMetadataUniversalIdentifier({
                    fieldMetadataId: primaryAxisGroupByFieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                });
                const secondaryAxisGroupByFieldMetadataUniversalIdentifier = (0, _utils.isDefined)(secondaryAxisGroupByFieldMetadataId) ? getFieldMetadataUniversalIdentifier({
                    fieldMetadataId: secondaryAxisGroupByFieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                }) : undefined;
                return {
                    ...rest,
                    aggregateFieldMetadataUniversalIdentifier,
                    primaryAxisGroupByFieldMetadataUniversalIdentifier,
                    secondaryAxisGroupByFieldMetadataUniversalIdentifier,
                    filter: convertChartFilterToUniversalFilter({
                        filter,
                        fieldMetadataUniversalIdentifierById,
                        shouldThrowOnMissingIdentifier
                    })
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART:
            {
                const { aggregateFieldMetadataId, primaryAxisGroupByFieldMetadataId, secondaryAxisGroupByFieldMetadataId, filter, ...rest } = configuration;
                const aggregateFieldMetadataUniversalIdentifier = getFieldMetadataUniversalIdentifier({
                    fieldMetadataId: aggregateFieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                });
                const primaryAxisGroupByFieldMetadataUniversalIdentifier = getFieldMetadataUniversalIdentifier({
                    fieldMetadataId: primaryAxisGroupByFieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                });
                const secondaryAxisGroupByFieldMetadataUniversalIdentifier = (0, _utils.isDefined)(secondaryAxisGroupByFieldMetadataId) ? getFieldMetadataUniversalIdentifier({
                    fieldMetadataId: secondaryAxisGroupByFieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                }) : undefined;
                return {
                    ...rest,
                    aggregateFieldMetadataUniversalIdentifier,
                    primaryAxisGroupByFieldMetadataUniversalIdentifier,
                    secondaryAxisGroupByFieldMetadataUniversalIdentifier,
                    filter: convertChartFilterToUniversalFilter({
                        filter,
                        fieldMetadataUniversalIdentifierById,
                        shouldThrowOnMissingIdentifier
                    })
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS:
            {
                const { viewId, newFieldDefaultVisibility, ...rest } = configuration;
                let viewUniversalIdentifier = null;
                if ((0, _utils.isDefined)(viewId)) {
                    viewUniversalIdentifier = viewUniversalIdentifierById[viewId] ?? null;
                    if (!(0, _utils.isDefined)(viewUniversalIdentifier) && shouldThrowOnMissingIdentifier) {
                        throw new _flatentitymapsexception.FlatEntityMapsException(`View universal identifier not found for id: ${viewId}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND);
                    }
                }
                return {
                    ...rest,
                    newFieldDefaultVisibility,
                    viewUniversalIdentifier
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.RECORD_TABLE:
            {
                const { viewId, ...rest } = configuration;
                let viewUniversalIdentifier = undefined;
                if ((0, _utils.isDefined)(viewId)) {
                    viewUniversalIdentifier = viewUniversalIdentifierById[viewId] ?? undefined;
                    if (!(0, _utils.isDefined)(viewUniversalIdentifier) && shouldThrowOnMissingIdentifier) {
                        throw new _flatentitymapsexception.FlatEntityMapsException(`View universal identifier not found for id: ${viewId}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND);
                    }
                }
                return {
                    ...rest,
                    viewId: viewUniversalIdentifier
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.FRONT_COMPONENT:
            {
                const { frontComponentId, configurationType } = configuration;
                const frontComponentUniversalIdentifier = frontComponentUniversalIdentifierById[frontComponentId] ?? null;
                if (!(0, _utils.isDefined)(frontComponentUniversalIdentifier) && shouldThrowOnMissingIdentifier) {
                    throw new _flatentitymapsexception.FlatEntityMapsException(`Front component universal identifier not found for id: ${frontComponentId}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND);
                }
                return {
                    configurationType,
                    frontComponentUniversalIdentifier
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.FIELD:
            {
                const { fieldMetadataId, fieldDisplayMode, configurationType, viewId } = configuration;
                const fieldMetadataUniversalIdentifier = getFieldMetadataUniversalIdentifier({
                    fieldMetadataId,
                    fieldMetadataUniversalIdentifierById,
                    shouldThrowOnMissingIdentifier
                });
                let viewUniversalIdentifier = undefined;
                if ((0, _utils.isDefined)(viewId)) {
                    viewUniversalIdentifier = viewUniversalIdentifierById[viewId] ?? undefined;
                    if (!(0, _utils.isDefined)(viewUniversalIdentifier) && shouldThrowOnMissingIdentifier) {
                        throw new _flatentitymapsexception.FlatEntityMapsException(`View universal identifier not found for id: ${viewId}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND);
                    }
                }
                return {
                    configurationType,
                    fieldMetadataId: fieldMetadataUniversalIdentifier ?? fieldMetadataId,
                    fieldDisplayMode,
                    viewId: viewUniversalIdentifier
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.VIEW:
        case _widgetconfigurationtypetype.WidgetConfigurationType.TIMELINE:
        case _widgetconfigurationtypetype.WidgetConfigurationType.TASKS:
        case _widgetconfigurationtypetype.WidgetConfigurationType.NOTES:
        case _widgetconfigurationtypetype.WidgetConfigurationType.FILES:
        case _widgetconfigurationtypetype.WidgetConfigurationType.EMAILS:
        case _widgetconfigurationtypetype.WidgetConfigurationType.CALENDAR:
        case _widgetconfigurationtypetype.WidgetConfigurationType.FIELD_RICH_TEXT:
        case _widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW:
        case _widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW_VERSION:
        case _widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW_RUN:
        case _widgetconfigurationtypetype.WidgetConfigurationType.IFRAME:
        case _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT:
        case _widgetconfigurationtypetype.WidgetConfigurationType.EMAIL_THREAD:
            return configuration;
    }
};

//# sourceMappingURL=from-page-layout-widget-configuration-to-universal-configuration.util.js.map