"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ChartDataException () {
        return ChartDataException;
    },
    get ChartDataExceptionCode () {
        return ChartDataExceptionCode;
    },
    get generateChartDataExceptionMessage () {
        return generateChartDataExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var ChartDataExceptionCode = /*#__PURE__*/ function(ChartDataExceptionCode) {
    ChartDataExceptionCode["WIDGET_NOT_FOUND"] = "WIDGET_NOT_FOUND";
    ChartDataExceptionCode["INVALID_WIDGET_CONFIGURATION"] = "INVALID_WIDGET_CONFIGURATION";
    ChartDataExceptionCode["OBJECT_METADATA_NOT_FOUND"] = "OBJECT_METADATA_NOT_FOUND";
    ChartDataExceptionCode["FIELD_METADATA_NOT_FOUND"] = "FIELD_METADATA_NOT_FOUND";
    ChartDataExceptionCode["QUERY_EXECUTION_FAILED"] = "QUERY_EXECUTION_FAILED";
    ChartDataExceptionCode["TRANSFORMATION_FAILED"] = "TRANSFORMATION_FAILED";
    return ChartDataExceptionCode;
}({});
const getChartDataExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "WIDGET_NOT_FOUND":
            return /*i18n*/ {
                id: "09IBNJ",
                message: "Widget not found."
            };
        case "INVALID_WIDGET_CONFIGURATION":
            return /*i18n*/ {
                id: "c4NCfN",
                message: "Invalid widget configuration."
            };
        case "OBJECT_METADATA_NOT_FOUND":
            return /*i18n*/ {
                id: "rHce90",
                message: "Object metadata not found."
            };
        case "FIELD_METADATA_NOT_FOUND":
            return /*i18n*/ {
                id: "JrAl/I",
                message: "Field metadata not found."
            };
        case "QUERY_EXECUTION_FAILED":
            return /*i18n*/ {
                id: "vVCf2E",
                message: "Query execution failed."
            };
        case "TRANSFORMATION_FAILED":
            return /*i18n*/ {
                id: "tEb/hR",
                message: "Transformation failed."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let ChartDataException = class ChartDataException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getChartDataExceptionUserFriendlyMessage(code)
        });
    }
};
const generateChartDataExceptionMessage = (code, context)=>{
    const messages = {
        ["WIDGET_NOT_FOUND"]: `Widget not found${context ? `: ${context}` : ''}`,
        ["INVALID_WIDGET_CONFIGURATION"]: `Invalid widget configuration${context ? `: ${context}` : ''}`,
        ["OBJECT_METADATA_NOT_FOUND"]: `Object metadata not found${context ? `: ${context}` : ''}`,
        ["FIELD_METADATA_NOT_FOUND"]: `Field metadata not found${context ? `: ${context}` : ''}`,
        ["QUERY_EXECUTION_FAILED"]: `Query execution failed${context ? `: ${context}` : ''}`,
        ["TRANSFORMATION_FAILED"]: `Transformation failed${context ? `: ${context}` : ''}`
    };
    return messages[code];
};

//# sourceMappingURL=chart-data.exception.js.map