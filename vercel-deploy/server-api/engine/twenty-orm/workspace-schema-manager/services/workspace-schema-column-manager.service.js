"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceSchemaColumnManagerService", {
    enumerable: true,
    get: function() {
        return WorkspaceSchemaColumnManagerService;
    }
});
const _buildsqlcolumndefinitionutil = require("../utils/build-sql-column-definition.util");
const _removesqlinjectionutil = require("../../../workspace-manager/workspace-migration/utils/remove-sql-injection.util");
let WorkspaceSchemaColumnManagerService = class WorkspaceSchemaColumnManagerService {
    async addColumns({ queryRunner, schemaName, tableName, columnDefinitions }) {
        if (columnDefinitions.length === 0) return;
        const addColumnClauses = columnDefinitions.map((column)=>`ADD COLUMN ${(0, _buildsqlcolumndefinitionutil.buildSqlColumnDefinition)(column)}`);
        const sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} ${addColumnClauses.join(', ')}`;
        await queryRunner.query(sql);
    }
    async dropColumns({ queryRunner, schemaName, tableName, columnNames, cascade = false }) {
        if (columnNames.length === 0) return;
        const cascadeClause = cascade ? ' CASCADE' : '';
        const dropClauses = columnNames.map((name)=>`DROP COLUMN IF EXISTS ${(0, _removesqlinjectionutil.escapeIdentifier)(name)}${cascadeClause}`);
        const sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} ${dropClauses.join(', ')}`;
        await queryRunner.query(sql);
    }
    async renameColumn({ queryRunner, schemaName, tableName, oldColumnName, newColumnName }) {
        const sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} RENAME COLUMN ${(0, _removesqlinjectionutil.escapeIdentifier)(oldColumnName)} TO ${(0, _removesqlinjectionutil.escapeIdentifier)(newColumnName)}`;
        await queryRunner.query(sql);
    }
    async alterColumnDefault({ queryRunner, schemaName, tableName, columnName, defaultValue }) {
        const tableRef = `${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)}`;
        const columnRef = (0, _removesqlinjectionutil.escapeIdentifier)(columnName);
        const computeDefaultValueSqlQuery = ()=>{
            if (defaultValue === undefined) {
                return `ALTER TABLE ${tableRef} ALTER COLUMN ${columnRef} DROP DEFAULT`;
            }
            if (defaultValue === null) {
                return `ALTER TABLE ${tableRef} ALTER COLUMN ${columnRef} SET DEFAULT NULL`;
            }
            // defaultValue here is pre-serialized by serializeDefaultValue which
            // already applies escaping/sanitization to the value.
            return `ALTER TABLE ${tableRef} ALTER COLUMN ${columnRef} SET DEFAULT ${defaultValue}`;
        };
        const sql = computeDefaultValueSqlQuery();
        await queryRunner.query(sql);
    }
};

//# sourceMappingURL=workspace-schema-column-manager.service.js.map