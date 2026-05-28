"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseToolProvider", {
    enumerable: true,
    get: function() {
        return DatabaseToolProvider;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _zod = require("zod");
const _getflatfieldsforflatobjectmetadatautil = require("../../../api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _generatecreatemanyrecordinputschemautil = require("../../record-crud/utils/generate-create-many-record-input-schema.util");
const _generatecreaterecordinputschemautil = require("../../record-crud/utils/generate-create-record-input-schema.util");
const _generateupdatemanyrecordinputschemautil = require("../../record-crud/utils/generate-update-many-record-input-schema.util");
const _generateupdaterecordinputschemautil = require("../../record-crud/utils/generate-update-record-input-schema.util");
const _deletetoolzodschema = require("../../record-crud/zod-schemas/delete-tool.zod-schema");
const _findonetoolzodschema = require("../../record-crud/zod-schemas/find-one-tool.zod-schema");
const _findtoolzodschema = require("../../record-crud/zod-schemas/find-tool.zod-schema");
const _groupbytoolzodschema = require("../../record-crud/zod-schemas/group-by-tool.zod-schema");
const _ai = require("twenty-shared/ai");
const _isworkflowrelatedobjectutil = require("../../../metadata-modules/ai/ai-agent/utils/is-workflow-related-object.util");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _computepermissionintersectionutil = require("../../../twenty-orm/utils/compute-permission-intersection.util");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DatabaseToolProvider = class DatabaseToolProvider {
    async isAvailable(_context) {
        return true;
    }
    // Database CRUD tools emit `executionRef.kind === 'database_crud'` descriptors
    // and are dispatched inline by ToolExecutorService. The static-tool path is
    // unreachable for this provider; this method exists only to satisfy the
    // interface.
    async executeStaticTool(toolName, _args, _context) {
        throw new Error(`DatabaseToolProvider does not emit static-kind descriptors (tool: ${toolName})`);
    }
    async generateDescriptors(context, options) {
        const includeSchemas = options?.includeSchemas ?? true;
        const descriptors = [];
        const { rolesPermissions } = await this.workspaceCacheService.getOrRecompute(context.workspaceId, [
            'rolesPermissions'
        ]);
        const objectPermissions = this.getObjectPermissions(rolesPermissions, context.rolePermissionConfig);
        if (!objectPermissions) {
            return descriptors;
        }
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId: context.workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const allFlatObjects = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((obj)=>obj.isActive);
        for (const flatObject of allFlatObjects){
            if ((0, _isworkflowrelatedobjectutil.isWorkflowRelatedObject)(flatObject)) {
                continue;
            }
            const permission = objectPermissions[flatObject.id];
            if (!permission) {
                continue;
            }
            const objectMetadata = {
                ...flatObject,
                fields: (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObject, flatFieldMetadataMaps)
            };
            const restrictedFields = permission.restrictedFields;
            const snakePlural = (0, _utils.camelToSnakeCase)(objectMetadata.namePlural);
            const snakeSingular = (0, _utils.camelToSnakeCase)(objectMetadata.nameSingular);
            const canBeManagedByAutomation = (0, _workflow.canObjectBeManagedByAutomation)({
                nameSingular: objectMetadata.nameSingular
            });
            if (permission.canReadObjectRecords) {
                descriptors.push({
                    name: `find_${snakePlural}`,
                    description: `Search for ${objectMetadata.labelPlural} records using flexible filtering criteria. Supports exact matches, pattern matching, ranges, and null checks. Use limit/offset for pagination and orderBy for sorting. To find by ID, use filter: { id: { eq: "record-id" } }. Returns an array of matching records with their full data.`,
                    category: _ai.ToolCategory.DATABASE_CRUD,
                    ...includeSchemas && {
                        inputSchema: _zod.z.toJSONSchema((0, _findtoolzodschema.generateFindToolInputSchema)(objectMetadata, restrictedFields))
                    },
                    executionRef: {
                        kind: 'database_crud',
                        objectNameSingular: objectMetadata.nameSingular,
                        operation: 'find'
                    },
                    objectName: objectMetadata.nameSingular,
                    icon: flatObject.icon ?? undefined,
                    operation: 'find'
                });
                descriptors.push({
                    name: `find_one_${snakeSingular}`,
                    description: `Retrieve a single ${objectMetadata.labelSingular} record by its unique ID. Use this when you know the exact record ID and need the complete record data. Returns the full record or an error if not found.`,
                    category: _ai.ToolCategory.DATABASE_CRUD,
                    ...includeSchemas && {
                        inputSchema: _zod.z.toJSONSchema(_findonetoolzodschema.FindOneToolInputSchema)
                    },
                    executionRef: {
                        kind: 'database_crud',
                        objectNameSingular: objectMetadata.nameSingular,
                        operation: 'find_one'
                    },
                    objectName: objectMetadata.nameSingular,
                    icon: flatObject.icon ?? undefined,
                    operation: 'find_one'
                });
                const groupBySchema = includeSchemas ? (0, _groupbytoolzodschema.generateGroupByToolInputSchema)(objectMetadata, restrictedFields) : null;
                const hasGroupBySchema = groupBySchema !== null || (0, _groupbytoolzodschema.hasGroupByToolInputSchema)(objectMetadata, restrictedFields);
                if (hasGroupBySchema) {
                    descriptors.push({
                        name: `group_by_${snakePlural}`,
                        description: `Group ${objectMetadata.labelPlural} records by one or two fields and compute an aggregate (COUNT, SUM, AVG, MIN, MAX, etc.). Use for questions like "how many deals per stage?" or "total revenue by company". Returns groups with dimension values and aggregate results, ordered by the aggregate value.`,
                        category: _ai.ToolCategory.DATABASE_CRUD,
                        ...includeSchemas && groupBySchema && {
                            inputSchema: _zod.z.toJSONSchema(groupBySchema)
                        },
                        executionRef: {
                            kind: 'database_crud',
                            objectNameSingular: objectMetadata.nameSingular,
                            operation: 'group_by'
                        },
                        objectName: objectMetadata.nameSingular,
                        icon: flatObject.icon ?? undefined,
                        operation: 'group_by'
                    });
                }
            }
            if (permission.canUpdateObjectRecords && canBeManagedByAutomation) {
                descriptors.push({
                    name: `create_${snakeSingular}`,
                    description: `Create a new ${objectMetadata.labelSingular} record. Provide all required fields and any optional fields you want to set. The system will automatically handle timestamps and IDs. Returns the created record with all its data.`,
                    category: _ai.ToolCategory.DATABASE_CRUD,
                    ...includeSchemas && {
                        inputSchema: _zod.z.toJSONSchema((0, _generatecreaterecordinputschemautil.generateCreateRecordInputSchema)(objectMetadata, restrictedFields))
                    },
                    executionRef: {
                        kind: 'database_crud',
                        objectNameSingular: objectMetadata.nameSingular,
                        operation: 'create'
                    },
                    objectName: objectMetadata.nameSingular,
                    icon: flatObject.icon ?? undefined,
                    operation: 'create'
                });
                descriptors.push({
                    name: `create_many_${snakePlural}`,
                    description: `Create multiple ${objectMetadata.labelPlural} records in a single call. Provide an array of records, each containing the required fields. Maximum 20 records per call. Returns the created records.`,
                    category: _ai.ToolCategory.DATABASE_CRUD,
                    ...includeSchemas && {
                        inputSchema: _zod.z.toJSONSchema((0, _generatecreatemanyrecordinputschemautil.generateCreateManyRecordInputSchema)(objectMetadata, restrictedFields))
                    },
                    executionRef: {
                        kind: 'database_crud',
                        objectNameSingular: objectMetadata.nameSingular,
                        operation: 'create_many'
                    },
                    objectName: objectMetadata.nameSingular,
                    icon: flatObject.icon ?? undefined,
                    operation: 'create_many'
                });
                descriptors.push({
                    name: `update_${snakeSingular}`,
                    description: `Update an existing ${objectMetadata.labelSingular} record. Provide the record ID and only the fields you want to change. Unspecified fields will remain unchanged. Returns the updated record with all current data.`,
                    category: _ai.ToolCategory.DATABASE_CRUD,
                    ...includeSchemas && {
                        inputSchema: _zod.z.toJSONSchema((0, _generateupdaterecordinputschemautil.generateUpdateRecordInputSchema)(objectMetadata, restrictedFields))
                    },
                    executionRef: {
                        kind: 'database_crud',
                        objectNameSingular: objectMetadata.nameSingular,
                        operation: 'update'
                    },
                    objectName: objectMetadata.nameSingular,
                    icon: flatObject.icon ?? undefined,
                    operation: 'update'
                });
                descriptors.push({
                    name: `update_many_${snakePlural}`,
                    description: `Update multiple ${objectMetadata.labelPlural} records matching a filter in a single operation. All matching records will receive the same field values. WARNING: Use specific filters to avoid unintended mass updates. Always verify the filter scope with a find query first. Returns the updated records.`,
                    category: _ai.ToolCategory.DATABASE_CRUD,
                    ...includeSchemas && {
                        inputSchema: _zod.z.toJSONSchema((0, _generateupdatemanyrecordinputschemautil.generateUpdateManyRecordInputSchema)(objectMetadata, restrictedFields))
                    },
                    executionRef: {
                        kind: 'database_crud',
                        objectNameSingular: objectMetadata.nameSingular,
                        operation: 'update_many'
                    },
                    objectName: objectMetadata.nameSingular,
                    icon: flatObject.icon ?? undefined,
                    operation: 'update_many'
                });
            }
            if (permission.canSoftDeleteObjectRecords && canBeManagedByAutomation) {
                descriptors.push({
                    name: `delete_${snakeSingular}`,
                    description: `Delete a ${objectMetadata.labelSingular} record by marking it as deleted. The record is hidden from normal queries. This is reversible. Use this to remove records.`,
                    category: _ai.ToolCategory.DATABASE_CRUD,
                    ...includeSchemas && {
                        inputSchema: _zod.z.toJSONSchema(_deletetoolzodschema.DeleteToolInputSchema)
                    },
                    executionRef: {
                        kind: 'database_crud',
                        objectNameSingular: objectMetadata.nameSingular,
                        operation: 'delete'
                    },
                    objectName: objectMetadata.nameSingular,
                    icon: flatObject.icon ?? undefined,
                    operation: 'delete'
                });
            }
        }
        return descriptors;
    }
    getObjectPermissions(rolesPermissions, rolePermissionConfig) {
        if ('intersectionOf' in rolePermissionConfig) {
            const allRolePermissions = rolePermissionConfig.intersectionOf.map((roleId)=>rolesPermissions[roleId]);
            return allRolePermissions.length === 1 ? allRolePermissions[0] : (0, _computepermissionintersectionutil.computePermissionIntersection)(allRolePermissions);
        }
        if ('unionOf' in rolePermissionConfig) {
            if (rolePermissionConfig.unionOf.length === 1) {
                return rolesPermissions[rolePermissionConfig.unionOf[0]];
            }
            throw new Error('Union permission logic for multiple roles not yet implemented');
        }
        return null;
    }
    constructor(workspaceCacheService, flatEntityMapsCacheService){
        this.workspaceCacheService = workspaceCacheService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.category = _ai.ToolCategory.DATABASE_CRUD;
    }
};
DatabaseToolProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], DatabaseToolProvider);

//# sourceMappingURL=database-tool.provider.js.map