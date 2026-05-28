"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GroupByConnectionGqlObjectTypeGenerator", {
    enumerable: true,
    get: function() {
        return GroupByConnectionGqlObjectTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _utils = require("twenty-shared/utils");
const _objecttypedefinitionkindenum = require("../../enums/object-type-definition-kind.enum");
const _gqltypesstorage = require("../../storages/gql-types.storage");
const _applytypeoptionsforoutputtypeutil = require("../../utils/apply-type-options-for-output-type.util");
const _computeobjectmetadataobjecttypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-object-type-key.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GroupByConnectionGqlObjectTypeGenerator = class GroupByConnectionGqlObjectTypeGenerator {
    buildAndStore(flatObjectMetadata) {
        const kind = _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.GroupByConnection;
        const key = (0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)(flatObjectMetadata.nameSingular, kind);
        this.gqlTypesStorage.addGqlType(key, new _graphql.GraphQLObjectType({
            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}${kind.toString()}`,
            description: flatObjectMetadata.description,
            fields: ()=>this.generateFields(flatObjectMetadata.nameSingular)
        }));
    }
    generateFields(objectNameSingular) {
        const fields = {};
        const connection = this.gqlTypesStorage.getGqlTypeByKey((0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)(objectNameSingular, _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Connection));
        if (!(0, _utils.isDefined)(connection) || !(0, _graphql.isObjectType)(connection)) {
            this.logger.error(`Connection type for ${objectNameSingular} was not found.`);
            throw new Error(`Connection type for ${objectNameSingular} was not found.`);
        }
        Object.assign(fields, connection.toConfig().fields);
        fields.groupByDimensionValues = {
            type: (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(_graphqltypejson.default, {
                nullable: false
            })
        };
        return fields;
    }
    constructor(gqlTypesStorage){
        this.gqlTypesStorage = gqlTypesStorage;
        this.logger = new _common.Logger(GroupByConnectionGqlObjectTypeGenerator.name);
    }
};
GroupByConnectionGqlObjectTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], GroupByConnectionGqlObjectTypeGenerator);

//# sourceMappingURL=group-by-connection-gql-object-type.generator.js.map