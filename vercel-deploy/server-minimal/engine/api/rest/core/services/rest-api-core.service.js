"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiCoreService", {
    enumerable: true,
    get: function() {
        return RestApiCoreService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _restapicreatemanyhandler = require("../handlers/rest-api-create-many.handler");
const _restapicreateonehandler = require("../handlers/rest-api-create-one.handler");
const _restapideletemanyhandler = require("../handlers/rest-api-delete-many.handler");
const _restapideleteonehandler = require("../handlers/rest-api-delete-one.handler");
const _restapidestroymanyhandler = require("../handlers/rest-api-destroy-many.handler");
const _restapidestroyonehandler = require("../handlers/rest-api-destroy-one.handler");
const _restapifindduplicateshandler = require("../handlers/rest-api-find-duplicates.handler");
const _restapifindmanyhandler = require("../handlers/rest-api-find-many.handler");
const _restapifindonehandler = require("../handlers/rest-api-find-one.handler");
const _restapigroupbyhandler = require("../handlers/rest-api-group-by.handler");
const _restapimergemanyhandler = require("../handlers/rest-api-merge-many.handler");
const _restapirestoremanyhandler = require("../handlers/rest-api-restore-many.handler");
const _restapirestoreonehandler = require("../handlers/rest-api-restore-one.handler");
const _restapiupdatemanyhandler = require("../handlers/rest-api-update-many.handler");
const _restapiupdateonehandler = require("../handlers/rest-api-update-one.handler");
const _parsecorepathutils = require("../../input-request-parsers/path-parser-utils/parse-core-path.utils");
const _parsesoftdeleterestrequestutil = require("../../input-request-parsers/soft-delete-parser-utils/parse-soft-delete-rest-request.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RestApiCoreService = class RestApiCoreService {
    async createOne(request) {
        return await this.restApiCreateOneHandler.handle(request);
    }
    async createMany(request) {
        return await this.restApiCreateManyHandler.handle(request);
    }
    async findDuplicates(request) {
        return await this.restApiFindDuplicatesHandler.handle(request);
    }
    async update(request) {
        const { id: recordId } = (0, _parsecorepathutils.parseCorePath)(request);
        if ((0, _utils.isDefined)(recordId)) {
            return await this.restApiUpdateOneHandler.handle(request);
        } else {
            return await this.restApiUpdateManyHandler.handle(request);
        }
    }
    async get(request) {
        const { id: recordId } = (0, _parsecorepathutils.parseCorePath)(request);
        if ((0, _utils.isDefined)(recordId)) {
            return await this.restApiFindOneHandler.handle(request);
        } else {
            return await this.restApiFindManyHandler.handle(request);
        }
    }
    async groupBy(request) {
        return await this.restApiGroupByHandler.handle(request);
    }
    async delete(request) {
        const { id: recordId } = (0, _parsecorepathutils.parseCorePath)(request);
        const isSoftDelete = (0, _parsesoftdeleterestrequestutil.parseSoftDeleteRestRequest)(request);
        if (!isSoftDelete && (0, _utils.isDefined)(recordId)) return await this.restApiDestroyOneHandler.handle(request);
        if (!isSoftDelete && !(0, _utils.isDefined)(recordId)) return await this.restApiDestroyManyHandler.handle(request);
        if (isSoftDelete && (0, _utils.isDefined)(recordId)) return await this.restApiDeleteOneHandler.handle(request);
        if (isSoftDelete && !(0, _utils.isDefined)(recordId)) return await this.restApiDeleteManyHandler.handle(request);
    }
    async restore(request) {
        const { id: recordId } = (0, _parsecorepathutils.parseCorePath)(request);
        if ((0, _utils.isDefined)(recordId)) {
            return await this.restApiRestoreOneHandler.handle(request);
        } else {
            return await this.restApiRestoreManyHandler.handle(request);
        }
    }
    async mergeMany(request) {
        return await this.restApiMergeManyHandler.handle(request);
    }
    constructor(restApiCreateOneHandler, restApiCreateManyHandler, restApiUpdateOneHandler, restApiUpdateManyHandler, restApiFindOneHandler, restApiFindManyHandler, restApiFindDuplicatesHandler, restApiGroupByHandler, restApiDestroyOneHandler, restApiDestroyManyHandler, restApiDeleteOneHandler, restApiDeleteManyHandler, restApiRestoreOneHandler, restApiRestoreManyHandler, restApiMergeManyHandler){
        this.restApiCreateOneHandler = restApiCreateOneHandler;
        this.restApiCreateManyHandler = restApiCreateManyHandler;
        this.restApiUpdateOneHandler = restApiUpdateOneHandler;
        this.restApiUpdateManyHandler = restApiUpdateManyHandler;
        this.restApiFindOneHandler = restApiFindOneHandler;
        this.restApiFindManyHandler = restApiFindManyHandler;
        this.restApiFindDuplicatesHandler = restApiFindDuplicatesHandler;
        this.restApiGroupByHandler = restApiGroupByHandler;
        this.restApiDestroyOneHandler = restApiDestroyOneHandler;
        this.restApiDestroyManyHandler = restApiDestroyManyHandler;
        this.restApiDeleteOneHandler = restApiDeleteOneHandler;
        this.restApiDeleteManyHandler = restApiDeleteManyHandler;
        this.restApiRestoreOneHandler = restApiRestoreOneHandler;
        this.restApiRestoreManyHandler = restApiRestoreManyHandler;
        this.restApiMergeManyHandler = restApiMergeManyHandler;
    }
};
RestApiCoreService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _restapicreateonehandler.RestApiCreateOneHandler === "undefined" ? Object : _restapicreateonehandler.RestApiCreateOneHandler,
        typeof _restapicreatemanyhandler.RestApiCreateManyHandler === "undefined" ? Object : _restapicreatemanyhandler.RestApiCreateManyHandler,
        typeof _restapiupdateonehandler.RestApiUpdateOneHandler === "undefined" ? Object : _restapiupdateonehandler.RestApiUpdateOneHandler,
        typeof _restapiupdatemanyhandler.RestApiUpdateManyHandler === "undefined" ? Object : _restapiupdatemanyhandler.RestApiUpdateManyHandler,
        typeof _restapifindonehandler.RestApiFindOneHandler === "undefined" ? Object : _restapifindonehandler.RestApiFindOneHandler,
        typeof _restapifindmanyhandler.RestApiFindManyHandler === "undefined" ? Object : _restapifindmanyhandler.RestApiFindManyHandler,
        typeof _restapifindduplicateshandler.RestApiFindDuplicatesHandler === "undefined" ? Object : _restapifindduplicateshandler.RestApiFindDuplicatesHandler,
        typeof _restapigroupbyhandler.RestApiGroupByHandler === "undefined" ? Object : _restapigroupbyhandler.RestApiGroupByHandler,
        typeof _restapidestroyonehandler.RestApiDestroyOneHandler === "undefined" ? Object : _restapidestroyonehandler.RestApiDestroyOneHandler,
        typeof _restapidestroymanyhandler.RestApiDestroyManyHandler === "undefined" ? Object : _restapidestroymanyhandler.RestApiDestroyManyHandler,
        typeof _restapideleteonehandler.RestApiDeleteOneHandler === "undefined" ? Object : _restapideleteonehandler.RestApiDeleteOneHandler,
        typeof _restapideletemanyhandler.RestApiDeleteManyHandler === "undefined" ? Object : _restapideletemanyhandler.RestApiDeleteManyHandler,
        typeof _restapirestoreonehandler.RestApiRestoreOneHandler === "undefined" ? Object : _restapirestoreonehandler.RestApiRestoreOneHandler,
        typeof _restapirestoremanyhandler.RestApiRestoreManyHandler === "undefined" ? Object : _restapirestoremanyhandler.RestApiRestoreManyHandler,
        typeof _restapimergemanyhandler.RestApiMergeManyHandler === "undefined" ? Object : _restapimergemanyhandler.RestApiMergeManyHandler
    ])
], RestApiCoreService);

//# sourceMappingURL=rest-api-core.service.js.map