"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowCleanWorkflowRunsJob", {
    enumerable: true,
    get: function() {
        return WorkflowCleanWorkflowRunsJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _processdecorator = require("../../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _getworkspaceschemanameutil = require("../../../../../engine/workspace-datasource/utils/get-workspace-schema-name.util");
const _workflowrunworkspaceentity = require("../../../common/standard-objects/workflow-run.workspace-entity");
const _numberofworkflowrunstokeep = require("../constants/number-of-workflow-runs-to-keep");
const _runstocleanthreshold = require("../constants/runs-to-clean-threshold");
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
let WorkflowCleanWorkflowRunsJob = class WorkflowCleanWorkflowRunsJob {
    async handle({ workspaceId }) {
        const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        this.logger.log(`[WorkflowCleanWorkflowRunsJob] Starting job for workspace ${workspaceId}`);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const BATCH_SIZE = 200;
            let totalDeleted = 0;
            const oldRunsDeleted = await this.deleteOldRuns({
                schemaName,
                batchSize: BATCH_SIZE
            });
            totalDeleted += oldRunsDeleted;
            const excessRunsDeleted = await this.deleteExcessRunsPerWorkflow({
                schemaName,
                batchSize: BATCH_SIZE
            });
            totalDeleted += excessRunsDeleted;
            this.logger.log(`[WorkflowCleanWorkflowRunsJob] Deleted ${totalDeleted} workflow runs for workspace ${workspaceId}`);
        }, authContext);
    }
    async deleteOldRuns({ schemaName, batchSize }) {
        let totalDeleted = 0;
        let deletedCount;
        do {
            const result = await this.dataSource.query(`
          DELETE FROM ${schemaName}."workflowRun"
          WHERE id IN (
            SELECT id FROM ${schemaName}."workflowRun"
            WHERE status IN ($1, $2)
              AND "createdAt" < NOW() - MAKE_INTERVAL(days => $3)
            LIMIT $4
          )
          RETURNING id;
        `, [
                _workflowrunworkspaceentity.WorkflowRunStatus.COMPLETED,
                _workflowrunworkspaceentity.WorkflowRunStatus.FAILED,
                _runstocleanthreshold.RUNS_TO_CLEAN_THRESHOLD_DAYS,
                batchSize
            ]);
            // TypeORM's dataSource.query() for for DELETE ... RETURNING returns a tuple [rows, affectedCount]
            deletedCount = result[0].length;
            totalDeleted += deletedCount;
        }while (deletedCount > 0)
        return totalDeleted;
    }
    async deleteExcessRunsPerWorkflow({ schemaName, batchSize }) {
        let totalDeleted = 0;
        let deletedCount;
        do {
            const result = await this.dataSource.query(`
          WITH ranked_runs AS (
            SELECT id,
                   ROW_NUMBER() OVER (
                      PARTITION BY "workflowId"
                      ORDER BY "createdAt" DESC
                   ) AS rn
            FROM ${schemaName}."workflowRun"
            WHERE status IN ($1, $2)
          ),
          runs_to_delete AS (
            SELECT id FROM ranked_runs
            WHERE rn > $3
            LIMIT $4
          )
          DELETE FROM ${schemaName}."workflowRun"
          WHERE id IN (SELECT id FROM runs_to_delete)
          RETURNING id;
        `, [
                _workflowrunworkspaceentity.WorkflowRunStatus.COMPLETED,
                _workflowrunworkspaceentity.WorkflowRunStatus.FAILED,
                _numberofworkflowrunstokeep.NUMBER_OF_WORKFLOW_RUNS_TO_KEEP,
                batchSize
            ]);
            // TypeORM's dataSource.query() for for DELETE ... RETURNING returns a tuple [rows, affectedCount]
            deletedCount = result[0].length;
            totalDeleted += deletedCount;
        }while (deletedCount > 0)
        return totalDeleted;
    }
    constructor(globalWorkspaceOrmManager, dataSource){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.dataSource = dataSource;
        this.logger = new _common.Logger(WorkflowCleanWorkflowRunsJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(WorkflowCleanWorkflowRunsJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkflowCleanWorkflowRunsJobData === "undefined" ? Object : WorkflowCleanWorkflowRunsJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowCleanWorkflowRunsJob.prototype, "handle", null);
WorkflowCleanWorkflowRunsJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.workflowQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(1, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource
    ])
], WorkflowCleanWorkflowRunsJob);

//# sourceMappingURL=workflow-clean-workflow-runs.job.js.map