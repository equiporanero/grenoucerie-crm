"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationWebhookActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationWebhookActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatwebhookvalidatorservice = require("../../validators/services/flat-webhook-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationWebhookActionsBuilderService = class WorkspaceMigrationWebhookActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatWebhookValidatorService.validateFlatWebhookCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatWebhookToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'webhook',
                flatEntity: flatWebhookToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatWebhookValidatorService.validateFlatWebhookDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatWebhookToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'webhook',
                universalIdentifier: flatWebhookToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatWebhookValidatorService.validateFlatWebhookUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateWebhookAction = {
            type: 'update',
            metadataName: 'webhook',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateWebhookAction
        };
    }
    constructor(flatWebhookValidatorService){
        super(_metadata.ALL_METADATA_NAME.webhook), this.flatWebhookValidatorService = flatWebhookValidatorService;
    }
};
WorkspaceMigrationWebhookActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatwebhookvalidatorservice.FlatWebhookValidatorService === "undefined" ? Object : _flatwebhookvalidatorservice.FlatWebhookValidatorService
    ])
], WorkspaceMigrationWebhookActionsBuilderService);

//# sourceMappingURL=workspace-migration-webhook-actions-builder.service.js.map