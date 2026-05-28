"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationPageLayoutWidgetActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationPageLayoutWidgetActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatpagelayoutwidgetvalidatorservice = require("../../validators/services/flat-page-layout-widget-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationPageLayoutWidgetActionsBuilderService = class WorkspaceMigrationPageLayoutWidgetActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    async validateFlatEntityCreation(args) {
        const validationResult = await this.flatPageLayoutWidgetValidatorService.validateFlatPageLayoutWidgetCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'pageLayoutWidget',
                flatEntity: args.flatEntityToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatPageLayoutWidgetValidatorService.validateFlatPageLayoutWidgetDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatPageLayoutWidgetToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'pageLayoutWidget',
                universalIdentifier: flatPageLayoutWidgetToValidate.universalIdentifier
            }
        };
    }
    async validateFlatEntityUpdate(args) {
        const validationResult = await this.flatPageLayoutWidgetValidatorService.validateFlatPageLayoutWidgetUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updatePageLayoutWidgetAction = {
            type: 'update',
            metadataName: 'pageLayoutWidget',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updatePageLayoutWidgetAction
        };
    }
    constructor(flatPageLayoutWidgetValidatorService){
        super(_metadata.ALL_METADATA_NAME.pageLayoutWidget), this.flatPageLayoutWidgetValidatorService = flatPageLayoutWidgetValidatorService;
    }
};
WorkspaceMigrationPageLayoutWidgetActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatpagelayoutwidgetvalidatorservice.FlatPageLayoutWidgetValidatorService === "undefined" ? Object : _flatpagelayoutwidgetvalidatorservice.FlatPageLayoutWidgetValidatorService
    ])
], WorkspaceMigrationPageLayoutWidgetActionsBuilderService);

//# sourceMappingURL=workspace-migration-page-layout-widget-actions-builder.service.js.map