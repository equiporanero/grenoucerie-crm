"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationFieldActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationFieldActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatfieldmetadatavalidatorservice = require("../../validators/services/flat-field-metadata-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationFieldActionsBuilderService = class WorkspaceMigrationFieldActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatFieldValidatorService.validateFlatFieldMetadataCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatFieldMetadataToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'fieldMetadata',
                flatEntity: flatFieldMetadataToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatFieldValidatorService.validateFlatFieldMetadataDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatFieldMetadataToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'fieldMetadata',
                universalIdentifier: flatFieldMetadataToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatFieldValidatorService.validateFlatFieldMetadataUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateFieldAction = {
            type: 'update',
            metadataName: 'fieldMetadata',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateFieldAction
        };
    }
    constructor(flatFieldValidatorService){
        super(_metadata.ALL_METADATA_NAME.fieldMetadata), this.flatFieldValidatorService = flatFieldValidatorService;
    }
};
WorkspaceMigrationFieldActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatfieldmetadatavalidatorservice.FlatFieldMetadataValidatorService === "undefined" ? Object : _flatfieldmetadatavalidatorservice.FlatFieldMetadataValidatorService
    ])
], WorkspaceMigrationFieldActionsBuilderService);

//# sourceMappingURL=workspace-migration-field-actions-builder.service.js.map