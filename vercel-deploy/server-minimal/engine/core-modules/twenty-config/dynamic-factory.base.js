"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DriverFactoryBase", {
    enumerable: true,
    get: function() {
        return DriverFactoryBase;
    }
});
let DriverFactoryBase = class DriverFactoryBase {
    getCurrentDriver() {
        let configKey;
        try {
            configKey = this.buildConfigKey();
        } catch (error) {
            throw new Error(`Failed to build config key for ${this.constructor.name}. Original error: ${error instanceof Error ? error.message : String(error)}`);
        }
        if (this.currentConfigKey !== configKey) {
            try {
                this.currentDriver = this.createDriver();
            } catch (error) {
                throw new Error(`Failed to create driver for ${this.constructor.name} with config key: ${configKey}. Original error: ${error instanceof Error ? error.message : String(error)}`);
            }
            this.currentConfigKey = configKey;
        }
        if (!this.currentDriver) {
            throw new Error(`Failed to create driver for ${this.constructor.name} with config key: ${configKey}`);
        }
        return this.currentDriver;
    }
    constructor(twentyConfigService, configGroupHashService){
        this.twentyConfigService = twentyConfigService;
        this.configGroupHashService = configGroupHashService;
        this.currentDriver = null;
        this.currentConfigKey = null;
    }
};

//# sourceMappingURL=dynamic-factory.base.js.map