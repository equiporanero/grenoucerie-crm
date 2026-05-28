/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationRowLevelPermissionPredicateActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationRowLevelPermissionPredicateActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatrowlevelpermissionpredicatevalidatorservice = require("../../validators/services/flat-row-level-permission-predicate-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationRowLevelPermissionPredicateActionsBuilderService = class WorkspaceMigrationRowLevelPermissionPredicateActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatRowLevelPermissionPredicateValidatorService.validateFlatRowLevelPermissionPredicateCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'rowLevelPermissionPredicate',
                flatEntity: flatEntityToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatRowLevelPermissionPredicateValidatorService.validateFlatRowLevelPermissionPredicateDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: { universalIdentifier: predicateUniversalIdentifier } } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'rowLevelPermissionPredicate',
                universalIdentifier: predicateUniversalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatRowLevelPermissionPredicateValidatorService.validateFlatRowLevelPermissionPredicateUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateAction = {
            type: 'update',
            metadataName: 'rowLevelPermissionPredicate',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateAction
        };
    }
    constructor(flatRowLevelPermissionPredicateValidatorService){
        super(_metadata.ALL_METADATA_NAME.rowLevelPermissionPredicate), this.flatRowLevelPermissionPredicateValidatorService = flatRowLevelPermissionPredicateValidatorService;
    }
};
WorkspaceMigrationRowLevelPermissionPredicateActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatrowlevelpermissionpredicatevalidatorservice.FlatRowLevelPermissionPredicateValidatorService === "undefined" ? Object : _flatrowlevelpermissionpredicatevalidatorservice.FlatRowLevelPermissionPredicateValidatorService
    ])
], WorkspaceMigrationRowLevelPermissionPredicateActionsBuilderService);

//# sourceMappingURL=workspace-migration-row-level-permission-predicate-actions-builder.service.js.map