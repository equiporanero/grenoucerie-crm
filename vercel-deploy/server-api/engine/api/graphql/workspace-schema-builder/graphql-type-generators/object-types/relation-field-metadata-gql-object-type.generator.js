"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RelationFieldMetadataGqlObjectTypeGenerator", {
    enumerable: true,
    get: function() {
        return RelationFieldMetadataGqlObjectTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typemapperservice = require("../../services/type-mapper.service");
const _applytypeoptionsforoutputtypeutil = require("../../utils/apply-type-options-for-output-type.util");
const _extractgraphqlrelationfieldnamesutil = require("../../utils/extract-graphql-relation-field-names.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RelationFieldMetadataGqlObjectTypeGenerator = class RelationFieldMetadataGqlObjectTypeGenerator {
    generateRelationFieldObjectType({ fieldMetadata, typeOptions }) {
        if (fieldMetadata.settings?.relationType === _types.RelationType.ONE_TO_MANY) return {};
        const { joinColumnName } = (0, _extractgraphqlrelationfieldnamesutil.extractGraphQLRelationFieldNames)(fieldMetadata);
        const type = this.typeMapperService.mapToPreBuiltGraphQLOutputType({
            fieldMetadataType: fieldMetadata.type,
            typeOptions
        });
        if (!(0, _utils.isDefined)(type)) {
            const message = `Could not find a GraphQL output type for ${type} field metadata`;
            this.logger.error(message, {
                type,
                typeOptions
            });
            throw new Error(message);
        }
        const modifiedType = (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(type, typeOptions);
        return {
            [joinColumnName]: {
                type: modifiedType,
                description: fieldMetadata.description
            }
        };
    }
    constructor(typeMapperService){
        this.typeMapperService = typeMapperService;
        this.logger = new _common.Logger(RelationFieldMetadataGqlObjectTypeGenerator.name);
    }
};
RelationFieldMetadataGqlObjectTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService
    ])
], RelationFieldMetadataGqlObjectTypeGenerator);

//# sourceMappingURL=relation-field-metadata-gql-object-type.generator.js.map