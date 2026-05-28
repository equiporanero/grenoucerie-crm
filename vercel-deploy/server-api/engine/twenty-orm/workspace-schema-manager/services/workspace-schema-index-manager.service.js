"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceSchemaIndexManagerService", {
    enumerable: true,
    get: function() {
        return WorkspaceSchemaIndexManagerService;
    }
});
const _workspaceschemamanagerexception = require("../exceptions/workspace-schema-manager.exception");
const _removesqlinjectionutil = require("../../../workspace-manager/workspace-migration/utils/remove-sql-injection.util");
const _validateindexwhereclauseutil = require("../../../workspace-manager/workspace-migration/utils/validate-index-where-clause.util");
const ALLOWED_INDEX_TYPES = new Set([
    'BTREE',
    'HASH',
    'GIST',
    'SPGIST',
    'GIN',
    'BRIN'
]);
let WorkspaceSchemaIndexManagerService = class WorkspaceSchemaIndexManagerService {
    async createIndex({ queryRunner, schemaName, tableName, index, concurrently = false }) {
        if (concurrently && queryRunner.isTransactionActive) {
            throw new _workspaceschemamanagerexception.WorkspaceSchemaManagerException('CREATE INDEX CONCURRENTLY cannot run inside a transaction block. Pass a QueryRunner with no active transaction.', _workspaceschemamanagerexception.WorkspaceSchemaManagerExceptionCode.CONCURRENT_INDEX_CREATION_IN_TRANSACTION);
        }
        const quotedColumns = index.columns.map((column)=>(0, _removesqlinjectionutil.escapeIdentifier)(column));
        const isUnique = index.isUnique ? 'UNIQUE' : '';
        let indexType = '';
        if (index.type && index.type !== 'BTREE') {
            if (!ALLOWED_INDEX_TYPES.has(index.type)) {
                throw new Error(`Unsupported index type: ${index.type}`);
            }
            indexType = `USING ${index.type}`;
        }
        const validatedWhereClause = (0, _validateindexwhereclauseutil.validateAndReturnIndexWhereClause)(index.where);
        const whereClause = validatedWhereClause ? `WHERE ${validatedWhereClause}` : '';
        const sql = [
            'CREATE',
            isUnique && 'UNIQUE',
            'INDEX',
            concurrently && 'CONCURRENTLY',
            'IF NOT EXISTS',
            (0, _removesqlinjectionutil.escapeIdentifier)(index.name),
            'ON',
            `${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)}`,
            indexType,
            `(${quotedColumns.join(', ')})`,
            whereClause
        ].filter(Boolean).join(' ').trim();
        await queryRunner.query(sql);
    }
    async dropIndex({ queryRunner, schemaName, indexName }) {
        const sql = `DROP INDEX IF EXISTS ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(indexName)}`;
        await queryRunner.query(sql);
    }
};

//# sourceMappingURL=workspace-schema-index-manager.service.js.map