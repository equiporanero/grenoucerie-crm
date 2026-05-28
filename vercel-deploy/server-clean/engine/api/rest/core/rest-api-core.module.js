"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiCoreModule", {
    enumerable: true,
    get: function() {
        return RestApiCoreModule;
    }
});
const _common = require("@nestjs/common");
const _corecommonapimodule = require("../../common/core-common-api.module");
const _restapicorecontroller = require("./controllers/rest-api-core.controller");
const _restapicreatemanyhandler = require("./handlers/rest-api-create-many.handler");
const _restapicreateonehandler = require("./handlers/rest-api-create-one.handler");
const _restapideletemanyhandler = require("./handlers/rest-api-delete-many.handler");
const _restapideleteonehandler = require("./handlers/rest-api-delete-one.handler");
const _restapidestroymanyhandler = require("./handlers/rest-api-destroy-many.handler");
const _restapidestroyonehandler = require("./handlers/rest-api-destroy-one.handler");
const _restapifindduplicateshandler = require("./handlers/rest-api-find-duplicates.handler");
const _restapifindmanyhandler = require("./handlers/rest-api-find-many.handler");
const _restapifindonehandler = require("./handlers/rest-api-find-one.handler");
const _restapigroupbyhandler = require("./handlers/rest-api-group-by.handler");
const _restapimergemanyhandler = require("./handlers/rest-api-merge-many.handler");
const _restapirestoremanyhandler = require("./handlers/rest-api-restore-many.handler");
const _restapirestoreonehandler = require("./handlers/rest-api-restore-one.handler");
const _restapiupdatemanyhandler = require("./handlers/rest-api-update-many.handler");
const _restapiupdateonehandler = require("./handlers/rest-api-update-one.handler");
const _resttocommonargshandlers = require("./rest-to-common-args-handlers/rest-to-common-args-handlers");
const _restapicoreservice = require("./services/rest-api-core.service");
const _actormodule = require("../../../core-modules/actor/actor.module");
const _apikeymodule = require("../../../core-modules/api-key/api-key.module");
const _authmodule = require("../../../core-modules/auth/auth.module");
const _workspacedomainsmodule = require("../../../core-modules/domain/workspace-domains/workspace-domains.module");
const _featureflagmodule = require("../../../core-modules/feature-flag/feature-flag.module");
const _recordtransformermodule = require("../../../core-modules/record-transformer/record-transformer.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _userrolemodule = require("../../../metadata-modules/user-role/user-role.module");
const _twentyormmodule = require("../../../twenty-orm/twenty-orm.module");
const _workspacecachestoragemodule = require("../../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const restApiCoreResolvers = [
    _restapicreateonehandler.RestApiCreateOneHandler,
    _restapicreatemanyhandler.RestApiCreateManyHandler,
    _restapiupdateonehandler.RestApiUpdateOneHandler,
    _restapiupdatemanyhandler.RestApiUpdateManyHandler,
    _restapifindonehandler.RestApiFindOneHandler,
    _restapifindmanyhandler.RestApiFindManyHandler,
    _restapifindduplicateshandler.RestApiFindDuplicatesHandler,
    _restapigroupbyhandler.RestApiGroupByHandler,
    _restapiupdateonehandler.RestApiUpdateOneHandler,
    _restapidestroyonehandler.RestApiDestroyOneHandler,
    _restapidestroymanyhandler.RestApiDestroyManyHandler,
    _restapideleteonehandler.RestApiDeleteOneHandler,
    _restapideletemanyhandler.RestApiDeleteManyHandler,
    _restapirestoreonehandler.RestApiRestoreOneHandler,
    _restapirestoremanyhandler.RestApiRestoreManyHandler,
    _restapimergemanyhandler.RestApiMergeManyHandler
];
let RestApiCoreModule = class RestApiCoreModule {
};
RestApiCoreModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _authmodule.AuthModule,
            _apikeymodule.ApiKeyModule,
            _userrolemodule.UserRoleModule,
            _twentyormmodule.TwentyORMModule,
            _recordtransformermodule.RecordTransformerModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _actormodule.ActorModule,
            _featureflagmodule.FeatureFlagModule,
            _corecommonapimodule.CoreCommonApiModule,
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        controllers: [
            _restapicorecontroller.RestApiCoreController
        ],
        providers: [
            _restapicoreservice.RestApiCoreService,
            ...restApiCoreResolvers,
            ..._resttocommonargshandlers.restToCommonArgsHandlers
        ]
    })
], RestApiCoreModule);

//# sourceMappingURL=rest-api-core.module.js.map