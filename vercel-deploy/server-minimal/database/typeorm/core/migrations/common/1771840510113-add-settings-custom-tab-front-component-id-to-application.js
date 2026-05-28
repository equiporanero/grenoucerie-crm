"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddSettingsCustomTabFrontComponentIdToApplication1771840510113", {
    enumerable: true,
    get: function() {
        return AddSettingsCustomTabFrontComponentIdToApplication1771840510113;
    }
});
let AddSettingsCustomTabFrontComponentIdToApplication1771840510113 = class AddSettingsCustomTabFrontComponentIdToApplication1771840510113 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" ADD "settingsCustomTabFrontComponentId" uuid`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" DROP COLUMN "settingsCustomTabFrontComponentId"`);
    }
    constructor(){
        this.name = 'AddSettingsCustomTabFrontComponentIdToApplication1771840510113';
    }
};

//# sourceMappingURL=1771840510113-add-settings-custom-tab-front-component-id-to-application.js.map