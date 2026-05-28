"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataGqlInputTypeGenerator", {
    enumerable: true,
    get: function() {
        return ObjectMetadataGqlInputTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _objectmetadatacreategqlinputtypegenerator = require("./create-input/object-metadata-create-gql-input-type.generator");
const _objectmetadatafiltergqlinputtypegenerator = require("./filter-input/object-metadata-filter-gql-input-type.generator");
const _objectmetadatagroupbygqlinputtypegenerator = require("./group-by-input/object-metadata-group-by-gql-input-type.generator");
const _objectmetadataorderbygqlinputtypegenerator = require("./order-by-input/object-metadata-order-by-gql-input-type.generator");
const _objectmetadataorderbywithgroupbygqlinputtypegenerator = require("./order-by-input/object-metadata-order-by-with-group-by-gql-input-type.generator");
const _objectmetadataupdategqlinputtypegenerator = require("./update-input/object-metadata-update-gql-input-type.generator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectMetadataGqlInputTypeGenerator = class ObjectMetadataGqlInputTypeGenerator {
    buildAndStore(flatObjectMetadata, fields, context) {
        this.objectMetadataCreateGqlInputTypeGenerator.buildAndStore(flatObjectMetadata, fields, context);
        this.objectMetadataUpdateGqlInputTypeGenerator.buildAndStore(flatObjectMetadata, fields, context);
        this.objectMetadataFilterGqlInputTypeGenerator.buildAndStore(flatObjectMetadata, fields, context);
        this.objectMetadataOrderByGqlInputTypeGenerator.buildAndStore({
            flatObjectMetadata,
            fields,
            context
        });
        this.objectMetadataOrderByWithGroupByGqlInputTypeGenerator.buildAndStore({
            flatObjectMetadata,
            fields,
            context
        });
        this.objectMetadataGroupByGqlInputTypeGenerator.buildAndStore(flatObjectMetadata, fields, context);
    }
    constructor(objectMetadataCreateGqlInputTypeGenerator, objectMetadataUpdateGqlInputTypeGenerator, objectMetadataFilterGqlInputTypeGenerator, objectMetadataOrderByGqlInputTypeGenerator, objectMetadataOrderByWithGroupByGqlInputTypeGenerator, objectMetadataGroupByGqlInputTypeGenerator){
        this.objectMetadataCreateGqlInputTypeGenerator = objectMetadataCreateGqlInputTypeGenerator;
        this.objectMetadataUpdateGqlInputTypeGenerator = objectMetadataUpdateGqlInputTypeGenerator;
        this.objectMetadataFilterGqlInputTypeGenerator = objectMetadataFilterGqlInputTypeGenerator;
        this.objectMetadataOrderByGqlInputTypeGenerator = objectMetadataOrderByGqlInputTypeGenerator;
        this.objectMetadataOrderByWithGroupByGqlInputTypeGenerator = objectMetadataOrderByWithGroupByGqlInputTypeGenerator;
        this.objectMetadataGroupByGqlInputTypeGenerator = objectMetadataGroupByGqlInputTypeGenerator;
    }
};
ObjectMetadataGqlInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadatacreategqlinputtypegenerator.ObjectMetadataCreateGqlInputTypeGenerator === "undefined" ? Object : _objectmetadatacreategqlinputtypegenerator.ObjectMetadataCreateGqlInputTypeGenerator,
        typeof _objectmetadataupdategqlinputtypegenerator.ObjectMetadataUpdateGqlInputTypeGenerator === "undefined" ? Object : _objectmetadataupdategqlinputtypegenerator.ObjectMetadataUpdateGqlInputTypeGenerator,
        typeof _objectmetadatafiltergqlinputtypegenerator.ObjectMetadataFilterGqlInputTypeGenerator === "undefined" ? Object : _objectmetadatafiltergqlinputtypegenerator.ObjectMetadataFilterGqlInputTypeGenerator,
        typeof _objectmetadataorderbygqlinputtypegenerator.ObjectMetadataOrderByGqlInputTypeGenerator === "undefined" ? Object : _objectmetadataorderbygqlinputtypegenerator.ObjectMetadataOrderByGqlInputTypeGenerator,
        typeof _objectmetadataorderbywithgroupbygqlinputtypegenerator.ObjectMetadataOrderByWithGroupByGqlInputTypeGenerator === "undefined" ? Object : _objectmetadataorderbywithgroupbygqlinputtypegenerator.ObjectMetadataOrderByWithGroupByGqlInputTypeGenerator,
        typeof _objectmetadatagroupbygqlinputtypegenerator.ObjectMetadataGroupByGqlInputTypeGenerator === "undefined" ? Object : _objectmetadatagroupbygqlinputtypegenerator.ObjectMetadataGroupByGqlInputTypeGenerator
    ])
], ObjectMetadataGqlInputTypeGenerator);

//# sourceMappingURL=object-metadata-gql-input-type.generator.js.map