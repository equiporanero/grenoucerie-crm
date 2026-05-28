"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationViewSortActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationViewSortActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatviewsortvalidatorservice = require("../../validators/services/flat-view-sort-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationViewSortActionsBuilderService = class WorkspaceMigrationViewSortActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatViewSortValidatorService.validateFlatViewSortCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatViewSortToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'viewSort',
                flatEntity: flatViewSortToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatViewSortValidatorService.validateFlatViewSortDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatViewSortToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'viewSort',
                universalIdentifier: flatViewSortToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatViewSortValidatorService.validateFlatViewSortUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateViewSortAction = {
            type: 'update',
            metadataName: 'viewSort',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateViewSortAction
        };
    }
    constructor(flatViewSortValidatorService){
        super(_metadata.ALL_METADATA_NAME.viewSort), this.flatViewSortValidatorService = flatViewSortValidatorService;
    }
};
WorkspaceMigrationViewSortActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatviewsortvalidatorservice.FlatViewSortValidatorService === "undefined" ? Object : _flatviewsortvalidatorservice.FlatViewSortValidatorService
    ])
], WorkspaceMigrationViewSortActionsBuilderService);

//# sourceMappingURL=workspace-migration-view-sort-actions.builder.service.js.map