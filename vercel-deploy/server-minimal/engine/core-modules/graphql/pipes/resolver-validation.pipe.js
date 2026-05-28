"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ResolverValidationPipe", {
    enumerable: true,
    get: function() {
        return ResolverValidationPipe;
    }
});
const _common = require("@nestjs/common");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqlerrorsutil = require("../utils/graphql-errors.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const safeClassValidatorValidateWrapper = async (object)=>{
    try {
        return await (0, _classvalidator.validate)(object);
    } catch  {
        return [];
    }
};
let ResolverValidationPipe = class ResolverValidationPipe {
    async transform(value, metadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, _classtransformer.plainToInstance)(metatype, value);
        const errors = await safeClassValidatorValidateWrapper(object);
        if (errors.length === 0) {
            // TODO shouldn't we return the object here ? As transpilation could bring mutations
            return value;
        }
        const errorMessage = this.formatErrorMessage(errors);
        throw new _graphqlerrorsutil.UserInputError(errorMessage);
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    toValidate(metatype) {
        const types = [
            String,
            Boolean,
            Number,
            Array,
            Object
        ];
        return !types.includes(metatype);
    }
    formatErrorMessage(errors) {
        const messages = errors.flatMap((error)=>{
            if (error.constraints) {
                return Object.values(error.constraints);
            }
            if (error.children) {
                return this.formatErrorMessage(error.children);
            }
            return [];
        });
        return messages.join(', ');
    }
};
ResolverValidationPipe = _ts_decorate([
    (0, _common.Injectable)()
], ResolverValidationPipe);

//# sourceMappingURL=resolver-validation.pipe.js.map