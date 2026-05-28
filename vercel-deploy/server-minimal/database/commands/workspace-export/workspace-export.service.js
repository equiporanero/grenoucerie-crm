"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceExportService", {
    enumerable: true,
    get: function() {
        return WorkspaceExportService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _events = require("events");
const _fs = require("fs");
const _promises = require("node:stream/promises");
const _typeorm1 = require("typeorm");
const _fieldmetadataentity = require("../../../engine/metadata-modules/field-metadata/field-metadata.entity");
const _objectmetadataentity = require("../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _workspaceentity = require("../../../engine/core-modules/workspace/workspace.entity");
const _getworkspaceschemanameutil = require("../../../engine/workspace-datasource/utils/get-workspace-schema-name.util");
const _computetablenameutil = require("../../../engine/utils/compute-table-name.util");
const _removesqlinjectionutil = require("../../../engine/workspace-manager/workspace-migration/utils/remove-sql-injection.util");
const _getcoreentitymetadataswithworkspaceidutil = require("./utils/get-core-entity-metadatas-with-workspace-id.util");
const _generateworkspaceschemaddlutil = require("./utils/generate-workspace-schema-ddl.util");
const _buildinsertprefixutil = require("./utils/build-insert-prefix.util");
const _buildworkspacetablecolumnsetsutil = require("./utils/build-workspace-table-column-sets.util");
const _formatsqlvalueutil = require("./utils/format-sql-value.util");
const _formatpgcopyvalueutil = require("./utils/format-pg-copy-value.util");
const _utils = require("twenty-shared/utils");
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
const BATCH_SIZE = 10_000;
let WorkspaceExportService = class WorkspaceExportService {
    async exportWorkspace({ workspaceId, outputPath, tableFilter }) {
        const workspace = await this.dataSource.getRepository(_workspaceentity.WorkspaceEntity).findOne({
            where: {
                id: workspaceId
            }
        });
        if (!workspace) {
            throw new Error(`Workspace ${workspaceId} not found`);
        }
        const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
        this.logger.log(`Exporting workspace ${workspaceId} (${schemaName})`);
        const objectMetadatas = await this.objectMetadataRepository.find({
            where: {
                workspaceId
            }
        });
        const fieldMetadatas = await this.fieldMetadataRepository.find({
            where: {
                workspaceId
            }
        });
        const fieldsByObjectId = new Map();
        for (const fieldMetadata of fieldMetadatas){
            const objectFields = fieldsByObjectId.get(fieldMetadata.objectMetadataId) ?? [];
            objectFields.push(fieldMetadata);
            fieldsByObjectId.set(fieldMetadata.objectMetadataId, objectFields);
        }
        (0, _fs.mkdirSync)(outputPath, {
            recursive: true
        });
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filePath = `${outputPath}/${workspaceId}-${timestamp}.sql`;
        const stream = (0, _fs.createWriteStream)(filePath);
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            stream.write("SET session_replication_role = 'replica';\n\n");
            await this.writeCoreEntityRows(workspaceId, queryRunner, stream);
            stream.write(`\nCREATE SCHEMA IF NOT EXISTS ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)};\n\n`);
            this.writeWorkspaceSchemaDdl(workspaceId, schemaName, objectMetadatas, fieldsByObjectId, stream);
            await this.writeWorkspaceDataRows(workspaceId, schemaName, objectMetadatas, fieldsByObjectId, tableFilter, queryRunner, stream);
            stream.write("\nSET session_replication_role = 'origin';\n");
        } finally{
            await queryRunner.release();
            stream.end();
            await (0, _promises.finished)(stream);
        }
        return filePath;
    }
    async writeCoreEntityRows(workspaceId, queryRunner, stream) {
        const workspaceEntityMetadata = this.dataSource.entityMetadatas.find((entityMetadata)=>entityMetadata.tableName === 'workspace');
        if (workspaceEntityMetadata) {
            await this.writeRows({
                schemaName: workspaceEntityMetadata.schema || 'core',
                tableName: workspaceEntityMetadata.tableName,
                displayName: workspaceEntityMetadata.tableName,
                queryRunner,
                stream,
                whereClause: '"id" = $1',
                queryParameters: [
                    workspaceId
                ],
                jsonColumns: this.buildJsonColumnSet(workspaceEntityMetadata)
            });
        }
        const coreEntityMetadatas = (0, _getcoreentitymetadataswithworkspaceidutil.getCoreEntityMetadatasWithWorkspaceId)(this.dataSource);
        for (const entityMetadata of coreEntityMetadatas){
            try {
                await this.writeRows({
                    schemaName: entityMetadata.schema || 'core',
                    tableName: entityMetadata.tableName,
                    displayName: entityMetadata.tableName,
                    queryRunner,
                    stream,
                    whereClause: '"workspaceId" = $1',
                    queryParameters: [
                        workspaceId
                    ],
                    jsonColumns: this.buildJsonColumnSet(entityMetadata)
                });
            } catch (error) {
                this.logger.warn(`${entityMetadata.tableName}: skipped`, error);
            }
        }
        const userEntityMetadata = this.dataSource.entityMetadatas.find((entityMetadata)=>entityMetadata.tableName === 'user');
        if (userEntityMetadata) {
            await this.writeRows({
                schemaName: userEntityMetadata.schema || 'core',
                tableName: userEntityMetadata.tableName,
                displayName: userEntityMetadata.tableName,
                queryRunner,
                stream,
                whereClause: '"id" IN (SELECT "userId" FROM "core"."userWorkspace" WHERE "workspaceId" = $1)',
                queryParameters: [
                    workspaceId
                ],
                jsonColumns: this.buildJsonColumnSet(userEntityMetadata)
            });
        }
    }
    buildJsonColumnSet(entityMetadata) {
        return new Set(entityMetadata.columns.filter((column)=>column.type === 'jsonb' || column.type === 'json').map((column)=>column.databaseName));
    }
    async writeRows({ schemaName, tableName, displayName, queryRunner, stream, whereClause, queryParameters = [], jsonColumns, excludedColumns }) {
        const whereFragment = whereClause ? ` WHERE ${whereClause}` : '';
        let columnNames;
        let insertPrefix;
        let totalRows = 0;
        for(let offset = 0;; offset += BATCH_SIZE){
            const rows = await queryRunner.query(`SELECT * FROM "${schemaName}"."${tableName}"${whereFragment} ORDER BY "id" LIMIT ${BATCH_SIZE} OFFSET ${offset}`, queryParameters);
            if (!(0, _utils.isNonEmptyArray)(rows)) break;
            if (!columnNames) {
                columnNames = Object.keys(rows[0]).filter((columnName)=>!excludedColumns?.has(columnName));
                insertPrefix = (0, _buildinsertprefixutil.buildInsertPrefix)(schemaName, tableName, columnNames);
            }
            totalRows += rows.length;
            const valueTuples = [];
            for (const row of rows){
                const formattedValues = columnNames.map((columnName)=>(0, _formatsqlvalueutil.formatSqlValue)(row[columnName], jsonColumns?.has(columnName)));
                valueTuples.push(`(${formattedValues.join(', ')})`);
            }
            const statement = `${insertPrefix}${valueTuples.join(', ')};\n`;
            if (!stream.write(statement)) {
                await (0, _events.once)(stream, 'drain');
            }
            if (rows.length < BATCH_SIZE) break;
        }
        if (totalRows > 0) {
            this.logger.log(`  ${displayName}: ${totalRows} rows`);
        }
    }
    async writeCopyRows({ schemaName, tableName, displayName, queryRunner, stream, jsonColumns, excludedColumns }) {
        let columnNames;
        let totalRows = 0;
        for(let offset = 0;; offset += BATCH_SIZE){
            const rows = await queryRunner.query(`SELECT * FROM "${schemaName}"."${tableName}" ORDER BY "id" LIMIT ${BATCH_SIZE} OFFSET ${offset}`);
            if (!(0, _utils.isNonEmptyArray)(rows)) break;
            if (!columnNames) {
                columnNames = Object.keys(rows[0]).filter((columnName)=>!excludedColumns?.has(columnName));
                const escapedColumns = columnNames.map(_removesqlinjectionutil.escapeIdentifier).join(', ');
                stream.write(`COPY ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} (${escapedColumns}) FROM stdin;\n`);
            }
            totalRows += rows.length;
            for (const row of rows){
                const values = columnNames.map((columnName)=>(0, _formatpgcopyvalueutil.formatPgCopyField)(row[columnName], jsonColumns?.has(columnName)));
                if (!stream.write(values.join('\t') + '\n')) {
                    await (0, _events.once)(stream, 'drain');
                }
            }
            if (rows.length < BATCH_SIZE) break;
        }
        if ((0, _utils.isNonEmptyArray)(columnNames)) {
            stream.write('\\.\n\n');
        }
        if (totalRows > 0) {
            this.logger.log(`  ${displayName}: ${totalRows} rows`);
        }
    }
    writeWorkspaceSchemaDdl(workspaceId, schemaName, objectMetadatas, fieldsByObjectId, stream) {
        this.logger.log('Generating workspace schema DDL from metadata...');
        const ddlStatements = (0, _generateworkspaceschemaddlutil.generateWorkspaceSchemaDdl)(workspaceId, schemaName, objectMetadatas, fieldsByObjectId);
        this.logger.log(`  ${ddlStatements.length} DDL statements`);
        for (const statement of ddlStatements){
            stream.write(statement + '\n');
        }
        stream.write('\n');
    }
    async writeWorkspaceDataRows(workspaceId, schemaName, objectMetadatas, fieldsByObjectId, tableFilter, queryRunner, stream) {
        for (const objectMetadata of objectMetadatas){
            if (!objectMetadata.isActive) continue;
            const tableName = (0, _computetablenameutil.computeTableName)(objectMetadata.nameSingular, objectMetadata.isCustom);
            if (tableFilter && !tableFilter.includes(objectMetadata.nameSingular)) {
                continue;
            }
            const objectFieldMetadatas = fieldsByObjectId.get(objectMetadata.id) ?? [];
            const { jsonColumns, generatedColumns } = (0, _buildworkspacetablecolumnsetsutil.buildWorkspaceTableColumnSets)(workspaceId, objectMetadata, objectFieldMetadatas);
            try {
                await this.writeCopyRows({
                    schemaName,
                    tableName,
                    displayName: objectMetadata.nameSingular,
                    queryRunner,
                    stream,
                    jsonColumns,
                    excludedColumns: generatedColumns
                });
            } catch (error) {
                this.logger.warn(`${objectMetadata.nameSingular}: skipped`, error);
            }
        }
    }
    constructor(dataSource, objectMetadataRepository, fieldMetadataRepository){
        this.dataSource = dataSource;
        this.objectMetadataRepository = objectMetadataRepository;
        this.fieldMetadataRepository = fieldMetadataRepository;
        this.logger = new _common.Logger(WorkspaceExportService.name);
    }
};
WorkspaceExportService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectDataSource)()),
    _ts_param(1, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceExportService);

//# sourceMappingURL=workspace-export.service.js.map