"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationObjectPermissionActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationObjectPermissionActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatobjectpermissionvalidatorservice = require("../../validators/services/flat-object-permission-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationObjectPermissionActionsBuilderService = class WorkspaceMigrationObjectPermissionActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatObjectPermissionValidatorService.validateFlatObjectPermissionCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatObjectPermissionToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'objectPermission',
                flatEntity: flatObjectPermissionToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatObjectPermissionValidatorService.validateFlatObjectPermissionDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatObjectPermissionToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'objectPermission',
                universalIdentifier: flatObjectPermissionToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatObjectPermissionValidatorService.validateFlatObjectPermissionUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateObjectPermissionAction = {
            type: 'update',
            metadataName: 'objectPermission',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateObjectPermissionAction
        };
    }
    constructor(flatObjectPermissionValidatorService){
        super(_metadata.ALL_METADATA_NAME.objectPermission), this.flatObjectPermissionValidatorService = flatObjectPermissionValidatorService;
    }
};
WorkspaceMigrationObjectPermissionActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatobjectpermissionvalidatorservice.FlatObjectPermissionValidatorService === "undefined" ? Object : _flatobjectpermissionvalidatorservice.FlatObjectPermissionValidatorService
    ])
], WorkspaceMigrationObjectPermissionActionsBuilderService);

//# sourceMappingURL=workspace-migration-object-permission-actions-builder.service.js.map