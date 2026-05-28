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
    get WAS_RENAMED_IN_UPGRADE_CLASS_METADATA_KEY () {
        return WAS_RENAMED_IN_UPGRADE_CLASS_METADATA_KEY;
    },
    get WAS_RENAMED_IN_UPGRADE_PROPERTIES_METADATA_KEY () {
        return WAS_RENAMED_IN_UPGRADE_PROPERTIES_METADATA_KEY;
    },
    get WasRenamedInUpgrade () {
        return WasRenamedInUpgrade;
    },
    get getWasRenamedInUpgradeClassMetadata () {
        return getWasRenamedInUpgradeClassMetadata;
    },
    get getWasRenamedInUpgradePropertyMetadata () {
        return getWasRenamedInUpgradePropertyMetadata;
    }
});
require("reflect-metadata");
const _upgradedecoratormetadatautil = require("./upgrade-decorator-metadata.util");
const WAS_RENAMED_IN_UPGRADE_CLASS_METADATA_KEY = 'WAS_RENAMED_IN_UPGRADE_CLASS';
const WAS_RENAMED_IN_UPGRADE_PROPERTIES_METADATA_KEY = 'WAS_RENAMED_IN_UPGRADE_PROPERTIES';
const WasRenamedInUpgrade = (history)=>(target, propertyKey)=>{
        (0, _upgradedecoratormetadatautil.defineUpgradeMetadataOnClassOrProperty)({
            classMetadataKey: WAS_RENAMED_IN_UPGRADE_CLASS_METADATA_KEY,
            propertyMetadataKey: WAS_RENAMED_IN_UPGRADE_PROPERTIES_METADATA_KEY,
            value: history,
            target,
            propertyKey
        });
    };
const getWasRenamedInUpgradeClassMetadata = (target)=>Reflect.getMetadata(WAS_RENAMED_IN_UPGRADE_CLASS_METADATA_KEY, target);
const getWasRenamedInUpgradePropertyMetadata = (target)=>Reflect.getMetadata(WAS_RENAMED_IN_UPGRADE_PROPERTIES_METADATA_KEY, target) ?? {};

//# sourceMappingURL=was-renamed-in-upgrade.decorator.js.map