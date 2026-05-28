"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ArgsTypeGenerator", {
    enumerable: true,
    get: function() {
        return ArgsTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _gqltypesstorage = require("../../storages/gql-types.storage");
const _applytypeoptionsforoutputtypeutil = require("../../utils/apply-type-options-for-output-type.util");
const _computeobjectmetadatainputtypeutil = require("../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-input-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ArgsTypeGenerator = class ArgsTypeGenerator {
    generate({ args, objectMetadataSingularName }) {
        const fieldConfigMap = {};
        for(const key in args){
            // oxlint-disable-next-line no-prototype-builtins
            if (!args.hasOwnProperty(key)) {
                continue;
            }
            const arg = args[key];
            // Argument is a scalar type
            if ((0, _utils.isDefined)(arg.type)) {
                const gqlType = (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(arg.type, {
                    defaultValue: arg.defaultValue,
                    nullable: arg.isNullable,
                    isArray: arg.isArray
                });
                fieldConfigMap[key] = {
                    type: gqlType
                };
            }
            // Argument is an input type
            if ((0, _utils.isDefined)(arg.kind)) {
                const storageKey = (0, _computeobjectmetadatainputtypeutil.computeObjectMetadataInputTypeKey)(objectMetadataSingularName, arg.kind);
                const inputType = this.gqlTypesStorage.getGqlTypeByKey(storageKey);
                if (!(0, _utils.isDefined)(inputType) || !(0, _graphql.isInputObjectType)(inputType)) {
                    this.logger.error(`Could not find a GraphQL input type for ${objectMetadataSingularName}`, {
                        objectMetadataSingularName
                    });
                    throw new Error(`Could not find a GraphQL input type for ${objectMetadataSingularName}`);
                }
                const gqlType = (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(inputType, {
                    nullable: arg.isNullable,
                    isArray: arg.isArray
                });
                fieldConfigMap[key] = {
                    type: gqlType
                };
            }
        }
        return fieldConfigMap;
    }
    constructor(gqlTypesStorage){
        this.gqlTypesStorage = gqlTypesStorage;
        this.logger = new _common.Logger(ArgsTypeGenerator.name);
    }
};
ArgsTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], ArgsTypeGenerator);

//# sourceMappingURL=args-type.generator.js.map