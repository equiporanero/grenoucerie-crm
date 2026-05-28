"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddIsSdkLayerStaleToApplication1773000000000", {
    enumerable: true,
    get: function() {
        return AddIsSdkLayerStaleToApplication1773000000000;
    }
});
let AddIsSdkLayerStaleToApplication1773000000000 = class AddIsSdkLayerStaleToApplication1773000000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" ADD "isSdkLayerStale" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" DROP COLUMN "isSdkLayerStale"`);
    }
    constructor(){
        this.name = 'AddIsSdkLayerStaleToApplication1773000000000';
    }
};

//# sourceMappingURL=1773000000000-add-is-sdk-layer-stale-to-application.js.map