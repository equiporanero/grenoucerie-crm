"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get filesFieldSchema () {
        return filesFieldSchema;
    },
    get validateFilesFieldOrThrow () {
        return validateFilesFieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _zod = require("zod");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const fileItemSchema = _zod.z.object({
    fileId: _zod.z.string().uuidv4(),
    label: _zod.z.string()
}).strict();
const filesFieldSchema = _zod.z.array(fileItemSchema);
const validateFilesFieldOrThrow = (value, fieldName, settings)=>{
    if ((0, _guards.isNull)(value)) return null;
    let parsedValue = value;
    if (typeof value === 'string') {
        try {
            parsedValue = JSON.parse(value);
        } catch  {
            const inspectedValue = (0, _util.inspect)(value);
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid value "${inspectedValue}" for FILES field "${fieldName}" - It should be an array of objects with "fileId" and "label" properties.`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                userFriendlyMessage: /*i18n*/ {
                    id: "xvTxwi",
                    message: 'Invalid value "{inspectedValue}" for FILES field "{fieldName}" - It should be an array of objects with "fileId" and "label" properties.',
                    values: {
                        inspectedValue: inspectedValue,
                        fieldName: fieldName
                    }
                }
            });
        }
    }
    const result = filesFieldSchema.safeParse(parsedValue);
    if (!result.success) {
        const inspectedValue = (0, _util.inspect)(parsedValue);
        const errorMessage = result.error.issues.map((issue)=>`${issue.path.join('.')}: ${issue.message}`).join(', ');
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid value "${inspectedValue}" for FILES field "${fieldName}" - ${errorMessage}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "tfoEIq",
                message: 'Invalid value for FILES field "{fieldName}" - {errorMessage}',
                values: {
                    fieldName: fieldName,
                    errorMessage: errorMessage
                }
            }
        });
    }
    if (result.data.length > settings.maxNumberOfValues) {
        const maxNumberOfValues = settings.maxNumberOfValues;
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Max number of files is ${maxNumberOfValues} for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "J9favo",
                message: 'Max number of files is {maxNumberOfValues} for field "{fieldName}"',
                values: {
                    maxNumberOfValues: maxNumberOfValues,
                    fieldName: fieldName
                }
            }
        });
    }
    return result.data;
};

//# sourceMappingURL=validate-files-field-or-throw.util.js.map