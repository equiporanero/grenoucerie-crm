"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationEntity", {
    enumerable: true,
    get: function() {
        return ApplicationEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
const _applicationregistrationentity = require("./application-registration/application-registration.entity");
const _applicationregistrationsourcetypeenum = require("./application-registration/enums/application-registration-source-type.enum");
const _fileentity = require("../file/entities/file.entity");
const _applicationvariableentity = require("./application-variable/application-variable.entity");
const _wasintroducedinupgradedecorator = require("../upgrade/decorators/was-introduced-in-upgrade.decorator");
const _agententity = require("../../metadata-modules/ai/ai-agent/entities/agent.entity");
const _commandmenuitementity = require("../../metadata-modules/command-menu-item/entities/command-menu-item.entity");
const _frontcomponententity = require("../../metadata-modules/front-component/entities/front-component.entity");
const _logicfunctionentity = require("../../metadata-modules/logic-function/logic-function.entity");
const _objectmetadataentity = require("../../metadata-modules/object-metadata/object-metadata.entity");
const _roledto = require("../../metadata-modules/role/dtos/role.dto");
const _workspacerelatedentity = require("../../workspace-manager/types/workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ApplicationEntity = class ApplicationEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ApplicationEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ApplicationEntity.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], ApplicationEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
        upgradeCommandName: '2.2.0_AddLogoToApplicationFastInstanceCommand_1777539664664'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "logo", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "version", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        default: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.LOCAL
    }),
    _ts_metadata("design:type", typeof _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType === "undefined" ? Object : _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType)
], ApplicationEntity.prototype, "sourceType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], ApplicationEntity.prototype, "sourcePath", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "packageJsonChecksum", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "packageJsonFileId", void 0);
_ts_decorate([
    (0, _typeorm.OneToOne)(()=>_fileentity.FileEntity, {
        onDelete: 'RESTRICT'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'packageJsonFileId'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "packageJsonFile", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "yarnLockChecksum", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "yarnLockFileId", void 0);
_ts_decorate([
    (0, _typeorm.OneToOne)(()=>_fileentity.FileEntity, {
        onDelete: 'RESTRICT'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'yarnLockFileId'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "yarnLockFile", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: false,
        default: {}
    }),
    _ts_metadata("design:type", typeof Record === "undefined" ? Object : Record)
], ApplicationEntity.prototype, "availablePackages", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "logicFunctionLayerId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "defaultRoleId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_roledto.RoleDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "defaultRole", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "settingsCustomTabFrontComponentId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'boolean',
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], ApplicationEntity.prototype, "canBeUninstalled", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'boolean',
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], ApplicationEntity.prototype, "isSdkLayerStale", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "applicationRegistrationId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_applicationregistrationentity.ApplicationRegistrationEntity, {
        onDelete: 'SET NULL',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'applicationRegistrationId'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "applicationRegistration", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_agententity.AgentEntity, (agent)=>agent.application, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ApplicationEntity.prototype, "agents", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_logicfunctionentity.LogicFunctionEntity, (logicFunction)=>logicFunction.application, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ApplicationEntity.prototype, "logicFunctions", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_objectmetadataentity.ObjectMetadataEntity, (object)=>object.application, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ApplicationEntity.prototype, "objects", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_frontcomponententity.FrontComponentEntity, (frontComponent)=>frontComponent.application, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ApplicationEntity.prototype, "frontComponents", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_commandmenuitementity.CommandMenuItemEntity, (commandMenuItem)=>commandMenuItem.application, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ApplicationEntity.prototype, "commandMenuItems", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_applicationvariableentity.ApplicationVariableEntity, (applicationVariable)=>applicationVariable.application, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ApplicationEntity.prototype, "applicationVariables", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApplicationEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApplicationEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], ApplicationEntity.prototype, "deletedAt", void 0);
ApplicationEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'application',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('Application'),
    (0, _typeorm.Index)('IDX_APPLICATION_WORKSPACE_ID', [
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_APPLICATION_UNIVERSAL_IDENTIFIER_WORKSPACE_ID_UNIQUE', [
        'universalIdentifier',
        'workspaceId'
    ], {
        unique: true,
        where: '"deletedAt" IS NULL AND "universalIdentifier" IS NOT NULL'
    })
], ApplicationEntity);

//# sourceMappingURL=application.entity.js.map