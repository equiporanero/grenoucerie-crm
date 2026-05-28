"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCommandMenuItemManifestToUniversalFlatCommandMenuItem", {
    enumerable: true,
    get: function() {
        return fromCommandMenuItemManifestToUniversalFlatCommandMenuItem;
    }
});
const _commandmenuitemavailabilitytypeenum = require("../../../../metadata-modules/command-menu-item/enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../../../../metadata-modules/command-menu-item/enums/engine-component-key.enum");
const AVAILABILITY_TYPE_MAP = {
    GLOBAL: _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL,
    GLOBAL_OBJECT_CONTEXT: _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL_OBJECT_CONTEXT,
    RECORD_SELECTION: _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.RECORD_SELECTION,
    FALLBACK: _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.FALLBACK
};
const fromCommandMenuItemManifestToUniversalFlatCommandMenuItem = ({ commandMenuItemManifest, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: commandMenuItemManifest.universalIdentifier,
        applicationUniversalIdentifier,
        label: commandMenuItemManifest.label,
        shortLabel: commandMenuItemManifest.shortLabel ?? null,
        position: 0,
        icon: commandMenuItemManifest.icon ?? null,
        isPinned: commandMenuItemManifest.isPinned ?? false,
        availabilityType: commandMenuItemManifest.availabilityType ? AVAILABILITY_TYPE_MAP[commandMenuItemManifest.availabilityType] : _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL,
        conditionalAvailabilityExpression: commandMenuItemManifest.conditionalAvailabilityExpression ?? null,
        frontComponentUniversalIdentifier: commandMenuItemManifest.frontComponentUniversalIdentifier,
        availabilityObjectMetadataUniversalIdentifier: commandMenuItemManifest.availabilityObjectUniversalIdentifier ?? null,
        engineComponentKey: _enginecomponentkeyenum.EngineComponentKey.FRONT_COMPONENT_RENDERER,
        payload: null,
        hotKeys: null,
        workflowVersionId: null,
        pageLayoutUniversalIdentifier: null,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-command-menu-item-manifest-to-universal-flat-command-menu-item.util.js.map