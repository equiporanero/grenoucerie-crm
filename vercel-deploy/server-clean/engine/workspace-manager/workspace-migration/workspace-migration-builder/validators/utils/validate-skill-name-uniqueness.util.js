"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateSkillNameUniqueness", {
    enumerable: true,
    get: function() {
        return validateSkillNameUniqueness;
    }
});
const _core = require("@lingui/core");
const _skillexception = require("../../../../../metadata-modules/skill/skill.exception");
const validateSkillNameUniqueness = ({ name, existingFlatSkills })=>{
    const errors = [];
    if (existingFlatSkills.some((skill)=>skill.name === name)) {
        errors.push({
            code: _skillexception.SkillExceptionCode.SKILL_ALREADY_EXISTS,
            message: _core.i18n._(/*i18n*/ {
                id: "e6udqn",
                message: 'Skill with name "{name}" already exists',
                values: {
                    name: name
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "HijTmf",
                message: "A skill with this name already exists"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-skill-name-uniqueness.util.js.map