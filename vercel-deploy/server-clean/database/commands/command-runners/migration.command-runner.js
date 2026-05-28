"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MigrationCommandRunner", {
    enumerable: true,
    get: function() {
        return MigrationCommandRunner;
    }
});
const _chalk = /*#__PURE__*/ _interop_require_default(require("chalk"));
const _nestcommander = require("nest-commander");
const _logger = require("../logger");
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
let MigrationCommandRunner = class MigrationCommandRunner extends _nestcommander.CommandRunner {
    parseDryRun() {
        return true;
    }
    parseVerbose() {
        return true;
    }
    async run(passedParams, options) {
        if (options.verbose) {
            this.logger = new _logger.CommandLogger({
                verbose: true,
                constructorName: this.constructor.name
            });
        }
        try {
            await this.runMigrationCommand(passedParams, options);
            this.logger.log(_chalk.default.blue('Command completed!'));
        } catch (error) {
            this.logger.error(_chalk.default.red(`Command failed`));
            throw error;
        }
    }
    constructor(){
        super();
        this.logger = new _logger.CommandLogger({
            verbose: false,
            constructorName: this.constructor.name
        });
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-d, --dry-run',
        description: 'Simulate the command without making actual changes',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], MigrationCommandRunner.prototype, "parseDryRun", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-v, --verbose',
        description: 'Verbose output',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], MigrationCommandRunner.prototype, "parseVerbose", null);

//# sourceMappingURL=migration.command-runner.js.map