"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isRelationNestedOperation", {
    enumerable: true,
    get: function() {
        return isRelationNestedOperation;
    }
});
const _guards = require("@sniptt/guards");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const { CONNECT, DISCONNECT } = _constants.RELATION_NESTED_QUERY_KEYWORDS;
const isRelationNestedOperation = (value)=>{
    if (!(0, _guards.isObject)(value)) {
        return false;
    }
    const obj = value;
    return CONNECT in obj && (0, _utils.isDefined)(obj[CONNECT]) || DISCONNECT in obj && (0, _utils.isDefined)(obj[DISCONNECT]);
};

//# sourceMappingURL=is-relation-nested-operation.util.js.map