"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CompositeFieldMetadataGqlInputTypeGenerator", {
    enumerable: true,
    get: function() {
        return CompositeFieldMetadataGqlInputTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _compositefieldmetadatacreategqlinputtypegenerator = require("./create-input/composite-field-metadata-create-gql-input-type.generator");
const _compositefieldmetadatafiltergqlinputtypesgenerator = require("./filter-input/composite-field-metadata-filter-gql-input-types.generator");
const _compositefieldmetadatagroupbygqlinputtypegenerator = require("./group-by-input/composite-field-metadata-group-by-gql-input-type.generator");
const _compositefieldmetadataorderbygqlinputtypegenerator = require("./order-by-input/composite-field-metadata-order-by-gql-input-type.generator");
const _compositefieldmetadataupdategqlinputtypegenerator = require("./update-input/composite-field-metadata-update-gql-input-type.generator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CompositeFieldMetadataGqlInputTypeGenerator = class CompositeFieldMetadataGqlInputTypeGenerator {
    buildAndStore(compositeType) {
        this.compositeFieldMetadataCreateGqlInputTypeGenerator.buildAndStore(compositeType);
        this.compositeFieldMetadataUpdateGqlInputTypeGenerator.buildAndStore(compositeType);
        this.compositeFieldMetadataFilterGqlInputTypeGenerator.buildAndStore(compositeType);
        this.compositeFieldMetadataOrderByGqlInputTypeGenerator.buildAndStore(compositeType);
        this.compositeFieldMetadataGroupByGqlInputTypeGenerator.buildAndStore(compositeType);
    }
    constructor(compositeFieldMetadataCreateGqlInputTypeGenerator, compositeFieldMetadataUpdateGqlInputTypeGenerator, compositeFieldMetadataFilterGqlInputTypeGenerator, compositeFieldMetadataOrderByGqlInputTypeGenerator, compositeFieldMetadataGroupByGqlInputTypeGenerator){
        this.compositeFieldMetadataCreateGqlInputTypeGenerator = compositeFieldMetadataCreateGqlInputTypeGenerator;
        this.compositeFieldMetadataUpdateGqlInputTypeGenerator = compositeFieldMetadataUpdateGqlInputTypeGenerator;
        this.compositeFieldMetadataFilterGqlInputTypeGenerator = compositeFieldMetadataFilterGqlInputTypeGenerator;
        this.compositeFieldMetadataOrderByGqlInputTypeGenerator = compositeFieldMetadataOrderByGqlInputTypeGenerator;
        this.compositeFieldMetadataGroupByGqlInputTypeGenerator = compositeFieldMetadataGroupByGqlInputTypeGenerator;
    }
};
CompositeFieldMetadataGqlInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _compositefieldmetadatacreategqlinputtypegenerator.CompositeFieldMetadataCreateGqlInputTypeGenerator === "undefined" ? Object : _compositefieldmetadatacreategqlinputtypegenerator.CompositeFieldMetadataCreateGqlInputTypeGenerator,
        typeof _compositefieldmetadataupdategqlinputtypegenerator.CompositeFieldMetadataUpdateGqlInputTypeGenerator === "undefined" ? Object : _compositefieldmetadataupdategqlinputtypegenerator.CompositeFieldMetadataUpdateGqlInputTypeGenerator,
        typeof _compositefieldmetadatafiltergqlinputtypesgenerator.CompositeFieldMetadataFilterGqlInputTypeGenerator === "undefined" ? Object : _compositefieldmetadatafiltergqlinputtypesgenerator.CompositeFieldMetadataFilterGqlInputTypeGenerator,
        typeof _compositefieldmetadataorderbygqlinputtypegenerator.CompositeFieldMetadataOrderByGqlInputTypeGenerator === "undefined" ? Object : _compositefieldmetadataorderbygqlinputtypegenerator.CompositeFieldMetadataOrderByGqlInputTypeGenerator,
        typeof _compositefieldmetadatagroupbygqlinputtypegenerator.CompositeFieldMetadataGroupByGqlInputTypeGenerator === "undefined" ? Object : _compositefieldmetadatagroupbygqlinputtypegenerator.CompositeFieldMetadataGroupByGqlInputTypeGenerator
    ])
], CompositeFieldMetadataGqlInputTypeGenerator);

//# sourceMappingURL=composite-field-metadata-gql-input-type.generator.js.map