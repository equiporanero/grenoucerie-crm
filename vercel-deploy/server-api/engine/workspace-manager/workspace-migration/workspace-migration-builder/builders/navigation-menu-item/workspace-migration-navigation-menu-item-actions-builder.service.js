"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationNavigationMenuItemActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationNavigationMenuItemActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatnavigationmenuitemvalidatorservice = require("../../validators/services/flat-navigation-menu-item-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationNavigationMenuItemActionsBuilderService = class WorkspaceMigrationNavigationMenuItemActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatNavigationMenuItemValidatorService.validateFlatNavigationMenuItemCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatNavigationMenuItemToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'navigationMenuItem',
                flatEntity: flatNavigationMenuItemToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatNavigationMenuItemValidatorService.validateFlatNavigationMenuItemDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatNavigationMenuItemToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'navigationMenuItem',
                universalIdentifier: flatNavigationMenuItemToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatNavigationMenuItemValidatorService.validateFlatNavigationMenuItemUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateNavigationMenuItemAction = {
            type: 'update',
            metadataName: 'navigationMenuItem',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateNavigationMenuItemAction
        };
    }
    constructor(flatNavigationMenuItemValidatorService){
        super(_metadata.ALL_METADATA_NAME.navigationMenuItem), this.flatNavigationMenuItemValidatorService = flatNavigationMenuItemValidatorService;
    }
};
WorkspaceMigrationNavigationMenuItemActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatnavigationmenuitemvalidatorservice.FlatNavigationMenuItemValidatorService === "undefined" ? Object : _flatnavigationmenuitemvalidatorservice.FlatNavigationMenuItemValidatorService
    ])
], WorkspaceMigrationNavigationMenuItemActionsBuilderService);

//# sourceMappingURL=workspace-migration-navigation-menu-item-actions-builder.service.js.map