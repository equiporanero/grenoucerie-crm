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
    get WAS_REMOVED_IN_UPGRADE_CLASS_METADATA_KEY () {
        return WAS_REMOVED_IN_UPGRADE_CLASS_METADATA_KEY;
    },
    get WAS_REMOVED_IN_UPGRADE_PROPERTIES_METADATA_KEY () {
        return WAS_REMOVED_IN_UPGRADE_PROPERTIES_METADATA_KEY;
    },
    get WasRemovedInUpgrade () {
        return WasRemovedInUpgrade;
    },
    get getWasRemovedInUpgradeClassMetadata () {
        return getWasRemovedInUpgradeClassMetadata;
    },
    get getWasRemovedInUpgradePropertyMetadata () {
        return getWasRemovedInUpgradePropertyMetadata;
    }
});
require("reflect-metadata");
const _upgradedecoratormetadatautil = require("./upgrade-decorator-metadata.util");
const WAS_REMOVED_IN_UPGRADE_CLASS_METADATA_KEY = 'WAS_REMOVED_IN_UPGRADE_CLASS';
const WAS_REMOVED_IN_UPGRADE_PROPERTIES_METADATA_KEY = 'WAS_REMOVED_IN_UPGRADE_PROPERTIES';
const WasRemovedInUpgrade = (options)=>(target, propertyKey)=>{
        (0, _upgradedecoratormetadatautil.defineUpgradeMetadataOnClassOrProperty)({
            classMetadataKey: WAS_REMOVED_IN_UPGRADE_CLASS_METADATA_KEY,
            propertyMetadataKey: WAS_REMOVED_IN_UPGRADE_PROPERTIES_METADATA_KEY,
            value: options,
            target,
            propertyKey
        });
    };
const getWasRemovedInUpgradeClassMetadata = (target)=>Reflect.getMetadata(WAS_REMOVED_IN_UPGRADE_CLASS_METADATA_KEY, target);
const getWasRemovedInUpgradePropertyMetadata = (target)=>Reflect.getMetadata(WAS_REMOVED_IN_UPGRADE_PROPERTIES_METADATA_KEY, target) ?? {};

//# sourceMappingURL=was-removed-in-upgrade.decorator.js.map