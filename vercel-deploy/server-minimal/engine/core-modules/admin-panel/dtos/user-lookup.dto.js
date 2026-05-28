"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get UserInfoDTO () {
        return UserInfoDTO;
    },
    get UserLookup () {
        return UserLookup;
    }
});
const _graphql = require("@nestjs/graphql");
const _workspace = require("twenty-shared/workspace");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _featureflagdto = require("../../feature-flag/dtos/feature-flag.dto");
const _workspaceurlsdto = require("../../workspace/dtos/workspace-urls.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UserInfoDTO = class UserInfoDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], UserInfoDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], UserInfoDTO.prototype, "email", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UserInfoDTO.prototype, "firstName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UserInfoDTO.prototype, "lastName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UserInfoDTO.prototype, "avatarUrl", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UserInfoDTO.prototype, "createdAt", void 0);
UserInfoDTO = _ts_decorate([
    (0, _graphql.ObjectType)('UserInfo')
], UserInfoDTO);
let WorkspaceInfoDTO = class WorkspaceInfoDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], WorkspaceInfoDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], WorkspaceInfoDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], WorkspaceInfoDTO.prototype, "allowImpersonation", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], WorkspaceInfoDTO.prototype, "logo", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], WorkspaceInfoDTO.prototype, "totalUsers", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspace.WorkspaceActivationStatus),
    _ts_metadata("design:type", typeof _workspace.WorkspaceActivationStatus === "undefined" ? Object : _workspace.WorkspaceActivationStatus)
], WorkspaceInfoDTO.prototype, "activationStatus", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], WorkspaceInfoDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workspaceurlsdto.WorkspaceUrlsDTO),
    _ts_metadata("design:type", typeof _workspaceurlsdto.WorkspaceUrlsDTO === "undefined" ? Object : _workspaceurlsdto.WorkspaceUrlsDTO)
], WorkspaceInfoDTO.prototype, "workspaceUrls", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            UserInfoDTO
        ]),
    _ts_metadata("design:type", Array)
], WorkspaceInfoDTO.prototype, "users", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _featureflagdto.FeatureFlagDTO
        ]),
    _ts_metadata("design:type", Array)
], WorkspaceInfoDTO.prototype, "featureFlags", void 0);
WorkspaceInfoDTO = _ts_decorate([
    (0, _graphql.ObjectType)('WorkspaceInfo')
], WorkspaceInfoDTO);
let UserLookup = class UserLookup {
};
_ts_decorate([
    (0, _graphql.Field)(()=>UserInfoDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UserLookup.prototype, "user", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            WorkspaceInfoDTO
        ]),
    _ts_metadata("design:type", Array)
], UserLookup.prototype, "workspaces", void 0);
UserLookup = _ts_decorate([
    (0, _graphql.ObjectType)('UserLookup')
], UserLookup);

//# sourceMappingURL=user-lookup.dto.js.map