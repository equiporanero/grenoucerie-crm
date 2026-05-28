"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseWorkspaceIdFromAwsSesResourceArn", {
    enumerable: true,
    get: function() {
        return parseWorkspaceIdFromAwsSesResourceArn;
    }
});
const _awssesresourcenameprefixconstant = require("../../emailing-domain/drivers/aws-ses/constants/aws-ses-resource-name-prefix.constant");
const _utils = require("twenty-shared/utils");
const parseWorkspaceIdFromAwsSesResourceArn = (resourceArn)=>{
    const slashIndex = resourceArn.indexOf('/');
    if (slashIndex === -1) {
        return null;
    }
    const afterPrefix = resourceArn.slice(slashIndex + 1);
    const resourceName = afterPrefix.split('/')[0];
    if (!(0, _utils.isDefined)(resourceName)) {
        return null;
    }
    const expectedPrefix = `${_awssesresourcenameprefixconstant.AWS_SES_RESOURCE_NAME_PREFIX}-`;
    if (!resourceName.startsWith(expectedPrefix)) {
        return null;
    }
    const workspaceId = resourceName.slice(expectedPrefix.length);
    return workspaceId.length > 0 ? workspaceId : null;
};

//# sourceMappingURL=parse-workspace-id-from-aws-ses-resource-arn.util.js.map