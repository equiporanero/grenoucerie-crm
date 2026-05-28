"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectionGqlObjectTypeGenerator", {
    enumerable: true,
    get: function() {
        return ConnectionGqlObjectTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _objecttypedefinitionkindenum = require("../../enums/object-type-definition-kind.enum");
const _aggregationtypegenerator = require("./aggregation-type.generator");
const _object = require("../../graphql-types/object");
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
let ConnectionGqlObjectTypeGenerator = class ConnectionGqlObjectTypeGenerator {
    buildAndStore(flatObjectMetadata, flatFields) {
        const kind = _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Connection;
        const key = (0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)(flatObjectMetadata.nameSingular, kind);
        this.gqlTypesStorage.addGqlType(key, new _graphql.GraphQLObjectType({
            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}${kind.toString()}`,
            description: flatObjectMetadata.description,
            fields: ()=>this.generateFields(flatObjectMetadata, flatFields)
        }));
    }
    generateFields(flatObjectMetadata, flatFields) {
        const fields = {};
        const aggregatedFields = this.aggregationObjectTypeGenerator.generate(flatFields);
        Object.assign(fields, aggregatedFields);
        const edgeType = this.gqlTypesStorage.getGqlTypeByKey((0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)(flatObjectMetadata.nameSingular, _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Edge));
        if (!(0, _utils.isDefined)(edgeType) || (0, _graphql.isInputObjectType)(edgeType)) {
            this.logger.error(`Edge type for ${flatObjectMetadata.nameSingular} was not found. Please, check if you have defined it.`);
            throw new Error(`Edge type for ${flatObjectMetadata.nameSingular} was not found. Please, check if you have defined it.`);
        }
        fields.edges = {
            type: (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(edgeType, {
                isArray: true,
                arrayDepth: 1,
                nullable: false
            })
        };
        fields.pageInfo = {
            type: (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(_object.PageInfoType, {
                nullable: false
            })
        };
        return fields;
    }
    constructor(aggregationObjectTypeGenerator, gqlTypesStorage){
        this.aggregationObjectTypeGenerator = aggregationObjectTypeGenerator;
        this.gqlTypesStorage = gqlTypesStorage;
        this.logger = new _common.Logger(ConnectionGqlObjectTypeGenerator.name);
    }
};
ConnectionGqlObjectTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _aggregationtypegenerator.AggregationObjectTypeGenerator === "undefined" ? Object : _aggregationtypegenerator.AggregationObjectTypeGenerator,
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], ConnectionGqlObjectTypeGenerator);

//# sourceMappingURL=connection-gql-object-type.generator.js.map