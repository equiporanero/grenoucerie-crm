"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeTwentyStandardApplicationAllFlatEntityMaps", {
    enumerable: true,
    get: function() {
        return computeTwentyStandardApplicationAllFlatEntityMaps;
    }
});
const _utils = require("twenty-shared/utils");
const _createemptyflatentitymapsconstant = require("../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _getmetadataflatentitymapskeyutil = require("../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _twentystandardallmetadatanameconstant = require("../constants/twenty-standard-all-metadata-name.constant");
const _buildstandardflatagentmetadatamapsutil = require("./agent-metadata/build-standard-flat-agent-metadata-maps.util");
const _buildstandardflatfieldmetadatamapsutil = require("./field-metadata/build-standard-flat-field-metadata-maps.util");
const _getstandardobjectmetadatarelatedentityidsutil = require("./get-standard-object-metadata-related-entity-ids.util");
const _getstandardpagelayoutmetadatarelatedentityidsutil = require("./get-standard-page-layout-metadata-related-entity-ids.util");
const _buildstandardflatindexmetadatamapsutil = require("./index/build-standard-flat-index-metadata-maps.util");
const _buildstandardflatcommandmenuitemmapsutil = require("./command-menu-item/build-standard-flat-command-menu-item-maps.util");
const _buildstandardflatnavigationmenuitemmapsutil = require("./navigation-menu-item/build-standard-flat-navigation-menu-item-maps.util");
const _buildstandardflatobjectmetadatamapsutil = require("./object-metadata/build-standard-flat-object-metadata-maps.util");
const _buildstandardflatpagelayouttabmetadatamapsutil = require("./page-layout-tab/build-standard-flat-page-layout-tab-metadata-maps.util");
const _buildstandardflatpagelayoutwidgetmetadatamapsutil = require("./page-layout-widget/build-standard-flat-page-layout-widget-metadata-maps.util");
const _buildstandardflatpagelayoutmetadatamapsutil = require("./page-layout/build-standard-flat-page-layout-metadata-maps.util");
const _buildstandardflatpermissionflagmetadatamapsutil = require("./permission-flag/build-standard-flat-permission-flag-metadata-maps.util");
const _buildstandardflatrolemetadatamapsutil = require("./role-metadata/build-standard-flat-role-metadata-maps.util");
const _buildstandardflatskillmetadatamapsutil = require("./skill-metadata/build-standard-flat-skill-metadata-maps.util");
const _buildstandardflatviewfieldmetadatamapsutil = require("./view-field/build-standard-flat-view-field-metadata-maps.util");
const _buildstandardflatviewfieldgroupmetadatamapsutil = require("./view-field-group/build-standard-flat-view-field-group-metadata-maps.util");
const _buildstandardflatviewfiltermetadatamapsutil = require("./view-filter/build-standard-flat-view-filter-metadata-maps.util");
const _buildstandardflatviewgroupmetadatamapsutil = require("./view-group/build-standard-flat-view-group-metadata-maps.util");
const _buildstandardflatviewmetadatamapsutil = require("./view/build-standard-flat-view-metadata-maps.util");
const computeTwentyStandardApplicationAllFlatEntityMaps = ({ now, workspaceId, twentyStandardApplicationId })=>{
    const standardObjectMetadataRelatedEntityIds = (0, _getstandardobjectmetadatarelatedentityidsutil.getStandardObjectMetadataRelatedEntityIds)();
    const flatObjectMetadataMaps = (0, _buildstandardflatobjectmetadatamapsutil.buildStandardFlatObjectMetadataMaps)({
        now,
        workspaceId,
        standardObjectMetadataRelatedEntityIds,
        twentyStandardApplicationId,
        dependencyFlatEntityMaps: {
            flatFieldMetadataMaps: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)()
        }
    });
    const flatFieldMetadataMaps = (0, _buildstandardflatfieldmetadatamapsutil.buildStandardFlatFieldMetadataMaps)({
        now,
        workspaceId,
        standardObjectMetadataRelatedEntityIds,
        dependencyFlatEntityMaps: {
            flatObjectMetadataMaps
        },
        twentyStandardApplicationId
    });
    const flatIndexMaps = (0, _buildstandardflatindexmetadatamapsutil.buildStandardFlatIndexMetadataMaps)({
        dependencyFlatEntityMaps: {
            flatFieldMetadataMaps,
            flatObjectMetadataMaps
        },
        now,
        standardObjectMetadataRelatedEntityIds,
        workspaceId,
        twentyStandardApplicationId
    });
    const flatViewMaps = (0, _buildstandardflatviewmetadatamapsutil.buildStandardFlatViewMetadataMaps)({
        dependencyFlatEntityMaps: {
            flatFieldMetadataMaps,
            flatObjectMetadataMaps
        },
        now,
        standardObjectMetadataRelatedEntityIds,
        twentyStandardApplicationId,
        workspaceId
    });
    const flatViewGroupMaps = (0, _buildstandardflatviewgroupmetadatamapsutil.buildStandardFlatViewGroupMetadataMaps)({
        dependencyFlatEntityMaps: {
            flatFieldMetadataMaps,
            flatViewMaps
        },
        now,
        standardObjectMetadataRelatedEntityIds,
        twentyStandardApplicationId,
        workspaceId
    });
    const flatViewFilterGroupMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    const flatViewFieldGroupMaps = (0, _buildstandardflatviewfieldgroupmetadatamapsutil.buildStandardFlatViewFieldGroupMetadataMaps)({
        dependencyFlatEntityMaps: {
            flatViewMaps
        },
        now,
        standardObjectMetadataRelatedEntityIds,
        twentyStandardApplicationId,
        workspaceId
    });
    const flatViewFilterMaps = (0, _buildstandardflatviewfiltermetadatamapsutil.buildStandardFlatViewFilterMetadataMaps)({
        dependencyFlatEntityMaps: {
            flatFieldMetadataMaps,
            flatViewMaps,
            flatViewFilterGroupMaps
        },
        now,
        standardObjectMetadataRelatedEntityIds,
        twentyStandardApplicationId,
        workspaceId
    });
    const flatViewFieldMaps = (0, _buildstandardflatviewfieldmetadatamapsutil.buildStandardFlatViewFieldMetadataMaps)({
        dependencyFlatEntityMaps: {
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            flatViewMaps,
            flatViewFieldGroupMaps
        },
        now,
        standardObjectMetadataRelatedEntityIds,
        twentyStandardApplicationId,
        workspaceId
    });
    const flatRoleMaps = (0, _buildstandardflatrolemetadatamapsutil.buildStandardFlatRoleMetadataMaps)({
        now,
        workspaceId,
        twentyStandardApplicationId,
        standardObjectMetadataRelatedEntityIds,
        dependencyFlatEntityMaps: undefined
    });
    const flatPermissionFlagMaps = (0, _buildstandardflatpermissionflagmetadatamapsutil.buildStandardFlatPermissionFlagMetadataMaps)({
        now,
        workspaceId,
        twentyStandardApplicationId
    });
    const flatAgentMaps = (0, _buildstandardflatagentmetadatamapsutil.buildStandardFlatAgentMetadataMaps)({
        now,
        workspaceId,
        twentyStandardApplicationId,
        standardObjectMetadataRelatedEntityIds,
        dependencyFlatEntityMaps: {
            flatRoleMaps
        }
    });
    const flatSkillMaps = (0, _buildstandardflatskillmetadatamapsutil.buildStandardFlatSkillMetadataMaps)({
        now,
        workspaceId,
        twentyStandardApplicationId,
        standardObjectMetadataRelatedEntityIds,
        dependencyFlatEntityMaps: undefined
    });
    const standardPageLayoutMetadataRelatedEntityIds = (0, _getstandardpagelayoutmetadatarelatedentityidsutil.getStandardPageLayoutMetadataRelatedEntityIds)();
    const flatPageLayoutMaps = (0, _buildstandardflatpagelayoutmetadatamapsutil.buildStandardFlatPageLayoutMetadataMaps)({
        now,
        workspaceId,
        twentyStandardApplicationId,
        standardObjectMetadataRelatedEntityIds,
        standardPageLayoutMetadataRelatedEntityIds
    });
    const flatPageLayoutTabMaps = (0, _buildstandardflatpagelayouttabmetadatamapsutil.buildStandardFlatPageLayoutTabMetadataMaps)({
        now,
        workspaceId,
        twentyStandardApplicationId,
        standardPageLayoutMetadataRelatedEntityIds
    });
    const flatPageLayoutWidgetMaps = (0, _buildstandardflatpagelayoutwidgetmetadatamapsutil.buildStandardFlatPageLayoutWidgetMetadataMaps)({
        now,
        workspaceId,
        twentyStandardApplicationId,
        standardObjectMetadataRelatedEntityIds,
        standardPageLayoutMetadataRelatedEntityIds
    });
    const flatNavigationMenuItemMaps = (0, _buildstandardflatnavigationmenuitemmapsutil.buildStandardFlatNavigationMenuItemMaps)({
        now,
        workspaceId,
        twentyStandardApplicationId,
        dependencyFlatEntityMaps: {
            flatViewMaps
        }
    });
    const flatCommandMenuItemMaps = (0, _buildstandardflatcommandmenuitemmapsutil.buildStandardFlatCommandMenuItemMaps)({
        now,
        workspaceId,
        twentyStandardApplicationId,
        dependencyFlatEntityMaps: {
            flatObjectMetadataMaps
        }
    });
    const allFlatEntityMaps = {
        flatViewFieldMaps,
        flatViewFieldGroupMaps,
        flatViewFilterMaps,
        flatViewGroupMaps,
        flatViewMaps,
        flatIndexMaps,
        flatFieldMetadataMaps,
        flatObjectMetadataMaps,
        flatNavigationMenuItemMaps,
        flatPermissionFlagMaps,
        flatRoleMaps,
        flatAgentMaps,
        flatSkillMaps,
        flatPageLayoutMaps,
        flatPageLayoutTabMaps,
        flatPageLayoutWidgetMaps,
        flatCommandMenuItemMaps
    };
    const idByUniversalIdentifierByMetadataName = {};
    for (const metadataName of _twentystandardallmetadatanameconstant.TWENTY_STANDARD_ALL_METADATA_NAME){
        const flatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(metadataName);
        const flatEntityMaps = allFlatEntityMaps[flatEntityMapsKey];
        const idByUniversalIdentifier = Object.fromEntries(Object.entries(flatEntityMaps.universalIdentifierById).filter((entry)=>(0, _utils.isDefined)(entry[1])).map(([id, universalIdentifier])=>[
                universalIdentifier,
                id
            ]));
        if (Object.keys(idByUniversalIdentifier).length > 0) {
            idByUniversalIdentifierByMetadataName[metadataName] = idByUniversalIdentifier;
        }
    }
    return {
        allFlatEntityMaps,
        idByUniversalIdentifierByMetadataName
    };
};

//# sourceMappingURL=twenty-standard-application-all-flat-entity-maps.constant.js.map