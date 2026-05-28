"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _extractversionfromcommandnameutil = require("../extract-version-from-command-name.util");
describe('extractVersionFromCommandName', ()=>{
    it('should extract version from standard command name', ()=>{
        expect((0, _extractversionfromcommandnameutil.extractVersionFromCommandName)('1.21.0_BackfillDatasourceCommand_1775500003000')).toBe('1.21.0');
    });
    it('should extract version with different version numbers', ()=>{
        expect((0, _extractversionfromcommandnameutil.extractVersionFromCommandName)('1.22.0_SomeCommand_1780000001000')).toBe('1.22.0');
    });
    it('should return null for names without underscores', ()=>{
        expect((0, _extractversionfromcommandnameutil.extractVersionFromCommandName)('nounderscores')).toBeNull();
    });
    it('should handle empty string', ()=>{
        expect((0, _extractversionfromcommandnameutil.extractVersionFromCommandName)('')).toBeNull();
    });
});

//# sourceMappingURL=extract-version-from-command-name.util.spec.js.map