"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonQueryRunners", {
    enumerable: true,
    get: function() {
        return CommonQueryRunners;
    }
});
const _commoncreatemanyqueryrunnerservice = require("./common-create-many-query-runner/common-create-many-query-runner.service");
const _commoncreateonequeryrunnerservice = require("./common-create-one-query-runner.service");
const _commondeletemanyqueryrunnerservice = require("./common-delete-many-query-runner.service");
const _commondeleteonequeryrunnerservice = require("./common-delete-one-query-runner.service");
const _commondestroymanyqueryrunnerservice = require("./common-destroy-many-query-runner.service");
const _commondestroyonequeryrunnerservice = require("./common-destroy-one-query-runner.service");
const _commonfindduplicatesqueryrunnerservice = require("./common-find-duplicates-query-runner.service");
const _commonfindmanyqueryrunnerservice = require("./common-find-many-query-runner.service");
const _commonfindonequeryrunnerservice = require("./common-find-one-query-runner.service");
const _commongroupbyqueryrunnerservice = require("./common-group-by-query-runner.service");
const _commonmergemanyqueryrunnerservice = require("./common-merge-many-query-runner.service");
const _commonrestoremanyqueryrunnerservice = require("./common-restore-many-query-runner.service");
const _commonrestoreonequeryrunnerservice = require("./common-restore-one-query-runner.service");
const _commonupdatemanyqueryrunnerservice = require("./common-update-many-query-runner.service");
const _commonupdateonequeryrunnerservice = require("./common-update-one-query-runner.service");
const CommonQueryRunners = [
    _commoncreateonequeryrunnerservice.CommonCreateOneQueryRunnerService,
    _commoncreatemanyqueryrunnerservice.CommonCreateManyQueryRunnerService,
    _commonfindmanyqueryrunnerservice.CommonFindManyQueryRunnerService,
    _commonfindonequeryrunnerservice.CommonFindOneQueryRunnerService,
    _commongroupbyqueryrunnerservice.CommonGroupByQueryRunnerService,
    _commonupdateonequeryrunnerservice.CommonUpdateOneQueryRunnerService,
    _commonupdatemanyqueryrunnerservice.CommonUpdateManyQueryRunnerService,
    _commondestroymanyqueryrunnerservice.CommonDestroyManyQueryRunnerService,
    _commondestroyonequeryrunnerservice.CommonDestroyOneQueryRunnerService,
    _commondeletemanyqueryrunnerservice.CommonDeleteManyQueryRunnerService,
    _commondeleteonequeryrunnerservice.CommonDeleteOneQueryRunnerService,
    _commonfindduplicatesqueryrunnerservice.CommonFindDuplicatesQueryRunnerService,
    _commonrestoremanyqueryrunnerservice.CommonRestoreManyQueryRunnerService,
    _commonrestoreonequeryrunnerservice.CommonRestoreOneQueryRunnerService,
    _commonmergemanyqueryrunnerservice.CommonMergeManyQueryRunnerService
];

//# sourceMappingURL=common-query-runners.js.map