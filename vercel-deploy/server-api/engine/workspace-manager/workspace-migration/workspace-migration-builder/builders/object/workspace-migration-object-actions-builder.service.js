"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationObjectActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationObjectActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatobjectmetadatavalidatorservice = require("../../validators/services/flat-object-metadata-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationObjectActionsBuilderService = class WorkspaceMigrationObjectActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatObjectValidatorService.validateFlatObjectMetadataCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatObjectMetadataToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'objectMetadata',
                universalFlatFieldMetadatas: [],
                flatEntity: flatObjectMetadataToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatObjectValidatorService.validateFlatObjectMetadataDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatObjectMetadataToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'objectMetadata',
                universalIdentifier: flatObjectMetadataToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatObjectValidatorService.validateFlatObjectMetadataUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateObjectAction = {
            type: 'update',
            metadataName: 'objectMetadata',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateObjectAction
        };
    }
    constructor(flatObjectValidatorService){
        super(_metadata.ALL_METADATA_NAME.objectMetadata), this.flatObjectValidatorService = flatObjectValidatorService;
    }
};
WorkspaceMigrationObjectActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatobjectmetadatavalidatorservice.FlatObjectMetadataValidatorService === "undefined" ? Object : _flatobjectmetadatavalidatorservice.FlatObjectMetadataValidatorService
    ])
], WorkspaceMigrationObjectActionsBuilderService);

//# sourceMappingURL=workspace-migration-object-actions-builder.service.js.map