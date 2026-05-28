"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceEntity", {
    enumerable: true,
    get: function() {
        return WorkspaceEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _workspace = require("twenty-shared/workspace");
const _typeorm = require("typeorm");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _apikeyentity = require("../api-key/api-key.entity");
const _apptokenentity = require("../app-token/app-token.entity");
const _applicationentity = require("../application/application.entity");
const _applicationdto = require("../application/dtos/application.dto");
const _approvedaccessdomainentity = require("../approved-access-domain/approved-access-domain.entity");
const _emailingdomainentity = require("../emailing-domain/emailing-domain.entity");
const _featureflagentity = require("../feature-flag/feature-flag.entity");
const _fileentity = require("../file/entities/file.entity");
const _keyvaluepairentity = require("../key-value-pair/key-value-pair.entity");
const _publicdomainentity = require("../public-domain/public-domain.entity");
const _workspacessoidentityproviderentity = require("../sso/workspace-sso-identity-provider.entity");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _agententity = require("../../metadata-modules/ai/ai-agent/entities/agent.entity");
const _roledto = require("../../metadata-modules/role/dtos/role.dto");
const _viewfielddto = require("../../metadata-modules/view-field/dtos/view-field.dto");
const _viewfieldentity = require("../../metadata-modules/view-field/entities/view-field.entity");
const _viewfiltergroupdto = require("../../metadata-modules/view-filter-group/dtos/view-filter-group.dto");
const _viewfiltergroupentity = require("../../metadata-modules/view-filter-group/entities/view-filter-group.entity");
const _viewfilterdto = require("../../metadata-modules/view-filter/dtos/view-filter.dto");
const _viewfilterentity = require("../../metadata-modules/view-filter/entities/view-filter.entity");
const _viewgroupdto = require("../../metadata-modules/view-group/dtos/view-group.dto");
const _viewgroupentity = require("../../metadata-modules/view-group/entities/view-group.entity");
const _viewsortdto = require("../../metadata-modules/view-sort/dtos/view-sort.dto");
const _viewsortentity = require("../../metadata-modules/view-sort/entities/view-sort.entity");
const _viewdto = require("../../metadata-modules/view/dtos/view.dto");
const _viewentity = require("../../metadata-modules/view/entities/view.entity");
const _webhookentity = require("../../metadata-modules/webhook/entities/webhook.entity");
const _constants = require("twenty-shared/constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_workspace.WorkspaceActivationStatus, {
    name: 'WorkspaceActivationStatus'
});
let WorkspaceEntity = class WorkspaceEntity {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], WorkspaceEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceEntity.prototype, "displayName", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceEntity.prototype, "logo", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], WorkspaceEntity.prototype, "logoFileId", void 0);
_ts_decorate([
    (0, _typeorm.OneToOne)(()=>_fileentity.FileEntity, {
        onDelete: 'SET NULL',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'logoFileId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "logoFile", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceEntity.prototype, "inviteHash", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkspaceEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkspaceEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkspaceEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "allowImpersonation", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "isPublicInviteLinkEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        type: 'integer',
        default: 14
    }),
    _ts_metadata("design:type", Number)
], WorkspaceEntity.prototype, "trashRetentionDays", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        type: 'integer',
        default: 90
    }),
    _ts_metadata("design:type", Number)
], WorkspaceEntity.prototype, "eventLogRetentionDays", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_apptokenentity.AppTokenEntity, (appToken)=>appToken.workspace, {
        cascade: true
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "appTokens", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_keyvaluepairentity.KeyValuePairEntity, (keyValuePair)=>keyValuePair.workspace, {
        cascade: true
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "keyValuePairs", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_userworkspaceentity.UserWorkspaceEntity, (userWorkspace)=>userWorkspace.workspace, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "workspaceUsers", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_featureflagentity.FeatureFlagEntity, (featureFlag)=>featureFlag.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "featureFlags", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_approvedaccessdomainentity.ApprovedAccessDomainEntity, (approvedAccessDomain)=>approvedAccessDomain.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "approvedAccessDomains", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_emailingdomainentity.EmailingDomainEntity, (emailingDomain)=>emailingDomain.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "emailingDomains", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_publicdomainentity.PublicDomainEntity, (publicDomain)=>publicDomain.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "publicDomains", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], WorkspaceEntity.prototype, "workspaceMembersCount", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspace.WorkspaceActivationStatus),
    (0, _typeorm.Column)({
        type: 'enum',
        enumName: 'workspace_activationStatus_enum',
        enum: _workspace.WorkspaceActivationStatus,
        default: _workspace.WorkspaceActivationStatus.INACTIVE
    }),
    (0, _typeorm.Index)('IDX_WORKSPACE_ACTIVATION_STATUS'),
    _ts_metadata("design:type", typeof _workspace.WorkspaceActivationStatus === "undefined" ? Object : _workspace.WorkspaceActivationStatus)
], WorkspaceEntity.prototype, "activationStatus", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], WorkspaceEntity.prototype, "suspendedAt", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_workspacessoidentityproviderentity.WorkspaceSSOIdentityProviderEntity, (workspaceSSOIdentityProviders)=>workspaceSSOIdentityProviders.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "workspaceSSOIdentityProviders", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_agententity.AgentEntity, (agent)=>agent.workspace, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "agents", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_webhookentity.WebhookEntity, (webhook)=>webhook.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "webhooks", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_apikeyentity.ApiKeyEntity, (apiKey)=>apiKey.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "apiKeys", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewdto.ViewDTO
        ], {
        nullable: true
    }),
    (0, _typeorm.OneToMany)(()=>_viewentity.ViewEntity, (view)=>view.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "views", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewfielddto.ViewFieldDTO
        ], {
        nullable: true
    }),
    (0, _typeorm.OneToMany)(()=>_viewfieldentity.ViewFieldEntity, (viewField)=>viewField.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "viewFields", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewfilterdto.ViewFilterDTO
        ], {
        nullable: true
    }),
    (0, _typeorm.OneToMany)(()=>_viewfilterentity.ViewFilterEntity, (viewFilter)=>viewFilter.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "viewFilters", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewfiltergroupdto.ViewFilterGroupDTO
        ], {
        nullable: true
    }),
    (0, _typeorm.OneToMany)(()=>_viewfiltergroupentity.ViewFilterGroupEntity, (viewFilterGroup)=>viewFilterGroup.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "viewFilterGroups", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewgroupdto.ViewGroupDTO
        ], {
        nullable: true
    }),
    (0, _typeorm.OneToMany)(()=>_viewgroupentity.ViewGroupEntity, (viewGroup)=>viewGroup.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "viewGroups", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewsortdto.ViewSortDTO
        ], {
        nullable: true
    }),
    (0, _typeorm.OneToMany)(()=>_viewsortentity.ViewSortEntity, (viewSort)=>viewSort.workspace),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "viewSorts", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: 1
    }),
    _ts_metadata("design:type", Number)
], WorkspaceEntity.prototype, "metadataVersion", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true,
        default: null
    }),
    _ts_metadata("design:type", Object)
], WorkspaceEntity.prototype, "databaseSchema", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        unique: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceEntity.prototype, "subdomain", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _typeorm.Column)({
        type: 'varchar',
        unique: true,
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], WorkspaceEntity.prototype, "customDomain", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "isGoogleAuthEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "isGoogleAuthBypassEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "isTwoFactorAuthenticationEnforced", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "isPasswordAuthEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "isPasswordAuthBypassEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "isMicrosoftAuthEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "isMicrosoftAuthBypassEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "isCustomDomainEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "isInternalMessagesImportEnabled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    (0, _typeorm.Column)({
        type: 'varchar',
        array: true,
        nullable: true,
        default: '{email,profilePicture,firstName,lastName}'
    }),
    _ts_metadata("design:type", Object)
], WorkspaceEntity.prototype, "editableProfileFields", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], WorkspaceEntity.prototype, "defaultRoleId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_roledto.RoleDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], WorkspaceEntity.prototype, "defaultRole", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: false
    }),
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false,
        default: _constants.AUTO_SELECT_FAST_MODEL_ID
    }),
    _ts_metadata("design:type", typeof ModelId === "undefined" ? Object : ModelId)
], WorkspaceEntity.prototype, "fastModel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: false
    }),
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false,
        default: _constants.AUTO_SELECT_SMART_MODEL_ID
    }),
    _ts_metadata("design:type", typeof ModelId === "undefined" ? Object : ModelId)
], WorkspaceEntity.prototype, "smartModel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], WorkspaceEntity.prototype, "aiAdditionalInstructions", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    (0, _typeorm.Column)({
        type: 'varchar',
        array: true,
        nullable: false,
        default: '{}'
    }),
    _ts_metadata("design:type", Array)
], WorkspaceEntity.prototype, "enabledAiModelIds", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: false
    }),
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], WorkspaceEntity.prototype, "useRecommendedModels", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], WorkspaceEntity.prototype, "workspaceCustomApplicationId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: false
    }),
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false,
        default: 'auto'
    }),
    _ts_metadata("design:type", typeof ModelId === "undefined" ? Object : ModelId)
], WorkspaceEntity.prototype, "routerModel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_applicationdto.ApplicationDTO, {
        nullable: true
    }),
    (0, _typeorm.ManyToOne)(()=>_applicationentity.ApplicationEntity, {
        onDelete: 'RESTRICT',
        nullable: false
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceCustomApplicationId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "workspaceCustomApplication", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_applicationentity.ApplicationEntity, (application)=>application.workspace, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], WorkspaceEntity.prototype, "applications", void 0);
WorkspaceEntity = _ts_decorate([
    (0, _typeorm.Check)('onboarded_workspace_requires_default_role', `"activationStatus" IN ('PENDING_CREATION', 'ONGOING_CREATION') OR "defaultRoleId" IS NOT NULL`),
    (0, _typeorm.Entity)({
        name: 'workspace',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('Workspace')
], WorkspaceEntity);

//# sourceMappingURL=workspace.entity.js.map