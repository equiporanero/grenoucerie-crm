/* oxlint-disable no-console */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExceptionHandlerConsoleDriver", {
    enumerable: true,
    get: function() {
        return ExceptionHandlerConsoleDriver;
    }
});
let ExceptionHandlerConsoleDriver = class ExceptionHandlerConsoleDriver {
    captureExceptions(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    exceptions, options) {
        const sanitizedOptions = options ? {
            ...options,
            user: options.user ? {
                id: options.user.id,
                email: options.user.email,
                firstName: options.user.firstName,
                lastName: options.user.lastName
            } : undefined
        } : undefined;
        console.group('Exception Captured');
        console.info(sanitizedOptions);
        console.error(exceptions);
        console.groupEnd();
        return [];
    }
};

//# sourceMappingURL=console.driver.js.map