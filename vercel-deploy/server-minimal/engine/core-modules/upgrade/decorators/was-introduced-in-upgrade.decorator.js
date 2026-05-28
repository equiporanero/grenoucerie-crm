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
    get WAS_INTRODUCED_IN_UPGRADE_CLASS_METADATA_KEY () {
        return WAS_INTRODUCED_IN_UPGRADE_CLASS_METADATA_KEY;
    },
    get WAS_INTRODUCED_IN_UPGRADE_PROPERTIES_METADATA_KEY () {
        return WAS_INTRODUCED_IN_UPGRADE_PROPERTIES_METADATA_KEY;
    },
    get WasIntroducedInUpgrade () {
        return WasIntroducedInUpgrade;
    },
    get getWasIntroducedInUpgradeClassMetadata () {
        return getWasIntroducedInUpgradeClassMetadata;
    },
    get getWasIntroducedInUpgradePropertyMetadata () {
        return getWasIntroducedInUpgradePropertyMetadata;
    }
});
require("reflect-metadata");
const _upgradedecoratormetadatautil = require("./upgrade-decorator-metadata.util");
const WAS_INTRODUCED_IN_UPGRADE_CLASS_METADATA_KEY = 'WAS_INTRODUCED_IN_UPGRADE_CLASS';
const WAS_INTRODUCED_IN_UPGRADE_PROPERTIES_METADATA_KEY = 'WAS_INTRODUCED_IN_UPGRADE_PROPERTIES';
const WasIntroducedInUpgrade = (options)=>(target, propertyKey)=>{
        (0, _upgradedecoratormetadatautil.defineUpgradeMetadataOnClassOrProperty)({
            classMetadataKey: WAS_INTRODUCED_IN_UPGRADE_CLASS_METADATA_KEY,
            propertyMetadataKey: WAS_INTRODUCED_IN_UPGRADE_PROPERTIES_METADATA_KEY,
            value: options,
            target,
            propertyKey
        });
    };
const getWasIntroducedInUpgradeClassMetadata = (target)=>Reflect.getMetadata(WAS_INTRODUCED_IN_UPGRADE_CLASS_METADATA_KEY, target);
const getWasIntroducedInUpgradePropertyMetadata = (target)=>Reflect.getMetadata(WAS_INTRODUCED_IN_UPGRADE_PROPERTIES_METADATA_KEY, target) ?? {};

//# sourceMappingURL=was-introduced-in-upgrade.decorator.js.map