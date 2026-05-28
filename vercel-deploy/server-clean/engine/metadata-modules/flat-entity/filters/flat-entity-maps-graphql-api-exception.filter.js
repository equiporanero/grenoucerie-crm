"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatEntityMapsGraphqlApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return FlatEntityMapsGraphqlApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _flatentitymapsexception = require("../exceptions/flat-entity-maps.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatEntityMapsGraphqlApiExceptionFilter = class FlatEntityMapsGraphqlApiExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(exception);
            case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND:
            case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_ALREADY_EXISTS:
            case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_MALFORMED:
            case _flatentitymapsexception.FlatEntityMapsExceptionCode.INTERNAL_SERVER_ERROR:
                throw new _graphqlerrorsutil.InternalServerError(exception);
        }
    }
};
FlatEntityMapsGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_flatentitymapsexception.FlatEntityMapsException),
    (0, _common.Injectable)()
], FlatEntityMapsGraphqlApiExceptionFilter);

//# sourceMappingURL=flat-entity-maps-graphql-api-exception.filter.js.map