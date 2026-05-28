"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nestcommander = require("nest-commander");
const _exceptionhandlerservice = require("../engine/core-modules/exception-handler/exception-handler.service");
const _loggerservice = require("../engine/core-modules/logger/logger.service");
const _globalexceptionhandlerutil = require("../engine/utils/global-exception-handler.util");
const _commandmodule = require("./command.module");
async function bootstrap() {
    const errorHandler = (err)=>{
        loggerService.error(err?.message, err?.name);
        if ((0, _globalexceptionhandlerutil.shouldCaptureException)(err)) {
            exceptionHandlerService.captureExceptions([
                err
            ]);
        }
        process.exitCode = 1;
    };
    const app = await _nestcommander.CommandFactory.createWithoutRunning(_commandmodule.CommandModule, {
        logger: [
            'error',
            'warn',
            'log'
        ],
        bufferLogs: process.env.LOGGER_IS_BUFFER_ENABLED === 'true',
        errorHandler,
        serviceErrorHandler: errorHandler
    });
    const loggerService = app.get(_loggerservice.LoggerService);
    const exceptionHandlerService = app.get(_exceptionhandlerservice.ExceptionHandlerService);
    // Inject our logger
    app.useLogger(loggerService);
    await _nestcommander.CommandFactory.runApplication(app);
    await app.close();
}
void bootstrap();

//# sourceMappingURL=command.js.map