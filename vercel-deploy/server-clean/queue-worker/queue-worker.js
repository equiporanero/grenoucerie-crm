"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _exceptionhandlerservice = require("../engine/core-modules/exception-handler/exception-handler.service");
const _loggerservice = require("../engine/core-modules/logger/logger.service");
const _globalexceptionhandlerutil = require("../engine/utils/global-exception-handler.util");
require("../instrument");
const _queueworkermodule = require("./queue-worker.module");
async function bootstrap() {
    let exceptionHandlerService;
    let loggerService;
    try {
        const app = await _core.NestFactory.createApplicationContext(_queueworkermodule.QueueWorkerModule, {
            bufferLogs: process.env.LOGGER_IS_BUFFER_ENABLED === 'true'
        });
        loggerService = app.get(_loggerservice.LoggerService);
        exceptionHandlerService = app.get(_exceptionhandlerservice.ExceptionHandlerService);
        // Inject our logger
        app.useLogger(loggerService ?? false);
    } catch (err) {
        loggerService?.error(err?.message, err?.name);
        if ((0, _globalexceptionhandlerutil.shouldCaptureException)(err)) {
            exceptionHandlerService?.captureExceptions([
                err
            ]);
        }
        throw err;
    }
}
void bootstrap();

//# sourceMappingURL=queue-worker.js.map