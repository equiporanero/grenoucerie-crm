"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildPublicConnectionParameters", {
    enumerable: true,
    get: function() {
        return buildPublicConnectionParameters;
    }
});
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const buildPublicConnectionParameters = (connectionParameters)=>{
    if (!(0, _utils.isDefined)(connectionParameters)) {
        return null;
    }
    return _constants.ACCOUNT_TYPES.reduce((result, protocol)=>{
        const params = connectionParameters[protocol];
        if (!(0, _utils.isDefined)(params)) {
            return result;
        }
        const { password: _, ...publicParams } = params;
        result[protocol] = publicParams;
        return result;
    }, {});
};

//# sourceMappingURL=build-public-connection-parameters.util.js.map