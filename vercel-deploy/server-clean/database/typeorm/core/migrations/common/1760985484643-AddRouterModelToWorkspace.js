"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddRouterModelToWorkspace1760985484643", {
    enumerable: true,
    get: function() {
        return AddRouterModelToWorkspace1760985484643;
    }
});
let AddRouterModelToWorkspace1760985484643 = class AddRouterModelToWorkspace1760985484643 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "routerModel" character varying NOT NULL DEFAULT 'auto'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "routerModel"`);
    }
    constructor(){
        this.name = 'AddRouterModelToWorkspace1760985484643';
    }
};

//# sourceMappingURL=1760985484643-AddRouterModelToWorkspace.js.map