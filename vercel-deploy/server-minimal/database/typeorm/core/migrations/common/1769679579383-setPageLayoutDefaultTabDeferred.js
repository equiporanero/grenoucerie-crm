"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SetPageLayoutDefaultTabDeferred1769679579383", {
    enumerable: true,
    get: function() {
        return SetPageLayoutDefaultTabDeferred1769679579383;
    }
});
let SetPageLayoutDefaultTabDeferred1769679579383 = class SetPageLayoutDefaultTabDeferred1769679579383 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" ALTER CONSTRAINT "FK_747fbc25827bdcb9e35cc68a990" DEFERRABLE INITIALLY DEFERRED`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" ALTER CONSTRAINT "FK_747fbc25827bdcb9e35cc68a990" NOT DEFERRABLE INITIALLY DEFERRED`);
    }
    constructor(){
        this.name = 'SetPageLayoutDefaultTabDeferred1769679579383';
    }
};

//# sourceMappingURL=1769679579383-setPageLayoutDefaultTabDeferred.js.map