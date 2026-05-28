"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceManagerService", {
    enumerable: true,
    get: function() {
        return WorkspaceManagerService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _applicationservice = require("../core-modules/application/application.service");
const _userworkspaceentity = require("../core-modules/user-workspace/user-workspace.entity");
const _workspaceentity = require("../core-modules/workspace/workspace.entity");
const _roleentity = require("../metadata-modules/role/role.entity");
const _roleservice = require("../metadata-modules/role/role.service");
const _userroleservice = require("../metadata-modules/user-role/user-role.service");
const _workspacedatasourceservice = require("../workspace-datasource/workspace-datasource.service");
const _standardroleconstant = require("./twenty-standard-application/constants/standard-role.constant");
const _twentystandardapplicationservice = require("./twenty-standard-application/services/twenty-standard-application.service");
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
let WorkspaceManagerService = class WorkspaceManagerService {
    async init({ workspace, userId }) {
        const workspaceId = workspace.id;
        const schemaCreationStart = performance.now();
        const schemaName = await this.workspaceDataSourceService.createWorkspaceDBSchema(workspaceId);
        const schemaCreationEnd = performance.now();
        this.logger.log(`Schema creation took ${schemaCreationEnd - schemaCreationStart}ms`);
        const dataSourceMetadataCreationStart = performance.now();
        await this.workspaceRepository.update(workspaceId, {
            databaseSchema: schemaName
        });
        await this.applicationService.createTwentyStandardApplication({
            workspaceId
        });
        await this.twentyStandardApplicationService.synchronizeTwentyStandardApplicationOrThrow({
            workspaceId
        });
        const dataSourceMetadataCreationEnd = performance.now();
        this.logger.log(`Metadata creation took ${dataSourceMetadataCreationEnd - dataSourceMetadataCreationStart}ms`);
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        await this.setupDefaultRoles({
            workspaceId,
            userId,
            workspaceCustomFlatApplication
        });
    }
    async setupDefaultRoles({ userId, workspaceId, workspaceCustomFlatApplication }) {
        const adminRole = await this.roleRepository.findOne({
            where: {
                universalIdentifier: _standardroleconstant.STANDARD_ROLE.admin.universalIdentifier,
                workspaceId
            }
        });
        if (adminRole) {
            const userWorkspace = await this.userWorkspaceRepository.findOneOrFail({
                where: {
                    workspaceId,
                    userId
                }
            });
            await this.userRoleService.assignRoleToManyUserWorkspace({
                workspaceId,
                userWorkspaceIds: [
                    userWorkspace.id
                ],
                roleId: adminRole.id
            });
        }
        const memberRole = await this.roleService.createMemberRole({
            workspaceId,
            ownerFlatApplication: workspaceCustomFlatApplication
        });
        await this.workspaceRepository.update(workspaceId, {
            defaultRoleId: memberRole.id
        });
    }
    constructor(workspaceDataSourceService, userWorkspaceRepository, roleService, userRoleService, twentyStandardApplicationService, workspaceRepository, roleRepository, applicationService){
        this.workspaceDataSourceService = workspaceDataSourceService;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.roleService = roleService;
        this.userRoleService = userRoleService;
        this.twentyStandardApplicationService = twentyStandardApplicationService;
        this.workspaceRepository = workspaceRepository;
        this.roleRepository = roleRepository;
        this.applicationService = applicationService;
        this.logger = new _common.Logger(WorkspaceManagerService.name);
    }
};
WorkspaceManagerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacedatasourceservice.WorkspaceDataSourceService === "undefined" ? Object : _workspacedatasourceservice.WorkspaceDataSourceService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _roleservice.RoleService === "undefined" ? Object : _roleservice.RoleService,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _twentystandardapplicationservice.TwentyStandardApplicationService === "undefined" ? Object : _twentystandardapplicationservice.TwentyStandardApplicationService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], WorkspaceManagerService);

//# sourceMappingURL=workspace-manager.service.js.map