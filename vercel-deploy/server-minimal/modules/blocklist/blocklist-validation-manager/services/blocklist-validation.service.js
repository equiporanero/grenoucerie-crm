"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlocklistValidationService", {
    enumerable: true,
    get: function() {
        return BlocklistValidationService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _zod = require("zod");
const _commonqueryrunnerexception = require("../../../../engine/api/common/common-query-runners/errors/common-query-runner.exception");
const _objectmetadatarepositorydecorator = require("../../../../engine/object-metadata-repository/object-metadata-repository.decorator");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _isdomain = require("../../../../engine/utils/is-domain");
const _blocklistrepository = require("../../repositories/blocklist.repository");
const _blocklistworkspaceentity = require("../../standard-objects/blocklist.workspace-entity");
const _workspacememberworkspaceentity = require("../../../workspace-member/standard-objects/workspace-member.workspace-entity");
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
let BlocklistValidationService = class BlocklistValidationService {
    async validateBlocklistForCreateMany(payload, userId, workspaceId) {
        await this.validateSchema(payload.data);
        await this.validateUniquenessForCreateMany(payload, userId, workspaceId);
    }
    async validateBlocklistForUpdateOne(payload, userId, workspaceId) {
        if (payload.data.handle) {
            await this.validateSchema([
                payload.data
            ]);
        }
        await this.validateUniquenessForUpdateOne(payload, userId, workspaceId);
    }
    async validateSchema(blocklist) {
        const emailOrDomainSchema = _zod.z.string().trim().pipe(_zod.z.email({
            error: 'Invalid email or domain'
        })).or(_zod.z.string().refine((value)=>value.startsWith('@') && (0, _isdomain.isDomain)(value.slice(1)), 'Invalid email or domain'));
        for (const handle of blocklist.map((item)=>item.handle)){
            if (!handle) {
                throw new _commonqueryrunnerexception.CommonQueryRunnerException('Blocklist handle is required', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.BAD_REQUEST, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "Hbe5jq",
                        message: "Blocklist handle is required."
                    }
                });
            }
            const result = emailOrDomainSchema.safeParse(handle);
            if (!result.success) {
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(result.error.issues[0].message, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.BAD_REQUEST, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "Lq9KTr",
                        message: "Invalid email or domain."
                    }
                });
            }
        }
    }
    async validateUniquenessForCreateMany(payload, userId, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const currentWorkspaceMember = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _workspacememberworkspaceentity.WorkspaceMemberWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            return workspaceMemberRepository.findOneByOrFail({
                userId
            });
        }, authContext);
        if (payload.data.some((item)=>(0, _utils.isDefined)(item.workspaceMemberId) && item.workspaceMemberId !== currentWorkspaceMember.id)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Cannot create blocklist entry for another workspace member', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.BAD_REQUEST, {
                userFriendlyMessage: /*i18n*/ {
                    id: "6Sk/wo",
                    message: "Cannot create blocklist entry for another workspace member."
                }
            });
        }
        const currentBlocklist = await this.blocklistRepository.getByWorkspaceMemberId(currentWorkspaceMember.id, workspaceId);
        const currentBlocklistHandles = currentBlocklist.map((blocklist)=>blocklist.handle);
        if (payload.data.some((item)=>currentBlocklistHandles.includes(item.handle))) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Blocklist handle already exists', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.BAD_REQUEST, {
                userFriendlyMessage: /*i18n*/ {
                    id: "0j1d4L",
                    message: "Blocklist handle already exists."
                }
            });
        }
    }
    async validateUniquenessForUpdateOne(payload, userId, workspaceId) {
        const existingRecord = await this.blocklistRepository.getById(payload.id, workspaceId);
        if (!existingRecord) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Blocklist item not found', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.RECORD_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "xYLtTf",
                    message: "Blocklist item not found."
                }
            });
        }
        if (existingRecord.workspaceMemberId !== payload.data.workspaceMemberId) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Workspace member cannot be updated', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.BAD_REQUEST, {
                userFriendlyMessage: /*i18n*/ {
                    id: "SWTQfb",
                    message: "Workspace member cannot be updated."
                }
            });
        }
        if (existingRecord.handle === payload.data.handle) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const currentWorkspaceMember = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _workspacememberworkspaceentity.WorkspaceMemberWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            return workspaceMemberRepository.findOneByOrFail({
                userId
            });
        }, authContext);
        const currentBlocklist = await this.blocklistRepository.getByWorkspaceMemberId(currentWorkspaceMember.id, workspaceId);
        const currentBlocklistHandles = currentBlocklist.filter((blocklist)=>blocklist.id !== payload.id).map((blocklist)=>blocklist.handle);
        if (currentBlocklistHandles.includes(payload.data.handle)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Blocklist handle already exists', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.BAD_REQUEST, {
                userFriendlyMessage: /*i18n*/ {
                    id: "0j1d4L",
                    message: "Blocklist handle already exists."
                }
            });
        }
    }
    constructor(blocklistRepository, globalWorkspaceOrmManager){
        this.blocklistRepository = blocklistRepository;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
BlocklistValidationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _objectmetadatarepositorydecorator.InjectObjectMetadataRepository)(_blocklistworkspaceentity.BlocklistWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _blocklistrepository.BlocklistRepository === "undefined" ? Object : _blocklistrepository.BlocklistRepository,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], BlocklistValidationService);

//# sourceMappingURL=blocklist-validation.service.js.map