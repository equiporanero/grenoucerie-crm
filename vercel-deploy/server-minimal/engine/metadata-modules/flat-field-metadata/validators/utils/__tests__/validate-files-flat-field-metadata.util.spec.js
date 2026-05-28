"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _validatefilesflatfieldmetadatautil = require("../validate-files-flat-field-metadata.util");
const createFlatEntityToValidate = (overrides = {})=>({
        type: _types.FieldMetadataType.FILES,
        name: 'testFilesField',
        label: 'Test Files Field',
        universalSettings: {
            maxNumberOfValues: 5
        },
        isUnique: false,
        ...overrides
    });
const callValidator = (flatEntityToValidate)=>(0, _validatefilesflatfieldmetadatautil.validateFilesFlatFieldMetadata)({
        flatEntityToValidate
    });
const stripUserFriendlyMessage = (errors)=>errors.map(({ userFriendlyMessage: _, ...rest })=>rest);
describe('validateFilesFlatFieldMetadata', ()=>{
    it('should return no errors for a valid files field', ()=>{
        const errors = callValidator(createFlatEntityToValidate());
        expect(errors).toMatchInlineSnapshot('[]');
    });
    it('should return error when isUnique is true', ()=>{
        const errors = callValidator(createFlatEntityToValidate({
            isUnique: true
        }));
        expect(stripUserFriendlyMessage(errors)).toMatchInlineSnapshot(`
[
  {
    "code": "INVALID_FIELD_INPUT",
    "message": "Files field is not supported for unique fields",
  },
]
`);
    });
    it('should return error when universalSettings is undefined', ()=>{
        const errors = callValidator(createFlatEntityToValidate({
            universalSettings: undefined
        }));
        expect(stripUserFriendlyMessage(errors)).toMatchInlineSnapshot(`
[
  {
    "code": "INVALID_FIELD_INPUT",
    "message": "maxNumberOfValues must be defined in settings and be a number greater than 0 and less than or equal to 60",
  },
]
`);
    });
    it('should return error when maxNumberOfValues is 0', ()=>{
        const errors = callValidator(createFlatEntityToValidate({
            universalSettings: {
                maxNumberOfValues: 0
            }
        }));
        expect(stripUserFriendlyMessage(errors)).toMatchInlineSnapshot(`
[
  {
    "code": "INVALID_FIELD_INPUT",
    "message": "maxNumberOfValues must be defined in settings and be a number greater than 0 and less than or equal to 60",
  },
]
`);
    });
    it('should return error when maxNumberOfValues exceeds max (61)', ()=>{
        const errors = callValidator(createFlatEntityToValidate({
            universalSettings: {
                maxNumberOfValues: 61
            }
        }));
        expect(stripUserFriendlyMessage(errors)).toMatchInlineSnapshot(`
[
  {
    "code": "INVALID_FIELD_INPUT",
    "message": "maxNumberOfValues must be defined in settings and be a number greater than 0 and less than or equal to 60",
  },
]
`);
    });
});

//# sourceMappingURL=validate-files-flat-field-metadata.util.spec.js.map