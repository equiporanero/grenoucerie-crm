"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateChartConfigurationFieldReferencesOrThrow", {
    enumerable: true,
    get: function() {
        return validateChartConfigurationFieldReferencesOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _widgetconfigurationtypetype = require("../enums/widget-configuration-type.type");
const _pagelayoutwidgetexception = require("../exceptions/page-layout-widget.exception");
const _pagelayoutwidgetfieldvalidationexception = require("../exceptions/page-layout-widget-field-validation.exception");
const _findactiveflatfieldmetadatabyidutil = require("./find-active-flat-field-metadata-by-id.util");
const _ischartreferencingfieldinconfigurationutil = require("./is-chart-referencing-field-in-configuration.util");
const _validategroupbyfieldutil = require("./validate-group-by-field.util");
const buildChartFieldValidationException = (message, widgetTitle)=>{
    const prefix = (0, _utils.isDefined)(widgetTitle) ? `Chart "${widgetTitle}": ` : '';
    const fullMessage = prefix + message;
    return new _pagelayoutwidgetexception.PageLayoutWidgetException(fullMessage, _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA, {
        userFriendlyMessage: /*i18n*/ {
            id: "VEmyIu",
            message: "{fullMessage}",
            values: {
                fullMessage: fullMessage
            }
        }
    });
};
const validateGroupByFieldAsChartFieldOrThrow = (params, widgetTitle)=>{
    try {
        (0, _validategroupbyfieldutil.validateGroupByFieldOrThrow)(params);
    } catch (error) {
        if (!(error instanceof _pagelayoutwidgetfieldvalidationexception.PageLayoutWidgetFieldValidationException)) {
            throw error;
        }
        throw buildChartFieldValidationException(error.message, widgetTitle);
    }
};
const validateChartConfigurationFieldReferencesOrThrow = ({ widgetConfiguration, widgetObjectMetadataId, widgetTitle, flatFieldMetadataMaps, flatObjectMetadataMaps })=>{
    if (!(0, _utils.isDefined)(widgetConfiguration)) {
        return;
    }
    if (!(0, _ischartreferencingfieldinconfigurationutil.isChartReferencingFieldInConfiguration)(widgetConfiguration)) {
        return;
    }
    if (!(0, _utils.isDefined)(widgetObjectMetadataId)) {
        throw buildChartFieldValidationException('objectMetadataId is required for graph widgets.', widgetTitle);
    }
    const objectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: widgetObjectMetadataId,
        flatEntityMaps: flatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(objectMetadata) || !objectMetadata.isActive) {
        throw buildChartFieldValidationException(`objectMetadataId "${widgetObjectMetadataId}" not found.`, widgetTitle);
    }
    const allFields = Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((field)=>field.isActive);
    const fieldsByObjectId = new Map();
    allFields.forEach((field)=>{
        const existing = fieldsByObjectId.get(field.objectMetadataId) ?? [];
        existing.push(field);
        fieldsByObjectId.set(field.objectMetadataId, existing);
    });
    const aggregateField = (0, _findactiveflatfieldmetadatabyidutil.findActiveFlatFieldMetadataById)(widgetConfiguration.aggregateFieldMetadataId, flatFieldMetadataMaps);
    if (!(0, _utils.isDefined)(aggregateField)) {
        throw buildChartFieldValidationException(`aggregateFieldMetadataId "${widgetConfiguration.aggregateFieldMetadataId}" not found.`, widgetTitle);
    }
    if (aggregateField.objectMetadataId !== widgetObjectMetadataId) {
        throw buildChartFieldValidationException(`aggregateFieldMetadataId must belong to objectMetadataId "${widgetObjectMetadataId}".`, widgetTitle);
    }
    switch(widgetConfiguration.configurationType){
        case _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART:
        case _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART:
            {
                validateGroupByFieldAsChartFieldOrThrow({
                    fieldId: widgetConfiguration.primaryAxisGroupByFieldMetadataId,
                    subFieldName: widgetConfiguration.primaryAxisGroupBySubFieldName,
                    paramName: 'primaryAxisGroupByFieldMetadataId',
                    objectMetadataId: widgetObjectMetadataId,
                    flatFieldMetadataMaps,
                    allFields,
                    fieldsByObjectId
                }, widgetTitle);
                if ((0, _utils.isDefined)(widgetConfiguration.secondaryAxisGroupBySubFieldName)) {
                    if (!(0, _utils.isDefined)(widgetConfiguration.secondaryAxisGroupByFieldMetadataId)) {
                        throw buildChartFieldValidationException('secondaryAxisGroupByFieldMetadataId is required when secondaryAxisGroupBySubFieldName is provided.', widgetTitle);
                    }
                }
                if ((0, _utils.isDefined)(widgetConfiguration.secondaryAxisGroupByFieldMetadataId)) {
                    validateGroupByFieldAsChartFieldOrThrow({
                        fieldId: widgetConfiguration.secondaryAxisGroupByFieldMetadataId,
                        subFieldName: widgetConfiguration.secondaryAxisGroupBySubFieldName,
                        paramName: 'secondaryAxisGroupByFieldMetadataId',
                        objectMetadataId: widgetObjectMetadataId,
                        flatFieldMetadataMaps,
                        allFields,
                        fieldsByObjectId
                    }, widgetTitle);
                }
                break;
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART:
            {
                validateGroupByFieldAsChartFieldOrThrow({
                    fieldId: widgetConfiguration.groupByFieldMetadataId,
                    subFieldName: widgetConfiguration.groupBySubFieldName,
                    paramName: 'groupByFieldMetadataId',
                    objectMetadataId: widgetObjectMetadataId,
                    flatFieldMetadataMaps,
                    allFields,
                    fieldsByObjectId
                }, widgetTitle);
                break;
            }
        case _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART:
        default:
            break;
    }
    if ((0, _utils.isDefined)(widgetConfiguration.filter?.recordFilters)) {
        for (const recordFilter of widgetConfiguration.filter.recordFilters){
            const filterField = (0, _findactiveflatfieldmetadatabyidutil.findActiveFlatFieldMetadataById)(recordFilter.fieldMetadataId, flatFieldMetadataMaps);
            if (!(0, _utils.isDefined)(filterField)) {
                const inactiveOrMissingField = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: recordFilter.fieldMetadataId,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                const fieldLabel = inactiveOrMissingField ? `"${inactiveOrMissingField.label}"` : `field id "${recordFilter.fieldMetadataId}"`;
                throw buildChartFieldValidationException(`One of the chart filters uses ${fieldLabel}, but it was deleted. Please remove or replace this filter rule.`, widgetTitle);
            }
            if (filterField.objectMetadataId !== widgetObjectMetadataId) {
                throw buildChartFieldValidationException(`Filter field "${recordFilter.fieldMetadataId}" must belong to objectMetadataId "${widgetObjectMetadataId}".`, widgetTitle);
            }
        }
    }
};

//# sourceMappingURL=validate-chart-configuration-field-references.util.js.map