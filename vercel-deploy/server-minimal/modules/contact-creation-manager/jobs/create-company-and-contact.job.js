"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateCompanyAndContactJob", {
    enumerable: true,
    get: function() {
        return CreateCompanyAndContactJob;
    }
});
const _processdecorator = require("../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../engine/core-modules/message-queue/message-queue.constants");
const _createcompanyandcontactservice = require("../services/create-company-and-contact.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateCompanyAndContactJob = class CreateCompanyAndContactJob {
    async handle(data) {
        const { workspaceId, connectedAccount, contactsToCreate, source } = data;
        await this.createCompanyAndPersonService.createCompaniesAndPeopleAndUpdateParticipants(connectedAccount, contactsToCreate.map((contact)=>({
                handle: contact.handle,
                displayName: contact.displayName
            })), workspaceId, source);
    }
    constructor(createCompanyAndPersonService){
        this.createCompanyAndPersonService = createCompanyAndPersonService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CreateCompanyAndContactJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CreateCompanyAndContactJobData === "undefined" ? Object : CreateCompanyAndContactJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], CreateCompanyAndContactJob.prototype, "handle", null);
CreateCompanyAndContactJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.contactCreationQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createcompanyandcontactservice.CreateCompanyAndPersonService === "undefined" ? Object : _createcompanyandcontactservice.CreateCompanyAndPersonService
    ])
], CreateCompanyAndContactJob);

//# sourceMappingURL=create-company-and-contact.job.js.map