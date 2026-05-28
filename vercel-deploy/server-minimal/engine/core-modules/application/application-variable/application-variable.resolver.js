"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationVariableEntityResolver", {
    enumerable: true,
    get: function() {
        return ApplicationVariableEntityResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _applicationvariableexceptionfilter = require("./application-variable-exception-filter");
const _applicationvariableentity = require("./application-variable.entity");
const _applicationvariableservice = require("./application-variable.service");
const _applicationvariabledto = require("./dtos/application-variable.dto");
const _updateapplicationvariableinput = require("./dtos/update-application-variable.input");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
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
let ApplicationVariableEntityResolver = class ApplicationVariableEntityResolver {
    value(applicationVariable) {
        return this.applicationVariableService.getDisplayValue(applicationVariable);
    }
    async updateOneApplicationVariable({ key, value, applicationId }, { id: workspaceId }) {
        await this.applicationVariableService.update({
            key,
            plainTextValue: value,
            applicationId,
            workspaceId
        });
        return true;
    }
    constructor(applicationVariableService){
        this.applicationVariableService = applicationVariableService;
    }
};
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationvariableentity.ApplicationVariableEntity === "undefined" ? Object : _applicationvariableentity.ApplicationVariableEntity
    ]),
    _ts_metadata("design:returntype", String)
], ApplicationVariableEntityResolver.prototype, "value", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateapplicationvariableinput.UpdateApplicationVariableEntityInput === "undefined" ? Object : _updateapplicationvariableinput.UpdateApplicationVariableEntityInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationVariableEntityResolver.prototype, "updateOneApplicationVariable", null);
ApplicationVariableEntityResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.APPLICATIONS)),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_applicationvariabledto.ApplicationVariableEntityDTO),
    (0, _common.UseFilters)(_applicationvariableexceptionfilter.ApplicationVariableEntityExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationvariableservice.ApplicationVariableEntityService === "undefined" ? Object : _applicationvariableservice.ApplicationVariableEntityService
    ])
], ApplicationVariableEntityResolver);

//# sourceMappingURL=application-variable.resolver.js.map