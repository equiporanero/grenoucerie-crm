"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get SkillException () {
        return SkillException;
    },
    get SkillExceptionCode () {
        return SkillExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var SkillExceptionCode = /*#__PURE__*/ function(SkillExceptionCode) {
    SkillExceptionCode["SKILL_NOT_FOUND"] = "SKILL_NOT_FOUND";
    SkillExceptionCode["SKILL_ALREADY_EXISTS"] = "SKILL_ALREADY_EXISTS";
    SkillExceptionCode["SKILL_IS_STANDARD"] = "SKILL_IS_STANDARD";
    SkillExceptionCode["INVALID_SKILL_INPUT"] = "INVALID_SKILL_INPUT";
    return SkillExceptionCode;
}({});
const getSkillExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "SKILL_NOT_FOUND":
            return /*i18n*/ {
                id: "68ze54",
                message: "Skill not found."
            };
        case "SKILL_ALREADY_EXISTS":
            return /*i18n*/ {
                id: "jX0IPx",
                message: "A skill with this name already exists."
            };
        case "SKILL_IS_STANDARD":
            return /*i18n*/ {
                id: "H8j7uw",
                message: "Standard skills cannot be modified."
            };
        case "INVALID_SKILL_INPUT":
            return /*i18n*/ {
                id: "TulNnA",
                message: "Invalid skill input."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let SkillException = class SkillException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getSkillExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=skill.exception.js.map