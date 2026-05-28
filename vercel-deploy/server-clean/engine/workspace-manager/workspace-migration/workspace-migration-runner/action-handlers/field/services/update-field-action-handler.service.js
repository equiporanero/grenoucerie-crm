"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateFieldActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdateFieldActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _fieldmetadataentity = require("../../../../../../metadata-modules/field-metadata/field-metadata.entity");
const _computecolumnnameutil = require("../../../../../../metadata-modules/field-metadata/utils/compute-column-name.util");
const _getcompositetypeorthrowutil = require("../../../../../../metadata-modules/field-metadata/utils/get-composite-type-or-throw.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _iscompositeflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-composite-flat-field-metadata.util");
const _isenumflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-enum-flat-field-metadata.util");
const _isflatfieldmetadataoftypeutil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _workspaceschemamanagerservice = require("../../../../../../twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
const _computeobjecttargettableutil = require("../../../../../../utils/compute-object-target-table.util");
const _ismorphorrelationfieldmetadatatypeutil = require("../../../../../../utils/is-morph-or-relation-field-metadata-type.util");
const _resolveuniversalupdaterelationidentifierstoidsutil = require("../../../../universal-flat-entity/utils/resolve-universal-update-relation-identifiers-to-ids.util");
const _convertondeleteactiontoondeleteutil = require("../../../../utils/convert-on-delete-action-to-on-delete.util");
const _serializedefaultvalueutil = require("../../../../workspace-migration-builder/utils/serialize-default-value.util");
const _fromuniversalsettingstoflatfieldmetadatasettingsutil = require("./utils/from-universal-settings-to-flat-field-metadata-settings.util");
const _workspacemigrationactionexecutionexception = require("../../../exceptions/workspace-migration-action-execution.exception");
const _fieldmetadatatypetocolumntypeutil = require("../../../utils/field-metadata-type-to-column-type.util");
const _generatecolumndefinitionsutil = require("../../../utils/generate-column-definitions.util");
const _getworkspaceschemacontextformigrationutil = require("../../../utils/get-workspace-schema-context-for-migration.util");
const _workspaceschemaenumoperationsutil = require("../../../utils/workspace-schema-enum-operations.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateFieldActionHandlerService = class UpdateFieldActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'fieldMetadata') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatFieldMetadata = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatFieldMetadataMaps,
            universalIdentifier: action.universalIdentifier
        });
        const { universalSettings, ...updateWithResolvedForeignKeys } = (0, _resolveuniversalupdaterelationidentifierstoidsutil.resolveUniversalUpdateRelationIdentifiersToIds)({
            metadataName: 'fieldMetadata',
            universalUpdate: action.update,
            allFlatEntityMaps
        });
        const update = universalSettings === undefined ? updateWithResolvedForeignKeys : {
            ...updateWithResolvedForeignKeys,
            settings: (0, _fromuniversalsettingstoflatfieldmetadatasettingsutil.fromUniversalSettingsToFlatFieldMetadataSettings)({
                universalSettings,
                allFieldIdToBeCreatedInActionByUniversalIdentifierMap: new Map(),
                flatFieldMetadataMaps: allFlatEntityMaps.flatFieldMetadataMaps
            })
        };
        return {
            type: 'update',
            metadataName: 'fieldMetadata',
            entityId: flatFieldMetadata.id,
            update
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const fieldMetadataRepository = queryRunner.manager.getRepository(_fieldmetadataentity.FieldMetadataEntity);
        const { entityId, update } = flatAction;
        // isUnique is derived from IndexMetadata at cache build time and has
        // no underlying column on fieldMetadata. It travels in the update
        // payload only so per-type validators (e.g. FILES rejection) can run
        // — the actual state change is handled by the side-effect index
        // create/delete in handleIndexChangesDuringFieldUpdate.
        const { isUnique: _droppedIsUnique, ...persistedUpdate } = update;
        if (Object.keys(persistedUpdate).length === 0) {
            return;
        }
        await fieldMetadataRepository.update({
            id: entityId,
            workspaceId
        }, persistedUpdate);
    }
    async executeForWorkspaceSchema(context) {
        const { flatAction, queryRunner, allFlatEntityMaps: { flatObjectMetadataMaps, flatFieldMetadataMaps }, workspaceId } = context;
        const { entityId, update } = flatAction;
        const currentFlatFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: entityId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatObjectMetadataMaps,
            flatEntityId: currentFlatFieldMetadata.objectMetadataId
        });
        const { schemaName, tableName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
            workspaceId,
            objectMetadata: flatObjectMetadata
        });
        let optimisticFlatFieldMetadata = structuredClone(currentFlatFieldMetadata);
        let wasDefaultValueHandledByEnumUpdate = false;
        if ((0, _utils.isDefined)(update.name)) {
            await this.handleFieldNameUpdate({
                queryRunner,
                schemaName,
                tableName,
                flatFieldMetadata: optimisticFlatFieldMetadata,
                update,
                toName: update.name
            });
            optimisticFlatFieldMetadata.name = update.name;
        }
        if (update.options !== undefined && (0, _isenumflatfieldmetadatautil.isEnumFlatFieldMetadata)(optimisticFlatFieldMetadata)) {
            if (update.defaultValue !== undefined) {
                optimisticFlatFieldMetadata = {
                    ...optimisticFlatFieldMetadata,
                    defaultValue: update.defaultValue
                };
                wasDefaultValueHandledByEnumUpdate = true;
            }
            await this.handleFieldOptionsUpdate({
                queryRunner,
                schemaName,
                tableName,
                flatFieldMetadata: optimisticFlatFieldMetadata,
                flatObjectMetadata,
                toOptions: update.options,
                workspaceId,
                update
            });
            optimisticFlatFieldMetadata.options = update.options ?? [];
        }
        if (update.defaultValue !== undefined) {
            if (wasDefaultValueHandledByEnumUpdate) {
                optimisticFlatFieldMetadata.defaultValue = update.defaultValue;
            } else {
                await this.handleFieldDefaultValueUpdate({
                    queryRunner,
                    schemaName,
                    tableName,
                    flatFieldMetadata: optimisticFlatFieldMetadata,
                    toDefaultValue: update.defaultValue,
                    update
                });
                optimisticFlatFieldMetadata.defaultValue = update.defaultValue;
            }
        }
        if ((0, _utils.isDefined)(update.settings)) {
            // Handle asExpression/generatedType change (for TS_VECTOR fields)
            if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(optimisticFlatFieldMetadata, _types.FieldMetadataType.TS_VECTOR)) {
                const fromSettings = optimisticFlatFieldMetadata.settings;
                const toSettings = update.settings;
                if ((0, _utils.isDefined)(toSettings?.asExpression) && (toSettings.asExpression !== fromSettings?.asExpression || toSettings.generatedType !== fromSettings?.generatedType)) {
                    await this.workspaceSchemaManagerService.columnManager.dropColumns({
                        queryRunner,
                        schemaName,
                        tableName,
                        columnNames: [
                            optimisticFlatFieldMetadata.name
                        ]
                    });
                    await this.workspaceSchemaManagerService.columnManager.addColumns({
                        queryRunner,
                        schemaName,
                        tableName,
                        columnDefinitions: [
                            {
                                name: optimisticFlatFieldMetadata.name,
                                type: 'tsvector',
                                ...toSettings
                            }
                        ]
                    });
                    optimisticFlatFieldMetadata = {
                        ...optimisticFlatFieldMetadata,
                        settings: toSettings
                    };
                }
            }
            // Handle onDelete change (for morph/relation fields) order matters
            if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(optimisticFlatFieldMetadata)) {
                const fromSettings = optimisticFlatFieldMetadata.settings;
                const toSettings = update.settings;
                const isManyToOne = optimisticFlatFieldMetadata.settings?.relationType === _types.RelationType.MANY_TO_ONE;
                if (isManyToOne && (0, _utils.isDefined)(fromSettings?.onDelete) && (0, _utils.isDefined)(toSettings?.onDelete) && toSettings.onDelete !== fromSettings.onDelete) {
                    const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                        name: optimisticFlatFieldMetadata.name
                    });
                    const foreignKeyName = await this.workspaceSchemaManagerService.foreignKeyManager.getForeignKeyName({
                        queryRunner,
                        schemaName,
                        tableName,
                        columnName: joinColumnName
                    });
                    if (!(0, _utils.isDefined)(foreignKeyName)) {
                        throw new _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionException({
                            message: 'Foreign key not found',
                            code: _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionExceptionCode.NOT_SUPPORTED
                        });
                    }
                    await this.workspaceSchemaManagerService.foreignKeyManager.dropForeignKey({
                        queryRunner,
                        schemaName,
                        tableName,
                        foreignKeyName
                    });
                    const targetFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                        flatEntityId: optimisticFlatFieldMetadata.relationTargetObjectMetadataId,
                        flatEntityMaps: flatObjectMetadataMaps
                    });
                    const referencedTableName = (0, _computeobjecttargettableutil.computeObjectTargetTable)(targetFlatObjectMetadata);
                    await this.workspaceSchemaManagerService.foreignKeyManager.createForeignKey({
                        queryRunner,
                        schemaName,
                        foreignKey: {
                            tableName,
                            columnName: joinColumnName,
                            referencedTableName,
                            referencedColumnName: 'id',
                            onDelete: (0, _convertondeleteactiontoondeleteutil.convertOnDeleteActionToOnDelete)(toSettings.onDelete) ?? 'CASCADE'
                        }
                    });
                }
            }
        }
    }
    async handleFieldNameUpdate({ flatFieldMetadata, queryRunner, schemaName, tableName, toName }) {
        const fromName = flatFieldMetadata.name;
        if ((0, _iscompositeflatfieldmetadatautil.isCompositeFlatFieldMetadata)(flatFieldMetadata)) {
            const compositeType = (0, _getcompositetypeorthrowutil.getCompositeTypeOrThrow)(flatFieldMetadata.type);
            for (const property of compositeType.properties){
                if ((0, _ismorphorrelationfieldmetadatatypeutil.isMorphOrRelationFieldMetadataType)(property.type)) {
                    throw new _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionException({
                        message: 'Relation field metadata in composite type is not supported yet',
                        code: _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionExceptionCode.NOT_SUPPORTED
                    });
                }
                const fromCompositeColumnName = (0, _computecolumnnameutil.computeCompositeColumnName)(fromName, property);
                const toCompositeColumnName = (0, _computecolumnnameutil.computeCompositeColumnName)(toName, property);
                await this.workspaceSchemaManagerService.columnManager.renameColumn({
                    queryRunner,
                    schemaName,
                    tableName,
                    oldColumnName: fromCompositeColumnName,
                    newColumnName: toCompositeColumnName
                });
            }
        } else if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(flatFieldMetadata)) {
            if (flatFieldMetadata.settings?.relationType === _types.RelationType.MANY_TO_ONE) {
                await this.workspaceSchemaManagerService.columnManager.renameColumn({
                    queryRunner,
                    schemaName,
                    tableName,
                    oldColumnName: (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                        name: fromName
                    }),
                    newColumnName: (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                        name: toName
                    })
                });
            }
        } else {
            await this.workspaceSchemaManagerService.columnManager.renameColumn({
                queryRunner,
                schemaName,
                tableName,
                oldColumnName: fromName,
                newColumnName: toName
            });
        }
        const enumOperations = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForField)({
            flatFieldMetadata,
            tableName,
            operation: _workspaceschemaenumoperationsutil.EnumOperation.RENAME,
            options: {
                newFieldName: toName
            }
        });
        await (0, _workspaceschemaenumoperationsutil.executeBatchEnumOperations)({
            enumOperations,
            queryRunner,
            schemaName,
            workspaceSchemaManagerService: this.workspaceSchemaManagerService
        });
    }
    async handleFieldDefaultValueUpdate({ flatFieldMetadata, queryRunner, schemaName, tableName, toDefaultValue }) {
        if ((0, _iscompositeflatfieldmetadatautil.isCompositeFlatFieldMetadata)(flatFieldMetadata)) {
            const compositeType = (0, _getcompositetypeorthrowutil.getCompositeTypeOrThrow)(flatFieldMetadata.type);
            for (const property of compositeType.properties){
                const columnType = (0, _fieldmetadatatypetocolumntypeutil.fieldMetadataTypeToColumnType)(property.type);
                if ((0, _ismorphorrelationfieldmetadatatypeutil.isMorphOrRelationFieldMetadataType)(property.type)) {
                    throw new _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionException({
                        message: 'Relation field metadata in composite type is not supported yet',
                        code: _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionExceptionCode.NOT_SUPPORTED
                    });
                }
                const compositeColumnName = (0, _computecolumnnameutil.computeCompositeColumnName)(flatFieldMetadata.name, property);
                // @ts-expect-error - TODO: fix this
                const compositeDefaultValue = toDefaultValue?.[property.name];
                const serializedNewDefaultValue = (0, _serializedefaultvalueutil.serializeDefaultValue)({
                    columnName: compositeColumnName,
                    schemaName,
                    tableName,
                    columnType,
                    defaultValue: compositeDefaultValue
                });
                await this.workspaceSchemaManagerService.columnManager.alterColumnDefault({
                    queryRunner,
                    schemaName,
                    tableName,
                    columnName: compositeColumnName,
                    defaultValue: serializedNewDefaultValue
                });
            }
            return;
        }
        const columnType = (0, _fieldmetadatatypetocolumntypeutil.fieldMetadataTypeToColumnType)(flatFieldMetadata.type);
        const serializedNewDefaultValue = (0, _serializedefaultvalueutil.serializeDefaultValue)({
            columnName: flatFieldMetadata.name,
            schemaName,
            tableName,
            columnType,
            defaultValue: toDefaultValue
        });
        return await this.workspaceSchemaManagerService.columnManager.alterColumnDefault({
            queryRunner,
            schemaName,
            tableName,
            columnName: flatFieldMetadata.name,
            defaultValue: serializedNewDefaultValue
        });
    }
    async handleFieldOptionsUpdate({ flatFieldMetadata, queryRunner, schemaName, tableName, toOptions, flatObjectMetadata, workspaceId }) {
        const fromOptions = flatFieldMetadata.options;
        const fromOptionsById = new Map((fromOptions ?? []).filter((opt)=>(0, _utils.isDefined)(opt.id)).map((opt)=>[
                opt.id,
                opt
            ]));
        const toOptionsById = new Map((toOptions ?? []).filter((opt)=>(0, _utils.isDefined)(opt.id)).map((opt)=>[
                opt.id,
                opt
            ]));
        const valueMapping = {};
        for (const toOption of toOptionsById.values()){
            const fromOption = fromOptionsById.get(toOption.id);
            if (fromOption) {
                valueMapping[fromOption.value] = toOption.value;
            }
        }
        const enumColumnDefinitions = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
            flatFieldMetadata,
            flatObjectMetadata,
            workspaceId
        });
        for (const enumColumnDefinition of enumColumnDefinitions){
            await this.workspaceSchemaManagerService.enumManager.alterEnumValues({
                queryRunner,
                schemaName,
                tableName,
                columnDefinition: enumColumnDefinition,
                enumValues: toOptions?.map((opt)=>opt.value) ?? [],
                oldToNewEnumOptionMap: valueMapping
            });
        }
    }
    constructor(workspaceSchemaManagerService){
        super(), this.workspaceSchemaManagerService = workspaceSchemaManagerService;
    }
};
UpdateFieldActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], UpdateFieldActionHandlerService);

//# sourceMappingURL=update-field-action-handler.service.js.map