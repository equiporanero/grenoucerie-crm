"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationPageLayoutActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationPageLayoutActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatpagelayoutvalidatorservice = require("../../validators/services/flat-page-layout-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationPageLayoutActionsBuilderService = class WorkspaceMigrationPageLayoutActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    async validateFlatEntityCreation(args) {
        const validationResult = this.flatPageLayoutValidatorService.validateFlatPageLayoutCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatPageLayoutToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'pageLayout',
                flatEntity: flatPageLayoutToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatPageLayoutValidatorService.validateFlatPageLayoutDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatPageLayoutToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'pageLayout',
                universalIdentifier: flatPageLayoutToValidate.universalIdentifier
            }
        };
    }
    async validateFlatEntityUpdate(args) {
        const validationResult = this.flatPageLayoutValidatorService.validateFlatPageLayoutUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updatePageLayoutAction = {
            type: 'update',
            metadataName: 'pageLayout',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updatePageLayoutAction
        };
    }
    constructor(flatPageLayoutValidatorService){
        super(_metadata.ALL_METADATA_NAME.pageLayout), this.flatPageLayoutValidatorService = flatPageLayoutValidatorService;
    }
};
WorkspaceMigrationPageLayoutActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatpagelayoutvalidatorservice.FlatPageLayoutValidatorService === "undefined" ? Object : _flatpagelayoutvalidatorservice.FlatPageLayoutValidatorService
    ])
], WorkspaceMigrationPageLayoutActionsBuilderService);

//# sourceMappingURL=workspace-migration-page-layout-actions-builder.service.js.map