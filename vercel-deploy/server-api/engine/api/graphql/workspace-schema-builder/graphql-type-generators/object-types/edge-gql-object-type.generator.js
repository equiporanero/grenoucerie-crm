"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EdgeGqlObjectTypeGenerator", {
    enumerable: true,
    get: function() {
        return EdgeGqlObjectTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _objecttypedefinitionkindenum = require("../../enums/object-type-definition-kind.enum");
const _scalars = require("../../graphql-types/scalars");
const _gqltypesstorage = require("../../storages/gql-types.storage");
const _applytypeoptionsforoutputtypeutil = require("../../utils/apply-type-options-for-output-type.util");
const _computeobjectmetadataobjecttypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-object-type-key.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EdgeGqlObjectTypeGenerator = class EdgeGqlObjectTypeGenerator {
    buildAndStore(flatObjectMetadata) {
        const kind = _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Edge;
        const key = (0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)(flatObjectMetadata.nameSingular, kind);
        this.gqlTypesStorage.addGqlType(key, new _graphql.GraphQLObjectType({
            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}${kind.toString()}`,
            description: flatObjectMetadata.description,
            fields: ()=>this.generateFields(flatObjectMetadata.nameSingular)
        }));
    }
    generateFields(objectNameSingular) {
        const fields = {};
        const key = (0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)(objectNameSingular, _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Plain);
        const objectType = this.gqlTypesStorage.getGqlTypeByKey(key);
        if (!(0, _utils.isDefined)(objectType) || (0, _graphql.isInputObjectType)(objectType)) {
            this.logger.error(`Node type for ${objectNameSingular} was not found. Please, check if you have defined it.`);
            throw new Error(`Node type for ${objectNameSingular} was not found. Please, check if you have defined it.`);
        }
        const typeOptions = {
            nullable: false
        };
        fields.node = {
            type: (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(objectType, typeOptions)
        };
        fields.cursor = {
            type: (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(_scalars.CursorScalarType, typeOptions)
        };
        return fields;
    }
    constructor(gqlTypesStorage){
        this.gqlTypesStorage = gqlTypesStorage;
        this.logger = new _common.Logger(EdgeGqlObjectTypeGenerator.name);
    }
};
EdgeGqlObjectTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], EdgeGqlObjectTypeGenerator);

//# sourceMappingURL=edge-gql-object-type.generator.js.map