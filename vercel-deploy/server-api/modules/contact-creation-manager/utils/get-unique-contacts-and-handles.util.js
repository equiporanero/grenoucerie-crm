"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getUniqueContactsAndHandles", {
    enumerable: true,
    get: function() {
        return getUniqueContactsAndHandles;
    }
});
const _lodashuniq = /*#__PURE__*/ _interop_require_default(require("lodash.uniq"));
const _lodashuniqby = /*#__PURE__*/ _interop_require_default(require("lodash.uniqby"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getUniqueContactsAndHandles(contacts) {
    if (contacts.length === 0) {
        return {
            uniqueContacts: [],
            uniqueHandles: []
        };
    }
    const uniqueHandles = (0, _lodashuniq.default)(contacts.map((participant)=>participant.handle.toLocaleLowerCase()));
    const uniqueContacts = (0, _lodashuniqby.default)(contacts, (contact)=>contact.handle.toLocaleLowerCase());
    return {
        uniqueContacts,
        uniqueHandles
    };
}

//# sourceMappingURL=get-unique-contacts-and-handles.util.js.map