"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUpgradeMigrationsTable1775487231605", {
    enumerable: true,
    get: function() {
        return AddUpgradeMigrationsTable1775487231605;
    }
});
let AddUpgradeMigrationsTable1775487231605 = class AddUpgradeMigrationsTable1775487231605 {
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "core"."upgradeMigration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" character varying NOT NULL, "attempt" integer NOT NULL DEFAULT \'1\', "executedByVersion" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_upgrade_migration_name_attempt" UNIQUE ("name", "attempt"), CONSTRAINT "PK_a43ea44de07f51fdc55b88af2ad" PRIMARY KEY ("id"))');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "core"."upgradeMigration"');
    }
    constructor(){
        this.name = 'AddUpgradeMigrationsTable1775487231605';
    }
};

//# sourceMappingURL=1775487231605-add-upgrade-migrations-table.js.map