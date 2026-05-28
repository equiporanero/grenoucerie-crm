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
    get DashboardException () {
        return DashboardException;
    },
    get DashboardExceptionCode () {
        return DashboardExceptionCode;
    },
    get DashboardExceptionMessageKey () {
        return DashboardExceptionMessageKey;
    },
    get generateDashboardExceptionMessage () {
        return generateDashboardExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var DashboardExceptionCode = /*#__PURE__*/ function(DashboardExceptionCode) {
    DashboardExceptionCode["DASHBOARD_NOT_FOUND"] = "DASHBOARD_NOT_FOUND";
    DashboardExceptionCode["DASHBOARD_DUPLICATION_FAILED"] = "DASHBOARD_DUPLICATION_FAILED";
    DashboardExceptionCode["PAGE_LAYOUT_NOT_FOUND"] = "PAGE_LAYOUT_NOT_FOUND";
    return DashboardExceptionCode;
}({});
var DashboardExceptionMessageKey = /*#__PURE__*/ function(DashboardExceptionMessageKey) {
    DashboardExceptionMessageKey["DASHBOARD_NOT_FOUND"] = "DASHBOARD_NOT_FOUND";
    DashboardExceptionMessageKey["DASHBOARD_DUPLICATION_FAILED"] = "DASHBOARD_DUPLICATION_FAILED";
    DashboardExceptionMessageKey["PAGE_LAYOUT_NOT_FOUND"] = "PAGE_LAYOUT_NOT_FOUND";
    return DashboardExceptionMessageKey;
}({});
const getDashboardExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "DASHBOARD_NOT_FOUND":
            return /*i18n*/ {
                id: "jlbLNx",
                message: "Dashboard not found."
            };
        case "DASHBOARD_DUPLICATION_FAILED":
            return /*i18n*/ {
                id: "SkvO+5",
                message: "Failed to duplicate dashboard."
            };
        case "PAGE_LAYOUT_NOT_FOUND":
            return /*i18n*/ {
                id: "C4+axZ",
                message: "Page layout not found."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let DashboardException = class DashboardException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getDashboardExceptionUserFriendlyMessage(code)
        });
    }
};
const generateDashboardExceptionMessage = (key, value)=>{
    switch(key){
        case "DASHBOARD_NOT_FOUND":
            return `Dashboard with ID "${value}" not found`;
        case "DASHBOARD_DUPLICATION_FAILED":
            return `Failed to duplicate dashboard: ${value}`;
        case "PAGE_LAYOUT_NOT_FOUND":
            return `Page layout for dashboard "${value}" not found`;
        default:
            (0, _utils.assertUnreachable)(key);
    }
};

//# sourceMappingURL=dashboard.exception.js.map