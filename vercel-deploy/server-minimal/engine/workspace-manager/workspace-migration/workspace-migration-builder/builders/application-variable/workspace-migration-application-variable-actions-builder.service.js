"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationApplicationVariableActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationApplicationVariableActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatapplicationvariablevalidatorservice = require("../../validators/services/flat-application-variable-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationApplicationVariableActionsBuilderService = class WorkspaceMigrationApplicationVariableActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatApplicationVariableValidatorService.validateFlatApplicationVariableCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatApplicationVariableToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'applicationVariable',
                flatEntity: flatApplicationVariableToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatApplicationVariableValidatorService.validateFlatApplicationVariableDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatApplicationVariableToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'applicationVariable',
                universalIdentifier: flatApplicationVariableToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatApplicationVariableValidatorService.validateFlatApplicationVariableUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateAction = {
            type: 'update',
            metadataName: 'applicationVariable',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateAction
        };
    }
    constructor(flatApplicationVariableValidatorService){
        super(_metadata.ALL_METADATA_NAME.applicationVariable), this.flatApplicationVariableValidatorService = flatApplicationVariableValidatorService;
    }
};
WorkspaceMigrationApplicationVariableActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatapplicationvariablevalidatorservice.FlatApplicationVariableValidatorService === "undefined" ? Object : _flatapplicationvariablevalidatorservice.FlatApplicationVariableValidatorService
    ])
], WorkspaceMigrationApplicationVariableActionsBuilderService);

//# sourceMappingURL=workspace-migration-application-variable-actions-builder.service.js.map