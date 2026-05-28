"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationPageLayoutTabActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationPageLayoutTabActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatpagelayouttabvalidatorservice = require("../../validators/services/flat-page-layout-tab-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationPageLayoutTabActionsBuilderService = class WorkspaceMigrationPageLayoutTabActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatPageLayoutTabValidatorService.validateFlatPageLayoutTabCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatPageLayoutTabToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'pageLayoutTab',
                flatEntity: flatPageLayoutTabToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatPageLayoutTabValidatorService.validateFlatPageLayoutTabDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatPageLayoutTabToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'pageLayoutTab',
                universalIdentifier: flatPageLayoutTabToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatPageLayoutTabValidatorService.validateFlatPageLayoutTabUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updatePageLayoutTabAction = {
            type: 'update',
            metadataName: 'pageLayoutTab',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updatePageLayoutTabAction
        };
    }
    constructor(flatPageLayoutTabValidatorService){
        super(_metadata.ALL_METADATA_NAME.pageLayoutTab), this.flatPageLayoutTabValidatorService = flatPageLayoutTabValidatorService;
    }
};
WorkspaceMigrationPageLayoutTabActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatpagelayouttabvalidatorservice.FlatPageLayoutTabValidatorService === "undefined" ? Object : _flatpagelayouttabvalidatorservice.FlatPageLayoutTabValidatorService
    ])
], WorkspaceMigrationPageLayoutTabActionsBuilderService);

//# sourceMappingURL=workspace-migration-page-layout-tab-actions-builder.service.js.map