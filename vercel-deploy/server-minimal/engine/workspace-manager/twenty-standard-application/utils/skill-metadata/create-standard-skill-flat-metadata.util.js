"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardSkillFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardSkillFlatMetadata;
    }
});
const _uuid = require("uuid");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const _standardskillconstant = require("../../constants/standard-skill.constant");
const createStandardSkillFlatMetadata = ({ context: { skillName, name, label, icon, description, content, isCustom }, workspaceId, twentyStandardApplicationId, now })=>{
    const universalIdentifier = _standardskillconstant.STANDARD_SKILL[skillName].universalIdentifier;
    return {
        id: (0, _uuid.v4)(),
        universalIdentifier,
        name,
        label,
        icon,
        description,
        content,
        isCustom,
        isActive: true,
        workspaceId,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=create-standard-skill-flat-metadata.util.js.map