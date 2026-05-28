"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationSkillActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationSkillActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatskillvalidatorservice = require("../../validators/services/flat-skill-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationSkillActionsBuilderService = class WorkspaceMigrationSkillActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatSkillValidatorService.validateFlatSkillCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatSkillToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'skill',
                flatEntity: flatSkillToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatSkillValidatorService.validateFlatSkillDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatSkillToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'skill',
                universalIdentifier: flatSkillToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatSkillValidatorService.validateFlatSkillUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateSkillAction = {
            type: 'update',
            metadataName: 'skill',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateSkillAction
        };
    }
    constructor(flatSkillValidatorService){
        super(_metadata.ALL_METADATA_NAME.skill), this.flatSkillValidatorService = flatSkillValidatorService;
    }
};
WorkspaceMigrationSkillActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatskillvalidatorservice.FlatSkillValidatorService === "undefined" ? Object : _flatskillvalidatorservice.FlatSkillValidatorService
    ])
], WorkspaceMigrationSkillActionsBuilderService);

//# sourceMappingURL=workspace-migration-skill-actions-builder.service.js.map