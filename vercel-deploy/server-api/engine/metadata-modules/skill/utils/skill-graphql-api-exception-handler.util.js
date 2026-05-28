"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "skillGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return skillGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _skillexception = require("../skill.exception");
const skillGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _skillexception.SkillException) {
        switch(error.code){
            case _skillexception.SkillExceptionCode.SKILL_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _skillexception.SkillExceptionCode.INVALID_SKILL_INPUT:
                throw new _graphqlerrorsutil.UserInputError(error);
            case _skillexception.SkillExceptionCode.SKILL_ALREADY_EXISTS:
                throw new _graphqlerrorsutil.ConflictError(error);
            case _skillexception.SkillExceptionCode.SKILL_IS_STANDARD:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=skill-graphql-api-exception-handler.util.js.map