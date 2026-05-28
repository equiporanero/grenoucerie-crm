"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LabResolver", {
    enumerable: true,
    get: function() {
        return LabResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _authgraphqlapiexceptionfilter = require("../auth/filters/auth-graphql-api-exception.filter");
const _featureflagdto = require("../feature-flag/dtos/feature-flag.dto");
const _featureflagexception = require("../feature-flag/feature-flag.exception");
const _featureflagservice = require("../feature-flag/services/feature-flag.service");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
const _updatelabpublicfeatureflaginput = require("./dtos/update-lab-public-feature-flag.input");
const _workspaceentity = require("../workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _permissionsgraphqlapiexceptionfilter = require("../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let LabResolver = class LabResolver {
    async updateLabPublicFeatureFlag(input, workspace) {
        try {
            const result = await this.featureFlagService.upsertWorkspaceFeatureFlag({
                workspaceId: workspace.id,
                featureFlag: input.publicFeatureFlag,
                value: input.value,
                shouldBePublic: true
            });
            return result;
        } catch (error) {
            if (error instanceof _featureflagexception.FeatureFlagException) {
                throw new _graphqlerrorsutil.UserInputError(error.message);
            }
            throw error;
        }
    }
    constructor(featureFlagService){
        this.featureFlagService = featureFlagService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _graphql.Mutation)(()=>_featureflagdto.FeatureFlagDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatelabpublicfeatureflaginput.UpdateLabPublicFeatureFlagInput === "undefined" ? Object : _updatelabpublicfeatureflaginput.UpdateLabPublicFeatureFlagInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], LabResolver.prototype, "updateLabPublicFeatureFlag", null);
LabResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_authgraphqlapiexceptionfilter.AuthGraphqlApiExceptionFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKSPACE)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService
    ])
], LabResolver);

//# sourceMappingURL=lab.resolver.js.map