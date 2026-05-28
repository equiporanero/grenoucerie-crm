"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "convertClassNameToObjectMetadataName", {
    enumerable: true,
    get: function() {
        return convertClassNameToObjectMetadataName;
    }
});
const _camelcase = require("../../../utils/camel-case");
const classSuffix = 'WorkspaceEntity';
const convertClassNameToObjectMetadataName = (name)=>{
    let objectName = (0, _camelcase.camelCase)(name);
    if (objectName.endsWith(classSuffix)) {
        objectName = objectName.slice(0, -classSuffix.length);
    }
    return objectName;
};

//# sourceMappingURL=convert-class-to-object-metadata-name.util.js.map