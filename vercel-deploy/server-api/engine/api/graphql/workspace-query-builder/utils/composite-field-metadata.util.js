/**
 * Composite key are structured as follows:
 * COMPOSITE___{parentFieldName}_{childFieldName}
 * This util are here to pre-process and post-process the composite keys before and after querying the database
 */ "use strict";
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
    get compositeFieldPrefix () {
        return compositeFieldPrefix;
    },
    get createCompositeFieldKey () {
        return createCompositeFieldKey;
    },
    get isPrefixedCompositeField () {
        return isPrefixedCompositeField;
    },
    get parseCompositeFieldKey () {
        return parseCompositeFieldKey;
    }
});
const compositeFieldPrefix = 'COMPOSITE___';
const createCompositeFieldKey = (fieldName, propertyName)=>{
    return `${compositeFieldPrefix}${fieldName}_${propertyName}`;
};
const isPrefixedCompositeField = (key)=>{
    return key.startsWith(compositeFieldPrefix);
};
const parseCompositeFieldKey = (key)=>{
    const [parentFieldName, childFieldName] = key.replace(compositeFieldPrefix, '').split('_');
    if (!parentFieldName || !childFieldName) {
        return null;
    }
    return {
        parentFieldName,
        childFieldName
    };
};

//# sourceMappingURL=composite-field-metadata.util.js.map