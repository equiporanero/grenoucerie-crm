"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PreventNestToAutoLogGraphqlErrorsFilter", {
    enumerable: true,
    get: function() {
        return PreventNestToAutoLogGraphqlErrorsFilter;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PreventNestToAutoLogGraphqlErrorsFilter = class PreventNestToAutoLogGraphqlErrorsFilter {
    catch(exception, _host) {
        return exception;
    }
};
PreventNestToAutoLogGraphqlErrorsFilter = _ts_decorate([
    (0, _common.Catch)(_graphql.GraphQLError)
], PreventNestToAutoLogGraphqlErrorsFilter);

//# sourceMappingURL=prevent-nest-to-auto-log-graphql-errors.filter.js.map