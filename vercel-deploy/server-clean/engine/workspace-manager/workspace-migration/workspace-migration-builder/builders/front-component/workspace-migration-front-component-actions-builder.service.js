"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationFrontComponentActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationFrontComponentActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatfrontcomponentvalidatorservice = require("../../validators/services/flat-front-component-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationFrontComponentActionsBuilderService = class WorkspaceMigrationFrontComponentActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatFrontComponentValidatorService.validateFlatFrontComponentCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatFrontComponentToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'frontComponent',
                flatEntity: flatFrontComponentToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatFrontComponentValidatorService.validateFlatFrontComponentDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatFrontComponentToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'frontComponent',
                universalIdentifier: flatFrontComponentToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatFrontComponentValidatorService.validateFlatFrontComponentUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateFrontComponentAction = {
            type: 'update',
            metadataName: 'frontComponent',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateFrontComponentAction
        };
    }
    constructor(flatFrontComponentValidatorService){
        super(_metadata.ALL_METADATA_NAME.frontComponent), this.flatFrontComponentValidatorService = flatFrontComponentValidatorService;
    }
};
WorkspaceMigrationFrontComponentActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatfrontcomponentvalidatorservice.FlatFrontComponentValidatorService === "undefined" ? Object : _flatfrontcomponentvalidatorservice.FlatFrontComponentValidatorService
    ])
], WorkspaceMigrationFrontComponentActionsBuilderService);

//# sourceMappingURL=workspace-migration-front-component-actions-builder.service.js.map