"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateSkillInputToFlatSkillToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateSkillInputToFlatSkillToUpdateOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _flatskilleditablepropertiesconstant = require("../constants/flat-skill-editable-properties.constant");
const _skillexception = require("../../skill/skill.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateSkillInputToFlatSkillToUpdateOrThrow = ({ flatSkillMaps, updateSkillInput })=>{
    const existingFlatSkill = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: updateSkillInput.id,
        flatEntityMaps: flatSkillMaps
    });
    if (!(0, _utils.isDefined)(existingFlatSkill)) {
        throw new _skillexception.SkillException('Skill not found', _skillexception.SkillExceptionCode.SKILL_NOT_FOUND);
    }
    if (!existingFlatSkill.isCustom) {
        throw new _skillexception.SkillException('Cannot update standard skill', _skillexception.SkillExceptionCode.SKILL_IS_STANDARD);
    }
    const { id: _id, ...updates } = updateSkillInput;
    return {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: existingFlatSkill,
            properties: [
                ..._flatskilleditablepropertiesconstant.FLAT_SKILL_EDITABLE_PROPERTIES
            ],
            update: updates
        }),
        updatedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-update-skill-input-to-flat-skill-to-update-or-throw.util.js.map