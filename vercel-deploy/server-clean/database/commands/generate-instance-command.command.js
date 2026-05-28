"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GenerateInstanceCommandCommand", {
    enumerable: true,
    get: function() {
        return GenerateInstanceCommandCommand;
    }
});
const _fs = /*#__PURE__*/ _interop_require_wildcard(require("fs"));
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
const _common = require("@nestjs/common");
const _nestcommander = require("nest-commander");
const _instancecommandgenerationservice = require("./instance-command-generation.service");
const _twentyallversionsconstant = require("../../engine/core-modules/upgrade/constants/twenty-all-versions.constant");
const _twentycurrentversionconstant = require("../../engine/core-modules/upgrade/constants/twenty-current-version.constant");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
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
const UPGRADE_VERSION_COMMAND_DIR = _path.resolve(process.cwd(), 'src/database/commands/upgrade-version-command');
let GenerateInstanceCommandCommand = class GenerateInstanceCommandCommand extends _nestcommander.CommandRunner {
    parseName(value) {
        return value;
    }
    parseType(value) {
        if (value !== 'fast' && value !== 'slow') {
            throw new Error(`Invalid type "${value}". Must be "fast" or "slow".`);
        }
        return value;
    }
    parseVersion(value) {
        if (!_twentyallversionsconstant.TWENTY_ALL_VERSIONS.includes(value)) {
            throw new Error(`Invalid version "${value}". Must be one of: ${_twentyallversionsconstant.TWENTY_ALL_VERSIONS.join(', ')}`);
        }
        return value;
    }
    async run(_passedParams, options) {
        const migrationName = options.name;
        const version = options.version ?? _twentycurrentversionconstant.TWENTY_CURRENT_VERSION;
        const commandType = options.type;
        this.logger.log(`Generating ${commandType} instance command for version ${version}...`);
        const versionDir = this.getVersionDir(version);
        const timestamp = Date.now();
        const result = await this.instanceMigrationGenerationService.generateInstanceCommand({
            migrationName,
            version,
            timestamp,
            type: commandType
        });
        if (!result) {
            this.logger.warn('No changes in database schema were found - cannot generate a migration.');
            return;
        }
        const filePath = _path.join(versionDir, result.fileName);
        _fs.writeFileSync(filePath, result.fileTemplate);
        this.logger.log(`${commandType} instance command generated successfully: ${filePath}`);
        this.logger.log(`  Class: ${result.className}`);
        this.logger.log(`  Version: ${version}`);
        const versionSlug = version.split('.').slice(0, 2).join('-');
        const newImportPath = `src/database/commands/upgrade-version-command/${versionSlug}/${result.fileName.replace('.ts', '')}`;
        this.appendToInstanceCommandsConstant(result.className, newImportPath);
    }
    getVersionDir(version) {
        const versionSlug = version.split('.').slice(0, 2).join('-');
        return _path.join(UPGRADE_VERSION_COMMAND_DIR, versionSlug);
    }
    appendToInstanceCommandsConstant(className, importPath) {
        const filePath = _path.join(UPGRADE_VERSION_COMMAND_DIR, 'instance-commands.constant.ts');
        const content = _fs.readFileSync(filePath, 'utf-8');
        if (content.includes(className)) {
            throw new Error(`${className} is already registered in instance-commands.constant.ts`);
        }
        const newImportLine = `import { ${className} } from '${importPath}';\n`;
        const updatedContent = content.replace(/\nexport const/, `${newImportLine}\nexport const`).replace(/\];/, `  ${className},\n];`);
        _fs.writeFileSync(filePath, updatedContent);
        this.logger.log(`Added ${className} to instance-commands.constant.ts`);
    }
    constructor(instanceMigrationGenerationService){
        super(), this.instanceMigrationGenerationService = instanceMigrationGenerationService, this.logger = new _common.Logger(GenerateInstanceCommandCommand.name);
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-n, --name <name>',
        description: 'Migration name (kebab-case)',
        defaultValue: 'auto-generated'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], GenerateInstanceCommandCommand.prototype, "parseName", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-t, --type <type>',
        description: 'Command type: fast (schema diff) or slow (data migration + DDL)',
        defaultValue: 'fast'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof InstanceCommandType === "undefined" ? Object : InstanceCommandType)
], GenerateInstanceCommandCommand.prototype, "parseType", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--version <version>',
        description: 'Target version (e.g. 1.23.0). Defaults to CURRENT_VERSION.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", typeof TwentyAllVersion === "undefined" ? Object : TwentyAllVersion)
], GenerateInstanceCommandCommand.prototype, "parseVersion", null);
GenerateInstanceCommandCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'generate:instance-command',
        description: 'Generate an instance command with @RegisteredInstanceCommand decorator for the latest supported version'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _instancecommandgenerationservice.InstanceCommandGenerationService === "undefined" ? Object : _instancecommandgenerationservice.InstanceCommandGenerationService
    ])
], GenerateInstanceCommandCommand);

//# sourceMappingURL=generate-instance-command.command.js.map