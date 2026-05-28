"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ToolExecutorService", {
    enumerable: true,
    get: function() {
        return ToolExecutorService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _fromuserentitytoflatutil = require("../../user/utils/from-user-entity-to-flat.util");
const _authexception = require("../../auth/auth.exception");
const _builduserauthcontextutil = require("../../auth/utils/build-user-auth-context.util");
const _logicfunctionexecutorservice = require("../../logic-function/logic-function-executor/logic-function-executor.service");
const _createmanyrecordsservice = require("../../record-crud/services/create-many-records.service");
const _createrecordservice = require("../../record-crud/services/create-record.service");
const _deleterecordservice = require("../../record-crud/services/delete-record.service");
const _findrecordsservice = require("../../record-crud/services/find-records.service");
const _groupbyrecordsservice = require("../../record-crud/services/group-by-records.service");
const _updatemanyrecordsservice = require("../../record-crud/services/update-many-records.service");
const _updaterecordservice = require("../../record-crud/services/update-record.service");
const _toolproviderstoken = require("../constants/tool-providers.token");
const _userentity = require("../../user/user.entity");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
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
let ToolExecutorService = class ToolExecutorService {
    async dispatch(descriptor, args, context) {
        const safeArgs = args ?? {};
        switch(descriptor.executionRef.kind){
            case 'database_crud':
                return this.dispatchDatabaseCrud(descriptor.executionRef, safeArgs, context);
            case 'static':
                return this.dispatchStaticTool(descriptor, safeArgs, context);
            case 'logic_function':
                return this.dispatchLogicFunction(descriptor.executionRef, safeArgs, context);
        }
    }
    async dispatchDatabaseCrud(ref, args, context) {
        const authContext = context.authContext ?? await this.buildAuthContext(context);
        switch(ref.operation){
            case 'find':
                {
                    const { limit, offset, orderBy, ...filter } = args;
                    return this.findRecordsService.execute({
                        objectName: ref.objectNameSingular,
                        filter,
                        orderBy: orderBy,
                        limit: limit,
                        offset: offset,
                        authContext,
                        rolePermissionConfig: context.rolePermissionConfig
                    });
                }
            case 'find_one':
                return this.findRecordsService.execute({
                    objectName: ref.objectNameSingular,
                    filter: {
                        id: {
                            eq: args.id
                        }
                    },
                    limit: 1,
                    authContext,
                    rolePermissionConfig: context.rolePermissionConfig
                });
            case 'create':
                return this.createRecordService.execute({
                    objectName: ref.objectNameSingular,
                    objectRecord: args,
                    authContext,
                    rolePermissionConfig: context.rolePermissionConfig,
                    createdBy: context.actorContext,
                    slimResponse: true
                });
            case 'create_many':
                return this.createManyRecordsService.execute({
                    objectName: ref.objectNameSingular,
                    objectRecords: args.records,
                    authContext,
                    rolePermissionConfig: context.rolePermissionConfig,
                    createdBy: context.actorContext,
                    slimResponse: true
                });
            case 'update':
                {
                    const { id, ...fields } = args;
                    const objectRecord = Object.fromEntries(Object.entries(fields).filter(([, value])=>value !== undefined));
                    return this.updateRecordService.execute({
                        objectName: ref.objectNameSingular,
                        objectRecordId: id,
                        objectRecord,
                        authContext,
                        rolePermissionConfig: context.rolePermissionConfig,
                        slimResponse: true
                    });
                }
            case 'update_many':
                return this.updateManyRecordsService.execute({
                    objectName: ref.objectNameSingular,
                    filter: args.filter,
                    data: args.data,
                    authContext,
                    rolePermissionConfig: context.rolePermissionConfig,
                    slimResponse: true
                });
            case 'delete':
                return this.deleteRecordService.execute({
                    objectName: ref.objectNameSingular,
                    objectRecordId: args.id,
                    authContext,
                    rolePermissionConfig: context.rolePermissionConfig,
                    soft: true
                });
            case 'group_by':
                {
                    const { groupBy, aggregateOperation, aggregateFieldName, limit: groupByLimit, orderBy: groupByOrderBy, ...groupByFilter } = args;
                    return this.groupByRecordsService.execute({
                        objectName: ref.objectNameSingular,
                        groupBy: groupBy,
                        aggregateOperation: aggregateOperation,
                        aggregateFieldName: aggregateFieldName,
                        limit: groupByLimit,
                        orderBy: groupByOrderBy,
                        filter: groupByFilter,
                        authContext,
                        rolePermissionConfig: context.rolePermissionConfig
                    });
                }
        }
    }
    async dispatchStaticTool(descriptor, args, context) {
        if (descriptor.executionRef.kind !== 'static') {
            throw new Error('Expected static executionRef');
        }
        const provider = this.providers.find((candidate)=>candidate.category === descriptor.category);
        if (!provider) {
            throw new Error(`No provider registered for category "${descriptor.category}" (tool: ${descriptor.executionRef.toolId})`);
        }
        // Defense-in-depth: catalog and by-name lookups already filter by
        // `isAvailable`, but re-verify at dispatch so the gate is enforced in
        // one place regardless of how the descriptor reached us.
        if (!await provider.isAvailable(context)) {
            return {
                success: false,
                message: `Tool "${descriptor.name}" is not available`,
                error: `Tool "${descriptor.name}" is not available in this context. Use get_tool_catalog to see available tools.`
            };
        }
        return provider.executeStaticTool(descriptor.executionRef.toolId, args, context);
    }
    async dispatchLogicFunction(ref, args, context) {
        const result = await this.logicFunctionExecutorService.execute({
            logicFunctionId: ref.logicFunctionId,
            workspaceId: context.workspaceId,
            payload: args
        });
        if (result.error) {
            return {
                success: false,
                message: 'Logic function execution failed',
                error: result.error.errorMessage
            };
        }
        return {
            success: true,
            message: 'Logic function executed successfully',
            result: result.data ?? undefined
        };
    }
    // Build authContext on demand for database CRUD operations
    async buildAuthContext(context) {
        if (!(0, _utils.isDefined)(context.userId) || !(0, _utils.isDefined)(context.userWorkspaceId)) {
            throw new _authexception.AuthException('userId and userWorkspaceId are required for database operations', _authexception.AuthExceptionCode.UNAUTHENTICATED);
        }
        const user = await this.userRepository.findOne({
            where: {
                id: context.userId
            }
        });
        if (!(0, _utils.isDefined)(user)) {
            throw new _authexception.AuthException('User not found', _authexception.AuthExceptionCode.UNAUTHENTICATED);
        }
        const { flatWorkspaceMemberMaps } = await this.workspaceCacheService.getOrRecompute(context.workspaceId, [
            'flatWorkspaceMemberMaps'
        ]);
        const workspaceMemberId = flatWorkspaceMemberMaps.idByUserId[user.id];
        const workspaceMember = (0, _utils.isDefined)(workspaceMemberId) ? flatWorkspaceMemberMaps.byId[workspaceMemberId] : undefined;
        if (!(0, _utils.isDefined)(workspaceMemberId) || !(0, _utils.isDefined)(workspaceMember)) {
            throw new _authexception.AuthException('Workspace member not found', _authexception.AuthExceptionCode.UNAUTHENTICATED);
        }
        return (0, _builduserauthcontextutil.buildUserAuthContext)({
            workspace: {
                id: context.workspaceId
            },
            userWorkspaceId: context.userWorkspaceId,
            user: (0, _fromuserentitytoflatutil.fromUserEntityToFlat)(user),
            workspaceMemberId,
            workspaceMember
        });
    }
    constructor(providers, findRecordsService, groupByRecordsService, createRecordService, createManyRecordsService, updateRecordService, updateManyRecordsService, deleteRecordService, logicFunctionExecutorService, workspaceCacheService, userRepository){
        this.providers = providers;
        this.findRecordsService = findRecordsService;
        this.groupByRecordsService = groupByRecordsService;
        this.createRecordService = createRecordService;
        this.createManyRecordsService = createManyRecordsService;
        this.updateRecordService = updateRecordService;
        this.updateManyRecordsService = updateManyRecordsService;
        this.deleteRecordService = deleteRecordService;
        this.logicFunctionExecutorService = logicFunctionExecutorService;
        this.workspaceCacheService = workspaceCacheService;
        this.userRepository = userRepository;
        this.logger = new _common.Logger(ToolExecutorService.name);
    }
};
ToolExecutorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_toolproviderstoken.TOOL_PROVIDERS)),
    _ts_param(10, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        typeof _findrecordsservice.FindRecordsService === "undefined" ? Object : _findrecordsservice.FindRecordsService,
        typeof _groupbyrecordsservice.GroupByRecordsService === "undefined" ? Object : _groupbyrecordsservice.GroupByRecordsService,
        typeof _createrecordservice.CreateRecordService === "undefined" ? Object : _createrecordservice.CreateRecordService,
        typeof _createmanyrecordsservice.CreateManyRecordsService === "undefined" ? Object : _createmanyrecordsservice.CreateManyRecordsService,
        typeof _updaterecordservice.UpdateRecordService === "undefined" ? Object : _updaterecordservice.UpdateRecordService,
        typeof _updatemanyrecordsservice.UpdateManyRecordsService === "undefined" ? Object : _updatemanyrecordsservice.UpdateManyRecordsService,
        typeof _deleterecordservice.DeleteRecordService === "undefined" ? Object : _deleterecordservice.DeleteRecordService,
        typeof _logicfunctionexecutorservice.LogicFunctionExecutorService === "undefined" ? Object : _logicfunctionexecutorservice.LogicFunctionExecutorService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ToolExecutorService);

//# sourceMappingURL=tool-executor.service.js.map