"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationFieldPermissionActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationFieldPermissionActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatfieldpermissionvalidatorservice = require("../../validators/services/flat-field-permission-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationFieldPermissionActionsBuilderService = class WorkspaceMigrationFieldPermissionActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatFieldPermissionValidatorService.validateFlatFieldPermissionCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatFieldPermissionToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'fieldPermission',
                flatEntity: flatFieldPermissionToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatFieldPermissionValidatorService.validateFlatFieldPermissionDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatFieldPermissionToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'fieldPermission',
                universalIdentifier: flatFieldPermissionToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatFieldPermissionValidatorService.validateFlatFieldPermissionUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateFieldPermissionAction = {
            type: 'update',
            metadataName: 'fieldPermission',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateFieldPermissionAction
        };
    }
    constructor(flatFieldPermissionValidatorService){
        super(_metadata.ALL_METADATA_NAME.fieldPermission), this.flatFieldPermissionValidatorService = flatFieldPermissionValidatorService;
    }
};
WorkspaceMigrationFieldPermissionActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatfieldpermissionvalidatorservice.FlatFieldPermissionValidatorService === "undefined" ? Object : _flatfieldpermissionvalidatorservice.FlatFieldPermissionValidatorService
    ])
], WorkspaceMigrationFieldPermissionActionsBuilderService);

//# sourceMappingURL=workspace-migration-field-permission-actions-builder.service.js.map