"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddPageLayoutWidgetPositionColumn1770046227329", {
    enumerable: true,
    get: function() {
        return AddPageLayoutWidgetPositionColumn1770046227329;
    }
});
let AddPageLayoutWidgetPositionColumn1770046227329 = class AddPageLayoutWidgetPositionColumn1770046227329 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ADD "position" jsonb`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" DROP COLUMN "position"`);
    }
    constructor(){
        this.name = 'AddPageLayoutWidgetPositionColumn1770046227329';
    }
};

//# sourceMappingURL=1770046227329-add-page-layout-widget-position-column.js.map