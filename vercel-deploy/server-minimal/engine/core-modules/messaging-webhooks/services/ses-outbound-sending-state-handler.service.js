"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SesOutboundSendingStateHandlerService", {
    enumerable: true,
    get: function() {
        return SesOutboundSendingStateHandlerService;
    }
});
const _common = require("@nestjs/common");
const _emailingdomaintenantstatustype = require("../../emailing-domain/drivers/types/emailing-domain-tenant-status.type");
const _emailingdomaintenantstatusservice = require("../../emailing-domain/services/emailing-domain-tenant-status.service");
const _parseworkspaceidfromawssesresourcearnutil = require("../utils/parse-workspace-id-from-aws-ses-resource-arn.util");
const _utils = require("twenty-shared/utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SesOutboundSendingStateHandlerService = class SesOutboundSendingStateHandlerService {
    async handle(event) {
        const targetStatus = event['detail-type'] === 'Sending Status Enabled' ? _emailingdomaintenantstatustype.EmailingDomainTenantStatus.ACTIVE : _emailingdomaintenantstatustype.EmailingDomainTenantStatus.PAUSED;
        const workspaceId = this.resolveWorkspaceIdFromResources(event.resources);
        if (!(0, _utils.isDefined)(workspaceId)) {
            this.logger.warn(`Could not resolve workspaceId from SES sending-state event resources: ${JSON.stringify(event.resources)}`);
            return;
        }
        await this.emailingDomainTenantStatusService.setTenantStatusForWorkspace(workspaceId, targetStatus);
    }
    resolveWorkspaceIdFromResources(resources) {
        if (!(0, _utils.isNonEmptyArray)(resources)) {
            return null;
        }
        for (const resourceArn of resources){
            const workspaceId = (0, _parseworkspaceidfromawssesresourcearnutil.parseWorkspaceIdFromAwsSesResourceArn)(resourceArn);
            if ((0, _utils.isDefined)(workspaceId)) {
                return workspaceId;
            }
        }
        return null;
    }
    constructor(emailingDomainTenantStatusService){
        this.emailingDomainTenantStatusService = emailingDomainTenantStatusService;
        this.logger = new _common.Logger(SesOutboundSendingStateHandlerService.name);
    }
};
SesOutboundSendingStateHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _emailingdomaintenantstatusservice.EmailingDomainTenantStatusService === "undefined" ? Object : _emailingdomaintenantstatusservice.EmailingDomainTenantStatusService
    ])
], SesOutboundSendingStateHandlerService);

//# sourceMappingURL=ses-outbound-sending-state-handler.service.js.map