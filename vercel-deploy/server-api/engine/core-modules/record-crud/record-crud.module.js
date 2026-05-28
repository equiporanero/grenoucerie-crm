"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RecordCrudModule", {
    enumerable: true,
    get: function() {
        return RecordCrudModule;
    }
});
const _common = require("@nestjs/common");
const _corecommonapimodule = require("../../api/common/core-common-api.module");
const _apikeymodule = require("../api-key/api-key.module");
const _commonapicontextbuilderservice = require("./services/common-api-context-builder.service");
const _createmanyrecordsservice = require("./services/create-many-records.service");
const _createrecordservice = require("./services/create-record.service");
const _deleterecordservice = require("./services/delete-record.service");
const _findrecordsservice = require("./services/find-records.service");
const _groupbyrecordsservice = require("./services/group-by-records.service");
const _updatemanyrecordsservice = require("./services/update-many-records.service");
const _updaterecordservice = require("./services/update-record.service");
const _upsertrecordservice = require("./services/upsert-record.service");
const _workspacemanyorallflatentitymapscachemodule = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _userrolemodule = require("../../metadata-modules/user-role/user-role.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RecordCrudModule = class RecordCrudModule {
};
RecordCrudModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _corecommonapimodule.CoreCommonApiModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _userrolemodule.UserRoleModule,
            _apikeymodule.ApiKeyModule
        ],
        providers: [
            _commonapicontextbuilderservice.CommonApiContextBuilderService,
            _createrecordservice.CreateRecordService,
            _createmanyrecordsservice.CreateManyRecordsService,
            _updaterecordservice.UpdateRecordService,
            _updatemanyrecordsservice.UpdateManyRecordsService,
            _deleterecordservice.DeleteRecordService,
            _findrecordsservice.FindRecordsService,
            _groupbyrecordsservice.GroupByRecordsService,
            _upsertrecordservice.UpsertRecordService
        ],
        exports: [
            _createrecordservice.CreateRecordService,
            _createmanyrecordsservice.CreateManyRecordsService,
            _updaterecordservice.UpdateRecordService,
            _updatemanyrecordsservice.UpdateManyRecordsService,
            _deleterecordservice.DeleteRecordService,
            _findrecordsservice.FindRecordsService,
            _groupbyrecordsservice.GroupByRecordsService,
            _upsertrecordservice.UpsertRecordService
        ]
    })
], RecordCrudModule);

//# sourceMappingURL=record-crud.module.js.map