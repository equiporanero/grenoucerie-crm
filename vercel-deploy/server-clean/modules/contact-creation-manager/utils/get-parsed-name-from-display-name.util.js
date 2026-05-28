"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getParsedNameFromDisplayName", {
    enumerable: true,
    get: function() {
        return getParsedNameFromDisplayName;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _getparsednamefromemaillocalpartutil = require("./get-parsed-name-from-email-local-part.util");
const EMPTY_NAME = {
    firstName: '',
    lastName: ''
};
const getParsedNameFromDisplayName = (displayName)=>{
    const cleaned = displayName.trim().replace(/^['"]+|['"]+$/g, '').trim();
    if (!(0, _guards.isNonEmptyString)(cleaned) || cleaned.includes('@')) return EMPTY_NAME;
    const stripTrailingGroupTag = (input)=>input.replace(/:[^:]+$/, '').trim();
    const withGroupTagsStripped = (parsed)=>({
            firstName: stripTrailingGroupTag(parsed.firstName),
            lastName: stripTrailingGroupTag(parsed.lastName)
        });
    const commaMatch = cleaned.match(/^([^,]+),\s*([^,]+)$/);
    if ((0, _utils.isDefined)(commaMatch)) {
        return withGroupTagsStripped({
            firstName: commaMatch[2].trim(),
            lastName: commaMatch[1].trim()
        });
    }
    const [firstToken, ...rest] = cleaned.split(/\s+/);
    const restAsLastName = rest.join(' ');
    const { firstName: head, lastName: dotTail } = (0, _getparsednamefromemaillocalpartutil.getParsedNameFromEmailLocalPart)(firstToken);
    if (!(0, _guards.isNonEmptyString)(dotTail)) {
        return withGroupTagsStripped({
            firstName: head,
            lastName: restAsLastName
        });
    }
    const dotTailAlreadyInLastName = restAsLastName.toLowerCase().startsWith(dotTail.toLowerCase());
    return withGroupTagsStripped({
        firstName: head,
        lastName: dotTailAlreadyInLastName ? restAsLastName : `${dotTail} ${restAsLastName}`.trim()
    });
};

//# sourceMappingURL=get-parsed-name-from-display-name.util.js.map