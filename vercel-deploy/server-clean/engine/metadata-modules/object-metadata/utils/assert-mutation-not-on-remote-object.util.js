"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertMutationNotOnRemoteObject", {
    enumerable: true,
    get: function() {
        return assertMutationNotOnRemoteObject;
    }
});
const _objectmetadataexception = require("../object-metadata.exception");
const assertMutationNotOnRemoteObject = (objectMetadataItem)=>{
    if (objectMetadataItem.isRemote) {
        throw new _objectmetadataexception.ObjectMetadataException('Remote objects are read-only', _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_MUTATION_NOT_ALLOWED);
    }
};

//# sourceMappingURL=assert-mutation-not-on-remote-object.util.js.map