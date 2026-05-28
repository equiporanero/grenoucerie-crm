"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventStreamResolver", {
    enumerable: true,
    get: function() {
        return EventStreamResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../core-modules/graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../core-modules/graphql/pipes/resolver-validation.pipe");
const _workspaceentity = require("../core-modules/workspace/workspace.entity");
const _authapikeydecorator = require("../decorators/auth/auth-api-key.decorator");
const _authuserworkspaceiddecorator = require("../decorators/auth/auth-user-workspace-id.decorator");
const _authuserdecorator = require("../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../guards/no-permission.guard");
const _userauthguard = require("../guards/user-auth.guard");
const _workspaceauthguard = require("../guards/workspace-auth.guard");
const _eventstreamttlconstant = require("./constants/event-stream-ttl.constant");
const _addquerysubscriptioninput = require("./dtos/add-query-subscription.input");
const _eventsubscriptiondto = require("./dtos/event-subscription.dto");
const _removequerysubscriptioninput = require("./dtos/remove-query-subscription.input");
const _eventstreamexceptionfilter = require("./event-stream-exception.filter");
const _eventstreamexception = require("./event-stream.exception");
const _eventstreamservice = require("./event-stream.service");
const _subscriptionservice = require("./subscription.service");
const _getchannelidfromeventstreamid = require("./utils/get-channel-id-from-event-stream-id");
const _wrapasynciteratorwithlifecycle = require("./utils/wrap-async-iterator-with-lifecycle");
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
let EventStreamResolver = class EventStreamResolver {
    async onEventSubscription(eventStreamId, workspace, user, userWorkspaceId, apiKey) {
        const eventStreamChannelId = (0, _getchannelidfromeventstreamid.eventStreamIdToChannelId)(eventStreamId);
        const existingStreamData = await this.eventStreamService.getStreamData(workspace.id, eventStreamChannelId);
        if ((0, _utils.isDefined)(existingStreamData)) {
            const isAuthorized = await this.eventStreamService.isAuthorized({
                streamData: existingStreamData,
                authContext: {
                    userWorkspaceId,
                    apiKeyId: apiKey?.id
                }
            });
            if (!isAuthorized) {
                throw new _eventstreamexception.EventStreamException('Event stream already exists', _eventstreamexception.EventStreamExceptionCode.EVENT_STREAM_ALREADY_EXISTS);
            }
            await this.eventStreamService.destroyEventStream({
                workspaceId: workspace.id,
                eventStreamChannelId
            });
        }
        await this.eventStreamService.createEventStream({
            workspaceId: workspace.id,
            eventStreamChannelId,
            authContext: {
                userId: user?.id,
                userWorkspaceId,
                apiKeyId: apiKey?.id
            }
        });
        let iterator;
        try {
            iterator = await this.subscriptionService.subscribeToEventStream({
                workspaceId: workspace.id,
                eventStreamChannelId
            });
        } catch (error) {
            await this.eventStreamService.destroyEventStream({
                workspaceId: workspace.id,
                eventStreamChannelId
            });
            throw error;
        }
        return (0, _wrapasynciteratorwithlifecycle.wrapAsyncIteratorWithLifecycle)(iterator, {
            initialValue: {
                objectRecordEventsWithQueryIds: [],
                metadataEvents: []
            },
            onHeartbeat: ()=>this.eventStreamService.refreshEventStreamTTL({
                    workspaceId: workspace.id,
                    eventStreamChannelId
                }),
            heartbeatIntervalMs: _eventstreamttlconstant.EVENT_STREAM_TTL_MS / 5,
            onCleanup: ()=>this.eventStreamService.destroyEventStream({
                    workspaceId: workspace.id,
                    eventStreamChannelId
                })
        });
    }
    async addQueryToEventStream(input, workspace, user, userWorkspaceId, apiKey) {
        const eventStreamChannelId = (0, _getchannelidfromeventstreamid.eventStreamIdToChannelId)(input.eventStreamId);
        const streamData = await this.eventStreamService.getStreamData(workspace.id, eventStreamChannelId);
        if (!(0, _utils.isDefined)(streamData)) {
            return false;
        }
        const isAuthorized = await this.eventStreamService.isAuthorized({
            streamData,
            authContext: {
                userWorkspaceId,
                apiKeyId: apiKey?.id
            }
        });
        if (!isAuthorized) {
            throw new _eventstreamexception.EventStreamException('You are not authorized to add a query to this event stream', _eventstreamexception.EventStreamExceptionCode.NOT_AUTHORIZED);
        }
        await this.eventStreamService.addQuery({
            workspaceId: workspace.id,
            eventStreamChannelId,
            queryId: input.queryId,
            operationSignature: input.operationSignature
        });
        return true;
    }
    async removeQueryFromEventStream(input, workspace, user, userWorkspaceId, apiKey) {
        const eventStreamChannelId = (0, _getchannelidfromeventstreamid.eventStreamIdToChannelId)(input.eventStreamId);
        const streamData = await this.eventStreamService.getStreamData(workspace.id, eventStreamChannelId);
        if (!(0, _utils.isDefined)(streamData)) {
            return false;
        }
        const isAuthorized = await this.eventStreamService.isAuthorized({
            streamData,
            authContext: {
                userWorkspaceId,
                apiKeyId: apiKey?.id
            }
        });
        if (!isAuthorized) {
            throw new _eventstreamexception.EventStreamException('You are not authorized to remove a query from this event stream', _eventstreamexception.EventStreamExceptionCode.NOT_AUTHORIZED);
        }
        await this.eventStreamService.removeQuery({
            workspaceId: workspace.id,
            eventStreamChannelId,
            queryId: input.queryId
        });
        return true;
    }
    constructor(subscriptionService, eventStreamService){
        this.subscriptionService = subscriptionService;
        this.eventStreamService = eventStreamService;
    }
};
_ts_decorate([
    (0, _graphql.Subscription)(()=>_eventsubscriptiondto.EventSubscriptionDTO, {
        nullable: true,
        resolve: (payload, variables)=>{
            return {
                eventStreamId: variables.eventStreamId,
                objectRecordEventsWithQueryIds: payload.objectRecordEventsWithQueryIds,
                metadataEvents: payload.metadataEvents
            };
        }
    }),
    _ts_param(0, (0, _graphql.Args)('eventStreamId')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserdecorator.AuthUser)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(4, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], EventStreamResolver.prototype, "onEventSubscription", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserdecorator.AuthUser)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(4, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _addquerysubscriptioninput.AddQuerySubscriptionInput === "undefined" ? Object : _addquerysubscriptioninput.AddQuerySubscriptionInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], EventStreamResolver.prototype, "addQueryToEventStream", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserdecorator.AuthUser)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(4, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _removequerysubscriptioninput.RemoveQueryFromEventStreamInput === "undefined" ? Object : _removequerysubscriptioninput.RemoveQueryFromEventStreamInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], EventStreamResolver.prototype, "removeQueryFromEventStream", null);
EventStreamResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_eventstreamexceptionfilter.EventStreamExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _subscriptionservice.SubscriptionService === "undefined" ? Object : _subscriptionservice.SubscriptionService,
        typeof _eventstreamservice.EventStreamService === "undefined" ? Object : _eventstreamservice.EventStreamService
    ])
], EventStreamResolver);

//# sourceMappingURL=event-stream.resolver.js.map