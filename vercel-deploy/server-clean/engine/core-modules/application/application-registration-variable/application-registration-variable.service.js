"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationVariableService", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationVariableService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _applicationregistrationvariableentity = require("./application-registration-variable.entity");
const _applicationregistrationentity = require("../application-registration/application-registration.entity");
const _applicationregistrationexception = require("../application-registration/application-registration.exception");
const _secretencryptionservice = require("../../secret-encryption/secret-encryption.service");
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
let ApplicationRegistrationVariableService = class ApplicationRegistrationVariableService {
    async findVariablesWithObfuscatedValues(applicationRegistrationId, workspaceId) {
        await this.assertRegistrationOwnedByWorkspace(applicationRegistrationId, workspaceId);
        return this.findVariablesWithObfuscatedValuesGlobal(applicationRegistrationId);
    }
    async findVariablesWithObfuscatedValuesGlobal(applicationRegistrationId) {
        const variables = await this.variableRepository.find({
            where: {
                applicationRegistrationId
            },
            order: {
                key: 'ASC'
            }
        });
        return variables.map((variable)=>({
                ...variable,
                isFilled: variable.isFilled,
                value: variable.isFilled ? variable.isSecret ? '•••••••••••••' : this.encryptionService.decryptVersioned(variable.encryptedValue) : null
            }));
    }
    async createVariable(input, workspaceId) {
        await this.assertRegistrationOwnedByWorkspace(input.applicationRegistrationId, workspaceId);
        const encryptedValue = this.encryptionService.encryptVersioned(input.value);
        const variable = this.variableRepository.create({
            applicationRegistrationId: input.applicationRegistrationId,
            key: input.key,
            encryptedValue,
            description: input.description ?? '',
            isSecret: input.isSecret ?? true
        });
        return this.variableRepository.save(variable);
    }
    async updateVariable(input, workspaceId) {
        const { id, update } = input;
        const variable = await this.variableRepository.findOne({
            where: {
                id
            }
        });
        if (!variable) {
            throw new _applicationregistrationexception.ApplicationRegistrationException(`Variable with id ${id} not found`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.VARIABLE_NOT_FOUND);
        }
        await this.assertRegistrationOwnedByWorkspace(variable.applicationRegistrationId, workspaceId);
        const updateData = {};
        if ((0, _utils.isDefined)(update.value)) {
            updateData.encryptedValue = this.encryptionService.encryptVersioned(update.value);
        }
        if ((0, _utils.isDefined)(update.resetValue) && update.resetValue) {
            updateData.encryptedValue = '';
        }
        if ((0, _utils.isDefined)(update.description)) {
            updateData.description = update.description;
        }
        if (Object.keys(updateData).length > 0) {
            await this.variableRepository.update(id, updateData);
        }
        return this.variableRepository.findOneOrFail({
            where: {
                id
            }
        });
    }
    async deleteVariable(id, workspaceId) {
        const variable = await this.variableRepository.findOne({
            where: {
                id
            }
        });
        if (!variable) {
            throw new _applicationregistrationexception.ApplicationRegistrationException(`Variable with id ${id} not found`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.VARIABLE_NOT_FOUND);
        }
        await this.assertRegistrationOwnedByWorkspace(variable.applicationRegistrationId, workspaceId);
        await this.variableRepository.delete(id);
        return true;
    }
    // Syncs variable schemas from manifest: creates missing, updates metadata, removes stale
    async syncVariableSchemas(applicationRegistrationId, serverVariables) {
        const declaredKeys = Object.keys(serverVariables);
        const existingVariables = await this.variableRepository.find({
            where: {
                applicationRegistrationId
            }
        });
        const existingByKey = new Map(existingVariables.map((variable)=>[
                variable.key,
                variable
            ]));
        for (const [key, schema] of Object.entries(serverVariables)){
            const existing = existingByKey.get(key);
            if (existing) {
                await this.variableRepository.update(existing.id, {
                    description: schema.description ?? '',
                    isSecret: schema.isSecret ?? true,
                    isRequired: schema.isRequired ?? false
                });
            } else {
                await this.variableRepository.save(this.variableRepository.create({
                    applicationRegistrationId,
                    key,
                    encryptedValue: '',
                    description: schema.description ?? '',
                    isSecret: schema.isSecret ?? true,
                    isRequired: schema.isRequired ?? false
                }));
            }
        }
        if (declaredKeys.length > 0) {
            await this.variableRepository.delete({
                applicationRegistrationId,
                key: (0, _typeorm1.Not)((0, _typeorm1.In)(declaredKeys))
            });
        } else {
            await this.variableRepository.delete({
                applicationRegistrationId
            });
        }
    }
    async isConfiguredBatch(applicationRegistrationIds) {
        const variables = await this.variableRepository.find({
            where: {
                applicationRegistrationId: (0, _typeorm1.In)(applicationRegistrationIds)
            }
        });
        const variablesByRegistrationId = new Map();
        for (const variable of variables){
            const existing = variablesByRegistrationId.get(variable.applicationRegistrationId) ?? [];
            existing.push(variable);
            variablesByRegistrationId.set(variable.applicationRegistrationId, existing);
        }
        const result = new Map();
        for (const id of applicationRegistrationIds){
            const registrationVariables = variablesByRegistrationId.get(id) ?? [];
            const requiredVariables = registrationVariables.filter((v)=>v.isRequired);
            result.set(id, requiredVariables.every((v)=>v.isFilled));
        }
        return result;
    }
    async assertRegistrationOwnedByWorkspace(registrationId, workspaceId) {
        const registration = await this.applicationRegistrationRepository.findOne({
            where: {
                id: registrationId,
                ownerWorkspaceId: workspaceId
            }
        });
        if (!registration) {
            throw new _applicationregistrationexception.ApplicationRegistrationException(`Application registration with id ${registrationId} not found`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.APPLICATION_REGISTRATION_NOT_FOUND);
        }
    }
    constructor(variableRepository, applicationRegistrationRepository, encryptionService){
        this.variableRepository = variableRepository;
        this.applicationRegistrationRepository = applicationRegistrationRepository;
        this.encryptionService = encryptionService;
    }
};
ApplicationRegistrationVariableService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_applicationregistrationvariableentity.ApplicationRegistrationVariableEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationregistrationentity.ApplicationRegistrationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], ApplicationRegistrationVariableService);

//# sourceMappingURL=application-registration-variable.service.js.map