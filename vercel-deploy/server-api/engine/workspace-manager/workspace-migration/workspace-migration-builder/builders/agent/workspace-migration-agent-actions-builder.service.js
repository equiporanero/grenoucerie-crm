"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationAgentActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationAgentActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatagentvalidatorservice = require("../../validators/services/flat-agent-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationAgentActionsBuilderService = class WorkspaceMigrationAgentActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatAgentValidatorService.validateFlatAgentCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatAgentToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'agent',
                flatEntity: flatAgentToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatAgentValidatorService.validateFlatAgentDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatAgentToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'agent',
                universalIdentifier: flatAgentToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatAgentValidatorService.validateFlatAgentUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateAgentAction = {
            type: 'update',
            metadataName: 'agent',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateAgentAction
        };
    }
    constructor(flatAgentValidatorService){
        super(_metadata.ALL_METADATA_NAME.agent), this.flatAgentValidatorService = flatAgentValidatorService;
    }
};
WorkspaceMigrationAgentActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatagentvalidatorservice.FlatAgentValidatorService === "undefined" ? Object : _flatagentvalidatorservice.FlatAgentValidatorService
    ])
], WorkspaceMigrationAgentActionsBuilderService);

//# sourceMappingURL=workspace-migration-agent-actions-builder.service.js.map