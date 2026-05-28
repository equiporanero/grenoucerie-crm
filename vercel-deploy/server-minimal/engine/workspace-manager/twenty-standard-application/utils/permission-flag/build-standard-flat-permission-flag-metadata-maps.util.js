"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatPermissionFlagMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatPermissionFlagMetadataMaps;
    }
});
const _uuid = require("uuid");
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _standardpermissionflagdefinitionsconstant = require("../../../../metadata-modules/permission-flag/constants/standard-permission-flag-definitions.constant");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const buildStandardFlatPermissionFlagMetadataMaps = ({ now, workspaceId, twentyStandardApplicationId })=>{
    let flatPermissionFlagMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const permissionFlagDefinition of _standardpermissionflagdefinitionsconstant.STANDARD_PERMISSION_FLAG_DEFINITIONS){
        flatPermissionFlagMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: {
                id: (0, _uuid.v4)(),
                ...permissionFlagDefinition,
                workspaceId,
                applicationId: twentyStandardApplicationId,
                universalIdentifier: permissionFlagDefinition.universalIdentifier,
                applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
                rolePermissionFlagIds: [],
                rolePermissionFlagUniversalIdentifiers: [],
                createdAt: now,
                updatedAt: now
            },
            flatEntityMaps: flatPermissionFlagMaps
        });
    }
    return flatPermissionFlagMaps;
};

//# sourceMappingURL=build-standard-flat-permission-flag-metadata-maps.util.js.map