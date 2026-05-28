"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "frontComponentGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return frontComponentGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _frontcomponentexception = require("../front-component.exception");
const frontComponentGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _frontcomponentexception.FrontComponentException) {
        switch(error.code){
            case _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _frontcomponentexception.FrontComponentExceptionCode.INVALID_FRONT_COMPONENT_INPUT:
                throw new _graphqlerrorsutil.UserInputError(error);
            case _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_ALREADY_EXISTS:
                throw new _graphqlerrorsutil.ConflictError(error);
            case _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_NOT_READY:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            case _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_CREATE_FAILED:
                throw error;
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=front-component-graphql-api-exception-handler.util.js.map