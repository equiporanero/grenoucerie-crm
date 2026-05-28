"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationConnectionProviderActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationConnectionProviderActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatconnectionprovidervalidatorservice = require("../../validators/services/flat-connection-provider-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationConnectionProviderActionsBuilderService = class WorkspaceMigrationConnectionProviderActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatConnectionProviderValidatorService.validateFlatConnectionProviderCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatConnectionProviderToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'connectionProvider',
                flatEntity: flatConnectionProviderToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatConnectionProviderValidatorService.validateFlatConnectionProviderDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatConnectionProviderToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'connectionProvider',
                universalIdentifier: flatConnectionProviderToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatConnectionProviderValidatorService.validateFlatConnectionProviderUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateConnectionProviderAction = {
            type: 'update',
            metadataName: 'connectionProvider',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateConnectionProviderAction
        };
    }
    constructor(flatConnectionProviderValidatorService){
        super(_metadata.ALL_METADATA_NAME.connectionProvider), this.flatConnectionProviderValidatorService = flatConnectionProviderValidatorService;
    }
};
WorkspaceMigrationConnectionProviderActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatconnectionprovidervalidatorservice.FlatConnectionProviderValidatorService === "undefined" ? Object : _flatconnectionprovidervalidatorservice.FlatConnectionProviderValidatorService
    ])
], WorkspaceMigrationConnectionProviderActionsBuilderService);

//# sourceMappingURL=workspace-migration-connection-provider-actions-builder.service.js.map