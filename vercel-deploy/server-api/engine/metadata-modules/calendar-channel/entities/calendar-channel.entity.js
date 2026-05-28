"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarChannelEntity", {
    enumerable: true,
    get: function() {
        return CalendarChannelEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
const _types = require("twenty-shared/types");
const _connectedaccountentity = require("../../connected-account/entities/connected-account.entity");
const _workspacerelatedentity = require("../../../workspace-manager/types/workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_types.CalendarChannelVisibility, {
    name: 'CalendarChannelVisibility'
});
(0, _graphql.registerEnumType)(_types.CalendarChannelSyncStatus, {
    name: 'CalendarChannelSyncStatus'
});
(0, _graphql.registerEnumType)(_types.CalendarChannelSyncStage, {
    name: 'CalendarChannelSyncStage'
});
(0, _graphql.registerEnumType)(_types.CalendarChannelContactAutoCreationPolicy, {
    name: 'CalendarChannelContactAutoCreationPolicy'
});
let CalendarChannelEntity = class CalendarChannelEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], CalendarChannelEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], CalendarChannelEntity.prototype, "handle", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.CalendarChannelSyncStatus,
        nullable: false,
        default: _types.CalendarChannelSyncStatus.NOT_SYNCED
    }),
    _ts_metadata("design:type", typeof _types.CalendarChannelSyncStatus === "undefined" ? Object : _types.CalendarChannelSyncStatus)
], CalendarChannelEntity.prototype, "syncStatus", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.CalendarChannelSyncStage,
        nullable: false
    }),
    _ts_metadata("design:type", typeof _types.CalendarChannelSyncStage === "undefined" ? Object : _types.CalendarChannelSyncStage)
], CalendarChannelEntity.prototype, "syncStage", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.CalendarChannelVisibility,
        nullable: false
    }),
    _ts_metadata("design:type", typeof _types.CalendarChannelVisibility === "undefined" ? Object : _types.CalendarChannelVisibility)
], CalendarChannelEntity.prototype, "visibility", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], CalendarChannelEntity.prototype, "isContactAutoCreationEnabled", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.CalendarChannelContactAutoCreationPolicy,
        nullable: false,
        default: _types.CalendarChannelContactAutoCreationPolicy.AS_PARTICIPANT_AND_ORGANIZER
    }),
    _ts_metadata("design:type", typeof _types.CalendarChannelContactAutoCreationPolicy === "undefined" ? Object : _types.CalendarChannelContactAutoCreationPolicy)
], CalendarChannelEntity.prototype, "contactAutoCreationPolicy", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], CalendarChannelEntity.prototype, "isSyncEnabled", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], CalendarChannelEntity.prototype, "syncCursor", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], CalendarChannelEntity.prototype, "syncedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], CalendarChannelEntity.prototype, "syncStageStartedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'integer',
        nullable: false,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], CalendarChannelEntity.prototype, "throttleFailureCount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], CalendarChannelEntity.prototype, "connectedAccountId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_connectedaccountentity.ConnectedAccountEntity, (connectedAccount)=>connectedAccount.calendarChannels, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'connectedAccountId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], CalendarChannelEntity.prototype, "connectedAccount", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CalendarChannelEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CalendarChannelEntity.prototype, "updatedAt", void 0);
CalendarChannelEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'calendarChannel',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_CALENDAR_CHANNEL_WORKSPACE_ID_SYNC_ENABLED_SYNC_STAGE', [
        'workspaceId',
        'isSyncEnabled',
        'syncStage'
    ])
], CalendarChannelEntity);

//# sourceMappingURL=calendar-channel.entity.js.map