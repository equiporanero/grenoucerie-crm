"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatDimensionValue", {
    enumerable: true,
    get: function() {
        return formatDimensionValue;
    }
});
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _graphdefaultdategranularityconstant = require("../constants/graph-default-date-granularity.constant");
const _formatdatebygranularity = require("./format-date-by-granularity");
const normalizeMultiSelectValue = (value)=>{
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value !== 'string') {
        return [
            value
        ];
    }
    const trimmed = value.trim();
    const isPostgresArrayFormat = trimmed.startsWith('{') && trimmed.endsWith('}');
    if (!isPostgresArrayFormat) {
        return [
            value
        ];
    }
    const content = trimmed.slice(1, -1);
    return content ? content.split(',') : [];
};
const formatDimensionValue = ({ value, fieldMetadata, dateGranularity, subFieldName, userTimezone, firstDayOfTheWeek })=>{
    if (!(0, _utils.isDefined)(value)) {
        return _core.i18n._(/*i18n*/ {
            id: "NpVtef",
            message: "Not Set"
        });
    }
    const effectiveDateGranularity = dateGranularity ?? _graphdefaultdategranularityconstant.GRAPH_DEFAULT_DATE_GRANULARITY;
    switch(fieldMetadata.type){
        case _types.FieldMetadataType.SELECT:
            {
                const selectedOption = fieldMetadata.options?.find((option)=>option.value === value);
                return selectedOption?.label ?? String(value);
            }
        case _types.FieldMetadataType.MULTI_SELECT:
            {
                const values = normalizeMultiSelectValue(value);
                return values.map((value)=>{
                    const option = fieldMetadata.options?.find((option)=>option.value === value);
                    return option?.label ?? String(value);
                }).join(', ');
            }
        case _types.FieldMetadataType.BOOLEAN:
            {
                return value === true ? _core.i18n._(/*i18n*/ {
                    id: "l75CjT",
                    message: "Yes"
                }) : _core.i18n._(/*i18n*/ {
                    id: "1UzENP",
                    message: "No"
                });
            }
        case _types.FieldMetadataType.DATE:
        case _types.FieldMetadataType.DATE_TIME:
            {
                if (effectiveDateGranularity === _types.ObjectRecordGroupByDateGranularity.DAY_OF_THE_WEEK || effectiveDateGranularity === _types.ObjectRecordGroupByDateGranularity.MONTH_OF_THE_YEAR || effectiveDateGranularity === _types.ObjectRecordGroupByDateGranularity.QUARTER_OF_THE_YEAR) {
                    return String(value);
                }
                const parsedPlainDate = (0, _utils.parseToPlainDateOrThrow)(String(value));
                return (0, _formatdatebygranularity.formatDateByGranularity)(parsedPlainDate, effectiveDateGranularity, userTimezone, firstDayOfTheWeek);
            }
        case _types.FieldMetadataType.RELATION:
            {
                if ((0, _utils.isDefined)(dateGranularity)) {
                    const parsedDayString = String(value);
                    if (dateGranularity === _types.ObjectRecordGroupByDateGranularity.DAY_OF_THE_WEEK || dateGranularity === _types.ObjectRecordGroupByDateGranularity.MONTH_OF_THE_YEAR || dateGranularity === _types.ObjectRecordGroupByDateGranularity.QUARTER_OF_THE_YEAR) {
                        return String(value);
                    }
                    return parsedDayString;
                }
                return String(value);
            }
        case _types.FieldMetadataType.NUMBER:
        case _types.FieldMetadataType.CURRENCY:
            {
                if (fieldMetadata.type === _types.FieldMetadataType.CURRENCY && subFieldName === 'currencyCode') {
                    if (!(0, _guards.isNonEmptyString)(value)) {
                        return _core.i18n._(/*i18n*/ {
                            id: "NpVtef",
                            message: "Not Set"
                        });
                    }
                    return String(value);
                }
                const numericValue = (0, _guards.isNumber)(value) ? value : Number(value);
                if (isNaN(numericValue)) {
                    return String(value);
                }
                return (0, _utils.formatToShortNumber)(numericValue);
            }
        default:
            return String(value);
    }
};

//# sourceMappingURL=format-dimension-value.util.js.map