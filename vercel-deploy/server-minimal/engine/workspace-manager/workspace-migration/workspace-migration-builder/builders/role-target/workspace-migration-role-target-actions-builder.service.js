"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationRoleTargetActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationRoleTargetActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatroletargetvalidatorservice = require("../../validators/services/flat-role-target-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationRoleTargetActionsBuilderService = class WorkspaceMigrationRoleTargetActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatRoleTargetValidatorService.validateFlatRoleTargetCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatRoleTargetToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'roleTarget',
                flatEntity: flatRoleTargetToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatRoleTargetValidatorService.validateFlatRoleTargetDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatRoleTargetToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'roleTarget',
                universalIdentifier: flatRoleTargetToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatRoleTargetValidatorService.validateFlatRoleTargetUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateRoleTargetAction = {
            type: 'update',
            metadataName: 'roleTarget',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateRoleTargetAction
        };
    }
    constructor(flatRoleTargetValidatorService){
        super(_metadata.ALL_METADATA_NAME.roleTarget), this.flatRoleTargetValidatorService = flatRoleTargetValidatorService;
    }
};
WorkspaceMigrationRoleTargetActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatroletargetvalidatorservice.FlatRoleTargetValidatorService === "undefined" ? Object : _flatroletargetvalidatorservice.FlatRoleTargetValidatorService
    ])
], WorkspaceMigrationRoleTargetActionsBuilderService);

//# sourceMappingURL=workspace-migration-role-target-actions-builder.service.js.map