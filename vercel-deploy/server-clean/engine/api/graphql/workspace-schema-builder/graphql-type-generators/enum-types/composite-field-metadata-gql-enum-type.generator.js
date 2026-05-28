"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CompositeFieldMetadataGqlEnumTypeGenerator", {
    enumerable: true,
    get: function() {
        return CompositeFieldMetadataGqlEnumTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _gqltypesstorage = require("../../storages/gql-types.storage");
const _computecompositefieldenumtypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-composite-field-enum-type-key.util");
const _isenumfieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-enum-field-metadata-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CompositeFieldMetadataGqlEnumTypeGenerator = class CompositeFieldMetadataGqlEnumTypeGenerator {
    buildAndStore(compositeType) {
        for (const compositeProperty of compositeType.properties){
            if (!(0, _isenumfieldmetadatatypeutil.isEnumFieldMetadataType)(compositeProperty.type)) {
                continue;
            }
            this.gqlTypesStorage.addGqlType((0, _computecompositefieldenumtypekeyutil.computeCompositeFieldEnumTypeKey)(compositeType.type, compositeProperty.name), this.generate(compositeType.type, compositeProperty));
        }
    }
    generate(compositeType, compositeProperty) {
        // FixMe: It's a hack until Typescript get fixed on union types for reduce function
        // https://github.com/microsoft/TypeScript/issues/36390
        const enumOptions = compositeProperty.options;
        if (!enumOptions) {
            this.logger.error(`Enum options are not defined for ${compositeProperty.name}`, {
                compositeProperty
            });
            throw new Error(`Enum options are not defined for ${compositeProperty.name}`);
        }
        return new _graphql.GraphQLEnumType({
            name: `${(0, _utils.pascalCase)(compositeType.toString())}${(0, _utils.pascalCase)(compositeProperty.name)}Enum`,
            description: compositeProperty.description,
            values: enumOptions.reduce((acc, enumOption)=>{
                // Key must match this regex: /^[_A-Za-z][_0-9A-Za-z]+$/
                acc[enumOption.value] = {
                    value: enumOption.value,
                    description: enumOption.label
                };
                return acc;
            }, {})
        });
    }
    constructor(gqlTypesStorage){
        this.gqlTypesStorage = gqlTypesStorage;
        this.logger = new _common.Logger(CompositeFieldMetadataGqlEnumTypeGenerator.name);
    }
};
CompositeFieldMetadataGqlEnumTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], CompositeFieldMetadataGqlEnumTypeGenerator);

//# sourceMappingURL=composite-field-metadata-gql-enum-type.generator.js.map