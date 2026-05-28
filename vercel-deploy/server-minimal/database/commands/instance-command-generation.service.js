"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InstanceCommandGenerationService", {
    enumerable: true,
    get: function() {
        return InstanceCommandGenerationService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
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
let InstanceCommandGenerationService = class InstanceCommandGenerationService {
    async generateInstanceCommand({ migrationName, version, timestamp, type = 'fast' }) {
        const sqlInMemory = await this.dataSource.driver.createSchemaBuilder().log();
        if (sqlInMemory.upQueries.length === 0) {
            return null;
        }
        const className = this.buildClassName({
            name: migrationName,
            type
        });
        const upStatements = sqlInMemory.upQueries.map(({ query, parameters })=>`    await queryRunner.query('${this.escapeForSingleQuotedString(query)}'${this.formatQueryParams(parameters)});`);
        const downStatements = sqlInMemory.downQueries.reverse().map(({ query, parameters })=>`    await queryRunner.query('${this.escapeForSingleQuotedString(query)}'${this.formatQueryParams(parameters)});`);
        const fileTemplate = type === 'slow' ? this.buildSlowMigrationFileContent({
            className,
            version,
            timestamp,
            upStatements,
            downStatements
        }) : this.buildFastMigrationFileContent({
            className,
            version,
            timestamp,
            upStatements,
            downStatements
        });
        const versionSlug = version.split('.').slice(0, 2).join('-');
        const fileName = `${versionSlug}-instance-command-${type}-${timestamp}-${migrationName}.ts`;
        return {
            fileName,
            fileTemplate,
            className
        };
    }
    buildClassName({ name, type }) {
        return `${(0, _utils.pascalCase)(name)}${(0, _utils.pascalCase)(type)}InstanceCommand`;
    }
    formatQueryParams(parameters) {
        if (!parameters || !parameters.length) {
            return '';
        }
        return `, ${JSON.stringify(parameters)}`;
    }
    escapeForSingleQuotedString(query) {
        return query.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    }
    buildFastMigrationFileContent({ className, version, timestamp, upStatements, downStatements }) {
        return `import { QueryRunner } from 'typeorm';

import { RegisteredInstanceCommand } from 'src/engine/core-modules/upgrade/decorators/registered-instance-command.decorator';
import { FastInstanceCommand } from 'src/engine/core-modules/upgrade/interfaces/fast-instance-command.interface';

@RegisteredInstanceCommand('${version}', ${timestamp})
export class ${className} implements FastInstanceCommand {
  public async up(queryRunner: QueryRunner): Promise<void> {
${upStatements.join('\n')}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
${downStatements.join('\n')}
  }
}
`;
    }
    buildSlowMigrationFileContent({ className, version, timestamp, upStatements, downStatements }) {
        return `import { DataSource, QueryRunner } from 'typeorm';

import { RegisteredInstanceCommand } from 'src/engine/core-modules/upgrade/decorators/registered-instance-command.decorator';
import { SlowInstanceCommand } from 'src/engine/core-modules/upgrade/interfaces/slow-instance-command.interface';

@RegisteredInstanceCommand('${version}', ${timestamp}, { type: 'slow' })
export class ${className} implements SlowInstanceCommand {
  async runDataMigration(dataSource: DataSource): Promise<void> {
    // TODO: implement data backfill before the DDL migration
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
${upStatements.join('\n')}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
${downStatements.join('\n')}
  }
}
`;
    }
    constructor(dataSource){
        this.dataSource = dataSource;
    }
};
InstanceCommandGenerationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource
    ])
], InstanceCommandGenerationService);

//# sourceMappingURL=instance-command-generation.service.js.map