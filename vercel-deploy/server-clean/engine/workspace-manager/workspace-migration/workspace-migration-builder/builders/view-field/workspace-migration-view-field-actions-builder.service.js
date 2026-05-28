"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationViewFieldActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationViewFieldActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatviewfieldvalidatorservice = require("../../validators/services/flat-view-field-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationViewFieldActionsBuilderService = class WorkspaceMigrationViewFieldActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatViewFieldValidatorService.validateFlatViewFieldCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'viewField',
                flatEntity: args.flatEntityToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatViewFieldValidatorService.validateFlatViewFieldDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatViewFieldToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'viewField',
                universalIdentifier: flatViewFieldToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatViewFieldValidatorService.validateFlatViewFieldUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateViewFieldAction = {
            type: 'update',
            metadataName: 'viewField',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateViewFieldAction
        };
    }
    constructor(flatViewFieldValidatorService){
        super(_metadata.ALL_METADATA_NAME.viewField), this.flatViewFieldValidatorService = flatViewFieldValidatorService;
    }
};
WorkspaceMigrationViewFieldActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatviewfieldvalidatorservice.FlatViewFieldValidatorService === "undefined" ? Object : _flatviewfieldvalidatorservice.FlatViewFieldValidatorService
    ])
], WorkspaceMigrationViewFieldActionsBuilderService);

//# sourceMappingURL=workspace-migration-view-field-actions-builder.service.js.map