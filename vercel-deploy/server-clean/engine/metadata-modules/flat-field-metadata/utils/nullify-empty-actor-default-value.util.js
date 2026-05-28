"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nullifyEmptyActorDefaultValue", {
    enumerable: true,
    get: function() {
        return nullifyEmptyActorDefaultValue;
    }
});
const _utils = require("twenty-shared/utils");
const _isnullequivalenttextdefaultvalueutil = require("./is-null-equivalent-text-default-value.util");
const nullifyEmptyActorDefaultValue = (defaultValue)=>{
    if (!(0, _utils.isDefined)(defaultValue)) {
        return null;
    }
    const v = defaultValue;
    const source = v.source ?? null;
    const workspaceMemberId = v.workspaceMemberId ?? null;
    const name = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.name) ? null : v.name ?? null;
    const context = v.context ?? null;
    if (source === null && workspaceMemberId === null && name === null && context === null) {
        return null;
    }
    return {
        source,
        workspaceMemberId,
        name,
        context
    };
};

//# sourceMappingURL=nullify-empty-actor-default-value.util.js.map