"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationLogicFunctionActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationLogicFunctionActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatlogicfunctionvalidatorservice = require("../../validators/services/flat-logic-function-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationLogicFunctionActionsBuilderService = class WorkspaceMigrationLogicFunctionActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    async validateAndBuild(args) {
        const baseResult = await super.validateAndBuild(args);
        if (baseResult.status === 'fail') {
            return baseResult;
        }
        const updatedActions = baseResult.actions.update.map((action)=>{
            return action;
        });
        return {
            ...baseResult,
            actions: {
                ...baseResult.actions,
                update: updatedActions
            }
        };
    }
    validateFlatEntityCreation(args) {
        const validationResult = this.flatLogicFunctionValidatorService.validateFlatLogicFunctionCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatLogicFunctionToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'logicFunction',
                flatEntity: flatLogicFunctionToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatLogicFunctionValidatorService.validateFlatLogicFunctionDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatLogicFunctionToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'logicFunction',
                universalIdentifier: flatLogicFunctionToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatLogicFunctionValidatorService.validateFlatLogicFunctionUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateLogicFunctionAction = {
            type: 'update',
            metadataName: 'logicFunction',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateLogicFunctionAction
        };
    }
    constructor(flatLogicFunctionValidatorService){
        super(_metadata.ALL_METADATA_NAME.logicFunction), this.flatLogicFunctionValidatorService = flatLogicFunctionValidatorService;
    }
};
WorkspaceMigrationLogicFunctionActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatlogicfunctionvalidatorservice.FlatLogicFunctionValidatorService === "undefined" ? Object : _flatlogicfunctionvalidatorservice.FlatLogicFunctionValidatorService
    ])
], WorkspaceMigrationLogicFunctionActionsBuilderService);

//# sourceMappingURL=workspace-migration-logic-function-actions-builder.service.js.map