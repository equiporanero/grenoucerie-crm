"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationCommandMenuItemActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationCommandMenuItemActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatcommandmenuitemvalidatorservice = require("../../validators/services/flat-command-menu-item-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationCommandMenuItemActionsBuilderService = class WorkspaceMigrationCommandMenuItemActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatCommandMenuItemValidatorService.validateFlatCommandMenuItemCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatCommandMenuItemToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'commandMenuItem',
                flatEntity: flatCommandMenuItemToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatCommandMenuItemValidatorService.validateFlatCommandMenuItemDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatCommandMenuItemToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'commandMenuItem',
                universalIdentifier: flatCommandMenuItemToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatCommandMenuItemValidatorService.validateFlatCommandMenuItemUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateCommandMenuItemAction = {
            type: 'update',
            metadataName: 'commandMenuItem',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateCommandMenuItemAction
        };
    }
    constructor(flatCommandMenuItemValidatorService){
        super(_metadata.ALL_METADATA_NAME.commandMenuItem), this.flatCommandMenuItemValidatorService = flatCommandMenuItemValidatorService;
    }
};
WorkspaceMigrationCommandMenuItemActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatcommandmenuitemvalidatorservice.FlatCommandMenuItemValidatorService === "undefined" ? Object : _flatcommandmenuitemvalidatorservice.FlatCommandMenuItemValidatorService
    ])
], WorkspaceMigrationCommandMenuItemActionsBuilderService);

//# sourceMappingURL=workspace-migration-command-menu-item-actions-builder.service.js.map