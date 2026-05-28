"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUniversalConfigurationToFlatPageLayoutWidgetConfiguration", {
    enumerable: true,
    get: function() {
        return fromUniversalConfigurationToFlatPageLayoutWidgetConfiguration;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../../../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _widgetconfigurationtypetype = require("../../../../../../../metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const resolveFieldMetadataIdOrThrow = ({ fieldMetadataUniversalIdentifier, flatFieldMetadataMaps })=>{
    if (!(0, _utils.isDefined)(fieldMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Could not found any field metadata universal identifier while resolving page layout widget`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const flatFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        flatEntityMaps: flatFieldMetadataMaps,
        universalIdentifier: fieldMetadataUniversalIdentifier
    });
    if (!(0, _utils.isDefined)(flatFieldMetadata)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Field metadata not found for universal identifier: ${fieldMetadataUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return flatFieldMetadata.id;
};
const convertUniversalFilterToChartFilter = ({ filter, flatFieldMetadataMaps })=>{
    if (!(0, _utils.isDefined)(filter)) {
        return undefined;
    }
    return {
        ...filter,
        recordFilters: filter.recordFilters?.map(({ fieldMetadataUniversalIdentifier, ...rest })=>({
                ...rest,
                fieldMetadataId: resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                })
            }))
    };
};
const fromUniversalConfigurationToFlatPageLayoutWidgetConfiguration = ({ universalConfiguration, flatFieldMetadataMaps, flatFrontComponentMaps, flatViewMaps, flatViewFieldGroupMaps: _flatViewFieldGroupMaps })=>{
    switch(universalConfiguration.configurationType){
        case _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART:
            {
                const { aggregateFieldMetadataUniversalIdentifier, ratioAggregateConfig: universalRatioAggregateConfig, filter, ...rest } = universalConfiguration;
                const aggregateFieldMetadataId = resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier: aggregateFieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                });
                const ratioAggregateConfig = (0, _utils.isDefined)(universalRatioAggregateConfig) ? {
                    optionValue: universalRatioAggregateConfig.optionValue,
                    fieldMetadataId: resolveFieldMetadataIdOrThrow({
                        fieldMetadataUniversalIdentifier: universalRatioAggregateConfig.fieldMetadataUniversalIdentifier,
                        flatFieldMetadataMaps
                    })
                } : undefined;
                return {
                    ...rest,
                    aggregateFieldMetadataId,
                    ratioAggregateConfig,
                    filter: convertUniversalFilterToChartFilter({
                        filter,
                        flatFieldMetadataMaps
                    })
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.GAUGE_CHART:
            {
                const { aggregateFieldMetadataUniversalIdentifier, filter, ...rest } = universalConfiguration;
                const aggregateFieldMetadataId = resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier: aggregateFieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                });
                return {
                    ...rest,
                    aggregateFieldMetadataId,
                    filter: convertUniversalFilterToChartFilter({
                        filter,
                        flatFieldMetadataMaps
                    })
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART:
            {
                const { aggregateFieldMetadataUniversalIdentifier, groupByFieldMetadataUniversalIdentifier, filter, ...rest } = universalConfiguration;
                const aggregateFieldMetadataId = resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier: aggregateFieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                });
                const groupByFieldMetadataId = resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier: groupByFieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                });
                return {
                    ...rest,
                    aggregateFieldMetadataId,
                    groupByFieldMetadataId,
                    filter: convertUniversalFilterToChartFilter({
                        filter,
                        flatFieldMetadataMaps
                    })
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART:
            {
                const { aggregateFieldMetadataUniversalIdentifier, primaryAxisGroupByFieldMetadataUniversalIdentifier, secondaryAxisGroupByFieldMetadataUniversalIdentifier, filter, ...rest } = universalConfiguration;
                const aggregateFieldMetadataId = resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier: aggregateFieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                });
                const primaryAxisGroupByFieldMetadataId = resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier: primaryAxisGroupByFieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                });
                const secondaryAxisGroupByFieldMetadataId = (0, _utils.isDefined)(secondaryAxisGroupByFieldMetadataUniversalIdentifier) ? resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier: secondaryAxisGroupByFieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                }) : undefined;
                return {
                    ...rest,
                    aggregateFieldMetadataId,
                    primaryAxisGroupByFieldMetadataId,
                    secondaryAxisGroupByFieldMetadataId,
                    filter: convertUniversalFilterToChartFilter({
                        filter,
                        flatFieldMetadataMaps
                    })
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART:
            {
                const { aggregateFieldMetadataUniversalIdentifier, primaryAxisGroupByFieldMetadataUniversalIdentifier, secondaryAxisGroupByFieldMetadataUniversalIdentifier, filter, ...rest } = universalConfiguration;
                const aggregateFieldMetadataId = resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier: aggregateFieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                });
                const primaryAxisGroupByFieldMetadataId = resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier: primaryAxisGroupByFieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                });
                const secondaryAxisGroupByFieldMetadataId = (0, _utils.isDefined)(secondaryAxisGroupByFieldMetadataUniversalIdentifier) ? resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier: secondaryAxisGroupByFieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                }) : undefined;
                return {
                    ...rest,
                    aggregateFieldMetadataId,
                    primaryAxisGroupByFieldMetadataId,
                    secondaryAxisGroupByFieldMetadataId,
                    filter: convertUniversalFilterToChartFilter({
                        filter,
                        flatFieldMetadataMaps
                    })
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS:
            {
                const { viewUniversalIdentifier, newFieldDefaultVisibility, ...rest } = universalConfiguration;
                let viewId = null;
                if ((0, _utils.isDefined)(viewUniversalIdentifier)) {
                    const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                        flatEntityMaps: flatViewMaps,
                        universalIdentifier: viewUniversalIdentifier
                    });
                    if (!(0, _utils.isDefined)(flatView)) {
                        throw new _flatentitymapsexception.FlatEntityMapsException(`View not found for universal identifier: ${viewUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
                    }
                    viewId = flatView.id;
                }
                return {
                    ...rest,
                    viewId,
                    newFieldDefaultVisibility
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.RECORD_TABLE:
            {
                const { viewId: viewUniversalIdentifier, ...rest } = universalConfiguration;
                let viewId = undefined;
                if ((0, _utils.isDefined)(viewUniversalIdentifier)) {
                    const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                        flatEntityMaps: flatViewMaps,
                        universalIdentifier: viewUniversalIdentifier
                    });
                    if (!(0, _utils.isDefined)(flatView)) {
                        throw new _flatentitymapsexception.FlatEntityMapsException(`View not found for universal identifier: ${viewUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
                    }
                    viewId = flatView.id;
                }
                return {
                    ...rest,
                    viewId
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.FRONT_COMPONENT:
            {
                const { frontComponentUniversalIdentifier, configurationType } = universalConfiguration;
                if (!(0, _utils.isDefined)(frontComponentUniversalIdentifier)) {
                    throw new _flatentitymapsexception.FlatEntityMapsException(`Front component universal identifier is required for FRONT_COMPONENT configuration`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
                }
                const flatFrontComponent = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                    flatEntityMaps: flatFrontComponentMaps,
                    universalIdentifier: frontComponentUniversalIdentifier
                });
                if (!(0, _utils.isDefined)(flatFrontComponent)) {
                    throw new _flatentitymapsexception.FlatEntityMapsException(`Front component not found for universal identifier: ${frontComponentUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
                }
                return {
                    configurationType,
                    frontComponentId: flatFrontComponent.id
                };
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.FIELD:
            {
                const { fieldMetadataId: fieldMetadataUniversalIdentifier, viewId: viewUniversalIdentifier, ...rest } = universalConfiguration;
                const fieldMetadataId = resolveFieldMetadataIdOrThrow({
                    fieldMetadataUniversalIdentifier,
                    flatFieldMetadataMaps
                });
                let viewId = undefined;
                if ((0, _utils.isDefined)(viewUniversalIdentifier)) {
                    const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                        flatEntityMaps: flatViewMaps,
                        universalIdentifier: viewUniversalIdentifier
                    });
                    if (!(0, _utils.isDefined)(flatView)) {
                        throw new _flatentitymapsexception.FlatEntityMapsException(`View not found for universal identifier: ${viewUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
                    }
                    viewId = flatView.id;
                }
                return {
                    ...rest,
                    fieldMetadataId,
                    viewId
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
            return universalConfiguration;
    }
};

//# sourceMappingURL=from-universal-configuration-to-flat-page-layout-widget-configuration.util.js.map