"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "KeyValuePairService", {
    enumerable: true,
    get: function() {
        return KeyValuePairService;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _keyvaluepairentity = require("./key-value-pair.entity");
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
let KeyValuePairService = class KeyValuePairService {
    async get({ userId, workspaceId, type, key }) {
        const keyValuePairs = await this.keyValuePairRepository.find({
            where: {
                ...userId === undefined ? {} : userId === null ? {
                    userId: (0, _typeorm1.IsNull)()
                } : {
                    userId
                },
                ...workspaceId === undefined ? {} : workspaceId === null ? {
                    workspaceId: (0, _typeorm1.IsNull)()
                } : {
                    workspaceId
                },
                ...key === undefined ? {} : {
                    key
                },
                type
            }
        });
        return keyValuePairs.map((keyValuePair)=>({
                ...keyValuePair,
                value: keyValuePair.value ?? keyValuePair.textValueDeprecated
            }));
    }
    async set({ userId, workspaceId, key, value, type }, queryRunner) {
        const normalizedUserId = userId ?? null;
        const normalizedWorkspaceId = workspaceId ?? null;
        const hasNullUserAndWorkspace = normalizedUserId === null && normalizedWorkspaceId === null;
        const keyValuePairRepository = queryRunner ? queryRunner.manager.getRepository(_keyvaluepairentity.KeyValuePairEntity) : this.keyValuePairRepository;
        const upsertData = {
            userId: normalizedUserId,
            workspaceId: normalizedWorkspaceId,
            key,
            value,
            type
        };
        const conflictPaths = [
            'key'
        ];
        let indexPredicate;
        if (hasNullUserAndWorkspace) {
            indexPredicate = '"userId" IS NULL AND "workspaceId" IS NULL';
        } else if (normalizedUserId === null) {
            conflictPaths.push('workspaceId');
            indexPredicate = '"userId" IS NULL';
        } else if (normalizedWorkspaceId === null) {
            conflictPaths.push('userId');
            indexPredicate = '"workspaceId" IS NULL';
        } else {
            conflictPaths.push('userId', 'workspaceId');
        }
        await keyValuePairRepository.upsert(upsertData, {
            conflictPaths,
            indexPredicate
        });
    }
    async delete({ userId, workspaceId, type, key }, queryRunner) {
        const deleteConditions = {
            ...userId === undefined ? {} : userId === null ? {
                userId: (0, _typeorm1.IsNull)()
            } : {
                userId
            },
            ...workspaceId === undefined ? {} : workspaceId === null ? {
                workspaceId: (0, _typeorm1.IsNull)()
            } : {
                workspaceId
            },
            type,
            key
        };
        if (queryRunner) {
            await queryRunner.manager.getRepository(_keyvaluepairentity.KeyValuePairEntity).delete(deleteConditions);
        } else {
            await this.keyValuePairRepository.delete(deleteConditions);
        }
    }
    constructor(keyValuePairRepository){
        this.keyValuePairRepository = keyValuePairRepository;
    }
};
KeyValuePairService = _ts_decorate([
    _ts_param(0, (0, _typeorm.InjectRepository)(_keyvaluepairentity.KeyValuePairEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], KeyValuePairService);

//# sourceMappingURL=key-value-pair.service.js.map