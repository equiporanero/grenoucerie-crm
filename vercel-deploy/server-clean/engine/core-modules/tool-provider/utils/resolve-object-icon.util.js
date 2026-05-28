"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveObjectIcon", {
    enumerable: true,
    get: function() {
        return resolveObjectIcon;
    }
});
const resolveObjectIcon = async (flatEntityMapsCacheService, workspaceId, nameSingular)=>{
    const { flatObjectMetadataMaps } = await flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
        workspaceId,
        flatMapsKeys: [
            'flatObjectMetadataMaps'
        ]
    });
    const flatObject = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).find((obj)=>obj?.nameSingular === nameSingular);
    return flatObject?.icon ?? undefined;
};

//# sourceMappingURL=resolve-object-icon.util.js.map