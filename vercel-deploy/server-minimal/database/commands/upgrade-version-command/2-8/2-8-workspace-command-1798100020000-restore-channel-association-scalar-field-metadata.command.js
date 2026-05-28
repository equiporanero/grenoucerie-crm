"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestoreChannelAssociationScalarFieldMetadataCommand", {
    enumerable: true,
    get: function() {
        return RestoreChannelAssociationScalarFieldMetadataCommand;
    }
});
const _nestcommander = require("nest-commander");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _fieldmetadataentity = require("../../../../engine/metadata-modules/field-metadata/field-metadata.entity");
const _findflatentitybyuniversalidentifierutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _getmetadataflatentitymapskeyutil = require("../../../../engine/metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _getmetadatarelatedmetadatanamesutil = require("../../../../engine/metadata-modules/flat-entity/utils/get-metadata-related-metadata-names.util");
const _getmetadataserializedrelationnamesutil = require("../../../../engine/metadata-modules/flat-entity/utils/get-metadata-serialized-relation-names.util");
const _workspacemetadataversionservice = require("../../../../engine/metadata-modules/workspace-metadata-version/services/workspace-metadata-version.service");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _getworkspaceschemacontextformigrationutil = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration-runner/utils/get-workspace-schema-context-for-migration.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const SCALAR_FIELDS_TO_RESTORE = [
    {
        objectUniversalIdentifier: '20202020-491b-4aaa-9825-afd1bae6ae00',
        fieldUniversalIdentifier: '20202020-93ee-4da4-8d58-0282c4a9cb7d',
        fieldName: 'calendarChannelId',
        label: 'Channel ID',
        description: 'Channel ID',
        icon: 'IconCalendar',
        isNullable: false
    },
    {
        objectUniversalIdentifier: '20202020-ad1e-4127-bccb-d83ae04d2ccb',
        fieldUniversalIdentifier: '20202020-b658-408f-bd46-3bd2d15d7e52',
        fieldName: 'messageChannelId',
        label: 'Message Channel Id',
        description: 'Message Channel Id',
        icon: 'IconHash',
        isNullable: true
    },
    {
        objectUniversalIdentifier: '20202020-a1b0-40b0-8ab0-5b6c7d8e9f0a',
        fieldUniversalIdentifier: 'b3369d31-3856-4a7a-b007-ee353918127c',
        fieldName: 'messageFolderId',
        label: 'Message Folder',
        description: 'Message Folder',
        icon: 'IconFolder',
        isNullable: false
    }
];
let RestoreChannelAssociationScalarFieldMetadataCommand = class RestoreChannelAssociationScalarFieldMetadataCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, dataSource, options }) {
        const isDryRun = options.dryRun ?? false;
        if (!(0, _utils.isDefined)(dataSource)) {
            this.logger.log(`No data source for workspace ${workspaceId}, skipping`);
            return;
        }
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps'
        ]);
        // Only fields whose object still exists and whose scalar metadata is absent.
        // For already-healthy workspaces this is empty, so no schema query runs below.
        const candidates = SCALAR_FIELDS_TO_RESTORE.flatMap((fieldToRestore)=>{
            const flatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                flatEntityMaps: flatObjectMetadataMaps,
                universalIdentifier: fieldToRestore.objectUniversalIdentifier
            });
            if (!(0, _utils.isDefined)(flatObjectMetadata)) {
                return [];
            }
            const existingFlatFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                flatEntityMaps: flatFieldMetadataMaps,
                universalIdentifier: fieldToRestore.fieldUniversalIdentifier
            });
            if ((0, _utils.isDefined)(existingFlatFieldMetadata)) {
                return [];
            }
            const { schemaName, tableName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
                workspaceId,
                objectMetadata: flatObjectMetadata
            });
            return [
                {
                    fieldToRestore,
                    flatObjectMetadata,
                    schemaName,
                    tableName
                }
            ];
        });
        if (candidates.length === 0) {
            this.logger.log(`No channel association scalar field metadata to restore for workspace ${workspaceId}`);
            return;
        }
        const existingColumnKeys = await this.getExistingColumnKeys({
            dataSource,
            tableColumnPairs: candidates.map(({ tableName, fieldToRestore })=>({
                    tableName,
                    columnName: fieldToRestore.fieldName
                })),
            schemaName: candidates[0].schemaName
        });
        const fieldMetadataRowsToInsert = [];
        for (const { fieldToRestore, flatObjectMetadata, tableName } of candidates){
            if (!existingColumnKeys.has(`${tableName}.${fieldToRestore.fieldName}`)) {
                this.logger.warn(`Physical column ${tableName}.${fieldToRestore.fieldName} missing for workspace ${workspaceId} - skipping metadata-only restore (needs schema repair)`);
                continue;
            }
            fieldMetadataRowsToInsert.push({
                id: (0, _uuid.v4)(),
                universalIdentifier: fieldToRestore.fieldUniversalIdentifier,
                objectMetadataId: flatObjectMetadata.id,
                workspaceId,
                type: _types.FieldMetadataType.UUID,
                name: fieldToRestore.fieldName,
                label: fieldToRestore.label,
                description: fieldToRestore.description,
                icon: fieldToRestore.icon,
                isCustom: false,
                isActive: true,
                isSystem: false,
                isNullable: fieldToRestore.isNullable,
                isUIReadOnly: true,
                isLabelSyncedWithName: false
            });
        }
        if (fieldMetadataRowsToInsert.length === 0) {
            this.logger.log(`No channel association scalar field metadata to restore for workspace ${workspaceId}`);
            return;
        }
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Restoring ${fieldMetadataRowsToInsert.length} scalar field metadata row(s) for workspace ${workspaceId}: ${fieldMetadataRowsToInsert.map((row)=>row.name).join(', ')}`);
        if (isDryRun) {
            return;
        }
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const fieldMetadataRowsWithApplication = fieldMetadataRowsToInsert.map((row)=>({
                ...row,
                applicationId: twentyStandardFlatApplication.id
            }));
        await this.fieldMetadataRepository.insert(fieldMetadataRowsWithApplication);
        // Derive the affected cache keys from the fieldMetadata metadata name using
        // the same utility set the migration runner uses, so the flush scope stays
        // in sync with the canonical dependency graph automatically.
        const fieldMetadataRelatedNames = [
            'fieldMetadata',
            ...(0, _getmetadatarelatedmetadatanamesutil.getMetadataRelatedMetadataNames)('fieldMetadata'),
            ...(0, _getmetadataserializedrelationnamesutil.getMetadataSerializedRelationNames)('fieldMetadata')
        ];
        const cacheKeysToFlush = [
            ...new Set(fieldMetadataRelatedNames.map(_getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey))
        ];
        await this.workspaceCacheService.flush(workspaceId, [
            ...cacheKeysToFlush,
            'ORMEntityMetadatas',
            'graphQLResolverNameMap'
        ]);
        await this.workspaceMetadataVersionService.incrementMetadataVersion(workspaceId);
        this.logger.log(`Restored ${fieldMetadataRowsWithApplication.length} scalar field metadata row(s) for workspace ${workspaceId}`);
    }
    // Single information_schema lookup for all candidate columns in the workspace
    // schema. Returns a set of `tableName.columnName` keys that physically exist.
    async getExistingColumnKeys({ dataSource, schemaName, tableColumnPairs }) {
        const tableNames = [
            ...new Set(tableColumnPairs.map(({ tableName })=>tableName))
        ];
        const columnNames = [
            ...new Set(tableColumnPairs.map(({ columnName })=>columnName))
        ];
        // The workspace data source blocks raw query(); use a query runner like sibling
        // upgrade commands do for direct schema access.
        const queryRunner = dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            const rows = await queryRunner.query(`SELECT table_name, column_name
           FROM information_schema.columns
           WHERE table_schema = $1
           AND table_name = ANY($2)
           AND column_name = ANY($3)`, [
                schemaName,
                tableNames,
                columnNames
            ]);
            return new Set(rows.map((row)=>`${row.table_name}.${row.column_name}`));
        } finally{
            await queryRunner.release();
        }
    }
    constructor(workspaceIteratorService, applicationService, workspaceCacheService, workspaceMetadataVersionService, fieldMetadataRepository){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceCacheService = workspaceCacheService, this.workspaceMetadataVersionService = workspaceMetadataVersionService, this.fieldMetadataRepository = fieldMetadataRepository;
    }
};
RestoreChannelAssociationScalarFieldMetadataCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.8.0', 1798100020000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-8:restore-channel-association-scalar-field-metadata',
        description: 'Re-register the calendarChannelId/messageChannelId/messageFolderId scalar field metadata on the surviving association objects, over their already-existing physical columns, for workspaces where 2-8 drop-channel-standard-objects cascade-removed them'
    }),
    _ts_param(4, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacemetadataversionservice.WorkspaceMetadataVersionService === "undefined" ? Object : _workspacemetadataversionservice.WorkspaceMetadataVersionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], RestoreChannelAssociationScalarFieldMetadataCommand);

//# sourceMappingURL=2-8-workspace-command-1798100020000-restore-channel-association-scalar-field-metadata.command.js.map