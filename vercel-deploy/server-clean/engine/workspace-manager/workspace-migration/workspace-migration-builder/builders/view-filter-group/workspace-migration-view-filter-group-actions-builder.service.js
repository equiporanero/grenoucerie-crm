"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationViewFilterGroupActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationViewFilterGroupActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatviewfiltergroupvalidatorservice = require("../../validators/services/flat-view-filter-group-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationViewFilterGroupActionsBuilderService = class WorkspaceMigrationViewFilterGroupActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatViewFilterGroupValidatorService.validateFlatViewFilterGroupCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatViewFilterGroupToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'viewFilterGroup',
                flatEntity: flatViewFilterGroupToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatViewFilterGroupValidatorService.validateFlatViewFilterGroupDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatViewFilterGroupToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'viewFilterGroup',
                universalIdentifier: flatViewFilterGroupToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatViewFilterGroupValidatorService.validateFlatViewFilterGroupUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateViewFilterGroupAction = {
            type: 'update',
            metadataName: 'viewFilterGroup',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateViewFilterGroupAction
        };
    }
    constructor(flatViewFilterGroupValidatorService){
        super(_metadata.ALL_METADATA_NAME.viewFilterGroup), this.flatViewFilterGroupValidatorService = flatViewFilterGroupValidatorService;
    }
};
WorkspaceMigrationViewFilterGroupActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatviewfiltergroupvalidatorservice.FlatViewFilterGroupValidatorService === "undefined" ? Object : _flatviewfiltergroupvalidatorservice.FlatViewFilterGroupValidatorService
    ])
], WorkspaceMigrationViewFilterGroupActionsBuilderService);

//# sourceMappingURL=workspace-migration-view-filter-group-actions-builder.service.js.map