/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatrowlevelpermissionpredicategroupvalidatorservice = require("../../validators/services/flat-row-level-permission-predicate-group-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService = class WorkspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatRowLevelPermissionPredicateGroupValidatorService.validateFlatRowLevelPermissionPredicateGroupCreation(args);
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
                metadataName: 'rowLevelPermissionPredicateGroup',
                flatEntity: flatEntityToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatRowLevelPermissionPredicateGroupValidatorService.validateFlatRowLevelPermissionPredicateGroupDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: { universalIdentifier: predicateGroupUniversalIdentifier } } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'rowLevelPermissionPredicateGroup',
                universalIdentifier: predicateGroupUniversalIdentifier
            }
        };
    }
    validateFlatEntityUpdate(args) {
        const validationResult = this.flatRowLevelPermissionPredicateGroupValidatorService.validateFlatRowLevelPermissionPredicateGroupUpdate(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { universalIdentifier, flatEntityUpdate } = args;
        const updateAction = {
            type: 'update',
            metadataName: 'rowLevelPermissionPredicateGroup',
            universalIdentifier,
            update: flatEntityUpdate
        };
        return {
            status: 'success',
            action: updateAction
        };
    }
    constructor(flatRowLevelPermissionPredicateGroupValidatorService){
        super(_metadata.ALL_METADATA_NAME.rowLevelPermissionPredicateGroup), this.flatRowLevelPermissionPredicateGroupValidatorService = flatRowLevelPermissionPredicateGroupValidatorService;
    }
};
WorkspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatrowlevelpermissionpredicategroupvalidatorservice.FlatRowLevelPermissionPredicateGroupValidatorService === "undefined" ? Object : _flatrowlevelpermissionpredicategroupvalidatorservice.FlatRowLevelPermissionPredicateGroupValidatorService
    ])
], WorkspaceMigrationRowLevelPermissionPredicateGroupActionsBuilderService);

//# sourceMappingURL=workspace-migration-row-level-permission-predicate-group-actions-builder.service.js.map