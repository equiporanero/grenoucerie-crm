"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateEditLayoutCommandMenuItemLabelCommand", {
    enumerable: true,
    get: function() {
        return UpdateEditLayoutCommandMenuItemLabelCommand;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _nestcommander = require("nest-commander");
const _typeorm1 = require("typeorm");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
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
const EDIT_RECORD_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER = 'd9794c67-1799-424f-8871-5ea771dd4a6d';
let UpdateEditLayoutCommandMenuItemLabelCommand = class UpdateEditLayoutCommandMenuItemLabelCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const dryRun = options?.dryRun ?? false;
        if (dryRun) {
            this.logger.log(`[DRY RUN] Would update Edit Layout command menu item label for workspace ${workspaceId}. Skipping.`);
            return;
        }
        const queryRunner = this.coreDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result = await queryRunner.query(`
        UPDATE core."commandMenuItem"
        SET label = 'Edit Layout', "shortLabel" = 'Edit Layout'
        WHERE "workspaceId" = $1
          AND "universalIdentifier" = $2
          AND (label != 'Edit Layout' OR "shortLabel" != 'Edit Layout')
        `, [
                workspaceId,
                EDIT_RECORD_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER
            ]);
            const updateCount = result?.[1] ?? 0;
            if (updateCount === 0) {
                this.logger.log(`Edit Layout command menu item already up to date for workspace ${workspaceId}`);
            } else {
                this.logger.log(`Updated Edit Layout command menu item label for workspace ${workspaceId}`);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }
            this.logger.error(`Error updating Edit Layout command menu item label for workspace ${workspaceId}`, error);
            throw error;
        } finally{
            await queryRunner.release();
        }
    }
    constructor(workspaceIteratorService, coreDataSource){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.coreDataSource = coreDataSource;
    }
};
UpdateEditLayoutCommandMenuItemLabelCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500009000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:update-edit-layout-command-menu-item-label',
        description: 'Update Edit Page Layout command menu item label to Edit Layout'
    }),
    _ts_param(1, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource
    ])
], UpdateEditLayoutCommandMenuItemLabelCommand);

//# sourceMappingURL=1-21-workspace-command-1775500009000-update-edit-layout-command-menu-item-label.command.js.map