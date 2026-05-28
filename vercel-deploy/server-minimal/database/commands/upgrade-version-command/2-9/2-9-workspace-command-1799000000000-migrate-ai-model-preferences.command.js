"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MigrateAiModelPreferencesCommand", {
    enumerable: true,
    get: function() {
        return MigrateAiModelPreferencesCommand;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _nestcommander = require("nest-commander");
const _typeorm1 = require("typeorm");
const _classvalidator = require("class-validator");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _keyvaluepairentity = require("../../../../engine/core-modules/key-value-pair/key-value-pair.entity");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _aimodelpreferencesschema = require("../../../../engine/metadata-modules/ai/ai-models/types/ai-model-preferences.schema");
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
const NEW_KEYS = [
    'AI_MODELS_DEFAULT_FAST',
    'AI_MODELS_DEFAULT_SMART',
    'AI_MODELS_DEFAULT_RECOMMENDED',
    'AI_MODELS_DEFAULT_DISABLED'
];
const PREFERENCE_KEY_MAP = {
    AI_MODELS_DEFAULT_FAST: 'defaultFastModels',
    AI_MODELS_DEFAULT_SMART: 'defaultSmartModels',
    AI_MODELS_DEFAULT_RECOMMENDED: 'recommendedModels',
    AI_MODELS_DEFAULT_DISABLED: 'disabledModels'
};
let MigrateAiModelPreferencesCommand = class MigrateAiModelPreferencesCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        const existingPreferencesRow = await this.keyValuePairRepository.findOne({
            where: {
                key: 'AI_MODEL_PREFERENCES',
                type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
                workspaceId,
                userId: (0, _typeorm1.IsNull)()
            }
        });
        if (existingPreferencesRow === null) {
            this.logger.log(`No AI_MODEL_PREFERENCES row found for workspace ${workspaceId}, skipping`);
            return;
        }
        const parseResult = _aimodelpreferencesschema.aiModelPreferencesSchema.safeParse(existingPreferencesRow.value);
        if (!parseResult.success) {
            this.logger.error(`Failed to parse AI_MODEL_PREFERENCES for workspace ${workspaceId}: ${parseResult.error.message}`);
            return;
        }
        const prefs = parseResult.data;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Migrating AI_MODEL_PREFERENCES for workspace ${workspaceId}`);
        for (const newKey of NEW_KEYS){
            const prefField = PREFERENCE_KEY_MAP[newKey];
            if (!(0, _classvalidator.isDefined)(prefField) || (0, _classvalidator.isArray)(prefs[prefField]) && prefs[prefField].length === 0) {
                continue;
            }
            const value = prefs[prefField];
            if (isDryRun) {
                this.logger.log(`[DRY RUN] Would insert ${newKey} = ${JSON.stringify(value)} for workspace ${workspaceId}`);
                continue;
            }
            const existingNewKeyRow = await this.keyValuePairRepository.findOne({
                where: {
                    key: newKey,
                    type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
                    workspaceId,
                    userId: (0, _typeorm1.IsNull)()
                }
            });
            if (existingNewKeyRow !== null) {
                continue;
            }
            await this.keyValuePairRepository.insert({
                key: newKey,
                value: value,
                type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
                workspaceId,
                userId: null
            });
        }
        if (!isDryRun) {
            await this.keyValuePairRepository.delete({
                id: existingPreferencesRow.id
            });
            this.logger.log(`Migrated AI_MODEL_PREFERENCES to 4 individual vars for workspace ${workspaceId}`);
        }
    }
    constructor(workspaceIteratorService, keyValuePairRepository){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.keyValuePairRepository = keyValuePairRepository;
    }
};
MigrateAiModelPreferencesCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.9.0', 1799000000000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-9:migrate-ai-model-preferences',
        description: 'Migrate AI_MODEL_PREFERENCES config var to the four individual AI_MODELS_DEFAULT_* vars, per workspace'
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_keyvaluepairentity.KeyValuePairEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], MigrateAiModelPreferencesCommand);

//# sourceMappingURL=2-9-workspace-command-1799000000000-migrate-ai-model-preferences.command.js.map