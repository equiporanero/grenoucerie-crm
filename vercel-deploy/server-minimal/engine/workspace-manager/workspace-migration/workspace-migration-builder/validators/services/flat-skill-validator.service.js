"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatSkillValidatorService", {
    enumerable: true,
    get: function() {
        return FlatSkillValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _skillexception = require("../../../../../metadata-modules/skill/skill.exception");
const _belongstotwentystandardapputil = require("../../../../../metadata-modules/utils/belongs-to-twenty-standard-app.util");
const _iscallertwentystandardapputil = require("../../../../../metadata-modules/utils/is-caller-twenty-standard-app.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
const _validateskillnameuniquenessutil = require("../utils/validate-skill-name-uniqueness.util");
const _validateskillrequiredpropertiesutil = require("../utils/validate-skill-required-properties.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatSkillValidatorService = class FlatSkillValidatorService {
    validateFlatSkillCreation({ flatEntityToValidate: flatSkill, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatSkillMaps: optimisticFlatSkillMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatSkill.universalIdentifier,
                name: flatSkill.name
            },
            metadataName: 'skill',
            type: 'create'
        });
        const existingSkills = Object.values(optimisticFlatSkillMaps.byUniversalIdentifier).filter(_utils.isDefined);
        validationResult.errors.push(...(0, _validateskillrequiredpropertiesutil.validateSkillRequiredProperties)({
            flatSkill
        }));
        validationResult.errors.push(...(0, _validateskillnameuniquenessutil.validateSkillNameUniqueness)({
            name: flatSkill.name,
            existingFlatSkills: existingSkills
        }));
        return validationResult;
    }
    validateFlatSkillDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatSkillMaps: optimisticFlatSkillMaps }, buildOptions }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier,
                name: flatEntityToValidate.name
            },
            metadataName: 'skill',
            type: 'delete'
        });
        const existingSkill = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatSkillMaps
        });
        if (!(0, _utils.isDefined)(existingSkill)) {
            validationResult.errors.push({
                code: _skillexception.SkillExceptionCode.SKILL_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "OhD7+a",
                    message: "Skill not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "OhD7+a",
                    message: "Skill not found"
                }
            });
            return validationResult;
        }
        if (!(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions) && (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)({
            universalIdentifier: existingSkill.universalIdentifier,
            applicationUniversalIdentifier: existingSkill.applicationUniversalIdentifier
        })) {
            validationResult.errors.push({
                code: _skillexception.SkillExceptionCode.SKILL_IS_STANDARD,
                message: _core.i18n._(/*i18n*/ {
                    id: "EN2+6i",
                    message: "Cannot delete standard skill"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "EN2+6i",
                    message: "Cannot delete standard skill"
                }
            });
        }
        return validationResult;
    }
    validateFlatSkillUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatSkillMaps: optimisticFlatSkillMaps }, buildOptions }) {
        const fromFlatSkill = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatSkillMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'skill',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatSkill)) {
            validationResult.errors.push({
                code: _skillexception.SkillExceptionCode.SKILL_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "OhD7+a",
                    message: "Skill not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "OhD7+a",
                    message: "Skill not found"
                }
            });
            return validationResult;
        }
        const isActiveUpdate = flatEntityUpdate.isActive;
        const hasNonIsActiveUpdates = Object.keys(flatEntityUpdate).some((key)=>key !== 'isActive');
        const isTwentyStandardSkill = (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)({
            universalIdentifier: fromFlatSkill.universalIdentifier,
            applicationUniversalIdentifier: fromFlatSkill.applicationUniversalIdentifier
        });
        if (!(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions) && isTwentyStandardSkill && hasNonIsActiveUpdates) {
            validationResult.errors.push({
                code: _skillexception.SkillExceptionCode.SKILL_IS_STANDARD,
                message: _core.i18n._(/*i18n*/ {
                    id: "I2EmgT",
                    message: "Cannot update standard skill properties (only activation/deactivation allowed)"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "I2EmgT",
                    message: "Cannot update standard skill properties (only activation/deactivation allowed)"
                }
            });
        }
        // If only isActive is being updated on a standard skill, allow it
        if (isTwentyStandardSkill && (0, _utils.isDefined)(isActiveUpdate) && !hasNonIsActiveUpdates) {
            return validationResult;
        }
        const optimisticFlatSkill = {
            ...fromFlatSkill,
            ...flatEntityUpdate
        };
        const labelUpdate = flatEntityUpdate.label;
        if ((0, _utils.isDefined)(labelUpdate)) {
            validationResult.errors.push(...(0, _validateskillrequiredpropertiesutil.validateSkillLabelIsDefined)({
                flatSkill: optimisticFlatSkill
            }));
        }
        const contentUpdate = flatEntityUpdate.content;
        if ((0, _utils.isDefined)(contentUpdate)) {
            validationResult.errors.push(...(0, _validateskillrequiredpropertiesutil.validateSkillContentIsDefined)({
                flatSkill: optimisticFlatSkill
            }));
        }
        const nameUpdate = flatEntityUpdate.name;
        if ((0, _utils.isDefined)(nameUpdate)) {
            const existingSkills = Object.values(optimisticFlatSkillMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((skill)=>skill.universalIdentifier !== universalIdentifier);
            validationResult.errors.push(...(0, _validateskillnameuniquenessutil.validateSkillNameUniqueness)({
                name: nameUpdate,
                existingFlatSkills: existingSkills
            }));
        }
        return validationResult;
    }
};
FlatSkillValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatSkillValidatorService);

//# sourceMappingURL=flat-skill-validator.service.js.map