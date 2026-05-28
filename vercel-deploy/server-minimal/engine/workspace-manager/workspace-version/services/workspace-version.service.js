"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceVersionService", {
    enumerable: true,
    get: function() {
        return WorkspaceVersionService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
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
let WorkspaceVersionService = class WorkspaceVersionService {
    async hasActiveOrSuspendedWorkspaces() {
        return this.workspaceRepository.exists({
            where: {
                activationStatus: (0, _typeorm1.In)([
                    _workspace.WorkspaceActivationStatus.ACTIVE,
                    _workspace.WorkspaceActivationStatus.SUSPENDED
                ])
            }
        });
    }
    async getActiveOrSuspendedWorkspaceIds({ startFromWorkspaceId, workspaceCountLimit, queryRunner } = {}) {
        const repository = queryRunner ? queryRunner.manager.getRepository(_workspaceentity.WorkspaceEntity) : this.workspaceRepository;
        const workspaces = await repository.find({
            select: [
                'id'
            ],
            where: {
                activationStatus: (0, _typeorm1.In)([
                    _workspace.WorkspaceActivationStatus.ACTIVE,
                    _workspace.WorkspaceActivationStatus.SUSPENDED
                ]),
                ...startFromWorkspaceId ? {
                    id: (0, _typeorm1.MoreThanOrEqual)(startFromWorkspaceId)
                } : {}
            },
            order: {
                id: 'ASC'
            },
            take: workspaceCountLimit
        });
        return workspaces.map((workspace)=>workspace.id);
    }
    constructor(workspaceRepository){
        this.workspaceRepository = workspaceRepository;
    }
};
WorkspaceVersionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceVersionService);

//# sourceMappingURL=workspace-version.service.js.map