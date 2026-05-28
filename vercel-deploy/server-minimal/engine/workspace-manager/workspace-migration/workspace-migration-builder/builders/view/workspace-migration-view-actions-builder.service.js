"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationViewActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationViewActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatviewvalidatorservice = require("../../validators/services/flat-view-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationViewActionsBuilderService = class WorkspaceMigrationViewActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatViewValidatorService.validateFlatViewCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatViewToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'view',
                flatEntity: flatViewToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatViewValidatorService.validateFlatViewDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatViewToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'view',
                universalIdentifier: flatViewToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatViewValidatorService.validateFlatViewUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateViewAction = {
            type: 'update',
            metadataName: 'view',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateViewAction
        };
    }
    constructor(flatViewValidatorService){
        super(_metadata.ALL_METADATA_NAME.view), this.flatViewValidatorService = flatViewValidatorService;
    }
};
WorkspaceMigrationViewActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatviewvalidatorservice.FlatViewValidatorService === "undefined" ? Object : _flatviewvalidatorservice.FlatViewValidatorService
    ])
], WorkspaceMigrationViewActionsBuilderService);

//# sourceMappingURL=workspace-migration-view-actions-builder.service.js.map