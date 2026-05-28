"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeMigrationService", {
    enumerable: true,
    get: function() {
        return UpgradeMigrationService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _upgrademigrationentity = require("../upgrade-migration.entity");
const _formatupgradeerrorforstorageutil = require("../utils/format-upgrade-error-for-storage.util");
const _extractversionfromcommandnameutil = require("../utils/extract-version-from-command-name.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const UPGRADE_MIGRATION_SAVE_BATCH_SIZE = 1000;
let UpgradeMigrationService = class UpgradeMigrationService {
    async getInferredVersion(commandName) {
        if ((0, _utils.isDefined)(commandName)) {
            return (0, _extractversionfromcommandnameutil.extractVersionFromCommandName)(commandName);
        }
        const migration = await this.getLastAttemptedInstanceCommand();
        return (0, _utils.isDefined)(migration) ? (0, _extractversionfromcommandnameutil.extractVersionFromCommandName)(migration.name) : null;
    }
    async isLastAttemptCompleted({ name, workspaceId }) {
        const latestAttempt = await this.upgradeMigrationRepository.findOne({
            where: {
                name,
                workspaceId: workspaceId === null ? (0, _typeorm1.IsNull)() : workspaceId
            },
            order: {
                attempt: 'DESC'
            }
        });
        return (0, _utils.isDefined)(latestAttempt) && latestAttempt.status === 'completed';
    }
    async recordUpgradeMigration(params) {
        const { name, workspaceIds, isInstance, status, executedByVersion } = params;
        const repository = params.queryRunner ? params.queryRunner.manager.getRepository(_upgrademigrationentity.UpgradeMigrationEntity) : this.upgradeMigrationRepository;
        const errorMessage = params.status === 'failed' ? (0, _formatupgradeerrorforstorageutil.formatUpgradeErrorForStorage)(params.error) : null;
        if (isInstance) {
            const previousAttempts = await repository.count({
                where: {
                    name,
                    workspaceId: (0, _typeorm1.IsNull)()
                }
            });
            const instanceRows = [
                {
                    name,
                    status,
                    attempt: previousAttempts + 1,
                    executedByVersion,
                    workspaceId: null,
                    errorMessage
                },
                ...workspaceIds.map((workspaceId)=>({
                        name,
                        status,
                        attempt: previousAttempts + 1,
                        executedByVersion,
                        workspaceId,
                        errorMessage
                    }))
            ];
            for (const batch of (0, _lodashchunk.default)(instanceRows, UPGRADE_MIGRATION_SAVE_BATCH_SIZE)){
                await repository.save(batch);
            }
            return;
        }
        const rows = [];
        for (const workspaceId of workspaceIds){
            const previousAttempts = await repository.count({
                where: {
                    name,
                    workspaceId
                }
            });
            rows.push({
                name,
                status,
                attempt: previousAttempts + 1,
                executedByVersion,
                workspaceId,
                errorMessage
            });
        }
        for (const batch of (0, _lodashchunk.default)(rows, UPGRADE_MIGRATION_SAVE_BATCH_SIZE)){
            await repository.save(batch);
        }
    }
    async markAsWorkspaceInitial({ name, workspaceId, executedByVersion, status, queryRunner }) {
        const repository = queryRunner ? queryRunner.manager.getRepository(_upgrademigrationentity.UpgradeMigrationEntity) : this.upgradeMigrationRepository;
        await repository.save({
            name,
            status,
            isInitial: true,
            attempt: 1,
            executedByVersion,
            workspaceId
        });
    }
    // Returns the most recently attempted command (by createdAt)
    // across instance and active-workspace scopes, with its status.
    // isInitial records are excluded — they represent activation
    // state, not execution progress.
    async getLastAttemptedCommandNameOrThrow(allActiveOrSuspendedWorkspaceIds) {
        const queryBuilder = this.upgradeMigrationRepository.createQueryBuilder('migration').select([
            'migration.name',
            'migration.status'
        ]).andWhere('migration."isInitial" = false').andWhere(`migration.attempt = (
          SELECT MAX(sub.attempt)
          FROM core."upgradeMigration" sub
          WHERE sub.name = migration.name
          AND (
            (sub."workspaceId" IS NULL AND migration."workspaceId" IS NULL)
            OR sub."workspaceId" = migration."workspaceId"
          )
        )`);
        if (allActiveOrSuspendedWorkspaceIds.length > 0) {
            queryBuilder.andWhere('(migration."workspaceId" IS NULL OR migration."workspaceId" IN (:...allActiveOrSuspendedWorkspaceIds))', {
                allActiveOrSuspendedWorkspaceIds
            });
        } else {
            queryBuilder.andWhere('migration."workspaceId" IS NULL');
        }
        const migration = await queryBuilder.orderBy('migration.createdAt', 'DESC').getOne();
        if (!migration) {
            throw new Error('No upgrade migration found — the database may not have been initialized');
        }
        return {
            name: migration.name,
            status: migration.status
        };
    }
    async getWorkspaceLastAttemptedCommandName(workspaceIds) {
        if (workspaceIds.length === 0) {
            return new Map();
        }
        const rows = await this.upgradeMigrationRepository.manager.query(`
        SELECT DISTINCT ON (latest_per_name."workspaceId")
          latest_per_name."workspaceId",
          latest_per_name.name,
          latest_per_name.status,
          latest_per_name."executedByVersion",
          latest_per_name."errorMessage",
          latest_per_name."createdAt",
          latest_per_name."isInitial"
        FROM (
          SELECT DISTINCT ON ("workspaceId", name)
            "workspaceId",
            name,
            status,
            "executedByVersion",
            "errorMessage",
            "createdAt",
            "isInitial"
          FROM core."upgradeMigration"
          WHERE "workspaceId" = ANY($1)
          ORDER BY "workspaceId", name, attempt DESC
        ) latest_per_name
        ORDER BY latest_per_name."workspaceId", latest_per_name."createdAt" DESC
      `, [
            workspaceIds
        ]);
        const cursors = new Map();
        for (const row of rows){
            cursors.set(row.workspaceId, {
                workspaceId: row.workspaceId,
                name: row.name,
                status: row.status,
                executedByVersion: row.executedByVersion,
                errorMessage: row.errorMessage,
                createdAt: row.createdAt,
                isInitial: row.isInitial
            });
        }
        return cursors;
    }
    async getWorkspaceLastAttemptedCommandNameOrThrow(workspaceIds) {
        const cursors = await this.getWorkspaceLastAttemptedCommandName(workspaceIds);
        const missingWorkspaceIds = workspaceIds.filter((workspaceId)=>!cursors.has(workspaceId));
        if (missingWorkspaceIds.length > 0) {
            throw new Error(`No upgrade migration found for workspace(s): ${missingWorkspaceIds.join(', ')}`);
        }
        return cursors;
    }
    async areAllWorkspacesAtCommand({ commandName, workspaceIds }) {
        if (workspaceIds.length === 0) {
            return true;
        }
        const completedCount = await this.upgradeMigrationRepository.createQueryBuilder('migration').where({
            name: commandName,
            status: 'completed',
            workspaceId: (0, _typeorm1.In)(workspaceIds)
        }).andWhere(`migration.attempt = (
          SELECT MAX(sub.attempt)
          FROM core."upgradeMigration" sub
          WHERE sub.name = migration.name
          AND sub."workspaceId" = migration."workspaceId"
        )`).getCount();
        return completedCount === workspaceIds.length;
    }
    async getLastAttemptedInstanceCommand() {
        const migration = await this.upgradeMigrationRepository.createQueryBuilder('migration').select([
            'migration.name',
            'migration.status',
            'migration.executedByVersion',
            'migration.errorMessage',
            'migration.createdAt'
        ]).where('migration."workspaceId" IS NULL').andWhere('migration."isInitial" = false').andWhere(`migration.attempt = (
          SELECT MAX(sub.attempt)
          FROM core."upgradeMigration" sub
          WHERE sub.name = migration.name
          AND sub."workspaceId" IS NULL
        )`).orderBy('migration.createdAt', 'DESC').getOne();
        if (!migration) {
            return null;
        }
        return {
            name: migration.name,
            status: migration.status,
            executedByVersion: migration.executedByVersion,
            errorMessage: migration.errorMessage,
            createdAt: migration.createdAt
        };
    }
    async getLastAttemptedInstanceCommandOrThrow() {
        const result = await this.getLastAttemptedInstanceCommand();
        if (!result) {
            throw new Error('No instance command found — the database may not have been initialized');
        }
        return result;
    }
    constructor(upgradeMigrationRepository){
        this.upgradeMigrationRepository = upgradeMigrationRepository;
    }
};
UpgradeMigrationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_upgrademigrationentity.UpgradeMigrationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], UpgradeMigrationService);

//# sourceMappingURL=upgrade-migration.service.js.map