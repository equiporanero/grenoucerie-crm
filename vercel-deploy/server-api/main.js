"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _bytes = /*#__PURE__*/ _interop_require_default(require("bytes"));
const _classvalidator = require("class-validator");
const _expresssession = /*#__PURE__*/ _interop_require_default(require("express-session"));
const _graphqlUploadExpress = /*#__PURE__*/ _interop_require_default(require("graphql-upload/graphqlUploadExpress.mjs"));
const _nodeenvironmentinterface = require("./engine/core-modules/twenty-config/interfaces/node-environment.interface");
const _setpgdatetypeparser = require("./database/pg/set-pg-date-type-parser");
const _loggerservice = require("./engine/core-modules/logger/logger.service");
const _sessionstoragemodulefactory = require("./engine/core-modules/session-storage/session-storage.module-factory");
const _twentyconfigservice = require("./engine/core-modules/twenty-config/twenty-config.service");
const _configtransformersutil = require("./engine/core-modules/twenty-config/utils/config-transformers.util");
const _unhandledexceptionfilter = require("./filters/unhandled-exception.filter");
const _appmodule = require("./app.module");
require("./instrument");
const _settings = require("./engine/constants/settings");
const _generatefrontconfig = require("./utils/generate-front-config");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Trigger
const bootstrap = async ()=>{
    (0, _setpgdatetypeparser.setPgDateTypeParser)();
    const app = await _core.NestFactory.create(_appmodule.AppModule, {
        // Expose WWW-Authenticate so browser-based MCP clients can read the
        // resource_metadata pointer on 401. Required by MCP authorization spec.
        cors: {
            exposedHeaders: [
                'WWW-Authenticate'
            ]
        },
        bufferLogs: process.env.LOGGER_IS_BUFFER_ENABLED === 'true',
        rawBody: true,
        snapshot: process.env.NODE_ENV === _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT,
        ...process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH ? {
            httpsOptions: {
                key: _fs.default.readFileSync(process.env.SSL_KEY_PATH),
                cert: _fs.default.readFileSync(process.env.SSL_CERT_PATH)
            }
        } : {}
    });
    const logger = app.get(_loggerservice.LoggerService);
    const twentyConfigService = app.get(_twentyconfigservice.TwentyConfigService);
    const trustProxyRaw = twentyConfigService.get('TRUST_PROXY');
    const trustProxy = /^\d+$/.test(trustProxyRaw) ? Number(trustProxyRaw) : _configtransformersutil.configTransformers.boolean(trustProxyRaw) ?? trustProxyRaw;
    app.set('trust proxy', trustProxy);
    app.use((0, _expresssession.default)((0, _sessionstoragemodulefactory.getSessionStorageOptions)(twentyConfigService)));
    // Apply class-validator container so that we can use injection in validators
    (0, _classvalidator.useContainer)(app.select(_appmodule.AppModule), {
        fallbackOnErrors: true
    });
    // Use our logger
    app.useLogger(logger);
    app.useGlobalFilters(new _unhandledexceptionfilter.UnhandledExceptionFilter());
    app.useBodyParser('json', {
        limit: _settings.settings.storage.maxFileSize
    });
    app.useBodyParser('urlencoded', {
        limit: _settings.settings.storage.maxFileSize,
        extended: true
    });
    app.useBodyParser('text', {
        type: 'text/plain',
        limit: '1024kb'
    });
    // Graphql file upload
    app.use('/graphql', (0, _graphqlUploadExpress.default)({
        maxFieldSize: (0, _bytes.default)(_settings.settings.storage.maxFileSize),
        maxFiles: 10
    }));
    app.use('/metadata', (0, _graphqlUploadExpress.default)({
        maxFieldSize: (0, _bytes.default)(_settings.settings.storage.maxFileSize),
        maxFiles: 10
    }));
    // Inject the server url in the frontend page
    (0, _generatefrontconfig.generateFrontConfig)();
    await app.listen(twentyConfigService.get('NODE_PORT'));
};
void bootstrap();

//# sourceMappingURL=main.js.map