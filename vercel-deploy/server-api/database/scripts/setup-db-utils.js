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
    get camelToSnakeCase () {
        return camelToSnakeCase;
    },
    get performQuery () {
        return performQuery;
    }
});
const _rawdatasource = require("../typeorm/raw/raw.datasource");
const camelToSnakeCase = (str)=>str.replace(/[A-Z]/g, (letter)=>`_${letter.toLowerCase()}`);
const performQuery = async (query, consoleDescription, withLog = true, ignoreAlreadyExistsError = false)=>{
    try {
        const result = await _rawdatasource.rawDataSource.query(query);
        if (withLog) {
            // oxlint-disable-next-line no-console
            console.log(`Performed '${consoleDescription}' successfully`);
        }
        return result;
    } catch (err) {
        let message = '';
        if (ignoreAlreadyExistsError && `${err}`.includes('already exists')) {
            message = `Performed '${consoleDescription}' successfully`;
        } else {
            message = `Failed to perform '${consoleDescription}': ${err}`;
        }
        if (withLog) {
            // oxlint-disable-next-line no-console
            console.error(message);
        }
    }
};

//# sourceMappingURL=setup-db-utils.js.map