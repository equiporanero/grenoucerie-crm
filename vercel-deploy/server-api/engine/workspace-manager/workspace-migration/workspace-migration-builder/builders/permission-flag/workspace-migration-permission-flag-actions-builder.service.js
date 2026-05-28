"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationPermissionFlagActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationPermissionFlagActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatpermissionflagvalidatorservice = require("../../validators/services/flat-permission-flag-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationPermissionFlagActionsBuilderService = class WorkspaceMigrationPermissionFlagActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatPermissionFlagValidatorService.validateFlatPermissionFlagCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatPermissionFlagToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'permissionFlag',
                flatEntity: flatPermissionFlagToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatPermissionFlagValidatorService.validateFlatPermissionFlagDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatPermissionFlagToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'permissionFlag',
                universalIdentifier: flatPermissionFlagToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatPermissionFlagValidatorService.validateFlatPermissionFlagUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateAction = {
            type: 'update',
            metadataName: 'permissionFlag',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateAction
        };
    }
    constructor(flatPermissionFlagValidatorService){
        super(_metadata.ALL_METADATA_NAME.permissionFlag), this.flatPermissionFlagValidatorService = flatPermissionFlagValidatorService;
    }
};
WorkspaceMigrationPermissionFlagActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatpermissionflagvalidatorservice.FlatPermissionFlagValidatorService === "undefined" ? Object : _flatpermissionflagvalidatorservice.FlatPermissionFlagValidatorService
    ])
], WorkspaceMigrationPermissionFlagActionsBuilderService);

//# sourceMappingURL=workspace-migration-permission-flag-actions-builder.service.js.map