"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GenerateApiKeyCommand", {
    enumerable: true,
    get: function() {
        return GenerateApiKeyCommand;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _datefns = require("date-fns");
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _nodeenvironmentinterface = require("../../twenty-config/interfaces/node-environment.interface");
const _apikeyservice = require("../services/api-key.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _roleentity = require("../../../metadata-modules/role/role.entity");
const _standardroleconstant = require("../../../workspace-manager/twenty-standard-application/constants/standard-role.constant");
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
const NEVER_EXPIRE_DAYS = 100 * 365;
let GenerateApiKeyCommand = class GenerateApiKeyCommand extends _nestcommander.CommandRunner {
    parseWorkspaceId(value) {
        return value;
    }
    parseName(value) {
        return value;
    }
    parseExpiresIn(value) {
        const days = parseInt(value, 10);
        if (isNaN(days) || days <= 0) {
            throw new Error('--expires-in must be a positive number of days');
        }
        return days;
    }
    async run(_passedParams, options) {
        const nodeEnv = this.twentyConfigService.get('NODE_ENV');
        if (nodeEnv !== _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT && nodeEnv !== _nodeenvironmentinterface.NodeEnvironment.TEST) {
            throw new Error('This command is only available in development or test environments');
        }
        const expiresAt = (0, _datefns.addDays)(new Date(), options.expiresIn ?? NEVER_EXPIRE_DAYS);
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: options.workspaceId
            }
        });
        if (!(0, _utils.isDefined)(workspace)) {
            this.logger.error(`Workspace ${options.workspaceId} not found.`);
            return;
        }
        const adminRole = await this.roleRepository.findOne({
            where: {
                workspaceId: workspace.id,
                universalIdentifier: _standardroleconstant.STANDARD_ROLE.admin.universalIdentifier
            }
        });
        if (!(0, _utils.isDefined)(adminRole)) {
            this.logger.error(`No Admin role found for workspace ${workspace.id}.`);
            return;
        }
        let apiKey;
        try {
            apiKey = await this.apiKeyService.create({
                name: options.name,
                expiresAt,
                workspaceId: workspace.id,
                roleId: adminRole.id
            });
        } catch (error) {
            this.logger.error(`Failed to create API key: ${error}`);
            return;
        }
        const tokenResult = await this.apiKeyService.generateApiKeyToken(workspace.id, apiKey.id, expiresAt);
        if (!(0, _utils.isDefined)(tokenResult)) {
            this.logger.error('Failed to generate token.');
            return;
        }
        this.logger.log(`TOKEN:${tokenResult.token}\n`);
    }
    constructor(workspaceRepository, roleRepository, apiKeyService, twentyConfigService){
        super(), this.workspaceRepository = workspaceRepository, this.roleRepository = roleRepository, this.apiKeyService = apiKeyService, this.twentyConfigService = twentyConfigService, this.logger = new _common.Logger(GenerateApiKeyCommand.name);
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-id <workspaceId>',
        description: 'Workspace ID (required)',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], GenerateApiKeyCommand.prototype, "parseWorkspaceId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-n, --name <name>',
        description: 'Name of the API key',
        defaultValue: 'Developer API Key'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], GenerateApiKeyCommand.prototype, "parseName", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-e, --expires-in <days>',
        description: 'Number of days until expiration. Omit for a non-expiring key.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Number)
], GenerateApiKeyCommand.prototype, "parseExpiresIn", null);
GenerateApiKeyCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'workspace:generate-api-key',
        description: 'Generate an API key for a workspace and output the token'
    }),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _apikeyservice.ApiKeyService === "undefined" ? Object : _apikeyservice.ApiKeyService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], GenerateApiKeyCommand);

//# sourceMappingURL=generate-api-key.command.js.map