"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromSkillEntityToFlatSkill", {
    enumerable: true,
    get: function() {
        return fromSkillEntityToFlatSkill;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromSkillEntityToFlatSkill = ({ entity: skillEntity, applicationIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(skillEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${skillEntity.applicationId} not found for skill ${skillEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        createdAt: skillEntity.createdAt.toISOString(),
        updatedAt: skillEntity.updatedAt.toISOString(),
        id: skillEntity.id,
        name: skillEntity.name,
        label: skillEntity.label,
        icon: skillEntity.icon,
        description: skillEntity.description,
        content: skillEntity.content,
        workspaceId: skillEntity.workspaceId,
        isCustom: skillEntity.isCustom,
        isActive: skillEntity.isActive,
        universalIdentifier: skillEntity.universalIdentifier,
        applicationId: skillEntity.applicationId,
        applicationUniversalIdentifier
    };
};

//# sourceMappingURL=from-skill-entity-to-flat-skill.util.js.map