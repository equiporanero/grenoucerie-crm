"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceSchemaEnumManagerService", {
    enumerable: true,
    get: function() {
        return WorkspaceSchemaEnumManagerService;
    }
});
const _workspaceschemamanagerexception = require("../exceptions/workspace-schema-manager.exception");
const _buildsqlcolumndefinitionutil = require("../utils/build-sql-column-definition.util");
const _computepostgresenumnameutil = require("../../../workspace-manager/workspace-migration/utils/compute-postgres-enum-name.util");
const _removesqlinjectionutil = require("../../../workspace-manager/workspace-migration/utils/remove-sql-injection.util");
let WorkspaceSchemaEnumManagerService = class WorkspaceSchemaEnumManagerService {
    async createEnum({ queryRunner, schemaName, enumName, values }) {
        if (values.length === 0) {
            throw new _workspaceschemamanagerexception.WorkspaceSchemaManagerException(`Cannot create enum with no values`, _workspaceschemamanagerexception.WorkspaceSchemaManagerExceptionCode.ENUM_OPERATION_FAILED);
        }
        const sanitizedValues = values.map((value)=>(0, _removesqlinjectionutil.escapeLiteral)(value.toString())).join(', ');
        const sql = `CREATE TYPE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(enumName)} AS ENUM (${sanitizedValues})`;
        await queryRunner.query(sql);
    }
    async dropEnum({ queryRunner, schemaName, enumName }) {
        const sql = `DROP TYPE IF EXISTS ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(enumName)}`;
        await queryRunner.query(sql);
    }
    async renameEnum({ queryRunner, schemaName, oldEnumName, newEnumName }) {
        const sql = `ALTER TYPE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(oldEnumName)} RENAME TO ${(0, _removesqlinjectionutil.escapeIdentifier)(newEnumName)}`;
        await queryRunner.query(sql);
    }
    async addEnumValue({ queryRunner, schemaName, enumName, value, beforeValue, afterValue }) {
        let sql = `ALTER TYPE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(enumName)} ADD VALUE ${(0, _removesqlinjectionutil.escapeLiteral)(value)}`;
        if (beforeValue) {
            sql += ` BEFORE ${(0, _removesqlinjectionutil.escapeLiteral)(beforeValue)}`;
        } else if (afterValue) {
            sql += ` AFTER ${(0, _removesqlinjectionutil.escapeLiteral)(afterValue)}`;
        }
        await queryRunner.query(sql);
    }
    async renameEnumValue({ queryRunner, schemaName, enumName, oldValue, newValue }) {
        const sql = `ALTER TYPE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(enumName)} RENAME VALUE ${(0, _removesqlinjectionutil.escapeLiteral)(oldValue)} TO ${(0, _removesqlinjectionutil.escapeLiteral)(newValue)}`;
        await queryRunner.query(sql);
    }
    async alterEnumValues({ queryRunner, schemaName, tableName, columnDefinition, enumValues, oldToNewEnumOptionMap }) {
        if (!enumValues || enumValues.length === 0) {
            throw new _workspaceschemamanagerexception.WorkspaceSchemaManagerException(`Cannot alter enum values for column ${columnDefinition.name} because it has no enum values`, _workspaceschemamanagerexception.WorkspaceSchemaManagerExceptionCode.ENUM_OPERATION_FAILED);
        }
        const isTransactionAlreadyActive = queryRunner.isTransactionActive;
        if (!isTransactionAlreadyActive) {
            await queryRunner.startTransaction();
        }
        try {
            const columnName = columnDefinition.name;
            const enumName = (0, _computepostgresenumnameutil.computePostgresEnumName)({
                tableName,
                columnName
            });
            const oldEnumName = `${enumName}_old`;
            await this.renameEnum({
                queryRunner,
                schemaName,
                oldEnumName: enumName,
                newEnumName: oldEnumName
            });
            await this.createEnum({
                queryRunner,
                schemaName,
                enumName,
                values: enumValues
            });
            const oldColumnName = `${columnName}_old`;
            await this.renameColumn({
                queryRunner,
                schemaName,
                tableName,
                oldColumnName: columnName,
                newColumnName: oldColumnName
            });
            await this.createColumnUsingEnum({
                queryRunner,
                schemaName,
                tableName,
                columnDefinition,
                enumTypeName: enumName
            });
            if (oldToNewEnumOptionMap && Object.keys(oldToNewEnumOptionMap).length > 0) {
                await this.migrateEnumData({
                    queryRunner,
                    schemaName,
                    tableName,
                    oldColumnName,
                    newColumnName: columnName,
                    oldToNewEnumOptionMap,
                    columnDefinition,
                    oldEnumTypeName: oldEnumName
                });
            }
            await this.dropColumn({
                queryRunner,
                schemaName,
                tableName,
                columnName: oldColumnName
            });
            await this.dropEnum({
                queryRunner,
                schemaName,
                enumName: oldEnumName
            });
            if (!isTransactionAlreadyActive) {
                await queryRunner.commitTransaction();
            }
        } catch (error) {
            if (!isTransactionAlreadyActive) {
                try {
                    await queryRunner.rollbackTransaction();
                } catch (error) {
                    // oxlint-disable-next-line no-console
                    console.trace(`Failed to rollback transaction: ${error.message}`);
                }
            }
            throw error;
        }
    }
    async renameColumn({ queryRunner, schemaName, tableName, oldColumnName, newColumnName }) {
        const sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} RENAME COLUMN ${(0, _removesqlinjectionutil.escapeIdentifier)(oldColumnName)} TO ${(0, _removesqlinjectionutil.escapeIdentifier)(newColumnName)}`;
        await queryRunner.query(sql);
    }
    async createColumnUsingEnum({ queryRunner, schemaName, tableName, columnDefinition, enumTypeName }) {
        const columnDef = (0, _buildsqlcolumndefinitionutil.buildSqlColumnDefinition)({
            ...columnDefinition,
            type: `${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(enumTypeName)}`
        });
        const sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} ADD COLUMN ${columnDef}`;
        await queryRunner.query(sql);
    }
    async dropColumn({ queryRunner, schemaName, tableName, columnName }) {
        const sql = `ALTER TABLE ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} DROP COLUMN ${(0, _removesqlinjectionutil.escapeIdentifier)(columnName)}`;
        await queryRunner.query(sql);
    }
    async migrateEnumData({ queryRunner, schemaName, tableName, oldColumnName, newColumnName, oldToNewEnumOptionMap, columnDefinition, oldEnumTypeName }) {
        const newEnumTypeName = (0, _computepostgresenumnameutil.computePostgresEnumName)({
            tableName,
            columnName: newColumnName
        });
        const escapedSchema = (0, _removesqlinjectionutil.escapeIdentifier)(schemaName);
        const escapedTable = (0, _removesqlinjectionutil.escapeIdentifier)(tableName);
        const escapedOldColumn = (0, _removesqlinjectionutil.escapeIdentifier)(oldColumnName);
        const escapedNewColumn = (0, _removesqlinjectionutil.escapeIdentifier)(newColumnName);
        const escapedNewEnumType = `${escapedSchema}.${(0, _removesqlinjectionutil.escapeIdentifier)(newEnumTypeName)}`;
        const caseStatements = Object.entries(oldToNewEnumOptionMap).map(([oldEnumOption, newEnumOption])=>`WHEN ${(0, _removesqlinjectionutil.escapeLiteral)(oldEnumOption)} THEN ${(0, _removesqlinjectionutil.escapeLiteral)(newEnumOption)}::${escapedNewEnumType}`).join(' ');
        const mappedValuesCondition = Object.keys(oldToNewEnumOptionMap).map((oldValue)=>(0, _removesqlinjectionutil.escapeLiteral)(oldValue)).join(', ');
        const sqlQuery = columnDefinition.isArray ? this.updateArrayEnum({
            escapedSchema,
            escapedTable,
            escapedOldColumn,
            escapedNewColumn,
            escapedOldEnumType: `${escapedSchema}.${(0, _removesqlinjectionutil.escapeIdentifier)(oldEnumTypeName)}`,
            caseStatements,
            mappedValuesCondition
        }) : this.updateAtomicEnum({
            escapedSchema,
            escapedTable,
            escapedOldColumn,
            escapedNewColumn,
            caseStatements,
            mappedValuesCondition
        });
        await queryRunner.query(sqlQuery);
    }
    updateArrayEnum({ escapedNewColumn, escapedOldColumn, escapedSchema, escapedTable, escapedOldEnumType, caseStatements, mappedValuesCondition }) {
        return `
          UPDATE ${escapedSchema}.${escapedTable}
          SET ${escapedNewColumn} = (
            SELECT array_agg(mapped_value) FILTER (WHERE mapped_value IS NOT NULL)
            FROM (
              SELECT
                CASE unnest_value::text
                  ${caseStatements}
                END AS mapped_value
              FROM unnest(${escapedOldColumn}) AS unnest_value
            ) enum_mapping
          )
          WHERE ${escapedOldColumn} IS NOT NULL
            AND ${escapedOldColumn} && ARRAY[${mappedValuesCondition}]::${escapedOldEnumType}[]`;
    }
    updateAtomicEnum({ escapedNewColumn, escapedOldColumn, escapedSchema, escapedTable, caseStatements, mappedValuesCondition }) {
        return `
          UPDATE ${escapedSchema}.${escapedTable}
          SET ${escapedNewColumn} =
            CASE ${escapedOldColumn}::text
              ${caseStatements}
            END
          WHERE ${escapedOldColumn} IS NOT NULL
            AND ${escapedOldColumn}::text IN (${mappedValuesCondition})`;
    }
};

//# sourceMappingURL=workspace-schema-enum-manager.service.js.map