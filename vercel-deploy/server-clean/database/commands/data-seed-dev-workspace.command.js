"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DataSeedWorkspaceCommand", {
    enumerable: true,
    get: function() {
        return DataSeedWorkspaceCommand;
    }
});
const _common = require("@nestjs/common");
const _nestcommander = require("nest-commander");
const _seederworkspacesconstant = require("../../engine/workspace-manager/dev-seeder/core/constants/seeder-workspaces.constant");
const _devseederservice = require("../../engine/workspace-manager/dev-seeder/services/dev-seeder.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DataSeedWorkspaceCommand = class DataSeedWorkspaceCommand extends _nestcommander.CommandRunner {
    parseLight() {
        return true;
    }
    async run(_passedParams, options) {
        // --light seeds a single workspace (Apple) for thin dev containers like
        // twenty-app-dev. The default (no flag) seeds all four workspaces — Apple,
        // YCombinator and the Empty3/Empty4 fixtures consumed by upgrade-sequence
        // integration tests.
        const workspaceIds = options.light ? [
            _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID
        ] : [
            _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID,
            _seederworkspacesconstant.SEED_YCOMBINATOR_WORKSPACE_ID
        ];
        const emptyWorkspaceIds = options.light ? [] : [
            _seederworkspacesconstant.SEED_EMPTY_WORKSPACE_3_ID,
            _seederworkspacesconstant.SEED_EMPTY_WORKSPACE_4_ID
        ];
        try {
            for (const workspaceId of workspaceIds){
                await this.devSeederService.seedDev(workspaceId, {
                    light: options.light
                });
            }
            for (const workspaceId of emptyWorkspaceIds){
                await this.devSeederService.seedEmptyWorkspace(workspaceId);
            }
        } catch (error) {
            this.logger.error(error);
            this.logger.error(error.stack);
        }
    }
    constructor(devSeederService){
        super(), this.devSeederService = devSeederService, this.logger = new _common.Logger(DataSeedWorkspaceCommand.name);
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--light',
        description: 'Light seed: only seed the Apple workspace (skip YCombinator and the Empty3/Empty4 fixtures used by integration tests), skip demo custom objects (Pet, Survey, etc.) and limit records to 5 per object'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], DataSeedWorkspaceCommand.prototype, "parseLight", null);
DataSeedWorkspaceCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'workspace:seed:dev',
        description: 'Seed workspace with initial data. This command is intended for development only.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _devseederservice.DevSeederService === "undefined" ? Object : _devseederservice.DevSeederService
    ])
], DataSeedWorkspaceCommand);

//# sourceMappingURL=data-seed-dev-workspace.command.js.map