"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigVariableGraphqlApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return ConfigVariableGraphqlApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _twentyconfigexception = require("../twenty-config.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ConfigVariableGraphqlApiExceptionFilter = class ConfigVariableGraphqlApiExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _twentyconfigexception.ConfigVariableExceptionCode.VARIABLE_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(exception.message);
            case _twentyconfigexception.ConfigVariableExceptionCode.ENVIRONMENT_ONLY_VARIABLE:
                throw new _graphqlerrorsutil.ForbiddenError(exception.message);
            case _twentyconfigexception.ConfigVariableExceptionCode.DATABASE_CONFIG_DISABLED:
            case _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED:
                throw new _graphqlerrorsutil.UserInputError(exception.message);
            case _twentyconfigexception.ConfigVariableExceptionCode.INTERNAL_ERROR:
            case _twentyconfigexception.ConfigVariableExceptionCode.UNSUPPORTED_CONFIG_TYPE:
                throw exception;
            default:
                {
                    (0, _utils.assertUnreachable)(exception.code);
                }
        }
    }
};
ConfigVariableGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_twentyconfigexception.ConfigVariableException)
], ConfigVariableGraphqlApiExceptionFilter);

//# sourceMappingURL=config-variable-graphql-api-exception.filter.js.map