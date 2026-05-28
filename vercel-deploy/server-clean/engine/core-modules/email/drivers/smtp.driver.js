"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SmtpDriver", {
    enumerable: true,
    get: function() {
        return SmtpDriver;
    }
});
const _common = require("@nestjs/common");
const _nodemailer = require("nodemailer");
let SmtpDriver = class SmtpDriver {
    async send(sendMailOptions) {
        this.transport.sendMail(sendMailOptions).then(()=>this.logger.log(`Email to '${sendMailOptions.to}' successfully sent`)).catch((err)=>this.logger.error(`sending email to '${sendMailOptions.to}': ${err}`));
    }
    constructor(options){
        this.logger = new _common.Logger(SmtpDriver.name);
        this.transport = (0, _nodemailer.createTransport)(options);
    }
};

//# sourceMappingURL=smtp.driver.js.map