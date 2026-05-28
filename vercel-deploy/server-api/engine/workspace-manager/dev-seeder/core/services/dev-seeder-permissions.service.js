"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevSeederPermissionsService", {
    enumerable: true,
    get: function() {
        return DevSeederPermissionsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _workspaceentity = require("../../../../core-modules/workspace/workspace.entity");
const _objectmetadataentity = require("../../../../metadata-modules/object-metadata/object-metadata.entity");
const _fieldpermissionservice = require("../../../../metadata-modules/object-permission/field-permission/field-permission.service");
const _objectpermissionservice = require("../../../../metadata-modules/object-permission/object-permission.service");
const _roletargetservice = require("../../../../metadata-modules/role-target/services/role-target.service");
const _roleentity = require("../../../../metadata-modules/role/role.entity");
const _roleservice = require("../../../../metadata-modules/role/role.service");
const _userroleservice = require("../../../../metadata-modules/user-role/user-role.service");
const _seederworkspacesconstant = require("../constants/seeder-workspaces.constant");
const _seeduserworkspacesutil = require("../utils/seed-user-workspaces.util");
const _apikeydataseedsconstant = require("../../data/constants/api-key-data-seeds.constant");
const _standardroleconstant = require("../../../twenty-standard-application/constants/standard-role.constant");
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
let DevSeederPermissionsService = class DevSeederPermissionsService {
    async initPermissions({ twentyStandardFlatApplication, workspaceCustomFlatApplication, workspaceId, light = false }) {
        const adminRole = await this.roleRepository.findOne({
            where: {
                universalIdentifier: _standardroleconstant.STANDARD_ROLE.admin.universalIdentifier,
                workspaceId
            }
        });
        if (!adminRole) {
            throw new Error('Required roles not found. Make sure the permission sync has run.');
        }
        await this.roleTargetService.create({
            createRoleTargetInput: {
                roleId: adminRole.id,
                targetId: _apikeydataseedsconstant.API_KEY_DATA_SEED_IDS.ID_1,
                targetMetadataForeignKey: 'apiKeyId',
                applicationId: twentyStandardFlatApplication.id
            },
            workspaceId
        });
        let adminUserWorkspaceId;
        let memberUserWorkspaceIds = [];
        let limitedUserWorkspaceId;
        let guestUserWorkspaceId;
        if (workspaceId === _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID) {
            if (light) {
                // In light mode, Tim is admin (prefilled login user needs full
                // access for SDK development). No demo permission roles needed.
                adminUserWorkspaceId = _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.TIM;
                memberUserWorkspaceIds = [
                    _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.JANE,
                    _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.JONY,
                    _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.PHIL,
                    ...Object.values(_seeduserworkspacesutil.RANDOM_USER_WORKSPACE_IDS)
                ];
            } else {
                adminUserWorkspaceId = _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.JANE;
                limitedUserWorkspaceId = _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.TIM;
                guestUserWorkspaceId = _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.PHIL;
                memberUserWorkspaceIds = [
                    _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.JONY,
                    ...Object.values(_seeduserworkspacesutil.RANDOM_USER_WORKSPACE_IDS)
                ];
                const guestRole = await this.roleService.createGuestRole({
                    workspaceId,
                    ownerFlatApplication: workspaceCustomFlatApplication
                });
                await this.userRoleService.assignRoleToManyUserWorkspace({
                    workspaceId,
                    userWorkspaceIds: [
                        guestUserWorkspaceId
                    ],
                    roleId: guestRole.id
                });
                // The limited role restricts access to Pet and Rocket objects,
                // which are only created in full (non-light) mode
                const limitedRole = await this.createLimitedRoleForSeedWorkspace({
                    workspaceId,
                    ownerFlatApplication: workspaceCustomFlatApplication
                });
                await this.userRoleService.assignRoleToManyUserWorkspace({
                    workspaceId,
                    userWorkspaceIds: [
                        limitedUserWorkspaceId
                    ],
                    roleId: limitedRole.id
                });
            }
        } else if (workspaceId === _seederworkspacesconstant.SEED_YCOMBINATOR_WORKSPACE_ID) {
            adminUserWorkspaceId = _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.TIM_ACME;
            memberUserWorkspaceIds = [
                _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.JONY_ACME,
                _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.JANE_ACME,
                _seeduserworkspacesutil.USER_WORKSPACE_DATA_SEED_IDS.PHIL_ACME
            ];
        }
        if (!adminUserWorkspaceId) {
            throw new Error('Should never occur, no eligible user workspace for admin has been found');
        }
        await this.userRoleService.assignRoleToManyUserWorkspace({
            workspaceId,
            userWorkspaceIds: [
                adminUserWorkspaceId
            ],
            roleId: adminRole.id
        });
        const memberRole = await this.initMinimalPermissionsAndActivateWorkspace({
            workspaceId,
            workspaceCustomFlatApplication
        });
        if (memberUserWorkspaceIds.length > 0) {
            await this.userRoleService.assignRoleToManyUserWorkspace({
                workspaceId,
                userWorkspaceIds: memberUserWorkspaceIds,
                roleId: memberRole.id
            });
        }
    }
    async initMinimalPermissionsAndActivateWorkspace({ workspaceId, workspaceCustomFlatApplication }) {
        const memberRole = await this.roleService.createMemberRole({
            workspaceId,
            ownerFlatApplication: workspaceCustomFlatApplication
        });
        await this.coreDataSource.getRepository(_workspaceentity.WorkspaceEntity).update(workspaceId, {
            defaultRoleId: memberRole.id,
            activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
        });
        return memberRole;
    }
    async createLimitedRoleForSeedWorkspace({ ownerFlatApplication, workspaceId }) {
        const customRole = await this.roleService.createRole({
            ownerFlatApplication,
            workspaceId,
            input: {
                label: 'Object-restricted',
                description: 'All permissions except read on Rockets and update on Pets',
                icon: 'custom',
                canUpdateAllSettings: true,
                canAccessAllTools: true,
                canReadAllObjectRecords: true,
                canUpdateAllObjectRecords: true,
                canSoftDeleteAllObjectRecords: true,
                canDestroyAllObjectRecords: true
            }
        });
        const petObjectMetadata = await this.objectMetadataRepository.findOneOrFail({
            where: {
                nameSingular: 'pet',
                workspaceId
            }
        });
        const rocketObjectMetadata = await this.objectMetadataRepository.findOneOrFail({
            where: {
                nameSingular: 'rocket',
                workspaceId
            }
        });
        const personObjectMetadata = await this.objectMetadataRepository.findOneOrFail({
            where: {
                nameSingular: 'person',
                workspaceId
            },
            relations: {
                fields: true
            }
        });
        const companyObjectMetadata = await this.objectMetadataRepository.findOneOrFail({
            where: {
                nameSingular: 'company',
                workspaceId
            },
            relations: {
                fields: true
            }
        });
        await this.objectPermissionService.upsertObjectPermissions({
            workspaceId,
            input: {
                roleId: customRole.id,
                objectPermissions: [
                    {
                        objectMetadataId: petObjectMetadata.id,
                        canReadObjectRecords: true,
                        canUpdateObjectRecords: false,
                        canSoftDeleteObjectRecords: false,
                        canDestroyObjectRecords: false
                    },
                    {
                        objectMetadataId: rocketObjectMetadata.id,
                        canReadObjectRecords: false,
                        canUpdateObjectRecords: false,
                        canSoftDeleteObjectRecords: false,
                        canDestroyObjectRecords: false
                    }
                ]
            }
        });
        const personCityFieldMetadata = personObjectMetadata.fields.find((field)=>field.name === 'city');
        if (!personCityFieldMetadata) {
            throw new Error('Person city field metadata not found');
        }
        const companyLinkedinLinkFieldMetadata = companyObjectMetadata.fields.find((field)=>field.name === 'linkedinLink');
        if (!companyLinkedinLinkFieldMetadata) {
            throw new Error('Company linkedin link field metadata not found');
        }
        const readOnlyOnPersonCityFieldPermission = {
            objectMetadataId: personObjectMetadata.id,
            fieldMetadataId: personCityFieldMetadata.id,
            canReadFieldValue: null,
            canUpdateFieldValue: false
        };
        const noReadOnCompanyLinkedinLinkFieldPermission = {
            objectMetadataId: companyObjectMetadata.id,
            fieldMetadataId: companyLinkedinLinkFieldMetadata.id,
            canReadFieldValue: false,
            canUpdateFieldValue: false
        };
        await this.fieldPermissionService.upsertFieldPermissions({
            workspaceId,
            input: {
                roleId: customRole.id,
                fieldPermissions: [
                    readOnlyOnPersonCityFieldPermission,
                    noReadOnCompanyLinkedinLinkFieldPermission
                ]
            }
        });
        return customRole;
    }
    constructor(roleService, userRoleService, objectPermissionService, objectMetadataRepository, roleRepository, fieldPermissionService, roleTargetService, coreDataSource){
        this.roleService = roleService;
        this.userRoleService = userRoleService;
        this.objectPermissionService = objectPermissionService;
        this.objectMetadataRepository = objectMetadataRepository;
        this.roleRepository = roleRepository;
        this.fieldPermissionService = fieldPermissionService;
        this.roleTargetService = roleTargetService;
        this.coreDataSource = coreDataSource;
        this.logger = new _common.Logger(DevSeederPermissionsService.name);
    }
};
DevSeederPermissionsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_param(7, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _roleservice.RoleService === "undefined" ? Object : _roleservice.RoleService,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _objectpermissionservice.ObjectPermissionService === "undefined" ? Object : _objectpermissionservice.ObjectPermissionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _fieldpermissionservice.FieldPermissionService === "undefined" ? Object : _fieldpermissionservice.FieldPermissionService,
        typeof _roletargetservice.RoleTargetService === "undefined" ? Object : _roletargetservice.RoleTargetService,
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource
    ])
], DevSeederPermissionsService);

//# sourceMappingURL=dev-seeder-permissions.service.js.map