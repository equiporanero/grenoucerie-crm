"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseFilterRestRequest", {
    enumerable: true,
    get: function() {
        return parseFilterRestRequest;
    }
});
const _adddefaultconjunctionutil = require("./add-default-conjunction.util");
const _checkfilterqueryutil = require("./check-filter-query.util");
const _parsefilterutil = require("./parse-filter.util");
const parseFilterRestRequest = (request)=>{
    let filterQuery = request.query.filter;
    if (typeof filterQuery !== 'string') {
        return {};
    }
    (0, _checkfilterqueryutil.checkFilterQuery)(filterQuery);
    filterQuery = (0, _adddefaultconjunctionutil.addDefaultConjunctionIfMissing)(filterQuery);
    return (0, _parsefilterutil.parseFilter)(filterQuery);
};

//# sourceMappingURL=parse-filter-rest-request.util.js.map