"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InjectObjectMetadataRepository", {
    enumerable: true,
    get: function() {
        return InjectObjectMetadataRepository;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _convertclasstoobjectmetadatanameutil = require("../workspace-manager/utils/convert-class-to-object-metadata-name.util");
const InjectObjectMetadataRepository = (objectMetadata)=>{
    const token = `${(0, _utils.capitalize)((0, _convertclasstoobjectmetadatanameutil.convertClassNameToObjectMetadataName)(objectMetadata.name))}Repository`;
    return (0, _common.Inject)(token);
};

//# sourceMappingURL=object-metadata-repository.decorator.js.map