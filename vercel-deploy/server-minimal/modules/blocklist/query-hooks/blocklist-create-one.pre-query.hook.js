"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlocklistCreateOnePreQueryHook", {
    enumerable: true,
    get: function() {
        return BlocklistCreateOnePreQueryHook;
    }
});
const _commonqueryrunnerexception = require("../../../engine/api/common/common-query-runners/errors/common-query-runner.exception");
const _workspacequeryhookdecorator = require("../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
const _isuserauthcontextguard = require("../../../engine/core-modules/auth/guards/is-user-auth-context.guard");
const _blocklistvalidationservice = require("../blocklist-validation-manager/services/blocklist-validation.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BlocklistCreateOnePreQueryHook = class BlocklistCreateOnePreQueryHook {
    async execute(authContext, _objectName, payload) {
        if (!(0, _isuserauthcontextguard.isUserAuthContext)(authContext)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('User id is required', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_AUTH_CONTEXT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "nq15cs",
                    message: "You must be authenticated to manage blocklist."
                }
            });
        }
        await this.blocklistValidationService.validateBlocklistForCreateMany({
            data: [
                payload.data
            ]
        }, authContext.user.id, authContext.workspace.id);
        return payload;
    }
    constructor(blocklistValidationService){
        this.blocklistValidationService = blocklistValidationService;
    }
};
BlocklistCreateOnePreQueryHook = _ts_decorate([
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)(`blocklist.createOne`),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _blocklistvalidationservice.BlocklistValidationService === "undefined" ? Object : _blocklistvalidationservice.BlocklistValidationService
    ])
], BlocklistCreateOnePreQueryHook);

//# sourceMappingURL=blocklist-create-one.pre-query.hook.js.map