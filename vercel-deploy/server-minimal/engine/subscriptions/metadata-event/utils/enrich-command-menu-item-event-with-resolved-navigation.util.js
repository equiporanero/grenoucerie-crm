"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "enrichCommandMenuItemEventWithResolvedNavigation", {
    enumerable: true,
    get: function() {
        return enrichCommandMenuItemEventWithResolvedNavigation;
    }
});
const _utils = require("twenty-shared/utils");
const _enginecomponentkeyenum = require("../../../metadata-modules/command-menu-item/enums/engine-component-key.enum");
const _buildnavigationinterpolationcontextutil = require("../../../metadata-modules/command-menu-item/utils/build-navigation-interpolation-context.util");
const _isobjectmetadatacommandmenuitempayloadutil = require("../../../metadata-modules/command-menu-item/utils/is-object-metadata-command-menu-item-payload.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const enrichCommandMenuItemEventWithResolvedNavigation = ({ record, flatObjectMetadataMaps, locale, i18nInstance })=>{
    if (record.engineComponentKey !== _enginecomponentkeyenum.EngineComponentKey.NAVIGATION) {
        return record;
    }
    const payload = record.payload;
    if (!(0, _isobjectmetadatacommandmenuitempayloadutil.isObjectMetadataCommandMenuItemPayload)(payload)) {
        return record;
    }
    const objectMetadataItemId = payload.objectMetadataItemId;
    const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: objectMetadataItemId,
        flatEntityMaps: flatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(flatObjectMetadata)) {
        return record;
    }
    const context = (0, _buildnavigationinterpolationcontextutil.buildNavigationInterpolationContext)({
        objectMetadata: flatObjectMetadata,
        locale,
        i18nInstance
    });
    const enriched = {
        ...record
    };
    for (const field of [
        'label',
        'shortLabel',
        'icon'
    ]){
        const rawValue = record[field];
        const resolvedValue = (0, _utils.interpolateCommandMenuItemTemplate)({
            label: rawValue,
            context
        });
        if ((0, _utils.isDefined)(resolvedValue)) {
            enriched[field] = resolvedValue;
        }
    }
    return enriched;
};

//# sourceMappingURL=enrich-command-menu-item-event-with-resolved-navigation.util.js.map