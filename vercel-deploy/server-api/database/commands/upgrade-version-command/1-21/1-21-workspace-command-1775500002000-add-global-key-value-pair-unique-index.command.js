"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddGlobalKeyValuePairUniqueIndexCommand", {
    enumerable: true,
    get: function() {
        return AddGlobalKeyValuePairUniqueIndexCommand;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _nestcommander = require("nest-commander");
const _typeorm1 = require("typeorm");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _1774700000000addglobalkeyvaluepairuniqueindexutil = require("../../../typeorm/core/migrations/utils/1774700000000-add-global-key-value-pair-unique-index.util");
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
let AddGlobalKeyValuePairUniqueIndexCommand = class AddGlobalKeyValuePairUniqueIndexCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async deduplicateGlobalKeyValuePairs(queryRunner) {
        await queryRunner.query(`
      DELETE FROM "core"."keyValuePair"
      WHERE id IN (
        SELECT id
        FROM (
          SELECT
            id,
            ROW_NUMBER() OVER (
              PARTITION BY key
              ORDER BY "updatedAt" DESC, "createdAt" DESC, id DESC
            ) AS row_number
          FROM "core"."keyValuePair"
          WHERE "userId" IS NULL
            AND "workspaceId" IS NULL
        ) ranked_key_value_pairs
        WHERE ranked_key_value_pairs.row_number > 1
      )
    `);
    }
    async runOnWorkspace({ options }) {
        if (this.hasRunOnce) {
            this.logger.log('Skipping has already been run once AddGlobalKeyValuePairUniqueIndexCommand');
            return;
        }
        if (options.dryRun) {
            return;
        }
        const queryRunner = this.coreDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.deduplicateGlobalKeyValuePairs(queryRunner);
            await (0, _1774700000000addglobalkeyvaluepairuniqueindexutil.addGlobalKeyValuePairUniqueIndexQueries)(queryRunner);
            await queryRunner.commitTransaction();
            this.logger.log('Successfully run AddGlobalKeyValuePairUniqueIndexCommand');
            this.hasRunOnce = true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Rolling back AddGlobalKeyValuePairUniqueIndexCommand: ${error.message}`);
            throw error;
        } finally{
            await queryRunner.release();
        }
    }
    constructor(workspaceIteratorService, coreDataSource){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.coreDataSource = coreDataSource, this.hasRunOnce = false;
    }
};
AddGlobalKeyValuePairUniqueIndexCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500002000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:add-global-key-value-pair-unique-index',
        description: 'Deduplicate global keyValuePair rows and add the null/null unique index'
    }),
    _ts_param(1, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource
    ])
], AddGlobalKeyValuePairUniqueIndexCommand);

//# sourceMappingURL=1-21-workspace-command-1775500002000-add-global-key-value-pair-unique-index.command.js.map