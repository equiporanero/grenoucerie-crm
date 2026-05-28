"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationViewFilterActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationViewFilterActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatviewfiltervalidatorservice = require("../../validators/services/flat-view-filter-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationViewFilterActionsBuilderService = class WorkspaceMigrationViewFilterActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatViewFilterValidatorService.validateFlatViewFilterCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatViewFilterToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'viewFilter',
                flatEntity: flatViewFilterToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatViewFilterValidatorService.validateFlatViewFilterDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatViewFilterToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'viewFilter',
                universalIdentifier: flatViewFilterToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatViewFilterValidatorService.validateFlatViewFilterUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateViewFilterAction = {
            type: 'update',
            metadataName: 'viewFilter',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateViewFilterAction
        };
    }
    constructor(flatViewFilterValidatorService){
        super(_metadata.ALL_METADATA_NAME.viewFilter), this.flatViewFilterValidatorService = flatViewFilterValidatorService;
    }
};
WorkspaceMigrationViewFilterActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatviewfiltervalidatorservice.FlatViewFilterValidatorService === "undefined" ? Object : _flatviewfiltervalidatorservice.FlatViewFilterValidatorService
    ])
], WorkspaceMigrationViewFilterActionsBuilderService);

//# sourceMappingURL=workspace-migration-view-filter-actions-builder.service.js.map