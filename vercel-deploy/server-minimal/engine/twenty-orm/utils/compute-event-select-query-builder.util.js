"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeEventSelectQueryBuilder", {
    enumerable: true,
    get: function() {
        return computeEventSelectQueryBuilder;
    }
});
const _workspaceselectquerybuilder = require("../repository/workspace-select-query-builder");
const computeEventSelectQueryBuilder = ({ queryBuilder, authContext, featureFlagMap, internalContext, expressionMap, objectRecordsPermissions })=>{
    const eventSelectQueryBuilder = new _workspaceselectquerybuilder.WorkspaceSelectQueryBuilder(queryBuilder, objectRecordsPermissions, internalContext, true, authContext, featureFlagMap);
    eventSelectQueryBuilder.expressionMap.wheres = expressionMap.wheres;
    eventSelectQueryBuilder.expressionMap.aliases = expressionMap.aliases;
    eventSelectQueryBuilder.setParameters(expressionMap.parameters);
    if (eventSelectQueryBuilder.expressionMap.selects.length === 0 && eventSelectQueryBuilder.expressionMap.mainAlias) {
        eventSelectQueryBuilder.expressionMap.selects = [
            {
                selection: eventSelectQueryBuilder.expressionMap.mainAlias.name
            }
        ];
    }
    return eventSelectQueryBuilder;
};

//# sourceMappingURL=compute-event-select-query-builder.util.js.map