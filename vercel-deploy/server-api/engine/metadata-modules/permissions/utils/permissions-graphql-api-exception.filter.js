"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PermissionsGraphqlApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return PermissionsGraphqlApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _permissionsexception = require("../permissions.exception");
const _permissiongraphqlapiexceptionhandlerutil = require("./permission-graphql-api-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PermissionsGraphqlApiExceptionFilter = class PermissionsGraphqlApiExceptionFilter {
    catch(exception) {
        return (0, _permissiongraphqlapiexceptionhandlerutil.permissionGraphqlApiExceptionHandler)(exception);
    }
};
PermissionsGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_permissionsexception.PermissionsException)
], PermissionsGraphqlApiExceptionFilter);

//# sourceMappingURL=permissions-graphql-api-exception.filter.js.map