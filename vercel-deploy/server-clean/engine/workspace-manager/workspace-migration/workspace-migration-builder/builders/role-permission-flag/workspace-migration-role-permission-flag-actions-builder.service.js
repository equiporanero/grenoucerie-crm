"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationRolePermissionFlagActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationRolePermissionFlagActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatrolepermissionflagvalidatorservice = require("../../validators/services/flat-role-permission-flag-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationRolePermissionFlagActionsBuilderService = class WorkspaceMigrationRolePermissionFlagActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatRolePermissionFlagValidatorService.validateFlatRolePermissionFlagCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatRolePermissionFlagToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'rolePermissionFlag',
                flatEntity: flatRolePermissionFlagToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatRolePermissionFlagValidatorService.validateFlatRolePermissionFlagDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatRolePermissionFlagToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'rolePermissionFlag',
                universalIdentifier: flatRolePermissionFlagToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatRolePermissionFlagValidatorService.validateFlatRolePermissionFlagUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateRolePermissionFlagAction = {
            type: 'update',
            metadataName: 'rolePermissionFlag',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateRolePermissionFlagAction
        };
    }
    constructor(flatRolePermissionFlagValidatorService){
        super(_metadata.ALL_METADATA_NAME.rolePermissionFlag), this.flatRolePermissionFlagValidatorService = flatRolePermissionFlagValidatorService;
    }
};
WorkspaceMigrationRolePermissionFlagActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatrolepermissionflagvalidatorservice.FlatRolePermissionFlagValidatorService === "undefined" ? Object : _flatrolepermissionflagvalidatorservice.FlatRolePermissionFlagValidatorService
    ])
], WorkspaceMigrationRolePermissionFlagActionsBuilderService);

//# sourceMappingURL=workspace-migration-role-permission-flag-actions-builder.service.js.map