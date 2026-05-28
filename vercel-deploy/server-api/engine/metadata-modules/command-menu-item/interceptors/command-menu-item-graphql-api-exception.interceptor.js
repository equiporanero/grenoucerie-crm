"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommandMenuItemGraphqlApiExceptionInterceptor", {
    enumerable: true,
    get: function() {
        return CommandMenuItemGraphqlApiExceptionInterceptor;
    }
});
const _common = require("@nestjs/common");
const _rxjs = require("rxjs");
const _commandmenuitemgraphqlapiexceptionhandlerutil = require("../utils/command-menu-item-graphql-api-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommandMenuItemGraphqlApiExceptionInterceptor = class CommandMenuItemGraphqlApiExceptionInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, _rxjs.catchError)(_commandmenuitemgraphqlapiexceptionhandlerutil.commandMenuItemGraphqlApiExceptionHandler));
    }
};
CommandMenuItemGraphqlApiExceptionInterceptor = _ts_decorate([
    (0, _common.Injectable)()
], CommandMenuItemGraphqlApiExceptionInterceptor);

//# sourceMappingURL=command-menu-item-graphql-api-exception.interceptor.js.map