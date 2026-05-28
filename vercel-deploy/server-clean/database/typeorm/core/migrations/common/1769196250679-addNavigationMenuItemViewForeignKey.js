"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddNavigationMenuItemViewForeignKey1769196250679", {
    enumerable: true,
    get: function() {
        return AddNavigationMenuItemViewForeignKey1769196250679;
    }
});
let AddNavigationMenuItemViewForeignKey1769196250679 = class AddNavigationMenuItemViewForeignKey1769196250679 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ADD CONSTRAINT "FK_9ec9d8bc9bb4197be12d4efcaf3" FOREIGN KEY ("viewId") REFERENCES "core"."view"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" DROP CONSTRAINT "FK_9ec9d8bc9bb4197be12d4efcaf3"`);
    }
    constructor(){
        this.name = 'AddNavigationMenuItemViewForeignKey1769196250679';
    }
};

//# sourceMappingURL=1769196250679-addNavigationMenuItemViewForeignKey.js.map