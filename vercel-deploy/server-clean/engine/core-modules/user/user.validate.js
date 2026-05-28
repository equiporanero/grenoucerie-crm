"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userValidator", {
    enumerable: true,
    get: function() {
        return userValidator;
    }
});
const _utils = require("twenty-shared/utils");
const _userexception = require("./user.exception");
const assertIsDefinedOrThrow = (user, exceptionToThrow = new _userexception.UserException('UserEntity not found', _userexception.UserExceptionCode.USER_NOT_FOUND))=>{
    if (!(0, _utils.isDefined)(user)) {
        throw exceptionToThrow;
    }
};
const isUserDefined = (user)=>{
    return (0, _utils.isDefined)(user);
};
const userValidator = {
    assertIsDefinedOrThrow,
    isDefined: isUserDefined
};

//# sourceMappingURL=user.validate.js.map