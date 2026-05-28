"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationGraphqlApiExceptionInterceptor", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationGraphqlApiExceptionInterceptor;
    }
});
const _common = require("@nestjs/common");
const _rxjs = require("rxjs");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _flatentitymapsexception = require("../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _workspacemigrationbuilderexception = require("../exceptions/workspace-migration-builder-exception");
const _workspacemigrationbuildergraphqlapiexceptionhandlerutil = require("./utils/workspace-migration-builder-graphql-api-exception-handler.util");
const _workspacemigrationrunnerexceptionformatter = require("./workspace-migration-runner-exception-formatter");
const _workspacemigrationrunnerexception = require("../workspace-migration-runner/exceptions/workspace-migration-runner.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceMigrationGraphqlApiExceptionInterceptor = class WorkspaceMigrationGraphqlApiExceptionInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, _rxjs.catchError)((error)=>{
            if (error instanceof _flatentitymapsexception.FlatEntityMapsException) {
                switch(error.code){
                    case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND:
                        throw new _graphqlerrorsutil.NotFoundError(error);
                    case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_ALREADY_EXISTS:
                    case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_MALFORMED:
                    case _flatentitymapsexception.FlatEntityMapsExceptionCode.INTERNAL_SERVER_ERROR:
                        throw error;
                }
            }
            if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                (0, _workspacemigrationbuildergraphqlapiexceptionhandlerutil.workspaceMigrationBuilderGraphqlApiExceptionHandler)(error);
            }
            if (error instanceof _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException) {
                (0, _workspacemigrationrunnerexceptionformatter.workspaceMigrationRunnerExceptionFormatter)(error);
            }
            throw error;
        }));
    }
};
WorkspaceMigrationGraphqlApiExceptionInterceptor = _ts_decorate([
    (0, _common.Injectable)()
], WorkspaceMigrationGraphqlApiExceptionInterceptor);

//# sourceMappingURL=workspace-migration-graphql-api-exception.interceptor.js.map