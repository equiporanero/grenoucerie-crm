"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computePgGraphQLError", {
    enumerable: true,
    get: function() {
        return computePgGraphQLError;
    }
});
const _workspacequeryrunnerexception = require("../workspace-query-runner.exception");
const pgGraphQLCommandMapping = {
    insertInto: 'insert',
    update: 'update',
    deleteFrom: 'delete'
};
const pgGraphQLErrorMapping = {
    'delete impacts too many records': (_, objectName, pgGraphqlConfig)=>new _workspacequeryrunnerexception.WorkspaceQueryRunnerException(`Cannot delete ${objectName} because it impacts too many records (more than ${pgGraphqlConfig?.atMost}).`, _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.TOO_MANY_ROWS_AFFECTED),
    'update impacts too many records': (_, objectName, pgGraphqlConfig)=>new _workspacequeryrunnerexception.WorkspaceQueryRunnerException(`Cannot update ${objectName} because it impacts too many records (more than ${pgGraphqlConfig?.atMost}).`, _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.TOO_MANY_ROWS_AFFECTED),
    'duplicate key value violates unique constraint': (command, objectName, _)=>new _workspacequeryrunnerexception.WorkspaceQueryRunnerException(`Cannot ${// @ts-expect-error legacy noImplicitAny
        pgGraphQLCommandMapping[command] ?? command} ${objectName} because it violates a uniqueness constraint.`, _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.QUERY_VIOLATES_UNIQUE_CONSTRAINT),
    'violates foreign key constraint': (command, objectName, _)=>new _workspacequeryrunnerexception.WorkspaceQueryRunnerException(`Cannot ${// @ts-expect-error legacy noImplicitAny
        pgGraphQLCommandMapping[command] ?? command} ${objectName} because it violates a foreign key constraint.`, _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.QUERY_VIOLATES_FOREIGN_KEY_CONSTRAINT)
};
const computePgGraphQLError = (command, objectName, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
errors, pgGraphqlConfig)=>{
    const error = errors[0];
    const errorMessage = error?.message;
    const mappedErrorKey = Object.keys(pgGraphQLErrorMapping).find((key)=>errorMessage?.includes(key));
    const mappedError = mappedErrorKey ? pgGraphQLErrorMapping[mappedErrorKey] : null;
    if (mappedError) {
        return mappedError(command, objectName, pgGraphqlConfig);
    }
    return new _workspacequeryrunnerexception.WorkspaceQueryRunnerException(`GraphQL errors on ${command}${objectName}: ${JSON.stringify(error)}`, _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.INTERNAL_SERVER_ERROR);
};

//# sourceMappingURL=compute-pg-graphql-error.util.js.map