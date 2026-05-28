"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PublicDomainExceptionFilter", {
    enumerable: true,
    get: function() {
        return PublicDomainExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _publicdomainexception = require("./public-domain.exception");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PublicDomainExceptionFilter = class PublicDomainExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _publicdomainexception.PublicDomainExceptionCode.PUBLIC_DOMAIN_ALREADY_REGISTERED:
            case _publicdomainexception.PublicDomainExceptionCode.DOMAIN_ALREADY_REGISTERED_AS_CUSTOM_DOMAIN:
                throw new _graphqlerrorsutil.UserInputError(exception);
            case _publicdomainexception.PublicDomainExceptionCode.PUBLIC_DOMAIN_NOT_FOUND:
            case _publicdomainexception.PublicDomainExceptionCode.APPLICATION_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(exception);
            default:
                (0, _utils.assertUnreachable)(exception.code);
        }
    }
};
PublicDomainExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_publicdomainexception.PublicDomainException)
], PublicDomainExceptionFilter);

//# sourceMappingURL=public-domain-exception-filter.js.map