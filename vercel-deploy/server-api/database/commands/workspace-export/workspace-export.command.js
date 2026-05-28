"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceExportCommand", {
    enumerable: true,
    get: function() {
        return WorkspaceExportCommand;
    }
});
const _common = require("@nestjs/common");
const _nestcommander = require("nest-commander");
const _workspaceexportservice = require("./workspace-export.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceExportCommand = class WorkspaceExportCommand extends _nestcommander.CommandRunner {
    parseWorkspaceId(value) {
        return value;
    }
    parseOutputPath(value) {
        return value;
    }
    parseTables(value) {
        return value;
    }
    async run(_passedParams, options) {
        const tableFilter = options.tables?.split(',').map((table)=>table.trim());
        try {
            const filePath = await this.workspaceExportService.exportWorkspace({
                workspaceId: options.workspaceId,
                outputPath: options.outputPath,
                tableFilter
            });
            this.logger.log(`Export complete: ${filePath}`);
        } catch (error) {
            this.logger.error('Export failed', error);
            throw error;
        }
    }
    constructor(workspaceExportService){
        super(), this.workspaceExportService = workspaceExportService, this.logger = new _common.Logger(WorkspaceExportCommand.name);
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--workspace-id <workspaceId>',
        description: 'Workspace UUID to export',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], WorkspaceExportCommand.prototype, "parseWorkspaceId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--output-path <outputPath>',
        description: 'Directory to write the .sql file',
        defaultValue: '/tmp/exports'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], WorkspaceExportCommand.prototype, "parseOutputPath", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--tables <tables>',
        description: 'Comma-separated workspace table names to export (uses nameSingular from ObjectMetadata)'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], WorkspaceExportCommand.prototype, "parseTables", null);
WorkspaceExportCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'workspace:export',
        description: 'Export a workspace as SQL INSERT statements'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceexportservice.WorkspaceExportService === "undefined" ? Object : _workspaceexportservice.WorkspaceExportService
    ])
], WorkspaceExportCommand);

//# sourceMappingURL=workspace-export.command.js.map