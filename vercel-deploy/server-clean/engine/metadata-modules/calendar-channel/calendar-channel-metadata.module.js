"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarChannelMetadataModule", {
    enumerable: true,
    get: function() {
        return CalendarChannelMetadataModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _calendarchannelmetadataservice = require("./calendar-channel-metadata.service");
const _calendarchannelentity = require("./entities/calendar-channel.entity");
const _calendarchannelgraphqlapiexceptioninterceptor = require("./interceptors/calendar-channel-graphql-api-exception.interceptor");
const _calendarchannelresolver = require("./resolvers/calendar-channel.resolver");
const _connectedaccountmetadatamodule = require("../connected-account/connected-account-metadata.module");
const _permissionsmodule = require("../permissions/permissions.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CalendarChannelMetadataModule = class CalendarChannelMetadataModule {
};
CalendarChannelMetadataModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _calendarchannelentity.CalendarChannelEntity
            ]),
            _permissionsmodule.PermissionsModule,
            _featureflagmodule.FeatureFlagModule,
            _connectedaccountmetadatamodule.ConnectedAccountMetadataModule
        ],
        providers: [
            _calendarchannelmetadataservice.CalendarChannelMetadataService,
            _calendarchannelresolver.CalendarChannelResolver,
            _calendarchannelgraphqlapiexceptioninterceptor.CalendarChannelGraphqlApiExceptionInterceptor
        ],
        exports: [
            _calendarchannelmetadataservice.CalendarChannelMetadataService
        ]
    })
], CalendarChannelMetadataModule);

//# sourceMappingURL=calendar-channel-metadata.module.js.map