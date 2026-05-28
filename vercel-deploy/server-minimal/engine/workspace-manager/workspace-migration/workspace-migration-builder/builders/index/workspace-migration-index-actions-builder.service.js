"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationIndexActionsBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationIndexActionsBuilderService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _createemptyflatentitymapsconstant = require("../../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _flatentitymapsexception = require("../../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _deleteuniversalflatentityfromuniversalflatentitymapsthroughmutationorthrowutil = require("../../../universal-flat-entity/utils/delete-universal-flat-entity-from-universal-flat-entity-maps-through-mutation-or-throw.util");
const _workspaceentitymigrationbuilderservice = require("../../services/workspace-entity-migration-builder.service");
const _flatindexmetadatavalidatorservice = require("../../validators/services/flat-index-metadata-validator.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationIndexActionsBuilderService = class WorkspaceMigrationIndexActionsBuilderService extends _workspaceentitymigrationbuilderservice.WorkspaceEntityMigrationBuilderService {
    validateFlatEntityCreation(args) {
        const validationResult = this.flatIndexValidatorService.validateFlatIndexCreation(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatIndexToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'create',
                metadataName: 'index',
                flatEntity: flatIndexToValidate
            }
        };
    }
    validateFlatEntityDeletion(args) {
        const validationResult = this.flatIndexValidatorService.validateFlatIndexDeletion(args);
        if (validationResult.errors.length > 0) {
            return {
                status: 'fail',
                ...validationResult
            };
        }
        const { flatEntityToValidate: flatIndexToValidate } = args;
        return {
            status: 'success',
            action: {
                type: 'delete',
                metadataName: 'index',
                universalIdentifier: flatIndexToValidate.universalIdentifier
            }
        };
    }
    validateFlatEntityUpdate({ optimisticFlatEntityMapsAndRelatedFlatEntityMaps, universalIdentifier, flatEntityUpdate, buildOptions, workspaceId, additionalCacheDataMaps }) {
        const flatEntity = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatEntityMapsAndRelatedFlatEntityMaps.flatIndexMaps
        });
        if (!(0, _utils.isDefined)(flatEntity)) {
            return {
                status: 'fail',
                metadataName: 'index',
                type: 'update',
                flatEntityMinimalInformation: {
                    universalIdentifier
                },
                errors: [
                    {
                        code: _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND,
                        message: _core.i18n._(/*i18n*/ {
                            id: "fY2zUQ",
                            message: "Index to delete not found"
                        })
                    }
                ]
            };
        }
        const deletionValidationResult = this.flatIndexValidatorService.validateFlatIndexDeletion({
            buildOptions,
            optimisticFlatEntityMapsAndRelatedFlatEntityMaps,
            workspaceId,
            flatEntityToValidate: flatEntity,
            remainingFlatEntityMapsToValidate: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)(),
            additionalCacheDataMaps
        });
        if (deletionValidationResult.errors.length > 0) {
            return {
                status: 'fail',
                type: 'update',
                errors: deletionValidationResult.errors,
                flatEntityMinimalInformation: deletionValidationResult.flatEntityMinimalInformation,
                metadataName: deletionValidationResult.metadataName
            };
        }
        const updatedFlatIndex = {
            ...flatEntity,
            ...flatEntityUpdate
        };
        const tempOptimisticFlatIndexMaps = structuredClone(optimisticFlatEntityMapsAndRelatedFlatEntityMaps.flatIndexMaps);
        (0, _deleteuniversalflatentityfromuniversalflatentitymapsthroughmutationorthrowutil.deleteUniversalFlatEntityFromUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalIdentifierToDelete: flatEntity.universalIdentifier,
            universalFlatEntityMapsToMutate: tempOptimisticFlatIndexMaps
        });
        const creationValidationResult = this.flatIndexValidatorService.validateFlatIndexCreation({
            buildOptions,
            workspaceId,
            flatEntityToValidate: updatedFlatIndex,
            optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                ...optimisticFlatEntityMapsAndRelatedFlatEntityMaps,
                flatIndexMaps: tempOptimisticFlatIndexMaps
            },
            remainingFlatEntityMapsToValidate: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)(),
            additionalCacheDataMaps
        });
        if (creationValidationResult.errors.length > 0) {
            return {
                status: 'fail',
                type: 'update',
                errors: creationValidationResult.errors,
                flatEntityMinimalInformation: creationValidationResult.flatEntityMinimalInformation,
                metadataName: creationValidationResult.metadataName
            };
        }
        return {
            status: 'success',
            action: {
                type: 'update',
                metadataName: 'index',
                universalIdentifier,
                updatedUniversalFlatIndex: updatedFlatIndex,
                update: {}
            }
        };
    }
    constructor(flatIndexValidatorService){
        super(_metadata.ALL_METADATA_NAME.index), this.flatIndexValidatorService = flatIndexValidatorService;
    }
};
WorkspaceMigrationIndexActionsBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatindexmetadatavalidatorservice.FlatIndexValidatorService === "undefined" ? Object : _flatindexmetadatavalidatorservice.FlatIndexValidatorService
    ])
], WorkspaceMigrationIndexActionsBuilderService);

//# sourceMappingURL=workspace-migration-index-actions-builder.service.js.map