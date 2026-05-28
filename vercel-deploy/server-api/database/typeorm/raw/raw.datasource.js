"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "rawDataSource", {
    enumerable: true,
    get: function() {
        return rawDataSource;
    }
});
const _dotenv = require("dotenv");
const _typeorm = require("typeorm");
(0, _dotenv.config)({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    override: true
});
const typeORMRawModuleOptions = {
    url: process.env.PG_DATABASE_URL,
    type: 'postgres',
    logging: [
        'error'
    ],
    ssl: process.env.PG_SSL_ALLOW_SELF_SIGNED === 'true' ? {
        rejectUnauthorized: false
    } : undefined
};
const rawDataSource = new _typeorm.DataSource(typeORMRawModuleOptions);

//# sourceMappingURL=raw.datasource.js.map