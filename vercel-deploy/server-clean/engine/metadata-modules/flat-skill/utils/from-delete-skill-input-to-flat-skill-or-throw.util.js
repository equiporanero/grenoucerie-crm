"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteSkillInputToFlatSkillOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteSkillInputToFlatSkillOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _skillexception = require("../../skill/skill.exception");
const fromDeleteSkillInputToFlatSkillOrThrow = ({ flatSkillMaps, skillId })=>{
    const existingFlatSkill = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: skillId,
        flatEntityMaps: flatSkillMaps
    });
    if (!(0, _utils.isDefined)(existingFlatSkill)) {
        throw new _skillexception.SkillException('Skill not found', _skillexception.SkillExceptionCode.SKILL_NOT_FOUND);
    }
    if (!existingFlatSkill.isCustom) {
        throw new _skillexception.SkillException('Cannot delete standard skill', _skillexception.SkillExceptionCode.SKILL_IS_STANDARD);
    }
    return existingFlatSkill;
};

//# sourceMappingURL=from-delete-skill-input-to-flat-skill-or-throw.util.js.map