/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnterpriseExceptionFilter", {
    enumerable: true,
    get: function() {
        return EnterpriseExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _enterpriseexception = require("./enterprise.exception");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EnterpriseExceptionFilter = class EnterpriseExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _enterpriseexception.EnterpriseExceptionCode.INVALID_ENTERPRISE_KEY:
            case _enterpriseexception.EnterpriseExceptionCode.CONFIG_VARIABLES_IN_DB_DISABLED:
                throw new _graphqlerrorsutil.UserInputError(exception);
            default:
                {
                    (0, _utils.assertUnreachable)(exception.code);
                }
        }
    }
};
EnterpriseExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_enterpriseexception.EnterpriseException)
], EnterpriseExceptionFilter);

//# sourceMappingURL=enterprise-exception.filter.js.map