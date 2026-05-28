"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "interpolateNavigationCommandMenuItemField", {
    enumerable: true,
    get: function() {
        return interpolateNavigationCommandMenuItemField;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _enginecomponentkeyenum = require("../enums/engine-component-key.enum");
const _buildnavigationinterpolationcontextutil = require("./build-navigation-interpolation-context.util");
const _isobjectmetadatacommandmenuitempayloadutil = require("./is-object-metadata-command-menu-item-payload.util");
const interpolateNavigationCommandMenuItemField = ({ commandMenuItem, fieldName, objectMetadata, locale, i18nInstance })=>{
    const rawValue = commandMenuItem[fieldName];
    if (commandMenuItem.engineComponentKey !== _enginecomponentkeyenum.EngineComponentKey.NAVIGATION || !(0, _isobjectmetadatacommandmenuitempayloadutil.isObjectMetadataCommandMenuItemPayload)(commandMenuItem.payload)) {
        return rawValue;
    }
    if (!(0, _utils.isDefined)(objectMetadata)) {
        return undefined;
    }
    if (!(0, _guards.isNonEmptyString)(rawValue)) {
        return rawValue;
    }
    const context = (0, _buildnavigationinterpolationcontextutil.buildNavigationInterpolationContext)({
        objectMetadata,
        locale,
        i18nInstance
    });
    return (0, _utils.interpolateCommandMenuItemTemplate)({
        label: rawValue,
        context
    }) ?? rawValue;
};

//# sourceMappingURL=interpolate-navigation-command-menu-item-field.util.js.map