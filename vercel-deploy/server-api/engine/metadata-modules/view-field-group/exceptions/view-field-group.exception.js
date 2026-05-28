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
    get ViewFieldGroupException () {
        return ViewFieldGroupException;
    },
    get ViewFieldGroupExceptionCode () {
        return ViewFieldGroupExceptionCode;
    }
});
const _customexception = require("../../../../utils/custom-exception");
let ViewFieldGroupException = class ViewFieldGroupException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? /*i18n*/ {
                id: "4oDFCk",
                message: "A view field group error occurred."
            }
        });
    }
};
var ViewFieldGroupExceptionCode = /*#__PURE__*/ function(ViewFieldGroupExceptionCode) {
    ViewFieldGroupExceptionCode["VIEW_FIELD_GROUP_NOT_FOUND"] = "VIEW_FIELD_GROUP_NOT_FOUND";
    ViewFieldGroupExceptionCode["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    ViewFieldGroupExceptionCode["FIELDS_WIDGET_NOT_FOUND"] = "FIELDS_WIDGET_NOT_FOUND";
    ViewFieldGroupExceptionCode["INVALID_VIEW_FIELD_GROUP_DATA"] = "INVALID_VIEW_FIELD_GROUP_DATA";
    return ViewFieldGroupExceptionCode;
}({});

//# sourceMappingURL=view-field-group.exception.js.map