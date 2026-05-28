"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceInvitationModule", {
    enumerable: true,
    get: function() {
        return WorkspaceInvitationModule;
    }
});
const _common = require("@nestjs/common");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _apptokenentity = require("../app-token/app-token.entity");
const _workspacedomainsmodule = require("../domain/workspace-domains/workspace-domains.module");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _filemodule = require("../file/file.module");
const _onboardingmodule = require("../onboarding/onboarding.module");
const _throttlermodule = require("../throttler/throttler.module");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _workspaceinvitationservice = require("./services/workspace-invitation.service");
const _workspaceinvitationresolver = require("./workspace-invitation.resolver");
const _workspaceentity = require("../workspace/workspace.entity");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _rolevalidationmodule = require("../../metadata-modules/role-validation/role-validation.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceInvitationModule = class WorkspaceInvitationModule {
};
WorkspaceInvitationModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _apptokenentity.AppTokenEntity,
                _userworkspaceentity.UserWorkspaceEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _rolevalidationmodule.RoleValidationModule,
            _filemodule.FileModule,
            _onboardingmodule.OnboardingModule,
            _permissionsmodule.PermissionsModule,
            _featureflagmodule.FeatureFlagModule,
            _throttlermodule.ThrottlerModule
        ],
        exports: [
            _workspaceinvitationservice.WorkspaceInvitationService
        ],
        providers: [
            _workspaceinvitationservice.WorkspaceInvitationService,
            _workspaceinvitationresolver.WorkspaceInvitationResolver
        ]
    })
], WorkspaceInvitationModule);

//# sourceMappingURL=workspace-invitation.module.js.map