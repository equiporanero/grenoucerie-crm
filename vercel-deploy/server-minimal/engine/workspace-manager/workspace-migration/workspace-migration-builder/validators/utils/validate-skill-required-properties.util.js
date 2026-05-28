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
    get validateSkillContentIsDefined () {
        return validateSkillContentIsDefined;
    },
    get validateSkillLabelIsDefined () {
        return validateSkillLabelIsDefined;
    },
    get validateSkillRequiredProperties () {
        return validateSkillRequiredProperties;
    }
});
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _skillexception = require("../../../../../metadata-modules/skill/skill.exception");
const validateSkillLabelIsDefined = ({ flatSkill })=>{
    if ((0, _guards.isNonEmptyString)(flatSkill.label)) {
        return [];
    }
    return [
        {
            code: _skillexception.SkillExceptionCode.INVALID_SKILL_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "6sFS+I",
                message: "Label cannot be empty"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "6sFS+I",
                message: "Label cannot be empty"
            }
        }
    ];
};
const validateSkillContentIsDefined = ({ flatSkill })=>{
    if ((0, _guards.isNonEmptyString)(flatSkill.content)) {
        return [];
    }
    return [
        {
            code: _skillexception.SkillExceptionCode.INVALID_SKILL_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "rx63gq",
                message: "Content cannot be empty"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "rx63gq",
                message: "Content cannot be empty"
            }
        }
    ];
};
const validateSkillRequiredProperties = ({ flatSkill })=>[
        ...validateSkillLabelIsDefined({
            flatSkill
        }),
        ...validateSkillContentIsDefined({
            flatSkill
        })
    ];

//# sourceMappingURL=validate-skill-required-properties.util.js.map