"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateWorkspaceSchemaDdl", {
    enumerable: true,
    get: function() {
        return generateWorkspaceSchemaDdl;
    }
});
const _buildsqlcolumndefinitionutil = require("../../../../engine/twenty-orm/workspace-schema-manager/utils/build-sql-column-definition.util");
const _computetablenameutil = require("../../../../engine/utils/compute-table-name.util");
const _removesqlinjectionutil = require("../../../../engine/workspace-manager/workspace-migration/utils/remove-sql-injection.util");
const _generatecolumndefinitionsutil = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration-runner/utils/generate-column-definitions.util");
const _workspaceschemaenumoperationsutil = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration-runner/utils/workspace-schema-enum-operations.util");
const generateWorkspaceSchemaDdl = (workspaceId, schemaName, objectMetadatas, fieldsByObjectId)=>{
    const statements = [];
    for (const objectMetadata of objectMetadatas){
        if (!objectMetadata.isActive) continue;
        const tableName = (0, _computetablenameutil.computeTableName)(objectMetadata.nameSingular, objectMetadata.isCustom);
        const fieldMetadatas = fieldsByObjectId.get(objectMetadata.id) ?? [];
        const flatFieldMetadatas = fieldMetadatas;
        const flatObjectMetadata = objectMetadata;
        const enumOperations = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForObject)({
            tableName,
            operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE,
            flatFieldMetadatas
        });
        for (const enumOperation of enumOperations){
            const createOp = enumOperation;
            const escapedValues = createOp.values.map(_removesqlinjectionutil.escapeLiteral).join(', ');
            statements.push(`CREATE TYPE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(createOp.enumName)} AS ENUM (${escapedValues});`);
        }
        const columnDefinitions = flatFieldMetadatas.flatMap((flatFieldMetadata)=>(0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata,
                flatObjectMetadata,
                workspaceId
            }));
        if (columnDefinitions.length === 0) continue;
        const columnsSql = columnDefinitions.map((columnDefinition)=>`  ${(0, _buildsqlcolumndefinitionutil.buildSqlColumnDefinition)(columnDefinition)}`).join(',\n');
        statements.push(`CREATE TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} (\n${columnsSql}\n);`);
    }
    return statements;
};

//# sourceMappingURL=generate-workspace-schema-ddl.util.js.map