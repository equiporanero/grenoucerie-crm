"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoggerDriver", {
    enumerable: true,
    get: function() {
        return LoggerDriver;
    }
});
const _common = require("@nestjs/common");
let LoggerDriver = class LoggerDriver {
    async send(sendMailOptions) {
        const info = `Sent email to: ${sendMailOptions.to}\n` + `From: ${sendMailOptions.from}\n` + `Subject: ${sendMailOptions.subject}\n` + `Content Text: ${sendMailOptions.text}\n` + `Content HTML: ${sendMailOptions.html}`;
        this.logger.log(info);
    }
    constructor(){
        this.logger = new _common.Logger(LoggerDriver.name);
    }
};

//# sourceMappingURL=logger.driver.js.map