"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseCorePath", {
    enumerable: true,
    get: function() {
        return parseCorePath;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const parseCorePath = (request)=>{
    const queryAction = request.path.replace('/rest/', '').replace('/rest', '').split('/').filter(Boolean);
    if (queryAction.length > 2 || queryAction.length > 3 && queryAction[0] === 'restore') {
        throw new _common.BadRequestException(`Query path '${request.path}' invalid. Valid examples: /rest/companies/id or /rest/companies or /rest/batch/companies`);
    }
    if (queryAction.length === 0) {
        throw new _common.BadRequestException(`Query path '${request.path}' invalid. Valid examples: /rest/companies/id or /rest/companies or /rest/batch/companies`);
    }
    if (queryAction.length === 1) {
        return {
            object: queryAction[0]
        };
    }
    if (queryAction[0] === 'batch') {
        return {
            object: queryAction[1]
        };
    }
    if (queryAction[1] === 'duplicates' || queryAction[1] === 'groupBy' || queryAction[1] === 'merge') {
        return {
            object: queryAction[0]
        };
    }
    if (queryAction[0] === 'restore') {
        const recordId = queryAction[2];
        if ((0, _utils.isDefined)(recordId) && !(0, _utils.isValidUuid)(recordId)) {
            throw new _common.BadRequestException(`'${recordId}' is not a valid UUID`);
        }
        return {
            object: queryAction[1],
            id: recordId
        };
    }
    const recordId = queryAction[1];
    if (!(0, _utils.isValidUuid)(recordId)) {
        throw new _common.BadRequestException(`'${recordId}' is not a valid UUID`);
    }
    return {
        object: queryAction[0],
        id: recordId
    };
};

//# sourceMappingURL=parse-core-path.utils.js.map