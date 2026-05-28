"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatAgentMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatAgentMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _createstandardflatagentmetadatautil = require("./create-standard-flat-agent-metadata.util");
const buildStandardFlatAgentMetadataMaps = (args)=>{
    const allAgentMetadatas = Object.values(_createstandardflatagentmetadatautil.STANDARD_FLAT_AGENT_METADATA_BUILDERS_BY_AGENT_NAME).map((builder)=>builder(args));
    let flatAgentMetadataMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const agentMetadata of allAgentMetadatas){
        flatAgentMetadataMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: agentMetadata,
            flatEntityMaps: flatAgentMetadataMaps
        });
    }
    return flatAgentMetadataMaps;
};

//# sourceMappingURL=build-standard-flat-agent-metadata-maps.util.js.map