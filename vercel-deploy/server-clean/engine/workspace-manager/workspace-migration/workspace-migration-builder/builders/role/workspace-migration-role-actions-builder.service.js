"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationRoleActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationRoleActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatrolevalidatorservice = require("../../validators/services/flat-role-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationRoleActionsBuilderService = class WorkspaceMigrationRoleActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatRoleValidatorService.validateFlatRoleCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatRoleToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'role',
                flatEntity: flatRoleToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatRoleValidatorService.validateFlatRoleDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatRoleToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'role',
                universalIdentifier: flatRoleToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatRoleValidatorService.validateFlatRoleUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateRoleAction = {
            type: 'update',
            metadataName: 'role',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateRoleAction
        };
    }
    constructor(flatRoleValidatorService){
        super(_metadata.ALL_METADATA_NAME.role), this.flatRoleValidatorService = flatRoleValidatorService;
    }
};
WorkspaceMigrationRoleActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatrolevalidatorservice.FlatRoleValidatorService === "undefined" ? Object : _flatrolevalidatorservice.FlatRoleValidatorService
    ])
], WorkspaceMigrationRoleActionsBuilderService);

//# sourceMappingURL=workspace-migration-role-actions-builder.service.js.map