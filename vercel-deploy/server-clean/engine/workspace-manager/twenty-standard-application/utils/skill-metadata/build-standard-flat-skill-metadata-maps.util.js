"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatSkillMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatSkillMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _createstandardflatskillmetadatautil = require("./create-standard-flat-skill-metadata.util");
const buildStandardFlatSkillMetadataMaps = (args)=>{
    const allSkillMetadatas = Object.values(_createstandardflatskillmetadatautil.STANDARD_FLAT_SKILL_METADATA_BUILDERS_BY_SKILL_NAME).map((builder)=>builder(args));
    let flatSkillMetadataMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const skillMetadata of allSkillMetadatas){
        flatSkillMetadataMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: skillMetadata,
            flatEntityMaps: flatSkillMetadataMaps
        });
    }
    return flatSkillMetadataMaps;
};

//# sourceMappingURL=build-standard-flat-skill-metadata-maps.util.js.map