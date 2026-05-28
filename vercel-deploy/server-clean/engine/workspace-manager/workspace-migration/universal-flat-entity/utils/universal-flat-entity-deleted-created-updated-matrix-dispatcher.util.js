"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "flatEntityDeletedCreatedUpdatedMatrixDispatcher", {
    enumerable: true,
    get: function() {
        return flatEntityDeletedCreatedUpdatedMatrixDispatcher;
    }
});
const _utils = require("twenty-shared/utils");
const _comparetwouniversalflatentityutil = require("./compare-two-universal-flat-entity.util");
const _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil = require("../../utils/add-universal-flat-entity-to-universal-flat-entity-maps-through-mutation-or-throw.util");
const _shouldinferdeletionfrommissingentitiesutil = require("../../utils/should-infer-deletion-from-missing-entities.util");
const flatEntityDeletedCreatedUpdatedMatrixDispatcher = ({ from, to, metadataName, buildOptions })=>{
    const initialDispatcher = {
        createdFlatEntityMaps: {
            byUniversalIdentifier: {}
        },
        deletedFlatEntityMaps: {
            byUniversalIdentifier: {}
        },
        updatedFlatEntityMaps: {
            byUniversalIdentifier: {}
        }
    };
    const fromMap = new Map(from.map((obj)=>[
            obj.universalIdentifier,
            obj
        ]));
    const toMap = new Map(to.map((obj)=>[
            obj.universalIdentifier,
            obj
        ]));
    if ((0, _shouldinferdeletionfrommissingentitiesutil.shouldInferDeletionFromMissingEntities)({
        buildOptions,
        metadataName
    })) {
        for (const [universalIdentifier, fromEntity] of fromMap){
            if (toMap.has(universalIdentifier)) {
                continue;
            }
            (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: fromEntity,
                universalFlatEntityMapsToMutate: initialDispatcher.deletedFlatEntityMaps
            });
        }
    }
    for (const [universalIdentifier, toFlatEntity] of toMap){
        if (fromMap.has(universalIdentifier)) {
            continue;
        }
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: toFlatEntity,
            universalFlatEntityMapsToMutate: initialDispatcher.createdFlatEntityMaps
        });
    }
    for (const [universalIdentifier, fromUniversalFlatEntity] of fromMap){
        const toUniversalFlatEntity = toMap.get(universalIdentifier);
        if (!(0, _utils.isDefined)(toUniversalFlatEntity)) {
            continue;
        }
        const update = (0, _comparetwouniversalflatentityutil.compareTwoFlatEntity)({
            fromUniversalFlatEntity,
            toUniversalFlatEntity,
            metadataName
        });
        if (!(0, _utils.isDefined)(update)) {
            continue;
        }
        initialDispatcher.updatedFlatEntityMaps.byUniversalIdentifier[fromUniversalFlatEntity.universalIdentifier] = {
            update
        };
    }
    return initialDispatcher;
};

//# sourceMappingURL=universal-flat-entity-deleted-created-updated-matrix-dispatcher.util.js.map