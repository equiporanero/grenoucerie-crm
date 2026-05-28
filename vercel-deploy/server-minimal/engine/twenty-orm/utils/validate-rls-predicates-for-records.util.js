/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRLSPredicatesForRecords", {
    enumerable: true,
    get: function() {
        return validateRLSPredicatesForRecords;
    }
});
const _isuserauthcontextguard = require("../../core-modules/auth/guards/is-user-auth-context.guard");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const _buildrowlevelpermissionrecordfilterutil = require("./build-row-level-permission-record-filter.util");
const _isrecordmatchingrlsrowlevelpermissionpredicateutil = require("./is-record-matching-rls-row-level-permission-predicate.util");
const validateRLSPredicatesForRecords = ({ records, objectMetadata, internalContext, authContext, shouldBypassPermissionChecks, errorMessage = 'Record does not satisfy row-level security constraints of your current role' })=>{
    if (shouldBypassPermissionChecks) {
        return;
    }
    const userWorkspaceId = (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.userWorkspaceId : undefined;
    const roleId = userWorkspaceId ? internalContext.userWorkspaceRoleMap[userWorkspaceId] : undefined;
    if (!roleId) {
        return;
    }
    const recordFilter = (0, _buildrowlevelpermissionrecordfilterutil.buildRowLevelPermissionRecordFilter)({
        flatRowLevelPermissionPredicateMaps: internalContext.flatRowLevelPermissionPredicateMaps,
        flatRowLevelPermissionPredicateGroupMaps: internalContext.flatRowLevelPermissionPredicateGroupMaps,
        flatFieldMetadataMaps: internalContext.flatFieldMetadataMaps,
        objectMetadata,
        roleId,
        workspaceMember: (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.workspaceMember : undefined
    });
    if (!recordFilter || Object.keys(recordFilter).length === 0) {
        return;
    }
    for (const record of records){
        const matchesRLS = (0, _isrecordmatchingrlsrowlevelpermissionpredicateutil.isRecordMatchingRLSRowLevelPermissionPredicate)({
            record: record,
            filter: recordFilter,
            flatObjectMetadata: objectMetadata,
            flatFieldMetadataMaps: internalContext.flatFieldMetadataMaps
        });
        if (!matchesRLS) {
            throw new _twentyormexception.TwentyORMException(errorMessage, _twentyormexception.TwentyORMExceptionCode.RLS_VALIDATION_FAILED);
        }
    }
};

//# sourceMappingURL=validate-rls-predicates-for-records.util.js.map