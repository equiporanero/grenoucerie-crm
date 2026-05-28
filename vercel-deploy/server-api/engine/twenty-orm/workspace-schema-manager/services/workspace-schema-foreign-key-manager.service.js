"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceSchemaForeignKeyManagerService", {
    enumerable: true,
    get: function() {
        return WorkspaceSchemaForeignKeyManagerService;
    }
});
const _removesqlinjectionutil = require("../../../workspace-manager/workspace-migration/utils/remove-sql-injection.util");
const ALLOWED_FK_ACTIONS = new Set([
    'CASCADE',
    'SET NULL',
    'RESTRICT',
    'NO ACTION',
    'SET DEFAULT'
]);
let WorkspaceSchemaForeignKeyManagerService = class WorkspaceSchemaForeignKeyManagerService {
    async createForeignKey({ queryRunner, schemaName, foreignKey }) {
        const foreignKeyName = queryRunner.connection.namingStrategy.foreignKeyName(foreignKey.tableName, [
            foreignKey.columnName
        ], `${schemaName}.${foreignKey.referencedTableName}`, [
            foreignKey.referencedColumnName
        ]);
        let sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(foreignKey.tableName)} ADD CONSTRAINT ${(0, _removesqlinjectionutil.escapeIdentifier)(foreignKeyName)} FOREIGN KEY (${(0, _removesqlinjectionutil.escapeIdentifier)(foreignKey.columnName)}) REFERENCES ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(foreignKey.referencedTableName)} (${(0, _removesqlinjectionutil.escapeIdentifier)(foreignKey.referencedColumnName)})`;
        if (foreignKey.onDelete) {
            if (!ALLOWED_FK_ACTIONS.has(foreignKey.onDelete)) {
                throw new Error(`Unsupported ON DELETE action: ${foreignKey.onDelete}`);
            }
            sql += ` ON DELETE ${foreignKey.onDelete}`;
        }
        if (foreignKey.onUpdate) {
            if (!ALLOWED_FK_ACTIONS.has(foreignKey.onUpdate)) {
                throw new Error(`Unsupported ON UPDATE action: ${foreignKey.onUpdate}`);
            }
            sql += ` ON UPDATE ${foreignKey.onUpdate}`;
        }
        await queryRunner.query(sql);
    }
    async dropForeignKey({ queryRunner, schemaName, tableName, foreignKeyName }) {
        const sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} DROP CONSTRAINT IF EXISTS ${(0, _removesqlinjectionutil.escapeIdentifier)(foreignKeyName)}`;
        await queryRunner.query(sql);
    }
    async setForeignKeyNotDeferrable({ queryRunner, schemaName, tableName, foreignKeyName }) {
        const sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} ALTER CONSTRAINT ${(0, _removesqlinjectionutil.escapeIdentifier)(foreignKeyName)} NOT DEFERRABLE`;
        await queryRunner.query(sql);
    }
    async setForeignKeyDeferrable({ queryRunner, schemaName, tableName, foreignKeyName }) {
        const sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} ALTER CONSTRAINT ${(0, _removesqlinjectionutil.escapeIdentifier)(foreignKeyName)} DEFERRABLE`;
        await queryRunner.query(sql);
    }
    async getForeignKeyName({ queryRunner, schemaName, tableName, columnName }) {
        // Uses parameterized query ($1, $2, $3) — safe against injection
        const foreignKeys = await queryRunner.query(`
      SELECT
        tc.constraint_name AS constraint_name
      FROM
        information_schema.table_constraints AS tc
      JOIN
        information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      WHERE
        tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_schema = $1
        AND tc.table_name = $2
        AND kcu.column_name = $3
    `, [
            schemaName,
            tableName,
            columnName
        ]);
        return foreignKeys[0]?.constraint_name;
    }
};

//# sourceMappingURL=workspace-schema-foreign-key-manager.service.js.map