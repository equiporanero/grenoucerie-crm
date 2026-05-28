"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "topologicallySortUniversalFlatEntitiesForSelfReferentialFks", {
    enumerable: true,
    get: function() {
        return topologicallySortUniversalFlatEntitiesForSelfReferentialFks;
    }
});
const _utils = require("twenty-shared/utils");
const _allmanytoonemetadatarelationsconstant = require("../../../metadata-modules/flat-entity/constant/all-many-to-one-metadata-relations.constant");
// fieldMetadata has bidirectional self-references (relation field A -> B and
// B -> A) that are handled by a separate pre-allocation code path in the
// runner. Cycles are expected and safe to append unsorted here.
const METADATA_NAMES_WITH_EXPECTED_CYCLES = new Set([
    'fieldMetadata'
]);
const getSelfReferentialUniversalForeignKeys = (metadataName)=>Object.values(_allmanytoonemetadatarelationsconstant.ALL_MANY_TO_ONE_METADATA_RELATIONS[metadataName]).filter((relation)=>(0, _utils.isDefined)(relation) && relation.metadataName === metadataName).map((relation)=>relation.universalForeignKey);
const getParentUniversalIdentifier = ({ entity, selfReferentialUniversalForeignKeys })=>selfReferentialUniversalForeignKeys.reduce((found, universalForeignKey)=>found ?? entity[universalForeignKey] ?? null, null);
const topologicallySortUniversalFlatEntitiesForSelfReferentialFks = ({ metadataName, universalFlatEntityMaps })=>{
    const selfReferentialUniversalForeignKeys = getSelfReferentialUniversalForeignKeys(metadataName);
    const allUniversalIdentifiers = Object.keys(universalFlatEntityMaps.byUniversalIdentifier);
    if (selfReferentialUniversalForeignKeys.length === 0) {
        return allUniversalIdentifiers;
    }
    const universalIdentifierSet = new Set(allUniversalIdentifiers);
    const childrenByParent = new Map();
    const inDegree = new Map(allUniversalIdentifiers.map((id)=>[
            id,
            0
        ]));
    for (const universalIdentifier of allUniversalIdentifiers){
        const entity = universalFlatEntityMaps.byUniversalIdentifier[universalIdentifier];
        if (!(0, _utils.isDefined)(entity)) {
            continue;
        }
        const parentId = getParentUniversalIdentifier({
            entity,
            selfReferentialUniversalForeignKeys
        });
        if ((0, _utils.isDefined)(parentId) && universalIdentifierSet.has(parentId)) {
            childrenByParent.set(parentId, [
                ...childrenByParent.get(parentId) ?? [],
                universalIdentifier
            ]);
            inDegree.set(universalIdentifier, (inDegree.get(universalIdentifier) ?? 0) + 1);
        }
    }
    const roots = allUniversalIdentifiers.filter((id)=>(inDegree.get(id) ?? 0) === 0);
    const sorted = roots.reduce((accumulator, root)=>{
        accumulator.push(root);
        for(let i = accumulator.length - 1; i < accumulator.length; i++){
            const children = childrenByParent.get(accumulator[i]) ?? [];
            accumulator.push(...children);
        }
        return accumulator;
    }, []);
    if (sorted.length < allUniversalIdentifiers.length) {
        if (!METADATA_NAMES_WITH_EXPECTED_CYCLES.has(metadataName)) {
            throw new Error(`Cyclic self-referential foreign key detected for ${metadataName}: ` + `expected ${allUniversalIdentifiers.length} entities but sorted ${sorted.length}. ` + `This entity does not use deferrable FKs, so cycles are not supported.`);
        }
        // Bidirectional self-references (e.g. fieldMetadata relation pairs where
        // A -> B and B -> A) create cycles that cannot be topologically sorted.
        // These rely on DEFERRABLE INITIALLY DEFERRED FKs at the DB level,
        // so we append them at the end in their original order.
        const sortedSet = new Set(sorted);
        for (const universalIdentifier of allUniversalIdentifiers){
            if (!sortedSet.has(universalIdentifier)) {
                sorted.push(universalIdentifier);
            }
        }
    }
    return sorted;
};

//# sourceMappingURL=topologically-sort-universal-flat-entities-for-self-referential-fks.util.js.map