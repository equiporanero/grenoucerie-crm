"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceSchemaTableManagerService", {
    enumerable: true,
    get: function() {
        return WorkspaceSchemaTableManagerService;
    }
});
const _buildsqlcolumndefinitionutil = require("../utils/build-sql-column-definition.util");
const _removesqlinjectionutil = require("../../../workspace-manager/workspace-migration/utils/remove-sql-injection.util");
let WorkspaceSchemaTableManagerService = class WorkspaceSchemaTableManagerService {
    async createTable({ queryRunner, schemaName, tableName, columnDefinitions }) {
        const sqlColumnDefinitions = columnDefinitions?.map((columnDefinition)=>(0, _buildsqlcolumndefinitionutil.buildSqlColumnDefinition)(columnDefinition)) || [];
        if (sqlColumnDefinitions.length === 0) {
            sqlColumnDefinitions.push('"id" uuid PRIMARY KEY DEFAULT gen_random_uuid()');
        }
        const sql = `CREATE TABLE IF NOT EXISTS ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} (${sqlColumnDefinitions.join(', ')})`;
        await queryRunner.query(sql);
    }
    async dropTable({ queryRunner, schemaName, tableName, cascade = false }) {
        const cascadeClause = cascade ? ' CASCADE' : '';
        const sql = `DROP TABLE IF EXISTS ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)}${cascadeClause}`;
        await queryRunner.query(sql);
    }
    async renameTable({ queryRunner, schemaName, oldTableName, newTableName }) {
        const sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(oldTableName)} RENAME TO ${(0, _removesqlinjectionutil.escapeIdentifier)(newTableName)}`;
        await queryRunner.query(sql);
    }
};

//# sourceMappingURL=workspace-schema-table-manager.service.js.map