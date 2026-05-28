"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MigrateAiModelPreferencesSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return MigrateAiModelPreferencesSlowInstanceCommand;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _keyvaluepairentity = require("../../../../engine/core-modules/key-value-pair/key-value-pair.entity");
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
const _aimodelpreferencesschema = require("../../../../engine/metadata-modules/ai/ai-models/types/ai-model-preferences.schema");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
let MigrateAiModelPreferencesSlowInstanceCommand = class MigrateAiModelPreferencesSlowInstanceCommand {
    async runDataMigration(dataSource) {
        const keyValuePairRepository = dataSource.getRepository(_keyvaluepairentity.KeyValuePairEntity);
        const existingRow = await keyValuePairRepository.findOne({
            where: {
                type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
                key: 'AI_MODEL_PREFERENCES',
                userId: (0, _typeorm.IsNull)(),
                workspaceId: (0, _typeorm.IsNull)()
            }
        });
        if (!(0, _utils.isDefined)(existingRow)) {
            this.logger.log('No server-level AI_MODEL_PREFERENCES row found, skipping');
            return;
        }
        const parseResult = _aimodelpreferencesschema.aiModelPreferencesSchema.safeParse(existingRow.value);
        if (!parseResult.success) {
            this.logger.error(`Failed to parse server-level AI_MODEL_PREFERENCES: ${parseResult.error.message}`);
            return;
        }
        const prefs = parseResult.data;
        this.logger.log('Migrating server-level AI_MODEL_PREFERENCES');
        await dataSource.transaction(async (manager)=>{
            const transactionalRepository = manager.getRepository(_keyvaluepairentity.KeyValuePairEntity);
            for (const newKey of NEW_KEYS){
                const prefField = PREFERENCE_KEY_MAP[newKey];
                const value = prefs[prefField];
                if (!(0, _utils.isDefined)(value) || value.length === 0) {
                    continue;
                }
                const existingNewKeyCount = await transactionalRepository.count({
                    where: {
                        type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
                        key: newKey,
                        userId: (0, _typeorm.IsNull)(),
                        workspaceId: (0, _typeorm.IsNull)()
                    }
                });
                if (existingNewKeyCount > 0) {
                    continue;
                }
                await transactionalRepository.insert({
                    key: newKey,
                    value: value,
                    type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
                    userId: null,
                    workspaceId: null
                });
            }
            await transactionalRepository.delete({
                id: existingRow.id
            });
        });
        this.logger.log('Migrated server-level AI_MODEL_PREFERENCES to 4 individual vars');
    }
    async up(_queryRunner) {
        return;
    }
    async down(_queryRunner) {
        return;
    }
    constructor(){
        this.logger = new _common.Logger(MigrateAiModelPreferencesSlowInstanceCommand.name);
    }
};
MigrateAiModelPreferencesSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.9.0', 1799000010000, {
        type: 'slow'
    })
], MigrateAiModelPreferencesSlowInstanceCommand);

//# sourceMappingURL=2-9-instance-command-slow-1799000010000-migrate-ai-model-preferences.js.map