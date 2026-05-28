"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddColorToObjectMetadata1773655278357", {
    enumerable: true,
    get: function() {
        return AddColorToObjectMetadata1773655278357;
    }
});
let AddColorToObjectMetadata1773655278357 = class AddColorToObjectMetadata1773655278357 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."objectMetadata" ADD "color" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."objectMetadata" DROP COLUMN "color"`);
    }
    constructor(){
        this.name = 'AddColorToObjectMetadata1773655278357';
    }
};

//# sourceMappingURL=1773655278357-add-color-to-object-metadata.js.map