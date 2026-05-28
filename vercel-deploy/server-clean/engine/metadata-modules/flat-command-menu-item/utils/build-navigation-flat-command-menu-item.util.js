"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get NAVIGATION_COMMAND_UUID_NAMESPACE () {
        return NAVIGATION_COMMAND_UUID_NAMESPACE;
    },
    get NAVIGATION_INTERPOLATED_ICON () {
        return NAVIGATION_INTERPOLATED_ICON;
    },
    get NAVIGATION_INTERPOLATED_LABEL () {
        return NAVIGATION_INTERPOLATED_LABEL;
    },
    get NAVIGATION_INTERPOLATED_SHORT_LABEL () {
        return NAVIGATION_INTERPOLATED_SHORT_LABEL;
    },
    get buildNavigationFlatCommandMenuItem () {
        return buildNavigationFlatCommandMenuItem;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _commandmenuitemavailabilitytypeenum = require("../../command-menu-item/enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../../command-menu-item/enums/engine-component-key.enum");
const _twentystandardapplications = require("../../../workspace-manager/twenty-standard-application/constants/twenty-standard-applications");
const NAVIGATION_COMMAND_UUID_NAMESPACE = 'b31830da-2ae0-48eb-a915-12fa4ab96dd3';
const NAVIGATION_INTERPOLATED_LABEL = 'Go to ${navigateToObjectMetadataItem.labelPlural}';
const NAVIGATION_INTERPOLATED_SHORT_LABEL = '${navigateToObjectMetadataItem.labelPlural}';
const NAVIGATION_INTERPOLATED_ICON = '${navigateToObjectMetadataItem.icon}';
const buildNavigationFlatCommandMenuItem = ({ objectMetadata, commandMenuItemId, applicationId, workspaceId, position, now })=>{
    const universalIdentifier = (0, _uuid.v5)(objectMetadata.universalIdentifier, NAVIGATION_COMMAND_UUID_NAMESPACE);
    return {
        id: commandMenuItemId,
        universalIdentifier,
        applicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        label: NAVIGATION_INTERPOLATED_LABEL,
        shortLabel: NAVIGATION_INTERPOLATED_SHORT_LABEL,
        icon: NAVIGATION_INTERPOLATED_ICON,
        position,
        isPinned: false,
        availabilityType: _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL,
        conditionalAvailabilityExpression: `targetObjectReadPermissions.${objectMetadata.nameSingular}`,
        frontComponentId: null,
        frontComponentUniversalIdentifier: null,
        engineComponentKey: _enginecomponentkeyenum.EngineComponentKey.NAVIGATION,
        payload: {
            objectMetadataItemId: objectMetadata.id
        },
        hotKeys: (0, _utils.isDefined)(objectMetadata.shortcut) ? [
            'G',
            objectMetadata.shortcut
        ] : null,
        workflowVersionId: null,
        availabilityObjectMetadataId: null,
        availabilityObjectMetadataUniversalIdentifier: null,
        pageLayoutId: null,
        pageLayoutUniversalIdentifier: null,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=build-navigation-flat-command-menu-item.util.js.map