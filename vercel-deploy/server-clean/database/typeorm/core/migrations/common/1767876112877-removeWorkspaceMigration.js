"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveWorkspaceMigration1767876112877", {
    enumerable: true,
    get: function() {
        return RemoveWorkspaceMigration1767876112877;
    }
});
let RemoveWorkspaceMigration1767876112877 = class RemoveWorkspaceMigration1767876112877 {
    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE "core"."workspaceMigration"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TABLE "core"."workspaceMigration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "migrations" jsonb, "name" character varying NOT NULL, "isCustom" boolean NOT NULL DEFAULT false, "appliedAt" TIMESTAMP WITH TIME ZONE, "workspaceId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_33f481ae58d08030a3a007efde1" PRIMARY KEY ("id"))`);
    }
    constructor(){
        this.name = 'RemoveWorkspaceMigration1767876112877';
    }
};

//# sourceMappingURL=1767876112877-removeWorkspaceMigration.js.map