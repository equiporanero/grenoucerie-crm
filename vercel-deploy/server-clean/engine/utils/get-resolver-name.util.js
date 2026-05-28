"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getResolverName", {
    enumerable: true,
    get: function() {
        return getResolverName;
    }
});
const _utils = require("twenty-shared/utils");
const _camelcase = require("../../utils/camel-case");
const getResolverName = (objectMetadata, type)=>{
    switch(type){
        case 'findMany':
            return `${(0, _camelcase.camelCase)(objectMetadata.namePlural)}`;
        case 'findOne':
            return `${(0, _camelcase.camelCase)(objectMetadata.nameSingular)}`;
        case 'findDuplicates':
            return `${(0, _camelcase.camelCase)(objectMetadata.nameSingular)}Duplicates`;
        case 'createOne':
            return `create${(0, _utils.pascalCase)(objectMetadata.nameSingular)}`;
        case 'createMany':
            return `create${(0, _utils.pascalCase)(objectMetadata.namePlural)}`;
        case 'updateOne':
            return `update${(0, _utils.pascalCase)(objectMetadata.nameSingular)}`;
        case 'updateMany':
            return `update${(0, _utils.pascalCase)(objectMetadata.namePlural)}`;
        case 'deleteOne':
            return `delete${(0, _utils.pascalCase)(objectMetadata.nameSingular)}`;
        case 'deleteMany':
            return `delete${(0, _utils.pascalCase)(objectMetadata.namePlural)}`;
        case 'destroyOne':
            return `destroy${(0, _utils.pascalCase)(objectMetadata.nameSingular)}`;
        case 'destroyMany':
            return `destroy${(0, _utils.pascalCase)(objectMetadata.namePlural)}`;
        case 'restoreOne':
            return `restore${(0, _utils.pascalCase)(objectMetadata.nameSingular)}`;
        case 'restoreMany':
            return `restore${(0, _utils.pascalCase)(objectMetadata.namePlural)}`;
        case 'mergeMany':
            return `merge${(0, _utils.pascalCase)(objectMetadata.namePlural)}`;
        case 'groupBy':
            return `${(0, _camelcase.camelCase)(objectMetadata.namePlural)}GroupBy`;
        default:
            throw new Error(`Unknown resolver type: ${type}`);
    }
};

//# sourceMappingURL=get-resolver-name.util.js.map