"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findFlatLogicFunctionOrThrow", {
    enumerable: true,
    get: function() {
        return findFlatLogicFunctionOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _logicfunctionexception = require("../logic-function.exception");
const findFlatLogicFunctionOrThrow = ({ flatLogicFunctionMaps, id })=>{
    const flatLogicFunction = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: id,
        flatEntityMaps: flatLogicFunctionMaps
    });
    if (!(0, _utils.isDefined)(flatLogicFunction) || (0, _utils.isDefined)(flatLogicFunction.deletedAt)) {
        throw new _logicfunctionexception.LogicFunctionException(`Logic function with id ${id} not found`, _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_NOT_FOUND);
    }
    return flatLogicFunction;
};

//# sourceMappingURL=find-flat-logic-function-or-throw.util.js.map