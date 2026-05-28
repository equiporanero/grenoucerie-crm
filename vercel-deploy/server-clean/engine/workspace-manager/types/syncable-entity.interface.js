"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SyncableEntity", {
    enumerable: true,
    get: function() {
        return SyncableEntity;
    }
});
const _typeorm = require("typeorm");
const _workspacerelatedentity = require("./workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SyncableEntity = class SyncableEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], SyncableEntity.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], SyncableEntity.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('ApplicationEntity', {
        onDelete: 'CASCADE',
        nullable: false
    }),
    (0, _typeorm.JoinColumn)({
        name: 'applicationId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], SyncableEntity.prototype, "application", void 0);
SyncableEntity = _ts_decorate([
    (0, _typeorm.Index)([
        'workspaceId',
        'universalIdentifier'
    ], {
        unique: true
    })
], SyncableEntity);

//# sourceMappingURL=syncable-entity.interface.js.map